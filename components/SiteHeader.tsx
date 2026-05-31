"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Icon } from "@/components/Icon";
import { brandLogoPath } from "@/lib/brand";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية", isActive: (p: string) => p === "/" },
  { href: "/services", label: "الخدمات", isActive: (p: string) => p.startsWith("/services") },
  { href: "/guides/pest", label: "موسوعة الحشرات", isActive: (p: string) => p.startsWith("/guides/pest") },
  { href: "/cleaning", label: "أحياء الرياض", isActive: (p: string) => p.startsWith("/cleaning") },
  { href: "/estimate", label: "تقدير السعر", isActive: (p: string) => p === "/estimate" },
  { href: "/about", label: "من نحن", isActive: (p: string) => p.startsWith("/about") },
  { href: "/news", label: "أخبار وطنية", isActive: (p: string) => p.startsWith("/news") },
  { href: "/blog", label: "المدونة", isActive: (p: string) => p.startsWith("/blog") },
  { href: "/contact", label: "اتصل بنا", isActive: (p: string) => p === "/contact" },
] as const;

function navClass(active: boolean) {
  return active
    ? "border-b-2 border-blue-900 pb-1 font-bold text-blue-900 dark:border-blue-300 dark:text-blue-300"
    : "border-b-2 border-transparent pb-1 font-medium text-slate-500 transition-all duration-300 hover:text-blue-800 dark:text-slate-400 dark:hover:text-blue-200";
}

function mobileRowClass(active: boolean) {
  return active
    ? "border-e-[3px] border-blue-900 bg-blue-50/90 pe-4 font-bold text-blue-900 dark:border-blue-300 dark:bg-slate-800/80 dark:text-blue-200"
    : "border-e-[3px] border-transparent pe-4 font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/60";
}

export function SiteHeader() {
  const pathname = usePathname();
  const path = pathname ?? "";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuPanelId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [path, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 50);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <header
      className="fixed top-0 z-50 h-16 w-full bg-white/80 shadow-[0_12px_40px_rgba(30,58,138,0.06)] backdrop-blur-xl dark:bg-slate-900/80"
      role="banner"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-8">
        <div className="min-w-0 font-headline text-lg font-extrabold tracking-tighter text-blue-950 dark:text-white sm:text-xl">
          <Link href="/" className="hover:opacity-90" aria-label="السعودية للتنظيف — الصفحة الرئيسية">
            <span className="inline-flex max-w-[calc(100vw-11rem)] items-center gap-2 sm:max-w-none">
              <Image
                src={brandLogoPath}
                alt=""
                width={36}
                height={36}
                className="h-8 w-8 shrink-0 object-contain"
                aria-hidden="true"
              />
              <span className="truncate">السعودية للتنظيف</span>
            </span>
          </Link>
        </div>

        <nav className="hidden text-sm md:block" aria-label="التنقل الرئيسي">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((item) => {
              const active = item.isActive(path);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={navClass(active)}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-900 shadow-sm transition hover:bg-slate-50 md:hidden dark:border-slate-600 dark:bg-slate-800 dark:text-blue-100 dark:hover:bg-slate-700"
            aria-expanded={menuOpen}
            aria-controls={menuPanelId}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح قائمة التنقل"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <Icon name="close" className="h-6 w-6" /> : <Icon name="menu" className="h-6 w-6" />}
          </button>
          <Link
            href="/#book"
            className="liquid-gradient scale-95 whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-bold text-on-primary shadow-lg transition-transform active:opacity-80 sm:px-7 sm:text-sm"
          >
            احجز الآن
          </Link>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-16 z-[55] bg-slate-900/50 backdrop-blur-sm md:hidden"
            aria-label="إغلاق القائمة"
            onClick={closeMenu}
          />
          <div
            id={menuPanelId}
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
            className="fixed end-0 top-16 z-[60] flex h-[calc(100dvh-4rem)] w-[min(100%,20rem)] flex-col border-s border-slate-200/90 bg-white shadow-[-12px_0_40px_rgba(30,58,138,0.12)] dark:border-slate-700 dark:bg-slate-900 md:hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
              <span className="text-sm font-bold text-primary">القائمة</span>
              <button
                ref={closeBtnRef}
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="إغلاق"
                onClick={closeMenu}
              >
                <Icon name="close" className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="التنقل الرئيسي — جوال">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((item, index) => {
                  const active = item.isActive(path);
                  return (
                    <li key={item.href}>
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        className={`block rounded-xl py-3 ps-4 text-end text-base ${mobileRowClass(active)}`}
                        aria-current={active ? "page" : undefined}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="border-t border-slate-100 p-4 dark:border-slate-800">
              <Link
                href="/#book"
                className="liquid-gradient flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold text-on-primary shadow-md"
                onClick={closeMenu}
              >
                احجز الآن
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
