"use client";

import { Icon } from "@/components/Icon";

const stats = [
  { value: "50,000+", label: "موقع تم تنظيفه", icon: "apartment" },
  { value: "15+", label: "عاماً من الخبرة", icon: "calendar_month" },
  { value: "500+", label: "موظف محترف", icon: "engineering" },
  { value: "10,000+", label: "عميل سعيد", icon: "sentiment_satisfied" },
];

/** أرقام ثابتة بدون عدّ متحرك لتقليل CLS وتخفيف عمل الواجهة */
export function StatsStrip() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24" aria-label="إحصائيات الشركة">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/20 to-transparent" aria-hidden />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group flex flex-col items-center rounded-2xl border border-primary/10 bg-white px-6 py-8 text-center shadow-[0_16px_45px_rgba(0,35,111,0.06)] transition-all duration-500 hover:bg-white hover:shadow-[0_22px_60px_rgba(0,35,111,0.1)]"
          >
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Icon name={stat.icon} className="text-3xl" />
            </span>
            <p className="mb-2 text-sm font-bold text-[#716f68]">أكثر من</p>
            <p className="flex min-h-[1.2em] justify-center font-headline text-5xl font-extrabold leading-none tracking-tight text-primary tabular-nums md:text-6xl">
              {stat.value}
            </p>
            <p className="mt-4 text-base font-extrabold text-[#4f4b43]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
