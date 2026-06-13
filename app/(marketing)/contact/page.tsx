import type { Metadata } from "next";

import { ContactPageJsonLd } from "@/components/ContactPageJsonLd";
import { SiteContact } from "@/components/SiteContact";
import { buildArabicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "اتصل بنا | شركة تنظيف بالرياض — حجز ومعاينة مجانية",
  description:
    "اتصل بشركة تنظيف بالرياض — هاتف وواتساب وحجز تنظيف منازل ومكافحة حشرات في كل الأحياء. معاينة مجانية للمساحات الكبيرة. رد سريع خلال ساعات العمل.",
  canonical: "/contact",
  keywords: [
    "اتصل شركة تنظيف سعودية",
    "حجز تنظيف منازل الرياض",
    "شركة تنظيف الرياض تواصل",
    "رقم شركة تنظيف",
    "تنظيف مكاتب السعودية",
    "غسيل سجاد حجز",
    "مكافحة حشرات استفسار",
  ],
});

export default function ContactPage() {
  return (
    <>
      <ContactPageJsonLd />
      <SiteContact />
    </>
  );
}
