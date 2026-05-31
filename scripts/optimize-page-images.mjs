/**
 * يضغّط صور public/pages/* ويولّد WebP بأسماء SEO-friendly في public/images/
 * الاستخدام: node scripts/optimize-page-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const pagesDir = path.join(root, "public", "pages");
const outBase = path.join(root, "public", "images");

/** @type {{ folderMatch: RegExp; jobs: { inputPattern: RegExp; outputs: { file: string; width: number; quality: number; maxKb?: number }[] }[] }[]} */
const pageConfigs = [
  {
    folderMatch: /تنظيف.*رياض|cleaning.*riyadh/i,
    jobs: [
      {
        inputPattern: /^hero/i,
        outputs: [
          { file: "cleaning-company-riyadh/hero-1920.webp", width: 1920, quality: 78, maxKb: 300 },
          { file: "cleaning-company-riyadh/hero-1200.webp", width: 1200, quality: 76, maxKb: 220 },
          { file: "cleaning-company-riyadh/hero-768.webp", width: 768, quality: 74, maxKb: 120 },
          { file: "cleaning-company-riyadh/hero.webp", width: 1400, quality: 76, maxKb: 280 },
        ],
      },
      {
        inputPattern: /شركة|company|content/i,
        outputs: [
          { file: "cleaning-company-riyadh/team-960.webp", width: 960, quality: 72, maxKb: 150 },
          { file: "cleaning-company-riyadh/team-640.webp", width: 640, quality: 70, maxKb: 100 },
          { file: "cleaning-company-riyadh/team.webp", width: 960, quality: 72, maxKb: 140 },
        ],
      },
    ],
  },
];

async function optimizeToWebp(inputPath, outputPath, width, quality, maxKb) {
  let q = quality;
  let buf;
  for (let attempt = 0; attempt < 6; attempt++) {
    buf = await sharp(inputPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: q, effort: 4 })
      .toBuffer();
    if (!maxKb || buf.length <= maxKb * 1024) break;
    q -= 6;
    if (q < 48) break;
  }
  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.promises.writeFile(outputPath, buf);
  return buf.length;
}

async function main() {
  if (!fs.existsSync(pagesDir)) {
    console.warn("[optimize-page-images] لا يوجد public/pages");
    return;
  }

  const folders = fs.readdirSync(pagesDir, { withFileTypes: true }).filter((d) => d.isDirectory());

  for (const folder of folders) {
    const config = pageConfigs.find((c) => c.folderMatch.test(folder.name));
    if (!config) {
      console.log(`⊘ تخطي ${folder.name} — لا إعداد`);
      continue;
    }

    const folderPath = path.join(pagesDir, folder.name);
    const files = fs.readdirSync(folderPath).filter((f) => /\.(png|jpe?g)$/i.test(f));

    for (const job of config.jobs) {
      const source = files.find((f) => job.inputPattern.test(f));
      if (!source) {
        console.warn(`⚠ لم يُعثر على ملف يطابق ${job.inputPattern} في ${folder.name}`);
        continue;
      }
      const inputPath = path.join(folderPath, source);
      for (const out of job.outputs) {
        const dest = path.join(outBase, out.file);
        process.stdout.write(`→ ${out.file} … `);
        const bytes = await optimizeToWebp(inputPath, dest, out.width, out.quality, out.maxKb);
        console.log(`${(bytes / 1024).toFixed(0)} KiB (q≈${out.quality})`);
      }
    }
  }

  console.log("تم — المخرجات في public/images/");
}

await main();
