import fs from "node:fs";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");
const candidates = [
  path.join(publicDir, "favicon.png"),
  path.join(publicDir, "saudi-emblem.png"),
  path.join(publicDir, "brand-logo-source.png"),
];

/** ICO واحد يحتوي PNG (مدعوم Windows/macOS/Chrome) */
function pngToIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = size >= 256 ? 0 : size;
  entry[1] = size >= 256 ? 0 : size;
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
  const ico = pngToIco(png, 32);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico);
  console.log(`✓ favicon.ico ← favicon-32.png (${(ico.length / 1024).toFixed(1)} KiB)`);
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

  const resizeOpts = {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  };

  const sizes = [
    [32, "favicon-32.png"],
    [48, "favicon-48.png"],
    [180, "apple-touch-icon.png"],
  ];

  let favicon32 = null;

  for (const [size, name] of sizes) {
    const buf = await sharp(input)
      .resize(size, size, resizeOpts)
      .png({ compressionLevel: 9 })
      .toBuffer();
    await fs.promises.writeFile(path.join(publicDir, name), buf);
    if (size === 32) favicon32 = buf;
    console.log(`✓ ${name} ← ${path.basename(input)} (${(buf.length / 1024).toFixed(1)} KiB)`);
  }

  if (favicon32) {
    const ico = pngToIco(favicon32, 32);
    await fs.promises.writeFile(path.join(publicDir, "favicon.ico"), ico);
    console.log(`✓ favicon.ico (${(ico.length / 1024).toFixed(1)} KiB)`);
  }
}

await main();
