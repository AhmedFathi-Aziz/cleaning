/**
 * يحوّل شعار PNG شفاف إلى أيقونة مربعة — نفس الشكل الظاهر في الهيدر (trim + contain + توسيط).
 */
export async function renderBrandIcon(sharp, input, size) {
  const trimmed = await sharp(input).ensureAlpha().trim({ threshold: 12 }).png().toBuffer();
  const fill = Math.round(size * 0.92);

  const logo = await sharp(trimmed)
    .resize(fill, fill, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}
