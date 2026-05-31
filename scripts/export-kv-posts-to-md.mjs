/**
 * يصدّر posts.json من KV (itqan-articles) إلى content/blog/*.md
 * ويحمّل صور coverKey إلى public/images/blog/
 *
 * الاستخدام: node scripts/export-kv-posts-to-md.mjs
 * يتطلب: wrangler مسجّل الدخول + --remote
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const NAMESPACE_ID = "7310b972764046c08f2be935ced258bc";
const blogDir = path.join(root, "content", "blog");
const imagesDir = path.join(root, "public", "images", "blog");

function yamlValue(v) {
  if (v === null || v === undefined) return "null";
  if (Array.isArray(v)) return JSON.stringify(v);
  if (typeof v === "string") return JSON.stringify(v);
  return String(v);
}

function postToMd(post) {
  const lines = [
    "---",
    `title: ${yamlValue(post.title)}`,
    `excerpt: ${yamlValue(post.excerpt ?? "")}`,
    `seoTitle: ${yamlValue(post.seoTitle ?? post.title)}`,
    `seoDescription: ${yamlValue(post.seoDescription ?? post.excerpt ?? "")}`,
    `keywords: ${yamlValue(post.keywords ?? [])}`,
    `author: ${yamlValue(post.author ?? "السعودية للتنظيف")}`,
    `coverImage: ${yamlValue(post.coverImage ?? null)}`,
    `coverKey: null`,
    `publishedAt: ${post.publishedAt}`,
    `updatedAt: ${post.updatedAt ?? post.publishedAt}`,
    "---",
    "",
    post.bodyMd ?? "",
    "",
  ];
  return lines.join("\n");
}

function safeFileSlug(slug) {
  return String(slug)
    .trim()
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "-");
}

function fetchKvJson(key) {
  const buf = execSync(
    `npx wrangler kv key get "${key}" --namespace-id ${NAMESPACE_ID} --remote`,
    { cwd: root, encoding: "buffer", maxBuffer: 50 * 1024 * 1024 },
  );
  return JSON.parse(buf.toString("utf8"));
}

function downloadMedia(coverKey) {
  const key = coverKey.startsWith("m:") ? coverKey : `m:${coverKey}`;
  const ext = path.extname(key) || ".bin";
  const fileName = key.replace(/^m:/, "").replace(/[/\\]/g, "-");
  const outPath = path.join(imagesDir, fileName);

  if (fs.existsSync(outPath)) return `/images/blog/${fileName}`;

  const buf = execSync(
    `npx wrangler kv key get "${key}" --namespace-id ${NAMESPACE_ID} --remote`,
    { cwd: root, encoding: "buffer", maxBuffer: 20 * 1024 * 1024 },
  );
  fs.mkdirSync(imagesDir, { recursive: true });
  fs.writeFileSync(outPath, buf);
  return `/images/blog/${fileName}`;
}

function normalizePost(post) {
  let bodyMd = post.bodyMd ?? "";
  let coverImage = post.coverImage ?? null;

  if (post.coverKey) {
    try {
      coverImage = downloadMedia(post.coverKey);
      console.log(`  صورة غلاف: ${coverImage}`);
    } catch (err) {
      console.warn(`  تخطي صورة ${post.coverKey}:`, err.message);
    }
  }

  bodyMd = bodyMd.replace(/\/api\/media\/([^)\s"']+)/g, (_, mediaKey) => {
    try {
      return downloadMedia(decodeURIComponent(mediaKey));
    } catch {
      return `/api/media/${mediaKey}`;
    }
  });

  return { ...post, coverImage, coverKey: null, bodyMd };
}

function main() {
  console.log("[export-kv] جلب posts.json من KV (remote)…");
  const posts = fetchKvJson("posts.json");
  if (!Array.isArray(posts)) {
    console.error("[export-kv] posts.json ليس مصفوفة");
    process.exit(1);
  }

  fs.mkdirSync(blogDir, { recursive: true });
  const written = new Set();

  for (const raw of posts) {
    const post = normalizePost(raw);
    const fileSlug = safeFileSlug(post.slug);
    if (!fileSlug) continue;

    const file = path.join(blogDir, `${fileSlug}.md`);
    fs.writeFileSync(file, postToMd(post), "utf8");
    written.add(fileSlug);
    console.log(`✓ ${fileSlug}.md — ${post.title?.slice(0, 50)}…`);
  }

  console.log(`\n[export-kv] تم تصدير ${written.size} مقال إلى content/blog/`);
  console.log("[export-kv] شغّل: npm run blog:sync");
}

main();
