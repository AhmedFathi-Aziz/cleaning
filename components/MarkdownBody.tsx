import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  ArticleMarkdownTable,
} from "@/components/ArticleMarkdownTable";
import { ArticleInlineLink } from "@/components/ArticleInlineLink";
import { autolinkArticleMarkdown } from "@/lib/internal-linking";
import { normalizeMarkdownLinks } from "@/lib/normalize-markdown-links";
import { normalizeMarkdownTables } from "@/lib/normalize-markdown-tables";
import { slugifyHeading } from "@/lib/markdown-utils";
import { sanitizeArticlePrices } from "@/lib/sanitize-article-prices";

type Props = {
  markdown: string;
};

function headingId(children: React.ReactNode): string {
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
        : "";
  return slugifyHeading(text);
}

const components: Components = {
  h2: ({ children }) => {
    const id = headingId(children);
    return (
      <h2
        id={id}
        className="scroll-mt-28 border-b border-slate-100 pb-3 font-headline text-2xl font-extrabold text-primary md:text-3xl [&:not(:first-child)]:mt-12"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="mt-8 font-headline text-xl font-extrabold text-primary md:text-2xl">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-base leading-[2rem] text-on-surface-variant md:text-lg md:leading-9">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-5 space-y-3 rounded-2xl border border-slate-100 bg-surface-container-low/60 p-5 pe-8 text-on-surface-variant">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 list-decimal space-y-3 rounded-2xl border border-slate-100 bg-surface-container-low/60 p-5 pe-8 text-on-surface-variant">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-8 marker:text-secondary">{children}</li>,
  strong: ({ children }) => <strong className="font-extrabold text-primary">{children}</strong>,
  a: ({ href, children }) => (
    <ArticleInlineLink href={href ?? "#"} external={Boolean(href && /^(https?:|mailto:|tel:)/i.test(href))}>
      {children}
    </ArticleInlineLink>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 rounded-2xl border-s-4 border-secondary bg-gradient-to-l from-secondary/5 to-transparent px-6 py-5 text-base font-medium leading-8 text-primary shadow-sm">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-0 border-t border-dashed border-slate-200" />,
  table: ({ children }) => <ArticleMarkdownTable>{children}</ArticleMarkdownTable>,
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th
      scope="col"
      className="border-b border-slate-200 bg-slate-100 px-4 py-3 text-start text-xs font-bold text-slate-700 sm:px-6 sm:text-sm"
    >
      {children}
    </th>
  ),
  td: ({ children }) => {
    return (
      <td
        className="border-b border-slate-100/90 px-4 py-4 text-start align-middle text-sm font-normal text-slate-700 sm:px-6 [&:first-child]:font-semibold [&:first-child]:text-slate-900"
      >
        {children}
      </td>
    );
  },
};

export function MarkdownBody({ markdown }: Props) {
  const tablesReady = normalizeMarkdownTables(markdown);
  const linkSafe = normalizeMarkdownLinks(tablesReady);
  const withLinks = normalizeMarkdownLinks(autolinkArticleMarkdown(linkSafe));
  const normalized = sanitizeArticlePrices(withLinks);

  return (
    <div className="article-prose text-right" dir="rtl">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {normalized}
      </ReactMarkdown>
    </div>
  );
}
