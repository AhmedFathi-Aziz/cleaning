import type { Metadata } from "next";

import { SiteAbout } from "@/components/SiteAbout";

export const metadata: Metadata = {
  title: "من نحن | شركة تنظيف بالرياض",
  description:
    "شركة تنظيف بالرياض — أكثر من 500 مشروع، فريق مدرب، ضمان 10 سنوات على المعالجات. تعرّف على السعودية للتنظيف واحجز معاينة مجانية.",
  keywords: [
    "السعودية للتنظيف",
    "شركة تنظيف الرياض",
    "شركة رش حشرات",
    "فريق تنظيف محترف",
    "خدمات تنظيف احترافية",
    "فنيون مدرّبون",
    "تقرير كشف تسربات",
    "ثقة العملاء",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "من نحن | السعودية للتنظيف",
    description: "شركة تنظيف ومكافحة حشرات للمنازل والمنشآت في الرياض مع تغطية مدن أخرى عند الطلب.",
    url: "/about",
    type: "website",
    locale: "ar_SA",
  },
};

export default function AboutPage() {
  return <SiteAbout />;
}
