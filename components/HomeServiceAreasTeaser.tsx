import Link from "next/link";

import { Icon } from "@/components/Icon";
import { primaryCityNameAr, primaryCitySlug } from "@/lib/region";
import { getCityBySlug } from "@/src/data/locations";

/**
 * قسم أحياء الرياض في الصفحة الرئيسية — التركيز على التغطية المحلية.
 */
export function HomeServiceAreasTeaser() {
  const riyadh = getCityBySlug(primaryCitySlug);
  if (!riyadh) return null;

  const preview = riyadh.neighborhoods.slice(0, 12);

  return (
    <section
      className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50/80 px-4 py-10 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900 sm:px-6 md:px-8 md:py-12"
      aria-labelledby="home-service-areas-heading"
    >
      <div className="mx-auto max-w-5xl text-right">
        <div className="mb-6 flex flex-col items-stretch gap-3 sm:mb-7 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold text-secondary">أحياء {primaryCityNameAr}</p>
            <h2 id="home-service-areas-heading" className="mt-1 font-headline text-lg font-extrabold text-primary sm:text-xl">
              تنظيف منازل حسب الحي
            </h2>
            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-on-surface-variant sm:text-sm">
              صفحة لكل حي في {primaryCityNameAr} مع سياق محلي عن الخدمات الشائعة. المدن الأخرى متاحة في صفحة المناطق.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-end gap-2 self-end sm:self-auto">
            <Link
              href="/cleaning"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/18 bg-white px-3.5 py-2 text-xs font-bold text-primary shadow-sm transition hover:border-primary/30 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900"
            >
              كل أحياء الرياض
              <Icon name="arrow_back" className="text-base" />
            </Link>
            <Link
              href="/areas"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-on-surface-variant transition hover:border-slate-300"
            >
              مدن أخرى
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-2.5 lg:grid-cols-4">
          {preview.map((neighborhood) => (
            <li key={neighborhood.slug}>
              <Link
                href={`/cleaning/${primaryCitySlug}/${neighborhood.slug}`}
                className="group flex items-center justify-between gap-2 rounded-xl border border-slate-200/90 bg-white px-3 py-2.5 text-right shadow-sm transition hover:border-primary/22 hover:bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80"
              >
                <span className="min-w-0 truncate text-sm font-extrabold text-primary">حي {neighborhood.name}</span>
                <Icon
                  name="arrow_back"
                  className="shrink-0 text-base text-secondary opacity-80 transition-transform group-hover:-translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
