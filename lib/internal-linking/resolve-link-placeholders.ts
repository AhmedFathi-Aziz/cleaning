import { buildServiceLinkRules } from "./service-link-index";

export type ResolvedInternalLink = {
  placeholder: string;
  label: string;
  href: string;
  matchedPhrase: string;
};

const PLACEHOLDER_RE = /\[رابط داخلي:\s*([^\]]+?)\s*\]/g;

/** عبارات لا تُطابق قواعد الربط التلقائي بدقة — ربط يدوي */
const PLACEHOLDER_HREF_OVERRIDES: Record<string, string> = {
  "خدمات تنظيف المنازل الشامل بالرياض": "/services/deep-home-cleaning",
};

function normalizeForMatch(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ال(?=[\u0600-\u06FF])/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function resolveLabelToHref(label: string): { href: string; matchedPhrase: string } | null {
  const trimmed = label.trim();
  const override = PLACEHOLDER_HREF_OVERRIDES[trimmed];
  if (override) {
    return { href: override, matchedPhrase: "(override)" };
  }

  const normalizedLabel = normalizeForMatch(trimmed);
  const rules = buildServiceLinkRules();

  for (const rule of rules) {
    const normalizedPhrase = normalizeForMatch(rule.phrase);
    if (normalizedPhrase.length < 4) continue;
    if (normalizedLabel.includes(normalizedPhrase)) {
      return { href: rule.href, matchedPhrase: rule.phrase };
    }
  }

  return null;
}

/**
 * يحوّل `[رابط داخلي: نص]` إلى `[نص](/path)` باستخدام فهرس الروابط الداخلية.
 */
export function resolveInternalLinkPlaceholders(markdown: string): {
  markdown: string;
  resolved: ResolvedInternalLink[];
  unresolved: string[];
} {
  const resolved: ResolvedInternalLink[] = [];
  const unresolved: string[] = [];

  const output = markdown.replace(PLACEHOLDER_RE, (placeholder, rawLabel: string) => {
    const label = rawLabel.trim();
    const match = resolveLabelToHref(label);
    if (!match) {
      unresolved.push(label);
      return placeholder;
    }
    resolved.push({
      placeholder,
      label,
      href: match.href,
      matchedPhrase: match.matchedPhrase,
    });
    return `[${label}](${match.href})`;
  });

  return { markdown: output, resolved, unresolved };
}

export function findInternalLinkPlaceholders(markdown: string): string[] {
  const labels: string[] = [];
  for (const match of markdown.matchAll(PLACEHOLDER_RE)) {
    labels.push(match[1].trim());
  }
  return labels;
}
