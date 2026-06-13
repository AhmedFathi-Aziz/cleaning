import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { brandNameAr } from "@/lib/brand";
import { featureArticles, getFeatureArticle } from "@/lib/feature-articles";
import { buildArabicPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { RichParagraph } from "@/components/RichParagraph";
import { Icon } from "@/components/Icon";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return featureArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getFeatureArticle(slug);

  if (!article) return { title: "غير موجود", robots: { index: false, follow: false } };

  const canonical = `/features/${article.slug}`;

  return buildArabicPageMetadata({
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords,
    canonical,
    image: article.image,
    imageAlt: article.title,
    type: "article",
  });
}

export default async function FeatureArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getFeatureArticle(slug);

  if (!article) notFound();

  const canonicalUrl = `${siteUrl}/features/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    inLanguage: "ar-SA",
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Organization",
      name: brandNameAr,
    },
    publisher: {
      "@type": "Organization",
      name: brandNameAr,
    },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="bg-slate-50 px-6 pb-24 pt-24 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="mx-auto max-w-6xl text-right">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link href="/#about-features" className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline">
            <Icon name="arrow_forward" className="text-lg" />
            العودة إلى المميزات
          </Link>
          <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm">
            دليل من {brandNameAr}
          </span>
        </div>

        <header className="overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_55px_rgba(30,58,138,0.08)]">
          <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[320px] bg-primary-container/10 lg:min-h-[420px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/10 to-transparent" aria-hidden />
            </div>

            <div className="flex flex-col justify-center p-7 md:p-10">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                <Icon name={article.icon} className="text-2xl" />
              </span>
              <p className="mb-3 text-sm font-extrabold text-secondary">مقال متخصص في خدمات التنظيف</p>
              <h1 className="font-headline text-3xl font-extrabold leading-tight text-primary md:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 text-base font-medium leading-8 text-on-surface-variant md:text-lg">
                {article.excerpt}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-headline text-lg font-extrabold text-primary">محتوى المقال</h2>
              <ul className="mt-4 space-y-3 text-sm font-semibold text-on-surface-variant">
                {article.sections.map((section) => (
                  <li key={section.heading} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                    <span>{section.heading}</span>
                  </li>
                ))}
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  <span>أسئلة شائعة</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-headline text-lg font-extrabold text-primary">موضوعات مرتبطة</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-surface-container-low px-3 py-1.5 text-xs font-bold text-primary">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-primary p-6 text-white shadow-[0_18px_45px_rgba(0,35,111,0.16)]">
              <h2 className="font-headline text-xl font-extrabold">تحتاج الخدمة؟</h2>
              <p className="mt-3 text-sm leading-7 text-white/80">احجز موعد تنظيف أو رش حشرات وسيتم التواصل معك لتحديد التفاصيل.</p>
              <Link
                href="/#book"
                className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-primary"
              >
                احجز الآن
              </Link>
            </div>
          </aside>

          <div className="space-y-6">
            {article.sections.map((section, index) => (
              <section key={section.heading} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/10 text-sm font-extrabold text-secondary">
                  {index + 1}
                </div>
                <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <RichParagraph key={paragraph} className="text-base leading-9 text-on-surface-variant">
                      {paragraph}
                    </RichParagraph>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
                  <Icon name="help" className="" />
                </span>
                <h2 className="font-headline text-2xl font-extrabold text-primary">أسئلة شائعة</h2>
              </div>
              <div className="space-y-4">
                {article.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl bg-surface-container-low p-5">
                    <h3 className="font-bold text-primary">{faq.question}</h3>
                    <RichParagraph className="mt-2 leading-7 text-on-surface-variant">{faq.answer}</RichParagraph>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-4 rounded-3xl bg-white p-6 shadow-sm">
              <Link
                href="/#book"
                className="liquid-gradient rounded-full px-8 py-3 text-sm font-bold text-white shadow-lg"
              >
                احجز الخدمة الآن
              </Link>
              <Link href="/services" className="font-bold text-primary hover:text-secondary">
                تصفح خدمات التنظيف
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
