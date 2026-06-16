import riyadhCleaningDistricts from "@/src/data/riyadh-cleaning-districts.json";
import { primaryCitySlug } from "@/lib/region";
import { getCityBySlug, getNeighborhoodBySlug } from "@/src/data/locations";

type CleaningDistrictSeed = {
  citySlug: string;
  districts: { name: string; slug: string }[];
};

const cleaningSeeds: CleaningDistrictSeed[] = [riyadhCleaningDistricts];

/**
 * لا نُنشئ صفحات `/cleaning/{city}/{district}` — تُوجَّه 301 إلى صفحة الحي الموحّدة عبر `_redirects`.
 */
export function getCleaningProgrammaticStaticParams(): { citySlug: string; districtSlug: string }[] {
  return [];
}

export function isAllowedCleaningProgrammaticPair(citySlug: string, districtSlug: string): boolean {
  return getNeighborhoodBySlug(citySlug, districtSlug) != null;
}

/** مسار قسم تنظيف المنازل داخل صفحة الحي الموحّدة — بديل `/cleaning/...` */
export function getCleaningDistrictPath(citySlug: string, districtSlug: string): string | null {
  if (!isAllowedCleaningProgrammaticPair(citySlug, districtSlug)) return null;
  return `/${citySlug}/${districtSlug}#tanzeef-manazil`;
}

export function getCleaningDistrictPeersExcluding(citySlug: string, currentSlug: string) {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  return city.neighborhoods.filter((n) => n.slug !== currentSlug);
}

export function getPrimaryCleaningCitySlug(): string {
  return primaryCitySlug;
}

export function getCleaningSeeds(): CleaningDistrictSeed[] {
  return cleaningSeeds;
}
