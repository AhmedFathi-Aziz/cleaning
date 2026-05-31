import { siteUrl } from "@/lib/site";
import { contactPageFaqs } from "@/lib/content/contact-faqs";
import { faqPairsToMainEntity, SCHEMA_ORG_CONTEXT } from "@/lib/schema-org/constants";

import { StructuredDataScript } from "@/components/StructuredDataScript";

const contactUrl = `${siteUrl}/contact`;

/** FAQPage aligned with visible FAQs on `/contact` (SiteContact). */
export function ContactPageJsonLd() {
  const data = {
    "@context": SCHEMA_ORG_CONTEXT,
    "@type": "FAQPage",
    "@id": `${contactUrl}#faq`,
    url: contactUrl,
    inLanguage: "ar-SA",
    mainEntity: faqPairsToMainEntity(contactPageFaqs),
  };

  return <StructuredDataScript data={data} id="jsonld-contact-faq" />;
}
