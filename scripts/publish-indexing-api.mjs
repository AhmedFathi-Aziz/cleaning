#!/usr/bin/env node
/**
 * Google Indexing API — إشعار جوجل بتحديث أو حذف عناوين URL بعد النشر.
 *
 * الإعداد (مرة واحدة):
 * 1) Google Cloud Console: أنشئ مشروعاً، فعّل "Indexing API"، أنشئ Service Account وحمّل مفتاح JSON.
 * 2) Search Console: أضف البريد `client_email` من JSON كمالك (Owner) على نفس الموقع.
 * 3) لا ترفع ملف المفتاح إلى Git — ضعه محلياً أو في أسرار CI.
 *
 * المتغيرات:
 * - GOOGLE_APPLICATION_CREDENTIALS: مسار ملف JSON للحساب الخدمي (الأسلوب الموصى به).
 * - أو GOOGLE_SERVICE_ACCOUNT_JSON: محتوى JSON كاملاً في سطر واحد (مفيد في GitHub Actions secrets).
 * - NEXT_PUBLIC_SITE_URL أو SITE_URL: أساس الموقع لـ --from-sitemap (مثل https://example.com).
 *
 * أمثلة:
 *   npm run indexing:publish -- --from-sitemap
 *   npm run indexing:publish -- --urls "https://example.com/new-page"
 *   npm run indexing:publish -- --file urls-to-index.txt
 *   npm run indexing:publish -- --dry-run --from-sitemap
 *
 * بعد deploy يدوياً:
 *   npm run deploy
 *   npm run indexing:publish -- --from-sitemap
 *
 * ملاحظة: وثائق Google تشير إلى أن الـ API موجهة أساساً لبعض أنواع المحتوى (مثل الوظائف والبث)؛
 * طلبات URL_UPDATED لصفحات عادية قد تُقبَل أو تُرفَض حسب السياسة والحصة. راقب Search Console.
 *
 * الحصة: حدود يومية/دقيقة — استخدم --max عند الاختبار.
 */

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

import { JWT } from "google-auth-library";

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";

function parseArgs(argv) {
  const out = {
    fromSitemap: false,
    sitemapBase: null,
    urls: [],
    file: null,
    type: "URL_UPDATED",
    dryRun: false,
    max: Infinity,
    delayMs: 280,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--from-sitemap") {
      out.fromSitemap = true;
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        out.sitemapBase = next;
        i++;
      }
    } else if (a === "--urls" && argv[i + 1]) {
      out.urls.push(...argv[++i].split(/[\s,]+/).filter(Boolean));
    } else if (a === "--file" && argv[i + 1]) {
      out.file = argv[++i];
    } else if (a === "--type" && argv[i + 1]) {
      out.type = argv[++i];
    } else if (a === "--dry-run") {
      out.dryRun = true;
    } else if (a === "--max" && argv[i + 1]) {
      out.max = Math.max(1, parseInt(argv[++i], 10) || 1);
    } else if (a === "--delay-ms" && argv[i + 1]) {
      out.delayMs = Math.max(0, parseInt(argv[++i], 10) || 0);
    } else if (a.startsWith("http://") || a.startsWith("https://")) {
      out.urls.push(a);
    }
  }
  return out;
}

function loadServiceAccountJson() {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) {
    try {
      return JSON.parse(inline);
    } catch {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON ليس JSON صالحاً.");
    }
  }
  const p = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (!p) return null;
  const resolved = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
  if (!existsSync(resolved)) {
    throw new Error(`ملف الاعتماد غير موجود: ${resolved}`);
  }
  return JSON.parse(readFileSync(resolved, "utf8"));
}

/** يطابق الافتراضي في `lib/site.ts` عند غياب المتغيرات (لتشغيل ما بعد النشر دون تحميل .env). */
function defaultSiteBase() {
  const u =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    process.env.SITE_URL?.replace(/\/$/, "") ||
    "";
  return u || "https://saudi-cleaning.com";
}

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) locs.push(m[1].trim());
  return locs;
}

function isSitemapIndex(xml) {
  return /<sitemapindex[\s>]/i.test(xml);
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`فشل الجلب ${url}: ${res.status} ${res.statusText}`);
  return res.text();
}

async function collectUrlsFromSitemap(base) {
  const root = `${base.replace(/\/$/, "")}/sitemap.xml`;
  const xml = await fetchText(root);
  let urls = [];
  if (isSitemapIndex(xml)) {
    const childMaps = extractLocs(xml);
    for (const sm of childMaps) {
      const inner = await fetchText(sm);
      urls.push(...extractLocs(inner));
    }
  } else {
    urls = extractLocs(xml);
  }
  return [...new Set(urls.map(normalizeUrl).filter(Boolean))];
}

function normalizeUrl(u) {
  if (!u || typeof u !== "string") return null;
  const t = u.trim();
  if (!t.startsWith("http://") && !t.startsWith("https://")) return null;
  try {
    const url = new URL(t);
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

async function getAccessToken(credentials) {
  const client = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [INDEXING_SCOPE],
  });
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("لم يُرجع getAccessToken رمزاً.");
  return token;
}

async function publishUrl(accessToken, url, type) {
  const res = await fetch(PUBLISH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ url, type }),
  });
  const text = await res.text();
  let body = text;
  try {
    body = JSON.parse(text);
  } catch {
    /* نص خام */
  }
  return { ok: res.ok, status: res.status, body };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const base = args.sitemapBase || defaultSiteBase();

  /** @type {string[]} */
  let urls = [...args.urls.map(normalizeUrl).filter(Boolean)];

  if (args.file) {
    const raw = readFileSync(path.resolve(process.cwd(), args.file), "utf8");
    urls.push(
      ...raw
        .split(/\r?\n/)
        .map((l) => l.replace(/#.*$/, "").trim())
        .filter((l) => l.startsWith("http")),
    );
  }

  if (args.fromSitemap) {
    console.error(`indexing: جلب sitemap من ${base}/sitemap.xml (الأساس: ${base}) …`);
    const fromMap = await collectUrlsFromSitemap(base);
    urls.push(...fromMap);
  }

  urls = [...new Set(urls.map(normalizeUrl).filter(Boolean))];

  if (urls.length === 0) {
    console.error(
      "indexing: لا توجد عناوين. استخدم --from-sitemap، أو --urls، أو مرر روابط https كوسائط، أو --file.",
    );
    process.exit(1);
  }

  if (Number.isFinite(args.max) && urls.length > args.max) {
    console.error(`indexing: تقصير القائمة إلى أول ${args.max} عنوان (--max).`);
    urls = urls.slice(0, args.max);
  }

  if (!["URL_UPDATED", "URL_DELETED"].includes(args.type)) {
    console.error("indexing: --type يجب أن يكون URL_UPDATED أو URL_DELETED");
    process.exit(1);
  }

  if (args.dryRun) {
    console.log(`indexing [dry-run]: ${urls.length} عنوان، النوع ${args.type}:`);
    for (const u of urls) console.log(`  ${u}`);
    process.exit(0);
  }

  let credentials;
  try {
    credentials = loadServiceAccountJson();
  } catch (e) {
    console.error(String(e?.message || e));
    process.exit(1);
  }

  if (!credentials) {
    console.error(
      "indexing: تخطي — عيّن GOOGLE_APPLICATION_CREDENTIALS (مسار JSON) أو GOOGLE_SERVICE_ACCOUNT_JSON في البيئة.",
    );
    process.exit(0);
  }

  if (!credentials.client_email || !credentials.private_key) {
    console.error("indexing: ملف الاعتماد يجب أن يحتوي client_email و private_key.");
    process.exit(1);
  }

  console.error(`indexing: مصادقة كـ ${credentials.client_email} …`);
  const accessToken = await getAccessToken(credentials);

  let ok = 0;
  let fail = 0;
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const r = await publishUrl(accessToken, url, args.type);
    if (r.ok) {
      ok++;
      console.log(`OK ${r.status} ${url}`);
    } else {
      fail++;
      console.error(`FAIL ${r.status} ${url}`, typeof r.body === "string" ? r.body : JSON.stringify(r.body));
    }
    if (i < urls.length - 1 && args.delayMs > 0) await sleep(args.delayMs);
  }

  console.error(`indexing: انتهى — نجاح ${ok}، فشل ${fail}.`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
