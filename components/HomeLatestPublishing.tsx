import Image from "next/image";
import Link from "next/link";

import { BlogCoverPlaceholder } from "@/components/BlogCoverPlaceholder";
import { Icon } from "@/components/Icon";
import type { BlogPost } from "@/lib/post-types";
import type { NationalNewsArticle } from "@/lib/national-news-types";

function sortByPublishedDesc<T extends { publishedAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

function blogCoverSrc(post: BlogPost): string | null {
  if (post.coverImage?.trim()) return post.coverImage.trim();
  if (post.coverKey) return `/api/media/${encodeURIComponent(post.coverKey)}`;
  return null;
}

type Props = {
  newsArticles: NationalNewsArticle[];
  blogPosts: BlogPost[];
};

function BlogCoverImage({ post, title }: { post: BlogPost; title: string }) {
  const src = blogCoverSrc(post);
  const alt = `صورة مقترحة لمقال: ${title}`;
  if (!src) return null;
  return (
    <Image
      src={src}
      alt={alt}
      width={720}
      height={405}
      className="absolute inset-0 h-full w-full object-cover"
      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 360px"
      loading="lazy"
      unoptimized={!src.startsWith("/")}
    />
  );
}

/**
 * روابط داخلية من الصفحة الرئيسية — بطاقات بارتفاع ثابت وأبعاد صور صريحة لتقليل CLS.
 */
export function HomeLatestPublishing({ newsArticles, blogPosts }: Props) {
  const news = sortByPublishedDesc(newsArticles).slice(0, 3);
  const blogs = sortByPublishedDesc(blogPosts).slice(0, 3);
  if (news.length === 0 && blogs.length === 0) return null;

  return (
    <section
      className="border-t border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 py-16 dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 sm:px-6 md:px-8 md:py-20"
      aria-labelledby="latest-publishing-heading"
    >
      <div className="mx-auto max-w-7xl text-right">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
          <div>
            <p className="mb-2 text-sm font-extrabold text-secondary">مدونة النصائح</p>
            <h2 id="latest-publishing-heading" className="font-headline text-2xl font-extrabold text-primary md:text-4xl">
              آخر مقالات المدونة
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-8 text-on-surface-variant md:text-base">
              نصائح عملية حول التنظيف ومكافحة الحشرات — مع روابط مباشرة لكل مقال.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-end gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-95"
            >
              كل مقالات المدونة
              <Icon name="arrow_back" className="text-lg" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-12 lg:gap-16">
          {news.length > 0 ? (
            <div>
              <h3 className="mb-6 flex items-center gap-2 font-headline text-lg font-extrabold text-primary md:text-xl">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                  <Icon name="newspaper" className="text-2xl" />
                </span>
                أخبار وطنية
              </h3>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                  <li key={`home-news-${item.slug}`} className="min-w-0">
                    <article className="flex h-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_12px_40px_rgba(30,58,138,0.06)] transition hover:border-primary/25 hover:shadow-[0_18px_50px_rgba(30,58,138,0.1)] dark:border-slate-800 dark:bg-slate-900">
                      <Link href={`/news/${encodeURIComponent(item.slug)}`} className="group flex h-full min-h-[280px] flex-col sm:min-h-0">
                        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden" aria-hidden>
                          <BlogCoverPlaceholder
                            slug={item.slug}
                            icon="newspaper"
                            className="absolute inset-0 size-full"
                          />
                        </div>
                        <div className="flex min-h-[180px] flex-1 flex-col justify-center p-5 sm:p-6">
                          <time className="text-xs font-semibold text-secondary" dateTime={item.publishedAt}>
                            {new Date(item.publishedAt).toLocaleDateString("ar-SA", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                          <h4 className="mt-2 font-headline text-lg font-extrabold leading-snug text-primary group-hover:text-secondary md:text-xl">
                            {item.title}
                          </h4>
                          {item.excerpt ? (
                            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-on-surface-variant">{item.excerpt}</p>
                          ) : null}
                          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
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
          ) : null}

          {blogs.length > 0 ? (
            <div>
              <h3 className="mb-6 flex items-center gap-2 font-headline text-lg font-extrabold text-primary md:text-xl">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon name="verified" className="text-2xl" />
                </span>
                مدونة النصائح والتنظيف
              </h3>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((post) => {
                  const hasCover = Boolean(blogCoverSrc(post));
                  return (
                    <li key={`home-blog-${post.slug}`} className="min-w-0">
                      <article className="flex h-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_12px_40px_rgba(30,58,138,0.06)] transition hover:border-primary/25 hover:shadow-[0_18px_50px_rgba(30,58,138,0.1)] dark:border-slate-800 dark:bg-slate-900">
                        <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="group flex h-full min-h-[280px] flex-col sm:min-h-0">
                          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
                            {hasCover ? (
                              <BlogCoverImage post={post} title={post.title} />
                            ) : (
                              <BlogCoverPlaceholder
                                slug={post.slug}
                                icon="shield_person"
                                className="absolute inset-0 size-full"
                              />
                            )}
                          </div>
                          <div className="flex min-h-[180px] flex-1 flex-col justify-center p-5 sm:p-6">
                            <time className="text-xs font-semibold text-secondary" dateTime={post.publishedAt}>
                              {new Date(post.publishedAt).toLocaleDateString("ar-SA", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </time>
                            <h4 className="mt-2 font-headline text-lg font-extrabold leading-snug text-primary group-hover:text-secondary md:text-xl">
                              {post.title}
                            </h4>
                            {post.excerpt ? (
                              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-on-surface-variant">{post.excerpt}</p>
                            ) : null}
                            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                              افتح المقال
                              <Icon name="arrow_back" className="text-lg transition-transform group-hover:-translate-x-0.5" />
                            </span>
                          </div>
                        </Link>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
