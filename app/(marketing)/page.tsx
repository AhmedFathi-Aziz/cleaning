import type { Metadata } from "next";

import { HomeFaqSection } from "@/components/HomeFaqSection";
import { HomeLatestPublishing } from "@/components/HomeLatestPublishing";
import { HomeNationalNewsSection } from "@/components/HomeNationalNewsSection";
import { HomeSeoPillar } from "@/components/home/HomeSeoPillar";
import { HomeServiceAreasTeaser } from "@/components/HomeServiceAreasTeaser";
import { HomeUsefulGuide } from "@/components/HomeUsefulGuide";
import { SiteHome } from "@/components/SiteHome";
import { loadNationalNews } from "@/lib/national-news-store";
import { loadPosts } from "@/lib/post-store";
import { buildArabicPageMetadata } from "@/lib/seo";
import { heroImageUrl } from "@/lib/site";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "شركة تنظيف بالرياض | منازل وسجاد ومكافحة حشرات",
  description:
    "شركة تنظيف ومكافحة حشرات بالرياض — تنظيف منازل وفلل، غسيل سجاد، ورش مبيدات في كل الأحياء. فريق مدرب نفّذ +500 مشروع. احجز معاينة مجانية عبر واتساب الآن.",
  canonical: "/",
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
  image: heroImageUrl,
  imageAlt: "خدمات تنظيف احترافية في السعودية",
});

export default function Home() {
  const blogPosts = loadPosts();
  const newsArticles = loadNationalNews();

  return (
    <>
      <SiteHome />
      <HomeSeoPillar />
      <HomeUsefulGuide />
      <HomeNationalNewsSection articles={newsArticles} />
      <HomeLatestPublishing newsArticles={[]} blogPosts={blogPosts} />
      <HomeFaqSection />
      <HomeServiceAreasTeaser />
    </>
  );
}
