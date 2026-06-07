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

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** @type {{ folderName: string; logoHero?: { prefix: string; title: string; subtitle?: string }; logoHeroPrefix?: string; jobs: { inputPattern: RegExp; outputs: { file: string; width: number; quality: number; maxKb?: number }[] }[] }[] }[]} */
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
    folderName: "تنظيف شقق بالرياض",
    logoHeroPrefix: "apartment-cleaning-riyadh",
    jobs: [
      {
        inputPattern: /تنظيف شقق|شقق/i,
        outputs: [
          { file: "apartment-cleaning-riyadh/apartment-960.webp", width: 960, quality: 72, maxKb: 150 },
          { file: "apartment-cleaning-riyadh/apartment-640.webp", width: 640, quality: 70, maxKb: 100 },
          { file: "apartment-cleaning-riyadh/apartment.webp", width: 960, quality: 72, maxKb: 140 },
        ],
      },
    ],
  },
  {
    folderName: "تنظيف كنب بالرياض",
    logoHeroPrefix: "sofa-cleaning-riyadh",
    jobs: [
      {
        inputPattern: /كنب|كنبة|sofa/i,
        outputs: [
          { file: "sofa-cleaning-riyadh/sofa-960.webp", width: 960, quality: 72, maxKb: 150 },
          { file: "sofa-cleaning-riyadh/sofa-640.webp", width: 640, quality: 70, maxKb: 100 },
          { file: "sofa-cleaning-riyadh/sofa.webp", width: 960, quality: 72, maxKb: 140 },
        ],
      },
    ],
  },
  {
    folderName: "تنظيف مجالس بالرياض",
    logoHeroPrefix: "majlis-cleaning-riyadh",
    jobs: [
      {
        inputPattern: /مجالس|مجلس/i,
        outputs: [
          { file: "majlis-cleaning-riyadh/majlis-960.webp", width: 960, quality: 72, maxKb: 150 },
          { file: "majlis-cleaning-riyadh/majlis-640.webp", width: 640, quality: 70, maxKb: 100 },
          { file: "majlis-cleaning-riyadh/majlis.webp", width: 960, quality: 72, maxKb: 140 },
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

async function writeHeroWebp(outputPath, pipeline, quality, maxKb) {
  let q = quality;
  let buf;
  for (let attempt = 0; attempt < 6; attempt++) {
    buf = await pipeline.webp({ quality: q, effort: 4 }).toBuffer();
    if (!maxKb || buf.length <= maxKb * 1024) break;
    q -= 6;
    if (q < 48) break;
  }
  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.promises.writeFile(outputPath, buf);
  return buf.length;
}

/** كفر: شعار فقط على خلفية بيضاء */
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

  const pipeline = sharp(whiteCanvasSvg)
    .resize(width, height)
    .composite([{ input: logoBuf, gravity: "center" }]);

  return writeHeroWebp(outputPath, pipeline, quality, maxKb);
}

/** كفر: عنوان الصفحة + شعار + اسم الشركة */
async function generateBrandedTitleHeroWebp(outputPath, width, quality, maxKb, { title, subtitle }) {
  const logoPath = path.join(root, "public", "brand-logo.png");
  if (!fs.existsSync(logoPath)) {
    console.warn("⚠ brand-logo.png غير موجود — شغّل npm run brand:logo");
    return 0;
  }

  const height = Math.round((width * 9) / 16);
  const titleSize = Math.max(28, Math.round(width * 0.05));
  const subSize = Math.max(14, Math.round(width * 0.027));
  const logoSize = Math.round(Math.min(width, height) * 0.4);
  const logoTop = Math.round(height * 0.34);
  const logoLeft = Math.round((width - logoSize) / 2);

  const canvasSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" direction="rtl">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <text x="50%" y="${Math.round(height * 0.15)}" text-anchor="middle" dominant-baseline="middle"
        font-size="${titleSize}" font-weight="700" fill="#00236f"
        font-family="Tahoma, 'Segoe UI', Arial, sans-serif">${escapeXml(title)}</text>
      <text x="50%" y="${Math.round(height * 0.86)}" text-anchor="middle" dominant-baseline="middle"
        font-size="${subSize}" font-weight="600" fill="#1a5aa8"
        font-family="Tahoma, Arial, sans-serif">${escapeXml(subtitle)}</text>
    </svg>`,
  );

  const logoBuf = await renderBrandIcon(sharp, logoPath, logoSize);
  const pipeline = sharp(canvasSvg).resize(width, height).composite([
    { input: logoBuf, top: logoTop, left: logoLeft },
  ]);

  return writeHeroWebp(outputPath, pipeline, quality, maxKb);
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

  for (const config of pageConfigs) {
    if (config.logoHero) {
      for (const out of heroOutputs(config.logoHero.prefix)) {
        const dest = path.join(outBase, out.file);
        process.stdout.write(`→ ${out.file} (عنوان+شعار) … `);
        const bytes = await generateBrandedTitleHeroWebp(dest, out.width, out.quality, out.maxKb, {
          title: config.logoHero.title,
          subtitle: config.logoHero.subtitle ?? "السعودية للتنظيف",
        });
        console.log(`${(bytes / 1024).toFixed(0)} KiB`);
      }
    } else if (config.logoHeroPrefix) {
      for (const out of heroOutputs(config.logoHeroPrefix)) {
        const dest = path.join(outBase, out.file);
        process.stdout.write(`→ ${out.file} (شعار) … `);
        const bytes = await generateLogoHeroWebp(dest, out.width, out.quality, out.maxKb);
        console.log(`${(bytes / 1024).toFixed(0)} KiB`);
      }
    }
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
