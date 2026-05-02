import Link from "next/link";

import { Icon } from "@/components/Icon";
import { brandNameAr } from "@/lib/brand";
import type { NationalNewsArticle } from "@/lib/national-news-types";

type SiteNationalNewsProps = {
  articles: NationalNewsArticle[];
};

export function SiteNationalNews({ articles }: SiteNationalNewsProps) {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <main className="bg-slate-50 px-4 pb-24 pt-28 sm:px-6 md:px-8">
      <article className="mx-auto max-w-4xl text-right">
        <header className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-extrabold text-secondary">تغطية وطنية</p>
          <h1 className="mt-2 font-headline text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl">
            الأخبار الوطنية
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-on-surface-variant md:text-lg">
            متابعة موضوعات تهم المملكة العربية السعودية وما يرتبط بمناخ الأعمال والخدمات والتنظيم — نقدّمها كمعرض
            معلومات مرتبط باهتمامات عملائنا وشركائنا مع {brandNameAr}، دون أن نكون مصدراً رسمياً للأنباء.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            للاطلاع على النصوص الكاملة والتحديثات الرسمية، يُفضّل دائماً الرجوع إلى الجهات الحكومية والمصادر المعتمدة
            المرتبطة بكل خبر.
          </p>
        </header>

        <section className="mt-12" aria-labelledby="news-list-heading">
          <h2 id="news-list-heading" className="sr-only">
            قائمة الأخبار
          </h2>

          {sorted.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-on-surface-variant">
              <Icon name="newspaper" className="mx-auto mb-4 text-4xl text-primary/40" />
              <p className="font-headline text-lg font-bold text-primary">لا يوجد محتوى منشور حالياً</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed">
                أضف أخباراً من{" "}
                <Link href="/admin" className="font-bold text-secondary underline">
                  لوحة التحكم
                </Link>{" "}
                (بعد ضبط كلمة مرور المشرف) أو عبر الملف الثابت في المشروع.
              </p>
            </div>
          ) : (
            <ul className="grid gap-6">
              {sorted.map((item) => (
                <li key={item.slug}>
                  <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-primary/15 hover:shadow-md sm:p-8">
                    <time
                      className="text-sm font-semibold text-secondary"
                      dateTime={item.publishedAt}
                    >
                      {new Date(item.publishedAt).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="mt-3 font-headline text-xl font-bold text-primary sm:text-2xl">
                      <Link href={`/news/${encodeURIComponent(item.slug)}`} className="hover:text-secondary">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-on-surface-variant">{item.excerpt}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/news/${encodeURIComponent(item.slug)}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                      >
                        اقرأ المزيد
                      </Link>
                      {item.sourceUrl ? (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline"
                        >
                          {item.sourceLabel ?? "المصدر"}
                          <Icon name="open_in_new" className="text-lg" />
                        </a>
                      ) : item.sourceLabel ? (
                        <span className="text-xs font-semibold text-slate-500">{item.sourceLabel}</span>
                      ) : null}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="mt-12 text-center text-sm text-slate-500">
          <Link href="/contact" className="font-bold text-primary hover:underline">
            تواصل معنا
          </Link>
          {" — "}
          للاستفسارات حول خدمات {brandNameAr}
        </p>
      </article>
    </main>
  );
}
