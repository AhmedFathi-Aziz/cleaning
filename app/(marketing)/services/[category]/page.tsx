import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Icon } from "@/components/Icon";
import { ServicePageJsonLd } from "@/components/SeoJsonLd";
import { brandNameAr } from "@/lib/brand";
import { buildArabicPageMetadata } from "@/lib/seo";
import { getServiceArticle, serviceArticles } from "@/lib/service-articles";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return serviceArticles.map((service) => ({ category: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const service = getServiceArticle(category);

  if (!service) return { title: "غير موجود" };

  const canonical = `/services/${service.slug}`;

  return buildArabicPageMetadata({
    title: service.title,
    description: service.excerpt,
    keywords: service.keywords,
    canonical,
    image: service.image,
    imageAlt: service.title,
    type: "article",
  });
}

export default async function ServiceDetailsPage({ params }: PageProps) {
  const { category } = await params;
  const service = getServiceArticle(category);

  if (!service) notFound();

  return (
    <main className="bg-slate-50 px-6 pb-24 pt-28 md:px-8">
      <ServicePageJsonLd service={service} />

      <article className="mx-auto max-w-6xl text-right">
        <Link href="/#services" className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline">
          <Icon name="arrow_forward" className="text-lg" />
          العودة إلى الخدمات
        </Link>

        <header className="relative mt-6 flex h-[clamp(260px,54svh,520px)] items-center overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_55px_rgba(30,58,138,0.08)]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-white via-white/90 to-white/55" aria-hidden />
          <div className="relative z-10 w-full p-7 md:p-10">
            <div className="max-w-3xl">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                <Icon name={service.icon} className="text-2xl" />
              </span>
              <p className="mb-3 text-sm font-extrabold text-secondary">تفاصيل الخدمة</p>
              <h1 className="font-headline text-3xl font-extrabold leading-tight text-primary md:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 text-base font-medium leading-8 text-on-surface-variant md:text-lg">
                {service.excerpt}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-headline text-lg font-extrabold text-primary">تشمل الخدمة</h2>
              <ul className="mt-4 space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
                    <Icon name="check_circle" className="text-lg text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-primary p-6 text-white shadow-[0_18px_45px_rgba(0,35,111,0.16)]">
              <h2 className="font-headline text-xl font-extrabold">احجز الخدمة</h2>
              <p className="mt-3 text-sm leading-7 text-white/80">
                أرسل طلبك وسيتم تنسيق الموعد المناسب حسب نوع الخدمة ومساحة المكان.
              </p>
              <Link href="/#book" className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-primary">
                احجز الآن
              </Link>
            </div>
          </aside>

          <div className="space-y-6">
            {service.sections.map((section, index) => (
              <section key={section.heading} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/10 text-sm font-extrabold text-secondary">
                  {index + 1}
                </div>
                <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-9 text-on-surface-variant">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-headline text-2xl font-extrabold text-primary">أسئلة شائعة عن الخدمة</h2>
              <div className="mt-5 space-y-4">
                {service.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl bg-surface-container-low p-5">
                    <h3 className="font-bold text-primary">{faq.question}</h3>
                    <p className="mt-2 leading-7 text-on-surface-variant">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="mt-8 rounded-[2rem] border border-slate-100 bg-white p-6 text-right shadow-sm md:p-10">
          <p className="mb-3 text-sm font-extrabold text-secondary">محتوى تفصيلي عن الخدمة</p>
          <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
            لماذا تعد خدمة {service.shortTitle} خياراً مهماً؟
          </h2>
          <div className="mt-5 space-y-4 text-base leading-9 text-on-surface-variant">
            <p>
              نحن نقدم أفضل خدمات {service.shortTitle} بأحدث المعدات ومواد تنظيف آمنة تساعد على تحسين مستوى
              النظافة داخل المنزل أو المنشأة. يتم تصميم خطوات العمل حسب طبيعة الخدمة، سواء كانت مرتبطة بتنظيف
              المساحات الداخلية، إزالة الأتربة، معالجة البقع، أو تحسين مظهر المكان قبل المناسبات وبعدها.
            </p>
            <p>
              تعتمد جودة {service.shortTitle} على الجمع بين الخبرة، الأدوات المناسبة، والاهتمام بالتفاصيل الصغيرة
              التي لا تظهر في التنظيف السريع. لذلك نحرص على تنفيذ الخدمة بطريقة منظمة تبدأ بفهم احتياج العميل
              وتنتهي بتسليم مساحة أكثر نظافة وراحة للاستخدام اليومي.
            </p>
            <p>
              هذه الصفحة تساعدك على معرفة تفاصيل {service.shortTitle} وكيف يمكن الاستفادة منها ضمن خدمات
              {brandNameAr}. ويمكن تخصيص الخدمة لاحقاً حسب المدينة والحي لتقديم محتوى وتجربة أكثر قرباً من موقعك
              واحتياجك الفعلي.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
