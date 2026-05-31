import {
  neighborhoodLocalDetails,
  type NeighborhoodLocalDetail,
} from "./neighborhood-local-details";

export type Neighborhood = { name: string; slug: string } & NeighborhoodLocalDetail;

export type CityLocation = {
  name: string;
  slug: string;
  neighborhoods: Neighborhood[];
};

type NeighborhoodSeed = { name: string; slug: string };

type CitySeed = {
  name: string;
  slug: string;
  neighborhoods: NeighborhoodSeed[];
};

const citiesSeed: CitySeed[] = [
  {
    name: "الرياض",
    slug: "riyadh",
    neighborhoods: [
      { name: "العليا", slug: "olaya" },
      { name: "الملز", slug: "al-malaz" },
      { name: "النرجس", slug: "al-narjis" },
      { name: "الياسمين", slug: "al-yasmin" },
      { name: "الصحافة", slug: "al-sahafah" },
      { name: "حطين", slug: "hittin" },
      { name: "الملقا", slug: "al-malqa" },
      { name: "الروضة", slug: "al-rawdah" },
      { name: "النخيل", slug: "al-nakheel" },
      { name: "الرحمانية", slug: "al-rahmaniyah" },
      { name: "الورود", slug: "al-wurud" },
      { name: "المروج", slug: "al-murooj" },
      { name: "الغدير", slug: "al-ghadir" },
      { name: "السليمانية", slug: "al-sulaimaniyah" },
      { name: "العزيزية", slug: "al-aziziyah" },
      { name: "السويدي", slug: "al-suwaidi" },
      { name: "الشفا", slug: "al-shifa" },
      { name: "النسيم", slug: "al-naseem" },
      { name: "المروة", slug: "al-marwah" },
      { name: "الفلاح", slug: "al-falah" },
      { name: "الحمراء", slug: "al-hamra" },
      { name: "العريجاء", slug: "al-urayja" },
      { name: "المنسية", slug: "al-munsiyah" },
      { name: "القدس", slug: "al-quds" },
      { name: "الورد", slug: "al-ward" },
      { name: "المنار", slug: "al-manar" },
      { name: "الفيحاء", slug: "al-fayha" },
      { name: "الخليج", slug: "al-khaleej" },
      { name: "النزهة", slug: "al-nuzha" },
      { name: "الأمل", slug: "al-amal" },
      { name: "السلام", slug: "al-salam" },
      { name: "ظهرة لبن", slug: "dhahrat-laban" },
      { name: "الشهداء", slug: "al-shuhada" },
      { name: "المعيزيلة", slug: "al-maizilah" },
      { name: "الملك فهد", slug: "king-fahd" },
      { name: "الدرعية", slug: "al-diriyah" },
      { name: "المصيف", slug: "al-masif" },
      { name: "الوادي", slug: "al-wadi" },
      { name: "الدوبية", slug: "al-dubiyah" },
      { name: "عتيقة", slug: "utaiqah" },
      { name: "البطحاء", slug: "al-batha" },
      { name: "الصناعية", slug: "al-sinaiyah" },
      { name: "مشرق", slug: "al-mashreq" },
      { name: "طويق", slug: "tuwaiq" },
    ],
  },
  {
    name: "جدة",
    slug: "jeddah",
    neighborhoods: [
      { name: "الروضة", slug: "al-rawdah" },
      { name: "السلامة", slug: "al-salamah" },
      { name: "الحمراء", slug: "al-hamra" },
      { name: "الشاطئ", slug: "al-shati" },
      { name: "الصفا", slug: "al-safa" },
      { name: "النهضة", slug: "al-nahdah" },
      { name: "الزهراء", slug: "al-zahra" },
      { name: "النزهة", slug: "al-nuzhah" },
      { name: "أبحر", slug: "abhur" },
    ],
  },
  {
    name: "الدمام",
    slug: "dammam",
    neighborhoods: [
      { name: "الشاطئ", slug: "al-shati" },
      { name: "المزروعية", slug: "al-mazruiyah" },
      { name: "الفيصلية", slug: "al-faisaliyah" },
      { name: "الندى", slug: "al-nada" },
      { name: "الريان", slug: "al-rayan" },
      { name: "طيبة", slug: "taybah" },
      { name: "الضباب", slug: "al-dabab" },
      { name: "بدر", slug: "badr" },
    ],
  },
  {
    name: "الخبر",
    slug: "khobar",
    neighborhoods: [
      { name: "العقربية", slug: "al-aqrabiyah" },
      { name: "الراكة", slug: "al-rakah" },
      { name: "الثقبة", slug: "al-thuqbah" },
      { name: "الحزام الذهبي", slug: "golden-belt" },
      { name: "الخبر الشمالية", slug: "north-khobar" },
      { name: "الخبر الجنوبية", slug: "south-khobar" },
    ],
  },
  {
    name: "مكة المكرمة",
    slug: "makkah",
    neighborhoods: [
      { name: "العزيزية", slug: "al-aziziyah" },
      { name: "الشوقية", slug: "al-shawqiyah" },
      { name: "الشرائع", slug: "al-sharai" },
      { name: "العوالي", slug: "al-awali" },
      { name: "بطحاء قريش", slug: "batha-quraysh" },
      { name: "النوارية", slug: "al-nawwariyah" },
    ],
  },
  {
    name: "المدينة المنورة",
    slug: "madinah",
    neighborhoods: [
      { name: "العزيزية", slug: "al-aziziyah" },
      { name: "قباء", slug: "quba" },
      { name: "الهجرة", slug: "al-hijrah" },
      { name: "شوران", slug: "shuran" },
      { name: "الدعيثة", slug: "al-daithah" },
      { name: "الفيصلية", slug: "al-faisaliyah" },
    ],
  },
  {
    name: "الطائف",
    slug: "taif",
    neighborhoods: [
      { name: "شهار", slug: "shihar" },
      { name: "الوسام", slug: "al-wisam" },
      { name: "الحوية", slug: "al-hawiyah" },
      { name: "الفيصلية", slug: "al-faisaliyah" },
      { name: "السلامة", slug: "al-salamah" },
      { name: "جبرة", slug: "jabrah" },
    ],
  },
  {
    name: "أبها",
    slug: "abha",
    neighborhoods: [
      { name: "المنسك", slug: "al-mansak" },
      { name: "المروج", slug: "al-murooj" },
      { name: "الخالدية", slug: "al-khalidiyah" },
      { name: "الربوة", slug: "al-rabwah" },
      { name: "السد", slug: "al-sadd" },
      { name: "شمسان", slug: "shamsan" },
    ],
  },
  {
    name: "تبوك",
    slug: "tabuk",
    neighborhoods: [
      { name: "المروج", slug: "al-murooj" },
      { name: "الورود", slug: "al-wurud" },
      { name: "الفيصلية", slug: "al-faisaliyah" },
      { name: "النهضة", slug: "al-nahdah" },
      { name: "الريان", slug: "al-rayan" },
      { name: "السليمانية", slug: "al-sulaimaniyah" },
    ],
  },
  {
    name: "بريدة",
    slug: "buraydah",
    neighborhoods: [
      { name: "الريان", slug: "al-rayan" },
      { name: "الفايزية", slug: "al-fayziyah" },
      { name: "النهضة", slug: "al-nahdah" },
      { name: "الإسكان", slug: "al-iskan" },
      { name: "الربوة", slug: "al-rabwah" },
      { name: "الصفاء", slug: "al-safa" },
    ],
  },
  {
    name: "حائل",
    slug: "hail",
    neighborhoods: [
      { name: "المنتزه الشرقي", slug: "east-al-muntazah" },
      { name: "المنتزه الغربي", slug: "west-al-muntazah" },
      { name: "الخزامى", slug: "al-khuzama" },
      { name: "النقرة", slug: "al-naqrah" },
      { name: "صلاح الدين", slug: "salah-al-din" },
      { name: "الجامعيين", slug: "al-jamiyeen" },
    ],
  },
  {
    name: "جازان",
    slug: "jazan",
    neighborhoods: [
      { name: "الشاطئ", slug: "al-shati" },
      { name: "السويس", slug: "al-suwais" },
      { name: "الروضة", slug: "al-rawdah" },
      { name: "المطار", slug: "al-matar" },
      { name: "الصفا", slug: "al-safa" },
      { name: "النسيم", slug: "al-naseem" },
    ],
  },
  {
    name: "نجران",
    slug: "najran",
    neighborhoods: [
      { name: "الفهد", slug: "al-fahd" },
      { name: "الأثايبة", slug: "al-athaybah" },
      { name: "المخيم", slug: "al-mukhayyam" },
      { name: "العريسة", slug: "al-araysah" },
      { name: "دحضة", slug: "dahdah" },
      { name: "القابل", slug: "al-qabil" },
    ],
  },
  {
    name: "الأحساء",
    slug: "al-ahsa",
    neighborhoods: [
      { name: "الهفوف", slug: "al-hofuf" },
      { name: "المبرز", slug: "al-mubarraz" },
      { name: "الخالدية", slug: "al-khalidiyah" },
      { name: "السلمانية", slug: "al-salmaniyah" },
      { name: "المزروع", slug: "al-mazrou" },
      { name: "الفيصلية", slug: "al-faisaliyah" },
    ],
  },
  {
    name: "الجبيل",
    slug: "jubail",
    neighborhoods: [
      { name: "الجبيل البلد", slug: "jubail-al-balad" },
      { name: "الفناتير", slug: "al-fanateer" },
      { name: "الدفي", slug: "al-deffi" },
      { name: "دارين", slug: "dareen" },
      { name: "طيبة", slug: "taybah" },
      { name: "المطرفية", slug: "al-mutrafiyah" },
    ],
  },
];

function mergeNeighborhood(citySlug: string, seed: NeighborhoodSeed): Neighborhood {
  const key = `${citySlug}/${seed.slug}`;
  const detail = neighborhoodLocalDetails[key];
  if (!detail) {
    throw new Error(`Missing neighborhoodLocalDetails for "${key}"`);
  }
  return { ...seed, ...detail };
}

export const locations: CityLocation[] = citiesSeed.map((city) => ({
  ...city,
  neighborhoods: city.neighborhoods.map((n) => mergeNeighborhood(city.slug, n)),
}));

export function getCityBySlug(slug: string) {
  return locations.find((city) => city.slug === slug);
}

export function getNeighborhoodBySlug(citySlug: string, neighborhoodSlug: string) {
  return getCityBySlug(citySlug)?.neighborhoods.find((neighborhood) => neighborhood.slug === neighborhoodSlug);
}

export function getLocationStaticParams() {
  return locations.flatMap((city) =>
    city.neighborhoods.map((neighborhood) => ({
      citySlug: city.slug,
      neighborhoodSlug: neighborhood.slug,
    })),
  );
}
