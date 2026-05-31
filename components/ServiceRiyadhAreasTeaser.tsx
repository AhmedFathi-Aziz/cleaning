import Link from "next/link";

import { Icon } from "@/components/Icon";
import { primaryCityNameAr, primaryCitySlug } from "@/lib/region";
import { getCityBySlug } from "@/src/data/locations";

type Props = {
  serviceSlug: string;
  serviceShortTitle: string;
};

/** روابط أحياء الرياض من صفحة الخدمة — نفس مسارات /services/[slug]/riyadh/[حي] */
export function ServiceRiyadhAreasTeaser({ serviceSlug, serviceShortTitle }: Props) {
  const riyadh = getCityBySlug(primaryCitySlug);
  if (!riyadh) return null;

  const preview = riyadh.neighborhoods.slice(0, 8);

  return (
    <section
      id="sec-riyadh-areas"
      tabIndex={-1}
      className="scroll-mt-28 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm md:p-10"
      aria-labelledby="sec-riyadh-areas-heading"
    >
      <p className="mb-3 text-sm font-extrabold text-secondary">تغطية {primaryCityNameAr}</p>
      <h2 id="sec-riyadh-areas-heading" className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
        {serviceShortTitle} حسب الحي في {primaryCityNameAr}
      </h2>
      <p className="mt-4 text-base leading-9 text-on-surface-variant">
        صفحات مخصّصة لكل حي تجمع بين موقعك وخدمة {serviceShortTitle} — مع سياق محلي يساعد على فهم التغطية قبل
        الحجز.
      </p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {preview.map((n) => (
          <li key={n.slug}>
            <Link
              href={`/services/${serviceSlug}/${primaryCitySlug}/${n.slug}`}
              className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm font-bold text-primary transition hover:border-primary/25 hover:bg-white"
            >
              <span className="truncate">حي {n.name}</span>
              <Icon name="arrow_back" className="shrink-0 text-base text-secondary" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link href="/cleaning" className="text-sm font-bold text-secondary hover:underline">
          كل أحياء التنظيف
        </Link>
        <Link href="/areas" className="text-sm font-bold text-primary hover:underline">
          مناطق التغطية
        </Link>
      </div>
    </section>
  );
}
