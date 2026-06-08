import type { Metadata } from "next";

import { ContactPageJsonLd } from "@/components/ContactPageJsonLd";
import { SiteContact } from "@/components/SiteContact";
import { brandNameAr } from "@/lib/brand";
import { heroImageUrl } from "@/lib/site";

const pageTitle = "اتصل بنا | شركة تنظيف بالرياض";
const pageDescription =
  "اتصل بشركة تنظيف بالرياض — هاتف وواتساب وحجز تنظيف منازل ومكافحة حشرات في كل الأحياء. معاينة مجانية. رد سريع خلال ساعات العمل.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "اتصل شركة تنظيف سعودية",
    "حجز تنظيف منازل الرياض",
    "شركة تنظيف الرياض تواصل",
    "رقم شركة تنظيف",
    "تنظيف مكاتب السعودية",
    "غسيل سجاد حجز",
    "مكافحة حشرات استفسار",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/contact",
    type: "website",
    locale: "ar_SA",
    siteName: brandNameAr,
    images: [{ url: heroImageUrl, alt: `${brandNameAr} — اتصل بنا` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [heroImageUrl],
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactPageJsonLd />
      <SiteContact />
    </>
  );
}
