import type { Metadata } from "next";

import { brandNameAr } from "@/lib/brand";
import { heroImageUrl, siteUrl } from "@/lib/site";
import { locations } from "@/src/data/locations";

type BuildArabicPageMetadataArgs = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

const coreCleaningKeywords = [
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
  return new URL(process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? siteUrl);
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${getMetadataBase().origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildArabicPageMetadata({
  title,
  description,
  canonical,
  keywords = [],
  image = heroImageUrl,
  imageAlt = title,
  type = "website",
}: BuildArabicPageMetadataArgs): Metadata {
  const canonicalPath = canonical.startsWith("/") ? canonical : `/${canonical}`;
  const url = absoluteUrl(canonicalPath);

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    keywords: [...new Set([...keywords, ...arabicSeoKeywords])],
    alternates: { canonical: canonicalPath },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      type,
      url,
      locale: "ar_SA",
      siteName: brandNameAr,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
