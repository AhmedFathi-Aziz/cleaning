export type LeadFormOption = {
  value: string;
  label: string;
};

export type LeadFormQuestion = {
  id: string;
  label: string;
  options: LeadFormOption[];
  required?: boolean;
};

const PROPERTY_SIZE: LeadFormQuestion = {
  id: "propertySize",
  label: "ما حجم المكان؟",
  required: true,
  options: [
    { value: "studio", label: "استوديو / غرفة واحدة" },
    { value: "apartment", label: "شقة (2–4 غرف)" },
    { value: "villa", label: "فيلا / دور مستقل" },
    { value: "commercial", label: "مكتب / محل / مطعم" },
    { value: "other", label: "أخرى" },
  ],
};

const BUDGET: LeadFormQuestion = {
  id: "budget",
  label: "ما الميزانية المتوقعة؟",
  required: true,
  options: [
    { value: "under-300", label: "أقل من 300 ريال" },
    { value: "300-600", label: "300 – 600 ريال" },
    { value: "600-1000", label: "600 – 1,000 ريال" },
    { value: "over-1000", label: "أكثر من 1,000 ريال" },
    { value: "inspection", label: "أفضّل معاينة وتقييم أولاً" },
  ],
};

const URGENCY: LeadFormQuestion = {
  id: "urgency",
  label: "متى تحتاج الخدمة؟",
  required: true,
  options: [
    { value: "today", label: "اليوم أو غداً" },
    { value: "3-days", label: "خلال 3 أيام" },
    { value: "week", label: "هذا الأسبوع" },
    { value: "flexible", label: "مرن — أريد أفضل موعد" },
  ],
};

const PEST_SEVERITY: LeadFormQuestion = {
  id: "problemScale",
  label: "ما حجم المشكلة لديك؟",
  required: true,
  options: [
    { value: "minor", label: "ظهور بسيط / حشرة واحدة" },
    { value: "recurring", label: "متكرر في نفس المكان" },
    { value: "spread", label: "انتشار في أكثر من غرفة" },
    { value: "emergency", label: "حالة طارئة — أحتاج تدخلاً سريعاً" },
  ],
};

const CLEANING_FREQUENCY: LeadFormQuestion = {
  id: "frequency",
  label: "هل الخدمة لمرة واحدة أم دورية؟",
  required: true,
  options: [
    { value: "once", label: "زيارة واحدة" },
    { value: "monthly", label: "تنظيف شهري" },
    { value: "weekly", label: "أسبوعي / متكرر" },
    { value: "move-in", label: "تسليم / انتقال سكن" },
  ],
};

function isPestService(slug: string): boolean {
  return slug.includes("pest");
}

/** أسئلة تأهيل العميل — تختلف قليلاً بين مكافحة الحشرات وباقي الخدمات */
export function getLeadFormQuestions(serviceSlug: string): LeadFormQuestion[] {
  if (isPestService(serviceSlug)) {
    return [PROPERTY_SIZE, PEST_SEVERITY, BUDGET, URGENCY];
  }
  return [PROPERTY_SIZE, CLEANING_FREQUENCY, BUDGET, URGENCY];
}

export function formatLeadAnswer(question: LeadFormQuestion, value: string): string {
  return question.options.find((o) => o.value === value)?.label ?? value;
}
