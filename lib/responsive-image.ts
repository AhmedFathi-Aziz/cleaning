/** أعرض جاهزة لـ srcset — تُولَّد عبر `npm run images:responsive` */
export const RESPONSIVE_IMAGE_WIDTHS = [768, 1200, 1920] as const;

export type LocalImageSources = {
  defaultSrc: string;
  srcSet: string;
};

function isLocalWebpPath(src: string): boolean {
  return src.startsWith("/images/") && src.endsWith(".webp");
}

/** يبني srcSet لملف WebP محلي إن وُجدت نسخ -768 / -1200 / -1920 */
export function getLocalImageSources(src: string): LocalImageSources | null {
  if (!isLocalWebpPath(src)) return null;
  if (/-\d+\.webp$/i.test(src)) {
    return { defaultSrc: src, srcSet: `${src} 1x` };
  }

  const base = src.replace(/\.webp$/i, "");
  const parts = RESPONSIVE_IMAGE_WIDTHS.map((w) => `${base}-${w}.webp ${w}w`);
  parts.push(`${src} 1400w`);

  return {
    defaultSrc: `${base}-1200.webp`,
    srcSet: parts.join(", "),
  };
}

export function getLcpPreloadLinks(heroSrc: string) {
  const sources = getLocalImageSources(heroSrc);
  if (!sources) {
    return { href: heroSrc, imageSrcSet: undefined as string | undefined };
  }
  return { href: sources.defaultSrc, imageSrcSet: sources.srcSet };
}
