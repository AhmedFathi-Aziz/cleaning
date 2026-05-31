import type { Metadata } from "next";

import { ContactPageJsonLd } from "@/components/ContactPageJsonLd";
import { SiteContact } from "@/components/SiteContact";
import { brandEmail, brandNameAr, brandPhoneDisplay } from "@/lib/brand";
import { heroImageUrl } from "@/lib/site";

const pageTitle = `تواصل مع ${brandNameAr} | هاتف وواتساب وحجز تنظيف في الرياض`;
const pageDescription = `اتصلوا بـ ${brandNameAr} للحجز والاستفسار: ${brandPhoneDisplay}، وبريد ${brandEmail}. تنظيف منازل ومكاتب، غسيل سجاد، تنظيف واجهات، ومكافحة حشرات في أحياء الرياض خلال أوقات العمل المعلنة.`;

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
