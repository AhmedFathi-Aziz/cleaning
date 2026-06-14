import type { ServiceArticle } from "@/lib/service-articles-types";

import { brandNameAr } from "@/lib/brand";

const ALT_MAX = 125;

/** نصوص أساسية فريدة لكل خدمة — تُدمج مع المدينة/الحي عند الحاجة (SEO صور + إمكانية الوصول) */
const SERVICE_HERO_ALT_BASE: Record<string, string> = {
  "house-cleaning":
    "تنظيف منازل بالرياض — غرفة معيشة نظيفة بفريق محترف ومعدات مناسبة للمنازل السعودية",
  "deep-home-cleaning": "تنظيف عميق للمنزل — أسقف ومفروشات وأسطح وخزائن وفق خطة واضحة",
  "carpet-cleaning": "غسيل سجاد وموكيت احترافي — شفط وتنظيف وتجفيف مناسب لنوع النسيج",
  "facade-cleaning":
    "تنظيف واجهات بالرياض — شعار السعودية للتنظيف على خلفية بيضاء لخدمة غسيل الزجاج والحجر والكلادينج",
  "sofa-cleaning": "تنظيف كنب ومجالس ومفروشات — بخار جاف ومواد تناسب الأقمشة",
  "pest-control": "مكافحة حشرات ورش وقائي وعلاجي — تقييم نقاط الدخول ومواد مناسبة للاستخدام الداخلي",
  "pest-control-riyadh":
    "شركة رش حشرات بالرياض — فني مكافحة حشرات بمعدات معتمدة داخل منزل سكني بالعاصمة",
  "water-tank-cleaning": "تنظيف خزانات بالرياض — تعقيم وغسيل خزان مياه علوي وأرضي بفريق متخصص",
  "garden-cleaning": "تنظيف حدائق ومسطحات خارجية — مخلفات ورطوبة وأتربة محيطة بالمنزل",
  "cleaning-company-riyadh":
    "شركة تنظيف بالرياض — فريق محترف ومعدات حديثة لخدمات النظافة السكنية والتجارية",
  "villa-cleaning-riyadh":
    "تنظيف فلل بالرياض — شعار السعودية للتنظيف على خلفية بيضاء لخدمة نظافة الفلل والقصور",
  "apartment-cleaning-riyadh":
    "تنظيف شقق بالرياض — شعار السعودية للتنظيف على خلفية بيضاء",
  "majlis-cleaning-riyadh":
    "تنظيف مجالس بالرياض — شعار السعودية للتنظيف على خلفية بيضاء لخدمة المجالس والوسائد",
  "sofa-cleaning-riyadh":
    "تنظيف كنب بالرياض — شعار السعودية للتنظيف على خلفية بيضاء لخدمة غسيل الكنب والمفروشات",
  "carpet-cleaning-riyadh":
    "تنظيف سجاد بالرياض — شعار السعودية للتنظيف على خلفية بيضاء لخدمة غسيل السجاد والموكيت",
  "post-construction-cleaning-riyadh":
    "تنظيف بعد التشطيب بالرياض — شعار السعودية للتنظيف على خلفية بيضاء لخدمة إزالة غبار البناء",
  /** عند إضافة صفحة «كشف تسربات» لاحقاً — مثال طلب المستخدم لجوجل صور */
  "leak-detection": "كشف تسربات المياه بأحدث الأجهزة الإلكترونية والحساسات",
};

/** صور كتل التسويق في الصفحة الرئيسية / خدمات — ليست مرتبطة بمسار ملف محدد */
export const marketingLayoutImageAlt = {
  villa:
    "تنظيف فلل وقصور في السعودية — صالة واسعة بنوافذ عالية وإضاءة طبيعية وأرضيات رخامية نظيفة",
  majlis: "تنظيف مجالس ومنسوجات سعودية تقليدية — أقمشة غنية وإضاءة دافئة وعناية بالبخار الجاف",
  pest: "مكافحة حشرات ورش منظم داخل المنزل — فني بمعدات حديثة في ممر نظيف ومعايير سلامة",
  waterTankPromo:
    "تعقيم خزانات مياه منزلية — مياه صحية للعائلة وفق خطوات تنظيف وشطف وتعقيم متفق عليها",
} as const;

export const homeHeroImageAlt =
  "فيلا عصرية بالرياض — غرفة واسعة بأرضيات خشبية وإضاءة طبيعية وحديقة خضراء";

/** صور بطاقات «لماذا تختارنا» في الصفحة الرئيسية */
export const featureCardImageAlt: Record<string, string> = {
  "trained-cleaning-team":
    "فريق تنظيف مدرب بالرياض — فنيون ينظفون فيلا عصرية بملابس احترافية ومعدات مناسبة",
  "safe-cleaning-materials":
    "مواد تنظيف آمنة وبيئية — منظفات ومعقمات معتمدة مرتبة لخدمة منزلية في الرياض",
  "punctual-cleaning-service":
    "دقة في المواعيد — سيارة خدمة تصل إلى فيلا بالرياض وفني يتحقق من موعد الزيارة",
};

function clipAlt(text: string, maxLen = ALT_MAX): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen - 1).trimEnd()}…`;
}

function cityInPhrase(cityName: string): string {
  if (cityName === "جدة") return "بجدة";
  if (cityName === "الرياض") return "بالرياض";
  if (cityName === "الدمام") return "بالدمام";
  if (cityName === "الخبر") return "بالخبر";
  if (cityName === "مكة المكرمة") return "بمكة المكرمة";
  if (cityName === "المدينة المنورة") return "بالمدينة المنورة";
  return `في ${cityName}`;
}

type ServiceHeroPick = Pick<ServiceArticle, "slug" | "shortTitle">;

/**
 * نص بديل لصورة بطل الخدمة — يتغير تلقائياً مع المدينة والحي لصفحات المواقع.
 * مثال عند إضافة خدمة كشف تسربات مع المدينة جدة: «كشف تسربات المياه بجدة - أحدث الأجهزة».
 */
export function buildServiceHeroImageAlt(
  service: ServiceHeroPick,
  ctx?: { cityName?: string; neighborhoodName?: string },
): string {
  const base =
    SERVICE_HERO_ALT_BASE[service.slug] ??
    `${service.shortTitle} — خدمة احترافية في الرياض`;

  if (service.slug === "leak-detection" && ctx?.cityName === "جدة" && !ctx.neighborhoodName) {
    return clipAlt("كشف تسربات المياه بجدة - أحدث الأجهزة");
  }

  if (ctx?.neighborhoodName && ctx?.cityName) {
    return clipAlt(`${base} في حي ${ctx.neighborhoodName}، ${ctx.cityName}`);
  }
  if (ctx?.cityName) {
    return clipAlt(`${base} ${cityInPhrase(ctx.cityName)}`);
  }
  return clipAlt(`${base} — ${brandNameAr}`);
}

/** يُستخدم في `title` على `<img>` / `next/image` لتوضيح الصورة في المتصفحات وأدوات SEO */
export function buildServiceHeroImageTitle(
  service: ServiceHeroPick,
  ctx?: { cityName?: string; neighborhoodName?: string },
): string {
  return buildServiceHeroImageAlt(service, ctx);
}
