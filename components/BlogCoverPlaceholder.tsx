import type { ComponentProps } from "react";
import Image from "next/image";

import { Icon } from "@/components/Icon";
import { brandLogoLargePath, brandNameAr } from "@/lib/brand";
import { coverPlaceholderGradient } from "@/lib/blog-placeholder-gradient";

type Props = {
  slug: string;
  /** أيقونة خفيفة فوق التدرج — أو شعار الشركة عند `variant="brand"` */
  icon?: ComponentProps<typeof Icon>["name"];
  variant?: "icon" | "brand";
  className?: string;
};

/**
 * مساحة غلاف بديلة لمقال بلا صورة — تدرج رسمي مع لمعان خفيف، أو شعار الشركة كاملاً للأخبار.
 */
export function BlogCoverPlaceholder({ slug, icon = "verified", variant = "icon", className = "" }: Props) {
  if (variant === "brand") {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 ${className}`}
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_42%,rgba(255,255,255,0.9),transparent_68%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-slate-200/70" aria-hidden />
        <div className="relative h-full w-full p-[10%] sm:p-[9%]">
          <Image
            src={brandLogoLargePath}
            alt={`شعار ${brandNameAr}`}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 360px"
            className="object-contain object-center"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: coverPlaceholderGradient(slug) }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_75%_18%,rgba(255,248,235,0.16),transparent_52%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_15%_85%,rgba(15,23,42,0.22),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/28 via-black/5 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08]" aria-hidden />
      <Icon name={icon} className="relative z-[1] text-[2.75rem] text-amber-100/45 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:text-[3.25rem] md:text-amber-50/40" />
    </div>
  );
}
