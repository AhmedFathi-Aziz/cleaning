import {
  getNeighborhoodRulesForContent,
  isNeighborhoodLinkFalsePositive,
  phraseToRegex,
  type NeighborhoodLinkRule,
} from "./neighborhood-link-index";
import { buildServiceLinkRules, type ServiceLinkRule } from "./service-link-index";

export type InternalLinkRule = {
  phrase: string;
  href: string;
};

const PLACEHOLDER_PREFIX = "\uE000LINK";
const PLACEHOLDER_SUFFIX = "\uE001";

/** يحمي أجزاء Markdown من إعادة الربط */
function protectMarkdownSegments(source: string): { text: string; segments: string[] } {
  const segments: string[] = [];
  let text = source;

  const patterns = [
    /!\[[^\]]*\]\([^)]+\)/g,
    /\[[^\]]+\]\([^)]+\)/g,
    /```[\s\S]*?```/g,
    /`[^`\n]+`/g,
    // صفوف الجداول — حتى لا يُكسَر هيكل | ... | بالربط التلقائي
    /^[^\n>][^\n]*\|[^\n]*\|[^\n]*$/gm,
  ];

  for (const pattern of patterns) {
    text = text.replace(pattern, (match) => {
      const id = segments.length;
      segments.push(match);
      return `${PLACEHOLDER_PREFIX}${id}${PLACEHOLDER_SUFFIX}`;
    });
  }

  return { text, segments };
}

function restoreMarkdownSegments(text: string, segments: string[]): string {
  return text.replace(
    new RegExp(`${PLACEHOLDER_PREFIX}(\\d+)${PLACEHOLDER_SUFFIX}`, "g"),
    (_, id) => segments[Number(id)] ?? "",
  );
}

function isInsideMarkdownLink(text: string, index: number): boolean {
  const open = text.lastIndexOf("[", index);
  if (open < 0) return false;
  const close = text.indexOf("]", open);
  if (close < 0) return false;
  const parenOpen = text.indexOf("(", close);
  if (parenOpen !== close + 1) return false;
  return index > open && index < close;
}

function applyRules(
  text: string,
  rules: InternalLinkRule[],
  options?: { skipFalsePositiveCheck?: boolean },
): string {
  let out = text;

  for (const rule of rules) {
    const re = phraseToRegex(rule.phrase);
    out = out.replace(re, (match, offset) => {
      if (match.includes("](") || match.includes(PLACEHOLDER_PREFIX)) return match;
      if (isInsideMarkdownLink(out, offset)) return match;
      if (
        !options?.skipFalsePositiveCheck &&
        isNeighborhoodLinkFalsePositive(out, offset, match.length)
      ) {
        return match;
      }
      return `[${match}](${rule.href})`;
    });
  }

  return out;
}

function mergeRules(
  neighborhoodRules: NeighborhoodLinkRule[],
  serviceRules: ServiceLinkRule[],
): InternalLinkRule[] {
  return [...neighborhoodRules, ...serviceRules].sort((a, b) => b.phrase.length - a.phrase.length);
}

function autolinkContent(content: string, protectLinks: boolean): string {
  if (!content.trim()) return content;

  const neighborhoodRules = getNeighborhoodRulesForContent(content);
  const serviceRules = buildServiceLinkRules();
  const neighborhoodOnly = mergeRules(neighborhoodRules, []);
  const serviceOnly = mergeRules([], serviceRules);

  if (protectLinks) {
    const { text: protectedText, segments } = protectMarkdownSegments(content);
    let linked = applyRules(protectedText, neighborhoodOnly);
    linked = applyRules(linked, serviceOnly, { skipFalsePositiveCheck: true });
    return restoreMarkdownSegments(linked, segments);
  }

  let linked = applyRules(content, neighborhoodOnly);
  linked = applyRules(linked, serviceOnly, { skipFalsePositiveCheck: true });
  return linked;
}

/**
 * ربط تلقائي: أحياء → `/{مدينة}/{حي}` + خدمات → `/services/...` + موسوعة الحشرات.
 */
export function autolinkArticleMarkdown(markdown: string): string {
  return autolinkContent(markdown, true);
}

/** للنصوص العادية (أدلة الحشرات، مقالات المميزات) */
export function autolinkArticlePlainText(text: string): string {
  return autolinkContent(text, false);
}

/** @deprecated استخدم autolinkArticleMarkdown */
export const autolinkNeighborhoodsInMarkdown = autolinkArticleMarkdown;

/** @deprecated استخدم autolinkArticlePlainText */
export const autolinkNeighborhoodsInPlainText = autolinkArticlePlainText;
