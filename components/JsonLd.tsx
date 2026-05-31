import { buildSiteJsonLd } from "@/components/SeoJsonLd";
import { StructuredDataScript } from "@/components/StructuredDataScript";

export function JsonLd() {
  return <StructuredDataScript data={buildSiteJsonLd()} id="jsonld-site-graph" />;
}
