import Link from "next/link";
import type { Metadata } from "next";

import { HubFaqSection } from "@/components/HubFaqSection";
import { brandNameAr } from "@/lib/brand";
import { cleaningHubFaqs } from "@/lib/content/hub-faqs";
import {
  getCleaningProgrammaticStaticParams,
  getCleaningSeeds,
  getPrimaryCleaningCitySlug,
} from "@/lib/programmatic-cleaning-seo";
import { primaryCityNameAr } from "@/lib/region";
import { buildArabicPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { getCityBySlug, getNeighborhoodBySlug } from "@/src/data/locations";

export const metadata: Metadata = buildArabicPageMetadata({
  title: `تنظيف منازل بالرياض حسب الحي | موسوعة أحياء — ${brandNameAr}`,
  description:
    "تنظيف منازل وشقق في كل أحياء الرياض — صفحة مخصّصة لكل حي مع سياق محلي ونصائح قبل الحجز. شركة تنظيف بالرياض. احجز معاينة مجانية عبر واتساب الآن.",
  canonical: "/cleaning",
  keywords: [
    `تنظيف منازل ${primaryCityNameAr}`,
    "تنظيف منازل حي العليا",
    "تنظيف شقق الرياض",
    "شركة تنظيف حسب الحي",
    "أرخص شركة تنظيف منازل بالرياض",
  ],
});

export default function CleaningProgrammaticHubPage() {
  const riyadhSlug = getPrimaryCleaningCitySlug();
  const seeds = getCleaningSeeds();

  return (
    <main className="bg-slate-50 px-6 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-5xl text-right">
        <p className="text-sm font-extrabold text-secondary">موسوعة التنظيف — أحياء {primaryCityNameAr}</p>
        <h1 className="mt-3 font-headline text-3xl font-extrabold text-primary md:text-4xl">
          تنظيف منازل بالرياض حسب الحي
        </h1>
        <p className="mt-5 text-base font-medium leading-relaxed text-on-surface-variant">
          تنظيف منازل بالرياض يبدأ باختيار حيك — كل صفحة أدناه تجمع سياقاً محلياً عن{" "}
          <strong className="text-primary">تنظيف الشقق والفلل</strong> في ذلك الموقع: نوع العقارات
          الشائعة، تأثير الغبار والحر، ونصائح قبل الحجز.
        </p>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8" aria-labelledby="cleaning-guide-heading">
          <h2 id="cleaning-guide-heading" className="font-headline text-xl font-extrabold text-primary md:text-2xl">
            لماذا صفحة تنظيف منازل لكل حي؟
          </h2>
          <div className="mt-4 space-y-4 text-sm font-medium leading-[1.9] text-on-surface-variant md:text-base">
            <p>
              الرياض مدينة متنوعة — شقة علوية في العليا تختلف عن فيلا في النرجس عن مجمع في المروج. صفحة
              الحي تشرح ما يشيع من طلبات تنظيف في جوارك: تسليم شقة مؤجرة، تنظيف بعد التشطيب، أو زيارة
              دورية أسبوعية.
            </p>
            <p>
              مناخ الرياض الجاف مع موجات الرياح يعني أن الغبار يعود بسرعة — جدولة تنظيف دوري للمداخل
              والنوافذ يقلّل ما تراه على الأثاث. للخدمات الأخرى راجع{" "}
              <Link href="/services" className="font-bold text-secondary underline-offset-2 hover:underline">
                صفحات الخدمات
              </Link>{" "}
              (غسيل سجاد، واجهات،{" "}
              <Link href="/services/pest-control" className="font-bold text-secondary underline-offset-2 hover:underline">
                مكافحة حشرات
              </Link>
              ).
            </p>
            <p>
              للحجز:{" "}
              <Link href="/contact" className="font-bold text-secondary underline-offset-2 hover:underline">
                اتصل بنا
              </Link>{" "}
              أو{" "}
              <Link href="/estimate" className="font-bold text-secondary underline-offset-2 hover:underline">
                حاسبة التقدير
              </Link>
              . نفّذنا أكثر من 500 مشروع تنظيف في أحياء العاصمة.
            </p>
          </div>
        </section>

        <HubFaqSection
          faqs={cleaningHubFaqs}
          heading="أسئلة شائعة عن تنظيف المنازل حسب الحي"
          schemaId="faq"
          schemaUrl={`${siteUrl}/cleaning`}
        />

        {seeds.map((seed) => {
          const city = getCityBySlug(seed.citySlug);
          if (!city) return null;
          const pairs = getCleaningProgrammaticStaticParams().filter((p) => p.citySlug === seed.citySlug);
          const isPrimary = seed.citySlug === riyadhSlug;

          return (
            <section
              key={seed.citySlug}
              id={isPrimary ? "riyadh" : seed.citySlug === "jeddah" ? "jeddah" : undefined}
              className={isPrimary ? "mt-10 scroll-mt-28" : "mt-14 scroll-mt-28 border-t border-slate-200 pt-10"}
            >
              <h2 className="font-headline text-xl font-extrabold text-primary md:text-2xl">
                {city.name}
                {isPrimary ? " (التغطية الرئيسية)" : ""}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {pairs.map(({ districtSlug }) => {
                  const n = getNeighborhoodBySlug(seed.citySlug, districtSlug);
                  if (!n) return null;
                  return (
                    <li key={districtSlug}>
                      <Link
                        href={`/cleaning/${seed.citySlug}/${districtSlug}`}
                        className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
                      >
                        <span className="font-headline text-lg font-extrabold text-primary">حي {n.name}</span>
                        <span className="mt-2 block text-sm text-on-surface-variant">
                          تنظيف منازل وشقق — {city.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
