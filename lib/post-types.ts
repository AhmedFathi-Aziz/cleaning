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

export const R2_POSTS_KEY = "posts.json";
export const R2_MEDIA_PREFIX = "media/";
/** مفتاح قائمة المقالات في KV */
export const KV_POSTS_KEY = "posts.json";
/** بادئة مفاتيح الصور في KV */
export const KV_MEDIA_PREFIX = "m:";
export const SESSION_COOKIE = "itqan_session";
