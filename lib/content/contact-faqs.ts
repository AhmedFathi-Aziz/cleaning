import type { FaqPair } from "@/lib/schema-org/constants";
import { brandWorkingHoursAr } from "@/lib/brand";

/**
 * Must stay in sync with the visible <details> FAQ block in `components/SiteContact.tsx`.
 */
export const contactPageFaqs: FaqPair[] = [
  {
    question: "هل يمكنني طلب عرض سعر قبل إتمام الحجز؟",
    answer:
      "نعم؛ اذكروا نوع المساحة والخدمة المطلوبة عبر الهاتف أو واتساب أو البريد، وسنساعدكم بملخص مناسب لحالتكم.",
  },
  {
    question: "هل التغطية تشمل كل أحياء الرياض؟",
    answer:
      "نعمل في أحياء الرياض المدرجة في صفحة تنظيف حسب الحي. للمدن الأخرى راجعوا مناطق التغطية أو اسألوا الفريق عند الاتصال.",
  },
  {
    question: "ما أفضل وقت للاتصال إذا كان الطلب عاجلاً؟",
    answer: `يُفضَّل التواصل خلال ${brandWorkingHoursAr} لضمان أسرع استجابة من فريق التنسيق.`,
  },
];
