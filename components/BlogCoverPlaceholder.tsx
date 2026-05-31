import type { ComponentProps } from "react";

import { Icon } from "@/components/Icon";
import { coverPlaceholderGradient } from "@/lib/blog-placeholder-gradient";

type Props = {
  slug: string;
  /** أيقونة خفيفة فوق التدرج */
  icon?: ComponentProps<typeof Icon>["name"];
  className?: string;
};

/**
 * مساحة غلاف بديلة لمقال بلا صورة — تدرج رسمي مع لمعان خفيف.
 */
export function BlogCoverPlaceholder({ slug, icon = "verified", className = "" }: Props) {
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
