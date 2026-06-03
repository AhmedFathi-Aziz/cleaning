const INLINE_BOLD = /\*\*([^*]+)\*\*/g;

type Props = {
  text: string;
  className?: string;
};

/** يحوّل **نص** في فقرات الخدمات إلى <strong> — المحتوى يُكتب بـ Markdown خفيف */
export function ServiceArticleParagraph({ text, className }: Props) {
  const nodes: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(INLINE_BOLD)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    nodes.push(
      <strong key={index} className="font-semibold text-primary">
        {match[1]}
      </strong>,
    );
    last = index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));

  return <p className={className}>{nodes.length > 0 ? nodes : text}</p>;
}
