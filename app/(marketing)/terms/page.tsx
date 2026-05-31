import type { Metadata } from "next";
import Link from "next/link";

import { brandEmail, brandNameAr, brandPhoneDisplay } from "@/lib/brand";
import { buildArabicPageMetadata } from "@/lib/seo";

const lastUpdated = "2026-05-02";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "شروط الاستخدام",
  description:
    "شروط استخدام موقع السعودية للتنظيف: نطاق الخدمة، التقديرات، سلوك المستخدم، الملكية الفكرية، حدود المسؤولية، والتواصل — المملكة العربية السعودية.",
  canonical: "/terms",
  keywords: [
    "شروط الاستخدام",
    "السعودية للتنظيف",
    "خدمات تنظيف",
    "شروط الخدمة",
    "ثقة المستخدم",
  ],
});

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold text-primary">شروط الاستخدام</h1>
      <p className="mt-2 text-sm font-medium text-on-surface-variant">
        آخر تحديث: {lastUpdated} — {brandNameAr}
      </p>
      <p className="mt-6 rounded-2xl border border-slate-200/90 bg-slate-50 p-4 text-sm leading-relaxed text-on-surface-variant dark:border-slate-700 dark:bg-slate-900/50">
        باستخدامك للموقع فإنك تقر بأنك قرأت هذه الشروط وفهمتها. للاستفسارات التعاقدية التفصيلية، راسلنا
        عبر القنوات الرسمية أدناه.
      </p>

      <div className="mt-10 max-w-none text-right">
        <section className="mt-10" aria-labelledby="terms-1">
          <h2 id="terms-1" className="font-headline text-xl font-extrabold text-primary">
            1. قبول الشروط
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            يخضع استخدامك لموقع {brandNameAr} والنماذج والروابط المرتبطة به لهذه الشروط. إن لم توافق،
            يُرجى الامتناع عن استخدام الموقع لطلب خدمات.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="terms-2">
          <h2 id="terms-2" className="font-headline text-xl font-extrabold text-primary">
            2. طبيعة الموقع والخدمات
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            الموقع يعرض معلومات عامة عن خدمات التنظيف ومكافحة الحشرات وتعقيم الخزانات وخدمات الكشف عن
            التسرب ضمن نطاق التنسيق. الخدمة الفعلية، سعرها، وموعدها يُحدَّدان بعد التواصل الرسمي وقد تتطلب
            معاينة ميدانية.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="terms-3">
          <h2 id="terms-3" className="font-headline text-xl font-extrabold text-primary">
            3. التقديرات والحاسبات
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            أي تقدير إلكتروني (مثل حاسبة السعر) هو أداة مساعدة وليس عرضاً ملزماً. السعر النهائي يعتمد على
            تقييم الفريق، المساحة، نوع الأسطح، وصعوبة الوصول، وغير ذلك من العوامل الميدانية.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="terms-4">
          <h2 id="terms-4" className="font-headline text-xl font-extrabold text-primary">
            4. سلوك المستخدم
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            يُحظر استخدام الموقع لإرسال محتوى غير قانوني أو مضلل أو مسيء، أو لمحاولة تعطيل الخوادم أو
            اختبار اختراق غير مصرح به. نحتفظ بحق تقييد أو إيقاف الطلبات عند إساءة الاستخدام.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="terms-5">
          <h2 id="terms-5" className="font-headline text-xl font-extrabold text-primary">
            5. الملكية الفكرية
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            النصوص والتصميم والعلامات ضمن الموقع محمية. لا يجوز نسخها لأغراض تجارية دون إذن كتابي، مع
            السماح بالاقتباس المعقول للأغراض الإعلامية مع الإشارة للمصدر.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="terms-6">
          <h2 id="terms-6" className="font-headline text-xl font-extrabold text-primary">
            6. حدود المسؤولية
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            الموقع يُقدَّم «كما هو» ضمن حدود معقولة. لا نتحمل أضراراً غير مباشرة ناتجة عن انقطاع الاستضافة
            أو أخطاء في المحتوى العام، بقدر ما يسمح به النظام. التزامات التنفيذ الفعلي تُنظم بالاتفاق مع
            فريق التنسيق وليس بمحتوى الصفحات العامة وحده.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="terms-7">
          <h2 id="terms-7" className="font-headline text-xl font-extrabold text-primary">
            7. التقارير والوثائق
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            أي نماذج أو صور توضيحية للتقارير على الموقع هي للإيضاح فقط ولا تُعد وثائق رسمية صادرة إلا بعد
            المعاينة والاتفاق. تقديم تقرير لجهة خارجية (مثل شركة مياه) يخضع لشروط تلك الجهة.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="terms-8">
          <h2 id="terms-8" className="font-headline text-xl font-extrabold text-primary">
            8. القانون والنزاعات
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            تُفضّل تسوية أي خلاف وديّاً. عند الاقتضاء، تختص المحاكم في المملكة العربية السعودية دون إخلال
            بأي التزام إلزامي أقوى للمستهلك.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="terms-9">
          <h2 id="terms-9" className="font-headline text-xl font-extrabold text-primary">
            9. التواصل والخصوصية
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            لطلبات قانونية أو خصوصية، راجع{" "}
            <Link href="/privacy" className="font-bold text-secondary underline hover:no-underline">
              سياسة الخصوصية
            </Link>{" "}
            أو راسلنا عبر{" "}
            <Link href="/contact" className="font-bold text-secondary underline hover:no-underline">
              التواصل
            </Link>
            — {brandEmail} — {brandPhoneDisplay}.
          </p>
        </section>
      </div>
    </main>
  );
}
