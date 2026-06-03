export type ServiceSectionCta = {
  label: string;
  href: string;
  /** بعد أي فقرة يظهر الزر (افتراضي: آخر فقرة) */
  afterParagraphIndex?: number;
};

export type ServiceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  cta?: ServiceSectionCta;
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
  /** عرض الصورة كاملة بدون قصّ (افتراضي: inline داخل أول قسم) */
  contentImageDisplay?: "full" | "inline";
  contentImageWidth?: number;
  contentImageHeight?: number;
  /** داخل أي قسم تُدرج الصورة (افتراضي: 1) */
  contentImageSectionIndex?: number;
  /** بعد أي فقرة في ذلك القسم (افتراضي: 0 = بعد الأولى) */
  contentImageAfterParagraph?: number;
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
