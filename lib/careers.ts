/**
 * الوظائف المتاحة — عدّل القائمة عند فتح أي دور.
 */
export type CareerOpening = {
  id: string;
  title: string;
  department?: string;
  location?: string;
  /** مثال: دوام كامل، عن بُعد، عقد */
  employmentType?: string;
  description: string;
  /** تاريخ نشر الإعلان (ISO) */
  publishedAt?: string;
};

export const careerOpenings: CareerOpening[] = [
  /*
  {
    id: "supervisor-riyadh-01",
    title: "مشرف فريق تنظيف",
    department: "العمليات",
    location: "الرياض",
    employmentType: "دوام كامل",
    description: "نبحث عن مشرفاً بخبرة في الإشراف على فرق التنظيف الميدانية.",
    publishedAt: "2026-04-15",
  },
  */
];
