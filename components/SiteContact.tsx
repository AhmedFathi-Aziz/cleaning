import Link from "next/link";

import { ContactQuickForm } from "@/components/ContactQuickForm";
import { Icon } from "@/components/Icon";
import { brandPhone, brandPhoneDisplay, brandWhatsapp } from "@/lib/brand";
import { contactPageFaqs } from "@/lib/content/contact-faqs";

function WhatsappGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.896-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

export function SiteContact() {
  return (
    <main className="bg-background pt-24">
      {/* نموذج + تواصل مباشر — خلفية رمادية فاتحة وكرت أبيض كالمرجع */}
      <section
        className="bg-[linear-gradient(180deg,#eef0f3_0%,#f4f5f7_28%,#f4f5f7_100%)] pb-14 pt-8 md:pb-20 md:pt-12 dark:bg-slate-950/50"
        aria-labelledby="contact-page-title"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <header className="mb-10 text-right md:mb-12">
            <p className="mb-3 text-sm font-semibold text-slate-600 md:text-base">اتصل بنا</p>
            <h1
              id="contact-page-title"
              className="font-headline text-3xl font-extrabold tracking-tight text-[#1D2D3D] md:text-4xl lg:text-[2.35rem]"
            >
              اتصل بشركة تنظيف بالرياض
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:mt-5 md:text-lg">
              املأ النموذج أدناه أو تواصل مباشرة عبر واتساب أو الاتصال. نرد بسرعة على استفسارات تنظيف
              المنازل والمكاتب والسجاد والواجهات ومكافحة الحشرات في أحياء الرياض — معاينة مجانية
              للمساحات الكبيرة.
            </p>
          </header>

          <h2 className="sr-only">نموذج التواصل السريع والقنوات المباشرة</h2>

          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_64px_rgba(29,45,61,0.07),0_2px_8px_rgba(29,45,61,0.04)]">
            <div dir="rtl" className="flex flex-col lg:flex-row lg:items-stretch">
              <div className="p-8 md:p-10 lg:flex-[3] lg:basis-0 lg:min-w-0">
                <ContactQuickForm />
              </div>

              <div className="hidden w-px shrink-0 bg-slate-200 lg:block" aria-hidden />

              <div className="border-t border-slate-200 p-8 md:p-10 lg:flex-[2] lg:basis-0 lg:border-t-0 lg:min-w-0">
                <h3 className="mb-7 font-headline text-xl font-extrabold tracking-tight text-[#1D2D3D] md:text-2xl">
                  أو مباشرة
                </h3>

                <a
                  href={`tel:${brandPhone}`}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-[#1D2D3D] transition hover:border-slate-300 hover:bg-slate-50/80"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-primary">
                    <Icon name="phone_in_talk" className="text-[1.35rem]" />
                  </span>
                  <span className="min-w-0 flex-1 text-base font-bold tracking-tight md:text-lg" dir="ltr">
                    {brandPhoneDisplay}
                  </span>
                </a>

                <a
                  href={brandWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#128C7E] px-5 py-3.5 text-base font-extrabold text-white shadow-[0_8px_24px_rgba(0,0,0,0.22),0_4px_12px_rgba(18,140,126,0.35)] transition hover:bg-[#0f7a6e] hover:shadow-[0_10px_28px_rgba(0,0,0,0.24),0_4px_14px_rgba(18,140,126,0.4)]"
                >
                  <WhatsappGlyph className="h-6 w-6 shrink-0 text-white" />
                  تواصل معنا عبر واتساب
                </a>

                <p className="mt-7 text-sm font-normal leading-relaxed text-slate-600">
                  تفضل بزيارة{" "}
                  <Link
                    href="/areas"
                    className="font-semibold text-slate-700 underline decoration-slate-500 underline-offset-[3px] hover:text-[#1D2D3D]"
                  >
                    صفحة مناطق الخدمة
                  </Link>{" "}
                  لمعرفة المدن والأحياء التي نغطيها لخدمة أسرع.
                </p>
              </div>
            </div>
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
            {contactPageFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:border-primary/15 hover:shadow-md open:border-primary/20 open:shadow-[0_10px_40px_rgba(0,35,111,0.08)] md:p-6"
              >
                <summary className="cursor-pointer list-none text-right font-bold text-primary marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex w-full items-center justify-between gap-3">
                    {faq.question}
                    <span className="text-secondary transition group-open:rotate-180">▼</span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-on-surface-variant md:text-base">{faq.answer}</p>
              </details>
            ))}
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
