import type { Metadata } from "next";

import { SiteNationalNews } from "@/components/SiteNationalNews";
import { loadNationalNews } from "@/lib/national-news-store";
import { buildArabicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "أخبار وطنية عن التنظيف والصحة | السعودية للتنظيف",
  description:
    "متابعة أخبار وطنية تهم المملكة العربية السعودية في التنظيف والصحة والبلديات — ملخصات مرتبطة بخدمات المنازل والمنشآت مع روابط للمصادر الرسمية عند توفرها.",
  canonical: "/news",
  keywords: [
    "أخبار السعودية",
    "مملكة العربية السعودية",
    "قطاع الخدمات",
    "مناخ الأعمال",
  ],
});

export default function NationalNewsPage() {
  const articles = loadNationalNews();
  return <SiteNationalNews articles={articles} />;
}
