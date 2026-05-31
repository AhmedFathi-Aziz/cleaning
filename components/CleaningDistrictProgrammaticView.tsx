import Link from "next/link";

import { Icon } from "@/components/Icon";
import { NeighborhoodLocalContextBlock } from "@/components/NeighborhoodLocalContextBlock";
import { NeighborhoodServicesHighlight } from "@/components/NeighborhoodServicesHighlight";
import { brandNameAr } from "@/lib/brand";
import { getCleaningDistrictPeersExcluding } from "@/lib/programmatic-cleaning-seo";
import { isPrimaryCitySlug } from "@/lib/region";
import type { CityLocation, Neighborhood } from "@/src/data/locations";

type Props = {
  city: CityLocation;
  neighborhood: Neighborhood;
};

export function CleaningDistrictProgrammaticView({ city, neighborhood }: Props) {
  const otherDistricts = getCleaningDistrictPeersExcluding(city.slug, neighborhood.slug);
  const hubPath = `/${city.slug}/${neighborhood.slug}`;

  return (
    <article className="mx-auto max-w-6xl text-right">
      <nav aria-label="فتات التنقل" className="mb-5 text-sm font-bold text-slate-600">
        <ol className="flex flex-wrap items-center justify-end gap-2">
          <li>
            <Link href="/" className="hover:text-primary hover:underline">
              الرئيسية
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-400">
            /
          </li>
          <li>
            <Link href="/cleaning" className="hover:text-primary hover:underline">
              تنظيف منازل حسب الحي
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-400">
            /
          </li>
          <li>
            <Link href={`/areas#city-${city.slug}`} className="hover:text-primary hover:underline">
              {city.name}
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-400">
            /
          </li>
          <li className="text-primary">حي {neighborhood.name}</li>
        </ol>
      </nav>

      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline"
      >
        <Icon name="arrow_forward" className="text-lg" />
        العودة إلى الخدمات
      </Link>

      <header className="mt-6 flex min-h-[clamp(240px,48svh,480px)] items-center rounded-[2rem] bg-white p-8 shadow-[0_18px_55px_rgba(30,58,138,0.08)] md:p-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-extrabold text-secondary">تنظيف منازل — صفحة حي (SEO برمجي)</p>
          <h1 className="font-headline text-3xl font-extrabold leading-tight text-primary md:text-5xl">
            تنظيف منازل وشقق في حي {neighborhood.name} — {city.name}
          </h1>
          <p className="mt-5 text-base font-medium leading-8 text-on-surface-variant md:text-lg">
            صفحة مخصّصة لمن يبحث عن <strong className="font-bold text-primary">تنظيف منازل في حي {neighborhood.name}</strong>{" "}
            ضمن {city.name}: تنظيف عام، تنظيف عميق، تجهيز قبل المناسبات، وغسيل سجاد وكنب داخل الحي مع فريق يعرف
            تفاصيل الوصول والمداخل المحلية.
          </p>
          <p className="mt-4 text-sm font-medium leading-7 text-on-surface-variant">
            {neighborhood.nearbyLandmarksAr}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#book" className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-lg">
              احجز الآن
            </Link>
            <Link
              href="/estimate"
              className="rounded-full bg-secondary px-7 py-3 text-sm font-bold text-on-secondary shadow-md"
            >
              تقدير سريع
            </Link>
            <Link
              href={hubPath}
              className="rounded-full bg-surface-container-low px-7 py-3 text-sm font-bold text-primary"
            >
              كل خدمات الحي
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
        </div>
      </header>

      <NeighborhoodLocalContextBlock city={city} neighborhood={neighborhood} />

      <NeighborhoodServicesHighlight city={city} neighborhood={neighborhood} />

      <section className="mt-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
          تنظيف منزل في {neighborhood.name} مع {brandNameAr}
        </h2>
        <div className="mt-5 space-y-4 text-base leading-9 text-on-surface-variant">
          <p>
            عند البحث عن شركة تنظيف على مستوى الحي وليس فقط اسم المدينة، تكون التفاصيل أوضح: نوع العمارة، ضيق
            المدخل، وجود مواقف مشتركة، أو الحاجة لمعدات خفيفة داخل المصعد. نبني خطة العمل في حي {neighborhood.name}{" "}
            وفق هذه الملاحظات حتى يكون التنفيذ أسرع وأهدأ لسكان المنزل.
          </p>
          <p>
            إن كنت تحتاج صفحة أوسع تشمل مكافحة حشرات أو خزانات مياه مع نفس الموقع، راجع{" "}
            <Link href={hubPath} className="font-bold text-primary underline-offset-2 hover:underline">
              دليل خدمات حي {neighborhood.name}
            </Link>{" "}
            على المسار العام للموقع.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] border border-primary/10 bg-white p-6 shadow-sm md:p-8">
        <h2 className="font-headline text-xl font-extrabold text-primary md:text-2xl">
          أحياء أخرى في {city.name} — تنظيف منازل
        </h2>
        <p className="mt-3 text-sm font-medium text-on-surface-variant">
          صفحات برمجية مستقلة لكل حي لتسهيل العثور على خدمة قريبة من عنوانك.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherDistricts.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/cleaning/${city.slug}/${d.slug}`}
                className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-surface-container-low p-4 text-right transition hover:border-primary/25 hover:shadow-md"
              >
                <span className="font-bold text-primary">حي {d.name}</span>
                <span className="mt-2 text-xs font-semibold text-secondary">تنظيف منازل وشقق</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
