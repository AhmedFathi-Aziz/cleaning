/**
 * يحضّر صورة هيرو «مكافحة الصراصير بالرياض» — ضغط WebP واختياري دمج شعار.
 * التشغيل: node scripts/brand-cockroach-hero.mjs [مسار-الصورة-الأساسية]
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const defaultBase = path.join(
  process.env.USERPROFILE ?? "",
  ".cursor",
  "projects",
  "d-The-Work-Cleaning",
  "assets",
  "cockroach-hero-generated.png",
);
const basePath = process.argv[2] ?? defaultBase;
const outDir = path.join(root, "public", "images", "cockroach-control-riyadh");
const outWebp = path.join(outDir, "technician-spraying.webp");
const outPng = path.join(outDir, "hero-source.png");

async function main() {
  if (!fs.existsSync(basePath)) {
    console.error("[brand-cockroach-hero] الصورة غير موجودة:", basePath);
    process.exit(1);
  }

  await fs.promises.mkdir(outDir, { recursive: true });

  const { width, height } = await sharp(basePath).metadata();
  const targetWidth = Math.min(1400, width ?? 1400);

  let pipeline = sharp(basePath)
    .rotate()
    .resize(targetWidth, null, { withoutEnlargement: true, fit: "inside" });

  await pipeline
    .webp({ quality: 80, effort: 5 })
    .toFile(outWebp);

  await sharp(basePath).rotate().png().toFile(outPng);

  const kb = Math.round(fs.statSync(outWebp).size / 1024);
  const meta = await sharp(outWebp).metadata();
  console.log("[brand-cockroach-hero] ✓", outWebp, `${meta.width}x${meta.height}`, `${kb}KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
