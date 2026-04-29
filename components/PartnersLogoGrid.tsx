"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { PartnerLogoItem } from "@/lib/partners";

export function PartnersLogoGrid({ partners }: { partners: PartnerLogoItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -12% 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
    >
      {partners.map(({ name, logo }, index) => (
        <div
          key={logo}
          className={`group relative flex min-h-[6.25rem] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white px-3 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_6px_24px_rgba(0,35,111,0.042)] ring-1 ring-slate-900/[0.04] transition-[transform,box-shadow,border-color] duration-300 ease-out md:min-h-[7rem] ${
            entered ? "animate-partner-logo-in opacity-100" : "opacity-0"
          } motion-reduce:animate-none motion-reduce:opacity-100`}
          style={
            entered ? { animationDelay: `${Math.min(index, 28) * 32}ms` } : undefined
          }
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/[0.07] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
          <Image
            src={logo}
            alt={`شعار ${name}`}
            width={280}
            height={100}
            className="relative z-[1] h-full max-h-[5.5rem] w-full object-contain p-3 opacity-[0.92] transition-[transform,opacity] duration-300 ease-out group-hover:opacity-100 motion-safe:group-hover:scale-[1.03] md:max-h-[6rem]"
            sizes="(min-width: 1024px) 14vw, (min-width: 768px) 20vw, 45vw"
          />
        </div>
      ))}
    </div>
  );
}
