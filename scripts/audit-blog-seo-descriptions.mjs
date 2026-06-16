/**
 * يتحقق أن seoDescription يطابق موضوع المقال والمدينة — لا copy/paste بين المدن.
 * التشغيل: npm run audit:blog-seo
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "content", "blog");

const RIYADH = /الرياض|riyadh|alriyad|al-riyad/i;
const JEDDAH = /جدة|جده|jeddah/i;
const LEAK_TOPIC = /تسرب|كشف تسرب|عزل مائي|عزل الأسطح|فاتورة المياه/i;
const CLEANING_TOPIC = /تنظيف|cleaning|نظافة/i;

function parseFrontmatter(block) {
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const colon = trimmed.indexOf(":");
    if (colon === -1) continue;
    const key = trimmed.slice(0, colon).trim();
    let val = trimmed.slice(colon + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return data;
}

function cityFlags(text) {
  const hay = text ?? "";
  return { riyadh: RIYADH.test(hay), jeddah: JEDDAH.test(hay) };
}

function auditPost(slug, meta) {
  const errors = [];
  const titleHay = [slug, meta.title, meta.seoTitle].filter(Boolean).join(" ");
  const desc = (meta.seoDescription ?? "").replace(/\\n/g, " ").trim();
  const excerpt = (meta.excerpt ?? "").trim();

  if (!desc) {
    errors.push("seoDescription فارغ — استخدم وصفاً يطابق عنوان المقال");
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
  if (LEAK_TOPIC.test(titleHay) && CLEANING_TOPIC.test(desc) && !CLEANING_TOPIC.test(titleHay)) {
    errors.push("seoDescription عن التنظيف بينما المقال عن تسربات/عزل");
  }

  if (titleCities.riyadh && !titleCities.jeddah && !descCities.riyadh) {
    errors.push("مقال عن الرياض لكن seoDescription لا يذكر الرياض");
  }
  if (titleCities.jeddah && !titleCities.riyadh && !descCities.jeddah) {
    errors.push("مقال عن جدة لكن seoDescription لا يذكر جدة");
  }

  return errors;
}

function main() {
  const files = fs
    .readdirSync(blogDir)
    .filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");

  let failed = 0;
  for (const file of files) {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) continue;
    const slug = file.replace(/\.md$/i, "");
    const meta = parseFrontmatter(match[1]);
    const errors = auditPost(slug, meta);
    if (errors.length) {
      failed++;
      console.error(`\n✗ ${file}`);
      for (const e of errors) console.error(`  - ${e}`);
      console.error(`  seoDescription: ${(meta.seoDescription ?? "").slice(0, 120)}…`);
    }
  }

  if (failed) {
    console.error(`\n[audit:blog-seo] ${failed} مقال(اً) بها مشاكل meta`);
    process.exitCode = 1;
  } else {
    console.log(`[audit:blog-seo] ${files.length} مقال — لا مشاكل في seoDescription`);
  }
}

main();
