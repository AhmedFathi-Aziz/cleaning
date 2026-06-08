import type { Metadata } from "next";

import { HubFaqSection } from "@/components/HubFaqSection";
import { SiteServices } from "@/components/SiteServices";
import { servicesHubFaqs } from "@/lib/content/hub-faqs";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "خدمات تنظيف بالرياض | منازل وسجاد ومكافحة حشرات",
  description:
    "خدمات تنظيف بالرياض — تنظيف منازل وفلل، غسيل سجاد، تنظيف واجهات، ومكافحة حشرات. 14 خدمة تفصيلية. احجز معاينة مجانية عبر واتساب الآن.",
  keywords: [
    "خدمات تنظيف الرياض",
    "تنظيف منازل",
    "تنظيف فلل",
    "غسيل سجاد",
    "تنظيف واجهات",
    "مكافحة حشرات",
    "رش حشرات",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "خدمات التنظيف ومكافحة الحشرات | السعودية للتنظيف",
    description:
      "تنظيف منازل ومكاتب، غسيل سجاد، تنظيف واجهات، ومكافحة حشرات بمواد مناسبة وفريق مدرّب.",
    url: "/services",
    type: "website",
    locale: "ar_SA",
  },
};

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
