import Link from "next/link";

import { Icon } from "@/components/Icon";
import { brandAddressAr, brandEmail, brandNameAr, brandNameEn, brandPhone } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="mt-auto min-h-[420px] w-full bg-slate-50 px-8 py-16 [contain-intrinsic-size:420px] [content-visibility:auto] dark:bg-slate-950"
      role="contentinfo"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 text-right md:grid-cols-4">
        <div className="space-y-6">
          <div className="font-headline text-xl font-bold text-blue-900 dark:text-blue-100">{brandNameAr}</div>
          <p className="text-sm leading-relaxed tracking-normal text-slate-600 dark:text-slate-400">
            {brandNameAr} شركة تنظيف في المملكة العربية السعودية؛ نسعى لتقديم أفضل الخدمات بأحدث الأساليب وأعلى
            معايير الأمان.
          </p>
        </div>
        <nav className="space-y-6" aria-label="روابط سريعة">
          <h2 className="text-base font-bold text-blue-900 dark:text-blue-400">روابط سريعة</h2>
          <ul className="space-y-4">
            <li>
              <Link
                className="block min-h-6 text-slate-600 transition-transform duration-200 hover:-translate-x-1 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/"
              >
                الرئيسية
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-6 text-slate-600 transition-transform duration-200 hover:-translate-x-1 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/services"
              >
                الخدمات
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-6 text-slate-600 transition-transform duration-200 hover:-translate-x-1 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/about"
              >
                من نحن
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-6 text-slate-600 transition-transform duration-200 hover:-translate-x-1 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/blog"
              >
                المدونة
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-6 text-slate-600 transition-transform duration-200 hover:-translate-x-1 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/admin"
              >
                لوحة المحرر
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-6 text-slate-600 transition-transform duration-200 hover:-translate-x-1 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/contact"
              >
                اتصل بنا
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="space-y-6" aria-label="معلومات قانونية">
          <h2 className="text-base font-bold text-blue-900 dark:text-blue-400">معلومات قانونية</h2>
          <ul className="space-y-4">
            <li>
              <Link
                className="block min-h-6 text-slate-600 transition-transform duration-200 hover:-translate-x-1 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="#"
              >
                سياسة الخصوصية
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-6 text-slate-600 transition-transform duration-200 hover:-translate-x-1 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="#"
              >
                شروط الاستخدام
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-6 text-slate-600 transition-transform duration-200 hover:-translate-x-1 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/areas"
              >
                مناطق التغطية
              </Link>
            </li>
          </ul>
        </nav>
        <div className="space-y-6">
          <h2 className="text-base font-bold text-blue-900 dark:text-blue-400">تواصل معنا</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">{brandAddressAr}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <a href={`mailto:${brandEmail}`} className="hover:underline">
              {brandEmail}
            </a>
          </p>
          <div className="flex justify-end gap-4 text-blue-900" aria-label="وسائل التواصل">
            <a
              href={`tel:${brandPhone}`}
              className="cursor-pointer transition-transform hover:scale-110"
              aria-label="اتصل بنا الآن عبر الهاتف"
            >
              <Icon name="phone_in_talk" className="text-xl" />
            </a>
            <a
              href={`mailto:${brandEmail}`}
              className="cursor-pointer transition-transform hover:scale-110"
              aria-label="راسلنا عبر البريد الإلكتروني"
            >
              <Icon name="mail" className="text-xl" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl border-t border-slate-200 pt-8 text-center md:text-right dark:border-slate-800">
        <p className="text-sm text-slate-500">
          © 2026 {brandNameAr} — {brandNameEn}. شركة تنظيف مرخّصة في المملكة العربية السعودية.
        </p>
      </div>
    </footer>
  );
}
