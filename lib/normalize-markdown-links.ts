/**
 * يصلح روابط Markdown الشائعة في مقالات الإدمن قبل الربط التلقائي والعرض.
 */
export function normalizeMarkdownLinks(markdown: string): string {
  let md = markdown;

  // علامات اقتباس «ذكية» أو اتجاه قد تكسر تحليل Markdown
  md = md.replace(/[\u201C\u201D\u00AB\u00BB]/g, '"');
  md = md.replace(/[\u2018\u2019]/g, "'");
  md = md.replace(/[\u200E\u200F\uFEFF]/g, "");
  /* علامة نجمية عربية قد تُنسخ من Word وتمنع تمييز **غامق** */
  md = md.replace(/\u066D/g, "*");

  // إصلاح الربط المزدوج من autolink: [[النص](/path)](path-old)
  md = md.replace(/\[\[([^\]]+)\]\(([^)]+)\)\]\([^)]*\)/g, "[$1]($2)");

  // مسارات نسبية بدون / في البداية → روابط داخلية صحيحة
  md = md.replace(
    /\]\(\s*(services|guides|blog|news|contact|areas|estimate|cleaning|riyadh|jeddah|dammam|khobar|makkah|madinah|taif|abha|tabuk|hail|najran|al-ahsa|jubail)\/([^)\s]*)\s*\)/gi,
    (_, segment, rest) => `](/${segment}/${rest.replace(/\/+$/, "")})`,
  );

  // إزالة / زائدة قبل القوس: ](/services/foo/)
  md = md.replace(/\]\(\/([^)]+?)\/\s*\)/g, "](/$1)");

  return md;
}

/** يوحّد href للعرض (روابط داخلية نسبية من المحرر) */
export function normalizeArticleHref(href: string | undefined): string {
  if (!href) return "#";
  const trimmed = href.trim().replace(/\/+$/, "") || "/";
  if (trimmed.startsWith("/")) return trimmed;
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return href.trim();
  if (
    /^(services|guides|blog|news|contact|areas|estimate|cleaning)\//i.test(trimmed) ||
    /^(riyadh|jeddah|dammam|khobar|makkah|madinah|taif|abha|tabuk|hail|najran|al-ahsa|jubail)\//i.test(trimmed)
  ) {
    return `/${trimmed}`;
  }
  return href.trim();
}
