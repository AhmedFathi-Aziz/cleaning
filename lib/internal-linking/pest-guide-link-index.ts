import { pestGuides } from "@/lib/pest-guides";

type LinkRule = { phrase: string; href: string };

const PEST_SERVICE = "/services/pest-control";
const PEST_SERVICE_RIYADH = "/services/pest-control-riyadh";

/**
 * مرادفات طبيعية → صفحات خدمة المكافحة (بدون حشو كلمات مفتاحية).
 * العبارات الأطول تُطبَّق أولاً عبر الترتيب في autolink.
 */
export const PEST_SERVICE_SYNONYM_RULES: LinkRule[] = [
  { phrase: "شركة رش حشرات بالرياض", href: PEST_SERVICE_RIYADH },
  { phrase: "شركة مكافحة حشرات بالرياض", href: PEST_SERVICE_RIYADH },
  { phrase: "مكافحة النمل الأبيض بالرياض", href: PEST_SERVICE_RIYADH },
  { phrase: "رش صراصير بالرياض", href: PEST_SERVICE_RIYADH },
  { phrase: "رش نمل بالرياض", href: PEST_SERVICE_RIYADH },
  { phrase: "رش حشرات بالرياض", href: PEST_SERVICE_RIYADH },
  { phrase: "مكافحة حشرات الرياض", href: PEST_SERVICE_RIYADH },
  { phrase: "خدمة رش المبيدات", href: PEST_SERVICE },
  { phrase: "برنامج مكافحة حشرية", href: PEST_SERVICE },
  { phrase: "معالجة الآفات المنزلية", href: PEST_SERVICE },
  { phrase: "زيارة مكافحة مهنية", href: PEST_SERVICE },
  { phrase: "تقييم حشرات في المنزل", href: PEST_SERVICE },
  { phrase: "رش مبيدات آمنة", href: PEST_SERVICE },
  { phrase: "شركة رش مبيدات", href: PEST_SERVICE },
  { phrase: "طلب مكافحة حشرات", href: PEST_SERVICE },
  { phrase: "حجز رش حشرات", href: PEST_SERVICE },
];

/** عبارات إضافية لربط دليل → دليل آخر في الموسوعة */
const EXTRA_PHRASES_BY_GUIDE_SLUG: Record<string, string[]> = {
  cockroaches: ["صراصير المطبخ", "رش صراصير"],
  "bed-bugs": ["بق الفراش", "لدغات الفراش", "علاج بق السرير"],
  ants: ["نمل المطبخ", "مسار النمل"],
  termites: ["النمل الأبيض", "أرضة المنزل", "إصابة الأرضة"],
  rodents: ["فئران المنزل", "مكافحة قوارض", "جرذان"],
  mosquitoes: ["مكافحة البعوض", "بعوض الحديقة"],
  flies: ["ذباب المطبخ", "مكافحة الذباب"],
  wasps: ["دبابير العش", "مكافحة الدبابير"],
  "after-spray-safety": ["التهوية بعد الرش", "السلامة بعد المبيد"],
};

/** روابط عرضية من دليل حشرة → صفحة الخدمة المناسبة */
const GUIDE_TO_SERVICE_HINTS: Record<string, LinkRule[]> = {
  termites: [
    { phrase: "برنامج معالجة الأرضة", href: PEST_SERVICE_RIYADH },
    { phrase: "فحص النمل الأبيض", href: PEST_SERVICE_RIYADH },
  ],
  cockroaches: [{ phrase: "رش صراصير احترافي", href: PEST_SERVICE_RIYADH }],
  "bed-bugs": [{ phrase: "برنامج بق الفراش", href: PEST_SERVICE_RIYADH }],
  rodents: [{ phrase: "برنامج مكافحة قوارض", href: PEST_SERVICE }],
};

/**
 * روابط متقاطعة بين أدلة الموسوعة — يستثني الدليل الحالي حتى لا يربط ذاته.
 */
export function buildPestGuideCrossLinkRules(excludeSlug?: string): LinkRule[] {
  const rules: LinkRule[] = [];
  const seen = new Set<string>();

  for (const guide of pestGuides) {
    if (guide.slug === excludeSlug) continue;
    const href = `/guides/pest/${guide.slug}`;
    const phrases = [guide.cardTitle, ...(EXTRA_PHRASES_BY_GUIDE_SLUG[guide.slug] ?? [])];

    for (const phrase of phrases) {
      const key = phrase.trim();
      if (key.length < 4 || seen.has(key)) continue;
      seen.add(key);
      rules.push({ phrase: key, href });
    }
  }

  if (excludeSlug && GUIDE_TO_SERVICE_HINTS[excludeSlug]) {
    for (const rule of GUIDE_TO_SERVICE_HINTS[excludeSlug]) {
      if (!seen.has(rule.phrase)) {
        seen.add(rule.phrase);
        rules.push(rule);
      }
    }
  }

  rules.sort((a, b) => b.phrase.length - a.phrase.length);
  return rules;
}

export function buildPestGuideAutolinkRules(pestGuideSlug?: string): LinkRule[] {
  const cross = pestGuideSlug ? buildPestGuideCrossLinkRules(pestGuideSlug) : [];
  const combined = [...cross, ...PEST_SERVICE_SYNONYM_RULES];
  const seen = new Set<string>();
  const out: LinkRule[] = [];

  for (const rule of combined) {
    if (seen.has(rule.phrase)) continue;
    seen.add(rule.phrase);
    out.push(rule);
  }

  out.sort((a, b) => b.phrase.length - a.phrase.length);
  return out;
}

export function getPestGuidePrimaryServiceHref(guideSlug: string): string {
  if (guideSlug === "after-spray-safety") return PEST_SERVICE;
  return PEST_SERVICE_RIYADH;
}
