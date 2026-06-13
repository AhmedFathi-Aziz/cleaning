import type { Metadata } from "next";

import { SiteCareers } from "@/components/SiteCareers";
import { buildArabicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "وظائف شركة تنظيف بالرياض | انضم لفريقنا — السعودية للتنظيف الآن",
  description:
    "انضم إلى فريق السعودية للتنظيف في الرياض: وظائف تنظيف ومكافحة حشرات، بيئة عمل آمنة، وتقديم عبر البريد أو واتساب. فرص للفنيين والمشرفين الميدانيين.",
  canonical: "/careers",
  keywords: [
    "وظائف شركة تنظيف",
    "توظيف السعودية",
    "فرص عمل تنظيف",
    "وظائف الرياض",
  ],
});

export default function CareersPage() {
  return <SiteCareers />;
}
