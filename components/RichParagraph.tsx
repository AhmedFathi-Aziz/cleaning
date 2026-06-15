import { renderInlineMarkdownLinks } from "@/lib/rich-text";
import type { AutolinkOptions } from "@/lib/internal-linking";

type Props = {
  children: string;
  className?: string;
  /** سياق دليل موسوعة الحشرات — يفعّل الربط الذكي بالخدمات والأدلة */
  pestGuideSlug?: string;
};

function autolinkForGuide(pestGuideSlug?: string): AutolinkOptions | undefined {
  if (!pestGuideSlug) return undefined;
  return { pestGuideSlug, maxLinksPerPhrase: 1 };
}

export function RichParagraph({ children, className, pestGuideSlug }: Props) {
  return (
    <p className={className}>
      {renderInlineMarkdownLinks(children, { autolink: autolinkForGuide(pestGuideSlug) })}
    </p>
  );
}

/** نص داخل قائمة أو عنوان فرعي — نفس الربط بدون غلاف فقرة */
export function RichInlineText({ children, className, pestGuideSlug }: Props) {
  return (
    <span className={className}>
      {renderInlineMarkdownLinks(children, { autolink: autolinkForGuide(pestGuideSlug) })}
    </span>
  );
}
