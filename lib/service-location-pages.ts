import { primaryCitySlug } from "@/lib/region";
import { serviceArticles } from "@/lib/service-articles";
import { getNeighborhoodBySlug, locations } from "@/src/data/locations";

/** خدمات مُسمّاة للرياض — لا نُنشئ صفحات محلية لها خارج الرياض */
export const RIYADH_SCOPED_SERVICE_SLUGS = new Set([
  "apartment-cleaning-riyadh",
  "cleaning-company-riyadh",
  "villa-cleaning-riyadh",
  "majlis-cleaning-riyadh",
  "sofa-cleaning-riyadh",
  "carpet-cleaning-riyadh",
  "post-construction-cleaning-riyadh",
]);

export function isServiceLocationPairAllowed(
  serviceSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
): boolean {
  if (!getNeighborhoodBySlug(citySlug, neighborhoodSlug)) return false;
  if (RIYADH_SCOPED_SERVICE_SLUGS.has(serviceSlug) && citySlug !== primaryCitySlug) return false;
  return true;
}

export function getServiceLocationStaticParams(): {
  category: string;
  city: string;
  neighborhood: string;
}[] {
  return serviceArticles.flatMap((service) =>
    locations.flatMap((city) =>
      city.neighborhoods
        .filter((neighborhood) =>
          isServiceLocationPairAllowed(service.slug, city.slug, neighborhood.slug),
        )
        .map((neighborhood) => ({
          category: service.slug,
          city: city.slug,
          neighborhood: neighborhood.slug,
        })),
    ),
  );
}
