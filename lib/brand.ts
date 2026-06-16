/** اسم الشركة والهوية — المملكة العربية السعودية */
export const brandNameAr = "السعودية للتنظيف";
export const brandNameEn = "Saudi Cleaning";
export const brandEmail = "info@saudi-cleaning.com";

const PLACEHOLDER_PHONE_E164 = "+966110000000";

function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

function formatPhoneDisplay(e164: string): string {
  const d = digitsOnly(e164);
  if (d.length === 12 && d.startsWith("966")) {
    return `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
  }
  return e164;
}

/** رقم الاتصال — عيّن NEXT_PUBLIC_BRAND_PHONE في الإنتاج (E.164 مثل +9665xxxxxxxx) */
export const brandPhone =
  process.env.NEXT_PUBLIC_BRAND_PHONE?.trim() || PLACEHOLDER_PHONE_E164;

export const brandPhoneDisplay =
  process.env.NEXT_PUBLIC_BRAND_PHONE_DISPLAY?.trim() || formatPhoneDisplay(brandPhone);

export const brandWhatsapp = (() => {
  const raw = process.env.NEXT_PUBLIC_BRAND_WHATSAPP?.trim();
  if (raw?.startsWith("http")) return raw;
  const waDigits = raw ? digitsOnly(raw) : digitsOnly(brandPhone);
  return `https://wa.me/${waDigits}`;
})();
/** لون واتساب الرسمي — أزرار ونماذج التواصل */
export const brandWhatsappColor = "#128C7E";
export const brandWhatsappColorHover = "#0f7a6e";
export const brandAddressAr = "الرياض، المملكة العربية السعودية";
/** عرض موحّد في صفحة اتصل بنا وبيانات الهيكلة — يتوافق مع ساعات العمل في Schema */
export const brandWorkingHoursAr =
  "يومياً من 8:00 صباحاً إلى 10:00 مساءً بتوقيت المملكة العربية السعودية";
/** شعار WebP شفاف للهيدر والـ JSON-LD — يُحدَّث من `npm run brand:logo` */
export const brandLogoPath = "/brand-logo-192.webp";
/** نسخة أكبر للـ OG/schema عند الحاجة */
export const brandLogoLargePath = "/brand-logo-512.webp";

/** وصف الشركة بالعربية لـ JSON-LD ونتائج البحث عن العلامة التجارية */
export const brandDescriptionAr =
  "شركة تنظيف ومكافحة حشرات في الرياض: موسوعة عملية لخدمات النظافة ورش الآفات — تنظيف منازل ومكاتب، غسيل سجاد، تنظيف واجهات، وخطط وقائية وعلاجية بمواد مناسبة وفريق مدرّب.";
