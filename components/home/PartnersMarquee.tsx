"use client";

import { PartnersTrustHeading } from "@/components/PartnersTrustHeading";
import { CycleGallery } from "@/components/cycle-gallery";
import { homePartners } from "@/lib/partners";

export function PartnersMarquee() {
  return (
    <section className="relative overflow-hidden bg-surface-container-lowest px-4 pb-20 pt-2 sm:px-6 sm:pb-24 md:px-8 md:pb-28" aria-labelledby="partners-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/12 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-7xl min-h-[22rem] sm:min-h-[24rem]">
        <PartnersTrustHeading
          headingId="partners-heading"
          title="شركاؤنا والجهات التي وثقت بنا"
          subtitle="نفخر بخدمة جهات متنوعة — حكومية وتجارية ومجتمعية — بمعايير التزام وجودة ثابتة قدر الإمكان."
        />

        <CycleGallery
          images={homePartners.map((partner) => {
            const alt = `شعار ${partner.name} — شريك موثوق في خدمات التنظيف والصيانة`;
            return { src: partner.logo, alt, title: alt };
          })}
          cardWidth={220}
          cardHeight={130}
          speedPxPerSec={72}
          imageFit="contain"
        />
      </div>
    </section>
  );
}
