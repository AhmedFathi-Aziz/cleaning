import type { FaqPair } from "@/lib/schema-org/constants";
import { faqPairsToMainEntity, SCHEMA_ORG_CONTEXT } from "@/lib/schema-org/constants";

import { StructuredDataScript } from "@/components/StructuredDataScript";

type HubFaqSectionProps = {
  faqs: FaqPair[];
  heading: string;
  description?: string;
  schemaId: string;
  schemaUrl: string;
};

/** أسئلة شائعة لصفحات المحور (areas, cleaning, services) مع FAQPage schema */
export function HubFaqSection({
  faqs,
  heading,
  description,
  schemaId,
  schemaUrl,
}: HubFaqSectionProps) {
  const jsonLd = {
    "@context": SCHEMA_ORG_CONTEXT,
    "@type": "FAQPage",
    "@id": `${schemaUrl}#${schemaId}`,
    url: schemaUrl,
    inLanguage: "ar-SA",
    mainEntity: faqPairsToMainEntity(faqs),
  };

  return (
    <>
      <StructuredDataScript data={jsonLd} id={`jsonld-${schemaId}`} />
      <section
        className="mt-10 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm md:p-10"
        aria-labelledby={`${schemaId}-heading`}
      >
        <p className="text-sm font-extrabold text-secondary">أسئلة شائعة</p>
        <h2 id={`${schemaId}-heading`} className="mt-2 font-headline text-xl font-extrabold text-primary md:text-2xl">
          {heading}
        </h2>
        {description ? (
          <p className="mt-3 text-sm font-medium leading-8 text-on-surface-variant md:text-base">{description}</p>
        ) : null}
        <div className="mt-8 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200/90 bg-surface-container-lowest/80 p-5 open:border-primary/20 open:bg-white dark:border-slate-800 md:p-6"
            >
              <summary className="cursor-pointer list-none font-bold text-primary marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex w-full items-start justify-between gap-3">
                  <span className="min-w-0 flex-1 text-right leading-snug">{item.question}</span>
                  <span className="shrink-0 text-secondary transition group-open:rotate-180" aria-hidden>
                    ▼
                  </span>
                </span>
              </summary>
              <p className="mt-4 border-t border-slate-200/80 pt-4 text-sm font-medium leading-[1.85] text-on-surface-variant md:text-[0.9375rem]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
