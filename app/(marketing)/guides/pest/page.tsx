import Link from "next/link";
import type { Metadata } from "next";

import { Icon } from "@/components/Icon";
import { brandNameAr } from "@/lib/brand";
import { pestGuides } from "@/lib/pest-guides";
import { primaryCityNameAr } from "@/lib/region";
import { buildArabicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildArabicPageMetadata({
  title: `موسوعة مكافحة الحشرات في ${primaryCityNameAr} | أدلة رسمية`,
  description: `أدلة عملية عن رش الصراصير، بق الفراش، النمل، الأرضة، الفئران والسلامة بعد الرش في ${primaryCityNameAr}. شروحات من فريق ${brandNameAr} قبل الحجز.`,
  canonical: "/guides/pest",
  keywords: [
    "مكافحة حشرات الرياض",
    "رش حشرات الرياض",
    "دليل مكافحة الحشرات",
    "رش صراصير",
    "بق الفراش",
  ],
});

export default function PestGuidesHubPage() {
  return (
    <main className="bg-slate-50 px-6 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-5xl text-right">
        <p className="text-sm font-extrabold text-secondary">موسوعة — مكافحة الحشرات</p>
        <h1 className="mt-3 font-headline text-3xl font-extrabold text-primary md:text-4xl">
          دليل مكافحة الحشرات في {primaryCityNameAr}
        </h1>
        <p className="mt-5 text-base font-medium leading-relaxed text-on-surface-variant">
          محتوى تعليمي عن أنواع الآفات الشائعة في المنازل والفلل: أسباب الظهور، الوقاية، متى تحتاج رشاً احترافياً،
          وما بعد الخدمة. للحجز انتقل إلى{" "}
          <Link href="/services/pest-control" className="font-bold text-secondary underline-offset-2 hover:underline">
            صفحة مكافحة الحشرات
          </Link>
          .
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {pestGuides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/pest/${guide.slug}`}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon name={guide.icon} className="text-xl" />
                </span>
                <h2 className="mt-4 font-headline text-lg font-extrabold text-primary">{guide.cardTitle}</h2>
                <p className="mt-2 flex-1 text-sm leading-7 text-on-surface-variant">{guide.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-secondary">
                  اقرأ الدليل
                  <Icon name="arrow_back" className="text-base" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
