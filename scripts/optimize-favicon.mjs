import fs from "node:fs";
import path from "node:path";

import { renderBrandIcon } from "./lib/render-brand-icon.mjs";

const publicDir = path.join(process.cwd(), "public");
const appDir = path.join(process.cwd(), "app");

/** مصدر واحد = نفس ملف الهيدر بعد إزالة الخلفية */
const candidates = [
  path.join(publicDir, "brand-logo.png"),
  path.join(publicDir, "favicon.png"),
  path.join(publicDir, "brand-logo-source.png"),
];

/** ICO واحد يحتوي PNG (مدعوم Windows/macOS/Chrome) */
function pngToIco(pngBuffer) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = 32;
  entry[1] = 32;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

async function writeIcoFromExisting32() {
  const favicon32 = path.join(publicDir, "favicon-32.png");
  if (!fs.existsSync(favicon32)) return false;
  const png = fs.readFileSync(favicon32);
  const ico = pngToIco(png);
  await fs.promises.mkdir(appDir, { recursive: true });
  await fs.promises.writeFile(path.join(appDir, "favicon.ico"), ico);
  console.log(`✓ app/favicon.ico ← favicon-32.png (${(ico.length / 1024).toFixed(1)} KiB)`);
  return true;
}

async function main() {
  await fs.promises.mkdir(publicDir, { recursive: true });

  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn("[optimize-favicon] sharp غير متاح — استخدام favicon-32.png إن وُجد.");
    await writeIcoFromExisting32();
    return;
  }

  const input = candidates.find((p) => fs.existsSync(p)) ?? null;

  if (!input) {
    if (await writeIcoFromExisting32()) return;
    console.warn("[optimize-favicon] لا يوجد مصدر للوجو.");
    return;
  }

  const sizes = [
    [16, "favicon-16.png"],
    [32, "favicon-32.png"],
    [48, "favicon-48.png"],
    [180, "apple-touch-icon.png"],
  ];

  let favicon32 = null;
  let favicon48 = null;

  for (const [size, name] of sizes) {
    const buf = await renderBrandIcon(sharp, input, size);
    await fs.promises.writeFile(path.join(publicDir, name), buf);
    if (size === 32) favicon32 = buf;
    if (size === 48) favicon48 = buf;
    console.log(`✓ ${name} ← ${path.basename(input)} (${(buf.length / 1024).toFixed(1)} KiB)`);
  }

  await fs.promises.mkdir(appDir, { recursive: true });

  if (favicon32) {
    const ico = pngToIco(favicon32);
    await fs.promises.writeFile(path.join(appDir, "favicon.ico"), ico);
    console.log(`✓ app/favicon.ico (${(ico.length / 1024).toFixed(1)} KiB)`);
  }

  const appIcon = favicon48 ?? favicon32;
  if (appIcon) {
    await fs.promises.writeFile(path.join(appDir, "icon.png"), appIcon);
    console.log("✓ app/icon.png");
  }

  const apple48 = path.join(publicDir, "apple-touch-icon.png");
  if (fs.existsSync(apple48)) {
    await fs.promises.copyFile(apple48, path.join(appDir, "apple-icon.png"));
    console.log("✓ app/apple-icon.png");
  }
}

await main();
