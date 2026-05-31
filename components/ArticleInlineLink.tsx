import Link from "next/link";

import { normalizeArticleHref } from "@/lib/normalize-markdown-links";

type Props = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
};

const internalClassName =
  "article-inline-link group inline-flex items-center gap-1 rounded-md bg-secondary/12 px-1.5 py-0.5 font-bold text-secondary decoration-0 ring-1 ring-secondary/15 transition hover:bg-secondary hover:text-white hover:ring-secondary";

const externalClassName =
  "article-inline-link font-bold text-secondary underline decoration-secondary/40 underline-offset-4 transition hover:text-primary";

export function ArticleInlineLink({ href, children, external }: Props) {
  const normalized = normalizeArticleHref(href);
  const isInternal = !external && normalized.startsWith("/");

  if (isInternal) {
    return (
      <Link href={normalized} className={internalClassName}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={normalized}
      target="_blank"
      rel="noopener noreferrer"
      className={externalClassName}
    >
      {children}
    </a>
  );
}
