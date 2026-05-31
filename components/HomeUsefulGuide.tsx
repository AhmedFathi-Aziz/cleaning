import Link from "next/link";

import { Icon } from "@/components/Icon";

/**
 * محتوى تعليمي على الصفحة الرئيسية — نصائح عملية وروابط داخلية (SEO + فائدة للزائر).
 */
export function HomeUsefulGuide() {
  return (
    <section
      className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white px-4 py-16 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900 sm:px-6 md:px-8 md:py-20"
      aria-labelledby="useful-guide-heading"
    >
      <div className="mx-auto max-w-6xl text-right">
        <div className="mb-12 md:mb-14">
          <p className="text-sm font-extrabold text-secondary">دليل للمنزل والمنشأة</p>
          <h2 id="useful-guide-heading" className="mt-2 font-headline text-2xl font-extrabold text-primary sm:text-3xl md:text-4xl">
            نصائح عملية قبل وبعد خدمة التنظيف أو مكافحة الحشرات
          </h2>
          <p className="mt-4 max-w-3xl text-sm font-medium leading-[1.9] text-on-surface-variant sm:text-base">
            هدفنا أن تكون تجربتك واضحة من البداية. فيما يلي ملخص مفيد يمكنك الاحتفاظ به أو مشاركته مع من يخطط
            لطلب{" "}
            <Link href="/services" className="font-bold text-secondary underline-offset-2 hover:underline">
              خدمات التنظيف
            </Link>{" "}
            أو{" "}
            <Link href="/contact" className="font-bold text-secondary underline-offset-2 hover:underline">
              الاستفسار عن الموعد
            </Link>
            .
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_12px_40px_rgba(30,58,138,0.06)] dark:border-slate-800 dark:bg-slate-900/80 md:p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name="check_circle" className="text-2xl" />
            </div>
            <h3 className="font-headline text-lg font-extrabold text-primary md:text-xl">قبل وصول الفريق</h3>
            <ul className="mt-4 space-y-3 text-sm font-medium leading-8 text-on-surface-variant md:text-[0.9375rem]">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                حدّد نوع الخدمة: تنظيف عميق، سجاد، واجهات، أو مكافحة حشرات — وإن أمكن صوّر المنطقة أو اذكر حجم
                الغرف تقريباً.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                أخبرنا بوجود أطفال، كبار سن، أو حيوانات أليفة؛ لنساعد على اختيار موعد وطريقة مناسبة.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                راجع{" "}
                <Link href="/cleaning" className="font-bold text-secondary underline-offset-2 hover:underline">
                  أحياء الرياض
                </Link>{" "}
                أو{" "}
                <Link href="/areas" className="font-bold text-secondary underline-offset-2 hover:underline">
                  مناطق التغطية
                </Link>{" "}
                للتأكد من الحي.
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_12px_40px_rgba(30,58,138,0.06)] dark:border-slate-800 dark:bg-slate-900/80 md:p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name="water_drop" className="text-2xl" />
            </div>
            <h3 className="font-headline text-lg font-extrabold text-primary md:text-xl">التنظيف العميق والسجاد</h3>
            <ul className="mt-4 space-y-3 text-sm font-medium leading-8 text-on-surface-variant md:text-[0.9375rem]">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                التنظيف العميق مفيد بعد التشطيب، قبل المناسبات، أو عند تراكم الدهون والبقع التي يصعب إزالتها يدوياً.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                السجاد والموكيت يستفيد من جدولة دورية؛ التأخير قد يثبّت البقع ويصعّب إزالتها لاحقاً.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                لمزيد من التفاصيل:{" "}
                <Link href="/services/deep-home-cleaning" className="font-bold text-secondary underline-offset-2 hover:underline">
                  تنظيف منازل عميق
                </Link>{" "}
                و{" "}
                <Link href="/services/carpet-cleaning" className="font-bold text-secondary underline-offset-2 hover:underline">
                  غسيل سجاد
                </Link>
                .
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_12px_40px_rgba(30,58,138,0.06)] dark:border-slate-800 dark:bg-slate-900/80 md:p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name="pest_control" className="text-2xl" />
            </div>
            <h3 className="font-headline text-lg font-extrabold text-primary md:text-xl">مكافحة الحشرات بذكاء</h3>
            <ul className="mt-4 space-y-3 text-sm font-medium leading-8 text-on-surface-variant md:text-[0.9375rem]">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                تقليل بقايا الطعام، إغلاق القمامة، ومعالجة التسريبات يساعد على عدم عودة الحشرات بعد الخدمة.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                اسأل عن مدة التهوية أو أي احتياطات بعد الرش؛ اتباع التعليمات يحمي سكان المنزل.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                الجمع بين تنظيف جيد للمطبخ والمخازن وخطة مكافحة مناسبة غالباً يعطي نتيجة أكثر ثباتاً على المدى
                المتوسط.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                تصفّح{" "}
                <Link href="/guides/pest" className="font-bold text-secondary underline-offset-2 hover:underline">
                  موسوعة مكافحة الحشرات
                </Link>{" "}
                لمعرفة الصراصير والنمل وبق الفراش والسلامة بعد الرش.
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_12px_40px_rgba(30,58,138,0.06)] dark:border-slate-800 dark:bg-slate-900/80 md:p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name="apartment" className="text-2xl" />
            </div>
            <h3 className="font-headline text-lg font-extrabold text-primary md:text-xl">الواجهات والمكاتب</h3>
            <ul className="mt-4 space-y-3 text-sm font-medium leading-8 text-on-surface-variant md:text-[0.9375rem]">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                واجهة نظيفة تحسّن الانطباع أمام الزوار؛ الغبار والعوامل الجوية في السعودية تستدعي جدولة دورية.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                للمكاتب: تنسيق الموعد خارج أوقات الذروة يقلّل الإزعاج للموظفين والعملاء.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                تفاصيل الخدمة:{" "}
                <Link href="/services/facade-cleaning" className="font-bold text-secondary underline-offset-2 hover:underline">
                  تنظيف واجهات
                </Link>
                .
              </li>
            </ul>
          </article>
        </div>

        <div className="mt-12 rounded-2xl border border-dashed border-primary/25 bg-primary/[0.04] p-6 text-center md:mt-14 md:p-8">
          <p className="text-sm font-semibold leading-8 text-on-surface-variant md:text-base">
            تفضّل القراءة الطويلة؟ تصفح{" "}
            <Link href="/blog" className="font-extrabold text-secondary underline-offset-2 hover:underline">
              مدونتنا
            </Link>{" "}
            وصفحات{" "}
            <Link href="/features/trained-cleaning-team" className="font-extrabold text-secondary underline-offset-2 hover:underline">
              لماذا تختارنا
            </Link>{" "}
            لمزيد من الشروحات حول جودة التنفيذ والمواد والمواعيد.
          </p>
        </div>
      </div>
    </section>
  );
}
