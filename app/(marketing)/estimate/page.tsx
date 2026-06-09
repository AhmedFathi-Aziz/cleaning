import type { Metadata } from "next";

import { LeakReportSampleSection } from "@/components/leak-detection/LeakReportSampleSection";
import { PriceEstimatorViewportGate } from "@/components/price-estimator/PriceEstimatorViewportGate";
import { brandNameAr } from "@/lib/brand";
import { buildArabicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "حاسبة سعر تنظيف بالرياض | تقدير مجاني",
  description:
    "احسب تقدير سعر تنظيف منازل ومكافحة حشرات وتعقيم خزانات في الرياض — أداة مجانية ثم أرسل عبر واتساب. بدون التزام حتى يرد الفريق.",
  canonical: "/estimate",
  keywords: [
    "سعر تنظيف منزل الرياض",
    "تكلفة تنظيف شقة",
    "سعر مكافحة حشرات الرياض",
    "عرض سعر تنظيف",
    "حاسبة تنظيف",
    "تقدير تنظيف الرياض",
    "سعر تنظيف خزان مياه",
    "أرخص شركة تنظيف منازل بالرياض",
  ],
});

export default function PriceEstimatePage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-[#f4f6f9] to-slate-50 px-4 pb-28 pt-28 dark:from-slate-950 dark:via-[#0c1118] dark:to-slate-950 sm:px-6 md:px-8 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 35, 111, 0.18), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(180, 140, 60, 0.06), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-4xl text-right">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700/90 dark:text-amber-400/90">
          أداة رسمية — تقدير أولي
        </p>
        <h1 className="mt-3 font-headline text-3xl font-extrabold leading-[1.2] text-primary md:text-[2.35rem]">
          حاسبة سعر تنظيف ومكافحة حشرات بالرياض
        </h1>
        <p className="mt-5 max-w-2xl border-e-[3px] border-amber-500/80 pe-5 text-base font-medium leading-relaxed text-on-surface-variant">
          الحاسبة تشمل تنظيف المنزل أو الشقة، ومكافحة الحشرات والرش، وتنظيف وتعقيم خزانات المياه — اختر النوع
          والتفاصيل ثم تابع عبر واتساب. يساعد ذلك فريق التنسيق على فهم احتياجك في حيّك بالرياض بدقة مهنية.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-4xl">
        <PriceEstimatorViewportGate />
      </div>

      <LeakReportSampleSection />

      <section
        className="relative mx-auto mt-16 max-w-4xl border-t border-slate-200/90 pt-14 text-right dark:border-slate-700/90"
        aria-labelledby="estimate-widget-seo-heading"
      >
        <h2
          id="estimate-widget-seo-heading"
          className="font-headline text-xl font-extrabold text-primary md:text-2xl"
        >
          كيف تعمل حاسبة التقدير؟
        </h2>
        <div className="mt-6 space-y-4 text-base font-medium leading-relaxed text-on-surface-variant">
          <p>
            تساعدك الأداة على تلخيص نوع الخدمة: تنظيف عام للمنزل أو الشقة، أو مكافحة حشرات مع رش وفق نطاق المسكن،
            أو تنظيف وتعقيم خزانات المياه مع نوع الخزان والسعة التقريبية — ثم تُرسل طلباً منظماً لفريق{" "}
            {brandNameAr} عبر واتساب.             لا يُعرض سعر نهائي على الشاشة؛ يُبنى العرض بعد مراجعة الفريق وربما المعاينة، بما يوازن السعر مع
            نطاق العمل والحي في الرياض.
          </p>
          <p>
            عند البحث عن <strong className="font-bold text-primary">أرخص أسعار شركات التنظيف</strong> تذكّر
            أن الأقل سعراً ليس دائماً الأنسب لجودة التعقيم أو سلامة المواد؛ الحاسبة تهدف إلى توضيح احتياجك
            أولاً، ثم يتواصل معك التنسيق بعرض يوازن السعر مع نطاق العمل والموقع.
          </p>
          <p>
            إن كنت تحتاج تقديراً لمساحة كبيرة أو لخدمات إضافية، اذكر ذلك في رسالة واتساب بعد الإرسال — فكلما
            كانت البيانات أوضح، كان الرد أسرع وأدق.
          </p>
        </div>
      </section>
    </main>
  );
}
