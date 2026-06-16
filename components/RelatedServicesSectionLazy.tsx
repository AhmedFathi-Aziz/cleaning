"use client";

import dynamic from "next/dynamic";

const RelatedServicesSection = dynamic(
  () =>
    import("@/components/RelatedServicesSection").then((mod) => ({
      default: mod.RelatedServicesSection,
    })),
  { ssr: false },
);

export function RelatedServicesSectionLazy() {
  return <RelatedServicesSection />;
}
