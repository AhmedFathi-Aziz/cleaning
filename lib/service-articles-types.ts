export type ServiceSectionCta = {
  label: string;
  href: string;
  /** بعد أي فقرة يظهر الزر (افتراضي: آخر فقرة) */
  afterParagraphIndex?: number;
};

export type ServiceSectionFigure = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** بعد أي فقرة (افتراضي: 0) */
  afterParagraphIndex?: number;
  /** compact = بطاقة ضيقة؛ wide = عرض كامل داخل القسم */
  variant?: "compact" | "wide";
};

export type ServiceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  cta?: ServiceSectionCta;
  /** صور مرتبطة بالقسم (معدات، خطوات، إلخ) */
  figures?: ServiceSectionFigure[];
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
  /** كفر شعار على خلفية بيضاء — يُعرض كاملاً دون قصّ */
  heroImageFit?: "contain" | "cover";
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
