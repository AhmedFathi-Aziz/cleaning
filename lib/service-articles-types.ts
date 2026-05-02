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
  image: string;
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
