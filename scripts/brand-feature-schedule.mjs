/**
 * يضيف شعار الشركة على صورة «دقة في المواعيد» — مواضع مُعايرة على جسم العربية وظهر الزي.
 * التشغيل: node scripts/brand-feature-schedule.mjs [مسار-الصورة-الأساسية]
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
  "feature-punctual-service-riyadh.png",
);
const basePath = process.argv[2] ?? defaultBase;
const logoPath = path.join(root, "public", "brand-logo.png");
const outWebp = path.join(root, "public", "images", "feature-schedule.webp");
const outPng = path.join(root, "public", "images", "feature-schedule-source.png");

/** مواضع مُعايرة يدوياً على الصورة 1536×1024 */
const PLACEMENT = {
  van: {
    logoWidth: 132,
    left: 252,
    top: 492,
    perspective: { scaleX: 1.02, scaleY: 0.84, skew: -0.03 },
    shadow: { dx: 1, dy: 2, blur: 2, opacity: 0.09 },
  },
  shirt: {
    logoWidth: 102,
    left: 736,
    top: 418,
    shadow: { dx: 1, dy: 2, blur: 1.5, opacity: 0.12 },
    opacity: 0.98,
  },
};

function scalePlacement(placement, width, height) {
  const sx = width / 1536;
  const sy = height / 1024;
  return {
    van: {
      ...placement.van,
      logoWidth: Math.round(placement.van.logoWidth * sx),
      left: Math.round(placement.van.left * sx),
      top: Math.round(placement.van.top * sy),
    },
    shirt: {
      ...placement.shirt,
      logoWidth: Math.round(placement.shirt.logoWidth * sx),
      left: Math.round(placement.shirt.left * sx),
      top: Math.round(placement.shirt.top * sy),
    },
  };
}

async function prepareVanLogo(logoFile, width, perspective) {
  let resized = await sharp(logoFile).resize(width, null, { fit: "inside" }).png().toBuffer();
  const meta = await sharp(resized).metadata();
  resized = await sharp(resized)
    .resize(
      Math.round(meta.width * perspective.scaleX),
      Math.round(meta.height * perspective.scaleY),
      { fit: "fill" },
    )
    .affine(
      [
        [1, perspective.skew],
        [0, 1],
      ],
      { background: { r: 0, g: 0, b: 0, alpha: 0 } },
    )
    .modulate({ brightness: 1.01, saturation: 0.88 })
    .png()
    .toBuffer();
  return resized;
}

async function prepareShirtLogo(logoFile, width) {
  return sharp(logoFile)
    .resize(width, null, { fit: "inside" })
    .modulate({ brightness: 0.98, saturation: 0.86 })
    .png()
    .toBuffer();
}

async function withContactShadow(buffer, { dx = 1, dy = 2, blur = 3, opacity = 0.2 } = {}) {
  const meta = await sharp(buffer).metadata();
  if (!meta.width || !meta.height) throw new Error("شعار فارغ بعد التحويل");
  const pad = Math.round(blur);
  const shiftX = Math.round(dx);
  const shiftY = Math.round(dy);
  const shadow = await sharp(buffer)
    .ensureAlpha()
    .extractChannel(3)
    .toColourspace("b-w")
    .linear(opacity, 0)
    .blur(blur)
    .toBuffer();

  const shadowRgba = await sharp({
    create: { width: meta.width, height: meta.height, channels: 3, background: { r: 0, g: 0, b: 0 } },
  })
    .joinChannel(shadow)
    .png()
    .toBuffer();

  const offX = Math.round(Math.max(shiftX, 0));
  const offY = Math.round(Math.max(shiftY, 0));
  const logoX = Math.round(Math.max(-shiftX, 0));
  const logoY = Math.round(Math.max(-shiftY, 0));

  return sharp({
    create: {
      width: meta.width + Math.abs(shiftX) + pad * 2,
      height: meta.height + Math.abs(shiftY) + pad * 2,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: shadowRgba, left: pad + offX, top: pad + offY },
      { input: buffer, left: pad + logoX, top: pad + logoY },
    ])
    .png()
    .toBuffer();
}

async function addFilmGrain(buffer, width, height, amount = 11) {
  const pixels = width * height;
  const noise = Buffer.alloc(pixels);
  for (let i = 0; i < pixels; i++) {
    noise[i] = 116 + Math.floor(Math.random() * amount);
  }
  const grain = await sharp(noise, { raw: { width, height, channels: 1 } }).png().toBuffer();
  return sharp(buffer).composite([{ input: grain, blend: "overlay", opacity: 0.11 }]).png().toBuffer();
}

async function addVignette(buffer, width, height) {
  const svg = `
    <svg width="${width}" height="${height}">
      <defs>
        <radialGradient id="v" cx="50%" cy="48%" r="72%">
          <stop offset="55%" stop-color="rgba(0,0,0,0)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.22)" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#v)" />
    </svg>`;
  return sharp(buffer).composite([{ input: Buffer.from(svg), blend: "multiply", opacity: 0.35 }]).png().toBuffer();
}

async function finishPhoto(buffer) {
  const { width, height } = await sharp(buffer).metadata();

  let out = await sharp(buffer)
    .modulate({ brightness: 1.0, saturation: 0.93, hue: 2 })
    .gamma(1.06)
    .linear(1.04, -6)
    .blur(0.35)
    .sharpen({ sigma: 0.35, m1: 0.35, m2: 0.15 })
    .jpeg({ quality: 90, chromaSubsampling: "4:2:0", mozjpeg: true })
    .toBuffer();

  out = await sharp(out).png().toBuffer();
  out = await addFilmGrain(out, width, height);
  out = await addVignette(out, width, height);
  return out;
}

async function main() {
  if (!fs.existsSync(basePath)) {
    console.error("[brand-feature-schedule] الصورة الأساسية غير موجودة:", basePath);
    process.exit(1);
  }
  if (!fs.existsSync(logoPath)) {
    console.error("[brand-feature-schedule] الشعار غير موجود:", logoPath);
    process.exit(1);
  }

  const { width, height } = await sharp(basePath).metadata();
  const place = scalePlacement(PLACEMENT, width, height);

  const vanLogo = await prepareVanLogo(logoPath, place.van.logoWidth, PLACEMENT.van.perspective);
  const shirtLogo = await prepareShirtLogo(logoPath, place.shirt.logoWidth);

  const vanDecal = await withContactShadow(vanLogo, PLACEMENT.van.shadow);
  const shirtDecal = await withContactShadow(shirtLogo, PLACEMENT.shirt.shadow);

  const vanMeta = await sharp(vanDecal).metadata();
  const shirtMeta = await sharp(shirtDecal).metadata();

  let composed = await sharp(basePath)
    .composite([
      { input: vanDecal, left: place.van.left, top: place.van.top, blend: "over" },
      {
        input: shirtDecal,
        left: place.shirt.left,
        top: place.shirt.top,
        blend: "over",
        opacity: PLACEMENT.shirt.opacity,
      },
    ])
    .png()
    .toBuffer();

  composed = await finishPhoto(composed);

  await fs.promises.writeFile(outPng, composed);
  await sharp(composed)
    .resize(900, null, { withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(outWebp);

  const kb = Math.round(fs.statSync(outWebp).size / 1024);
  console.log("[brand-feature-schedule] ✓", outWebp, `${kb}KB`);
  console.log("[brand-feature-schedule] van @", place.van.left, place.van.top, vanMeta.width, "x", vanMeta.height);
  console.log("[brand-feature-schedule] shirt @", place.shirt.left, place.shirt.top, shirtMeta.width, "x", shirtMeta.height);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
