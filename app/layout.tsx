import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";

import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { images } from "@/lib/assets";
import { brandEmail, brandNameAr, brandNameEn, brandPhoneDisplay } from "@/lib/brand";
import { getLcpPreloadLinks } from "@/lib/responsive-image";
import { arabicSeoKeywords, getMetadataBase } from "@/lib/seo";
import { heroImageUrl, ogImageHeight, ogImageWidth, siteUrl } from "@/lib/site";

import "./globals.css";

/**
 * swap: يعرض الاحتياط أولاً ثم يستبدل بـ Cairo عند جاهزية الملف — يمنع بقاء الموقع بخط النظام
 * لجلسة كاملة عند أول زيارة. subset عربي فقط يقلّل حجم woff2؛ adjustFontFallback يقلّل قفزة الحجم.
 */
const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Tahoma", "Arial", "sans-serif"],
});

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  title: {
    default: "السعودية للتنظيف | شركة تنظيف منازل ومكافحة حشرات في الرياض",
    template: "%s | السعودية للتنظيف",
  },
  description:
    "شركة تنظيف ومكافحة حشرات في الرياض: تنظيف عميق للمنازل والمكاتب، غسيل سجاد وموكيت، تنظيف واجهات، وموسوعة أحياء ودليل آفات. للحجز تواصل معنا.",
  keywords: [...new Set([...arabicSeoKeywords])].slice(0, 48),
  authors: [{ name: `${brandNameEn} — ${brandNameAr}` }],
  creator: brandNameAr,
  publisher: brandNameAr,
  applicationName: brandNameAr,
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
  /** لا نضع canonical ولا hreflang هنا — كل مسار يحدّده في buildArabicPageMetadata(). */
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: brandNameAr,
    url: siteUrl,
    title: "السعودية للتنظيف | تنظيف منازل ومكافحة حشرات في الرياض",
    description:
      `تنظيف منازل ومكاتب، غسيل سجاد، تنظيف واجهات، ومكافحة حشرات بخطط واضحة. للحجز: ${brandPhoneDisplay} أو ${brandEmail}.`,
    images: [
      {
        url: heroImageUrl,
        width: ogImageWidth,
        height: ogImageHeight,
        alt: "منزل أنيق بنظافة احترافية — السعودية للتنظيف",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "السعودية للتنظيف | شركة تنظيف ومكافحة حشرات",
    description: "تنظيف منازل ومكاتب، سجاد وواجهات، ومكافحة حشرات بمواد مناسبة وفريق مدرّب.",
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
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lcpPreload = getLcpPreloadLinks(images.hero);

  return (
    <html lang="ar-SA" dir="rtl">
      <head>
        <link
          rel="preload"
          href={lcpPreload.href}
          as="image"
          type="image/webp"
          fetchPriority="high"
          {...(lcpPreload.imageSrcSet
            ? { imageSrcSet: lcpPreload.imageSrcSet, imageSizes: "100vw" }
            : {})}
        />
      </head>
      <body
        className={`${cairo.variable} font-body bg-background text-on-background antialiased selection:bg-secondary-container selection:text-on-secondary-container`}
      >
        <JsonLd />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
