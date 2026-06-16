import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { brandNameAr } from "@/lib/brand";
import {
  getCleaningProgrammaticStaticParams,
  isAllowedCleaningProgrammaticPair,
} from "@/lib/programmatic-cleaning-seo";
import { buildArabicPageMetadata } from "@/lib/seo";
import { getNeighborhoodHouseCleaningSectionHref, getNeighborhoodHubPath } from "@/lib/url-indexing-policy";
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

  const canonical = getNeighborhoodHubPath(city.slug, neighborhood.slug);

  return buildArabicPageMetadata({
    title: `تنظيف منازل في حي ${neighborhood.name} ${city.name} | ${brandNameAr}`,
    description: `تم دمج صفحة تنظيف المنازل مع دليل حي ${neighborhood.name}. انتقل للصفحة الموحّدة.`,
    canonical,
    indexable: false,
  });
}

/** صفحة انتقالية — canonical يشير لصفحة الحي الموحّدة `/city/neighborhood#tanzeef-manazil` */
export default async function CleaningDistrictRedirectPage({ params }: PageProps) {
  const { citySlug, districtSlug } = await params;
  if (!isAllowedCleaningProgrammaticPair(citySlug, districtSlug)) notFound();

  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, districtSlug);
  if (!city || !neighborhood) notFound();

  const target = getNeighborhoodHouseCleaningSectionHref(city.slug, neighborhood.slug);

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-6 pt-28">
      <div className="max-w-lg rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-extrabold text-secondary">تم دمج الصفحة</p>
        <h1 className="mt-3 font-headline text-2xl font-extrabold text-primary">
          تنظيف منازل حي {neighborhood.name}
        </h1>
        <p className="mt-4 text-base leading-8 text-on-surface-variant">
          صفحات <code className="text-sm">/cleaning/...</code> دُمجت مع دليل الحي الموحّد لتجنب تكرار المحتوى في
          نتائج البحث.
        </p>
        <Link
          href={target}
          className="mt-6 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg"
        >
          الانتقال لصفحة حي {neighborhood.name}
        </Link>
      </div>
    </main>
  );
}
