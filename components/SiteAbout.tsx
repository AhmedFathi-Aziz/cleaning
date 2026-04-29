import Image from "next/image";
import Link from "next/link";

import { PartnersLogoGrid } from "@/components/PartnersLogoGrid";
import { PartnersTrustHeading } from "@/components/PartnersTrustHeading";
import { images } from "@/lib/assets";
import { aboutCorporatePartners, homePartners } from "@/lib/partners";
import { Icon } from "@/components/Icon";

export function SiteAbout() {
  return (
    <main className="bg-background pt-24">
      {/* Hero — نص يمين، صورة يسار (RTL) */}
      <section className="border-b border-slate-100/80 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16 lg:px-8">
          <div className="order-2 text-right md:order-1">
            <p className="mb-4 text-sm font-medium text-on-surface-variant">تعرّف على السعودية للتنظيف</p>
            <h1 className="mb-6 font-headline text-4xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-5xl lg:text-6xl">
              نعيد تعريف النقاء في مساحتكم الخاصة
            </h1>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-on-surface-variant md:text-lg">
              نحن لسنا مجرد شركة تنظيف؛ نحن شريككم في خلق بيئة صحية، ملهمة، ومفعمة بالحياة. نجمع بين الدقة
              السعودية والمعايير العالمية لنمنح مساحتكم لمعاناً وهدوءاً يدوم.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-base font-bold text-on-primary shadow-md transition hover:opacity-95 hover:shadow-lg"
            >
              اكتشف خدماتنا
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-slate-200 shadow-[0_20px_60px_rgba(0,35,111,0.12)]">
              <Image
                src={images.aboutHero}
                alt="غرفة معيشة فاخرة بنوافذ زجاجية واسعة وانعكاس رخامي يعكس النظافة"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* شركاؤنا وجهات وثقت بنا — شبكة واحدة (شركات وحكومية) */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-[linear-gradient(180deg,#fafaf8_0%,#f7f5f2_52%,#f3f1ed_100%)] py-20 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/14 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <PartnersTrustHeading
            title="شركاؤنا وجهات وثقت بنا"
            subtitle="جهات حكومية وتجارية نخدمها بنفس المعايير العالية."
          />
          <PartnersLogoGrid partners={[...aboutCorporatePartners, ...homePartners]} />
        </div>
      </section>

      {/* القيم التي تحركنا */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="text-2xl font-bold text-primary md:text-3xl">القيم التي تحركنا</h2>
            <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-secondary" aria-hidden />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200/90 bg-surface-container-lowest p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <div className="mb-6 flex justify-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f0ebe3]">
                  <Icon name="verified" className="text-2xl text-primary" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">الجودة</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
                لا نرضى بأنصاف الحلول. كل زاوية تحظى باهتمام دقيق، مع ضمان رضاكم الكامل عن النتيجة.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200/90 bg-surface-container-lowest p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <div className="mb-6 flex justify-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f0ebe3]">
                  <Icon name="shield_person" className="text-2xl text-primary" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">الثقة</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
                خصوصيتكم أولويتنا. فريق مدرب ومفحوص أمنياً لأعلى مستويات الأمانة داخل بيوتكم.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200/90 bg-surface-container-lowest p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <div className="mb-6 flex justify-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f0ebe3]">
                  <Icon name="bolt" className="text-2xl text-primary" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">السرعة</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
                نحترم وقتكم. ننجز المهام بكفاءة وفي الموعد، دون المساس بجودة اللمسة النهائية.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* إحصائيات — شريط رمادي بزوايا دائرية */}
      <section className="px-6 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-3xl bg-surface-container-high px-6 py-14 md:px-12 md:py-16">
          <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4 md:gap-8">
            <div>
              <p className="mb-1 text-4xl font-extrabold tabular-nums text-primary md:text-5xl">+15k</p>
              <p className="text-sm font-medium text-on-surface-variant md:text-base">عميل سعيد</p>
            </div>
            <div>
              <p className="mb-1 text-4xl font-extrabold tabular-nums text-primary md:text-5xl">+450</p>
              <p className="text-sm font-medium text-on-surface-variant md:text-base">خبير تنظيف</p>
            </div>
            <div>
              <p className="mb-1 text-4xl font-extrabold tabular-nums text-primary md:text-5xl">12</p>
              <p className="text-sm font-medium text-on-surface-variant md:text-base">مدينة نغطيها</p>
            </div>
            <div>
              <p className="mb-1 text-4xl font-extrabold tabular-nums text-primary md:text-5xl">4.9/5</p>
              <p className="text-sm font-medium text-on-surface-variant md:text-base">تقييم الخدمة</p>
            </div>
          </div>
        </div>
      </section>

      {/* بانر CTA */}
      <section className="px-6 pb-24 md:px-8 md:pb-28">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-8 rounded-2xl bg-primary px-8 py-12 text-on-primary md:flex-row md:items-center md:px-12 md:py-14">
          <div className="text-center md:text-right">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">هل أنتم مستعدون لتجربة النقاء؟</h2>
            <p className="text-base text-on-primary-container/95">احجز موعدك اليوم ودع الباقي لخبرائنا.</p>
          </div>
          <div className="flex shrink-0 justify-center md:justify-start">
            <Link
              href="/#book"
              className="inline-flex w-full items-center justify-center rounded-xl bg-white px-10 py-3.5 text-center text-base font-bold text-primary shadow-md transition hover:bg-slate-50 md:w-auto"
            >
              احجز الآن
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
