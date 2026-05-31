/** رسالة موحّدة بدل ذكر أسعار محددة في المقالات */
export const COMPETITIVE_PRICING_NOTE =
  "أسعارنا تنافسية ولدينا عروض مميزة — [تواصل معنا](/contact) لمعرفة العرض المناسب لك.";

const PRICE_CELL_RE =
  /ريال|ر\.س\b|sar\b|نطاق\s*السعر|تكلفة|سعر\s*الخدمة|\d{3,}\s*[-–—]\s*\d{3,}/i;
const PRICE_HEADER_RE = /نطاق\s*السعر|تكلفة|ريال\)|\(ريال/i;

function splitCells(row: string): string[] {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function toTableRow(cells: string[]): string {
  return `| ${cells.join(" | ")} |`;
}

function isPriceLikeCell(cell: string): boolean {
  if (PRICE_CELL_RE.test(cell)) return true;
  if (/\d+\s*[-–—]\s*\d+/.test(cell) && /ريال|ر\.س/i.test(cell)) return true;
  return false;
}

function sanitizeTableCell(cell: string): string {
  if (PRICE_HEADER_RE.test(cell)) return "العرض";
  if (isPriceLikeCell(cell)) return "أسعار تنافسية — عروض مميزة";
  return cell.replace(/\s*ريال\b/gi, "").trim();
}

function sanitizeTableRow(line: string): string | null {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|")) return line;
  if (/^\|[\s\-:|]+\|$/.test(trimmed)) return line;

  const cells = splitCells(trimmed);
  if (cells.length < 2) return line;

  const sanitized = cells.map(sanitizeTableCell);
  if (sanitized.every((c) => c === "أسعار تنافسية — عروض مميزة")) return null;

  return toTableRow(sanitized);
}

function sanitizeProse(line: string): string {
  let out = line;

  out = out.replace(/\d+\s*[-–—]\s*\d+\s*ريال/gi, "أسعار تنافسية");
  out = out.replace(/\d{2,5}\s*ريال/gi, "أسعار تنافسية");
  out = out.replace(/نطاق\s*السعر\s*\([^)]*ريال[^)]*\)/gi, "عروض مميزة");
  out = out.replace(/نطاق\s*السعر/gi, "العرض");
  out = out.replace(/\[تقدير\s*السعر\]\([^)]+\)/gi, "[تواصل للعرض](/contact)");
  out = out.replace(/\[تقدير\s*سعر[^\]]*\]\([^)]+\)/gi, "[تواصل للعرض](/contact)");
  out = out.replace(/\|\s*تقدير\s*سعر\s*\|/gi, "| تواصل |");
  out = out.replace(/الأسعار\s*تقديرية/gi, "عروض مميزة متاحة");

  return out;
}

/**
 * يزيل الأسعار الرقمية من Markdown المقالات ويستبدلها برسالة عروض تنافسية.
 * يعمل عند عرض مقالات المدونة والأخبار.
 */
export function sanitizeArticlePrices(markdown: string): string {
  if (!markdown.trim()) return markdown;

  const out: string[] = [];
  for (const line of markdown.split("\n")) {
    const tableLine = sanitizeTableRow(line);
    if (tableLine === null) continue;
    out.push(sanitizeProse(tableLine));
  }

  return out.join("\n");
}
