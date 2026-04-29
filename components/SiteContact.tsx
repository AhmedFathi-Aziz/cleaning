import type { ReactNode } from "react";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import {
  brandAddressAr,
  brandEmail,
  brandNameAr,
  brandPhone,
  brandPhoneDisplay,
  brandWhatsapp,
  brandWorkingHoursAr,
} from "@/lib/brand";

function ContactCard({
  title,
  children,
  icon,
  hint,
  delayMs = 0,
}: {
  title: string;
  children: ReactNode;
  hint?: string;
  icon: React.ComponentProps<typeof Icon>["name"];
  delayMs?: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delayMs}ms` }}
      className="group flex flex-col rounded-2xl border border-slate-200/85 bg-white p-7 shadow-[0_8px_32px_rgba(0,35,111,0.055)] ring-1 ring-slate-900/[0.035] transition duration-300 ease-out motion-safe:animate-fade-up-soft motion-safe:[animation-fill-mode:both] motion-reduce:animate-none md:p-8"
    >
      <div className="mb-5 flex justify-start">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-primary/12 bg-gradient-to-br from-primary/[0.07] to-primary/[0.02] text-primary shadow-sm transition-transform duration-300 group-hover:scale-[1.04]">
          <Icon name={icon} className="text-2xl" />
        </span>
      </div>
      <h3 className="mb-2 text-lg font-bold text-primary">{title}</h3>
      {hint ? (
        <p className="mb-3 text-xs font-medium leading-relaxed text-secondary/95 md:text-sm">{hint}</p>
      ) : null}
      <div className="text-base font-medium leading-relaxed text-on-surface md:text-[1.05rem]">{children}</div>
    </div>
  );
}

export function SiteContact() {
  return (
    <main className="bg-background pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/70">
        <div
          className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/[0.09] blur-3xl motion-reduce:hidden"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-secondary/[0.12] blur-3xl motion-reduce:hidden"
          aria-hidden
        />
        <div className="relative bg-[linear-gradient(180deg,#f4f7fc_0%,#f7f9fb_45%,#ffffff_100%)] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-right">
              <p className="mb-4 text-sm font-semibold tracking-wide text-secondary motion-safe:animate-fade-up-soft md:text-base">
                خدمة العملاء والحجز
              </p>
              <h1 className="mb-6 font-headline text-3xl font-extrabold leading-[1.15] tracking-tight text-primary motion-safe:animate-fade-up-soft motion-safe:[animation-delay:60ms] motion-safe:[animation-fill-mode:both] md:text-4xl lg:text-[2.65rem]">
                تواصل مع {brandNameAr}
              </h1>
              <p className="mb-8 text-base leading-relaxed text-on-surface-variant motion-safe:animate-fade-up-soft motion-safe:[animation-delay:120ms] motion-safe:[animation-fill-mode:both] md:text-lg">
                للاستفسار عن{" "}
                <strong className="font-bold text-primary">تنظيف المنازل والمكاتب</strong>، التنظيف العميق،{" "}
                <strong className="font-bold text-primary">غسيل السجاد والموكيت</strong>، تنظيف الواجهات، أو{" "}
                <strong className="font-bold text-primary">رش ومكافحة الحشرات</strong> في أنحاء المملكة — نحن
                على استعداد لخدمتكم عبر الهاتف أو واتساب أو البريد خلال أوقات العمل.
              </p>
              <div className="flex flex-wrap items-center justify-end gap-4 rounded-2xl border border-primary/10 bg-white/80 px-5 py-4 text-sm shadow-[0_4px_24px_rgba(0,35,111,0.06)] backdrop-blur-sm motion-safe:animate-fade-up-soft motion-safe:[animation-delay:180ms] motion-safe:[animation-fill-mode:both] md:text-base">
                <span className="inline-flex items-center gap-2 font-semibold text-primary">
                  <Icon name="calendar_month" className="text-xl text-secondary" />
                  أوقات التواصل
                </span>
                <span className="h-8 w-px bg-slate-200" aria-hidden />
                <span className="text-on-surface-variant">{brandWorkingHoursAr}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* وسائل مباشرة */}
      <section className="py-14 md:py-20" aria-labelledby="contact-channels-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center md:mb-14 md:text-right">
            <h2 id="contact-channels-heading" className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
              وسائل التواصل المباشرة
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-on-surface-variant md:mx-0">
              اختر الطريقة الأنسب لكم؛ جميع القنوات تؤدي إلى نفس فريق خدمة العملاء المحترف.
            </p>
            <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-l from-transparent via-primary/30 to-transparent md:mr-0 md:ml-auto" />
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8">
            <ContactCard
              title="الهاتف"
              hint="للحجز الفوري والاستفسار السريع"
              icon="phone_in_talk"
              delayMs={0}
            >
              <a
                href={`tel:${brandPhone}`}
                className="block rounded-lg py-1 text-xl font-bold text-primary underline-offset-4 transition hover:underline md:text-2xl"
                dir="ltr"
              >
                {brandPhoneDisplay}
              </a>
            </ContactCard>

            <ContactCard title="واتساب" hint="رسائل صوتية ونصية" icon="chat" delayMs={55}>
              <a
                href={brandWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg font-bold text-primary underline-offset-4 transition hover:underline"
              >
                فتح المحادثة في واتساب
                <Icon name="arrow_forward" className="rotate-180 text-lg" />
              </a>
            </ContactCard>

            <ContactCard title="البريد الإلكتروني" hint="للطلبات التفصيلية والمرفقات" icon="mail" delayMs={110}>
              <a
                href={`mailto:${brandEmail}`}
                className="block break-all rounded-lg py-1 text-lg font-bold text-primary underline-offset-4 transition hover:underline md:text-xl"
                dir="ltr"
              >
                {brandEmail}
              </a>
            </ContactCard>

            <ContactCard title="موقعنا" hint="المقر وفريق التنسيق" icon="location_on" delayMs={165}>
              <p className="font-semibold text-on-surface">{brandAddressAr}</p>
              <p className="mt-3 text-sm font-normal leading-relaxed text-on-surface-variant">
                نخدم العديد من المدن والأحياء ضمن شبكة التغطية؛ راجعوا{" "}
                <Link href="/areas" className="font-bold text-secondary underline-offset-2 hover:underline">
                  مناطق التغطية
                </Link>{" "}
                لمعرفة التفاصيل.
              </p>
            </ContactCard>
          </div>
        </div>
      </section>

      {/* SEO: محتوى داعم */}
      <section
        className="border-y border-slate-200/60 bg-[linear-gradient(180deg,#fafaf8_0%,#ffffff_100%)] py-14 md:py-20"
        aria-labelledby="contact-services-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 id="contact-services-heading" className="mb-6 font-headline text-2xl font-extrabold text-primary md:text-3xl">
            ماذا يمكنكم أن تسألوا عنه؟
          </h2>
          <div className="max-w-none space-y-4 text-right">
            <p className="text-base leading-relaxed text-on-surface-variant md:text-[1.0625rem]">
              عند التواصل مع {brandNameAr}، يمكنكم الاستفسار عن{" "}
              <strong className="font-bold text-primary">أسعار التنظيف</strong>، نوع المواد المستخدمة، مدة
              الزيارة، وترتيب خدمات مثل التنظيف العميق بعد التشطيب أو{" "}
              <strong className="font-bold text-primary">غسيل السجاد في المنزل</strong>، أو{" "}
              <Link
                href="/services/facade-cleaning"
                className="font-semibold text-secondary underline-offset-2 hover:underline"
              >
                تنظيف واجهات المباني
              </Link>
              ، إلى جانب برامج{" "}
              <Link href="/services" className="font-semibold text-secondary underline-offset-2 hover:underline">
                رش الحشرات والمكافحة
              </Link>{" "}
              وفق احتياجكم داخل المملكة.
            </p>
            <p className="text-base leading-relaxed text-on-surface-variant md:text-[1.0625rem]">
              نلتزم بمعايير واضحة في الالتزام بالمواعيد والجودة؛ لذلك نوصي بزيارة صفحة{" "}
              <Link href="/services" className="font-semibold text-secondary underline-offset-2 hover:underline">
                جميع الخدمات
              </Link>{" "}
              ثم العودة إلينا لأي توضيح إضافي أو{" "}
              <Link href="/#book" className="font-semibold text-secondary underline-offset-2 hover:underline">
                حجز موعد
              </Link>{" "}
              مباشرة من الصفحة الرئيسية.
            </p>
          </div>
        </div>
      </section>

      {/* أسئلة شائعة */}
      <section className="py-14 md:py-20" aria-labelledby="contact-faq-heading">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 id="contact-faq-heading" className="mb-8 text-center font-headline text-2xl font-extrabold text-primary md:text-3xl">
            أسئلة شائعة حول التواصل والحجز
          </h2>
          <div className="space-y-4">
            <details className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:border-primary/15 hover:shadow-md open:border-primary/20 open:shadow-[0_10px_40px_rgba(0,35,111,0.08)] md:p-6">
              <summary className="cursor-pointer list-none text-right font-bold text-primary marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="inline-flex w-full items-center justify-between gap-3">
                  هل يمكنني طلب عرض سعر قبل إتمام الحجز؟
                  <span className="text-secondary transition group-open:rotate-180">▼</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant md:text-base">
                نعم؛ اذكروا نوع المساحة والخدمة المطلوبة عبر الهاتف أو واتساب أو البريد، وسنساعدكم بملخص مناسب
                لحالتكم.
              </p>
            </details>
            <details className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:border-primary/15 hover:shadow-md open:border-primary/20 md:p-6">
              <summary className="cursor-pointer list-none text-right font-bold text-primary marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="inline-flex w-full items-center justify-between gap-3">
                  هل التغطية تشمل مدناً خارج الرياض؟
                  <span className="text-secondary transition group-open:rotate-180">▼</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant md:text-base">
                نعمل وفق شبكة مدن وأحياء محدّثة؛ راجعوا صفحة{" "}
                <Link href="/areas" className="font-semibold text-secondary hover:underline">
                  مناطق التغطية
                </Link>{" "}
                أو اسألوا الفريق عند الاتصال.
              </p>
            </details>
            <details className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:border-primary/15 hover:shadow-md open:border-primary/20 md:p-6">
              <summary className="cursor-pointer list-none text-right font-bold text-primary marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="inline-flex w-full items-center justify-between gap-3">
                  ما أفضل وقت للاتصال إذا كان الطلب عاجلاً؟
                  <span className="text-secondary transition group-open:rotate-180">▼</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant md:text-base">
                يُفضَّل التواصل خلال{" "}
                <strong className="text-primary">{brandWorkingHoursAr}</strong> لضمان أسرع استجابة من فريق
                التنسيق.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 md:px-8 md:pb-28">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-8 overflow-hidden rounded-2xl bg-primary px-8 py-12 text-on-primary shadow-[0_24px_60px_rgba(0,35,111,0.25)] md:flex-row md:items-center md:px-12 md:py-14">
          <div className="text-center md:text-right">
            <h2 className="mb-2 text-xl font-bold md:text-2xl">ابدؤوا بتجربة خدمة منظمة وواضحة</h2>
            <p className="max-w-xl text-on-primary-container/95">
              احجزوا موعد التنظيف من الصفحة الرئيسية، أو تواصلوا معنا عبر أي قناة أعلاه إن رغبتم في المساعدة
              قبل الحجز.
            </p>
          </div>
          <Link
            href="/#book"
            className="inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-white px-10 py-3.5 text-center text-base font-bold text-primary shadow-md transition hover:scale-[1.02] hover:bg-slate-50 active:scale-[0.98] motion-reduce:hover:scale-100 md:w-auto"
          >
            احجز الآن
          </Link>
        </div>
      </section>
    </main>
  );
}
