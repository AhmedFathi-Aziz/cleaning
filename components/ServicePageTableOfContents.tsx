import Link from "next/link";

import type { ServiceTocNavItem } from "@/lib/service-page-toc";

type Props = {
  items: ServiceTocNavItem[];
};

/**
 * In-page navigation for long service URLs — anchors match `id` on sections (`#sec-*`).
 */
export function ServicePageTableOfContents({ items }: Props) {
  if (items.length < 2) return null;

  return (
    <nav
      aria-label="فهرس محتوى الصفحة"
      className="rounded-3xl border border-primary/15 bg-white p-5 shadow-sm md:p-6"
    >
      <h2 className="font-headline text-lg font-extrabold text-primary md:text-xl">فهرس المحتوى</h2>
      <p className="mt-2 text-sm font-medium leading-relaxed text-on-surface-variant">
        انتقل مباشرة إلى القسم المناسب — الروابط تستخدم تمريراً سلساً داخل الصفحة.
      </p>
      <ol className="mt-4 space-y-2 text-right text-sm font-semibold md:text-base">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-xl py-2 text-primary transition hover:bg-surface-container-low hover:text-secondary"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
