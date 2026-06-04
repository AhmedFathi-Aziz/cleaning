import Link from "next/link";

import { normalizeArticleHref } from "@/lib/normalize-markdown-links";

type Props = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
};

const inlineTextLinkClassName =
  "article-inline-link font-semibold text-secondary underline decoration-secondary/40 underline-offset-2 transition hover:text-primary hover:decoration-primary/50";

const internalClassName = inlineTextLinkClassName;

const externalClassName = inlineTextLinkClassName;

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
