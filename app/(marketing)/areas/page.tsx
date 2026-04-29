import Link from "next/link";
import type { Metadata } from "next";

import { Icon } from "@/components/Icon";
import { buildArabicPageMetadata } from "@/lib/seo";
import { locations } from "@/src/data/locations";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "مناطق التغطية لخدمات التنظيف في السعودية",
  description:
    "تعرف على مناطق تغطية السعودية للتنظيف في المدن والأحياء الرئيسية داخل المملكة، مع روابط مباشرة لخدمات التنظيف حسب المدينة والحي.",
  canonical: "/areas",
  keywords: ["مناطق تغطية شركة تنظيف", "خدمات تنظيف في أحياء السعودية", "شركة تنظيف قريبة مني"],
});

export default function AreasPage() {
  return (
    <main className="bg-slate-50 px-6 pb-24 pt-28 md:px-8">
      <section className="mx-auto max-w-6xl text-right">
        <header className="rounded-[2rem] bg-white p-8 shadow-[0_18px_55px_rgba(30,58,138,0.08)] md:p-12">
          <p className="mb-4 text-sm font-extrabold text-secondary">مناطق التغطية</p>
          <h1 className="font-headline text-3xl font-extrabold leading-tight text-primary md:text-5xl">
            خدمات التنظيف في مدن وأحياء السعودية
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-on-surface-variant md:text-lg">
            اختر مدينتك والحي الأقرب لك للوصول إلى صفحة خدمة تنظيف مخصصة بمحتوى محلي وروابط مباشرة للحجز.
          </p>
        </header>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((city) => (
            <section key={city.slug} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
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
                      <span>{neighborhood.name}</span>
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
