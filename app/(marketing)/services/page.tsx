import type { Metadata } from "next";

import { SiteServices } from "@/components/SiteServices";

export const metadata: Metadata = {
  title: "خدمات التنظيف ورش الحشرات في السعودية",
  description:
    "خدمات تنظيف ورش حشرات في المملكة العربية السعودية تشمل تنظيف المنازل العميق، غسيل السجاد، تنظيف الواجهات، تنظيف الفلل والمجالس ومكافحة الحشرات.",
  keywords: [
    "خدمات تنظيف في السعودية",
    "تنظيف منازل",
    "تنظيف فلل",
    "غسيل سجاد",
    "تنظيف واجهات",
    "مكافحة حشرات",
    "رش حشرات",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "خدمات التنظيف ورش الحشرات | السعودية للتنظيف",
    description:
      "تنظيف منازل ومكاتب، غسيل سجاد، تنظيف واجهات، ورش حشرات بمواد آمنة وفريق مدرب.",
    url: "/services",
    type: "website",
    locale: "ar_SA",
  },
};

export default function ServicesPage() {
  return <SiteServices />;
}
