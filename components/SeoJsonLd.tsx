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
import { heroImageUrl, siteUrl } from "@/lib/site";
import type { CityLocation, Neighborhood } from "@/src/data/locations";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function JsonLdScript({ graph }: { graph: JsonValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

const serviceAggregateRating = {
  "@type": "AggregateRating",
  ratingValue: "5.0",
  reviewCount: 128,
  bestRating: "5",
  worstRating: "1",
};

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

const orgLogoId = `${siteUrl}/#logo`;
const brandId = `${siteUrl}/#brand`;
const organizationId = `${siteUrl}/#organization`;
const localBusinessId = `${siteUrl}/#localbusiness`;

/** يُحقن من `layout` — يتضمّن Brand + Organization + CleaningService (LocalBusiness) بالعربية لكل الصفحات */
export function buildSiteJsonLd() {
  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: brandAddressAr,
    addressLocality: "الرياض",
    addressRegion: "منطقة الرياض",
    addressCountry: "SA",
  };

  const sharedContactPoints = [
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

  const openingHoursSpecification = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "22:00",
    },
  ];

  const areaServedMain = [
    { "@type": "Country", name: "المملكة العربية السعودية" },
    { "@type": "City", name: "الرياض" },
    { "@type": "City", name: "جدة" },
    { "@type": "City", name: "الدمام" },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: brandNameAr,
        alternateName: brandNameEn,
        inLanguage: "ar-SA",
        publisher: { "@id": organizationId },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/services?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${siteUrl}/#main-navigation`,
        name: ["الرئيسية", "الخدمات", "من نحن", "المدونة", "اتصل بنا", "مناطق التغطية"],
        url: [
          `${siteUrl}/`,
          `${siteUrl}/services`,
          `${siteUrl}/about`,
          `${siteUrl}/blog`,
          `${siteUrl}/contact`,
          `${siteUrl}/areas`,
        ],
      },
      {
        "@type": "ImageObject",
        "@id": orgLogoId,
        url: `${siteUrl}${brandLogoPath}`,
        contentUrl: `${siteUrl}${brandLogoPath}`,
        width: 512,
        height: 512,
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
        sameAs: [],
      },
      {
        "@type": "CleaningService",
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
        aggregateRating: serviceAggregateRating,
        parentOrganization: { "@id": organizationId },
        address: postalAddress,
        contactPoint: sharedContactPoints,
        openingHoursSpecification,
        areaServed: areaServedMain,
      },
    ],
  };
}

export function ServicePageJsonLd({ service }: { service: ServiceArticle }) {
  const canonicalUrl = `${siteUrl}/services/${service.slug}`;

  return (
    <JsonLdScript
      graph={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": `${canonicalUrl}#service`,
            name: service.title,
            description: service.excerpt,
            image: service.image,
            provider: { "@id": `${siteUrl}/#localbusiness` },
            serviceType: service.shortTitle,
            aggregateRating: serviceAggregateRating,
            areaServed: {
              "@type": "Country",
              name: "المملكة العربية السعودية",
            },
            url: canonicalUrl,
          },
          {
            "@type": "FAQPage",
            "@id": `${canonicalUrl}#faq`,
            mainEntity: service.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ],
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
  const localBusinessId = `${canonicalUrl}#localbusiness`;

  return (
    <JsonLdScript
      graph={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            "@id": localBusinessId,
            name: `${brandNameAr} - ${service.shortTitle} ${neighborhood.name} ${city.name}`,
            image: service.image,
            url: canonicalUrl,
            telephone: brandPhone,
            email: brandEmail,
            priceRange: "$$",
            parentOrganization: { "@id": `${siteUrl}/#organization` },
            aggregateRating: serviceAggregateRating,
            address: placeSchema(city, neighborhood).address,
            areaServed: placeSchema(city, neighborhood),
          },
          {
            "@type": "Service",
            "@id": `${canonicalUrl}#service`,
            name: `${service.shortTitle} في حي ${neighborhood.name} ${city.name}`,
            description: `خدمة ${service.shortTitle} في حي ${neighborhood.name} بمدينة ${city.name}.`,
            provider: { "@id": localBusinessId },
            serviceType: service.shortTitle,
            aggregateRating: serviceAggregateRating,
            areaServed: placeSchema(city, neighborhood),
            url: canonicalUrl,
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
  const localBusinessId = `${canonicalUrl}#localbusiness`;

  return (
    <JsonLdScript
      graph={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            "@id": localBusinessId,
            name: `${brandNameAr} - ${neighborhood.name} ${city.name}`,
            image: heroImageUrl,
            url: canonicalUrl,
            telephone: brandPhone,
            email: brandEmail,
            priceRange: "$$",
            parentOrganization: { "@id": `${siteUrl}/#organization` },
            address: placeSchema(city, neighborhood).address,
            areaServed: placeSchema(city, neighborhood),
          },
          {
            "@type": "Service",
            "@id": `${canonicalUrl}#service`,
            name: `خدمات التنظيف العامة في حي ${neighborhood.name} ${city.name}`,
            description: `خدمات تنظيف عامة للمنازل والمنشآت في حي ${neighborhood.name} بمدينة ${city.name}.`,
            provider: { "@id": localBusinessId },
            serviceType: "خدمات التنظيف العامة",
            areaServed: placeSchema(city, neighborhood),
            url: canonicalUrl,
          },
        ],
      }}
    />
  );
}
