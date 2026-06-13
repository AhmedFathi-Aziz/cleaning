import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CleaningDistrictProgrammaticView } from "@/components/CleaningDistrictProgrammaticView";
import { CleaningProgrammaticDistrictJsonLd } from "@/components/SeoJsonLd";
import { brandNameAr } from "@/lib/brand";
import {
  getCleaningProgrammaticStaticParams,
  isAllowedCleaningProgrammaticPair,
} from "@/lib/programmatic-cleaning-seo";
import { buildArabicPageMetadata, expandMetaDescription, fitMetaTitle, truncateForMetaDescription } from "@/lib/seo";
import { getCityBySlug, getNeighborhoodBySlug } from "@/src/data/locations";

type PageProps = {
  params: Promise<{ citySlug: string; districtSlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getCleaningProgrammaticStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { citySlug, districtSlug } = await params;
  if (!isAllowedCleaningProgrammaticPair(citySlug, districtSlug)) {
    return { title: "غير موجود", robots: { index: false, follow: false } };
  }
  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, districtSlug);
  if (!city || !neighborhood) return { title: "غير موجود", robots: { index: false, follow: false } };

  const title = fitMetaTitle(`تنظيف منازل في حي ${neighborhood.name} ${city.name} | ${brandNameAr}`);
  const snippet = truncateForMetaDescription(neighborhood.nearbyLandmarksAr, 90);
  const description = expandMetaDescription(
    `تنظيف منازل وشقق في حي ${neighborhood.name}، ${city.name}. ${snippet} احجز مع ${brandNameAr}.`,
  );
  const canonical = `/cleaning/${city.slug}/${neighborhood.slug}`;

  return buildArabicPageMetadata({
    title,
    description,
    keywords: [
      `تنظيف منازل حي ${neighborhood.name}`,
      `تنظيف شقق ${neighborhood.name}`,
      `شركة تنظيف ${neighborhood.name} ${city.name}`,
      `تنظيف منازل ${city.name}`,
      `تنظيف بيوت ${city.name}`,
    ],
    canonical,
  });
}

export default async function CleaningDistrictProgrammaticPage({ params }: PageProps) {
  const { citySlug, districtSlug } = await params;
  if (!isAllowedCleaningProgrammaticPair(citySlug, districtSlug)) notFound();

  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, districtSlug);
  if (!city || !neighborhood) notFound();

  const cleaningPath = `/cleaning/${city.slug}/${neighborhood.slug}`;

  return (
    <main className="bg-slate-50 px-6 pb-24 pt-28 md:px-8">
      <CleaningProgrammaticDistrictJsonLd
        city={city}
        neighborhood={neighborhood}
        cleaningPath={cleaningPath}
      />
      <CleaningDistrictProgrammaticView city={city} neighborhood={neighborhood} />
    </main>
  );
}
