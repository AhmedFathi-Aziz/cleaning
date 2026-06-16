import type { ServiceFamily } from "@/lib/service-location-uniqueness";

export type NeighborhoodFaq = { question: string; answer: string };

/**
 * محتوى مرجعي فريد لكل حي — مشاكل وأمثلة وأسئلة لا تُستبدل بقوالب عامة.
 * المفتاح: `{citySlug}/{neighborhoodSlug}` مثل `riyadh/olaya`.
 */
export type NeighborhoodSpecificProfile = {
  /** فقرة «حالة محلية» تظهر في المقدمة وقسم مستقل */
  localCase: string;
  /** مشاكل عامة للحي (تنظيف، غبار، بنية…) */
  issues: string[];
  /** مشاكل مرتبطة بعائلة الخدمة */
  byFamily?: Partial<Record<ServiceFamily, string[]>>;
  /** أمثلة ملموسة من طلبات شائعة في الحي */
  localExamples: string[];
  /** توصيات عملية حسب الخدمة */
  recommendations?: Partial<Record<ServiceFamily, string[]>>;
  /** أسئلة شائعة فريدة — تُدمج مع FAQ العامة */
  faqs: NeighborhoodFaq[];
};
