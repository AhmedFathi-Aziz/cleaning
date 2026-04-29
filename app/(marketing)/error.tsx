"use client";

import { useEffect } from "react";
import Link from "next/link";

import { brandNameAr } from "@/lib/brand";

/** يمسك أخطاء الصفحات داخل (marketing) — التخطيط (الهيدر/الفوتر) يظل ظاهراً */
export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-8 bg-background px-8 py-24 text-center">
      <div className="max-w-md space-y-3">
        <h1 className="font-headline text-2xl font-bold text-primary md:text-3xl">حدث خطأ غير متوقع</h1>
        <p className="text-on-surface-variant">
          تعذر تحميل هذه الصفحة. يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية لـ {brandNameAr}.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-primary px-8 py-3 font-bold text-on-primary shadow-lg transition-opacity hover:opacity-90"
        >
          إعادة المحاولة
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-primary bg-transparent px-8 py-3 font-bold text-primary transition-colors hover:bg-primary/5"
        >
          الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
