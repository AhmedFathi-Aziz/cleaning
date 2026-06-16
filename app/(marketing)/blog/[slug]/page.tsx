import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleAuthorCard } from "@/components/ArticleAuthorCard";
import { ArticleReadingShell } from "@/components/ArticleReadingShell";
import { BlogCoverPlaceholder } from "@/components/BlogCoverPlaceholder";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { getBlogArticleContextLinks } from "@/lib/article-context-links";
import { resolveArticleAuthorName, buildArticleAuthorSchema } from "@/lib/article-author";
import { brandNameAr } from "@/lib/brand";
import { getPostBySlug } from "@/lib/post-store";
import { staticBlogPosts } from "@/lib/static-blog";
import type { BlogPost } from "@/lib/post-types";
import { absoluteUrl, buildArabicPageMetadata } from "@/lib/seo";
import { heroImageUrl, siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticBlogPosts.map((post) => ({ slug: post.slug }));
}

function resolveSlugParam(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function getPostImageForPage(post: BlogPost) {
  if (post.coverImage) return post.coverImage;
  if (post.coverKey) return `/api/media/${encodeURIComponent(post.coverKey)}`;
  return null;
}

function getPostMetadataImage(post: BlogPost) {
  if (post.coverImage) return post.coverImage;
  if (post.coverKey) return `${siteUrl}/api/media/${encodeURIComponent(post.coverKey)}`;
  return heroImageUrl;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decoded = resolveSlugParam(slug);
  const post = getPostBySlug(decoded);
  if (!post) return { title: "غير موجود", robots: { index: false, follow: false } };

  const canonical = `/blog/${encodeURIComponent(post.slug)}`;
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const image = getPostMetadataImage(post);
  const authorName = resolveArticleAuthorName({ authorId: post.authorId, author: post.author });
  const metadata = buildArabicPageMetadata({
    title,
    description,
    canonical,
    keywords: post.keywords,
    image,
    imageAlt: post.title,
    type: "article",
  });

  return {
    ...metadata,
    authors: [{ name: authorName }],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [authorName],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decoded = resolveSlugParam(slug);
  const post = getPostBySlug(decoded);
  if (!post) notFound();

  const hero = getPostImageForPage(post);
  const canonicalUrl = absoluteUrl(`/blog/${encodeURIComponent(post.slug)}`);
  const heroForSchema =
    post.coverImage ??
    (post.coverKey ? absoluteUrl(`/api/media/${encodeURIComponent(post.coverKey)}`) : null);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    image: heroForSchema ? [heroForSchema] : [heroImageUrl],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: buildArticleAuthorSchema({ authorId: post.authorId, author: post.author }),
    publisher: {
      "@type": "Organization",
      name: brandNameAr,
      url: siteUrl,
    },
    mainEntityOfPage: canonicalUrl,
    keywords: post.keywords?.join(", "),
  };

  const contextLinks = getBlogArticleContextLinks(post.slug);

  return (
    <>
      <main className="bg-slate-50 px-4 pb-8 pt-28 sm:px-6 md:px-8 md:pt-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <article className="mx-auto max-w-6xl text-right">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:underline"
          >
            العودة للمدونة
          </Link>
          <header className="mt-6 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_18px_55px_rgba(30,58,138,0.08)] md:p-10">
            <time className="text-sm font-semibold text-secondary" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("ar-SA", { dateStyle: "long" })}
            </time>
            <ArticleAuthorCard authorId={post.authorId} author={post.author} />
            <h1 className="font-headline mt-4 text-3xl font-extrabold leading-tight text-primary sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-5 text-lg font-medium leading-9 text-on-surface-variant md:text-xl">{post.excerpt}</p>
            ) : null}
          </header>
          <div className="relative mt-8 aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-lg">
            {hero ? (
              <>
                <ResponsiveImage
                  src={hero}
                  alt={post.seoTitle ?? post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 1152px, 100vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent"
                  aria-hidden
                />
              </>
            ) : (
              <BlogCoverPlaceholder slug={post.slug} icon="shield_person" className="absolute inset-0 size-full" />
            )}
          </div>
          <ArticleReadingShell bodyMd={post.bodyMd} keywords={post.keywords} contextLinks={contextLinks} />
        </article>
      </main>
    </>
  );
}
