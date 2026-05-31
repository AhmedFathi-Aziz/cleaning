import type { Metadata } from "next";
import Link from "next/link";

import { brandEmail, brandNameAr, brandPhoneDisplay } from "@/lib/brand";
import { buildArabicPageMetadata } from "@/lib/seo";

const lastUpdated = "2026-05-02";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "سياسة الخصوصية",
  description:
    "سياسة الخصوصية لموقع السعودية للتنظيف: البيانات التي نجمعها عند التواصل والحجز، الاستخدام، الاحتفاظ، ملفات تعريف الارتباط، وحقوقك — المملكة العربية السعودية.",
  canonical: "/privacy",
  keywords: ["سياسة خصوصية", "السعودية للتنظيف", "حماية البيانات", "ثقة المستخدم", "بيانات شخصية"],
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold text-primary">سياسة الخصوصية</h1>
      <p className="mt-2 text-sm font-medium text-on-surface-variant">
        آخر تحديث: {lastUpdated} — {brandNameAr}
      </p>
      <p className="mt-6 rounded-2xl border border-slate-200/90 bg-slate-50 p-4 text-sm leading-relaxed text-on-surface-variant dark:border-slate-700 dark:bg-slate-900/50">
        هذا النص معلوماتي لمساعدتك على فهم ممارساتنا تجاه البيانات الشخصية التي قد تصلنا عبر الموقع أو
        القنوات المرتبطة به. لا يُعد بديلاً عن استشارة قانونية مستقلة عند الحاجة.
      </p>

      <div className="mt-10 max-w-none text-right">
        <section className="mt-10" aria-labelledby="privacy-1">
          <h2 id="privacy-1" className="font-headline text-xl font-extrabold text-primary">
            1. من نحن في سياق هذه السياسة
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            يشير «نحن» أو «الشركة» إلى {brandNameAr} فيما يتعلق بموقع الويب والنماذج والتواصل المرتبط
            بطلب خدمات التنظيف ومكافحة الحشرات وتعقيم الخزانات وخدمات الكشف عن التسرب عند توفرها ضمن
            نطاق التنسيق.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="privacy-2">
          <h2 id="privacy-2" className="font-headline text-xl font-extrabold text-primary">
            2. ما البيانات التي قد نجمعها؟
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-base font-medium leading-relaxed text-on-surface-variant">
            <li>بيانات التواصل: الاسم، رقم الجوال، البريد الإلكتروني عند تقديمها.</li>
            <li>بيانات الطلب: نوع الخدمة، المدينة أو الحي تقريباً، وصف المساحة أو الصور التي تختار إرفاقها.</li>
            <li>بيانات تقنية: عنوان IP تقريبي، نوع المتصفح، ووقت الطلب — عبر الاستضافة أو أدوات التحليل إن وُجدت.</li>
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="privacy-3">
          <h2 id="privacy-3" className="font-headline text-xl font-extrabold text-primary">
            3. لماذا نستخدم البيانات؟
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            لمعالجة استفساراتك وتنسيق المواعيد، وللتواصل معك بخصوص الخدمة، ولتحسين تجربة الموقع ولمنع
            إساءة الاستخدام. لا نبيع قوائم عملاء لأطراف تسويقية عشوائية.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="privacy-4">
          <h2 id="privacy-4" className="font-headline text-xl font-extrabold text-primary">
            4. الأساس القانوني والموقع
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            نعالج البيانات في إطار تقديم الخدمة التي طلبتها أو سألت عنها، وبما يتوافق مع الأنظمة المعمول
            بها في المملكة العربية السعودية قدر الإمكان. قد تُخزّن بعض البيانات على خوادم خارج المملكة إذا
            كانت الاستضافة أو الأدوات المستخدمة تقتضي ذلك — مع مراعاة أمن النقل والتخزين المعقول.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="privacy-5">
          <h2 id="privacy-5" className="font-headline text-xl font-extrabold text-primary">
            5. الاحتفاظ والحذف
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            نحتفظ ببيانات التواصل والطلبات للمدة اللازمة لتنفيذ الخدمة والمتابعة والالتزامات المحاسبية أو
            النزاعات إن وُجدت. يمكنك طلب حذف بيانات غير لازمة قانونياً عبر قنواتنا أدناه، وسنعالج الطلب
            خلال مدة معقولة.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="privacy-6">
          <h2 id="privacy-6" className="font-headline text-xl font-extrabold text-primary">
            6. ملفات تعريف الارتباط والتحليلات
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            قد يستخدم الموقع ملفات تعريف ارتباط ضرورية للتشغيل، أو أدوات تحليلات لتجميع إحصاءات مجهولة
            المصدر عن الزيارات. إن أضفنا لاحقاً لوحة موافقة للملفات غير الضرورية، سيُذكر ذلك هنا.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="privacy-7">
          <h2 id="privacy-7" className="font-headline text-xl font-extrabold text-primary">
            7. الأمن
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            نطبّق إجراءات أمنية معقولة (مثل الاتصال المشفّر HTTPS) لكن لا يوجد نقل آمن بنسبة 100٪ على
            الإنترنت؛ يرجى عدم إرسال معلومات سرية غير لازمة عبر النماذج العامة.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="privacy-8">
          <h2 id="privacy-8" className="font-headline text-xl font-extrabold text-primary">
            8. حقوقك
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            يمكنك طلب الاطلاع على نسخة من بياناتك الأساسية التي لدينا، أو تصحيحها، أو الاعتراض على معالجة
            غير مبررة — عبر{" "}
            <Link href="/contact" className="font-bold text-secondary underline hover:no-underline">
              صفحة التواصل
            </Link>{" "}
            أو البريد {brandEmail} أو الهاتف {brandPhoneDisplay}.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="privacy-9">
          <h2 id="privacy-9" className="font-headline text-xl font-extrabold text-primary">
            9. تعديلات هذه السياسة
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-on-surface-variant">
            قد نحدّث هذه الصفحة من وقت لآخر. يُفضّل مراجعتها دورياً؛ تاريخ آخر تحديث يظهر أعلى الصفحة.
          </p>
        </section>
      </div>
    </main>
  );
}
