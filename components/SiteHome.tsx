import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { StatsStrip } from "@/components/home/StatsStrip";
import { images } from "@/lib/assets";
import { brandEmail, brandLogoPath, brandNameAr, brandPhone, brandPhoneDisplay, brandWhatsapp } from "@/lib/brand";
import {
  buildServiceHeroImageAlt,
  buildServiceHeroImageTitle,
  featureCardImageAlt,
  homeHeroImageAlt,
} from "@/lib/image-seo";
import { featureArticles } from "@/lib/feature-articles";
import { getServiceArticle } from "@/lib/service-articles";

const testimonials = [
  {
    name: "سارة الأحمد",
    text: "طلبت تنظيفاً شاملاً للمنزل بعد التشطيب، وكان أثر الخدمة واضحاً. الفريق وافى في الموعد، وعمل بهدوء واهتمام بالتفاصيل.",
  },
  {
    name: "محمد العتيبي",
    text: "كنت بحاجة إلى مكافحة حشرات للفيلا؛ كانت المشكلة مزعجة، وتحسّن الوضع بعد الزيارة. التعامل محترم، وشرحوا لي الخطوات قبل البدء.",
  },
  {
    name: "فيصل الشهري",
    text: "جربت خدمة تنظيف الواجهات والزجاج، والنتيجة أنظف مما توقّعت. أقدّر وضوح السعر والالتزام بالوقت دون مماطلة.",
  },
];

const contactPhone = brandPhoneDisplay;
const contactPhoneHref = brandPhone;
const whatsappHref = brandWhatsapp;
const deepHomeCleaning = getServiceArticle("deep-home-cleaning");
const carpetCleaning = getServiceArticle("carpet-cleaning");
const facadeCleaning = getServiceArticle("facade-cleaning");

/** روابط ثانوية فوق الخلفية الداكنة — نص وأيقونات بنفس لون متباين */
const heroGhostLinkClass =
  "group inline-flex min-h-0 items-center justify-center gap-2 py-1 text-sm font-bold text-white transition-colors hover:text-white sm:py-0 sm:text-sm md:text-base [text-shadow:0_1px_4px_rgba(0,0,0,0.55),0_0_1px_rgba(0,0,0,0.85)]";

const heroGhostIconClass =
  "shrink-0 text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.55))]";

const heroGhostArrowClass =
  "shrink-0 text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.55))] transition-transform group-hover:-translate-x-1";

/**
 * روابط قسم المقدمة — مظهر رسمي: لون أساسي وحدّ سفلي واضح، وتمييز باللون الثانوي عند التمرير/التركيز.
 * بدون underline الافتراضي حتى لا تختلط بالنص الرمادي.
 */
const homeIntroLinkClass =
  "relative inline font-bold text-primary no-underline decoration-transparent [text-decoration-skip-ink:none] border-0 border-b-2 border-primary/40 pb-px transition-colors duration-200 hover:border-secondary hover:text-secondary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 dark:border-sky-400/50 dark:text-sky-200 dark:hover:border-sky-300 dark:hover:text-sky-50 dark:focus-visible:ring-sky-400/60 dark:focus-visible:ring-offset-slate-900";

export function SiteHome() {
  return (
    <main id="main-content">
      <section
        className="relative flex min-h-0 items-start overflow-hidden px-4 pb-6 pt-20 sm:min-h-[clamp(28rem,85svh,45rem)] sm:items-center sm:px-6 sm:pb-12 sm:pt-28 md:min-h-[720px] md:px-8 md:pb-16 md:pt-32"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 z-0 min-h-[inherit] overflow-hidden" aria-hidden>
          <ResponsiveImage
            src={images.hero}
            alt={homeHeroImageAlt}
            title={homeHeroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[18%_center] brightness-[0.98] contrast-[1.02] saturate-[0.95]"
          />
          {/* تدرجات بلون الموقع (كحلي/تركواز) لتناسق النص الأبيض والبطاقة */}
          <div className="absolute inset-0 bg-[#00236f]/20" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0f172a]/55 via-[#00236f]/18 to-transparent" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/30 via-transparent to-[#1a383f]/35 md:bg-[radial-gradient(ellipse_120%_100%_at_88%_42%,rgba(15,23,42,0.72),rgba(0,35,111,0.22)_45%,transparent_68%)]"
            aria-hidden
          />
        </div>
        <div className="relative z-10 mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
          <div className="relative min-w-0 md:pe-4">
            <div
              className="pointer-events-none absolute -inset-x-2 -inset-y-1 z-0 rounded-[1.5rem] bg-gradient-to-bl from-slate-950/70 via-slate-950/48 to-slate-950/20 ring-1 ring-white/12 backdrop-blur-[2px] sm:-inset-x-3 sm:-inset-y-4 sm:rounded-[2rem] md:from-slate-950/55 md:via-slate-950/32 md:to-transparent md:ring-white/10"
              aria-hidden
            />
            <div className="relative z-[1] space-y-3 sm:space-y-5 md:space-y-6">
            <p className="flex w-full max-w-full flex-wrap items-center gap-2 rounded-xl border border-white/22 bg-gradient-to-l from-slate-900/82 via-slate-800/72 to-slate-800/58 px-3 py-2 text-xs font-extrabold text-white shadow-[0_14px_36px_rgba(0,0,0,0.2)] backdrop-blur-md sm:inline-flex sm:w-auto sm:max-w-none sm:gap-3 sm:px-4 sm:py-3 sm:text-xs md:text-sm">
              <span className="hidden h-10 w-1 shrink-0 rounded-full bg-white/55 sm:block" aria-hidden="true" />
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/12 text-white sm:h-9 sm:w-9">
                <Icon name="verified_user" className="text-lg sm:text-xl" />
              </span>
              <span>تنظيف منازل ومكاتب ومكافحة حشرات — تغطية شاملة في أحياء الرياض</span>
            </p>
            <h1
              id="hero-heading"
              className="font-headline text-[clamp(1.35rem,3vw+0.4rem,2.35rem)] font-extrabold leading-[1.18] tracking-tight text-white sm:text-3xl md:text-4xl md:leading-[1.15] md:text-balance [text-shadow:0_2px_12px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.85)]"
            >
              شركة تنظيف ومكافحة حشرات بالرياض
              <br />
              <span className="text-[#dce8f2] [text-shadow:0_2px_10px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.75)]">تنظيف منازل، سجاد، واجهات — فريق مدرب</span>
            </h1>
            <p className="max-w-lg text-sm font-semibold leading-[1.6] text-white sm:text-base md:max-w-xl md:text-lg md:leading-[1.65] [text-shadow:0_1px_4px_rgba(0,0,0,0.55),0_0_1px_rgba(0,0,0,0.9)]">
              شركة تنظيف بالرياض تنفّذ تنظيفاً عميقاً للمنازل والمكاتب، وغسيل سجاد وموكيت، وتنظيف واجهات،
              ومكافحة حشرات وفق خطة واضحة — مع تغطية لأحياء العاصمة ومعاينة مجانية قبل الحجز.
            </p>
            <div className="flex flex-col gap-2.5 pt-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:pt-4" id="book">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 bg-[#147A6E] px-7 py-2.5 text-center text-sm font-bold text-white shadow-[0_8px_28px_rgba(20,122,110,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] transition-[transform,background-color] hover:scale-[1.03] hover:bg-[#106658] active:scale-[0.98] active:bg-[#0d554c] sm:min-h-0 sm:px-9 sm:py-3.5 sm:text-sm md:px-10 md:text-base"
              >
                احجز الآن
              </Link>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:contents">
              <Link href="/services" className={heroGhostLinkClass}>
                <span>اكتشف خدماتنا</span>
                <Icon name="arrow_back" className={heroGhostArrowClass} />
              </Link>
              <Link href="/areas" className={heroGhostLinkClass}>
                <Icon name="location_on" className={`text-[1.15rem] ${heroGhostIconClass}`} />
                <span>مناطق الخدمة</span>
                <Icon name="arrow_back" className={heroGhostArrowClass} />
              </Link>
              </div>
            </div>
            </div>
          </div>
          <div className="flex min-w-0 items-center justify-center md:justify-end">
            <div className="w-full max-w-sm rounded-3xl border border-white/22 bg-gradient-to-br from-slate-900/88 via-[#152f4d]/85 to-[#1c4558]/80 p-5 text-right text-white shadow-[0_20px_56px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="rounded-full bg-white/12 px-3.5 py-1.5 text-xs font-extrabold text-white/95 sm:px-4 sm:py-2 sm:text-sm">تواصل سريع</span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg">
                  <Icon name="support_agent" className="text-2xl" />
                </span>
              </div>

              <h2 className="font-headline text-xl font-extrabold text-white/95 sm:text-2xl">احجز خدمتك الآن</h2>
              <p className="mt-2.5 text-sm font-semibold leading-7 text-white/85 sm:text-base sm:leading-7">
                فريق التنسيق جاهز لاستقبال طلبات التنظيف ومكافحة الحشرات وتحديد موعد يناسبك.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="تواصل معنا عبر واتساب في تبويب جديد"
                  className="hero-whatsapp-cta flex items-center justify-between rounded-2xl bg-white px-5 py-3.5 text-sm font-extrabold shadow-[0_12px_28px_rgba(15,23,42,0.14)] transition-transform hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  <span className="text-slate-900">تواصل عبر واتساب</span>
                  <Icon name="chat" className="text-slate-800" />
                </a>
                <a
                  href={`tel:${contactPhoneHref}`}
                  aria-label={`اتصل بنا على ${contactPhone}`}
                  className="flex items-center justify-between rounded-2xl border border-white/18 bg-white/10 px-5 py-3.5 text-sm font-bold text-white/92 transition-colors hover:bg-white/14"
                >
                  <span dir="ltr">{contactPhone}</span>
                  <Icon name="phone_in_talk" className="text-[#9ec9dc]" />
                </a>
                <a
                  href={`mailto:${brandEmail}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/18 bg-white/10 px-4 py-3.5 text-xs font-bold text-white/92 transition-colors hover:bg-white/14 sm:px-5 sm:text-sm"
                >
                  <span className="min-w-0 break-all text-end">{brandEmail}</span>
                  <Icon name="mail" className="text-[#9ec9dc]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden border-b border-slate-200/70 bg-[#f8fafc] px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 dark:border-slate-800 dark:bg-slate-950"
        aria-labelledby="home-intro-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_100%_0%,rgba(30,58,94,0.07),transparent_55%),radial-gradient(ellipse_70%_50%_at_0%_100%,rgba(15,118,110,0.05),transparent_50%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/20 to-transparent" aria-hidden />

        <div className="relative mx-auto max-w-3xl text-right lg:max-w-4xl">
          <div className="rounded-[1.75rem] border border-slate-200/90 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_2px_8px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/[0.03] backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/75 dark:shadow-[0_24px_60px_rgba(0,0,0,0.35)] dark:ring-white/[0.06] sm:rounded-[2rem] sm:p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/90 sm:text-sm">
              خدماتنا في الرياض
            </p>
            <h2
              id="home-intro-heading"
              className="mt-3 font-headline text-2xl font-extrabold leading-snug tracking-tight text-primary sm:text-3xl md:text-[2rem] md:leading-tight"
            >
              شركة تنظيف ومكافحة حشرات في الرياض
            </h2>
            <div
              className="mt-4 h-1 w-14 rounded-full bg-gradient-to-l from-secondary via-primary to-primary/40 sm:w-16"
              role="presentation"
            />
            <p className="mt-6 text-[0.9375rem] font-medium leading-[2] text-slate-600 dark:text-slate-300 sm:text-base sm:leading-[2.05]">
              سواء احتجت{" "}
              <Link href="/services/deep-home-cleaning" className={homeIntroLinkClass}>
                تنظيفاً عميقاً للمنزل
              </Link>
              ، أو{" "}
              <Link href="/services/carpet-cleaning" className={homeIntroLinkClass}>
                غسيل سجاد وموكيت
              </Link>
              ، أو{" "}
              <Link href="/services/facade-cleaning" className={homeIntroLinkClass}>
                تنظيف واجهات
              </Link>
              ، أو خطة لمكافحة الحشرات، نركّز على شرح الخطوات قبل التنفيذ، ومواد مناسبة للمساحة، والالتزام بالمواعيد
              المتفق عليها. اطّلع على{" "}
              <Link href="/areas" className={homeIntroLinkClass}>
                مناطق التغطية
              </Link>{" "}
              أو{" "}
              <Link href="/contact" className={homeIntroLinkClass}>
                اطلب استشارة أو حجزاً
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="about-features" className="bg-surface-container-lowest px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28" aria-labelledby="features-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 id="features-heading" className="mb-4 text-xs font-bold uppercase tracking-widest text-secondary sm:text-sm">
              لماذا تختارنا
            </h2>
            <p className="mx-auto max-w-2xl font-headline text-3xl font-extrabold leading-tight text-primary sm:text-4xl md:text-5xl">
              جودة تنفيذ ومواد مناسبة وخطوات واضحة
            </p>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-secondary-container" role="presentation" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featureArticles.map((feature) => (
              <article key={feature.slug} className="group overflow-hidden rounded-2xl bg-surface-container-lowest shadow-[0_10px_32px_rgba(30,58,138,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(30,58,138,0.11)]">
                <Link href={`/features/${feature.slug}`} aria-label={`اقرأ مقال ${feature.cardTitle}`}>
                <div className="relative h-52 overflow-hidden rounded-t-2xl">
                  <Image
                    src={feature.image}
                    alt={featureCardImageAlt[feature.slug] ?? feature.cardTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={78}
                    loading="lazy"
                    className="object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="p-6 text-right">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-primary text-white shadow-[0_10px_24px_rgba(0,35,111,0.16)]">
                    <Icon name={feature.icon} className="text-2xl" />
                  </div>
                  <h3 className="mb-3 font-headline text-xl font-bold text-primary">{feature.cardTitle}</h3>
                  <p className="text-sm leading-7 text-on-surface-variant">{feature.cardDescription}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary">
                    اقرأ المقال
                    <Icon name="arrow_back" className="text-lg" />
                  </span>
                </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PartnersMarquee />

      <section id="services" className="px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-32" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <h2 id="services-heading" className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">
                خدماتنا المتميزة
              </h2>
              <div className="h-1.5 w-24 rounded-full bg-secondary-container" role="presentation" />
            </div>
            <p className="max-w-md text-sm text-on-surface-variant sm:text-base md:text-start">
              حلول تنظيف للمنازل والمكاتب والسجاد والواجهات، مع خيارات مكافحة حشرات عند الحاجة، وفريق يضبط الخطة
              حسب مساحتك.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <article className="group relative min-h-[min(75svh,28rem)] overflow-hidden rounded-3xl shadow-2xl sm:min-h-[26rem] md:col-span-8 md:h-[500px] md:rounded-[2.5rem] lg:rounded-full">
              <Link href="/services/deep-home-cleaning" className="absolute inset-0 block" aria-label="تفاصيل خدمة تنظيف المنازل العميق">
              <Image
                src={images.deepClean}
                alt={deepHomeCleaning ? buildServiceHeroImageAlt(deepHomeCleaning) : "تنظيف عميق للمنزل"}
                title={deepHomeCleaning ? buildServiceHeroImageTitle(deepHomeCleaning) : undefined}
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                quality={62}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-0 p-6 text-white sm:p-8 md:p-12">
                <h3 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">{deepHomeCleaning?.shortTitle}</h3>
                <p className="mb-4 max-w-md text-sm text-white/85 sm:mb-6 sm:text-base">{deepHomeCleaning?.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  اقرأ تفاصيل الخدمة
                  <Icon name="arrow_back" className="text-lg" />
                </span>
              </div>
              </Link>
            </article>
            <div className="flex flex-col gap-8 md:col-span-4">
              <article className="group relative min-h-[13.5rem] flex-1 overflow-hidden rounded-3xl shadow-xl sm:min-h-[15rem] md:min-h-[220px] md:rounded-[2rem] lg:rounded-full">
                <Link href="/services/carpet-cleaning" className="absolute inset-0 block" aria-label="تفاصيل خدمة غسيل السجاد">
                <Image
                  src={images.carpet}
                  alt={carpetCleaning ? buildServiceHeroImageAlt(carpetCleaning) : "غسيل سجاد وموكيت"}
                  title={carpetCleaning ? buildServiceHeroImageTitle(carpetCleaning) : undefined}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  quality={62}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" aria-hidden />
                <div className="absolute bottom-0 p-5 text-white sm:p-8">
                  <h3 className="text-lg font-bold sm:text-xl">{carpetCleaning?.shortTitle}</h3>
                  <span className="mt-2 inline-flex text-xs font-bold text-white/85">
                    تفاصيل خدمة {carpetCleaning?.shortTitle ?? "غسيل السجاد"}
                  </span>
                </div>
                </Link>
              </article>
              <article className="group relative min-h-[13.5rem] flex-1 overflow-hidden rounded-3xl shadow-xl sm:min-h-[15rem] md:min-h-[220px] md:rounded-[2rem] lg:rounded-full">
                <Link href="/services/facade-cleaning" className="absolute inset-0 block" aria-label="تفاصيل خدمة تنظيف الواجهات">
                <Image
                  src={images.facade}
                  alt={facadeCleaning ? buildServiceHeroImageAlt(facadeCleaning) : "تنظيف واجهات زجاجية"}
                  title={facadeCleaning ? buildServiceHeroImageTitle(facadeCleaning) : undefined}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  quality={62}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" aria-hidden />
                <div className="absolute bottom-0 p-5 text-white sm:p-8">
                  <h3 className="text-lg font-bold sm:text-xl">{facadeCleaning?.shortTitle}</h3>
                  <span className="mt-2 inline-flex text-xs font-bold text-white/85">
                    تفاصيل خدمة {facadeCleaning?.shortTitle ?? "تنظيف الواجهات"}
                  </span>
                </div>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#062a73] to-[#031a49] px-4 py-16 text-white sm:px-6 sm:py-20 md:px-8 md:py-28" aria-labelledby="testimonials-heading">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-[#d9e8ff] backdrop-blur-sm">
              <Icon name="verified_user" className="text-lg" />
              تقييمات موثوقة من عملائنا الكرام
            </p>
            <h2 id="testimonials-heading" className="mb-4 font-headline text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              ثقة <span className="text-[#c8ddff]">آلاف العملاء</span>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/70">
              تجارب عملاء تعكس التزامنا بخدمة منظّمة، وتواصل واضح، ونتيجة تليق بمنزلك أو منشأتك.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-6 lg:gap-8">
            {testimonials.map((item) => (
              <figure
                key={item.name}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/18 bg-white/[0.07] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:border-white/28 motion-safe:hover:bg-white/[0.11] motion-safe:hover:shadow-[0_28px_60px_rgba(0,0,0,0.28)] md:p-8"
              >
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-l from-transparent via-white/40 to-transparent" aria-hidden />
                <div className="mb-5 flex justify-center gap-1 text-amber-300/95" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-[1.05rem] leading-none drop-shadow-sm">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="flex min-h-0 flex-1 flex-col justify-center py-1">
                  <p className="text-center text-sm font-semibold leading-[1.85] text-white/92 md:text-[0.9375rem]">
                    «{item.text}»
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex shrink-0 flex-wrap items-center justify-center gap-3 border-t border-white/12 pt-6">
                  <cite className="not-italic text-sm font-bold tracking-tight text-white sm:text-base">{item.name}</cite>
                  <div
                    className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white p-2 shadow-[0_10px_28px_rgba(0,0,0,0.22)] ring-2 ring-white/15 transition-transform duration-300 group-hover:scale-[1.06] sm:h-14 sm:w-14 sm:p-2.5"
                    aria-hidden
                  >
                    <Image
                      src={brandLogoPath}
                      alt={`شعار ${brandNameAr} — بجانب تقييم عميل`}
                      width={48}
                      height={48}
                      sizes="48px"
                      className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                      loading="lazy"
                    />
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <StatsStrip />
    </main>
  );
}
