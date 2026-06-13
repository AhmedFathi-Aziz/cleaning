import type { Metadata } from "next";

import { SiteAbout } from "@/components/SiteAbout";
import { brandNameAr } from "@/lib/brand";
import { aboutCities, aboutFoundedLabelAr, aboutProjectsCount } from "@/lib/content/about-company";
import { buildArabicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildArabicPageMetadata({
  title: `من نحن | ${brandNameAr} — شركة تنظيف ومكافحة حشرات`,
  description: `${brandNameAr}: ${aboutFoundedLabelAr} في الرياض، أكثر من ${aboutProjectsCount} مشروع تنظيف ومكافحة، تغطية ${aboutCities.length} مدينة، فريق مدرب ومعدات بخار وشفط وغسيل سجاد. تعرّف على خدماتنا ومعداتنا.`,
  canonical: "/about",
  keywords: [
    "من نحن",
    brandNameAr,
    "شركة تنظيف الرياض",
    "مكافحة حشرات الرياض",
    "فريق تنظيف مدرب",
    "معدات تنظيف احترافية",
    "شركة تنظيف في السعودية",
  ],
});

export default function AboutPage() {
  return <SiteAbout />;
}
