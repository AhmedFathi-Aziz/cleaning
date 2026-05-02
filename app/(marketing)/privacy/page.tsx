import type { Metadata } from "next";
import Link from "next/link";

import { brandNameAr } from "@/lib/brand";
import { buildArabicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildArabicPageMetadata({
  title: "سياسة الخصوصية",
  description:
    "سياسة الخصوصية لموقع السعودية للتنظيف: كيف نتعامل مع بيانات التواصل والاستفسارات في المملكة العربية السعودية.",
  canonical: "/privacy",
  keywords: ["سياسة خصوصية", "السعودية للتنظيف", "حماية البيانات"],
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold text-primary">سياسة الخصوصية</h1>
      <p className="mt-6 leading-8 text-on-surface-variant">
        {brandNameAr} تلتزم بالتعامل مع بيانات التواصل التي تصلنا عبر الموقع أو الهاتف أو البريد بما يتوافق مع الاستخدام
        المهني لخدمات التنظيف ومكافحة الحشرات فقط. لطلب نسخة مفصلة أو توضيح أي بند، يرجى{" "}
        <Link href="/contact" className="font-bold text-secondary underline hover:no-underline">
          التواصل معنا
        </Link>
        .
      </p>
    </main>
  );
}
