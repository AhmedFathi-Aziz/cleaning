/** يحوّل عنوان قسم إلى معرّف anchor آمن */
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
    .slice(0, 80);
}

export type MarkdownHeading = {
  id: string;
  title: string;
};

/** يستخرج عناوين ## من Markdown لجدول المحتويات */
export function extractH2Headings(markdown: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  for (const line of markdown.split("\n")) {
    const m = line.match(/^##\s+(.+)$/);
    if (!m) continue;
    const title = m[1].trim();
    headings.push({ id: slugifyHeading(title), title });
  }
  return headings;
}

/** تقدير وقت القراءة بالدقائق (عربي ~180 كلمة/دقيقة) */
export function estimateReadingMinutes(markdown: string): number {
  const plain = markdown
    .replace(/[#>*_\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = plain ? plain.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 180));
}
