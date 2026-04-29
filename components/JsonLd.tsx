import { buildSiteJsonLd } from "@/components/SeoJsonLd";

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSiteJsonLd()) }}
    />
  );
}
