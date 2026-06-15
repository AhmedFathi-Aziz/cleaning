import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Icon } from "@/components/Icon";
import { ServicePageSidebar } from "@/components/ServicePageSidebar";
import { ServiceArticleParagraph } from "@/components/ServiceArticleParagraph";
import { ServiceLocationJsonLd } from "@/components/SeoJsonLd";
import { brandNameAr } from "@/lib/brand";
import { buildServiceHeroImageAlt } from "@/lib/image-seo";
import { getCleaningDistrictPath } from "@/lib/programmatic-cleaning-seo";
import { buildArabicPageMetadata, expandMetaDescription, fitMetaTitle, truncateForMetaDescription } from "@/lib/seo";
import { getServiceLocationPageContent } from "@/lib/service-location-deep-content";
import { getServiceLocationStaticParams, isServiceLocationPairAllowed } from "@/lib/service-location-pages";
import { getServiceArticle } from "@/lib/service-articles";
import { getCityBySlug, getNeighborhoodBySlug } from "@/src/data/locations";

type PageProps = {
  params: Promise<{
    category: string;
    city: string;
    neighborhood: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceLocationStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, city: citySlug, neighborhood: neighborhoodSlug } = await params;
  const service = getServiceArticle(category);
  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, neighborhoodSlug);

  if (!service || !city || !neighborhood) return { title: "غير موجود", robots: { index: false, follow: false } };
  if (!isServiceLocationPairAllowed(category, citySlug, neighborhoodSlug)) {
    return { title: "غير موجود", robots: { index: false, follow: false } };
  }

  const title = fitMetaTitle(`أفضل شركة ${service.shortTitle} في حي ${neighborhood.name} ${city.name} | اطلب الآن`);
  const landmarks = truncateForMetaDescription(neighborhood.nearbyLandmarksAr, 95);
  const description = expandMetaDescription(
    `خدمة ${service.shortTitle} في حي ${neighborhood.name} بمدينة ${city.name} من ${brandNameAr}. ${landmarks}`,
  );
  const canonical = `/services/${service.slug}/${city.slug}/${neighborhood.slug}`;
  const imageAlt = buildServiceHeroImageAlt(service, {
    cityName: city.name,
    neighborhoodName: neighborhood.name,
  });

  return buildArabicPageMetadata({
    title,
    description,
    keywords: [
      `${service.shortTitle} ${neighborhood.name}`,
      `${service.shortTitle} ${city.name}`,
      `شركة ${service.shortTitle} في حي ${neighborhood.name}`,
      ...service.keywords,
    ],
    canonical,
    image: service.image,
    imageAlt,
    type: "article",
  });
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { category, city: citySlug, neighborhood: neighborhoodSlug } = await params;
  const service = getServiceArticle(category);
  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, neighborhoodSlug);

  if (!service || !city || !neighborhood) notFound();
  if (!isServiceLocationPairAllowed(category, citySlug, neighborhoodSlug)) notFound();

  const deepContent = getServiceLocationPageContent(service.slug, city, neighborhood);
  const pageTitle = `أفضل شركة ${service.shortTitle} في حي ${neighborhood.name} ${city.name}`;
  const hubPath = `/${city.slug}/${neighborhood.slug}`;
  const serviceHubPath = `/services/${service.slug}`;
  const cleaningDistrictPath = getCleaningDistrictPath(city.slug, neighborhood.slug);

  return (
    <main className="bg-slate-50 px-6 pb-24 pt-28 md:px-8">
      <ServiceLocationJsonLd service={service} city={city} neighborhood={neighborhood} />

      <article className="mx-auto max-w-6xl text-right">
        <nav aria-label="فتات التنقل" className="mb-5 text-sm font-bold text-slate-600">
          <ol className="flex flex-wrap items-center justify-end gap-2">
            <li>
              <Link href="/" className="hover:text-primary hover:underline">
                الرئيسية
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li>
              <Link href={serviceHubPath} className="hover:text-primary hover:underline">
                {service.shortTitle}
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li>
              <Link href={`/areas#city-${city.slug}`} className="hover:text-primary hover:underline">
                {city.name}
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li className="text-primary">{neighborhood.name}</li>
          </ol>
        </nav>

        <Link
          href={hubPath}
          className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline"
        >
          <Icon name="arrow_forward" className="text-lg" />
          كل خدمات التنظيف في {neighborhood.name}
        </Link>

        <header className="mt-6 flex min-h-[clamp(260px,54svh,520px)] items-center rounded-[2rem] bg-white p-8 shadow-[0_18px_55px_rgba(30,58,138,0.08)] md:p-12">
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
              <Icon name={service.icon} className="text-2xl" />
            </span>
            <p className="mb-3 text-sm font-extrabold text-secondary">
              {service.shortTitle} — حي {neighborhood.name}، {city.name}
            </p>
            <h1 className="font-headline text-3xl font-extrabold leading-tight text-primary md:text-5xl">{pageTitle}</h1>
            {deepContent?.localIntro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-5 text-base font-medium leading-8 text-on-surface-variant md:text-lg">
                {paragraph}
              </p>
            ))}
            {service.keyTakeaways?.length ? (
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {service.keyTakeaways.map((item) => (
                  <li key={item} className="flex gap-2 text-sm font-semibold leading-7 text-primary">
                    <Icon name="check_circle" className="mt-0.5 shrink-0 text-lg text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#book" className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-lg">
                احجز الخدمة
              </Link>
              <Link href="/contact" className="rounded-full bg-surface-container-low px-7 py-3 text-sm font-bold text-primary">
                اطلب عرض سعر
              </Link>
              <Link href={serviceHubPath} className="rounded-full border border-primary/20 bg-white px-7 py-3 text-sm font-bold text-primary">
                دليل {service.shortTitle} العام
              </Link>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
          <ServicePageSidebar
            serviceTitle={service.title}
            serviceSlug={service.slug}
            includes={service.includes}
            locationLabel={`${neighborhood.name}، ${city.name}`}
            extraBlocks={
              deepContent?.preparationBullets.length ? (
                <div className="rounded-3xl border border-secondary/20 bg-secondary/5 p-6 shadow-sm">
                  <h2 className="font-headline text-lg font-extrabold text-primary">جهّز قبل الزيارة</h2>
                  <ul className="mt-4 space-y-3">
                    {deepContent.preparationBullets.map((item) => (
                      <li key={item} className="flex gap-2 text-sm font-semibold leading-7 text-on-surface-variant">
                        <Icon name="task_alt" className="mt-0.5 shrink-0 text-lg text-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : undefined
            }
          />

          <div className="space-y-6">
            {deepContent?.sections.map((section, index) => (
              <section key={section.heading} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/10 text-sm font-extrabold text-secondary">
                  {index + 1}
                </div>
                <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <ServiceArticleParagraph
                      key={paragraph.slice(0, 56)}
                      text={paragraph}
                      className="text-base leading-9 text-on-surface-variant"
                    />
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-sm font-semibold leading-7 text-primary">
                        <Icon name="check_circle" className="mt-0.5 shrink-0 text-lg text-secondary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        {deepContent?.faqs.length ? (
          <section className="mt-8 rounded-[2rem] border border-slate-100 bg-white p-6 text-right shadow-sm md:p-10">
            <p className="mb-3 text-sm font-extrabold text-secondary">أسئلة شائعة في حي {neighborhood.name}</p>
            <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
              {service.shortTitle} في {neighborhood.name} — {city.name}
            </h2>
            <dl className="mt-6 space-y-6">
              {deepContent.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-surface-container-low p-5 md:p-6">
                  <dt className="font-headline text-lg font-extrabold text-primary">{faq.question}</dt>
                  <dd className="mt-3 text-base leading-8 text-on-surface-variant">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <section className="mt-8 rounded-[2rem] border border-primary/10 bg-white p-6 text-right shadow-sm md:p-10">
          <p className="mb-3 text-sm font-extrabold text-secondary">روابط مفيدة</p>
          <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
            المزيد عن {service.shortTitle} في {city.name}
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={serviceHubPath} className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white">
              صفحة {service.shortTitle} الرئيسية
            </Link>
            <Link href={hubPath} className="rounded-full bg-surface-container-low px-6 py-2.5 text-sm font-bold text-primary">
              كل الخدمات في حي {neighborhood.name}
            </Link>
            {cleaningDistrictPath ? (
              <Link
                href={cleaningDistrictPath}
                className="rounded-full border border-primary/20 bg-white px-6 py-2.5 text-sm font-bold text-primary"
              >
                تنظيف منازل — {neighborhood.name}
              </Link>
            ) : null}
          </div>
        </section>
      </article>
    </main>
  );
}
