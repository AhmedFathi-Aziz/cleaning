/**
 * ضغط محلي لـ carpet.webp و facade.webp (أغلِق dev server إن واجهت EBUSY على Windows).
 * تشغيل: node scripts/shrink-webp.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const jobs = [
  { file: "carpet.webp", width: 480, quality: 52 },
  { file: "facade.webp", width: 520, quality: 52 },
];

for (const { file, width, quality } of jobs) {
  const p = path.join(root, "public", "images", file);
  const buf = await sharp(p).resize(width).webp({ quality, effort: 6 }).toBuffer();
  fs.writeFileSync(p, buf);
  console.log(`${file}: ${(buf.length / 1024).toFixed(1)} KiB`);
}
