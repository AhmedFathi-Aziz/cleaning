import Link from "next/link";

import { Icon } from "@/components/Icon";
import { neighborhoodLinkAccessibleLabel } from "@/lib/neighborhood-link-label";
import {
  getIndexableCitiesForLinking,
  getNeighborhoodHubPath,
  getServiceLinkFromNeighborhood,
} from "@/lib/url-indexing-policy";

/** Internal discovery strip: neighborhood hubs + sample service×location links from the homepage */
export function CoverageDiscoveryStrip() {
  return (
    <section
      className="border-t border-slate-200 bg-slate-100/90 px-4 py-14 dark:border-slate-800 dark:bg-slate-950/40 sm:px-6 md:px-8"
      aria-labelledby="coverage-discovery-heading"
    >
      <div className="mx-auto max-w-7xl text-right">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-extrabold text-secondary">التغطية الجغرافية</p>
            <h2 id="coverage-discovery-heading" className="font-headline text-2xl font-extrabold text-primary md:text-4xl">
              شركة تنظيف في مدن وأحياء السعودية
            </h2>
            <p className="mt-4 text-base font-medium leading-8 text-on-surface-variant md:text-lg">
              لكل حي في الرياض صفحة مفهرسة تربطك بخدمات التنظيف ومكافحة الحشرات المناسبة — اختر حيك أو تواصل معنا
              لبقية المدن.
            </p>
          </div>
          <Link
            href="/areas"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-95 md:self-auto"
          >
            <span>عرض دليل المناطق كاملاً</span>
            <Icon name="arrow_back" className="text-lg" />
          </Link>
        </div>

        <div className="mb-10 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 md:p-7">
          <h3 className="font-headline text-lg font-extrabold text-primary md:text-xl">أمثلة: تنظيف منازل حسب المدينة والحي</h3>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
            انتقال سريع إلى تنظيف المنازل في أحياء مختلفة — اختر المدينة والحي الأقرب إليك من الصفحة الرئيسية.
          </p>
          <ul className="mt-5 flex flex-wrap justify-end gap-2">
            {getIndexableCitiesForLinking().flatMap((city) => {
              const samples = city.neighborhoods.slice(0, 4);
              return samples.map((neighborhood) => (
                <li key={`${city.slug}-${neighborhood.slug}`}>
                  <Link
                    href={getServiceLinkFromNeighborhood("house-cleaning", city.slug, neighborhood.slug)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-primary transition hover:border-secondary/40 hover:bg-secondary/10 dark:border-slate-700 dark:bg-slate-800/80 md:text-sm"
                  >
                    <span>
                      تنظيف منازل — {neighborhood.name} ({city.name})
                    </span>
                  </Link>
                </li>
              ));
            })}
          </ul>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {getIndexableCitiesForLinking().map((city) => (
            <div
              key={city.slug}
              className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 md:p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-headline text-xl font-extrabold text-primary">{city.name}</h3>
                <Icon name="apartment" className="text-2xl text-secondary opacity-90" aria-hidden />
              </div>
              <ul className="flex flex-wrap justify-end gap-2">
                {city.neighborhoods.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={getNeighborhoodHubPath(city.slug, n.slug)}
                      className="inline-block rounded-full bg-surface-container-low px-3 py-1.5 text-xs font-bold text-on-surface-variant transition hover:bg-primary hover:text-white md:text-sm"
                    >
                      {neighborhoodLinkAccessibleLabel(n.name, city.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
