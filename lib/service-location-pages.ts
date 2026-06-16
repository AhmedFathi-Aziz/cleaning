import { serviceArticles } from "@/lib/service-articles";
import { isServiceLocationIndexable } from "@/lib/url-indexing-policy";
import { primaryCitySlug } from "@/lib/region";
import { locations } from "@/src/data/locations";

/** @deprecated كل الخدمات محلية للرياض فقط — انظر url-indexing-policy */
export const RIYADH_SCOPED_SERVICE_SLUGS = new Set(
  serviceArticles.map((s) => s.slug),
);

export { isServiceLocationIndexable, isServiceLocationIndexable as isServiceLocationPairAllowed } from "@/lib/url-indexing-policy";

export function getServiceLocationStaticParams(): {
  category: string;
  city: string;
  neighborhood: string;
}[] {
  const city = locations.find((c) => c.slug === primaryCitySlug);
  if (!city) return [];

  return serviceArticles.flatMap((service) =>
    city.neighborhoods
      .filter((neighborhood) =>
        isServiceLocationIndexable(service.slug, city.slug, neighborhood.slug),
      )
      .map((neighborhood) => ({
        category: service.slug,
        city: city.slug,
        neighborhood: neighborhood.slug,
      })),
  );
}
