/**
 * يزيل الخلفية من شعار الشركة ويولّد ملفات للهيدر والأيقونات.
 * الاستخدام: node scripts/process-brand-logo.mjs [مسار-الصورة]
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

import { renderBrandIcon } from "./lib/render-brand-icon.mjs";

const root = process.cwd();
const defaultInput = path.join(root, "public", "brand-logo-source.png");
const input = process.argv[2] ? path.resolve(process.argv[2]) : defaultInput;
const publicDir = path.join(root, "public");
const appDir = path.join(root, "app");

function dist(r1, g1, b1, r2, g2, b2) {
  return Math.hypot(r1 - r2, g1 - g2, b1 - b2);
}

function sampleBackground(data, w, h, ch) {
  const points = [
    [2, 2],
    [w - 3, 2],
    [2, h - 3],
    [w - 3, h - 3],
    [Math.floor(w / 2), 2],
    [Math.floor(w / 2), h - 3],
    [2, Math.floor(h / 2)],
    [w - 3, Math.floor(h / 2)],
  ];
  let r = 0;
  let g = 0;
  let b = 0;
  for (const [x, y] of points) {
    const i = (y * w + x) * ch;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  const n = points.length;
  return { r: r / n, g: g / n, b: b / n };
}

function isLogoGreen(r, g, b) {
  if (g < 55) return false;
  if (g > r + 12 && g >= b) return true;
  if (r < 90 && g < 120 && b < 90 && g > r) return true;
  return false;
}

function isNearWhite(r, g, b) {
  return r > 238 && g > 238 && b > 238;
}

async function removeBackground(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;
  const bg = sampleBackground(data, w, h, ch);
  const lightBg = bg.r > 200 && bg.g > 200 && bg.b > 200;
  const hardCut = lightBg ? 52 : 38;
  const soft = lightBg ? 36 : 28;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (isLogoGreen(r, g, b)) continue;

      const d = dist(r, g, b, bg.r, bg.g, bg.b);
      const nearBg = d <= hardCut || (lightBg && isNearWhite(r, g, b));
      if (nearBg) {
        data[i + 3] = 0;
      } else if (d <= hardCut + soft) {
        const t = (d - hardCut) / soft;
        data[i + 3] = Math.min(data[i + 3], Math.round(255 * t));
      }
    }
  }

  return sharp(data, { raw: { width: w, height: h, channels: 4 } }).png();
}

async function writeFaviconSource(pngOut) {
  const faviconSrc = path.join(publicDir, "favicon.png");
  const buf = await renderBrandIcon(sharp, pngOut, 512);
  await fs.promises.writeFile(faviconSrc, buf);
  console.log("[brand-logo] ✓ favicon source →", faviconSrc);
}

async function main() {
  if (!fs.existsSync(input)) {
    console.error("[brand-logo] المصدر غير موجود:", input);
    process.exit(1);
  }

  const source = fs.readFileSync(input);
  const transparent = await removeBackground(source);

  const pngOut = path.join(publicDir, "brand-logo.png");
  const webp192 = path.join(publicDir, "brand-logo-192.webp");
  const webp512 = path.join(publicDir, "brand-logo-512.webp");

  const pngBuffer = await transparent.clone().png({ compressionLevel: 9 }).toBuffer();
  await fs.promises.writeFile(pngOut, pngBuffer);
  await writeFaviconSource(pngOut);

  await transparent
    .clone()
    .resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(webp192);

  await transparent
    .clone()
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(webp512);

  const legacy = [
    "saudi-emblem.png",
    "saudi-emblem-192.webp",
    "saudi-emblem-512.webp",
    "site-logo.svg",
    "saudi-emblem.svg",
  ];
  for (const name of legacy) {
    const p = path.join(publicDir, name);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log("[brand-logo] removed legacy", name);
    }
  }

  console.log("[brand-logo] ✓", pngOut);
  console.log("[brand-logo] ✓", webp192);
  console.log("[brand-logo] ✓", webp512);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
