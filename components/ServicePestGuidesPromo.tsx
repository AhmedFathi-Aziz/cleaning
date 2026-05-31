import Link from "next/link";

import { Icon } from "@/components/Icon";
import { pestGuides } from "@/lib/pest-guides";
import { primaryCityNameAr } from "@/lib/region";

/** قسم موسوعة الحشرات في صفحة خدمة مكافحة الحشرات */
export function ServicePestGuidesPromo() {
  const preview = pestGuides.slice(0, 6);

  return (
    <section
      id="sec-pest-encyclopedia"
      tabIndex={-1}
      className="scroll-mt-28 rounded-[2rem] border border-secondary/20 bg-gradient-to-bl from-white to-slate-50 p-6 shadow-sm md:p-10"
      aria-labelledby="sec-pest-encyclopedia-heading"
    >
      <p className="mb-3 text-sm font-extrabold text-secondary">موسوعة مكافحة الحشرات</p>
      <h2 id="sec-pest-encyclopedia-heading" className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
        أدلة تفصيلية عن الآفات في {primaryCityNameAr}
      </h2>
      <p className="mt-4 text-base leading-9 text-on-surface-variant">
        قبل الحجز يمكنك قراءة دليل نوع الحشرة: أسباب الظهور، الوقاية، السلامة بعد الرش، ومتى تحتاج زيارة فنية. كل
        المقالات مخصّصة لسياق المنازل في {primaryCityNameAr}.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {preview.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/pest/${guide.slug}`}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 transition hover:border-primary/25 hover:shadow-md"
            >
              <span className="font-bold text-primary">{guide.cardTitle}</span>
              <Icon name="arrow_back" className="shrink-0 text-secondary" />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/guides/pest"
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline"
      >
        عرض الموسوعة كاملة
        <Icon name="arrow_back" className="text-base" />
      </Link>
    </section>
  );
}
