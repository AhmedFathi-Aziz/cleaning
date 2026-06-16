import { primaryCitySlug } from "@/lib/region";
import { serviceArticles } from "@/lib/service-articles";
import {
  isServiceLocationIndexable,
  PRIMARY_SERVICE_LOCATION_SLUGS,
} from "@/lib/url-indexing-policy";
import { getCityBySlug, getNeighborhoodBySlug, locations } from "@/src/data/locations";

/**
 * مسارات قديمة/بديلة → slug الخدمة التي لها صفحة حي مفهرسة (نفس المعنى).
 * مثال: pest-control → pest-control-riyadh
 */
export const SERVICE_LOCATION_SYNONYM_TO_PRIMARY: Record<string, string> = {
  "pest-control": "pest-control-riyadh",
  "carpet-cleaning": "carpet-cleaning-riyadh",
  "sofa-cleaning": "sofa-cleaning-riyadh",
};

const PRIMARY_SET = new Set<string>(PRIMARY_SERVICE_LOCATION_SLUGS);
const ALL_SERVICE_SLUGS = new Set(serviceArticles.map((s) => s.slug));

/**
 * وجهة 301 لـ `/services/{service}/{city}/{neighborhood}` غير المبنية.
 * null = الصفحة موجودة ولا تحتاج تحويلاً.
 */
export function getServiceLocationRedirectTarget(
  serviceSlug: string,
  citySlug: string,
  neighborhoodSlug: string,
): string | null {
  if (!ALL_SERVICE_SLUGS.has(serviceSlug)) {
    return "/services";
  }

  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, neighborhoodSlug);
  if (!city || !neighborhood) {
    return `/services/${serviceSlug}`;
  }

  if (isServiceLocationIndexable(serviceSlug, citySlug, neighborhoodSlug)) {
    return null;
  }

  const synonymPrimary = SERVICE_LOCATION_SYNONYM_TO_PRIMARY[serviceSlug];
  if (citySlug === primaryCitySlug && synonymPrimary) {
    if (isServiceLocationIndexable(synonymPrimary, citySlug, neighborhoodSlug)) {
      return `/services/${synonymPrimary}/${citySlug}/${neighborhoodSlug}`;
    }
    return `/services/${synonymPrimary}`;
  }

  return `/services/${serviceSlug}`;
}

/** كل أزواج service×city×neighborhood التي كانت تُبنى سابقاً وتُحوَّل الآن */
export function getServiceLocationRedirectPairs(): Array<{
  from: string;
  to: string;
}> {
  const pairs: Array<{ from: string; to: string }> = [];

  for (const service of serviceArticles) {
    for (const city of locations) {
      for (const neighborhood of city.neighborhoods) {
        const from = `/services/${service.slug}/${city.slug}/${neighborhood.slug}`;
        const to = getServiceLocationRedirectTarget(service.slug, city.slug, neighborhood.slug);
        if (to && to !== from) {
          pairs.push({ from, to });
        }
      }
    }
  }

  return pairs;
}

/** قواعد wildcard مختصرة لـ Cloudflare `_redirects` */
export function getServiceLocationWildcardRedirectRules(): Array<{ from: string; to: string }> {
  const rules: Array<{ from: string; to: string }> = [];

  for (const [fromSlug, toSlug] of Object.entries(SERVICE_LOCATION_SYNONYM_TO_PRIMARY)) {
    if (PRIMARY_SET.has(toSlug)) {
      rules.push({
        from: `/services/${fromSlug}/riyadh/:neighborhood`,
        to: `/services/${toSlug}/riyadh/:neighborhood`,
      });
    } else {
      rules.push({
        from: `/services/${fromSlug}/riyadh/*`,
        to: `/services/${toSlug}`,
      });
    }
  }

  for (const service of serviceArticles) {
    if (PRIMARY_SET.has(service.slug)) continue;
    if (SERVICE_LOCATION_SYNONYM_TO_PRIMARY[service.slug]) continue;
    rules.push({
      from: `/services/${service.slug}/riyadh/*`,
      to: `/services/${service.slug}`,
    });
  }

  for (const city of locations) {
    if (city.slug === primaryCitySlug) continue;
    rules.push({
      from: `/services/:service/${city.slug}/*`,
      to: `/services/:service`,
    });
  }

  return rules;
}
