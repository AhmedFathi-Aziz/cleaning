import type { Metadata } from "next";
import Link from "next/link";

import { brandNameAr } from "@/lib/brand";
import { buildArabicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "شروط الاستخدام",
  description:
    "شروط استخدام موقع السعودية للتنظيف وطلب خدمات التنظيف ومكافحة الحشرات في المملكة العربية السعودية.",
  canonical: "/terms",
  keywords: ["شروط الاستخدام", "السعودية للتنظيف", "خدمات تنظيف"],
});

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold text-primary">شروط الاستخدام</h1>
      <p className="mt-6 leading-8 text-on-surface-variant">
        استخدامك لموقع {brandNameAr} يعني موافقتك على الاطلاع على تفاصيل الخدمة والأسعار والمواعيد عبر قنواتنا
        الرسمية. لأي استفسار قانوني أو تعاقدي، يُرجى{" "}
        <Link href="/contact" className="font-bold text-secondary underline hover:no-underline">
          مراسلتنا عبر صفحة التواصل
        </Link>
        .
      </p>
    </main>
  );
}
