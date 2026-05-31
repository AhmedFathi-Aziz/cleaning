import Link from "next/link";

import { Icon } from "@/components/Icon";
import { brandAddressAr, brandEmail, brandNameAr, brandNameEn, brandPhone } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="w-full shrink-0 bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 sm:py-14 md:px-8 md:py-16"
      role="contentinfo"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 text-right md:grid-cols-4">
        {/* min-h يحدّ فرق الارتفاع بين خط الاحتياط وCairo عند الالتفاف — يقلّل CLS في Lighthouse */}
        <div className="min-h-[11.5rem] space-y-6 md:min-h-0">
          <div className="font-headline text-xl font-bold text-blue-900 dark:text-blue-100">{brandNameAr}</div>
          <p className="min-h-[7.5rem] text-sm leading-relaxed tracking-normal text-slate-600 dark:text-slate-400 md:min-h-[6.5rem]">
            {brandNameAr} شركة تنظيف ومكافحة حشرات في الرياض؛ موسوعة أحياء ودليل آفات على الموقع، مع خدمة منظّمة
            ومواد مناسبة وفريق مدرّب واحترام المواعيد.
          </p>
        </div>
        <nav className="space-y-6" aria-label="روابط سريعة">
          <h2 className="text-base font-bold text-blue-900 dark:text-blue-400">روابط سريعة</h2>
          <ul className="space-y-4">
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/"
              >
                الرئيسية
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/services"
              >
                الخدمات
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/guides/pest"
              >
                موسوعة الحشرات
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/cleaning"
              >
                أحياء الرياض
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/estimate"
              >
                حاسبة تقدير السعر
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/about"
              >
                من نحن
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/blog"
              >
                المدونة
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/news"
              >
                الأخبار الوطنية
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/careers"
              >
                الوظائف
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
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
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/privacy"
              >
                سياسة الخصوصية
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                href="/terms"
              >
                شروط الاستخدام
              </Link>
            </li>
            <li>
              <Link
                className="block min-h-10 py-2 text-slate-600 transition-colors duration-200 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
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
          <div className="flex justify-end gap-3 text-blue-900" aria-label="وسائل التواصل">
            <a
              href={`tel:${brandPhone}`}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-transparent text-blue-900 transition-colors hover:border-blue-900/15 hover:bg-blue-900/5"
              aria-label="اتصل بنا الآن عبر الهاتف"
            >
              <Icon name="phone_in_talk" className="text-xl" />
            </a>
            <a
              href={`mailto:${brandEmail}`}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-transparent text-blue-900 transition-colors hover:border-blue-900/15 hover:bg-blue-900/5"
              aria-label="راسلنا عبر البريد الإلكتروني"
            >
              <Icon name="mail" className="text-xl" />
            </a>
          </div>
        </div>
        <div className="mt-16 border-t border-slate-200 pt-8 text-center md:col-span-4 md:text-right dark:border-slate-800">
          <p className="text-sm text-slate-500">
            © 2026 {brandNameAr} — {brandNameEn}. تنظيف ومكافحة حشرات في الرياض.
          </p>
        </div>
      </div>
    </footer>
  );
}
