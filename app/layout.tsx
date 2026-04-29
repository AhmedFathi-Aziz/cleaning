import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";

import { JsonLd } from "@/components/JsonLd";
import { brandEmail, brandLogoPath, brandNameAr, brandNameEn, brandPhoneDisplay } from "@/lib/brand";
import { getMetadataBase } from "@/lib/seo";
import { heroImageUrl, siteUrl } from "@/lib/site";

import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-cairo",
  display: "swap",
  fallback: ["Tahoma", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "السعودية للتنظيف | شركة تنظيف منازل ومكاتب وسجاد ورش حشرات في السعودية",
    template: "%s | السعودية للتنظيف",
  },
  description:
    "السعودية للتنظيف شركة تنظيف احترافية في المملكة تقدم تنظيف منازل ومكاتب وسجاد وأثاث ورش حشرات بمواد آمنة وفريق مدرب. تواصل معنا للحجز والاستفسار.",
  keywords: [
    "تنظيف منازل السعودية",
    "شركة تنظيف الرياض",
    "تنظيف عميق",
    "غسيل سجاد",
    "تنظيف واجهات",
    "خدمات تنظيف احترافية",
  ],
  authors: [{ name: `${brandNameEn} — ${brandNameAr}` }],
  creator: brandNameAr,
  publisher: brandNameAr,
  applicationName: brandNameAr,
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "any",
      },
      {
        url: brandLogoPath,
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: brandLogoPath,
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: brandNameAr,
    url: siteUrl,
    title: "السعودية للتنظيف | تنظيف احترافي للمنازل والمنشآت في المملكة العربية السعودية",
    description:
      `خدمات تنظيف متكاملة للمنازل والمكاتب والسجاد والأثاث ورش الحشرات. للحجز: ${brandPhoneDisplay} أو ${brandEmail}.`,
    images: [
      {
        url: heroImageUrl,
        alt: "منزل فاخر بنظافة احترافية — السعودية للتنظيف",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "السعودية للتنظيف | شركة تنظيف في السعودية",
    description: "تنظيف منازل ومكاتب وسجاد وأثاث ورش حشرات بمواد آمنة وفريق مدرب.",
    images: [heroImageUrl],
  },
  other: {
    "geo.region": "SA",
    "geo.placename": "الرياض",
    "contact:phone_number": brandPhoneDisplay,
    "contact:email": brandEmail,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar-SA" dir="rtl">
      <body
        className={`${cairo.variable} font-body bg-background text-on-background antialiased selection:bg-secondary-container selection:text-on-secondary-container`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
