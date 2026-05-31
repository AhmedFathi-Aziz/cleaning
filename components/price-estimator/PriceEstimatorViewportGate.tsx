"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { PriceEstimatorSkeleton } from "./PriceEstimatorSkeleton";

const PriceEstimatorTool = dynamic(
  () => import("./PriceEstimatorTool").then((m) => ({ default: m.PriceEstimatorTool })),
  {
    ssr: false,
    loading: () => <PriceEstimatorSkeleton />,
  },
);

/**
 * يحمّل حاسبة التقدير كسولاً عند اقترابها من نافذة العرض، لتخفيف حزمة JS الأولى وتحسين Lighthouse.
 */
export function PriceEstimatorViewportGate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
            return;
          }
        }
      },
      { root: null, rootMargin: "200px 0px", threshold: 0.01 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[28rem] w-full">
      {inView ? <PriceEstimatorTool /> : <PriceEstimatorSkeleton />}
    </div>
  );
}
