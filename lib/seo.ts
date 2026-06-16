import type { Metadata } from "next";

import { brandNameAr } from "@/lib/brand";
import { heroImageUrl, ogImageHeight, ogImageWidth, siteUrl } from "@/lib/site";
import { locations } from "@/src/data/locations";

type BuildArabicPageMetadataArgs = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  /** افتراضي true — عند false تُستخدم robots لعدم الفهرسة مع الإبقاء على الرابط */
  indexable?: boolean;
};

const coreCleaningKeywords = [
  "شركة تنظيف الرياض",
  "مكافحة حشرات الرياض",
  "رش حشرات الرياض",
  "شركة تنظيف في السعودية",
  "خدمات تنظيف منازل",
  "تنظيف منازل",
  "تنظيف شقق",
  "تنظيف فلل",
  "تنظيف قصور",
  "تنظيف مكاتب",
  "تنظيف شركات",
  "تنظيف عميق",
  "تنظيف بالبخار",
  "غسيل سجاد",
  "تنظيف سجاد",
  "تنظيف موكيت",
  "تنظيف اثاث",
  "تنظيف أثاث",
  "تنظيف كنب",
  "تنظيف مجالس",
  "تنظيف مفروشات",
  "تنظيف ستائر",
  "رش حشرات",
  "مكافحة حشرات",
  "شركة رش حشرات",
  "تعقيم منازل",
  "تطهير منازل",
  "تنظيف خزانات",
  "تنظيف واجهات",
  "تنظيف واجهات زجاجية",
  "تنظيف بعد التشطيب",
  "تنظيف بعد البناء",
  "خدمات تنظيف شاملة",
  "شركة تنظيف الرياض",
  "شركة تنظيف جدة",
  "شركة تنظيف الدمام",
];

const locationKeywordRoots = [
  "تنظيف منازل",
  "تنظيف شقق",
  "تنظيف فلل",
  "تنظيف مكاتب",
  "تنظيف سجاد",
  "تنظيف اثاث",
  "تنظيف أثاث",
  "تنظيف كنب",
  "تنظيف مجالس",
  "رش حشرات",
  "مكافحة حشرات",
];

const locationSeoKeywords = locations.flatMap((city) => [
  ...locationKeywordRoots.map((keyword) => `${keyword} ${city.name}`),
  ...city.neighborhoods.flatMap((neighborhood) =>
    locationKeywordRoots.map((keyword) => `${keyword} حي ${neighborhood.name} ${city.name}`),
  ),
]);

export const arabicSeoKeywords = [...new Set([...coreCleaningKeywords, ...locationSeoKeywords])];

export function getMetadataBase() {
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT?.trim() || "3000";
    return new URL(`http://127.0.0.1:${port}`);
  }
  return new URL(siteUrl);
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${getMetadataBase().origin}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Google SERP title guidance — Arabic copy, ~60–65 graphemes */
export const META_TITLE_MIN_LEN = 60;
export const META_TITLE_MAX_LEN = 65;

/** Meta description target — ~155–160 characters */
export const META_DESCRIPTION_TARGET_LEN = 160;

function trimAtNaturalBreak(text: string, maxLen: number): string {
  const t = text.trim();
  if (t.length <= maxLen) return t;
  const cut = t.slice(0, maxLen - 1).trimEnd();
  const lastSep = Math.max(cut.lastIndexOf("|"), cut.lastIndexOf("—"), cut.lastIndexOf("–"));
  const lastSpace = cut.lastIndexOf(" ");
  const breakAt =
    lastSep > maxLen * 0.45 ? lastSep : lastSpace > maxLen * 0.55 ? lastSpace : cut.length;
  return `${cut.slice(0, breakAt > 0 ? breakAt : cut.length).trimEnd()}…`;
}

/** Prefer dropping trailing brand segments before hard truncation */
function trimTitleAtNaturalBreak(text: string, maxLen: number): string {
  const t = text.trim();
  if (t.length <= maxLen) return t;
  for (const sep of ["|", "—", "–"] as const) {
    if (!t.includes(sep)) continue;
    const parts = t.split(sep).map((p) => p.trim());
    let acc = parts[0];
    for (let i = 1; i < parts.length; i++) {
      const next = `${acc} ${sep} ${parts[i]}`.replace(/\s+/g, " ").trim();
      if (next.length <= maxLen) acc = next;
      else break;
    }
    if (acc.length <= maxLen) return acc;
    if (parts[0].length <= maxLen) return parts[0];
  }
  return trimAtNaturalBreak(t, maxLen);
}

/** Keeps titles within SERP length; pads very short titles with brand context when possible */
export function fitMetaTitle(title: string): string {
  const t = title.trim().replace(/\s+/g, " ");
  if (t.length >= META_TITLE_MIN_LEN && t.length <= META_TITLE_MAX_LEN) return t;
  if (t.length > META_TITLE_MAX_LEN) return trimTitleAtNaturalBreak(t, META_TITLE_MAX_LEN);

  const candidates: string[] = [t];
  const pads = [
    `| ${brandNameAr}`,
    "— شركة تنظيف بالرياض",
    "بالرياض | السعودية للتنظيف",
    "في الرياض",
  ] as const;

  for (const pad of pads) {
    const alreadyHasBrand = pad.includes(brandNameAr) && t.includes(brandNameAr);
    if (alreadyHasBrand && pad.startsWith("|")) continue;
    if ((pad === "في الرياض" || pad.includes("بالرياض")) && /الرياض/.test(t)) continue;
    candidates.push(`${t} ${pad}`.replace(/\s+/g, " ").trim());
  }

  const inRange = candidates.filter(
    (c) => c.length >= META_TITLE_MIN_LEN && c.length <= META_TITLE_MAX_LEN,
  );
  if (inRange.length) {
    return inRange.sort((a, b) => b.length - a.length)[0];
  }

  const underMax = candidates.filter((c) => c.length <= META_TITLE_MAX_LEN);
  if (underMax.length) {
    return underMax.sort((a, b) => b.length - a.length)[0];
  }

  const longest = candidates.sort((a, b) => b.length - a.length)[0];
  return trimTitleAtNaturalBreak(longest, META_TITLE_MAX_LEN);
}

/** Trim Arabic copy for HTML meta description length */
export function truncateForMetaDescription(text: string, maxLen = META_DESCRIPTION_TARGET_LEN): string {
  const t = text.trim();
  if (t.length <= maxLen) return t;
  return trimAtNaturalBreak(t, maxLen);
}

/** Pads short descriptions with a CTA line without exceeding SERP limits */
export function expandMetaDescription(
  text: string,
  cta = "احجز معاينة مجانية عبر واتساب.",
): string {
  let t = text.trim().replace(/\s+/g, " ");
  if (t.length > META_DESCRIPTION_TARGET_LEN) return truncateForMetaDescription(t);
  if (t.length >= 148) return t;
  if (t && !/[.!?…]$/.test(t)) t = `${t}.`;
  const padded = `${t} ${cta}`.trim();
  if (padded.length <= META_DESCRIPTION_TARGET_LEN) return padded;
  return truncateForMetaDescription(t);
}

/** hreflang و canonical لكل صفحة — لا تُورّث من layout. */
export function buildPageAlternates(canonicalPath: string): NonNullable<Metadata["alternates"]> {
  const normalized = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  const pageUrl = absoluteUrl(normalized);
  return {
    canonical: normalized,
    languages: {
      "ar-SA": pageUrl,
      "x-default": pageUrl,
    },
  };
}

export function buildArabicPageMetadata({
  title,
  description,
  canonical,
  keywords = [],
  image = heroImageUrl,
  imageAlt = title,
  type = "website",
  indexable = true,
}: BuildArabicPageMetadataArgs): Metadata {
  const canonicalPath = canonical.startsWith("/") ? canonical : `/${canonical}`;
  const url = absoluteUrl(canonicalPath);

  const robots = indexable
    ? {
        index: true as const,
        follow: true as const,
        googleBot: {
          index: true as const,
          follow: true as const,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false as const,
        follow: true as const,
        googleBot: { index: false as const, follow: true as const },
      };

  const fittedTitle = fitMetaTitle(title);
  const fittedDescription = expandMetaDescription(description);

  return {
    metadataBase: getMetadataBase(),
    title: { absolute: fittedTitle },
    description: fittedDescription,
    /** كلمات مفتاحية خاصة بالصفحة فقط — بدون حقن عالمي (تجنّب keyword stuffing) */
    ...(keywords.length > 0 ? { keywords: [...new Set(keywords)].slice(0, 15) } : {}),
    alternates: buildPageAlternates(canonicalPath),
    robots,
    openGraph: {
      title: fittedTitle,
      description: fittedDescription,
      type,
      url,
      locale: "ar_SA",
      siteName: brandNameAr,
      images: [
        {
          url: image,
          alt: imageAlt,
          ...(image === heroImageUrl ? { width: ogImageWidth, height: ogImageHeight } : {}),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fittedTitle,
      description: fittedDescription,
      images: [image],
    },
  };
}
