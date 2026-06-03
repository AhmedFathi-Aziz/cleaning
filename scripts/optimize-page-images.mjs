/**
 * يضغّط صور public/pages/* ويولّد WebP بأسماء SEO-friendly في public/images/
 * الاستخدام: node scripts/optimize-page-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

import { renderBrandIcon } from "./lib/render-brand-icon.mjs";

const root = process.cwd();
const pagesDir = path.join(root, "public", "pages");
const outBase = path.join(root, "public", "images");

const heroOutputs = (prefix) => [
  { file: `${prefix}/hero-1920.webp`, width: 1920, quality: 78, maxKb: 300 },
  { file: `${prefix}/hero-1200.webp`, width: 1200, quality: 76, maxKb: 220 },
  { file: `${prefix}/hero-768.webp`, width: 768, quality: 74, maxKb: 120 },
  { file: `${prefix}/hero.webp`, width: 1400, quality: 76, maxKb: 280 },
];

/** @type {{ folderName: string; logoHeroPrefix?: string; jobs: { inputPattern: RegExp; outputs: { file: string; width: number; quality: number; maxKb?: number }[] }[] }[] }[]} */
const pageConfigs = [
  {
    folderName: "شركة تنظيف بالرياض",
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
        inputPattern: /شركة|company/i,
        outputs: [
          { file: "cleaning-company-riyadh/team-960.webp", width: 960, quality: 72, maxKb: 150 },
          { file: "cleaning-company-riyadh/team-640.webp", width: 640, quality: 70, maxKb: 100 },
          { file: "cleaning-company-riyadh/team.webp", width: 960, quality: 72, maxKb: 140 },
        ],
      },
    ],
  },
  {
    folderName: "تنظيف منازل بالرياض",
    jobs: [
      {
        inputPattern: /^hero/i,
        outputs: [
          { file: "house-cleaning-riyadh/hero-1920.webp", width: 1920, quality: 78, maxKb: 300 },
          { file: "house-cleaning-riyadh/hero-1200.webp", width: 1200, quality: 76, maxKb: 220 },
          { file: "house-cleaning-riyadh/hero-768.webp", width: 768, quality: 74, maxKb: 120 },
          { file: "house-cleaning-riyadh/hero.webp", width: 1400, quality: 76, maxKb: 280 },
        ],
      },
      {
        inputPattern: /تنظيف منازل/i,
        outputs: [
          { file: "house-cleaning-riyadh/living-room-960.webp", width: 960, quality: 72, maxKb: 150 },
          { file: "house-cleaning-riyadh/living-room-640.webp", width: 640, quality: 70, maxKb: 100 },
          { file: "house-cleaning-riyadh/living-room.webp", width: 960, quality: 72, maxKb: 140 },
        ],
      },
    ],
  },
  {
    folderName: "تنظيف فلل بالرياض",
    logoHeroPrefix: "villa-cleaning-riyadh",
    jobs: [
      {
        inputPattern: /تنظيف فلل|فلل/i,
        outputs: [
          { file: "villa-cleaning-riyadh/villa-interior-960.webp", width: 960, quality: 72, maxKb: 150 },
          { file: "villa-cleaning-riyadh/villa-interior-640.webp", width: 640, quality: 70, maxKb: 100 },
          { file: "villa-cleaning-riyadh/villa-interior.webp", width: 960, quality: 72, maxKb: 140 },
        ],
      },
    ],
  },
];

async function generateLogoHeroWebp(outputPath, width, quality, maxKb) {
  const logoPath = path.join(root, "public", "brand-logo.png");
  if (!fs.existsSync(logoPath)) {
    console.warn("⚠ brand-logo.png غير موجود — شغّل npm run brand:logo");
    return 0;
  }

  const height = Math.round((width * 9) / 16);
  const logoSize = Math.round(Math.min(width, height) * 0.82);
  const logoBuf = await renderBrandIcon(sharp, logoPath, logoSize);

  const whiteCanvasSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
    </svg>`,
  );

  let q = quality;
  let buf;
  for (let attempt = 0; attempt < 6; attempt++) {
    buf = await sharp(whiteCanvasSvg)
      .resize(width, height)
      .composite([{ input: logoBuf, gravity: "center" }])
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
    const config = pageConfigs.find((c) => c.folderName === folder.name);
    if (!config) {
      console.log(`⊘ تخطي ${folder.name} — لا إعداد`);
      continue;
    }

    const folderPath = path.join(pagesDir, folder.name);
    const files = fs.readdirSync(folderPath).filter((f) => /\.(png|jpe?g)$/i.test(f));

    if (config.logoHeroPrefix) {
      for (const out of heroOutputs(config.logoHeroPrefix)) {
        const dest = path.join(outBase, out.file);
        process.stdout.write(`→ ${out.file} (شعار) … `);
        const bytes = await generateLogoHeroWebp(dest, out.width, out.quality, out.maxKb);
        console.log(`${(bytes / 1024).toFixed(0)} KiB`);
      }
    }

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
