/**
 * يقرأ content/blog/*.md (frontmatter + Markdown) ويولّد lib/generated/blog-articles.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "content", "blog");
const outDir = path.join(root, "lib", "generated");
const outFile = path.join(outDir, "blog-articles.ts");

const TEAM = {
  ahmedFathy: "ahmed-fathy",
  mohammedAhmad: "mohammed-ahmad",
  khalidOtaibi: "khalid-otaibi",
  nouraSaud: "noura-saud",
  fahedShamri: "fahed-shamri",
  abdullahQhtani: "abdullah-qhtani",
};

const pestPattern = /حشر|pest|صراص|بق|نمل|رش|آفات|مبيد/i;
const fabricPattern = /سجاد|كنب|مجلس|carpet|sofa|majlis|موكيت|ستائر|مفروش/i;
const tanksFacadesPattern = /خزان|واجه|tank|facade|pool|مياه|مكيف|مسابح/i;
const homeCleaningPattern = /فيلا|شقة|منزل|house|villa|apartment|تنظيف|cleaning|نقل|أثاث|مطبخ|مواد/i;

function inferBlogAuthorId(slug, meta) {
  if (meta.authorId) return String(meta.authorId);
  const haystack = [slug, meta.title, meta.excerpt, ...(Array.isArray(meta.keywords) ? meta.keywords : [])]
    .filter(Boolean)
    .join(" ");
  if (pestPattern.test(haystack)) return TEAM.fahedShamri;
  if (fabricPattern.test(haystack)) return TEAM.nouraSaud;
  if (tanksFacadesPattern.test(haystack)) return TEAM.abdullahQhtani;
  if (homeCleaningPattern.test(haystack)) return TEAM.khalidOtaibi;
  return TEAM.mohammedAhmad;
}

const RIYADH_MARKERS = /الرياض|riyadh|alriyad|al-riyad/i;
const JEDDAH_MARKERS = /جدة|جده|jeddah/i;
const LEAK_TOPIC = /تسرب|كشف تسرب|عزل مائي|عزل الأسطح|فاتورة المياه/i;
const CLEANING_TOPIC = /تنظيف|cleaning|نظافة/i;

function cityFlags(text) {
  const hay = text ?? "";
  return { riyadh: RIYADH_MARKERS.test(hay), jeddah: JEDDAH_MARKERS.test(hay) };
}

/** seoDescription يجب أن يطابق موضوع الصفحة والمدينة — ممنوع copy/paste بين المدن */
function auditSeoDescription(slug, meta) {
  const errors = [];
  const titleHay = [slug, meta.title, meta.seoTitle].filter(Boolean).join(" ");
  const desc = typeof meta.seoDescription === "string" ? meta.seoDescription.replace(/\\n/g, " ").trim() : "";

  if (!desc) {
    errors.push("seoDescription مطلوب ويجب أن يطابق موضوع المقال");
    return errors;
  }

  const titleCities = cityFlags(titleHay);
  const descCities = cityFlags(desc);

  if (titleCities.riyadh && !titleCities.jeddah && descCities.jeddah) {
    errors.push("seoDescription يذكر جدة بينما المقال عن الرياض فقط");
  }
  if (titleCities.jeddah && !titleCities.riyadh && descCities.riyadh) {
    errors.push("seoDescription يذكر الرياض بينما المقال عن جدة فقط");
  }
  if (CLEANING_TOPIC.test(titleHay) && LEAK_TOPIC.test(desc) && !LEAK_TOPIC.test(titleHay)) {
    errors.push("seoDescription عن تسربات/عزل بينما المقال عن التنظيف");
  }
  if (titleCities.riyadh && !titleCities.jeddah && !descCities.riyadh) {
    errors.push("مقال عن الرياض لكن seoDescription لا يذكر الرياض");
  }
  if (titleCities.jeddah && !titleCities.riyadh && !descCities.jeddah) {
    errors.push("مقال عن جدة لكن seoDescription لا يذكر جدة");
  }

  return errors;
}

function parseFrontmatter(block) {
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const colon = trimmed.indexOf(":");
    if (colon === -1) continue;
    const key = trimmed.slice(0, colon).trim();
    let val = trimmed.slice(colon + 1).trim();
    if (val === "null") {
      data[key] = null;
    } else if (val.startsWith("[") && val.endsWith("]")) {
      try {
        data[key] = JSON.parse(val);
      } catch {
        data[key] = val;
      }
    } else if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      data[key] = val.slice(1, -1);
    } else {
      data[key] = val;
    }
  }
  return data;
}

function parseMarkdownFile(fileName) {
  const slug = fileName.replace(/\.md$/i, "");
  if (!slug || slug.startsWith("_")) return null;

  const raw = fs.readFileSync(path.join(blogDir, fileName), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    console.warn(`[sync-blog] تخطي ${fileName}: frontmatter غير صالح`);
    return null;
  }

  const meta = parseFrontmatter(match[1]);
  const bodyMd = match[2].trim();
  if (!meta.title || !meta.publishedAt || !bodyMd) {
    console.warn(`[sync-blog] تخطي ${fileName}: title/publishedAt/body مطلوب`);
    return null;
  }

  const authorId = inferBlogAuthorId(slug, meta);

  const seoErrors = auditSeoDescription(slug, meta);
  if (seoErrors.length) {
    for (const err of seoErrors) {
      console.error(`[sync-blog] ${fileName}: ${err}`);
    }
    throw new Error(`seoDescription لا يطابق موضوع المقال: ${fileName}`);
  }

  return {
    slug,
    title: String(meta.title),
    excerpt: typeof meta.excerpt === "string" ? meta.excerpt : "",
    bodyMd,
    seoTitle: meta.seoTitle ? String(meta.seoTitle) : undefined,
    seoDescription: meta.seoDescription ? String(meta.seoDescription) : undefined,
    keywords: Array.isArray(meta.keywords) ? meta.keywords.map(String) : undefined,
    authorId,
    coverImage: meta.coverImage ? String(meta.coverImage) : undefined,
    coverKey: meta.coverKey === null || meta.coverKey === undefined ? null : String(meta.coverKey),
    publishedAt: String(meta.publishedAt),
    updatedAt: meta.updatedAt ? String(meta.updatedAt) : undefined,
  };
}

function main() {
  if (!fs.existsSync(blogDir)) {
    console.warn("[sync-blog] مجلد content/blog غير موجود.");
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(
      outFile,
      `/** Generated — no blog dir */\nimport type { BlogPost } from "@/lib/post-types";\nexport const staticBlogPosts: BlogPost[] = [];\nexport function getStaticBlogSlugs(): string[] { return []; }\n`,
      "utf8",
    );
    return;
  }

  const posts = fs
    .readdirSync(blogDir)
    .filter((n) => n.endsWith(".md") && !n.startsWith("_") && n.toLowerCase() !== "readme.md")
    .map(parseMarkdownFile)
    .filter(Boolean)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  fs.mkdirSync(outDir, { recursive: true });

  const body = `/** Auto-generated by scripts/sync-blog-articles.mjs — لا تعدّل يدوياً */
import type { BlogPost } from "@/lib/post-types";

export const staticBlogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)} as BlogPost[];

export function getStaticBlogSlugs(): string[] {
  return staticBlogPosts.map((p) => p.slug);
}
`;

  fs.writeFileSync(outFile, body, "utf8");
  console.log(`[sync-blog] ${posts.length} مقال → lib/generated/blog-articles.ts`);
}

main();
