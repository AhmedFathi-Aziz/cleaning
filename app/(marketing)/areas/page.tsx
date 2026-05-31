import Link from "next/link";
import type { Metadata } from "next";

import { Icon } from "@/components/Icon";
import { AreasCoverageJsonLd } from "@/components/SeoJsonLd";
import { neighborhoodLinkAccessibleLabel } from "@/lib/neighborhood-link-label";
import { buildArabicPageMetadata } from "@/lib/seo";
import { locations } from "@/src/data/locations";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "مناطق التغطية — الرياض وأحياء العاصمة",
  description:
    "تغطية أحياء الرياض لخدمات التنظيف ومكافحة الحشرات، مع قائمة مدن أخرى عند الطلب وروابط مباشرة لكل حي.",
  canonical: "/areas",
  keywords: ["مناطق تغطية تنظيف الرياض", "أحياء الرياض تنظيف", "شركة تنظيف قريبة مني"],
});

export default function AreasPage() {
  return (
    <main className="bg-slate-50 px-6 pb-24 pt-28 md:px-8">
      <AreasCoverageJsonLd />
      <section className="mx-auto max-w-6xl text-right">
        <header className="rounded-[2rem] bg-white p-8 shadow-[0_18px_55px_rgba(30,58,138,0.08)] md:p-12">
          <p className="mb-4 text-sm font-extrabold text-secondary">مناطق التغطية</p>
          <h1 className="font-headline text-3xl font-extrabold leading-tight text-primary md:text-5xl">
            مناطق التغطية — الرياض أولاً
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-on-surface-variant md:text-lg">
            التغطية الرئيسية في أحياء الرياض عبر صفحات تنظيف ومكافحة حشرات مخصّصة. المدن الأخرى مدرجة أدناه عند
            الطلب مع نفس بنية الروابط دون تغيير المسارات.
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
              الدوري قد يختلف حسب المساحة وساعات العمل.
            </p>
          </div>
        </section>

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
