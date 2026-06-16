/**
 * يفحص المحتوى عن [رابط داخلي: ...] ويولّد تقريراً بالإصلاحات.
 * الاستخدام: npx tsx scripts/audit-internal-link-placeholders.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  findInternalLinkPlaceholders,
  resolveInternalLinkPlaceholders,
} from "../lib/internal-linking/resolve-link-placeholders";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const reportPath = path.join(root, "reports", "internal-link-placeholders.md");

type ScanResult = {
  file: string;
  placeholders: string[];
  resolved: ReturnType<typeof resolveInternalLinkPlaceholders>["resolved"];
  unresolved: string[];
};

function scanFile(absolutePath: string, relativePath: string): ScanResult | null {
  const content = fs.readFileSync(absolutePath, "utf8");
  const placeholders = findInternalLinkPlaceholders(content);
  if (placeholders.length === 0) return null;

  const { resolved, unresolved } = resolveInternalLinkPlaceholders(content);
  return { file: relativePath, placeholders, resolved, unresolved };
}

function collectMarkdownFiles(dir: string, base = dir): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectMarkdownFiles(full, base));
    } else if (entry.name.endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}

function scanGeneratedTs(fileName: string): ScanResult | null {
  const absolutePath = path.join(root, "lib", "generated", fileName);
  if (!fs.existsSync(absolutePath)) return null;

  const content = fs.readFileSync(absolutePath, "utf8");
  const placeholders = findInternalLinkPlaceholders(content);
  if (placeholders.length === 0) return null;

  const { resolved, unresolved } = resolveInternalLinkPlaceholders(content);
  return {
    file: `lib/generated/${fileName}`,
    placeholders,
    resolved,
    unresolved,
  };
}

function main() {
  const results: ScanResult[] = [];

  for (const file of collectMarkdownFiles(path.join(root, "content"))) {
    const relative = path.relative(root, file).replace(/\\/g, "/");
    const hit = scanFile(file, relative);
    if (hit) results.push(hit);
  }

  for (const gen of ["blog-articles.ts", "national-news-articles.ts"]) {
    const hit = scanGeneratedTs(gen);
    if (hit) results.push(hit);
  }

  const totalPlaceholders = results.reduce((n, r) => n + r.placeholders.length, 0);
  const totalResolved = results.reduce((n, r) => n + r.resolved.length, 0);
  const totalUnresolved = results.reduce((n, r) => n + r.unresolved.length, 0);

  const lines: string[] = [
    "# تقرير روابط داخلية غير محلولة",
    "",
    `تاريخ التوليد: ${new Date().toISOString()}`,
    "",
    "## الملخص",
    "",
    `| المقياس | العدد |`,
    `|---|---:|`,
    `| ملفات تحتوي عناصر نائبة | ${results.length} |`,
    `| إجمالي \`[رابط داخلي: ...]\` | ${totalPlaceholders} |`,
    `| قابلة للحل تلقائياً | ${totalResolved} |`,
    `| غير محلولة | ${totalUnresolved} |`,
    "",
  ];

  if (results.length === 0) {
    lines.push("✅ لا توجد عناصر نائبة `[رابط داخلي: ...]` في المحتوى المفحوص.", "");
  } else {
    lines.push("## التفاصيل", "");
    for (const row of results) {
      lines.push(`### \`${row.file}\``, "");
      if (row.resolved.length > 0) {
        lines.push("| العنصر النائب | النص | الرابط | مطابقة القاعدة |", "|---|---|---|---|");
        for (const fix of row.resolved) {
          lines.push(
            `| \`${fix.placeholder}\` | ${fix.label} | \`${fix.href}\` | ${fix.matchedPhrase} |`,
          );
        }
        lines.push("");
      }
      if (row.unresolved.length > 0) {
        lines.push("**غير محلولة:**");
        for (const label of row.unresolved) {
          lines.push(`- \`${label}\``);
        }
        lines.push("");
      }
    }
  }

  lines.push("## الإصلاحات المطبّقة في المصدر", "");
  lines.push(
    "| المقال | النص | الرابط |",
    "|---|---|---|",
    "| `content/blog/تنظيف-مطابخ-بالرياض.md` | شركة تنظيف منازل بالرياض | `/services/cleaning-company-riyadh` |",
    "| `content/blog/تنظيف-مطابخ-بالرياض.md` | خدمات تنظيف المنازل الشامل بالرياض | `/services/deep-home-cleaning` |",
    "",
    "## الحماية المستقبلية",
    "",
    "- `resolveInternalLinkPlaceholders()` في `MarkdownBody` يحوّل أي عنصر نائب متبقٍ عند العرض.",
    "- شغّل `npm run blog:sync` بعد تعديل `content/blog/*.md` لتحديث `lib/generated/blog-articles.ts`.",
    "",
  );

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

  console.log(`[audit-internal-links] ${totalPlaceholders} placeholder(s) in ${results.length} file(s)`);
  console.log(`[audit-internal-links] report → ${path.relative(root, reportPath)}`);

  if (totalUnresolved > 0) {
    process.exitCode = 1;
  }
}

main();
