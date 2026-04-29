import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";
import { featureArticles } from "@/lib/feature-articles";
import { serviceArticles } from "@/lib/service-articles";
import { staticBlogPosts } from "@/lib/static-blog-posts";
import { locations } from "@/src/data/locations";

/** مقالات المدونة في الـ sitemap وقت البناء — من الملف الثابت فقط لتجنّب استدعاء Cloudflare bindings أثناء التوليد الثابت (كان يسبب بطءاً وتجاوز 60 ثانية). مقالات KV تظهر في /blog حياً دون إدراجها هنا إلا بعد نشر يحدّث البناء. */

/** https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/areas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const blogEntries: MetadataRoute.Sitemap = staticBlogPosts.map((p) => ({
    url: `${siteUrl}/blog/${encodeURIComponent(p.slug)}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const featureEntries: MetadataRoute.Sitemap = featureArticles.map((article) => ({
    url: `${siteUrl}/features/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceEntries: MetadataRoute.Sitemap = serviceArticles.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const neighborhoodEntries: MetadataRoute.Sitemap = locations.flatMap((city) =>
    city.neighborhoods.map((neighborhood) => ({
      url: `${siteUrl}/${city.slug}/${neighborhood.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const serviceLocationEntries: MetadataRoute.Sitemap = serviceArticles.flatMap((service) =>
    locations.flatMap((city) =>
      city.neighborhoods.map((neighborhood) => ({
        url: `${siteUrl}/services/${service.slug}/${city.slug}/${neighborhood.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.75,
      })),
    ),
  );

  return [
    ...base,
    ...serviceEntries,
    ...neighborhoodEntries,
    ...serviceLocationEntries,
    ...featureEntries,
    ...blogEntries,
  ];
}
