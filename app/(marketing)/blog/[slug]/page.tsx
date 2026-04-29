import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarkdownBody } from "@/components/MarkdownBody";
import { brandNameAr } from "@/lib/brand";
import { getPostBySlug } from "@/lib/post-store";
import type { BlogPost } from "@/lib/post-types";
import { absoluteUrl, buildArabicPageMetadata } from "@/lib/seo";
import { heroImageUrl, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

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
  const decoded = decodeURIComponent(slug);
  const post = await getPostBySlug(decoded);
  if (!post) return { title: "غير موجود" };

  const canonical = `/blog/${encodeURIComponent(post.slug)}`;
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const image = getPostMetadataImage(post);
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
    authors: [{ name: post.author ?? brandNameAr }],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author ?? brandNameAr],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const post = await getPostBySlug(decoded);
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
    author: {
      "@type": "Organization",
      name: post.author ?? brandNameAr,
    },
    publisher: {
      "@type": "Organization",
      name: brandNameAr,
      url: siteUrl,
    },
    mainEntityOfPage: canonicalUrl,
    keywords: post.keywords?.join(", "),
  };

  return (
    <main className="px-8 pb-24 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="mx-auto max-w-3xl text-right">
        <Link href="/blog" className="text-sm font-bold text-secondary hover:underline">
          العودة للمدونة
        </Link>
        <time className="mt-6 block text-on-surface-variant" dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("ar-SA", { dateStyle: "long" })}
        </time>
        <h1 className="font-headline mt-4 text-4xl font-extrabold text-primary md:text-5xl">{post.title}</h1>
        {post.excerpt ? <p className="mt-4 text-xl text-on-surface-variant">{post.excerpt}</p> : null}
        {hero ? (
          <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={hero}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
              unoptimized
            />
          </div>
        ) : null}
        <div className="mt-12">
          <MarkdownBody markdown={post.bodyMd} />
        </div>
      </article>
    </main>
  );
}
