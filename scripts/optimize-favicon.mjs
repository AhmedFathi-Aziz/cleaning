/**
 * يولّد أيقونات صغيرة للمتصفح والهيدر من `public/favicon.png` أو `public/favicon.ico`،
 * أو يُنشئ أيقونة بدائية صغيرة الحجم إن لم يتوفر المصدر (لتجنّب تحميل PNG ضخمة في كل صفحة).
 * تشغيل: `npm run favicon:optimize` — يُستدعى تلقائياً قبل `npm run build`.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const sourcePng = path.join(publicDir, "favicon.png");
const sourceIco = path.join(publicDir, "favicon.ico");

async function writeFallbackPng(size, destName) {
  const dest = path.join(publicDir, destName);
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 30, g: 58, b: 138, alpha: 1 },
    },
  })
    .png({ compressionLevel: 9 })
    .toFile(dest);
  return dest;
}

async function main() {
  await fs.promises.mkdir(publicDir, { recursive: true });

  const hasPng = await fs.promises.stat(sourcePng).catch(() => null);
  const hasIco = await fs.promises.stat(sourceIco).catch(() => null);

  let input = null;
  if (hasPng) input = sourcePng;
  else if (hasIco) input = sourceIco;

  if (!input) {
    console.warn("[optimize-favicon] لا يوجد favicon.png أو favicon.ico — إنشاء أيقونات بدائية صغيرة.");
    for (const [size, name] of [
      [32, "favicon-32.png"],
      [48, "favicon-48.png"],
      [180, "apple-touch-icon.png"],
    ]) {
      await writeFallbackPng(size, name);
      const st = await fs.promises.stat(path.join(publicDir, name));
      console.log(`✓ ${name} (${(st.size / 1024).toFixed(1)} KiB)`);
    }
    return;
  }

  for (const [size, name] of [
    [32, "favicon-32.png"],
    [48, "favicon-48.png"],
    [180, "apple-touch-icon.png"],
  ]) {
    await sharp(input)
      .resize(size, size, { fit: "cover" })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, name));
    const st = await fs.promises.stat(path.join(publicDir, name));
    console.log(`✓ ${name} ← ${path.basename(input)} (${(st.size / 1024).toFixed(1)} KiB)`);
  }
}

await main();
