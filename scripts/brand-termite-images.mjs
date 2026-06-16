/**
 * يحضّر صور صفحة مكافحة النمل الأبيض بالرياض.
 * التشغيل: node scripts/brand-termite-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const assetsDir = path.join(process.env.USERPROFILE ?? "", ".cursor", "projects", "d-The-Work-Cleaning", "assets");
const outDir = path.join(root, "public", "images", "termite-control-riyadh");

const JOBS = [
  {
    src: path.join(assetsDir, "termite-inspection-generated.png"),
    out: "wood-inspection.webp",
    width: 1400,
    quality: 78,
    maxKb: 280,
  },
  {
    src: path.join(assetsDir, "termite-soil-treatment-generated.png"),
    out: "soil-barrier-treatment.webp",
    width: 1400,
    quality: 78,
    maxKb: 150,
  },
];

async function optimize({ src, out, width, quality, maxKb }) {
  if (!fs.existsSync(src)) {
    console.error("[brand-termite-images] غير موجود:", src);
    process.exit(1);
  }
  const outPath = path.join(outDir, out);
  let q = quality;
  let buffer;
  for (let attempt = 0; attempt < 6; attempt++) {
    buffer = await sharp(src)
      .rotate()
      .resize(width, null, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality: q, effort: 5 })
      .toBuffer();
    const kb = buffer.length / 1024;
    if (kb <= maxKb || q <= 62) break;
    q -= 4;
  }
  await fs.promises.writeFile(outPath, buffer);
  const meta = await sharp(outPath).metadata();
  const kb = Math.round(buffer.length / 1024);
  console.log("[brand-termite-images] ✓", outPath, `${meta.width}x${meta.height}`, `${kb}KB`);
}

async function main() {
  await fs.promises.mkdir(outDir, { recursive: true });
  for (const job of JOBS) await optimize(job);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
