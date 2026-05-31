import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Icon } from "@/components/Icon";
import { ServicePageJsonLd } from "@/components/SeoJsonLd";
import { ServicePageTableOfContents } from "@/components/ServicePageTableOfContents";
import { ServicePestGuidesPromo } from "@/components/ServicePestGuidesPromo";
import { ServiceRiyadhAreasTeaser } from "@/components/ServiceRiyadhAreasTeaser";
import { primaryCityNameAr } from "@/lib/region";
import { brandNameAr } from "@/lib/brand";
import { buildServiceHeroImageAlt, buildServiceHeroImageTitle } from "@/lib/image-seo";
import { buildArabicPageMetadata } from "@/lib/seo";
import { buildServicePageTocNavItems } from "@/lib/service-page-toc";
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

  if (!service) return { title: "غير موجود", robots: { index: false, follow: false } };

  const canonical = `/services/${service.slug}`;
  const heroImageAlt = buildServiceHeroImageAlt(service);

  return buildArabicPageMetadata({
    title: service.seoTitle ?? service.title,
    description: service.seoDescription ?? service.excerpt,
    keywords: service.keywords,
    canonical,
    image: service.image,
    imageAlt: heroImageAlt,
    type: "article",
  });
}

export default async function ServiceDetailsPage({ params }: PageProps) {
  const { category } = await params;
  const service = getServiceArticle(category);

  if (!service) notFound();

  const tocItems = buildServicePageTocNavItems(service);
  const heroImageAlt = buildServiceHeroImageAlt(service);
  const heroImageTitle = buildServiceHeroImageTitle(service);

  return (
    <main className="bg-slate-50 px-6 pb-24 pt-28 md:px-8">
      <ServicePageJsonLd service={service} />

      <article className="mx-auto max-w-6xl text-right">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline"
        >
          <Icon name="arrow_forward" className="text-lg" />
          العودة إلى الخدمات
        </Link>

        <header className="relative mt-6 flex h-[clamp(260px,54svh,520px)] items-center overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_55px_rgba(30,58,138,0.08)]">
          <Image
            src={service.image}
            alt={heroImageAlt}
            title={heroImageTitle}
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

        <div className="mt-8">
          <div className="toc-nav-scroll scrollbar-toc max-h-[min(46vh,26rem)] overflow-y-auto sm:max-h-none sm:overflow-visible">
            <ServicePageTableOfContents items={tocItems} />
          </div>
        </div>

        {service.keyTakeaways && service.keyTakeaways.length > 0 ? (
          <section
            className="mt-6 rounded-3xl border border-secondary/20 bg-white p-6 shadow-sm md:p-8"
            aria-labelledby="service-key-points-heading"
          >
            <h2 id="service-key-points-heading" className="font-headline text-lg font-extrabold text-primary md:text-xl">
              أهم النقاط قبل الحجز
            </h2>
            <ul className="mt-4 grid gap-3 text-sm font-semibold leading-relaxed text-on-surface-variant md:grid-cols-2 md:text-base">
              {service.keyTakeaways.map((line) => (
                <li key={line} className="flex gap-2 rounded-2xl bg-surface-container-low/80 p-4">
                  <Icon name="check_circle" className="mt-0.5 shrink-0 text-lg text-secondary" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="space-y-5 lg:sticky lg:top-28">
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
                استجابة سريعة على الاستفسارات، وموعد يُنسَّق وفق نوع الخدمة ومساحة المكان — مع توضيح الضمان
                المتفق عليه قبل التنفيذ.
              </p>
              <Link
                href="/#book"
                className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-primary"
              >
                احجز الآن
              </Link>
            </div>
          </aside>

          <div className="space-y-6">
            <section
              id="sec-trust"
              tabIndex={-1}
              className="scroll-mt-28 rounded-3xl border border-secondary/25 bg-gradient-to-bl from-white to-slate-50 p-6 shadow-sm md:p-8"
              aria-labelledby="sec-trust-heading"
            >
              <h2
                id="sec-trust-heading"
                className="font-headline text-2xl font-extrabold leading-snug text-primary md:text-3xl"
              >
                استجابة سريعة، ضمان على الخدمة، وعمالة مدربة — خدمة موثوقة في {primaryCityNameAr}
              </h2>
              <p className="mt-4 text-base font-medium leading-9 text-on-surface-variant">
                نؤمن أن ثقة العميل السعودي تُبنى على <strong className="text-primary">سرعة الرد</strong> عند
                الاتصال أو واتساب، وعلى <strong className="text-primary">ضمان عملي</strong> يُشرح لك قبل
                الموعد وليس شعاراً مطاطاً. فريقنا مدرب على بروتوكولات السلامة والتنظيف، ونعتمد تشكيلات{" "}
                <strong className="text-primary">عمالة منزلية</strong> شائعة في السوق السعودي مثل{" "}
                <strong className="text-primary">العمالة الفلبينية والإندونيسية</strong> وغيرها حسب التوفر
                والخطة المتفق عليها، مع أدوات ومعدات معروفة بجودتها{" "}
                <strong className="text-primary">ومنها ماركات ألمانية مرجعية في قطاع خدمات التنظيف</strong> عند
                الحاجة للتفاصيل الدقيقة.
              </p>
              <p className="mt-4 text-base font-medium leading-9 text-on-surface-variant">
                سواء احتجت <strong className="text-primary">تنظيف منازل</strong>،{" "}
                <strong className="text-primary">جلي رخام</strong> ضمن الباقة المتفق عليها،{" "}
                <strong className="text-primary">غسيل سجاد بالبخار</strong>،{" "}
                <strong className="text-primary">تعقيم خزانات</strong>، أو{" "}
                <strong className="text-primary">تنظيف واجهات زجاجية</strong>، نربط الوعد بالواقع: خطة واضحة،
                مواد مناسبة، ومتابعة بعد الزيارة عند الاتفاق.
              </p>
            </section>

            {service.sections.map((section, index) => (
              <section
                key={section.heading}
                id={`sec-${index}`}
                tabIndex={-1}
                className="scroll-mt-28 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/10 text-sm font-extrabold text-secondary">
                  {index + 1}
                </div>
                <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">{section.heading}</h2>
                {index === 0 && service.contentImage ? (
                  <figure className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={service.contentImage}
                      alt={service.contentImageAlt ?? service.title}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 720px, 100vw"
                      className="object-cover"
                    />
                  </figure>
                ) : null}
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-9 text-on-surface-variant">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-5 list-disc space-y-2 pe-5 text-sm font-semibold leading-relaxed text-on-surface-variant md:text-base">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {service.faqs.length > 0 ? (
              <section
                id="sec-faq"
                tabIndex={-1}
                className="scroll-mt-28 rounded-3xl border border-primary/10 bg-white p-6 shadow-sm md:p-8"
                aria-labelledby="sec-faq-heading"
              >
                <h2 id="sec-faq-heading" className="font-headline text-2xl font-extrabold text-primary">
                  أسئلة شائعة عن الخدمة
                </h2>
                <div className="mt-5 space-y-4">
                  {service.faqs.map((faq) => (
                    <div key={faq.question} className="rounded-2xl bg-surface-container-low p-5">
                      <h3 className="font-bold text-primary">{faq.question}</h3>
                      <p className="mt-2 leading-7 text-on-surface-variant">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {service.slug === "pest-control" ? <ServicePestGuidesPromo /> : null}

            <ServiceRiyadhAreasTeaser serviceSlug={service.slug} serviceShortTitle={service.shortTitle} />

            <section
              id="sec-value"
              tabIndex={-1}
              className="scroll-mt-28 rounded-[2rem] border border-slate-100 bg-white p-6 text-right shadow-sm md:p-10"
              aria-labelledby="sec-value-heading"
            >
              <p className="mb-3 text-sm font-extrabold text-secondary">محتوى تفصيلي عن الخدمة</p>
              <h2
                id="sec-value-heading"
                className="font-headline text-2xl font-extrabold text-primary md:text-3xl"
              >
                لماذا تعد خدمة {service.shortTitle} خياراً مهماً في {primaryCityNameAr}؟
              </h2>
              <div className="mt-5 space-y-4 text-base leading-9 text-on-surface-variant">
                <p>
                  نقدّم خدمات {service.shortTitle} بفريق <strong className="text-primary">مدرّب</strong> ومواد
                  تنظيف ومكافحة آمنة قدر الإمكان، مع تنسيق يراعي طبيعة المنزل السعودي: استقبال، غبار، مطابخ
                  نشطة، وأحياناً حدائق وفلل متعددة المداخل. نركّز على{" "}
                  <strong className="text-primary">الاستجابة السريعة</strong> لتأكيد الموعد، وعلى شرح{" "}
                  <strong className="text-primary">الضمان أو المتابعة</strong> المتاحة لحالتك قبل الدفع حتى
                  تكون التجربة واضحة من البداية.
                </p>
                <p>
                  جودة {service.shortTitle} تعتمد على الجمع بين الخبرة، الأدوات المناسبة، والاهتمام بالتفاصيل
                  التي لا تظهر في التنظيف السريع. لذلك ننفّذ الخدمة بطريقة منظمة تبدأ بفهم احتياجك ثم تنتهي
                  بتسليم مساحة أنظف وأهدأ للاستخدام اليومي — مع إمكانية ربط الخدمة لاحقاً بصفحات الأحياء في
                  مدينتك ضمن شبكة {brandNameAr}.
                </p>
                <p>
                  هذه الصفحة تساعدك على معرفة تفاصيل {service.shortTitle} وكيف تستفيد منها ضمن خدمات{" "}
                  {brandNameAr}. إن رغبت في عرض سعر أدق أو وقت أقرب، تواصل عبر الحجز السريع في أعلى الصفحة
                  الرئيسية أو صفحة التواصل، وسنجيبك في أقرب وقت عمل.
                </p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
