export type NationalNewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  bodyMd: string;
  /** رابط المصدر الخارجي (إلزامي عند الإنشاء من لوحة التحكم) */
  sourceUrl: string;
  /** تسمية تظهر في الواجهة، مثل اسم الجهة أو الموقع */
  sourceLabel?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  publishedAt: string;
  updatedAt?: string;
};

/** ملف JSON في سلة MEDIA (نفس دلو المدونة) */
export const R2_NATIONAL_NEWS_KEY = "national-news.json";
/** مفتاح القائمة في KV */
export const KV_NATIONAL_NEWS_KEY = "national-news.json";
