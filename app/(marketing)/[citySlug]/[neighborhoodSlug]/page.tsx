import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Icon } from "@/components/Icon";
import { NeighborhoodPageJsonLd } from "@/components/SeoJsonLd";
import { NeighborhoodLocalContextBlock } from "@/components/NeighborhoodLocalContextBlock";
import { NeighborhoodServicesHighlight } from "@/components/NeighborhoodServicesHighlight";
import { brandNameAr } from "@/lib/brand";
import { isServiceLocationPairAllowed } from "@/lib/service-location-pages";
import { buildArabicPageMetadata, truncateForMetaDescription } from "@/lib/seo";
import { serviceArticles } from "@/lib/service-articles";
import { getCityBySlug, getNeighborhoodBySlug, locations } from "@/src/data/locations";

type PageProps = {
  params: Promise<{
    citySlug: string;
    neighborhoodSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.flatMap((city) =>
    city.neighborhoods.map((neighborhood) => ({
      citySlug: city.slug,
      neighborhoodSlug: neighborhood.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { citySlug, neighborhoodSlug } = await params;
  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, neighborhoodSlug);

  if (!city || !neighborhood) return { title: "غير موجود", robots: { index: false, follow: false } };

  const title = `أفضل شركة تنظيف في حي ${neighborhood.name} ${city.name} | اطلب الآن`;
  const snippet = truncateForMetaDescription(neighborhood.nearbyLandmarksAr);
  const description = `${snippet} احجز تنظيفاً احترافياً في حي ${neighborhood.name}، ${city.name} مع ${brandNameAr}.`;
  const canonical = `/${city.slug}/${neighborhood.slug}`;

  return buildArabicPageMetadata({
    title,
    description,
    keywords: [
      `تنظيف ${neighborhood.name}`,
      `شركة تنظيف ${city.name}`,
      `خدمات تنظيف في حي ${neighborhood.name}`,
      `تنظيف منازل ${city.name}`,
      `تنظيف خزانات ${city.name}`,
      `رش حشرات ${city.name}`,
      `تنظيف حدائق ${city.name}`,
    ],
    canonical,
  });
}

export default async function NeighborhoodCleaningPage({ params }: PageProps) {
  const { citySlug, neighborhoodSlug } = await params;
  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, neighborhoodSlug);

  if (!city || !neighborhood) notFound();

  const pageTitle = `أفضل شركة تنظيف في حي ${neighborhood.name} ${city.name}`;

  return (
    <main className="bg-slate-50 px-6 pb-24 pt-28 md:px-8">
      <NeighborhoodPageJsonLd city={city} neighborhood={neighborhood} />

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
        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline">
          <Icon name="arrow_forward" className="text-lg" />
          العودة إلى الخدمات
        </Link>

        <header className="mt-6 flex h-[clamp(260px,54svh,520px)] items-center rounded-[2rem] bg-white p-8 shadow-[0_18px_55px_rgba(30,58,138,0.08)] md:p-12">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-extrabold text-secondary">خدمات تنظيف حسب الموقع</p>
            <h1 className="font-headline text-3xl font-extrabold leading-tight text-primary md:text-5xl">{pageTitle}</h1>
            <p className="mt-5 text-base font-medium leading-8 text-on-surface-variant md:text-lg">
              نوفر خدمات تنظيف عامة في حي {neighborhood.name} بمدينة {city.name} تشمل تنظيف المنازل والشقق، غسيل السجاد،
              تنظيف الواجهات، والعناية بالمساحات قبل المناسبات أو بعد الانتقال.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#book" className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-lg">
                احجز الآن
              </Link>
              <Link href="/contact" className="rounded-full bg-surface-container-low px-7 py-3 text-sm font-bold text-primary">
                تواصل معنا
              </Link>
            </div>
          </div>
        </header>

        <NeighborhoodLocalContextBlock city={city} neighborhood={neighborhood} />

        <NeighborhoodServicesHighlight city={city} neighborhood={neighborhood} />

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {serviceArticles
            .filter((service) => isServiceLocationPairAllowed(service.slug, city.slug, neighborhood.slug))
            .map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/${city.slug}/${neighborhood.slug}`}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <Icon name={service.icon} className="mb-4 text-3xl text-secondary" />
              <h2 className="font-headline text-xl font-extrabold text-primary">
                {service.shortTitle} في حي {neighborhood.name}، {city.name}
              </h2>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {service.excerpt}
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-primary/10 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-headline text-2xl font-extrabold text-primary">
            لماذا تختار {brandNameAr} في {neighborhood.name}؟
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {["فريق مدرب", "مواد آمنة", "مواعيد مرنة"].map((item) => (
              <div key={item} className="rounded-2xl bg-surface-container-low p-5">
                <Icon name="check_circle" className="mb-3 text-2xl text-secondary" />
                <h3 className="font-bold text-primary">{item}</h3>
                <p className="mt-2 text-sm leading-7 text-on-surface-variant">
                  تنفيذ منظم يناسب احتياج المنزل أو المنشأة داخل الحي.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-100 bg-white p-6 text-right shadow-sm md:p-10">
          <p className="mb-3 text-sm font-extrabold text-secondary">دليل خدمات التنظيف في المنطقة</p>
          <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
            شركة تنظيف في حي {neighborhood.name} بمدينة {city.name}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-9 text-on-surface-variant">
            <p>
              نحن نقدم أفضل خدمات التنظيف في {neighborhood.name} بأحدث المعدات ومواد تنظيف آمنة تناسب المنازل
              والشقق والفلل والمنشآت داخل مدينة {city.name}. يتم تجهيز فريق العمل حسب طبيعة المكان، سواء كان
              المطلوب تنظيفاً دورياً، تنظيفاً عميقاً، غسيل سجاد، أو عناية بالواجهات والمداخل.
            </p>
            <p>
              عند طلب خدمة تنظيف في حي {neighborhood.name} نراعي تفاصيل الموقع ومستوى الاستخدام اليومي للمساحة،
              ونحدد طريقة العمل المناسبة لكل غرفة أو سطح أو قطعة أثاث. هذا يجعل تجربة العميل أكثر دقة، ويساعد
              على تقديم نتيجة نظيفة ومنظمة تعكس جودة الخدمة في {city.name}.
            </p>
            <p>
              نحرص أن تجد في هذه الصفحة معلومات واضحة عن تنظيف حي {neighborhood.name} وخدمة قريبة من احتياجك الفعلي،
              مع إمكانية حجز موعد مرن وتنفيذ يعتمد على فريق مدرب يعرف متطلبات الأحياء السكنية والتجارية في {city.name}.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
