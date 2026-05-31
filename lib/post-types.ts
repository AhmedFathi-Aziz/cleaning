export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  bodyMd: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  author?: string;
  coverImage?: string;
  /** مفتاح الملف العام (يُخزَّن في R2 أو KV حسب الإعداد) */
  coverKey: string | null;
  publishedAt: string;
  updatedAt?: string;
};

