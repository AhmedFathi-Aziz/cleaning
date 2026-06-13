import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { brandNameAr } from "@/lib/brand";
import { resolveArticleAuthorProfile } from "@/lib/article-author";

type ArticleAuthorProps = {
  authorId?: string | null;
  author?: string | null;
  className?: string;
  variant?: "card" | "inline";
};

export function ArticleAuthorCard({
  authorId,
  author,
  className,
  variant = "card",
}: ArticleAuthorProps) {
  const profile = resolveArticleAuthorProfile({ authorId, author });

  if (variant === "inline") {
    return (
      <p className={className ?? "mt-2 text-sm font-medium text-on-surface-variant"}>
        بقلم{" "}
        <Link href={profile.teamHref} className="font-bold text-primary hover:text-secondary hover:underline">
          {profile.displayName}
        </Link>
        <span className="text-on-surface-variant"> — {profile.specialty}</span>
      </p>
    );
  }

  return (
    <aside
      className={
        className ??
        "mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
      }
      aria-label="بيانات المؤلف"
    >
      <p className="mb-4 text-xs font-extrabold text-secondary">المؤلف</p>
      <div className="flex items-start gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-sm sm:h-20 sm:w-20">
          <Image
            src={profile.image}
            alt={`${profile.displayName} — ${brandNameAr}`}
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1 text-right">
          <p className="font-headline text-lg font-extrabold text-primary sm:text-xl">{profile.displayName}</p>
          <p className="mt-1 text-sm font-bold leading-relaxed text-secondary">{profile.specialty}</p>
          <p className="mt-2 text-xs font-semibold text-on-surface-variant">
            خبرة {profile.yearsExperience} سنوات — من فريق {brandNameAr}
          </p>
          <Link
            href={profile.teamHref}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition hover:text-secondary hover:underline"
          >
            الملف في فريق العمل
            <Icon name="arrow_back" className="text-base" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

/** @deprecated استخدم ArticleAuthorCard مع variant="inline" */
export function ArticleAuthorLine(props: Omit<ArticleAuthorProps, "variant">) {
  return <ArticleAuthorCard {...props} variant="inline" />;
}
