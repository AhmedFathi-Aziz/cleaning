/**
 * يحضّر صورة جل صراصير لصفحة مكافحة الصراصير بالرياض.
 * التشغيل: node scripts/brand-cockroach-gel.mjs [مسار-الصورة-الأساسية]
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
  "cockroach-gel-generated.png",
);
const basePath = process.argv[2] ?? defaultBase;
const outDir = path.join(root, "public", "images", "cockroach-control-riyadh");
const outWebp = path.join(outDir, "kitchen-gel-treatment.webp");
const outPng = path.join(outDir, "kitchen-gel-source.png");

async function main() {
  if (!fs.existsSync(basePath)) {
    console.error("[brand-cockroach-gel] الصورة غير موجودة:", basePath);
    process.exit(1);
  }

  await fs.promises.mkdir(outDir, { recursive: true });

  const { width } = await sharp(basePath).metadata();
  const targetWidth = Math.min(1400, width ?? 1400);

  await sharp(basePath)
    .rotate()
    .resize(targetWidth, null, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality: 80, effort: 5 })
    .toFile(outWebp);

  await sharp(basePath).rotate().png().toFile(outPng);

  const kb = Math.round(fs.statSync(outWebp).size / 1024);
  const meta = await sharp(outWebp).metadata();
  console.log("[brand-cockroach-gel] ✓", outWebp, `${meta.width}x${meta.height}`, `${kb}KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
