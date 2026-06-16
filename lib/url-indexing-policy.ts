import { primaryCitySlug, isPrimaryCitySlug } from "@/lib/region";
import { getNeighborhoodBySlug, locations } from "@/src/data/locations";

/** قسم «تنظيف منازل» داخل صفحة الحي الموحّدة — بديل مسار /cleaning/... */
export const NEIGHBORHOOD_HOUSE_CLEANING_SECTION_ID = "tanzeef-manazil";

/**
 * خدمات تستحق صفحة `/services/{slug}/{city}/{neighborhood}` مفهرسة.
 * باقي الخدمات تربط بصفحة الخدمة الوطنية فقط لتقليل cannibalization.
 */
export const PRIMARY_SERVICE_LOCATION_SLUGS = [
  "cleaning-company-riyadh",
  "house-cleaning",
  "pest-control-riyadh",
  "deep-home-cleaning",
  "water-tank-cleaning",
  "carpet-cleaning-riyadh",
  "villa-cleaning-riyadh",
  "apartment-cleaning-riyadh",
] as const;

export type PrimaryServiceLocationSlug = (typeof PRIMARY_SERVICE_LOCATION_SLUGS)[number];

const PRIMARY_SET = new Set<string>(PRIMARY_SERVICE_LOCATION_SLUGS);

export function isNeighborhoodHubIndexable(citySlug: string): boolean {
  return isPrimaryCitySlug(citySlug);
}

/** هل نضع رابط HTML داخليًا لصفحة الحي؟ (لا نربط noindex من صفحات مفهرسة) */
export function shouldInternallyLinkToNeighborhoodHub(citySlug: string): boolean {
  return isNeighborhoodHubIndexable(citySlug);
}

/** مدن لها صفحات أحياء مفهرسة — للقوائم والاكتشاف الداخلي */
export function getIndexableCitiesForLinking() {
  return locations.filter((city) => shouldInternallyLinkToNeighborhoodHub(city.slug));
}

/** معاملات generateStaticParams لصفحات الأحياء المفهرسة فقط (الرياض). */
export function getIndexableNeighborhoodStaticParams(): {
  citySlug: string;
  neighborhoodSlug: string;
}[] {
  const city = locations.find((c) => c.slug === primaryCitySlug);
  if (!city) return [];
  return city.neighborhoods.map((neighborhood) => ({
    citySlug: city.slug,
    neighborhoodSlug: neighborhood.slug,
  }));
}

export function getNeighborhoodHubPath(citySlug: string, neighborhoodSlug: string): string {
  return `/${citySlug}/${neighborhoodSlug}`;
}

export function getNeighborhoodHouseCleaningSectionHref(
  citySlug: string,
  neighborhoodSlug: string,
): string {
  return `${getNeighborhoodHubPath(citySlug, neighborhoodSlug)}#${NEIGHBORHOOD_HOUSE_CLEANING_SECTION_ID}`;
}

/** هل نُنشئ ونفهرس صفحة خدمة×حي؟ الرياض + الخدمات الأساسية فقط. */
export function isServiceLocationIndexable(
  serviceSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
): boolean {
  if (!getNeighborhoodBySlug(citySlug, neighborhoodSlug)) return false;
  if (citySlug !== primaryCitySlug) return false;
  return PRIMARY_SET.has(serviceSlug);
}

/** @deprecated استخدم isServiceLocationIndexable */
export function isServiceLocationPairAllowed(
  serviceSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
): boolean {
  return isServiceLocationIndexable(serviceSlug, citySlug, neighborhoodSlug);
}

/** رابط الخدمة من صفحة الحي — موقع محلي إن وُجدت صفحة، وإلا صفحة الخدمة العامة. */
export function getServiceLinkFromNeighborhood(
  serviceSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
): string {
  if (isServiceLocationIndexable(serviceSlug, citySlug, neighborhoodSlug)) {
    return `/services/${serviceSlug}/${citySlug}/${neighborhoodSlug}`;
  }
  return `/services/${serviceSlug}`;
}
