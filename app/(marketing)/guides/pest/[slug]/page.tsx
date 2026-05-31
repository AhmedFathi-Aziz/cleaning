import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PestGuideArticle } from "@/components/PestGuideArticle";
import { RelatedServicesSection } from "@/components/RelatedServicesSection";
import { getPestGuide, pestGuides } from "@/lib/pest-guides";
import { buildArabicPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pestGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getPestGuide(slug);
  if (!guide) return { title: "غير موجود", robots: { index: false, follow: false } };

  return buildArabicPageMetadata({
    title: guide.title,
    description: guide.excerpt,
    keywords: guide.keywords,
    canonical: `/guides/pest/${guide.slug}`,
  });
}

export default async function PestGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getPestGuide(slug);
  if (!guide) notFound();

  const canonicalUrl = `${siteUrl}/guides/pest/${guide.slug}`;

  return (
    <>
      <main className="bg-slate-50 px-6 pb-8 pt-24 md:px-8">
        <PestGuideArticle guide={guide} canonicalUrl={canonicalUrl} />
      </main>
      <RelatedServicesSection />
    </>
  );
}
