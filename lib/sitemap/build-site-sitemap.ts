import type { MetadataRoute } from "next";

import { featureArticles } from "@/lib/feature-articles";
import { loadNationalNews } from "@/lib/national-news-store";
import { loadPosts } from "@/lib/post-store";
import { getCleaningProgrammaticStaticParams } from "@/lib/programmatic-cleaning-seo";
import { pestGuides } from "@/lib/pest-guides";
import { isPrimaryCitySlug } from "@/lib/region";
import { getServiceLocationStaticParams } from "@/lib/service-location-pages";
import { serviceArticles } from "@/lib/service-articles";
import { siteUrl } from "@/lib/site";
import { locations } from "@/src/data/locations";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;

function sitemapEntry(
  path: string,
  opts: {
    lastModified?: Date;
    changeFrequency?: ChangeFrequency;
    priority?: number;
  } = {},
): SitemapEntry {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return {
    url: `${siteUrl}${normalized}`,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency ?? "monthly",
    priority: opts.priority ?? 0.7,
  };
}

function dedupeByUrl(entries: SitemapEntry[]): SitemapEntry[] {
  const seen = new Set<string>();
  const out: SitemapEntry[] = [];
  for (const entry of entries) {
    if (seen.has(entry.url)) continue;
    seen.add(entry.url);
    out.push(entry);
  }
  return out;
}

const STATIC_PAGES: Array<{ path: string; priority: number; changeFrequency: ChangeFrequency }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/team", priority: 0.78, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
  { path: "/estimate", priority: 0.88, changeFrequency: "monthly" },
  { path: "/areas", priority: 0.85, changeFrequency: "monthly" },
  { path: "/cleaning", priority: 0.9, changeFrequency: "weekly" },
  { path: "/guides/pest", priority: 0.9, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.85, changeFrequency: "weekly" },
  { path: "/news", priority: 0.8, changeFrequency: "weekly" },
  { path: "/careers", priority: 0.75, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.5, changeFrequency: "yearly" },
];

export function buildSiteSitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogPosts = loadPosts();
  const newsArticles = loadNationalNews();

  const staticEntries = STATIC_PAGES.map((p) =>
    sitemapEntry(p.path, { lastModified: now, priority: p.priority, changeFrequency: p.changeFrequency }),
  );

  const serviceEntries = serviceArticles.map((service) =>
    sitemapEntry(`/services/${service.slug}`, {
      lastModified: now,
      priority: 0.85,
      changeFrequency: "monthly",
    }),
  );

  const featureEntries = featureArticles.map((article) =>
    sitemapEntry(`/features/${article.slug}`, {
      lastModified: now,
      priority: 0.8,
      changeFrequency: "monthly",
    }),
  );

  const pestGuideEntries = pestGuides.map((guide) =>
    sitemapEntry(`/guides/pest/${guide.slug}`, {
      lastModified: now,
      priority: 0.84,
      changeFrequency: "monthly",
    }),
  );

  const blogEntries = blogPosts.map((post) =>
    sitemapEntry(`/blog/${encodeURIComponent(post.slug)}`, {
      lastModified: new Date(post.publishedAt),
      priority: 0.72,
      changeFrequency: "monthly",
    }),
  );

  const newsEntries = newsArticles.map((article) =>
    sitemapEntry(`/news/${encodeURIComponent(article.slug)}`, {
      lastModified: new Date(article.publishedAt),
      priority: 0.7,
      changeFrequency: "monthly",
    }),
  );

  const neighborhoodEntries = locations.flatMap((city) =>
    city.neighborhoods.map((neighborhood) =>
      sitemapEntry(`/${city.slug}/${neighborhood.slug}`, {
        lastModified: now,
        priority: isPrimaryCitySlug(city.slug) ? 0.82 : 0.62,
        changeFrequency: "monthly",
      }),
    ),
  );

  const cleaningEntries = getCleaningProgrammaticStaticParams().map(({ citySlug, districtSlug }) =>
    sitemapEntry(`/cleaning/${citySlug}/${districtSlug}`, {
      lastModified: now,
      priority: isPrimaryCitySlug(citySlug) ? 0.85 : 0.65,
      changeFrequency: "monthly",
    }),
  );

  const serviceLocationEntries = getServiceLocationStaticParams().map(({ category, city, neighborhood }) =>
    sitemapEntry(`/services/${category}/${city}/${neighborhood}`, {
      lastModified: now,
      priority: isPrimaryCitySlug(city) ? 0.8 : 0.65,
      changeFrequency: "monthly",
    }),
  );

  return dedupeByUrl([
    ...staticEntries,
    ...serviceEntries,
    ...featureEntries,
    ...pestGuideEntries,
    ...blogEntries,
    ...newsEntries,
    ...neighborhoodEntries,
    ...cleaningEntries,
    ...serviceLocationEntries,
  ]);
}
