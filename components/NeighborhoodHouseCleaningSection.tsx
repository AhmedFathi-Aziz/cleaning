import Link from "next/link";

import { Icon } from "@/components/Icon";
import { brandNameAr } from "@/lib/brand";
import {
  getNeighborhoodHouseCleaningSectionHref,
  getNeighborhoodHubPath,
  getServiceLinkFromNeighborhood,
} from "@/lib/url-indexing-policy";
import { isPrimaryCitySlug } from "@/lib/region";
import type { CityLocation, Neighborhood } from "@/src/data/locations";

type Props = {
  city: CityLocation;
  neighborhood: Neighborhood;
};

/** قسم «تنظيف منازل وشقق» داخل صفحة الحي الموحّدة — يستبدل عائلة /cleaning/{city}/{district} */
export function NeighborhoodHouseCleaningSection({ city, neighborhood }: Props) {
  const peers = city.neighborhoods.filter((n) => n.slug !== neighborhood.slug);

  return (
    <section
      id="tanzeef-manazil"
      className="mt-8 scroll-mt-28 rounded-[2rem] border border-secondary/15 bg-white p-6 shadow-sm md:p-10"
    >
      <p className="text-sm font-extrabold text-secondary">تنظيف منازل وشقق</p>
      <h2 className="mt-2 font-headline text-2xl font-extrabold text-primary md:text-3xl">
        تنظيف منازل وشقق في حي {neighborhood.name} — {city.name}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-9 text-on-surface-variant">
        <p>
          صفحة الحي هذه تجمع كل ما تحتاجه في <strong className="font-bold text-primary">{neighborhood.name}</strong>:
          خدمات التنظيف العامة، <strong className="font-bold text-primary">تنظيف المنازل والشقق</strong>، غسيل السجاد
          والكنب، مكافحة الحشرات، وتنظيف الخزانات — بدون الانتقال لمسارات متكررة.
        </p>
        <p>
          عند البحث عن شركة تنظيف على مستوى الحي تكون التفاصيل أوضح: نوع العمارة، ضيق المدخل، مواقف مشتركة، أو
          الحاجة لمعدات خفيفة داخل المصعد. نبني خطة العمل في حي {neighborhood.name} وفق هذه الملاحظات حتى يكون
          التنفيذ أسرع وأهدأ لسكان المنزل.
        </p>
        <p className="text-sm font-medium leading-7">{neighborhood.nearbyLandmarksAr}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/#book" className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-lg">
          احجز تنظيف منازل
        </Link>
        <Link
          href="/estimate"
          className="rounded-full bg-secondary px-7 py-3 text-sm font-bold text-on-secondary shadow-md"
        >
          تقدير سريع
        </Link>
        <Link
          href={getServiceLinkFromNeighborhood("house-cleaning", city.slug, neighborhood.slug)}
          className="rounded-full border border-primary/20 bg-white px-7 py-3 text-sm font-bold text-primary"
        >
          تفاصيل تنظيف المنازل
        </Link>
        {isPrimaryCitySlug(city.slug) ? (
          <Link
            href="/guides/pest"
            className="rounded-full border border-primary/20 bg-white px-7 py-3 text-sm font-bold text-primary"
          >
            موسوعة الحشرات
          </Link>
        ) : null}
      </div>

      {peers.length > 0 ? (
        <div className="mt-10 border-t border-slate-100 pt-8">
          <h3 className="font-headline text-lg font-extrabold text-primary">
            أحياء أخرى في {city.name} — تنظيف منازل
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {peers.map((d) => (
              <li key={d.slug}>
                <Link
                  href={getNeighborhoodHouseCleaningSectionHref(city.slug, d.slug)}
                  className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-surface-container-low p-4 text-right transition hover:border-primary/25 hover:shadow-md"
                >
                  <span className="font-bold text-primary">حي {d.name}</span>
                  <span className="mt-2 text-xs font-semibold text-secondary">تنظيف منازل وشقق</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-6 text-sm text-on-surface-variant">
        دليل شامل لكل خدمات حي {neighborhood.name} على{" "}
        <Link href={getNeighborhoodHubPath(city.slug, neighborhood.slug)} className="font-bold text-primary hover:underline">
          صفحة الحي الرئيسية
        </Link>
        .
      </p>
    </section>
  );
}
