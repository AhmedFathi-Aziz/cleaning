import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { images } from "@/lib/assets";
import { brandWhatsapp } from "@/lib/brand";

const waPrefill =
  "السلام عليكم، أرغب بطلب كشف تسربات مع تقرير فني يمكن تقديمه لشركة المياه — يرجى التواصل لتحديد موعد.";

export function LeakReportSampleSection() {
  const waHref = `${brandWhatsapp}?text=${encodeURIComponent(waPrefill)}`;

  return (
    <section
      className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_16px_48px_rgba(15,23,42,0.06)] dark:border-slate-700/90 dark:bg-slate-900/40 md:p-10"
      aria-labelledby="leak-report-sample-heading"
    >
      <div className="pointer-events-none absolute -start-16 top-0 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" aria-hidden />
      <div className="relative grid gap-8 text-right md:grid-cols-[1fr_minmax(200px,280px)] md:items-start md:gap-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-400">
            إشارات ثقة — شفافية التقارير
          </p>
          <h2
            id="leak-report-sample-heading"
            className="mt-2 font-headline text-xl font-extrabold text-primary md:text-2xl"
          >
            نموذج «تقرير كشف تسربات» يُسلّم بعد الفحص
          </h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-on-surface-variant md:text-base">
            كثير من العملاء يبحثون عن{" "}
            <strong className="text-primary">تقرير معتمد أو تقرير فني</strong> لتقديمه لشركة المياه أو الجهات
            ذات العلاقة. الصورة أدناه توضّح <strong className="text-primary">الشكل المعتاد للتقرير</strong> بعد
            الزيارة الميدانية — وليست وثيقة رسمية صادرة عن موقع الويب.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-on-surface-variant md:text-base">
            بعد الكشف الفعلي يُعدّ الفريق الميداني ملخصاً بالنتائج المبدئية والتوصيات، بما يتوافق مع ما تم
            قياسه أو فحصه، حتى تستطيع متابعة الإجراءات لدى مزوّد الخدمة أو الصيانة.
          </p>
          <ul className="mt-5 space-y-2 text-sm font-medium text-on-surface-variant">
            <li className="flex items-start justify-end gap-2">
              <span>مرجع زيارة، تاريخ، منطقة — لتسهيل الأرشفة.</span>
              <Icon name="check_circle" className="mt-0.5 shrink-0 text-lg text-secondary" aria-hidden />
            </li>
            <li className="flex items-start justify-end gap-2">
              <span>ملخص الفحص (أجهزة، ضغط، تدفق — حسب الحالة).</span>
              <Icon name="check_circle" className="mt-0.5 shrink-0 text-lg text-secondary" aria-hidden />
            </li>
            <li className="flex items-start justify-end gap-2">
              <span>توقيع/ختم الفريق بعد التنفيذ — وليس في هذا النموذج البصري.</span>
              <Icon name="check_circle" className="mt-0.5 shrink-0 text-lg text-secondary" aria-hidden />
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-95"
            >
              <Icon name="chat" className="text-lg" aria-hidden />
              اطلب موعد كشف وتقرير
            </a>
            <Link href="/contact" className="text-sm font-bold text-secondary underline-offset-2 hover:underline">
              أو عبر صفحة التواصل
            </Link>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            النموذج البصري أعلاه للتوضيح فقط ولا يُعدّ إثباتاً فنياً أو تعاقدياً. أي التزام بالتقرير النهائي
            يكون بعد المعاينة والاتفاق مع فريق التنسيق.
          </p>
        </div>
        <figure className="relative mx-auto w-full max-w-[280px] shrink-0 md:mx-0">
          <div className="relative aspect-[595/842] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-md dark:border-slate-600 dark:bg-slate-800">
            <Image
              src={images.leakDetectionReportSample}
              alt="نموذج توضيحي لتقرير كشف تسربات المياه — شكل التقرير بعد الزيارة الفنية وليس وثيقة رسمية"
              title="معاينة شكل تقرير كشف التسربات للعميل ولجهات الخدمة"
              fill
              sizes="280px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="mt-2 text-center text-xs font-medium text-on-surface-variant">
            معاينة بصرية — PDF مكتمل يُزوّد بعد الزيارة
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
