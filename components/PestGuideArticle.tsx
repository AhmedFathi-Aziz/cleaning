import Link from "next/link";

import { RichParagraph } from "@/components/RichParagraph";
import { Icon } from "@/components/Icon";
import { slugifyHeading } from "@/lib/markdown-utils";
import { brandNameAr } from "@/lib/brand";
import type { PestGuide } from "@/lib/pest-guides";

type Props = {
  guide: PestGuide;
  canonicalUrl: string;
};

export function PestGuideArticle({ guide, canonicalUrl }: Props) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    inLanguage: "ar-SA",
    mainEntityOfPage: canonicalUrl,
    author: { "@type": "Organization", name: brandNameAr },
    publisher: { "@type": "Organization", name: brandNameAr },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="mx-auto max-w-6xl text-right">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link href="/guides/pest" className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline">
            <Icon name="arrow_forward" className="text-lg" />
            موسوعة الحشرات
          </Link>
          <Link
            href="/services/pest-control"
            className="rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm"
          >
            خدمة مكافحة الحشرات
          </Link>
        </div>

        <header className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-[0_18px_55px_rgba(30,58,138,0.08)] md:p-10">
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
            <Icon name={guide.icon} className="text-2xl" />
          </span>
          <p className="mb-3 text-sm font-extrabold text-secondary">موسوعة مكافحة الحشرات — {brandNameAr}</p>
          <h1 className="font-headline text-3xl font-extrabold leading-tight text-primary md:text-5xl">{guide.title}</h1>
          <p className="mt-5 text-base font-medium leading-8 text-on-surface-variant md:text-lg">{guide.excerpt}</p>
        </header>

        <GuideBody guide={guide} />
      </article>
    </>
  );
}

function GuideBody({ guide }: { guide: PestGuide }) {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
      <aside className="space-y-5 lg:sticky lg:top-24">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="font-headline text-lg font-extrabold text-primary">محتوى الدليل</h2>
          <ul className="mt-4 space-y-3 text-sm font-semibold text-on-surface-variant">
            {guide.sections.map((section) => (
              <li key={section.heading} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                <a href={`#${slugifyHeading(section.heading)}`} className="transition hover:text-secondary">
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="font-headline text-lg font-extrabold text-primary">كلمات مفتاحية</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {guide.keywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-surface-container-low px-3 py-1.5 text-xs font-bold text-primary">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </aside>
      <div className="space-y-6">
        {guide.sections.map((section, index) => (
          <section
            key={section.heading}
            id={slugifyHeading(section.heading)}
            className="scroll-mt-28 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/10 text-sm font-extrabold text-secondary">
              {index + 1}
            </div>
            <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">{section.heading}</h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <RichParagraph
                  key={paragraph}
                  className="text-base leading-9 text-on-surface-variant"
                >
                  {paragraph}
                </RichParagraph>
              ))}
              {section.bullets ? (
                <ul className="my-4 space-y-2 rounded-2xl border border-slate-100 bg-surface-container-low/60 p-5 pe-8 text-on-surface-variant">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="list-inside list-disc leading-8 marker:text-secondary">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
        <section className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-headline text-2xl font-extrabold text-primary">أسئلة شائعة</h2>
          <div className="mt-4 space-y-4">
            {guide.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl bg-surface-container-low p-5">
                <h3 className="font-bold text-primary">{faq.question}</h3>
                <RichParagraph className="mt-2 leading-7 text-on-surface-variant">{faq.answer}</RichParagraph>
              </div>
            ))}
          </div>
        </section>
        <div className="flex flex-wrap items-center gap-4 rounded-3xl bg-white p-6 shadow-sm">
          <Link href="/contact" className="liquid-gradient rounded-full px-8 py-3 text-sm font-bold text-white shadow-lg">
            احجز مكافحة حشرات
          </Link>
          <Link href="/services/pest-control" className="font-bold text-primary hover:text-secondary">
            صفحة الخدمة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
