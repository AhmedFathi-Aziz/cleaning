import type { Metadata } from "next";

import { SiteNationalNews } from "@/components/SiteNationalNews";
import { loadNationalNews } from "@/lib/national-news-store";
import { buildArabicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "الأخبار الوطنية",
  description:
    "متابعة أخبار وطنية تهم المملكة العربية السعودية في إطار يهم قطاع الخدمات والمنشآت — مع روابط للمصادر الرسمية عند توفرها.",
  canonical: "/news",
  keywords: [
    "أخبار السعودية",
    "مملكة العربية السعودية",
    "قطاع الخدمات",
    "مناخ الأعمال",
  ],
});

export default async function NationalNewsPage() {
  const articles = await loadNationalNews();
  return <SiteNationalNews articles={articles} />;
}
