import Image from "next/image";
import Link from "next/link";

import { PartnersLogoGrid } from "@/components/PartnersLogoGrid";
import { PartnersTrustHeading } from "@/components/PartnersTrustHeading";
import { Icon } from "@/components/Icon";
import { images } from "@/lib/assets";
import { brandNameAr } from "@/lib/brand";
import {
  aboutCities,
  aboutEquipment,
  aboutHeroLead,
  aboutServiceLines,
  aboutStats,
  aboutStoryItems,
  aboutStoryQuote,
  aboutTeamRoles,
  aboutTeamSizes,
} from "@/lib/content/about-company";
import { aboutCorporatePartners, homePartners } from "@/lib/partners";
import { primaryCityNameAr } from "@/lib/region";
import { getServiceArticle } from "@/lib/service-articles";

const processSteps = [
  {
    step: "١",
    title: "وصف دقيق للمكان",
    body: "نوع العقار، المساحة، الحي، وصور إن وُجدت — يحدد الفريق والمعدات والتقدير.",
  },
  {
    step: "٢",
    title: "تأكيد الموعد",
    body: "اتصال قبل 30–60 دقيقة، تنسيق مع الحارس والمصعد في الأبراج.",
  },
  {
    step: "٣",
    title: "تنفيذ الخدمة",
    body: "مشرف يوزّع المهام، مع احترام الخصوصية والأسطح الحساسة.",
  },
  {
    step: "٤",
    title: "ملخص ونصائح",
    body: "شرح ما تم، مدة التهوية بعد الرش، أو وقت جفاف السجاد.",
  },
] as const;

function AboutSectionHead({
  eyebrow,
  title,
  description,
  align = "right",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "right" | "center";
}) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-right";

  return (
    <div className={`mb-12 max-w-3xl ${alignClass}`}>
      <p className="mb-4 inline-flex items-center gap-3 text-sm font-extrabold text-secondary">
        <span className="h-px w-10 bg-gradient-to-l from-secondary/70 to-secondary/20" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base font-medium leading-[1.9] text-on-surface-variant md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

export function SiteAbout() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-slate-100 bg-white pt-24 md:pt-28"
        aria-labelledby="about-hero-heading"
      >
        <div className="pointer-events-none absolute -start-20 top-20 h-72 w-72 rounded-full bg-primary/[0.03] blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -end-16 bottom-0 h-64 w-64 rounded-full bg-secondary/[0.04] blur-3xl" aria-hidden />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24 lg:px-8">
          <div className="order-2 text-right md:order-1">
            <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-extrabold text-primary shadow-[0_8px_24px_rgba(0,35,111,0.06)] sm:text-sm">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/8 text-primary">
                <Icon name="verified_user" className="text-lg" />
              </span>
              من نحن — {brandNameAr}
            </p>
            <h1
              id="about-hero-heading"
              className="font-headline text-[clamp(1.75rem,3.5vw+0.5rem,3.25rem)] font-extrabold leading-[1.12] tracking-tight text-primary"
            >
              شركة تنظيف ومكافحة حشرات في {primaryCityNameAr}
              <span className="mt-3 block text-[clamp(1.1rem,2vw+0.4rem,1.6rem)] font-bold leading-snug text-secondary">
                خبرة ميدانية منذ أكثر من عشر سنوات
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-[1.85] text-on-surface-variant md:text-lg">
              {aboutHeroLead}
            </p>
            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <Link
                href="/services"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,35,111,0.18)] transition hover:opacity-95 md:px-9 md:text-base"
              >
                خدماتنا
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/15 bg-white px-8 py-3 text-sm font-bold text-primary shadow-sm transition hover:border-primary/30 hover:shadow-md md:px-9 md:text-base"
              >
                احجز معاينة
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute -end-4 -top-4 h-full w-full rounded-3xl border border-primary/8 bg-white" aria-hidden />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_24px_60px_rgba(0,35,111,0.1)]">
                <Image
                  src={images.aboutHero}
                  alt={`فريق ${brandNameAr} أثناء تنظيف منزل في الرياض`}
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* إحصائيات */}
      <section className="border-b border-slate-100 bg-white px-6 py-16 md:py-20 lg:px-8" aria-label="إحصائيات الشركة">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {aboutStats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-4 py-7 text-center shadow-[0_12px_40px_rgba(0,35,111,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/15 hover:shadow-[0_20px_50px_rgba(0,35,111,0.08)] sm:px-6 sm:py-8"
            >
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-white text-primary shadow-sm transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white sm:h-14 sm:w-14">
                <Icon name={stat.icon} className="text-2xl sm:text-3xl" />
              </span>
              <p className="font-headline text-3xl font-extrabold leading-none tracking-tight text-primary tabular-nums sm:text-4xl md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-xs font-extrabold text-on-surface-variant sm:text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* قصة الشركة */}
      <section className="border-b border-slate-100 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AboutSectionHead
            eyebrow="تاريخنا"
            title="كيف بدأنا ولماذا نعمل بهذه الطريقة"
            description="من الرياض إلى تغطية وطنية — نفس المعيار: وضوح قبل الزيارة، تنفيذ منظّم، وملخص بعد الانتهاء."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {aboutStoryItems.map((item) => (
              <article
                key={item.step}
                className="group relative flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-7 text-right shadow-[0_12px_40px_rgba(0,35,111,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-[0_20px_50px_rgba(0,35,111,0.08)] md:p-8"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="font-headline text-3xl font-extrabold leading-none text-primary/10 tabular-nums">
                    {item.step}
                  </span>
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-white text-primary shadow-sm transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <Icon name={item.icon} className="text-2xl" />
                  </span>
                </div>
                <h3 className="mb-4 font-headline text-xl font-extrabold text-primary">{item.title}</h3>
                <p className="flex-1 text-sm font-medium leading-[1.95] text-on-surface-variant md:text-base">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <figure className="relative mt-10 overflow-hidden rounded-3xl border border-primary/10 bg-white px-8 py-8 text-right shadow-[0_16px_45px_rgba(0,35,111,0.06)] md:px-12 md:py-10">
            <div className="pointer-events-none absolute -start-1 top-0 h-full w-1.5 bg-gradient-to-b from-secondary/70 via-primary/40 to-primary/15" aria-hidden />
            <div className="pointer-events-none absolute -end-8 -top-8 h-32 w-32 rounded-full bg-primary/[0.03] blur-2xl" aria-hidden />
            <Icon name="format_quote" className="mb-4 text-4xl text-secondary/50" />
            <blockquote>
              <p className="font-headline text-lg font-extrabold leading-[1.85] text-primary md:text-xl">
                «{aboutStoryQuote}»
              </p>
            </blockquote>
          </figure>
        </div>
      </section>

      {/* المدن */}
      <section className="border-b border-slate-100 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AboutSectionHead
            eyebrow="التغطية"
            title="المدن التي نعمل بها"
            description={`مقرنا في ${primaryCityNameAr}، وننفّذ أغلب المشاريع في أحياء العاصمة. خارج الرياض ننسّق الزيارات في ${aboutCities.length} مدينة — مع تفاصيل محلية لكل حي على صفحات الموقع.`}
          />
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {aboutCities.map((city) => {
              const isPrimary = city === primaryCityNameAr;
              return (
                <li
                  key={city}
                  className={`rounded-2xl border bg-white px-4 py-3.5 text-center text-sm font-bold shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                    isPrimary
                      ? "border-primary/25 text-primary shadow-[0_10px_28px_rgba(0,35,111,0.08)] ring-1 ring-primary/10"
                      : "border-slate-100 text-primary hover:border-primary/15"
                  }`}
                >
                  {isPrimary ? (
                    <span className="inline-flex items-center justify-center gap-1.5">
                      <Icon name="location_on" className="text-base text-secondary" />
                      {city}
                    </span>
                  ) : (
                    city
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-10 text-right">
            <Link
              href="/areas"
              className="inline-flex items-center gap-2 text-sm font-bold text-secondary underline-offset-4 transition hover:underline"
            >
              استكشف الأحياء والتغطية التفصيلية
              <Icon name="arrow_back" className="text-base" />
            </Link>
          </p>
        </div>
      </section>

      {/* الخدمات */}
      <section className="border-b border-slate-100 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AboutSectionHead eyebrow="خدماتنا" title="أنواع الخدمات التي ننفّذها" description={serviceLinesIntro()} />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {aboutServiceLines.map((service, index) => {
              const article = getServiceArticle(service.slug);
              const icon = article?.icon ?? "cleaning_services";
              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 text-right shadow-[0_10px_32px_rgba(0,35,111,0.04)] transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_18px_45px_rgba(0,35,111,0.08)]"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span className="font-headline text-4xl font-extrabold leading-none text-primary/10 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-white text-primary shadow-sm transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                        <Icon name={icon} className="text-2xl" />
                      </span>
                    </div>
                    <h3 className="font-headline text-lg font-extrabold text-primary">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm font-medium leading-7 text-on-surface-variant">{service.detail}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-secondary transition group-hover:gap-2">
                      تفاصيل الخدمة
                      <Icon name="arrow_back" className="text-base" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* المعدات */}
      <section className="border-b border-slate-100 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AboutSectionHead
            eyebrow="المعدات"
            title="المعدات والتقنيات"
            description="نختار الأداة حسب الخدمة — غسيل سجاد يحتاج استخراجاً عميقاً، واجهات تحتاج ضغطاً وسلماً، خزانات تحتاج مضخات تعقيم، ومكافحة حشرات تحتاج معاينة قبل أي رش."
          />
          <ul className="grid gap-5 md:grid-cols-2">
            {aboutEquipment.map((item) => (
              <li
                key={item.name}
                className="group rounded-2xl border border-slate-100 bg-white p-6 text-right shadow-sm transition duration-300 hover:border-primary/15 hover:shadow-[0_14px_36px_rgba(0,35,111,0.06)]"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="min-w-0 flex-1 text-right">
                    <h3 className="font-headline text-lg font-extrabold text-primary">{item.name}</h3>
                  </div>
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-white text-primary shadow-sm transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <Icon name={item.icon} className="text-2xl" />
                  </span>
                </div>
                <p className="text-sm font-medium leading-8 text-on-surface-variant">{item.use}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* الفريق */}
      <section className="border-b border-slate-100 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12">
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 text-right shadow-[0_20px_55px_rgba(0,35,111,0.06)] md:p-10">
              <p className="mb-3 text-sm font-extrabold text-secondary">فريق العمل</p>
              <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">عمالة مدربة — ليس عمالة مؤقتة</h2>
              <p className="mt-4 text-sm font-medium leading-8 text-on-surface-variant md:text-base">
                كل زيارة تمرّ بتوجيه: نوع الأسطح، حساسية الروائح، وجود أطفال أو كبار سن، وقواعد الدخول في
                العمائر. التدريب مستمر على البخار والشفط والمواد الآمنة للرخام والسجاد السعودي.
              </p>
              <p className="mt-5">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 text-sm font-bold text-secondary underline-offset-4 transition hover:underline"
                >
                  تعرّف على أعضاء الفريق بالأسماء
                  <Icon name="arrow_back" className="text-base" />
                </Link>
              </p>
              <ul className="mt-8 space-y-3">
                {aboutTeamSizes.map((row) => (
                  <li
                    key={row.place}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm font-semibold shadow-sm"
                  >
                    <span className="text-on-surface-variant">{row.place}</span>
                    <span className="text-primary">{row.size}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-medium text-on-surface-variant">
                يمكن طلب{" "}
                <Link
                  href="/features/trained-cleaning-team"
                  className="font-bold text-secondary underline-offset-2 hover:underline"
                >
                  فريق نسائي فقط
                </Link>{" "}
                عند التوفر — أخبرنا عند الحجز.
              </p>
            </div>
            <ul className="space-y-4">
              {aboutTeamRoles.map((role) => (
                <li
                  key={role.title}
                  className="group rounded-2xl border border-slate-100 bg-white p-5 text-right shadow-sm transition duration-300 hover:border-primary/15 hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="min-w-0 flex-1 text-right font-headline text-lg font-extrabold text-primary">
                      {role.title}
                    </h3>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-white text-primary shadow-sm transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      <Icon name={role.icon} className="text-xl" />
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-8 text-on-surface-variant">{role.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* شركاؤنا */}
      <section className="border-b border-slate-100 bg-white py-20 md:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <PartnersTrustHeading
            title="شركاؤنا والجهات التي وثقت بنا"
            subtitle="جهات حكومية وتجارية ومجتمعية نسعى لخدمتها بمعايير جودة ثابتة وتواصل شفاف."
          />
          <PartnersLogoGrid partners={[...aboutCorporatePartners, ...homePartners]} />
        </div>
      </section>

      {/* آلية العمل */}
      <section className="border-b border-slate-100 bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AboutSectionHead
            align="center"
            eyebrow="مسار العمل"
            title="من الطلب إلى التنفيذ"
            description="مسار نلتزم به في كل مشروع: وضوح قبل الزيارة، تنفيذ منظّم، وملخص بعد الانتهاء."
          />
          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div
              className="pointer-events-none absolute inset-x-0 top-14 hidden h-px bg-gradient-to-l from-transparent via-primary/10 to-transparent lg:block"
              aria-hidden
            />
            {processSteps.map((item) => (
              <li
                key={item.step}
                className="relative rounded-2xl border border-slate-100 bg-white p-6 text-right shadow-[0_10px_32px_rgba(0,35,111,0.04)] transition duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-[0_16px_40px_rgba(0,35,111,0.07)]"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/15 bg-white text-sm font-extrabold text-primary shadow-sm">
                  {item.step}
                </span>
                <h3 className="font-headline text-lg font-bold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-on-surface-variant">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 pb-24 md:px-8 md:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-100 bg-white px-8 py-12 shadow-[0_24px_60px_rgba(0,35,111,0.08)] md:px-12 md:py-14">
          <div className="pointer-events-none absolute -end-12 -top-12 h-40 w-40 rounded-full bg-primary/[0.03] blur-2xl" aria-hidden />
          <div className="relative flex flex-col items-stretch justify-between gap-8 md:flex-row md:items-center">
            <div className="text-center md:text-right">
              <p className="mb-2 text-sm font-extrabold text-secondary">ابدأ الآن</p>
              <h2 className="mb-2 font-headline text-2xl font-extrabold text-primary md:text-3xl">
                جاهزون لمشروع تنظيف أو مكافحة في حيك؟
              </h2>
              <p className="text-base font-medium text-on-surface-variant">
                اذكر الحي ونوع الخدمة — نرد بتقدير واضح وموعد يناسب جدولك.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-[0_10px_28px_rgba(0,35,111,0.18)] transition hover:opacity-95"
              >
                اتصل بنا
              </Link>
              <Link
                href="/#book"
                className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-8 py-3.5 text-base font-bold text-primary shadow-sm transition hover:border-primary/30 hover:shadow-md"
              >
                احجز الآن
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function serviceLinesIntro() {
  return `ننفّذ ${aboutServiceLines.length} خط خدمة رئيسياً — من تنظيف الشقق والفلل في الرياض إلى غسيل السجاد، تنظيف الواجهات، تعقيم الخزانات، تنظيف الحدائق، وتنظيف ما بعد التشطيب. يمكن دمج مكافحة الحشرات مع التنظيف العميق في زيارة واحدة عند الحاجة.`;
}
