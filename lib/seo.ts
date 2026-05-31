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
  return new URL(siteUrl);
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${getMetadataBase().origin}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Trim Arabic copy for HTML meta description length */
export function truncateForMetaDescription(text: string, maxLen = 118): string {
  const t = text.trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen - 1).trimEnd()}…`;
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

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    keywords: [...new Set([...keywords, ...arabicSeoKeywords])].slice(0, 52),
    alternates: { canonical: canonicalPath },
    robots,
    openGraph: {
      title,
      description,
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
      title,
      description,
      images: [image],
    },
  };
}
