#!/usr/bin/env node
/**
 * يتحقق من أن ملفات الصور تحت public/images ليست بأسماء كاميرا عشوائية (IMG_…، DSC…).
 * استخدم أسماء وصفية بالإنجليزية أو العربية اللاتينية: hero.webp، deep-clean-jeddah-villa.webp، إلخ.
 *
 * تشغيل: npm run images:check-seo
 */

import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");
const imagesDir = join(root, "public", "images");

const BAD_PATTERNS = [
  /^IMG[_-]?\d+/i,
  /^DSC[_-]?\d+/i,
  /^DCIM/i,
  /^photo[_-]?\d+/i,
  /^P\d{7,}/i,
  /^WP_\d+/i,
];

function walk(dir, base = dir) {
  /** @type {string[]} */
  const bad = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return bad;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      bad.push(...walk(full, base));
      continue;
    }
    if (!/\.(jpe?g|png|webp|gif|avif|svg)$/i.test(e.name)) continue;
    const rel = relative(base, full).replace(/\\/g, "/");
    if (BAD_PATTERNS.some((re) => re.test(e.name))) bad.push(rel);
  }
  return bad;
}

function main() {
  let stat;
  try {
    stat = statSync(imagesDir, { throwIfNoEntry: false });
  } catch {
    console.log("check-public-image-names: public/images غير موجود — تخطي.");
    process.exit(0);
  }
  if (!stat?.isDirectory()) {
    console.log("check-public-image-names: public/images ليس مجلداً — تخطي.");
    process.exit(0);
  }

  const bad = walk(imagesDir);
  if (bad.length === 0) {
    console.log("check-public-image-names: لا توجد أسماء ملفات مشبوهة تحت public/images.");
    process.exit(0);
  }

  console.error("check-public-image-names: أسماء ملفات غير مناسبة لـ SEO (استبدلها بأسماء وصفية):\n");
  for (const p of bad) console.error(`  - ${p}`);
  console.error("\nراجع lib/assets.ts للتعليمات حول تسمية الصور.");
  process.exit(1);
}

main();
