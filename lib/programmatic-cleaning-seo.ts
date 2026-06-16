import riyadhCleaningDistricts from "@/src/data/riyadh-cleaning-districts.json";
import { primaryCitySlug } from "@/lib/region";
import { getCityBySlug, getNeighborhoodBySlug, locations } from "@/src/data/locations";

type CleaningDistrictSeed = {
  citySlug: string;
  districts: { name: string; slug: string }[];
};

const cleaningSeeds: CleaningDistrictSeed[] = [riyadhCleaningDistricts];

/**
 * أزواج المسار `/cleaning/[citySlug]/[districtSlug]` — كل مدينة وحي في locations.
 */
export function getCleaningProgrammaticStaticParams(): { citySlug: string; districtSlug: string }[] {
  return locations.flatMap((city) =>
    city.neighborhoods.map((neighborhood) => ({
      citySlug: city.slug,
      districtSlug: neighborhood.slug,
    })),
  );
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
