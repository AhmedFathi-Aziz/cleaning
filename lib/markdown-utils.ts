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

/**
 * يزيل أول سطر `# عنوان` من Markdown عندما يعرض القالب <h1> منفصلاً في رأس المقال.
 * يحذف أيضاً فاصلاً `---` أو أسطر فارغة تليه مباشرة.
 */
export function stripLeadingMarkdownH1(markdown: string): string {
  const lines = markdown.split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i += 1;
  if (i >= lines.length) return markdown;

  const line = lines[i].trim();
  if (!/^#\s+/.test(line) || /^##\s+/.test(line)) return markdown;

  lines.splice(i, 1);
  while (i < lines.length) {
    const next = lines[i].trim();
    if (next === "") {
      lines.splice(i, 1);
      continue;
    }
    if (next === "---") {
      lines.splice(i, 1);
    }
    break;
  }
  return lines.join("\n");
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
