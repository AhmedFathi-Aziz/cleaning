import type { MetadataRoute } from "next";

import { buildSiteSitemap } from "@/lib/sitemap/build-site-sitemap";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSiteSitemap();
}
