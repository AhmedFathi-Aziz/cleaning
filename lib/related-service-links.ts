import { getServiceArticleContextLinks } from "@/lib/article-context-links";
import { truncateForMetaDescription } from "@/lib/seo";
import { getServiceArticle, serviceArticles } from "@/lib/service-articles";
import { locations } from "@/src/data/locations";

const RESERVED_FIRST_SEGMENTS = new Set([
  "services",
  "blog",
  "news",
  "features",
  "about",
  "team",
  "contact",
  "areas",
  "careers",
  "privacy",
  "terms",
  "admin",
  "cleaning",
  "guides",
  "estimate",
]);

export type InternalPromoLink = {
  href: string;
  title: string;
  description: string;
};

const PEST_SLUG = "pest-control";

/** Cleaning & related slugs (non–pest-control) in crawl-friendly priority order */
const CLEANING_RELATED_ORDER = [
  "cleaning-company-riyadh",
  "house-cleaning",
  "apartment-cleaning-riyadh",
  "villa-cleaning-riyadh",
  "majlis-cleaning-riyadh",
  "sofa-cleaning-riyadh",
  "carpet-cleaning-riyadh",
  "deep-home-cleaning",
  "carpet-cleaning",
  "facade-cleaning",
  "sofa-cleaning",
  "water-tank-cleaning",
  "garden-cleaning",
] as const;

const CLEANING_SLUG_SET = new Set<string>(CLEANING_RELATED_ORDER);

function slugFromServicePath(pathname: string): string | null {
  const m = pathname.match(/^\/services\/([^/]+)/);
  return m?.[1] ?? null;
}

function neighborhoodCitySlug(pathname: string): string | null {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const parts = normalized.split("/").filter(Boolean);
  if (parts.length !== 2) return null;
  if (RESERVED_FIRST_SEGMENTS.has(parts[0])) return null;
  const city = locations.find((c) => c.slug === parts[0]);
  return city ? parts[0] : null;
}

function serviceLink(slug: string): InternalPromoLink | null {
  const article = getServiceArticle(slug);
  if (!article) return null;
  return {
    href: `/services/${article.slug}`,
    title: article.title,
    description: truncateForMetaDescription(article.excerpt, 132),
  };
}

function areasLink(citySlug: string | null): InternalPromoLink {
  const href = citySlug ? `/areas#city-${citySlug}` : "/areas";
  return {
    href,
    title: citySlug
      ? `مناطق التغطية وخدمات التنظيف في ${locations.find((c) => c.slug === citySlug)?.name ?? "مدينتك"}`
      : "مناطق التغطية: أحياء الرياض ومدن أخرى عند الطلب",
    description:
      "صفحات أحياء الرياض مع روابط تنظيف ومكافحة حشرات — وللمدن الأخرى راجع القائمة الكاملة في مناطق التغطية.",
  };
}

const contactLink: InternalPromoLink = {
  href: "/contact",
  title: "تواصل سريع للحجز أو الاستفسار",
  description: "هاتف، واتساب، وبريد — فريق تنسيق يرد في أوقات العمل لتحديد الخدمة والموعد المناسبين.",
};

/**
 * Builds a small set of keyword-rich internal links for related services + coverage,
 * excluding the current service when on `/services/[slug]` or nested service URLs.
 */
export function getMarketingRelatedLinks(pathname: string): InternalPromoLink[] {
  const serviceSlug = slugFromServicePath(pathname);
  const citySlug = neighborhoodCitySlug(pathname);
  const slugs: string[] = [];

  const pestEncyclopediaLink: InternalPromoLink = {
    href: "/guides/pest",
    title: "موسوعة مكافحة الحشرات في الرياض",
    description: "أدلة الصراصير، بق الفراش، النمل، الأرضة، والسلامة بعد الرش — محتوى تعليمي قبل الحجز.",
  };

  if (serviceSlug === PEST_SLUG) {
    slugs.push(...CLEANING_RELATED_ORDER.slice(0, 5));
  } else if (serviceSlug && CLEANING_SLUG_SET.has(serviceSlug)) {
    slugs.push(PEST_SLUG);
    for (const s of CLEANING_RELATED_ORDER) {
      if (s === serviceSlug) continue;
      slugs.push(s);
      if (slugs.length >= 6) break;
    }
  } else if (serviceSlug) {
    // Unknown or future slug: pest + others except self
    slugs.push(PEST_SLUG);
    for (const s of serviceArticles.map((a) => a.slug)) {
      if (s !== serviceSlug) slugs.push(s);
      if (slugs.length >= 6) break;
    }
  } else if (citySlug) {
    slugs.push(
      PEST_SLUG,
      "cleaning-company-riyadh",
      "house-cleaning",
      "apartment-cleaning-riyadh",
      "deep-home-cleaning",
      "carpet-cleaning",
    );
  } else {
    // Home, blog, static pages, /services index, etc.
    slugs.push(
      "cleaning-company-riyadh",
      "house-cleaning",
      "apartment-cleaning-riyadh",
      "villa-cleaning-riyadh",
      PEST_SLUG,
      "deep-home-cleaning",
      "carpet-cleaning",
    );
  }

  const unique = [...new Set(slugs)];
  const serviceLinks: InternalPromoLink[] = [];
  for (const slug of unique) {
    const link = serviceLink(slug);
    if (link) serviceLinks.push(link);
    if (serviceLinks.length >= 5) break;
  }

  const out: InternalPromoLink[] = [...serviceLinks, areasLink(citySlug)];

  if (serviceSlug) {
    const contextLinks = getServiceArticleContextLinks(serviceSlug);
    const seenHref = new Set(out.map((l) => l.href));
    const currentHref = `/services/${serviceSlug}`;
    for (const link of contextLinks) {
      if (link.href === currentHref || seenHref.has(link.href)) continue;
      out.unshift(link);
      seenHref.add(link.href);
    }
  }

  if (serviceSlug === PEST_SLUG || pathname.startsWith("/guides/pest")) {
    out.unshift(pestEncyclopediaLink);
  }

  if (pathname.startsWith("/cleaning")) {
    out.unshift({
      href: "/guides/pest",
      title: "موسوعة مكافحة الحشرات",
      description: "دليل أنواع الحشرات والوقاية والسلامة بعد الرش في الرياض.",
    });
  }

  // One conversion link on non-contact pages
  if (!pathname.startsWith("/contact")) {
    out.push(contactLink);
  }

  return out.slice(0, 8);
}
