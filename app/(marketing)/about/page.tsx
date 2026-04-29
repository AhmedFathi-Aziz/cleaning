import type { Metadata } from "next";

import { SiteAbout } from "@/components/SiteAbout";

export const metadata: Metadata = {
  title: "من نحن | شركة تنظيف ورش حشرات في السعودية",
  description:
    "تعرّف على السعودية للتنظيف: شركة خدمات تنظيف ورش حشرات في المملكة العربية السعودية تقدم تنظيف منازل ومكاتب ومكافحة حشرات بمعايير احترافية.",
  keywords: [
    "السعودية للتنظيف",
    "شركة تنظيف في السعودية",
    "شركة رش حشرات",
    "فريق تنظيف محترف",
    "خدمات تنظيف احترافية",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "من نحن | السعودية للتنظيف",
    description: "شركة تنظيف ورش حشرات تقدم خدمات احترافية للمنازل والمنشآت داخل المملكة.",
    url: "/about",
    type: "website",
    locale: "ar_SA",
  },
};

export default function AboutPage() {
  return <SiteAbout />;
}
