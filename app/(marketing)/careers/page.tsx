import type { Metadata } from "next";

import { SiteCareers } from "@/components/SiteCareers";
import { buildArabicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "الوظائف والتوظيف",
  description:
    "انضم إلى فريق السعودية للتنظيف: الوظائف المتاحة، بيئة العمل، وطريقة التقديم عبر البريد أو واتساب.",
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
