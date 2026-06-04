import { renderInlineMarkdownLinks } from "@/lib/rich-text";

type Props = {
  text: string;
  className?: string;
};

/** فقرات الخدمات: **غامق** + روابط Markdown + ربط تلقائي للعبارات والأحياء */
export function ServiceArticleParagraph({ text, className }: Props) {
  return (
    <p className={className}>
      {renderInlineMarkdownLinks(text, { boldClassName: "font-semibold" })}
    </p>
  );
}
