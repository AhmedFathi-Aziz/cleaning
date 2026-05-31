import type { Metadata } from "next";

import { SiteServices } from "@/components/SiteServices";

export const metadata: Metadata = {
  title: "خدمات التنظيف ومكافحة الحشرات في الرياض",
  description:
    "تنظيف منازل عميق، غسيل سجاد وموكيت، تنظيف واجهات زجاجية، تنظيف فلل ومجالس، ومكافحة حشرات بخطط وقائية وعلاجية في أحياء الرياض.",
  keywords: [
    "خدمات تنظيف الرياض",
    "تنظيف منازل",
    "تنظيف فلل",
    "غسيل سجاد",
    "تنظيف واجهات",
    "مكافحة حشرات",
    "رش حشرات",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "خدمات التنظيف ومكافحة الحشرات | السعودية للتنظيف",
    description:
      "تنظيف منازل ومكاتب، غسيل سجاد، تنظيف واجهات، ومكافحة حشرات بمواد مناسبة وفريق مدرّب.",
    url: "/services",
    type: "website",
    locale: "ar_SA",
  },
};

export default function ServicesPage() {
  return <SiteServices />;
}
