/**
 * يولّد نسخ -768 / -1200 / -1920 من ملفات WebP موجودة في public/images
 * الاستخدام: npm run images:responsive
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public", "images");

/** ملفات LCP / بطاقات الخدمات — تُولَّد لها srcset */
const baseFiles = [
  "hero.webp",
  "services-villa.webp",
  "services-majlis.webp",
  "services-pest.webp",
  "about-hero.webp",
  "about-stats-bg.webp",
  "sofa-cleaning.webp",
  "garden-cleaning.webp",
  "deep-clean.webp",
  "carpet.webp",
  "facade.webp",
  "feature-team.webp",
  "feature-materials.webp",
  "feature-schedule.webp",
];

const widths = [
  { suffix: 768, quality: 74 },
  { suffix: 1200, quality: 76 },
  { suffix: 1920, quality: 78 },
];

async function main() {
  for (const file of baseFiles) {
    const input = path.join(outDir, file);
    if (!fs.existsSync(input)) {
      console.warn(`[images:responsive] تخطي — غير موجود: ${file}`);
      continue;
    }

    const base = file.replace(/\.webp$/i, "");
    for (const { suffix, quality } of widths) {
      const dest = path.join(outDir, `${base}-${suffix}.webp`);
      process.stdout.write(`→ ${base}-${suffix}.webp … `);
      await sharp(input)
        .rotate()
        .resize({ width: suffix, withoutEnlargement: true })
        .webp({ quality, effort: 4 })
        .toFile(dest);
      const st = await fs.promises.stat(dest);
      console.log(`${(st.size / 1024).toFixed(0)} KiB`);
    }
  }
  console.log("[images:responsive] تم");
}

await main();
