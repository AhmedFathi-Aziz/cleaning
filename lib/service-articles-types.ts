export type ServiceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ServiceArticle = {
  slug: string;
  title: string;
  shortTitle: string;
  excerpt: string;
  /** عنوان SEO — إن وُجد يُستخدم في metadata بدل title */
  seoTitle?: string;
  seoDescription?: string;
  image: string;
  /** صورة محتوى اختيارية — تُعرض داخل المقال بعد المقدمة */
  contentImage?: string;
  contentImageAlt?: string;
  icon: string;
  keywords: string[];
  /** نقاط سريعة تظهر تحت المقدمة لتسهيل المسح البصري */
  keyTakeaways?: string[];
  sections: ServiceSection[];
  includes: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};
