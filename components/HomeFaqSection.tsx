import { homePageFaqs } from "@/lib/content/home-faqs";
import { faqPairsToMainEntity, SCHEMA_ORG_CONTEXT } from "@/lib/schema-org/constants";
import { siteUrl } from "@/lib/site";

import { StructuredDataScript } from "@/components/StructuredDataScript";

const homeUrl = `${siteUrl}/`;

function homeFaqJsonLd() {
  return {
    "@context": SCHEMA_ORG_CONTEXT,
    "@type": "FAQPage",
    "@id": `${homeUrl}#faq`,
    url: homeUrl,
    inLanguage: "ar-SA",
    mainEntity: faqPairsToMainEntity(homePageFaqs),
  };
}

/** أسئلة شائعة على الصفحة الرئيسية + FAQPage لدعم نتائج غنية عندما تلائمها محركات البحث */
export function HomeFaqSection() {
  return (
    <>
      <StructuredDataScript data={homeFaqJsonLd()} id="jsonld-home-faq" />
      <section
        className="border-t border-slate-200 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-950 sm:px-6 md:px-8 md:py-20"
        aria-labelledby="home-faq-heading"
      >
        <div className="mx-auto max-w-3xl text-right">
          <p className="text-sm font-extrabold text-secondary">أسئلة شائعة</p>
          <h2 id="home-faq-heading" className="mt-2 font-headline text-2xl font-extrabold text-primary md:text-3xl">
            إجابات سريعة قبل أن تطلب الخدمة
          </h2>
          <p className="mt-3 text-sm font-medium leading-8 text-on-surface-variant md:text-base">
            جمعنا أشهر الاستفسارات حول التنظيف ومكافحة الحشرات والتغطية الجغرافية. للتفاصيل الخاصة بحالتك،
            يُفضّل التواصل المباشر.
          </p>
          <div className="mt-10 space-y-4">
            {homePageFaqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200/90 bg-surface-container-lowest/80 p-5 shadow-sm open:border-primary/20 open:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:open:bg-slate-900 md:p-6"
              >
                <summary className="cursor-pointer list-none font-bold text-primary marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex w-full items-start justify-between gap-3">
                    <span className="min-w-0 flex-1 text-right leading-snug">{item.question}</span>
                    <span className="shrink-0 text-secondary transition group-open:rotate-180" aria-hidden>
                      ▼
                    </span>
                  </span>
                </summary>
                <p className="mt-4 border-t border-slate-200/80 pt-4 text-sm font-medium leading-[1.85] text-on-surface-variant dark:border-slate-700 md:text-[0.9375rem]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
