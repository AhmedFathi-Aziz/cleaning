export type PestGuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type PestGuide = {
  slug: string;
  title: string;
  cardTitle: string;
  excerpt: string;
  icon: string;
  keywords: string[];
  sections: PestGuideSection[];
  faqs: Array<{ question: string; answer: string }>;
};
