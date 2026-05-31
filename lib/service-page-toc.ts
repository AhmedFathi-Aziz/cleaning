import type { ServiceArticle } from "@/lib/service-articles-types";

/** Shown in TOC + JSON-LD ItemList — trust, warranty, and response (Saudi conversion focus). */
export const SERVICE_TRUST_SECTION_SHORT_TITLE = "الثقة والضمان وسرعة الاستجابة";

export type ServiceTocNavItem = { href: string; label: string };

export function buildServicePageTocNavItems(service: ServiceArticle): ServiceTocNavItem[] {
  const items: ServiceTocNavItem[] = [
    { href: "#sec-trust", label: SERVICE_TRUST_SECTION_SHORT_TITLE },
    ...service.sections.map((section, index) => ({
      href: `#sec-${index}`,
      label: section.heading,
    })),
  ];
  if (service.faqs.length > 0) {
    items.push({ href: "#sec-faq", label: "أسئلة شائعة عن الخدمة" });
  }
  items.push({
    href: "#sec-value",
    label: `لماذا تختار ${service.shortTitle} معنا؟`,
  });
  return items;
}

type JsonLdListItem = {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
};

export function buildServicePageJsonLdTocItems(
  service: ServiceArticle,
  canonicalUrl: string,
): JsonLdListItem[] {
  return buildServicePageTocNavItems(service).map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: entry.label,
    item: `${canonicalUrl}${entry.href}`,
  }));
}
