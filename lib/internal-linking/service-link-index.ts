import { serviceArticles } from "@/lib/service-articles";

export type ServiceLinkRule = {
  phrase: string;
  href: string;
};

const MIN_PHRASE_LENGTH = 5;

/** عبارات إضافية شائعة في المقالات → slug الخدمة */
const EXTRA_PHRASES_BY_SLUG: Record<string, string[]> = {
  "cleaning-company-riyadh": [
    "شركة تنظيف بالرياض",
    "شركة تنظيف في الرياض",
    "شركات تنظيف بالرياض",
    "شركة تنظيف منازل بالرياض",
    "أفضل شركة تنظيف",
    "شركة تنظيف معتمدة",
  ],
  "house-cleaning": [
    "تنظيف منزل",
    "تنظيف منازل",
    "شركة تنظيف منازل",
    "خدمة تنظيف منازل",
    "تنظيف دوري",
    "تنظيف دوري شهري",
  ],
  "apartment-cleaning-riyadh": [
    "تنظيف الشقق",
    "تنظيف شقة",
    "تنظيف شقق سكنية",
    "شركة تنظيف شقق",
    "تنظيف أبراج سكنية",
    "تنظيف مجمع سكني",
    "تنظيف شقة مفروشة",
    "تنظيف شقة قبل الاستقبال",
  ],
  "carpet-cleaning-riyadh": [
    "تنظيف سجاد",
    "غسيل سجاد",
    "تنظيف السجاد",
    "شركة غسيل سجاد",
    "غسيل سجاد بالبخار",
    "تنظيف موكيت",
    "غسيل موكيت",
    "إزالة بقع السجاد",
  ],
  "sofa-cleaning-riyadh": [
    "تنظيف كنب",
    "غسيل كنب",
    "تنظيف الكنب",
    "شركة تنظيف كنب",
    "غسيل كنب بالبخار",
    "تنظيف شازلونج",
    "تنظيف مفروشات",
    "إزالة بقع الكنب",
  ],
  "majlis-cleaning-riyadh": [
    "تنظيف مجالس",
    "غسيل مجالس",
    "تنظيف مجلس",
    "شركة تنظيف مجالس",
    "تنظيف مجالس تراثية",
    "تنظيف وسائد مجلس",
    "غسيل مجالس بالبخار",
    "تنظيف صالة استقبال",
  ],
  "villa-cleaning-riyadh": [
    "تنظيف الفلل",
    "تنظيف فلل",
    "تنظيف فيلات",
    "شركة تنظيف فلل",
    "تنظيف فلل سكنية",
    "تنظيف فلة",
    "تنظيف فلل بالرياض",
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
  ],
  "post-construction-cleaning-riyadh": [
    "تنظيف بعد التشطيب",
    "تنظيف بعد التشطيب بالرياض",
    "تنظيف بعد البناء",
    "تنظيف بعد البناء بالرياض",
    "تنظيف ما بعد التشطيب",
    "شركة تنظيف بعد التشطيب",
    "إزالة غبار البناء",
    "تنظيف شقة بعد التشطيب",
    "تنظيف فيلا بعد التشطيب",
    "تنظيف عميق بعد التشطيب",
    "غسيل نوافذ بعد التشطيب",
    "تعقيم منزل جديد",
  ],
  "carpet-cleaning": ["عناية بالموكيت", "صيانة سجاد عامة"],
  "sofa-cleaning": ["تنظيف مفروشات عام", "عناية بالكنب"],
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
    "خدمة مكافحة حشرات",
    "برنامج وقاية حشرية",
  ],
  "pest-control-riyadh": [
    "شركة رش حشرات بالرياض",
    "رش حشرات بالرياض",
    "مكافحة حشرات الرياض",
    "رش مبيدات بالرياض",
    "مكافحة آفات منزلية",
    "معالجة حشرية منزلية",
    "فريق رش معتمد",
  ],
  "water-tank-cleaning": ["تنظيف خزانات المياه", "تعقيم خزانات", "غسيل خزانات"],
  "garden-cleaning": ["تنظيف الحدائق", "تنسيق حدائق", "تنظيف فناء"],
};

const GUIDE_PHRASES: ServiceLinkRule[] = [
  { phrase: "موسوعة مكافحة الحشرات", href: "/guides/pest" },
  { phrase: "موسوعة الحشرات", href: "/guides/pest" },
  { phrase: "أدلة مكافحة الحشرات", href: "/guides/pest" },
];

const SITE_HUB_PHRASES: ServiceLinkRule[] = [
  { phrase: "تنظيف منازل في أحياء الرياض", href: "/cleaning#riyadh" },
  { phrase: "أحياء الرياض للتنظيف", href: "/cleaning" },
  { phrase: "صفحات أحياء الرياض", href: "/cleaning#riyadh" },
];

let cachedRules: ServiceLinkRule[] | null = null;

export function buildServiceLinkRules(): ServiceLinkRule[] {
  if (cachedRules) return cachedRules;

  const rules: ServiceLinkRule[] = [...GUIDE_PHRASES, ...SITE_HUB_PHRASES];
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
