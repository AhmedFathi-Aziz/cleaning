/** المدينة الأساسية للموقع — مصدر واحد للرسالة والـ SEO المحلي */
export const primaryCitySlug = "riyadh";
export const primaryCityNameAr = "الرياض";
export const primaryCityNameEn = "Riyadh";
export const primaryRegionLabelAr = "منطقة الرياض";

export const sitePositioningAr =
  "شركة تنظيف ومكافحة حشرات في الرياض: موسوعة عملية لخدمات النظافة ورش الآفات مع تغطية أحياء العاصمة.";

export function isPrimaryCitySlug(citySlug: string): boolean {
  return citySlug === primaryCitySlug;
}

