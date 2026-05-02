import type { Metadata } from "next";

import { HomeLatestPublishing } from "@/components/HomeLatestPublishing";
import { SiteHome } from "@/components/SiteHome";
import { brandNameAr } from "@/lib/brand";
import { loadPosts } from "@/lib/post-store";
import { staticNationalNewsArticles } from "@/lib/static-national-news";
import { heroImageUrl, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "شركة تنظيف ورش حشرات في السعودية",
  description:
    "خدمات تنظيف ورش حشرات في المملكة العربية السعودية: تنظيف منازل، تنظيف مكاتب، تنظيف عميق، غسيل سجاد، تنظيف واجهات ومكافحة حشرات بمواد آمنة وفريق مدرب.",
  keywords: [
    "شركة تنظيف في السعودية",
    "خدمات تنظيف",
    "تنظيف منازل",
    "تنظيف مكاتب",
    "رش حشرات",
    "مكافحة حشرات",
    "غسيل سجاد",
    "تنظيف واجهات",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "السعودية للتنظيف | خدمات تنظيف ورش حشرات في المملكة",
    description:
      "احجز خدمات تنظيف احترافية ورش حشرات للمنازل والمنشآت في السعودية مع فريق مدرب ومواد آمنة.",
    url: siteUrl,
    type: "website",
    locale: "ar_SA",
    siteName: brandNameAr,
    images: [{ url: heroImageUrl, alt: "خدمات تنظيف احترافية في السعودية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "شركة تنظيف ورش حشرات في السعودية",
    description: "تنظيف منازل ومكاتب، رش حشرات، غسيل سجاد وتنظيف واجهات في المملكة.",
    images: [heroImageUrl],
  },
};

export default async function Home() {
  const blogPosts = await loadPosts();

  return (
    <>
      <SiteHome />
      <HomeLatestPublishing newsArticles={staticNationalNewsArticles} blogPosts={blogPosts} />
    </>
  );
}
