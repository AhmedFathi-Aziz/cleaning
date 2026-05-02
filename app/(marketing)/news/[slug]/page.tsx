import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarkdownBody } from "@/components/MarkdownBody";
import { Icon } from "@/components/Icon";
import { brandNameAr } from "@/lib/brand";
import { getNationalNewsBySlug } from "@/lib/national-news-store";
import type { NationalNewsArticle } from "@/lib/national-news-types";
import { absoluteUrl, buildArabicPageMetadata } from "@/lib/seo";
import { heroImageUrl, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const article = await getNationalNewsBySlug(decoded);
  if (!article) return { title: "غير موجود" };

  const canonical = `/news/${encodeURIComponent(article.slug)}`;
  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.excerpt;

  return buildArabicPageMetadata({
    title,
    description,
    canonical,
    keywords: article.keywords,
    image: heroImageUrl,
    imageAlt: article.title,
    type: "article",
  });
}

export default async function NationalNewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const article = await getNationalNewsBySlug(decoded);
  if (!article) notFound();

  const canonicalUrl = absoluteUrl(`/news/${encodeURIComponent(article.slug)}`);
  const jsonLd = buildNewsJsonLd(article, canonicalUrl);

  return (
    <main className="bg-slate-50 px-4 pb-24 pt-28 sm:px-6 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-3xl text-right">
        <Link
          href="/news"
          className="text-sm font-bold text-secondary hover:underline"
        >
          العودة للأخبار الوطنية
        </Link>
        <time className="mt-6 block text-sm font-semibold text-secondary" dateTime={article.publishedAt}>
          {new Date(article.publishedAt).toLocaleDateString("ar-SA", { dateStyle: "long" })}
        </time>
        <h1 className="font-headline mt-4 text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl">
          {article.title}
        </h1>
        {article.excerpt ? <p className="mt-4 text-lg text-on-surface-variant sm:text-xl">{article.excerpt}</p> : null}

        <div className="mt-8 rounded-2xl border border-secondary/25 bg-white p-6 shadow-sm">
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

        <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 sm:p-8">
          <MarkdownBody markdown={article.bodyMd} />
        </div>
      </article>
    </main>
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
    author: {
      "@type": "Organization",
      name: brandNameAr,
    },
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
