import type { Metadata } from "next";

import { HubFaqSection } from "@/components/HubFaqSection";
import { SiteServices } from "@/components/SiteServices";
import { servicesHubFaqs } from "@/lib/content/hub-faqs";
import { buildArabicPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "خدمات تنظيف بالرياض | منازل وسجاد ومكافحة حشرات — السعودية",
  description:
    "خدمات تنظيف بالرياض — تنظيف منازل وفلل، غسيل سجاد، تنظيف واجهات، ومكافحة حشرات. 14 خدمة تفصيلية بفريق مدرب. احجز معاينة مجانية عبر واتساب الآن.",
  canonical: "/services",
  keywords: [
    "خدمات تنظيف الرياض",
    "تنظيف منازل",
    "تنظيف فلل",
    "غسيل سجاد",
    "تنظيف واجهات",
    "مكافحة حشرات",
    "رش حشرات",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <SiteServices />
      <div className="mx-auto max-w-7xl px-8 pb-24">
        <HubFaqSection
          faqs={servicesHubFaqs}
          heading="أسئلة شائعة عن خدمات التنظيف"
          description="إجابات قبل اختيار الخدمة المناسبة لمنزلك أو منشأتك."
          schemaId="faq"
          schemaUrl={`${siteUrl}/services`}
        />
      </div>
    </>
  );
}
