import {
  brandAddressAr,
  brandDescriptionAr,
  brandEmail,
  brandLogoPath,
  brandNameAr,
  brandNameEn,
  brandPhone,
  brandWhatsapp,
} from "@/lib/brand";
import type { ServiceArticle } from "@/lib/service-articles";
import { absoluteUrl } from "@/lib/seo";
import { buildServicePageJsonLdTocItems } from "@/lib/service-page-toc";
import { MOCK_LOCAL_BUSINESS_AGGREGATE_RATING, SCHEMA_ORG_CONTEXT } from "@/lib/schema-org/constants";
import { buildAreaServedWithLocalFocus, buildPrimarySaudiCitiesAreaServed } from "@/lib/schema-org/areas-served";
import { heroImageUrl, siteUrl } from "@/lib/site";
import type { CityLocation, Neighborhood } from "@/src/data/locations";
import { locations } from "@/src/data/locations";

import { StructuredDataScript } from "@/components/StructuredDataScript";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function JsonLdScript({ graph }: { graph: JsonValue }) {
  return <StructuredDataScript data={graph} />;
}

function placeSchema(city: CityLocation, neighborhood?: Neighborhood) {
  return {
    "@type": "Place",
    name: neighborhood ? `${neighborhood.name}، ${city.name}` : city.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.name,
      addressCountry: "SA",
    },
  };
}

function faqPageNode(
  canonicalUrl: string,
  faqs: ServiceArticle["faqs"],
  fragment: string,
): JsonValue | null {
  if (!faqs?.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#${fragment}`,
    url: canonicalUrl,
    inLanguage: "ar-SA",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

const orgLogoId = `${siteUrl}/#logo`;
const brandId = `${siteUrl}/#brand`;
const organizationId = `${siteUrl}/#organization`;
const localBusinessId = `${siteUrl}/#localbusiness`;

const KNOWS_ABOUT: string[] = [
  "تنظيف منازل",
  "تنظيف مكاتب",
  "تنظيف عميق",
  "غسيل سجاد وموكيت",
  "تنظيف واجهات زجاجية",
  "مكافحة حشرات",
  "تعقيم خزانات مياه",
];

/**
 * Sitewide graph: WebSite, navigation, Brand, Organization, LocalBusiness.
 * LocalBusiness uses explicit KSA city coverage + mock AggregateRating (update in `lib/schema-org/constants.ts`).
 */
export function buildSiteJsonLd(): JsonValue {
  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: brandAddressAr,
    addressLocality: "الرياض",
    addressRegion: "منطقة الرياض",
    addressCountry: "SA",
  };

  const sharedContactPoints: JsonValue[] = [
    {
      "@type": "ContactPoint",
      telephone: brandPhone,
      contactType: "customer service",
      areaServed: "SA",
      availableLanguage: ["Arabic", "English"],
      email: brandEmail,
      url: `${siteUrl}/contact`,
    },
    {
      "@type": "ContactPoint",
      contactType: "WhatsApp",
      areaServed: "SA",
      availableLanguage: ["Arabic", "English"],
      url: brandWhatsapp,
    },
  ];

  const openingHoursSpecification: JsonValue[] = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "22:00",
    },
  ];

  const areaServed = buildPrimarySaudiCitiesAreaServed() as unknown as JsonValue[];

  return {
    "@context": SCHEMA_ORG_CONTEXT,
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: brandNameAr,
        alternateName: brandNameEn,
        description: brandDescriptionAr,
        inLanguage: "ar-SA",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${siteUrl}/#main-navigation`,
        name: [
          "الرئيسية",
          "الخدمات",
          "تقدير السعر",
          "مناطق الخدمة",
          "من نحن",
          "المدونة",
          "الأخبار الوطنية",
          "الوظائف",
          "اتصل بنا",
        ],
        url: [
          `${siteUrl}/`,
          `${siteUrl}/services`,
          `${siteUrl}/estimate`,
          `${siteUrl}/areas`,
          `${siteUrl}/about`,
          `${siteUrl}/blog`,
          `${siteUrl}/news`,
          `${siteUrl}/careers`,
          `${siteUrl}/contact`,
        ],
      },
      {
        "@type": "ImageObject",
        "@id": orgLogoId,
        url: `${siteUrl}${brandLogoPath}`,
        contentUrl: `${siteUrl}${brandLogoPath}`,
        width: 128,
        height: 128,
        caption: `${brandNameAr} — الشعار`,
      },
      {
        "@type": "Brand",
        "@id": brandId,
        name: brandNameAr,
        alternateName: brandNameEn,
        description: brandDescriptionAr,
        logo: { "@id": orgLogoId },
        url: `${siteUrl}/`,
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: brandNameAr,
        legalName: brandNameAr,
        alternateName: brandNameEn,
        description: brandDescriptionAr,
        url: `${siteUrl}/`,
        logo: { "@id": orgLogoId },
        image: heroImageUrl,
        brand: { "@id": brandId },
        email: brandEmail,
        contactPoint: sharedContactPoints,
        knowsAbout: KNOWS_ABOUT,
        sameAs: [],
      },
      {
        "@type": "LocalBusiness",
        "@id": localBusinessId,
        name: brandNameAr,
        alternateName: brandNameEn,
        description: brandDescriptionAr,
        url: `${siteUrl}/`,
        telephone: brandPhone,
        email: brandEmail,
        image: heroImageUrl,
        logo: { "@id": orgLogoId },
        priceRange: "$$",
        aggregateRating: MOCK_LOCAL_BUSINESS_AGGREGATE_RATING,
        parentOrganization: { "@id": organizationId },
        address: postalAddress,
        contactPoint: sharedContactPoints,
        openingHoursSpecification,
        areaServed,
      },
    ],
  };
}

export function ServicePageJsonLd({ service }: { service: ServiceArticle }) {
  const canonicalUrl = `${siteUrl}/services/${service.slug}`;

  const tocItems = buildServicePageJsonLdTocItems(service, canonicalUrl) as unknown as JsonValue[];

  const graphNodes: JsonValue[] = [
    {
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      name: service.title,
      description: service.excerpt,
      image: absoluteUrl(service.image),
      provider: { "@id": `${siteUrl}/#localbusiness` },
      serviceType: service.shortTitle,
      inLanguage: "ar-SA",
      areaServed: buildPrimarySaudiCitiesAreaServed() as unknown as JsonValue[],
      url: canonicalUrl,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "الخدمات",
          item: `${siteUrl}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: canonicalUrl,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${canonicalUrl}#toc`,
      name: "محتوى الصفحة",
      numberOfItems: tocItems.length,
      itemListElement: tocItems,
    },
  ];

  const faqNode = faqPageNode(canonicalUrl, service.faqs, "faq");
  if (faqNode) graphNodes.push(faqNode);

  return (
    <JsonLdScript
      graph={{
        "@context": SCHEMA_ORG_CONTEXT,
        "@graph": graphNodes,
      }}
    />
  );
}

export function ServiceLocationJsonLd({
  service,
  city,
  neighborhood,
}: {
  service: ServiceArticle;
  city: CityLocation;
  neighborhood: Neighborhood;
}) {
  const canonicalUrl = `${siteUrl}/services/${service.slug}/${city.slug}/${neighborhood.slug}`;
  const localBusinessNodeId = `${canonicalUrl}#localbusiness`;
  const serviceDescription = `خدمة ${service.shortTitle} في حي ${neighborhood.name} بمدينة ${city.name}. ${neighborhood.nearbyLandmarksAr}`;

  const graphNodes: JsonValue[] = [
    {
      "@type": "LocalBusiness",
      "@id": localBusinessNodeId,
      name: `${brandNameAr} - ${service.shortTitle} ${neighborhood.name} ${city.name}`,
      image: absoluteUrl(service.image),
      url: canonicalUrl,
      telephone: brandPhone,
      email: brandEmail,
      priceRange: "$$",
      parentOrganization: { "@id": `${siteUrl}/#organization` },
      address: placeSchema(city, neighborhood).address,
      areaServed: buildAreaServedWithLocalFocus(city, neighborhood) as unknown as JsonValue[],
      description: serviceDescription,
    },
    {
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      name: `${service.shortTitle} في حي ${neighborhood.name} ${city.name}`,
      description: serviceDescription,
      provider: { "@id": localBusinessNodeId },
      serviceType: service.shortTitle,
      areaServed: buildAreaServedWithLocalFocus(city, neighborhood) as unknown as JsonValue[],
      url: canonicalUrl,
    },
  ];

  const faqNode = faqPageNode(canonicalUrl, service.faqs, "faq");
  if (faqNode) graphNodes.push(faqNode);

  return (
    <JsonLdScript
      graph={{
        "@context": SCHEMA_ORG_CONTEXT,
        "@graph": graphNodes,
      }}
    />
  );
}

/**
 * JSON-LD لصفحات `/cleaning/[city]/[district]` — تركيز على «تنظيف منازل وشقق» مع canonical منفصل عن صفحة الحي العامة.
 */
export function CleaningProgrammaticDistrictJsonLd({
  city,
  neighborhood,
  cleaningPath,
}: {
  city: CityLocation;
  neighborhood: Neighborhood;
  /** مثل `/cleaning/jeddah/al-safa` */
  cleaningPath: string;
}) {
  const canonicalUrl = `${siteUrl}${cleaningPath}`;
  const cityAreasUrl = `${siteUrl}/areas#city-${city.slug}`;
  const cleaningHubUrl = `${siteUrl}/cleaning`;
  const localBusinessNodeId = `${canonicalUrl}#localbusiness`;
  const primaryDescription = `تنظيف منازل وشقق في حي ${neighborhood.name} بمدينة ${city.name}. ${neighborhood.nearbyLandmarksAr}`;

  return (
    <JsonLdScript
      graph={{
        "@context": SCHEMA_ORG_CONTEXT,
        "@graph": [
          {
            "@type": "LocalBusiness",
            "@id": localBusinessNodeId,
            name: `${brandNameAr} — تنظيف منازل ${neighborhood.name} ${city.name}`,
            image: heroImageUrl,
            url: canonicalUrl,
            telephone: brandPhone,
            email: brandEmail,
            priceRange: "$$",
            parentOrganization: { "@id": `${siteUrl}/#organization` },
            address: placeSchema(city, neighborhood).address,
            areaServed: buildAreaServedWithLocalFocus(city, neighborhood) as unknown as JsonValue[],
            description: primaryDescription,
          },
          {
            "@type": "Service",
            "@id": `${canonicalUrl}#service`,
            name: `تنظيف منازل وشقق في حي ${neighborhood.name} ${city.name}`,
            description: primaryDescription,
            provider: { "@id": localBusinessNodeId },
            serviceType: "تنظيف منازل",
            areaServed: buildAreaServedWithLocalFocus(city, neighborhood) as unknown as JsonValue[],
            url: canonicalUrl,
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${canonicalUrl}#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "الرئيسية",
                item: `${siteUrl}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "تنظيف منازل حسب الحي",
                item: cleaningHubUrl,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: city.name,
                item: cityAreasUrl,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: `حي ${neighborhood.name}`,
                item: canonicalUrl,
              },
            ],
          },
        ],
      }}
    />
  );
}

export function NeighborhoodPageJsonLd({
  city,
  neighborhood,
}: {
  city: CityLocation;
  neighborhood: Neighborhood;
}) {
  const canonicalUrl = `${siteUrl}/${city.slug}/${neighborhood.slug}`;
  const cityAreasUrl = `${siteUrl}/areas#city-${city.slug}`;
  const localBusinessNodeId = `${canonicalUrl}#localbusiness`;
  const primaryDescription = `خدمات تنظيف عامة للمنازل والمنشآت في حي ${neighborhood.name} بمدينة ${city.name}. ${neighborhood.nearbyLandmarksAr}`;

  return (
    <JsonLdScript
      graph={{
        "@context": SCHEMA_ORG_CONTEXT,
        "@graph": [
          {
            "@type": "LocalBusiness",
            "@id": localBusinessNodeId,
            name: `${brandNameAr} - ${neighborhood.name} ${city.name}`,
            image: heroImageUrl,
            url: canonicalUrl,
            telephone: brandPhone,
            email: brandEmail,
            priceRange: "$$",
            parentOrganization: { "@id": `${siteUrl}/#organization` },
            address: placeSchema(city, neighborhood).address,
            areaServed: buildAreaServedWithLocalFocus(city, neighborhood) as unknown as JsonValue[],
            description: primaryDescription,
          },
          {
            "@type": "Service",
            "@id": `${canonicalUrl}#service`,
            name: `خدمات التنظيف العامة في حي ${neighborhood.name} ${city.name}`,
            description: primaryDescription,
            provider: { "@id": localBusinessNodeId },
            serviceType: "خدمات التنظيف العامة",
            areaServed: buildAreaServedWithLocalFocus(city, neighborhood) as unknown as JsonValue[],
            url: canonicalUrl,
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${canonicalUrl}#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "الرئيسية",
                item: `${siteUrl}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: city.name,
                item: cityAreasUrl,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: neighborhood.name,
                item: canonicalUrl,
              },
            ],
          },
        ],
      }}
    />
  );
}

/** ItemList JSON-LD for `/areas` geographic coverage */
export function AreasCoverageJsonLd() {
  const itemListElement: JsonValue[] = [];
  let position = 0;
  for (const city of locations) {
    for (const n of city.neighborhoods) {
      position += 1;
      const url = `${siteUrl}/${city.slug}/${n.slug}`;
      itemListElement.push({
        "@type": "ListItem",
        position,
        item: {
          "@type": "WebPage",
          "@id": url,
          url,
          name: `خدمات تنظيف حي ${n.name} ${city.name}`,
        },
      });
    }
  }

  const graph: JsonValue = {
    "@context": SCHEMA_ORG_CONTEXT,
    "@type": "ItemList",
    name: "مناطق تغطية خدمات التنظيف في السعودية",
    description: "صفحات الأحياء المدعومة مع روابط إلى المحتوى المحلي.",
    numberOfItems: itemListElement.length,
    itemListElement,
  };

  return <JsonLdScript graph={graph} />;
}
