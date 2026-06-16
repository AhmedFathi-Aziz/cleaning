import { shouldInternallyLinkToNeighborhoodHub } from "@/lib/url-indexing-policy";
import { locations } from "@/src/data/locations";

export type NeighborhoodLinkRule = {
  /** النص المطابق في المحتوى */
  phrase: string;
  href: string;
  citySlug: string;
};

const CITY_HINTS: Record<string, RegExp> = {
  riyadh: /الرياض|رياض(?:\s|$)/,
  jeddah: /جدة/,
  dammam: /الدمام|دمام/,
  khobar: /الخبر|خبر/,
  makkah: /مكة|مكّة/,
  madinah: /المدينة(?:\s+المنورة)?|المدينة\s+المنورة/,
  taif: /الطائف|طائف/,
  abha: /أبها|ابها/,
  tabuk: /تبوك/,
  hail: /حائل/,
  najran: /نجران/,
  "al-ahsa": /الأحساء|الاحساء|الهفوف/,
  jubail: /الجبيل|جبيل/,
};

/** أحياء بنفس الاسم في مدن مختلفة */
function buildAmbiguousNames(): Set<string> {
  const byName = new Map<string, Set<string>>();
  for (const city of locations) {
    for (const n of city.neighborhoods) {
      const set = byName.get(n.name) ?? new Set<string>();
      set.add(city.slug);
      byName.set(n.name, set);
    }
  }
  return new Set([...byName.entries()].filter(([, cities]) => cities.size > 1).map(([name]) => name));
}

const ambiguousNames = buildAmbiguousNames();

/** عبارات شائعة في المقالات → حي موجود في الموقع */
const NEIGHBORHOOD_ALIASES: Array<{ phrase: string; citySlug: string; neighborhoodSlug: string }> = [
  { phrase: "المنطقة التاريخية", citySlug: "riyadh", neighborhoodSlug: "al-diriyah" },
  { phrase: "حي الملك فهد", citySlug: "riyadh", neighborhoodSlug: "king-fahd" },
];

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** أحرف عربية — لمنع مطابقة «السلام» داخل «السلامة» (تعليمات السلامة) */
const ARABIC_LETTER = "\\u0621-\\u064A\\u0660-\\u0669";

/**
 * أسماء أحياء تشبه كلمات شائعة — تُربط فقط مع «حي …» وليس الاسم وحده.
 * (مثل: السلام ≠ السلامة، الأمل = أمل، الصفا = صفاء…)
 */
const BARE_NAME_REQUIRES_HAI_PREFIX = new Set([
  "السلام",
  "السلامة",
  "الأمل",
  "الورد",
  "القدس",
  "الشفا",
  "الفلاح",
  "النزهة",
  "الصفا",
  "الخليج",
  "المنار",
  "الوادي",
  "النهضة",
  "الفيحاء",
]);

/** سياقات لا يُربط فيها اسم حي حتى لو تطابق */
const FALSE_POSITIVE_CONTEXT =
  /تعليمات\s+السلامة|السلامة\s+بعد|السلامة\s+والصحة|معايير\s+السلامة|إجراءات\s+السلامة|سلامة\s+(?:المبيد|الرش|بعد)|وفق\s+.*?السلامة|السلامة\s+العامة|السلامة\s+الغذائية/i;

/**
 * يبني قواعد ربط لأسماء الأحياء → `/{citySlug}/{neighborhoodSlug}`
 * عند تحديد مدينة واحدة في النص تُستخدم أحياؤها فقط (لتفادي التباس الروضة/الحمراء…).
 */
export function buildNeighborhoodLinkRules(cityContext: string | null): NeighborhoodLinkRule[] {
  const cities = (
    cityContext != null
      ? locations.filter((c) => c.slug === cityContext)
      : locations.filter((c) => c.slug === "riyadh")
  ).filter((c) => shouldInternallyLinkToNeighborhoodHub(c.slug));

  const rules: NeighborhoodLinkRule[] = [];

  for (const city of cities) {
    for (const n of city.neighborhoods) {
      const href = `/${city.slug}/${n.slug}`;
      const isAmbiguous = ambiguousNames.has(n.name);

      const phrases = new Set<string>([
        `حي ${n.name}`,
        `وحي ${n.name}`,
        `أحياء ${n.name}`,
        `ب${n.name}`,
        `في ${n.name}`,
      ]);

      const bareNameRisky = BARE_NAME_REQUIRES_HAI_PREFIX.has(n.name);
      if ((!isAmbiguous || cityContext != null) && !bareNameRisky) {
        phrases.add(n.name);
        phrases.add(`و${n.name}`);
        phrases.add(`،${n.name}`);
      }

      for (const phrase of phrases) {
        rules.push({ phrase, href, citySlug: city.slug });
      }
    }
  }

  const citySlugs = new Set(cities.map((c) => c.slug));
  for (const alias of NEIGHBORHOOD_ALIASES) {
    if (citySlugs.has(alias.citySlug)) {
      rules.push({
        phrase: alias.phrase,
        href: `/${alias.citySlug}/${alias.neighborhoodSlug}`,
        citySlug: alias.citySlug,
      });
    }
  }

  rules.sort((a, b) => b.phrase.length - a.phrase.length);
  return rules;
}

export function detectCityContextFromText(text: string): string | null {
  const matched: string[] = [];
  for (const [slug, re] of Object.entries(CITY_HINTS)) {
    if (re.test(text)) matched.push(slug);
  }
  if (matched.length === 0) return "riyadh";
  if (matched.includes("riyadh")) return "riyadh";
  if (matched.length === 1) return matched[0];
  return matched[0];
}

export function getNeighborhoodRulesForContent(content: string): NeighborhoodLinkRule[] {
  const city = detectCityContextFromText(content);
  return buildNeighborhoodLinkRules(city);
}

export function phraseToRegex(phrase: string): RegExp {
  const core = escapeRegex(phrase);
  return new RegExp(`(?<![${ARABIC_LETTER}])${core}(?![${ARABIC_LETTER}])`, "gu");
}

/** هل المطابقة سياقاً عاماً (سلامة، تعليمات…) وليس حياً؟ */
export function isNeighborhoodLinkFalsePositive(text: string, offset: number, matchLength: number): boolean {
  const start = Math.max(0, offset - 48);
  const end = Math.min(text.length, offset + matchLength + 48);
  return FALSE_POSITIVE_CONTEXT.test(text.slice(start, end));
}
