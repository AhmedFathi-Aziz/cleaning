import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

/** https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
