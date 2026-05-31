"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/Icon";
import { getMarketingRelatedLinks } from "@/lib/related-service-links";

/**
 * روابط داخلية في أسفل الصفحة — يعتمد على مسار الصفحة الحالي.
 */
export function RelatedServicesSection() {
  const pathname = usePathname() ?? "/";
  const links = getMarketingRelatedLinks(pathname);

  return (
    <section
      className="border-t border-slate-200 bg-slate-100/80 px-4 py-12 dark:border-slate-800 dark:bg-slate-900/40 sm:px-6 md:px-8 md:py-14"
      aria-labelledby="related-services-heading"
    >
      <div className="mx-auto max-w-7xl text-right">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-extrabold text-secondary">روابط داخلية مفيدة</p>
            <h2
              id="related-services-heading"
              className="mt-1 font-headline text-2xl font-extrabold text-primary md:text-3xl"
            >
              خدمات ذات صلة ومناطق التغطية
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-on-surface-variant md:text-base">
              انتقل إلى خدمات قريبة من احتياجك أو إلى صفحة المناطق لتقليل مسار الحجز — كل رابط بنص يصف الصفحة
              لدعم فهم محركات البحث والمستخدم معاً.
            </p>
          </div>
        </div>

        <nav aria-label="خدمات ذات صلة وروابط تغطية">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md dark:border-slate-700 dark:bg-slate-950"
                >
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                    <Icon name="arrow_back" className="text-lg rtl:rotate-180" />
                  </span>
                  <span className="font-headline text-base font-extrabold leading-snug text-primary group-hover:text-secondary md:text-lg">
                    {item.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm font-medium leading-relaxed text-on-surface-variant">
                    {item.description}
                  </span>
                  <span className="mt-4 text-xs font-bold text-secondary opacity-90 group-hover:underline">
                    اطّلع على الصفحة
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
