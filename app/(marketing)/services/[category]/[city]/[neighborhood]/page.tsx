import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Icon } from "@/components/Icon";
import { ServiceLocationJsonLd } from "@/components/SeoJsonLd";
import { brandNameAr } from "@/lib/brand";
import { buildArabicPageMetadata } from "@/lib/seo";
import { getServiceArticle, serviceArticles } from "@/lib/service-articles";
import { getCityBySlug, getNeighborhoodBySlug, locations } from "@/src/data/locations";

type PageProps = {
  params: Promise<{
    category: string;
    city: string;
    neighborhood: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceArticles.flatMap((service) =>
    locations.flatMap((city) =>
      city.neighborhoods.map((neighborhood) => ({
        category: service.slug,
        city: city.slug,
        neighborhood: neighborhood.slug,
      })),
    ),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, city: citySlug, neighborhood: neighborhoodSlug } = await params;
  const service = getServiceArticle(category);
  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, neighborhoodSlug);

  if (!service || !city || !neighborhood) return { title: "غير موجود" };

  const title = `أفضل شركة ${service.shortTitle} في حي ${neighborhood.name} ${city.name} | اطلب الآن`;
  const description = `خدمة ${service.shortTitle} في حي ${neighborhood.name} بمدينة ${city.name} من ${brandNameAr}. ${service.excerpt}`;
  const canonical = `/services/${service.slug}/${city.slug}/${neighborhood.slug}`;

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
    imageAlt: title,
    type: "article",
  });
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { category, city: citySlug, neighborhood: neighborhoodSlug } = await params;
  const service = getServiceArticle(category);
  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, neighborhoodSlug);

  if (!service || !city || !neighborhood) notFound();

  const pageTitle = `أفضل شركة ${service.shortTitle} في حي ${neighborhood.name} ${city.name}`;

  return (
    <main className="bg-slate-50 px-6 pb-24 pt-28 md:px-8">
      <ServiceLocationJsonLd service={service} city={city} neighborhood={neighborhood} />

      <article className="mx-auto max-w-6xl text-right">
        <Link
          href={`/${city.slug}/${neighborhood.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline"
        >
          <Icon name="arrow_forward" className="text-lg" />
          خدمات التنظيف في {neighborhood.name}
        </Link>

        <header className="mt-6 flex h-[clamp(260px,54svh,520px)] items-center rounded-[2rem] bg-white p-8 shadow-[0_18px_55px_rgba(30,58,138,0.08)] md:p-12">
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
              <Icon name={service.icon} className="text-2xl" />
            </span>
            <p className="mb-3 text-sm font-extrabold text-secondary">
              {service.shortTitle} حسب الموقع
            </p>
            <h1 className="font-headline text-3xl font-extrabold leading-tight text-primary md:text-5xl">{pageTitle}</h1>
            <p className="mt-5 text-base font-medium leading-8 text-on-surface-variant md:text-lg">
              {service.excerpt} نوفر هذه الخدمة داخل حي {neighborhood.name} بمدينة {city.name} مع تنسيق موعد يناسبك
              وتنفيذ يعتمد على حالة المكان ونوع الأسطح.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#book" className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-lg">
                احجز الخدمة
              </Link>
              <Link href="/contact" className="rounded-full bg-surface-container-low px-7 py-3 text-sm font-bold text-primary">
                اطلب عرض سعر
              </Link>
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
          </aside>

          <div className="space-y-6">
            {service.sections.map((section, index) => (
              <section key={section.heading} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/10 text-sm font-extrabold text-secondary">
                  {index + 1}
                </div>
                <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
                  {section.heading.replace("الخدمة", `الخدمة في ${neighborhood.name}`)}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-9 text-on-surface-variant">
                      {paragraph}
                    </p>
                  ))}
                  <p className="text-base leading-9 text-on-surface-variant">
                    عند طلب {service.shortTitle} في حي {neighborhood.name} يتم تنسيق التفاصيل حسب موقعك داخل {city.name}
                    ومساحة المكان ومستوى الاتساخ المطلوب معالجته.
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>

        <section className="mt-8 rounded-[2rem] border border-slate-100 bg-white p-6 text-right shadow-sm md:p-10">
          <p className="mb-3 text-sm font-extrabold text-secondary">تفاصيل الخدمة في موقعك</p>
          <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
            {service.shortTitle} في حي {neighborhood.name} بمدينة {city.name}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-9 text-on-surface-variant">
            <p>
              نحن نقدم أفضل خدمات {service.shortTitle} في {neighborhood.name} بأحدث المعدات ومواد تنظيف مناسبة
              لطبيعة المنازل والمنشآت في مدينة {city.name}. يتم تنفيذ الخدمة بعد فهم حالة المكان، نوع الأسطح،
              حجم المساحة، والمناطق التي تحتاج إلى عناية خاصة لضمان نتيجة عملية وواضحة.
            </p>
            <p>
              اختيار خدمة {service.shortTitle} في حي {neighborhood.name} يساعدك على الحصول على فريق يعرف احتياجات
              المنطقة ويستطيع التعامل مع تفاصيل التنظيف اليومية أو العميقة حسب الطلب. كما نحرص على تنظيم خطوات
              العمل من المعاينة وحتى اللمسات النهائية بطريقة تحافظ على راحة العميل وجودة المكان.
            </p>
            <p>
              إذا كنت تبحث عن شركة تقدم {service.shortTitle} في {city.name} مع محتوى وخدمة مخصصين لحي
              {neighborhood.name}، فهذا المسار مصمم ليعرض لك معلومات دقيقة عن الخدمة في موقعك، مع إمكانية الحجز
              والتواصل لتحديد الموعد الأنسب.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
