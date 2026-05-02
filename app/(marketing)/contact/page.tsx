import type { Metadata } from "next";

import { ContactPageJsonLd } from "@/components/ContactPageJsonLd";
import { SiteContact } from "@/components/SiteContact";
import { brandEmail, brandNameAr, brandPhoneDisplay } from "@/lib/brand";
import { heroImageUrl } from "@/lib/site";

const pageTitle = `تواصل مع ${brandNameAr} | هاتف وواتساب وحجز تنظيف في السعودية`;
const pageDescription = `اتصلوا بـ ${brandNameAr} للحجز والاستفسار: ${brandPhoneDisplay}، بريد ${brandEmail}. تنظيف منازل ومكاتب، غسيل سجاد، تنظيف واجهات، ورش حشرات في الرياض وجميع أنحاء المملكة خلال أوقات العمل.`;

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
    "ورش حشرات استفسار",
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
