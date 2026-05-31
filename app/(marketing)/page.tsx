import type { Metadata } from "next";

import { HomeFaqSection } from "@/components/HomeFaqSection";
import { HomeLatestPublishing } from "@/components/HomeLatestPublishing";
import { HomeNationalNewsSection } from "@/components/HomeNationalNewsSection";
import { HomeServiceAreasTeaser } from "@/components/HomeServiceAreasTeaser";
import { HomeUsefulGuide } from "@/components/HomeUsefulGuide";
import { SiteHome } from "@/components/SiteHome";
import { brandNameAr } from "@/lib/brand";
import { loadNationalNews } from "@/lib/national-news-store";
import { loadPosts } from "@/lib/post-store";
import { heroImageUrl, ogImageHeight, ogImageWidth, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "شركة تنظيف منازل ومكافحة حشرات في الرياض",
  description:
    "تنظيف منازل ومكاتب في الرياض: تنظيف عميق، غسيل سجاد وموكيت، تنظيف واجهات، ومكافحة حشرات. موسوعة أحياء ودليل حشرات وأسئلة شائعة — للحجز والاستفسار.",
  keywords: [
    "شركة تنظيف الرياض",
    "مكافحة حشرات الرياض",
    "رش حشرات الرياض",
    "تنظيف منازل الرياض",
    "تنظيف مكاتب الرياض",
    "غسيل سجاد الرياض",
    "تنظيف واجهات الرياض",
    "تنظيف عميق الرياض",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "السعودية للتنظيف | تنظيف منازل ومكافحة حشرات في الرياض",
    description:
      "احجز تنظيفاً عميقاً أو غسيل سجاد أو مكافحة حشرات في الرياض مع خطة واضحة قبل التنفيذ وفريق يغطي أحياء العاصمة.",
    url: siteUrl,
    type: "website",
    locale: "ar_SA",
    siteName: brandNameAr,
    images: [
      {
        url: heroImageUrl,
        width: ogImageWidth,
        height: ogImageHeight,
        alt: "خدمات تنظيف احترافية في السعودية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شركة تنظيف منازل ومكافحة حشرات في الرياض",
    description: "تنظيف منازل ومكاتب، غسيل سجاد، تنظيف واجهات، ومكافحة حشرات في أحياء الرياض.",
    images: [heroImageUrl],
  },
};

export default function Home() {
  const blogPosts = loadPosts();
  const newsArticles = loadNationalNews();

  return (
    <>
      <SiteHome />
      <HomeUsefulGuide />
      <HomeNationalNewsSection articles={newsArticles} />
      <HomeLatestPublishing newsArticles={[]} blogPosts={blogPosts} />
      <HomeFaqSection />
      <HomeServiceAreasTeaser />
    </>
  );
}
