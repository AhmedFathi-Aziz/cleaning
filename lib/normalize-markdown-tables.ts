function splitTableCells(row: string): string[] {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function isMeaninglessDashRow(row: string): boolean {
  const cells = splitTableCells(row);
  if (cells.length < 2) return false;
  return cells.every((c) => /^[-–—:]+$/.test(c));
}

function isSeparatorRow(row: string): boolean {
  const cells = splitTableCells(row);
  if (cells.length < 2) return false;
  return cells.every((c) => /^[-–—:]+$/.test(c));
}

/** سطر يحتوي عمودين أو أكثر مفصولين بـ | */
function isTableLikeLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith(">") || trimmed.startsWith("```")) return false;
  const pipes = (trimmed.match(/\|/g) ?? []).length;
  if (pipes < 2) return false;
  const cells = splitTableCells(wrapTableRow(trimmed));
  return cells.length >= 2 && cells.some((c) => c.length > 0);
}

function wrapTableRow(line: string): string {
  let row = line.trim();
  if (!row.startsWith("|")) row = `| ${row}`;
  if (!row.endsWith("|")) row = `${row} |`;
  return row.replace(/\s*\|\s*/g, " | ").replace(/^\|\s*/, "| ").replace(/\s*\|$/, " |");
}

/** يفصل صفوف جدول ملتصقة في سطر واحد: `| a | b | | c | d |` */
function expandInlineTableRows(line: string): string[] {
  const trimmed = line.trim();
  if ((trimmed.match(/\|/g) ?? []).length < 4) return [line];

  const chunks = trimmed.split(/\|\s+\|\s+(?=[^\s\-—:|])/);
  if (chunks.length <= 1) return [line];

  return chunks.map((chunk) => wrapTableRow(chunk));
}

function formatTableBlock(rows: string[]): string[] {
  const wrapped = rows.map((r) => wrapTableRow(r)).filter((r) => !isMeaninglessDashRow(r));
  if (wrapped.length === 0) return rows;

  const colCount = splitTableCells(wrapped[0]).length;
  if (colCount < 2) return wrapped;

  const separator = `|${" --- |".repeat(colCount)}`;
  const out: string[] = [wrapped[0]];

  let start = 1;
  if (wrapped[1] && isSeparatorRow(wrapped[1])) {
    out.push(wrapped[1]);
    start = 2;
  } else {
    out.push(separator);
  }

  for (let i = start; i < wrapped.length; i++) {
    const row = wrapped[i];
    if (isSeparatorRow(row)) continue;
    const cells = splitTableCells(row);
    if (cells.length < 2) continue;
    out.push(row);
  }

  return out;
}

/**
 * يُصلح جداول Markdown الشائعة في المقالات (خاصة من لوحة الإدارة):
 * - صفوف ملتصقة في سطر واحد أو مفصولة بـ ||
 * - غياب سطر الفاصل بعد العناوين فقط (وليس بين كل صف)
 * - صفوف بدون | في البداية والنهاية
 */
export function normalizeMarkdownTables(markdown: string): string {
  let md = markdown;

  md = md.replace(/(\|[^|\n]+(?:\|[^|\n]+)+\|)\s+\|/g, "$1\n|");
  md = md.replace(/\|\s*\|\s*(?=[^|\n]+\|[^|\n]+\|)/g, "|\n|");

  const expandedLines: string[] = [];
  for (const line of md.split("\n")) {
    expandedLines.push(...expandInlineTableRows(line));
  }

  const output: string[] = [];
  let i = 0;

  while (i < expandedLines.length) {
    const trimmed = expandedLines[i].trim();

    if (!isTableLikeLine(trimmed)) {
      output.push(expandedLines[i]);
      i += 1;
      continue;
    }

    const block: string[] = [];
    while (i < expandedLines.length && isTableLikeLine(expandedLines[i].trim())) {
      block.push(expandedLines[i].trim());
      i += 1;
    }

    if (output.length > 0 && output[output.length - 1]?.trim() !== "") {
      output.push("");
    }
    output.push(...formatTableBlock(block));
  }

  return output.join("\n");
}
