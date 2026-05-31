import Link from "next/link";

import { BlogCoverPlaceholder } from "@/components/BlogCoverPlaceholder";
import { Icon } from "@/components/Icon";
import type { NationalNewsArticle } from "@/lib/national-news-types";

type Props = {
  articles: NationalNewsArticle[];
};

function sortByPublishedDesc(items: NationalNewsArticle[]): NationalNewsArticle[] {
  return [...items].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/**
 * قسم الأخبار الوطنية على الصفحة الرئيسية — موضوعات سعودية مرتبطة بالنظافة ومكافحة الحشرات والصحة العامة.
 */
export function HomeNationalNewsSection({ articles }: Props) {
  const items = sortByPublishedDesc(articles).slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section
      className="border-t border-slate-200 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-950 sm:px-6 md:px-8 md:py-20"
      aria-labelledby="home-national-news-heading"
    >
      <div className="mx-auto max-w-7xl text-right">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-extrabold text-secondary">تغطية وطنية</p>
            <h2
              id="home-national-news-heading"
              className="font-headline text-2xl font-extrabold text-primary sm:text-3xl md:text-4xl"
            >
              أخبار المملكة وقطاع النظافة
            </h2>
            <p className="mt-3 text-sm font-medium leading-8 text-on-surface-variant md:text-base">
              متابعة مختصرة لموضوعات وطنية تهم المنازل والمنشآت في السعودية — من الصحة العامة والبلديات إلى
              تنظيم المبيدات وسلامة الغذاء — مع رابط للمصدر الرسمي في كل خبر.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-primary/20 bg-slate-50 px-5 py-2.5 text-sm font-bold text-primary shadow-sm transition hover:border-primary/35 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 md:self-auto"
          >
            كل الأخبار الوطنية
            <Icon name="arrow_back" className="text-lg" />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={`home-national-${item.slug}`} className="min-w-0">
              <article className="flex h-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_12px_40px_rgba(30,58,138,0.06)] transition hover:border-primary/25 hover:shadow-[0_18px_50px_rgba(30,58,138,0.1)] dark:border-slate-800 dark:bg-slate-900">
                <Link
                  href={`/news/${encodeURIComponent(item.slug)}`}
                  className="group flex h-full min-h-[260px] flex-col sm:min-h-0"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden" aria-hidden>
                    <BlogCoverPlaceholder slug={item.slug} icon="newspaper" className="absolute inset-0 size-full" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <time className="text-xs font-semibold text-secondary" dateTime={item.publishedAt}>
                      {new Date(item.publishedAt).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="mt-2 line-clamp-3 font-headline text-base font-extrabold leading-snug text-primary group-hover:text-secondary md:text-lg">
                      {item.title}
                    </h3>
                    {item.excerpt ? (
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-on-surface-variant">
                        {item.excerpt}
                      </p>
                    ) : null}
                    {item.sourceLabel ? (
                      <p className="mt-3 truncate text-xs font-semibold text-slate-500">{item.sourceLabel}</p>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                      اقرأ الخبر
                      <Icon name="arrow_back" className="text-lg transition-transform group-hover:-translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
