import type { CityLocation, Neighborhood } from "@/src/data/locations";

type JsonPrimitive = string | number | boolean | null;
export type JsonLdValue = JsonPrimitive | JsonLdValue[] | { [k: string]: JsonLdValue };

/** المدينة الأساسية + مدن ثانوية للـ Schema */
const PRIMARY_SA_CITIES: ReadonlyArray<{ ar: string; en: string }> = [
  { ar: "الرياض", en: "Riyadh" },
];

function cityEntity(ar: string, en: string): JsonLdValue {
  return {
    "@type": "City",
    name: ar,
    alternateName: en,
    containedInPlace: {
      "@type": "Country",
      name: "المملكة العربية السعودية",
      alternateName: "Saudi Arabia",
    },
  };
}

/** Country + الرياض — يتوافق مع استراتيجية الفهرسة (الرياض أولاً). */
export function buildPrimarySaudiCitiesAreaServed(): JsonLdValue[] {
  return [
    {
      "@type": "Country",
      name: "المملكة العربية السعودية",
      alternateName: "Saudi Arabia",
    },
    ...PRIMARY_SA_CITIES.map(({ ar, en }) => cityEntity(ar, en)),
  ];
}

/** For location pages: major cities plus the specific neighborhood place. */
export function buildAreaServedWithLocalFocus(city: CityLocation, neighborhood: Neighborhood): JsonLdValue[] {
  const localPlace: JsonLdValue = {
    "@type": "Place",
    name: `${neighborhood.name}، ${city.name}`,
    alternateName: `${neighborhood.slug}, ${city.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.name,
      addressCountry: "SA",
    },
  };

  return [...buildPrimarySaudiCitiesAreaServed(), localPlace];
}
