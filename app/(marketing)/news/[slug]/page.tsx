import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleAuthorCard } from "@/components/ArticleAuthorCard";
import { ArticleReadingShell } from "@/components/ArticleReadingShell";
import { Icon } from "@/components/Icon";
import { getNationalNewsContextLinks } from "@/lib/article-context-links";
import { resolveArticleAuthorName, buildArticleAuthorSchema } from "@/lib/article-author";
import { brandNameAr } from "@/lib/brand";
import { getNationalNewsBySlug } from "@/lib/national-news-store";
import type { NationalNewsArticle } from "@/lib/national-news-types";
import { absoluteUrl, buildArabicPageMetadata } from "@/lib/seo";
import { getStaticNationalNewsSlugs } from "@/lib/static-national-news";
import { heroImageUrl, siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticNationalNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const article = getNationalNewsBySlug(decoded);
  if (!article) return { title: "غير موجود", robots: { index: false, follow: false } };

  const canonical = `/news/${encodeURIComponent(article.slug)}`;
  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.excerpt;
  const authorName = resolveArticleAuthorName({ authorId: article.authorId, author: article.author });

  const metadata = buildArabicPageMetadata({
    title,
    description,
    canonical,
    keywords: article.keywords,
    image: heroImageUrl,
    imageAlt: article.title,
    type: "article",
  });

  return {
    ...metadata,
    authors: [{ name: authorName }],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [authorName],
    },
  };
}

export default async function NationalNewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const article = getNationalNewsBySlug(decoded);
  if (!article) notFound();

  const canonicalUrl = absoluteUrl(`/news/${encodeURIComponent(article.slug)}`);
  const jsonLd = buildNewsJsonLd(article, canonicalUrl);

  const contextLinks = getNationalNewsContextLinks(article.slug);

  return (
    <>
      <main className="bg-slate-50 px-4 pb-8 pt-28 sm:px-6 md:px-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article className="mx-auto max-w-6xl text-right">
          <Link href="/news" className="text-sm font-bold text-secondary hover:underline">
            العودة للأخبار الوطنية
          </Link>
          <header className="mt-6 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_18px_55px_rgba(30,58,138,0.08)] md:p-10">
            <time className="text-sm font-semibold text-secondary" dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("ar-SA", { dateStyle: "long" })}
            </time>
            <ArticleAuthorCard authorId={article.authorId} author={article.author} />
            <p className="mt-2 text-xs font-extrabold uppercase tracking-wide text-secondary">أخبار وطنية — توعية</p>
            <h1 className="font-headline mt-3 text-3xl font-extrabold leading-tight text-primary sm:text-4xl md:text-5xl">
              {article.title}
            </h1>
            {article.excerpt ? (
              <p className="mt-5 text-lg font-medium leading-9 text-on-surface-variant md:text-xl">{article.excerpt}</p>
            ) : null}
          </header>

          <ArticleReadingShell
            bodyMd={article.bodyMd}
            keywords={article.keywords}
            contextLinks={contextLinks}
          >
            <div className="mb-8 rounded-2xl border border-secondary/25 bg-white p-6 shadow-sm">
              <p className="text-sm font-extrabold text-secondary">المصدر الأصلي</p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                المحتوى أدناه لأغراض المعلومات فقط. للتحقق والتفاصيل الرسمية استخدم الرابط التالي.
              </p>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-base font-bold text-primary hover:underline"
              >
                {article.sourceLabel ?? "فتح المصدر"}
                <Icon name="open_in_new" className="text-xl" />
              </a>
              <p className="mt-2 break-all text-xs text-slate-500" dir="ltr">
                {article.sourceUrl}
              </p>
            </div>
          </ArticleReadingShell>
        </article>
      </main>
    </>
  );
}

function buildNewsJsonLd(article: NationalNewsArticle, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.seoDescription ?? article.excerpt,
    image: [heroImageUrl],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: buildArticleAuthorSchema({ authorId: article.authorId, author: article.author }),
    publisher: {
      "@type": "Organization",
      name: brandNameAr,
      url: siteUrl,
    },
    mainEntityOfPage: canonicalUrl,
    keywords: article.keywords?.join(", "),
    ...(article.sourceUrl
      ? {
          isBasedOn: {
            "@type": "WebPage",
            url: article.sourceUrl,
            name: article.sourceLabel ?? "المصدر",
          },
        }
      : {}),
  };
}
