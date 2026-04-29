import ReactMarkdown from "react-markdown";

type Props = {
  markdown: string;
};

export function MarkdownBody({ markdown }: Props) {
  return (
    <div
      className="space-y-4 text-right leading-relaxed text-on-surface-variant [&_a]:text-secondary [&_a]:underline [&_blockquote]:border-secondary [&_blockquote]:border-s-4 [&_blockquote]:pe-4 [&_code]:rounded [&_code]:bg-surface-container [&_code]:px-1 [&_h2]:mt-10 [&_h2]:font-headline [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h3]:mt-8 [&_h3]:font-headline [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-primary [&_img]:mx-auto [&_img]:my-6 [&_img]:max-h-[520px] [&_img]:rounded-xl [&_ol]:list-decimal [&_ol]:pe-6 [&_p]:mb-3 [&_strong]:text-primary [&_ul]:list-disc [&_ul]:pe-6"
      dir="rtl"
    >
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
