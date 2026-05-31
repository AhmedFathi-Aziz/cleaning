import type { MetadataRoute } from "next";

import { brandNameAr } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** يولّد /manifest.webmanifest — يدعم بعض فحوصات SEO/PWA في Lighthouse */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brandNameAr,
    short_name: "السعودية للتنظيف",
    description: "خدمات تنظيف ورش حشرات في الرياض — موسوعة أحياء ودليل آفات",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#1e3a5e",
    lang: "ar-SA",
    dir: "rtl",
    icons: [
      { src: "/favicon-48.png", sizes: "48x48", type: "image/png", purpose: "any" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
    id: siteUrl,
  };
}
