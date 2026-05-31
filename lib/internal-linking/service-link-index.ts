import { serviceArticles } from "@/lib/service-articles";

export type ServiceLinkRule = {
  phrase: string;
  href: string;
};

const MIN_PHRASE_LENGTH = 5;

/** عبارات إضافية شائعة في المقالات → slug الخدمة */
const EXTRA_PHRASES_BY_SLUG: Record<string, string[]> = {
  "house-cleaning": [
    "تنظيف منزل",
    "تنظيف الشقق",
    "تنظيف الفلل",
    "شركة تنظيف منازل",
    "خدمة تنظيف منازل",
    "تنظيف دوري",
    "تنظيف دوري شهري",
  ],
  "deep-home-cleaning": [
    "تنظيف عميق",
    "تنظيف عميق للمنزل",
    "تنظيف عميق للمطبخ",
    "تنظيف المطابخ",
    "تنظيف مطابخ",
    "شركة تنظيف مطابخ",
    "شركات تنظيف مطابخ",
    "تنظيف مطابخ محترفة",
    "تنظيف شامل",
    "تنظيف شامل مع تعقيم",
    "تنظيف بعد البناء",
    "تنظيف ما بعد البناء",
    "تنظيف بعد التشطيب",
  ],
  "carpet-cleaning": [
    "غسيل السجاد",
    "غسيل سجاد",
    "تنظيف السجاد",
    "تنظيف سجاد",
    "تنظيف الموكيت",
    "غسيل موكيت",
    "إزالة بقع السجاد",
  ],
  "sofa-cleaning": ["تنظيف الكنب", "غسيل كنب", "تنظيف مجالس", "تنظيف مفروشات"],
  "facade-cleaning": [
    "غسيل واجهات",
    "تنظيف واجهات",
    "تنظيف واجهات زجاج",
    "غسيل واجهات زجاج",
  ],
  "pest-control": [
    "مكافحة حشرات",
    "مكافحة الحشرات",
    "مكافحة آفات",
    "مكافحة الآفات",
    "رش حشرات",
    "رش مبيدات",
    "شركة مكافحة حشرات",
    "شركة رش حشرات",
    "رش صراصير",
    "مكافحة صراصير",
  ],
  "water-tank-cleaning": ["تنظيف خزانات المياه", "تعقيم خزانات", "غسيل خزانات"],
  "garden-cleaning": ["تنظيف الحدائق", "تنسيق حدائق", "تنظيف فناء"],
};

const GUIDE_PHRASES: ServiceLinkRule[] = [
  { phrase: "موسوعة مكافحة الحشرات", href: "/guides/pest" },
  { phrase: "موسوعة الحشرات", href: "/guides/pest" },
  { phrase: "أدلة مكافحة الحشرات", href: "/guides/pest" },
];

let cachedRules: ServiceLinkRule[] | null = null;

export function buildServiceLinkRules(): ServiceLinkRule[] {
  if (cachedRules) return cachedRules;

  const rules: ServiceLinkRule[] = [...GUIDE_PHRASES];
  const seen = new Set<string>();

  for (const article of serviceArticles) {
    const href = `/services/${article.slug}`;
    const phrases = new Set<string>();

    phrases.add(article.shortTitle);
    const titleCore = article.title.replace(/\s+في\s+الرياض\s*$/u, "").trim();
    if (titleCore.length >= MIN_PHRASE_LENGTH) phrases.add(titleCore);

    for (const kw of article.keywords) {
      if (kw.length >= MIN_PHRASE_LENGTH) phrases.add(kw);
    }
    for (const extra of EXTRA_PHRASES_BY_SLUG[article.slug] ?? []) {
      phrases.add(extra);
    }

    for (const phrase of phrases) {
      const key = phrase.trim();
      if (key.length < MIN_PHRASE_LENGTH || seen.has(key)) continue;
      seen.add(key);
      rules.push({ phrase: key, href });
    }
  }

  rules.sort((a, b) => b.phrase.length - a.phrase.length);
  cachedRules = rules;
  return rules;
}
