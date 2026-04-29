"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { brandLogoPath } from "@/lib/brand";

function navClass(active: boolean) {
  return active
    ? "border-b-2 border-blue-900 pb-1 font-bold text-blue-900 dark:border-blue-300 dark:text-blue-300"
    : "border-b-2 border-transparent pb-1 font-medium text-slate-500 transition-all duration-300 hover:text-blue-800 dark:text-slate-400 dark:hover:text-blue-200";
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 z-50 h-16 w-full bg-white/80 shadow-[0_12px_40px_rgba(30,58,138,0.06)] backdrop-blur-xl dark:bg-slate-900/80"
      role="banner"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-8">
        <div className="font-headline text-xl font-extrabold tracking-tighter text-blue-950 dark:text-white">
          <Link href="/" className="hover:opacity-90" aria-label="السعودية للتنظيف — الصفحة الرئيسية">
            <span className="inline-flex items-center gap-2">
              <Image
                src={brandLogoPath}
                alt=""
                width={36}
                height={36}
                className="h-8 w-8 object-contain"
                aria-hidden="true"
              />
              <span>السعودية للتنظيف</span>
            </span>
          </Link>
        </div>
        <nav className="hidden text-sm md:block" aria-label="التنقل الرئيسي">
          <ul className="flex items-center gap-7">
            <li>
              <Link
                href="/"
                className={navClass(pathname === "/")}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                الرئيسية
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className={navClass(pathname.startsWith("/services"))}
                aria-current={pathname.startsWith("/services") ? "page" : undefined}
              >
                الخدمات
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={navClass(pathname.startsWith("/about"))}
                aria-current={pathname.startsWith("/about") ? "page" : undefined}
              >
                من نحن
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={navClass(pathname.startsWith("/blog"))}
                aria-current={pathname.startsWith("/blog") ? "page" : undefined}
              >
                المدونة
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={navClass(pathname === "/contact")}
                aria-current={pathname === "/contact" ? "page" : undefined}
              >
                اتصل بنا
              </Link>
            </li>
          </ul>
        </nav>
        <Link
          href="/#book"
          className="liquid-gradient scale-95 whitespace-nowrap rounded-full px-7 py-2.5 text-sm font-bold text-on-primary shadow-lg transition-transform active:opacity-80"
        >
          احجز الآن
        </Link>
      </div>
    </header>
  );
}
