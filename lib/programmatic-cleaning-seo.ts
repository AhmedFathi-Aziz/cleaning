import jeddahCleaningDistricts from "@/src/data/jeddah-cleaning-districts.json";
import riyadhCleaningDistricts from "@/src/data/riyadh-cleaning-districts.json";
import { primaryCitySlug } from "@/lib/region";
import { getNeighborhoodBySlug } from "@/src/data/locations";

type CleaningDistrictSeed = {
  citySlug: string;
  districts: { name: string; slug: string }[];
};

const cleaningSeeds: CleaningDistrictSeed[] = [riyadhCleaningDistricts, jeddahCleaningDistricts];

/**
 * أزواج المسار `/cleaning/[citySlug]/[districtSlug]` — الرياض أولاً ثم جدة.
 */
export function getCleaningProgrammaticStaticParams(): { citySlug: string; districtSlug: string }[] {
  return cleaningSeeds.flatMap((seed) =>
    seed.districts
      .map((d) => {
        const n = getNeighborhoodBySlug(seed.citySlug, d.slug);
        if (!n) return null;
        return { citySlug: seed.citySlug, districtSlug: d.slug };
      })
      .filter((x): x is { citySlug: string; districtSlug: string } => x !== null),
  );
}

export function isAllowedCleaningProgrammaticPair(citySlug: string, districtSlug: string): boolean {
  const seed = cleaningSeeds.find((s) => s.citySlug === citySlug);
  if (!seed) return false;
  return seed.districts.some((d) => d.slug === districtSlug);
}

export function getCleaningDistrictPeersExcluding(citySlug: string, currentSlug: string) {
  const seed = cleaningSeeds.find((s) => s.citySlug === citySlug);
  if (!seed) return [];
  return seed.districts.filter((d) => d.slug !== currentSlug);
}

export function getPrimaryCleaningCitySlug(): string {
  return primaryCitySlug;
}

/** @deprecated استخدم getPrimaryCleaningCitySlug */
export function getJeddahCleaningCitySlug(): string {
  return jeddahCleaningDistricts.citySlug;
}

export function getCleaningSeeds(): CleaningDistrictSeed[] {
  return cleaningSeeds;
}
