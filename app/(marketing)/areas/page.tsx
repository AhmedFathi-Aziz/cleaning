import Link from "next/link";
import type { Metadata } from "next";

import { HubFaqSection } from "@/components/HubFaqSection";
import { Icon } from "@/components/Icon";
import { AreasCoverageJsonLd } from "@/components/SeoJsonLd";
import { areasPageFaqs } from "@/lib/content/hub-faqs";
import { neighborhoodLinkAccessibleLabel } from "@/lib/neighborhood-link-label";
import { buildArabicPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { locations } from "@/src/data/locations";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "مناطق تغطية تنظيف بالرياض | أحياء العاصمة — السعودية للتنظيف",
  description:
    "مناطق تغطية شركة تنظيف بالرياض — أحياء شمال ووسط وشرق العاصمة. اختر حيك واحجز تنظيف منازل أو مكافحة حشرات. تواصل عبر واتساب للمعاينة المجانية.",
  canonical: "/areas",
  keywords: [
    "مناطق تغطية تنظيف الرياض",
    "أحياء الرياض تنظيف",
    "شركة تنظيف قريبة مني",
    "تنظيف منازل حسب الحي",
  ],
});

export default function AreasPage() {
  return (
    <main className="bg-slate-50 px-6 pb-24 pt-28 md:px-8">
      <AreasCoverageJsonLd />
      <section className="mx-auto max-w-6xl text-right">
        <header className="rounded-[2rem] bg-white p-8 shadow-[0_18px_55px_rgba(30,58,138,0.08)] md:p-12">
          <p className="mb-4 text-sm font-extrabold text-secondary">مناطق التغطية</p>
          <h1 className="font-headline text-3xl font-extrabold leading-tight text-primary md:text-5xl">
            مناطق تغطية تنظيف بالرياض
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-on-surface-variant md:text-lg">
            مناطق تغطية تنظيف بالرياض تشمل أحياء شمال العاصمة (النرجس، الياسمين، الملقا، حطين)، وسطها
            (العليا، الملك فهد، الملز)، وشرقها (النخيل، المروج، القدس). كل حي له صفحة مخصّصة لخدمات
            التنظيف ومكافحة الحشرات — اختر حيك أدناه أو{" "}
            <Link href="/contact" className="font-bold text-secondary underline-offset-2 hover:underline">
              احجز عبر واتساب
            </Link>
            .
          </p>
        </header>

        <section
          className="mt-8 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm md:p-10"
          aria-labelledby="areas-guide-heading"
        >
          <h2 id="areas-guide-heading" className="font-headline text-xl font-extrabold text-primary md:text-2xl">
            كيف تستفيد من صفحة المناطق؟
          </h2>
          <div className="mt-5 space-y-4 text-sm font-medium leading-[1.9] text-on-surface-variant md:text-base">
            <p>
              كل رابط حي يوجّهك إلى صفحة مخصّصة تجمع بين اسم المدينة والحي، ما يساعد محركات البحث والزائر على
              فهم أن خدمات التنظيف أو مكافحة الحشرات مرتبطة بموقع جغرافي واضح — والتركيز الحالي على الرياض. إن كنت تبحث عن{" "}
              <strong className="text-primary">شركة تنظيف قريبة من حيك</strong>، ابدأ من القائمة أدناه ثم انتقل
              إلى صفحة الخدمة التي تحتاجها من القائمة الرئيسية للموقع.
            </p>
            <p>
              إذا لم تجد حيك مذكوراً، لا يعني ذلك بالضرورة عدم التغطية: توسّع الشبكة مع الوقت، ولذلك يُنصح
              بمراجعة{" "}
              <Link href="/contact" className="font-bold text-secondary underline-offset-2 hover:underline">
                صفحة اتصل بنا
              </Link>{" "}
              أو التواصل عبر واتساب لتأكيد إمكانية الزيارة وموعد تقريبي.
            </p>
            <p>
              للمكاتب والمنشآت التجارية، اذكر نوع المبنى وعدد الطوابق عند الطلب؛ فتنظيف الواجهات أو التنظيف
              الدوري قد يختلف حسب المساحة وساعات العمل. راجع أيضاً{" "}
              <Link href="/cleaning" className="font-bold text-secondary underline-offset-2 hover:underline">
                موسوعة تنظيف الأحياء
              </Link>{" "}
              و{" "}
              <Link href="/services" className="font-bold text-secondary underline-offset-2 hover:underline">
                صفحات الخدمات
              </Link>{" "}
              للتفاصيل الكاملة.
            </p>
          </div>
        </section>

        <section
          className="mt-8 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm md:p-10"
          aria-labelledby="areas-riyadh-heading"
        >
          <h2 id="areas-riyadh-heading" className="font-headline text-xl font-extrabold text-primary md:text-2xl">
            أحياء الرياض وخصائص التنظيف في كل منطقة
          </h2>
          <div className="mt-5 space-y-4 text-sm font-medium leading-[1.9] text-on-surface-variant md:text-base">
            <p>
              <strong className="text-primary">شمال الرياض</strong> (النرجس، الياسمين، الملقا): تكثر الفلل
              والمجمعات السكنية الفاخرة — طلبات تنظيف المجالس وغسيل السجاد قبل الاستقبال شائعة. الغبار بعد
              الرياح يتراكم على الشرفات الواسعة.
            </p>
            <p>
              <strong className="text-primary">وسط الرياض</strong> (العليا، الملك فهد، الملز): أبراج سكنية
              وشقق علوية — ننسّق مع الحارس والمصعد. تنظيف المطابخ المفتوحة على الصالة مطلوب بسبب تراكم الدهون.
            </p>
            <p>
              <strong className="text-primary">شرق الرياض</strong> (النخيل، المروج، القدس): عائلات تطلب زيارات
              دورية أسبوعية — نلتزم بقواعد الهدوء في المجمعات المغلقة.
            </p>
            <p>
              نفّذنا أكثر من 500 مشروع تنظيف ومكافحة حشرات في أحياء العاصمة. للحجز السريع{" "}
              <Link href="/services/cleaning-company-riyadh" className="font-bold text-secondary underline-offset-2 hover:underline">
                شركة تنظيف بالرياض
              </Link>{" "}
              أو{" "}
              <Link href="/services/pest-control" className="font-bold text-secondary underline-offset-2 hover:underline">
                مكافحة حشرات
              </Link>
              .
            </p>
          </div>
        </section>

        <HubFaqSection
          faqs={areasPageFaqs}
          heading="أسئلة شائعة عن مناطق التغطية"
          description="إجابات سريعة قبل أن تختار حيك وتحجز الخدمة."
          schemaId="faq"
          schemaUrl={`${siteUrl}/areas`}
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((city) => (
            <section id={`city-${city.slug}`} key={city.slug} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="font-headline text-2xl font-extrabold text-primary">{city.name}</h2>
                <Icon name="apartment" className="text-3xl text-secondary" />
              </div>
              <ul className="grid gap-3">
                {city.neighborhoods.map((neighborhood) => (
                  <li key={neighborhood.slug}>
                    <Link
                      href={`/${city.slug}/${neighborhood.slug}`}
                      className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3 text-sm font-bold text-on-surface-variant transition hover:bg-primary hover:text-white"
                    >
                      <span>{neighborhoodLinkAccessibleLabel(neighborhood.name, city.name)}</span>
                      <Icon name="arrow_back" className="text-base" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
