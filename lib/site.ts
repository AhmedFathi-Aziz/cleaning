const FALLBACK_SITE_URL = "https://saudi-cleaning.com";
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

function stripTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

function isLocalUrl(url: string) {
  try {
    const parsed = new URL(url);
    return LOCAL_HOSTNAMES.has(parsed.hostname.toLowerCase());
  } catch {
    return false;
  }
}

function resolvePublicSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!candidate) return FALLBACK_SITE_URL;

  const normalized = stripTrailingSlash(candidate);
  if (isLocalUrl(normalized)) return FALLBACK_SITE_URL;
  return normalized;
}

export const siteUrl = resolvePublicSiteUrl();

/** صورة OG/LCP — فيلا عصرية بإضاءة طبيعية (خلفية الصفحة الرئيسية) */
export const heroImageUrl = `${siteUrl}/images/services-villa.webp`;

/** أبعاد `/images/hero.webp` الفعلية — يجب أن تطابق الملف لاجتياز فحص OG في Lighthouse */
export const ogImageWidth = 512;
export const ogImageHeight = 512;
