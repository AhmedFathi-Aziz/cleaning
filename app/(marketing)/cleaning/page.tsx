import Link from "next/link";
import type { Metadata } from "next";

import { brandNameAr } from "@/lib/brand";
import {
  getCleaningProgrammaticStaticParams,
  getCleaningSeeds,
  getPrimaryCleaningCitySlug,
} from "@/lib/programmatic-cleaning-seo";
import { primaryCityNameAr } from "@/lib/region";
import { buildArabicPageMetadata } from "@/lib/seo";
import { getCityBySlug, getNeighborhoodBySlug } from "@/src/data/locations";

export const metadata: Metadata = buildArabicPageMetadata({
  title: `تنظيف منازل حسب الحي في ${primaryCityNameAr}`,
  description: `صفحات تنظيف منازل وشقق لكل حي في ${primaryCityNameAr} — دليل محلي لتسهيل العثور على خدمة قريبة من عنوانك. ${brandNameAr}.`,
  canonical: "/cleaning",
  keywords: [
    `تنظيف منازل ${primaryCityNameAr}`,
    "تنظيف منازل حي العليا",
    "تنظيف شقق الرياض",
    "شركة تنظيف حسب الحي",
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
          تنظيف منازل حسب الحي — {primaryCityNameAr}
        </h1>
        <p className="mt-5 text-base font-medium leading-relaxed text-on-surface-variant">
          اختر حيك للانتقال إلى صفحة مخصّصة لـ <strong className="text-primary">تنظيف المنازل والشقق</strong> في ذلك
          الموقع؛ كل صفحة تحمل سياقاً محلياً فريداً عن الحي والخدمات الشائعة فيه.
        </p>

        {seeds.map((seed) => {
          const city = getCityBySlug(seed.citySlug);
          if (!city) return null;
          const pairs = getCleaningProgrammaticStaticParams().filter((p) => p.citySlug === seed.citySlug);
          const isPrimary = seed.citySlug === riyadhSlug;

          return (
            <section key={seed.citySlug} className={isPrimary ? "mt-10" : "mt-14 border-t border-slate-200 pt-10"}>
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
