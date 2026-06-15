import {
  getNeighborhoodRulesForContent,
  isNeighborhoodLinkFalsePositive,
  phraseToRegex,
  type NeighborhoodLinkRule,
} from "./neighborhood-link-index";
import { buildPestGuideAutolinkRules } from "./pest-guide-link-index";
import { buildServiceLinkRules, type ServiceLinkRule } from "./service-link-index";

export type InternalLinkRule = {
  phrase: string;
  href: string;
};

export type AutolinkOptions = {
  /** عند عرض دليل في موسوعة الحشرات — يربط بأدلة أخرى وخدمات بسياق مناسب */
  pestGuideSlug?: string;
  /** حد أقصى لكل عبارة في النص (افتراضي 1 لتجنب حشو الروابط) */
  maxLinksPerPhrase?: number;
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
    /\*\*[^*]+?\*\*/g,
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
  options?: { skipFalsePositiveCheck?: boolean; maxLinksPerPhrase?: number },
): string {
  let out = text;
  const maxPerPhrase = options?.maxLinksPerPhrase ?? 1;
  const phraseCounts = new Map<string, number>();

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
      const used = phraseCounts.get(rule.phrase) ?? 0;
      if (used >= maxPerPhrase) return match;
      phraseCounts.set(rule.phrase, used + 1);
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

function autolinkContent(content: string, protectLinks: boolean, options?: AutolinkOptions): string {
  if (!content.trim()) return content;

  const maxLinksPerPhrase = options?.maxLinksPerPhrase ?? 1;
  const ruleOptions = { maxLinksPerPhrase };
  const neighborhoodRules = getNeighborhoodRulesForContent(content);
  const serviceRules = buildServiceLinkRules();
  const pestGuideRules = options?.pestGuideSlug
    ? buildPestGuideAutolinkRules(options.pestGuideSlug)
    : [];
  const neighborhoodOnly = mergeRules(neighborhoodRules, []);
  const pestAndService: InternalLinkRule[] = [...pestGuideRules, ...serviceRules].sort(
    (a, b) => b.phrase.length - a.phrase.length,
  );

  if (protectLinks) {
    const { text: protectedText, segments } = protectMarkdownSegments(content);
    let linked = applyRules(protectedText, neighborhoodOnly, ruleOptions);
    linked = applyRules(linked, pestAndService, {
      skipFalsePositiveCheck: true,
      maxLinksPerPhrase,
    });
    return restoreMarkdownSegments(linked, segments);
  }

  let linked = applyRules(content, neighborhoodOnly, ruleOptions);
  linked = applyRules(linked, pestAndService, {
    skipFalsePositiveCheck: true,
    maxLinksPerPhrase,
  });
  return linked;
}

/**
 * ربط تلقائي: أحياء → `/{مدينة}/{حي}` + خدمات → `/services/...` + موسوعة الحشرات.
 */
export function autolinkArticleMarkdown(markdown: string, options?: AutolinkOptions): string {
  return autolinkContent(markdown, true, options);
}

/** للنصوص العادية (أدلة الحشرات، مقالات المميزات) */
export function autolinkArticlePlainText(text: string, options?: AutolinkOptions): string {
  return autolinkContent(text, true, options);
}

/** @deprecated استخدم autolinkArticleMarkdown */
export const autolinkNeighborhoodsInMarkdown = autolinkArticleMarkdown;

/** @deprecated استخدم autolinkArticlePlainText */
export const autolinkNeighborhoodsInPlainText = autolinkArticlePlainText;
