"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { PartnersTrustHeading } from "@/components/PartnersTrustHeading";
import { images } from "@/lib/assets";
import { brandEmail, brandPhone, brandPhoneDisplay, brandWhatsapp } from "@/lib/brand";
import { homePartners } from "@/lib/partners";
import { featureArticles } from "@/lib/feature-articles";
import { getServiceArticle } from "@/lib/service-articles";
import { Icon } from "@/components/Icon";

const CycleGallery = dynamic(() => import("@/components/cycle-gallery").then((mod) => mod.CycleGallery), {
  loading: () => <div className="h-60 rounded-2xl bg-surface-container-low" aria-hidden />,
});

const stats = [
  { value: 50000, label: "موقع تم تنظيفه", icon: "apartment" },
  { value: 15, label: "عاماً من الخبرة", icon: "calendar_month" },
  { value: 500, label: "موظف محترف", icon: "engineering" },
  { value: 10000, label: "عميل سعيد", icon: "sentiment_satisfied" },
];

const testimonials = [
  {
    name: "سارة الأحمد",
    image: "/testimonials/avatar-sara.svg",
    text: "طلبت تنظيف شامل للبيت بعد التشطيب، وبصراحة النتيجة فرقت جداً. الشباب وصلوا في الموعد واشتغلوا بهدوء واهتمام بالتفاصيل.",
  },
  {
    name: "محمد العتيبي",
    image: "/testimonials/avatar-mohammed.svg",
    text: "كنت محتاج رش حشرات للفيلا لأن الموضوع كان مزعجنا، وبعد الخدمة اختفت المشكلة. تعاملهم محترم وشرحوا لي كل خطوة قبل ما يبدأوا.",
  },
  {
    name: "فيصل الشهري",
    image: "/testimonials/avatar-faisal.svg",
    text: "جربتهم في تنظيف الواجهات والزجاج، والشغل طلع مرتب أكثر مما توقعت. أهم شيء عندي إنهم كانوا واضحين في السعر وما فيه أي تأخير.",
  },
];

const galleryImages = [
  { src: images.deepClean, alt: "تنظيف عميق لغرفة معيشة حديثة" },
  { src: images.carpet, alt: "غسيل سجاد احترافي بمعدات متخصصة" },
  { src: images.facade, alt: "تنظيف واجهات زجاجية باحترافية" },
  { src: images.featureTeam, alt: "فريق تنظيف متخصص أثناء العمل" },
  { src: images.featureMaterials, alt: "معدات ومواد تنظيف احترافية" },
];

const contactPhone = brandPhoneDisplay;
const contactPhoneHref = brandPhone;
const whatsappHref = brandWhatsapp;
const deepHomeCleaning = getServiceArticle("deep-home-cleaning");
const carpetCleaning = getServiceArticle("carpet-cleaning");
const facadeCleaning = getServiceArticle("facade-cleaning");

function AnimatedCounter({ value, start }: { value: number; start: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;

    const duration = 1400;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, value]);

  return <>{current.toLocaleString("en-US")}</>;
}

function StatsStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-6 py-20 md:px-8 md:py-24" aria-label="إحصائيات الشركة">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/20 to-transparent" aria-hidden />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group flex flex-col items-center rounded-2xl border border-primary/10 bg-white px-6 py-8 text-center shadow-[0_16px_45px_rgba(0,35,111,0.06)] transition-all duration-500 hover:bg-white hover:shadow-[0_22px_60px_rgba(0,35,111,0.1)]"
          >
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Icon name={stat.icon} className="text-3xl" />
            </span>
            <p className="mb-2 text-sm font-bold text-[#716f68]">أكثر من</p>
            <p className="font-headline text-5xl font-extrabold leading-none tracking-tight text-primary md:text-6xl">
              <AnimatedCounter value={stat.value} start={isVisible} />
            </p>
            <p className="mt-4 text-base font-extrabold text-[#4f4b43]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PartnersMarquee() {
  return (
    <section className="relative overflow-hidden bg-surface-container-lowest px-8 pb-28 pt-2" aria-labelledby="partners-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/12 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <PartnersTrustHeading
          headingId="partners-heading"
          title="شركاؤنا وجهات وثقت بنا"
          subtitle="نفخر بتقديم خدماتنا لجهات ومرافق متنوعة بمعايير التزام وجودة عالية."
        />

        <CycleGallery
          images={homePartners.map((partner) => ({
            src: partner.logo,
            alt: `شعار ${partner.name}`,
          }))}
          cardWidth={220}
          cardHeight={130}
          speedPxPerSec={72}
          imageFit="contain"
        />
      </div>
    </section>
  );
}

export function SiteHome() {
  return (
    <main id="main-content">
      <section className="relative flex min-h-[720px] items-center overflow-hidden px-8" aria-labelledby="hero-heading">
        <div className="absolute inset-0 z-0" aria-hidden>
          <Image
            src={images.hero}
            alt="داخل فيلا سعودية حديثة بنوافذ زجاجية عالية وإضاءة طبيعية وأرضيات رخام نظيفة"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/40 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 md:grid-cols-2">
          <div className="space-y-7 pe-4">
            <p className="inline-flex items-center gap-4 rounded-xl border border-white/20 bg-gradient-to-l from-[#082f6f] via-[#0f4c81] to-[#5f7f95] px-5 py-3 text-xs font-extrabold text-white shadow-[0_18px_45px_rgba(8,47,111,0.18)] backdrop-blur-md md:text-sm">
              <span className="h-10 w-1 rounded-full bg-white/85" aria-hidden="true" />
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
                <Icon name="verified_user" className="text-xl" />
              </span>
              <span>خدمات تنظيف ورش الحشرات في المملكة العربية السعودية</span>
            </p>
            <h1 id="hero-heading" className="font-headline text-4xl font-extrabold leading-tight tracking-tight text-primary md:text-6xl">
              نظافة مثالية
              <br />
              <span className="text-secondary">لمنزلك ومنشأتك</span>
            </h1>
            <p className="max-w-lg text-lg font-medium leading-relaxed text-on-surface-variant">
              نعيد تعريف مفهوم النظافة من خلال دقة التنفيذ والعناية بأدق التفاصيل، لنمنحك المساحة التي تستحقها للراحة والإبداع.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-4" id="book">
              <Link href="/contact" className="liquid-gradient hydro-shadow inline-block rounded-full px-9 py-4 text-center text-base font-bold text-on-primary transition-transform hover:scale-105 active:scale-95">
                احجز الآن
              </Link>
              <Link href="/services" className="group flex items-center gap-2 font-bold text-primary transition-colors hover:text-secondary">
                <span>اكتشف خدماتنا</span>
                <Icon name="arrow_back" className="transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="mt-12 flex items-center justify-center md:mt-0 md:justify-end">
            <div className="w-full max-w-sm rounded-3xl border border-white/20 bg-gradient-to-br from-[#06337f]/95 via-[#06418f]/92 to-[#35c6c2]/88 p-6 text-right text-white shadow-[0_24px_70px_rgba(6,51,127,0.22)] backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="rounded-full bg-white/12 px-4 py-2 text-xs font-extrabold text-white">تواصل سريع</span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white shadow-lg">
                  <Icon name="support_agent" className="text-2xl" />
                </span>
              </div>

              <h2 className="font-headline text-2xl font-extrabold text-white">احجز خدمتك الآن</h2>
              <p className="mt-3 text-sm font-medium leading-7 text-white/82">
                فريقنا جاهز لاستقبال طلبات التنظيف ورش الحشرات وتحديد الموعد المناسب لك.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="تواصل معنا عبر واتساب في تبويب جديد"
                  className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-extrabold text-[#06337f] shadow-[0_14px_35px_rgba(6,51,127,0.22)] transition-transform hover:-translate-y-0.5"
                >
                  <span>تواصل عبر واتساب</span>
                  <Icon name="chat" className="" />
                </a>
                <a
                  href={`tel:${contactPhoneHref}`}
                  aria-label={`اتصل بنا على ${contactPhone}`}
                  className="flex items-center justify-between rounded-2xl border border-white/18 bg-white/10 px-5 py-4 text-sm font-bold text-white transition-colors hover:bg-white/15"
                >
                  <span dir="ltr">{contactPhone}</span>
                  <Icon name="phone_in_talk" className="text-[#35c6c2]" />
                </a>
                <a
                  href={`mailto:${brandEmail}`}
                  className="flex items-center justify-between rounded-2xl border border-white/18 bg-white/10 px-5 py-4 text-sm font-bold text-white transition-colors hover:bg-white/15"
                >
                  <span>{brandEmail}</span>
                  <Icon name="mail" className="text-[#35c6c2]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about-features" className="bg-surface-container-lowest px-8 py-28" aria-labelledby="features-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 id="features-heading" className="mb-4 text-sm font-bold uppercase tracking-widest text-secondary">
              لماذا تختارنا
            </h2>
            <p className="mx-auto max-w-2xl font-headline text-4xl font-extrabold leading-tight text-primary md:text-5xl">
              نقدم خدمات استثنائية بمعايير عالمية
            </p>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-secondary-container" role="presentation" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featureArticles.map((feature) => (
              <article key={feature.slug} className="group overflow-hidden rounded-2xl bg-surface-container-lowest shadow-[0_10px_32px_rgba(30,58,138,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(30,58,138,0.11)]">
                <Link href={`/features/${feature.slug}`} aria-label={`اقرأ مقال ${feature.cardTitle}`}>
                <div className="relative h-52 overflow-hidden bg-primary-container/10">
                  <Image src={feature.image} alt={feature.cardTitle} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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

      <section className="bg-surface-container-lowest px-8 pb-32" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 id="gallery-heading" className="font-headline text-3xl font-extrabold text-primary md:text-4xl">
              من أعمالنا
            </h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-on-surface-variant">
              لقطات من خدمات التنظيف والعناية بالمساحات باستخدام معدات احترافية.
            </p>
          </div>
          <CycleGallery images={galleryImages} cardWidth={280} cardHeight={240} speedPxPerSec={48} />
        </div>
      </section>

      <section id="services" className="px-8 py-32" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <h2 id="services-heading" className="font-headline text-4xl font-extrabold text-primary">
                خدماتنا المتميزة
              </h2>
              <div className="h-1.5 w-24 rounded-full bg-secondary-container" role="presentation" />
            </div>
            <p className="max-w-md text-on-surface-variant md:text-start">
              نقدم حلولاً متكاملة لتنظيف كافة أنواع المساحات بأحدث التقنيات والمعدات.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <article className="group relative h-[500px] overflow-hidden rounded-full shadow-2xl md:col-span-8">
              <Link href="/services/deep-home-cleaning" className="absolute inset-0 block" aria-label="تفاصيل خدمة تنظيف المنازل العميق">
              <Image src={images.deepClean} alt="تنظيف عميق لغرفة معيشة حديثة باستخدام معدات بخار" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-0 p-12 text-white">
                <h3 className="mb-4 text-3xl font-bold">{deepHomeCleaning?.shortTitle}</h3>
                <p className="mb-6 max-w-md text-white/80">{deepHomeCleaning?.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  اقرأ تفاصيل الخدمة
                  <Icon name="arrow_back" className="text-lg" />
                </span>
              </div>
              </Link>
            </article>
            <div className="flex flex-col gap-8 md:col-span-4">
              <article className="group relative min-h-[220px] flex-1 overflow-hidden rounded-full shadow-xl">
                <Link href="/services/carpet-cleaning" className="absolute inset-0 block" aria-label="تفاصيل خدمة غسيل السجاد">
                <Image src={images.carpet} alt="غسيل سجاد احترافي" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" aria-hidden />
                <div className="absolute bottom-0 p-8 text-white">
                  <h3 className="text-xl font-bold">{carpetCleaning?.shortTitle}</h3>
                  <span className="mt-2 inline-flex text-xs font-bold text-white/85">اقرأ التفاصيل</span>
                </div>
                </Link>
              </article>
              <article className="group relative min-h-[220px] flex-1 overflow-hidden rounded-full shadow-xl">
                <Link href="/services/facade-cleaning" className="absolute inset-0 block" aria-label="تفاصيل خدمة تنظيف الواجهات">
                <Image src={images.facade} alt="عامل تنظيف واجهات زجاجية" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" aria-hidden />
                <div className="absolute bottom-0 p-8 text-white">
                  <h3 className="text-xl font-bold">{facadeCleaning?.shortTitle}</h3>
                  <span className="mt-2 inline-flex text-xs font-bold text-white/85">اقرأ التفاصيل</span>
                </div>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#062a73] to-[#031a49] px-6 py-24 text-white md:px-8 md:py-28" aria-labelledby="testimonials-heading">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-[#d9e8ff] backdrop-blur-sm">
              <Icon name="verified_user" className="text-lg" />
              تقييمات موثوقة من عملائنا الكرام
            </p>
            <h2 id="testimonials-heading" className="mb-4 font-headline text-4xl font-extrabold leading-tight text-white md:text-5xl">
              ثقة <span className="text-[#c8ddff]">آلاف العملاء</span>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/70">
              شهادات حقيقية من عملائنا يعكسون التزامنا بتقديم خدمات متميزة بجودة عالمية
            </p>
          </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-6 lg:gap-8">
            {testimonials.map((item, index) => (
              <figure
                key={item.name}
                style={{ animationDelay: `${index * 85}ms` }}
                className="group relative overflow-hidden rounded-3xl border border-white/18 bg-white/[0.07] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl transition duration-300 motion-safe:animate-fade-up-soft motion-safe:[animation-fill-mode:both] motion-safe:hover:-translate-y-1 motion-safe:hover:border-white/28 motion-safe:hover:bg-white/[0.11] motion-safe:hover:shadow-[0_28px_60px_rgba(0,0,0,0.28)] motion-reduce:animate-none"
              >
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-l from-transparent via-white/40 to-transparent" aria-hidden />
                <div className="mb-5 flex justify-center gap-1 text-amber-300/95" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-[1.05rem] leading-none drop-shadow-sm">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote>
                  <p className="text-right text-sm font-semibold leading-[1.85] text-white/92 md:text-[0.9375rem]">
                    «{item.text}»
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-white/15 pt-6">
                  <div className="relative h-[3.75rem] w-[3.75rem] flex-shrink-0 overflow-hidden rounded-2xl border border-white/25 bg-white/[0.12] shadow-[0_12px_28px_rgba(0,0,0,0.28)] ring-2 ring-white/10 transition-transform duration-300 group-hover:scale-[1.03]">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="60px"
                      className="object-cover object-center"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-right">
                    <cite className="not-italic block text-base font-bold tracking-tight text-white">{item.name}</cite>
                    <span className="mt-1 block text-xs font-medium text-[#b8cef7]/95">عميل · تجربة موثّقة</span>
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
