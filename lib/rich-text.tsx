import type { ReactNode } from "react";

import { ArticleInlineLink } from "@/components/ArticleInlineLink";
import { autolinkArticlePlainText } from "@/lib/internal-linking";
import { normalizeArticleHref, normalizeMarkdownLinks } from "@/lib/normalize-markdown-links";

/** روابط Markdown: [النص](url) — url قد يكون `/path` أو `services/...` أو https */
const INLINE_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderBoldSegments(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  const out: ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === "") continue;
    if (i % 2 === 0) {
      out.push(<span key={`${keyPrefix}-t-${i}`}>{part}</span>);
    } else {
      out.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-extrabold text-primary">
          {part}
        </strong>,
      );
    }
  }
  return out.length > 0 ? out : [<span key={`${keyPrefix}-e`}>{text}</span>];
}

/**
 * يحوّل نصاً يحتوي روابط Markdown و**غامق** إلى عناصر React.
 * يدعم الروابط الداخلية بدون `/` في البداية (مثل services/foo) بعد التطبيع.
 */
export function renderInlineMarkdownLinks(text: string): ReactNode[] {
  const linked = autolinkArticlePlainText(normalizeMarkdownLinks(text));
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  const re = new RegExp(INLINE_LINK_RE.source, "g");
  let match: RegExpExecArray | null;
  let linkIndex = 0;

  while ((match = re.exec(linked)) !== null) {
    if (match.index > lastIndex) {
      const chunk = linked.slice(lastIndex, match.index);
      nodes.push(...renderBoldSegments(chunk, `pre-${match.index}`));
    }
    const href = normalizeArticleHref(match[2].trim());
    const isExternal = /^(https?:|mailto:|tel:)/i.test(href);
    nodes.push(
      <ArticleInlineLink key={`link-${match.index}-${linkIndex++}`} href={href} external={isExternal}>
        {renderBoldSegments(match[1], `in-${match.index}`)}
      </ArticleInlineLink>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < linked.length) {
    nodes.push(...renderBoldSegments(linked.slice(lastIndex), `tail-${lastIndex}`));
  }

  return nodes.length > 0 ? nodes : renderBoldSegments(linked, "all");
}
