/**
 * يتحقق أن كل URL في sitemap له صفحة مبنية (لا 404).
 * npx tsx scripts/verify-sitemap-pages.mjs
 */
import { buildSiteSitemap } from "../lib/sitemap/build-site-sitemap.ts";
import { serviceArticles } from "../lib/service-articles.ts";
import { getServiceLocationStaticParams } from "../lib/service-location-pages.ts";
import { featureArticles } from "../lib/feature-articles.ts";
import { pestGuides } from "../lib/pest-guides/index.ts";
import { loadPosts } from "../lib/post-store.ts";
import { loadNationalNews } from "../lib/national-news-store.ts";
import { locations } from "../src/data/locations.ts";
import { isNeighborhoodHubIndexable } from "../lib/url-indexing-policy.ts";

const STATIC = [
  "/",
  "/services",
  "/about",
  "/team",
  "/contact",
  "/estimate",
  "/areas",
  "/cleaning",
  "/guides/pest",
  "/blog",
  "/news",
  "/careers",
  "/privacy",
  "/terms",
];

function pathFromUrl(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

const sitemapPaths = buildSiteSitemap().map((e) => pathFromUrl(e.url));

const built = new Set();
for (const p of STATIC) built.add(p);
for (const s of serviceArticles) built.add(`/services/${s.slug}`);
for (const p of getServiceLocationStaticParams()) {
  built.add(`/services/${p.category}/${p.city}/${p.neighborhood}`);
}
for (const f of featureArticles) built.add(`/features/${f.slug}`);
for (const g of pestGuides) built.add(`/guides/pest/${g.slug}`);
for (const post of loadPosts()) built.add(`/blog/${encodeURIComponent(post.slug)}`);
for (const article of loadNationalNews()) built.add(`/news/${encodeURIComponent(article.slug)}`);
for (const city of locations) {
  if (!isNeighborhoodHubIndexable(city.slug)) continue;
  for (const n of city.neighborhoods) built.add(`/${city.slug}/${n.slug}`);
}

const missing = sitemapPaths.filter((p) => !built.has(p)).sort();

console.log(`sitemap URLs: ${sitemapPaths.length}`);
console.log(`built pages (indexable set): ${built.size}`);
console.log(`sitemap → 404 risk: ${missing.length}`);
if (missing.length) {
  console.log(missing.join("\n"));
  process.exitCode = 1;
} else {
  console.log("OK — كل URL في sitemap له صفحة مبنية.");
}
