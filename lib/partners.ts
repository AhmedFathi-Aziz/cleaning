/** Partner logos — files live under `public/partners/`. */

export type PartnerLogoItem = {
  /** Arabic display name */
  name: string;
  /** Path under `/public` (SVG or WebP). */
  logo: string;
};

/** الصفحة الرئيسية — شريط الشركاء (نفس الأصول في `public/partners/*.webp`). */
export const homePartners: PartnerLogoItem[] = [
  { name: "المؤسسة العامة للتدريب التقني والمهني", logo: "/partners/technical-vocational-training.webp" },
  { name: "الهيئة العامة للنقل", logo: "/partners/transport-general-authority.webp" },
  { name: "وزارة الاقتصاد والتخطيط", logo: "/partners/economy-planning.webp" },
  { name: "وزارة التجارة", logo: "/partners/commerce-ministry-new.webp" },
  { name: "وزارة الثقافة", logo: "/partners/culture-ministry.webp" },
  { name: "وزارة الحج والعمرة", logo: "/partners/hajj-umrah.webp" },
  { name: "وزارة النقل والخدمات اللوجستية", logo: "/partners/transport-logistics-1.webp" },
  { name: "سمة", logo: "/partners/simah-new.webp" },
  { name: "Huawei", logo: "/partners/huawei-new.webp" },
  { name: "ماجد الفطيم", logo: "/partners/majid-al-futtaim-new.webp" },
  { name: "الماجد للعود", logo: "/partners/almajd-oud-new.webp" },
  { name: "مايسترو بيتزا", logo: "/partners/maestro-pizza-new.webp" },
  { name: "طيران ناس", logo: "/partners/flynas-new.webp" },
  { name: "Marriott Riyadh", logo: "/partners/marriott-riyadh-new.webp" },
];

/**
 * صفحة من نحن — شبكة الشركات (شعارات متجهية من Wikimedia / Wikipedia حيث توفرت؛
 * وباقي الجهات بنص لاتيني على بطاقة بيضاء حيث لا يوجد ملف عام مرخّص).
 */
export const aboutCorporatePartners: PartnerLogoItem[] = [
  { name: "طيران الإمارات", logo: "/partners/emirates-logo.svg" },
  { name: "STC", logo: "/partners/stc-logo.svg" },
  { name: "البنك الأهلي", logo: "/partners/snb-logo.svg" },
  { name: "الراجحي", logo: "/partners/alrajhi-logo.svg" },
  { name: "الرياض", logo: "/partners/riyad-logo.svg" },
  { name: "الإنماء", logo: "/partners/alinma-logo.svg" },
  { name: "هيلتون", logo: "/partners/hilton-logo.svg" },
  { name: "ماريوت", logo: "/partners/marriott-intl-logo.svg" },
  { name: "فور سيزونز", logo: "/partners/fourseasons-logo.svg" },
  { name: "سابك", logo: "/partners/sabic-logo.svg" },
  { name: "أرامكو", logo: "/partners/aramco-logo.svg" },
  { name: "المراعي", logo: "/partners/almarai-logo.svg" },
  { name: "سيرا", logo: "/partners/seera-logo.svg" },
];
