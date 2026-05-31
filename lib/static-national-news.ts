/**
 * أخبار وطنية ثابتة — تُحمَّل من lib/generated (يُبنى من ملفات JSON عند prebuild).
 * على Cloudflare Worker لا يُستخدم fs وقت التشغيل.
 */
export {
  staticNationalNewsArticles,
  getStaticNationalNewsSlugs,
} from "@/lib/generated/national-news-articles";
