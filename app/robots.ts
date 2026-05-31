import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * يولّد /robots.txt — بدون توجيهات غير قياسية حتى يمرّ Lighthouse وبرامج الزحف الكلاسيكية.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
