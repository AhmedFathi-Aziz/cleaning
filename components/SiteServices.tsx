import Image from "next/image";
import Link from "next/link";

import { ResponsiveImage } from "@/components/ResponsiveImage";
import { images } from "@/lib/assets";
import { brandLogoLargePath } from "@/lib/brand";
import { Icon } from "@/components/Icon";
import {
  buildServiceHeroImageAlt,
  buildServiceHeroImageTitle,
  marketingLayoutImageAlt,
} from "@/lib/image-seo";
import type { ServiceArticle } from "@/lib/service-articles-types";
import { serviceArticles } from "@/lib/service-articles";

/** صفحات هبوط رئيسية تظهر كبطاقات مميزة في /services */
const LANDING_SERVICE_SLUGS = [
  "cleaning-company-riyadh",
  "house-cleaning",
  "apartment-cleaning-riyadh",
  "villa-cleaning-riyadh",
  "majlis-cleaning-riyadh",
  "sofa-cleaning-riyadh",
  "carpet-cleaning-riyadh",
  "post-construction-cleaning-riyadh",
  "pest-control-riyadh",
  "cockroach-control-riyadh",
  "termite-control-riyadh",
  "ant-control-riyadh",
  "bed-bug-control-riyadh",
  "rat-control-riyadh",
  "pigeon-control-riyadh",
  "water-tank-cleaning",
  "facade-cleaning",
] as const;

const isLandingSlug = (slug: string): slug is (typeof LANDING_SERVICE_SLUGS)[number] =>
  (LANDING_SERVICE_SLUGS as readonly string[]).includes(slug);

const landingServices = LANDING_SERVICE_SLUGS.flatMap((slug) => {
  const article = serviceArticles.find((s) => s.slug === slug);
  return article ? [article] : [];
});

const otherServices = serviceArticles.filter((s) => !isLandingSlug(s.slug));

function ServicePageCard({ service }: { service: ServiceArticle }) {
  const featured = isLandingSlug(service.slug);

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white text-right shadow-[0_12px_40px_rgba(30,58,138,0.06)] transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_48px_rgba(30,58,138,0.12)]"
    >
      <div
        className={`relative aspect-square w-full shrink-0 ${
          service.heroImageFit === "contain" ? "bg-white" : "bg-primary-container/10"
        }`}
      >
        <Image
          src={service.image}
          alt={buildServiceHeroImageAlt(service)}
          title={buildServiceHeroImageTitle(service)}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={
            service.heroImageFit === "contain"
              ? "object-contain object-center p-2 transition-transform duration-500 group-hover:scale-[1.02]"
              : "object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          }
        />
        {service.heroImageFit !== "contain" ? (
          <div
            className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent"
            aria-hidden
          />
        ) : null}
        {featured ? (
          <span className="absolute start-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white shadow-sm">
            الأكثر طلباً
          </span>
        ) : null}
        <span className="absolute bottom-3 end-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-primary shadow-md backdrop-blur-sm">
          <Icon name={service.icon} className="text-2xl" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-headline text-lg font-extrabold leading-snug text-primary group-hover:text-secondary md:text-xl">
          {service.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-7 text-on-surface-variant">{service.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-secondary">
          التفاصيل والحجز
          <Icon name="arrow_back" className="text-base transition-transform group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function SiteServices() {
  return (
    <main className="pb-24 pt-32">
      <section className="mx-auto mb-24 max-w-7xl px-8 text-right">
        <div className="max-w-3xl">
          <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-secondary">
            خدماتنا المتميزة
          </span>
          <h1 className="mb-8 font-headline text-4xl font-extrabold leading-[1.1] tracking-tight text-primary md:text-6xl">
            خدمات تنظيف <span className="text-on-tertiary-container">بالرياض</span>
          </h1>
          <p className="text-lg font-medium leading-relaxed text-on-surface-variant">
            خدمات تنظيف بالرياض تشمل تنظيف المنازل والفلل، التنظيف العميق، غسيل السجاد والكنب، تنظيف
            الواجهات، تعقيم الخزانات، ومكافحة الحشرات — مع تخطيط مسبق يقلّل الإزعاج ويحترم طبيعة كل
            مساحة. اختر خدمتك أدناه أو{" "}
            <Link href="/contact" className="font-bold text-secondary underline-offset-2 hover:underline">
              احجز عبر واتساب
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="group relative overflow-hidden rounded-full bg-surface-container-lowest shadow-[0_12px_40px_rgba(30,58,138,0.06)] transition-all duration-500 hover:-translate-y-1 md:col-span-8">
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col justify-center p-12 text-right">
                <Icon name="villa" className="mb-6 text-4xl text-primary" />
                <h2 className="mb-4 text-3xl font-bold text-primary">تنظيف الفلل والقصور</h2>
                <p className="mb-8 leading-relaxed text-on-surface-variant">
                  خدمة شاملة تغطي تفاصيل المسكن، من العناية بالرخام إلى الواجهات الزجاجية، بهدف مظهر أنظف وصيانة
                  أسهل على المدى القصير.
                </p>
                <Link
                  href="/services/villa-cleaning-riyadh"
                  className="group/link flex cursor-pointer items-center gap-2 font-bold text-secondary"
                >
                  <span>تفاصيل تنظيف الفلل والقصور في الرياض</span>
                  <Icon name="arrow_back" className="text-sm transition-transform group-hover/link:-translate-x-2" />
                </Link>
              </div>
              <div className="relative h-64 overflow-hidden md:h-full">
                <ResponsiveImage
                  src={images.servicesVilla}
                  alt={marketingLayoutImageAlt.villa}
                  title={marketingLayoutImageAlt.villa}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          <div className="group flex flex-col rounded-full bg-surface-container-low p-8 text-right shadow-none transition-all duration-500 hover:bg-surface-container-lowest hover:shadow-[0_12px_40px_rgba(30,58,138,0.06)] md:col-span-4">
            <div className="mb-6 h-48 overflow-hidden rounded-full">
              <ResponsiveImage
                src={images.servicesMajlis}
                alt={marketingLayoutImageAlt.majlis}
                title={marketingLayoutImageAlt.majlis}
                width={800}
                height={400}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
            <Icon name="chair" className="mb-4 text-3xl text-secondary" />
            <h2 className="mb-3 text-2xl font-bold text-primary">تنظيف المجالس</h2>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
              عناية فائقة بالأقمشة والمنسوجات باستخدام تقنيات البخار الجاف التي تحافظ على الألوان وتزيل أصعب
              البقع من جذورها.
            </p>
          </div>

          <div className="group relative h-[400px] overflow-hidden rounded-full bg-white shadow-[0_12px_40px_rgba(30,58,138,0.06)] md:col-span-6">
            <Image
              src={brandLogoLargePath}
              alt={marketingLayoutImageAlt.pest}
              title={marketingLayoutImageAlt.pest}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-12 opacity-90"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 to-transparent p-12 text-right">
              <Icon name="pest_control" className="mb-4 text-4xl text-white" />
              <h2 className="mb-2 text-2xl font-bold text-white">مكافحة الحشرات</h2>
                <p className="max-w-sm text-sm leading-relaxed text-on-primary-container">
                خطط وقائية وعلاجية بمواد مناسبة للاستخدام داخل المنزل أو المنشأة، مع متابعة ونصائح لتقليل عودة
                الآفات قدر الإمكان.
              </p>
            </div>
          </div>

          <Link
            href="/services/water-tank-cleaning"
            className="group flex flex-col justify-center rounded-full bg-tertiary-container p-12 text-right text-on-tertiary transition-all duration-500 hover:scale-[1.02] md:col-span-6"
          >
            <div className="flex items-start justify-between">
              <div className="max-w-md">
                <Icon name="water_drop" className="mb-6 text-5xl text-tertiary-fixed" />
                <h2 className="mb-4 text-3xl font-bold">تنظيف خزانات بالرياض</h2>
                <p className="mb-8 font-medium leading-relaxed text-on-tertiary-container">
                  غسيل وتعقيم خزانات علوية وأرضية — إزالة ترسبات وطحالب وفق معايير السلامة، مع معاينة مجانية
                  قبل الحجز.
                </p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center justify-end gap-3">
                    <span className="text-sm">إزالة الترسبات والطحالب</span>
                    <Icon name="check_circle" className="text-tertiary-fixed" />
                  </li>
                  <li className="flex items-center justify-end gap-3">
                    <span className="text-sm">تعقيم آمن بمواد معتمدة</span>
                    <Icon name="check_circle" className="text-tertiary-fixed" />
                  </li>
                  <li className="flex items-center justify-end gap-3">
                    <span className="text-sm">خزانات فلل وشقق وعمارات</span>
                    <Icon name="check_circle" className="text-tertiary-fixed" />
                  </li>
                </ul>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-on-tertiary">
                  تفاصيل تنظيف خزانات بالرياض
                  <Icon name="arrow_back" className="text-base transition-transform group-hover:-translate-x-2" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {landingServices.length > 0 ? (
        <section className="mx-auto mt-24 max-w-7xl px-8" aria-labelledby="landing-services-heading">
          <div className="mb-10 max-w-3xl text-right">
            <p className="text-sm font-extrabold text-secondary">خدمات رئيسية في الرياض</p>
            <h2
              id="landing-services-heading"
              className="font-headline mt-2 text-3xl font-extrabold text-primary md:text-4xl"
            >
              صفحات خدماتنا الأكثر طلباً
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-on-surface-variant md:text-base">
              شركة تنظيف، تنظيف منازل، تنظيف فلل، وتنظيف خزانات — دلائل تفصيلية للحجز والمقارنة في الرياض.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landingServices.map((service) => (
              <li key={service.slug} className="min-h-0">
                <ServicePageCard service={service} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto mt-16 max-w-7xl px-8 pb-8" aria-labelledby="all-services-heading">
        <h2 id="all-services-heading" className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
          صفحات خدماتنا بالتفصيل
        </h2>
        <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-on-surface-variant md:text-base">
          اختر الخدمة المناسبة لمساحتك — كل بطاقة تفتح صفحة تفصيلية بالخطوات والأسئلة الشائعة.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 text-right shadow-sm transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <Icon name={service.icon} className="text-2xl" />
                </span>
                <h3 className="font-headline text-xl font-extrabold text-primary group-hover:text-secondary">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-on-surface-variant">{service.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary">
                  التفاصيل
                  <Icon name="arrow_back" className="text-base transition-transform group-hover:-translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-8 text-right" aria-labelledby="services-guide-heading">
        <h2 id="services-guide-heading" className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
          دمج الخدمات: متى يكون مفيداً؟
        </h2>
        <div className="mt-6 space-y-4 text-sm font-medium leading-[1.9] text-on-surface-variant md:max-w-4xl md:text-base">
          <p>
            كثير من المنازل والمكاتب يحتاج إلى أكثر من مهمة في نفس الفترة: مثلاً تنظيف عميق بعد فترة ازدحام، مع
            غسيل سجاد في غرف محددة، أو مكافحة حشرات بعد ملاحظة نشاط في المطبخ أو المخزن. الجمع بين الخدمات في
            خطة واحدة يقلّل تكرار دخول الفرق ويحافظ على ترتيب المنزل.
          </p>
          <p>
            للمنشآت التجارية، قد يُدمج تنظيف الواجهات مع تنظيف دوري للمداخل؛ للفلل، قد يُراعى تنظيف المجالس
            والسجاد قبل مناسبة. اطلب استشارة عبر{" "}
            <Link href="/contact" className="font-bold text-secondary underline-offset-2 hover:underline">
              صفحة التواصل
            </Link>{" "}
            لترتيب أولوياتك والوقت التقريبي.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "توفير الوقت بتقليل أيام الزيارة المنفصلة.",
            "تنسيق المواد والمعدات حسب ترتيب المهام.",
            "ملخص واحد بعد الانتهاء يوضح ما تم في كل جزء من المنزل أو المكتب.",
          ].map((text) => (
            <li
              key={text}
              className="rounded-2xl border border-slate-200/90 bg-surface-container-lowest/80 p-5 text-sm font-semibold leading-7 text-on-surface-variant dark:border-slate-800 dark:bg-slate-900/40"
            >
              {text}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-8">
        <div className="relative overflow-hidden rounded-full bg-surface-container-high p-16 text-center md:p-24">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl">جاهز لتحويل منزلك؟</h2>
            <p className="mb-10 font-medium leading-relaxed text-on-surface-variant">
              احجز موعداً أو تواصل معنا لتحديد نوع الخدمة والمدة التقريبية — نسعى إلى تجربة واضحة من البداية
              للنهاية.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#book"
                className="rounded-full bg-primary px-10 py-4 font-bold text-white shadow-lg transition-all hover:shadow-xl"
              >
                احجز الآن
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-surface-container-lowest px-10 py-4 font-bold text-primary transition-all hover:bg-white"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
          <div
            className="absolute end-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-secondary/5 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 start-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />
        </div>
      </section>
    </main>
  );
}
