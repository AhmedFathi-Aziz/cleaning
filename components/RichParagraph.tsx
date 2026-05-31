import { renderInlineMarkdownLinks } from "@/lib/rich-text";

type Props = {
  children: string;
  className?: string;
};

export function RichParagraph({ children, className }: Props) {
  return <p className={className}>{renderInlineMarkdownLinks(children)}</p>;
}
