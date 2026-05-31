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
              نحن لا نقدّم تنظيفاً سطحياً فقط، بل نساعدكم على بيئة أكثر صحة وراحة داخل المنزل أو المكتب: خطوات
              واضحة، مواد مناسبة للسطح، واحترام لخصوصية المكان والوقت.
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
                alt="غرفة معيشة فاخرة بنوافذ زجاجية واسعة وأرضية رخامية لامعة نظيفة"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* E-E-A-T: خبرة ميدانية وموثوقية — نص يصف الفريق كما يُعرض للعميل */}
      <section className="border-b border-slate-100/80 bg-surface-container-lowest py-16 md:py-24 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-right">
            <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
              فنيونا وخبرة الميدان
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-on-surface-variant md:text-lg">
              نبني عملنا على أن التنظيف والمكافحة والكشف عن التسرب ليست «مظهراً سريعاً» فقط، بل سلسلة قرارات
              فيها سلامة الأسرة، وحساسية الأسطح، ووقت العميل. فرقنا الميدانية تمرّ بتوجيه مستمر على استخدام
              معدات البخار والشفط والمواد وفق نوع الغرفة أو الواجهة أو الخزان، مع التأكيد على قواعد السلامة
              داخل المنزل والممرات المشتركة في العمائر.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-on-surface-variant md:text-lg">
              في مسارات <strong className="text-primary">كشف تسربات المياه</strong> يعمل الفنيون بأجهزة
              استماع وقياس تدفّق وضغط حسب الحالة، ويُفضّل توثيق النتائج في تقرير مبدئي يفهم العميل ماذا تم
              قياسه — وهو ما يساعد كثيراً عند الرغبة في إرفاق ملخص لشركة المياه أو لجهة الصيانة. لا نعد
              بنتيجة تقنية قبل المعاينة؛ نعدّ بوضوح في الخطوات وفي ما يمكن توثيقه بعد الزيارة.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-on-surface-variant md:text-lg">
              التدريب عندنا مستمر: تحديثات على مواد آمنة للاستخدام الداخلي، وإعادة تذكير باحترام خصوصية
              الغرف الشخصية، وآلية تعامل مع العملاء كبار السن أو أصحاب الحساسية. نؤمن أن الثقة تُبنى من
              التفاصيل الصغيرة — من الحذاء الاحترافي عند الباب إلى شرح مبسط لما تم قبل المغادرة.
            </p>
            <p className="mt-6 text-sm font-medium text-on-surface-variant">
              للشفافية في البيانات: راجع{" "}
              <Link href="/privacy" className="font-bold text-secondary underline-offset-2 hover:underline">
                سياسة الخصوصية
              </Link>{" "}
              و{" "}
              <Link href="/terms" className="font-bold text-secondary underline-offset-2 hover:underline">
                شروط الاستخدام
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* شركاؤنا وجهات وثقت بنا — شبكة واحدة (شركات وحكومية) */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-[linear-gradient(180deg,#fafaf8_0%,#f7f5f2_52%,#f3f1ed_100%)] py-20 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/14 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <PartnersTrustHeading
            title="شركاؤنا والجهات التي وثقت بنا"
            subtitle="جهات حكومية وتجارية ومجتمعية نسعى لخدمتها بمعايير جودة ثابتة وتواصل شفاف."
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
                خصوصيتكم أولوية. فريق مدرّب يلتزم بأدب المهنة والسلامة داخل المنزل أو المنشأة.
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

      {/* آلية العمل — محتوى مفيد للزائر */}
      <section className="border-t border-slate-200/80 bg-surface-container-lowest py-20 md:py-24 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center md:text-right">
            <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">من الطلب إلى التنفيذ</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-8 text-on-surface-variant md:mx-0 md:text-base">
              مسار بسيط نلتزم به قدر الإمكان: وضوح قبل الزيارة، وتنفيذ منظّم أثناءها، وملخص بعد الانتهاء يساعدك
              على الحفاظ على النتيجة.
            </p>
          </div>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "١",
                title: "تواصل أو املأ النموذج",
                body: "حدّد نوع الخدمة، المدينة، وإن أمكن الحي أو الصور. كلما كان الوصف أوضح، كان التقدير أدق.",
              },
              {
                step: "٢",
                title: "تأكيد الموعد",
                body: "ننسّق وقتاً يناسبك قدر الإمكان، مع إبلاغك بأي تحضير بسيط يسهّل دخول الفريق.",
              },
              {
                step: "٣",
                title: "تنفيذ الخدمة",
                body: "يعمل الفريق وفق خطة متفق عليها، مع مراعاة الأسطح الحساسة والخصوصية داخل المنزل أو المكتب.",
              },
              {
                step: "٤",
                title: "ملخص ونصائح",
                body: "نلخّص ما تم إنجازه ونقدّم نصائح بسيطة للتهوية أو المتابعة، خصوصاً بعد مكافحة الحشرات.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="relative rounded-2xl border border-slate-200/90 bg-white p-6 text-right shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary">
                  {item.step}
                </span>
                <h3 className="font-headline text-lg font-bold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-on-surface-variant">{item.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-center text-sm font-medium text-on-surface-variant md:text-right">
            للبدء:{" "}
            <Link href="/contact" className="font-bold text-secondary underline-offset-2 hover:underline">
              اتصل بنا
            </Link>{" "}
            أو{" "}
            <Link href="/#book" className="font-bold text-secondary underline-offset-2 hover:underline">
              احجز من الصفحة الرئيسية
            </Link>
            .
          </p>
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
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">جاهزون لخطوة تجاه مساحة أنظف؟</h2>
            <p className="text-base text-on-primary-container/95">احجز موعداً أو راسلنا، وسنساعدك على اختيار الخدمة المناسبة.</p>
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
