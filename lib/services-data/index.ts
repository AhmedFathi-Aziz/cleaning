import type { ServiceArticle } from "@/lib/service-articles-types";

import { apartmentCleaningRiyadhArticle } from "./apartment-cleaning-riyadh";
import { carpetCleaningArticle } from "./carpet-cleaning";
import { carpetCleaningRiyadhArticle } from "./carpet-cleaning-riyadh";
import { cockroachControlRiyadhArticle } from "./cockroach-control-riyadh";
import { termiteControlRiyadhArticle } from "./termite-control-riyadh";
import { cleaningCompanyRiyadhArticle } from "./cleaning-company-riyadh";
import { deepHomeCleaningArticle } from "./deep-home-cleaning";
import { facadeCleaningArticle } from "./facade-cleaning";
import { gardenCleaningArticle } from "./garden-cleaning";
import { houseCleaningArticle } from "./house-cleaning";
import { majlisCleaningRiyadhArticle } from "./majlis-cleaning-riyadh";
import { pestControlArticle } from "./pest-control";
import { pestControlRiyadhArticle } from "./pest-control-riyadh";
import { postConstructionCleaningRiyadhArticle } from "./post-construction-cleaning-riyadh";
import { serviceRiyadhExtraFaqs } from "./riyadh-extra-faqs";
import { serviceRiyadhExtraSections } from "./riyadh-extra-sections";
import { sofaCleaningArticle } from "./sofa-cleaning";
import { sofaCleaningRiyadhArticle } from "./sofa-cleaning-riyadh";
import { villaCleaningRiyadhArticle } from "./villa-cleaning-riyadh";
import { waterTankCleaningArticle } from "./water-tank-cleaning";
import { antControlArticle } from "./ant-control-riyadh";
import { bedBugControlRiyadhArticle } from "./bed-bug-control-riyadh";
import { ratControlRiyadhArticle } from "./rat-control-riyadh";
import { pigeonControlRiyadhArticle } from "./pigeon-control-riyadh";

const baseServiceArticles: ServiceArticle[] = [
  cleaningCompanyRiyadhArticle,
  houseCleaningArticle,
  apartmentCleaningRiyadhArticle,
  villaCleaningRiyadhArticle,
  majlisCleaningRiyadhArticle,
  sofaCleaningRiyadhArticle,
  carpetCleaningRiyadhArticle,
  deepHomeCleaningArticle,
  postConstructionCleaningRiyadhArticle,
  carpetCleaningArticle,
  facadeCleaningArticle,
  sofaCleaningArticle,
  pestControlRiyadhArticle,
  cockroachControlRiyadhArticle,
  termiteControlRiyadhArticle,
  pestControlArticle,
  waterTankCleaningArticle,
  gardenCleaningArticle,
  antControlArticle,
  bedBugControlRiyadhArticle,
  ratControlRiyadhArticle,
  pigeonControlRiyadhArticle,
];

function mergeFaqsByQuestion(
  base: ServiceArticle["faqs"],
  extra: ServiceArticle["faqs"],
): ServiceArticle["faqs"] {
  const seen = new Set<string>();
  const merged: ServiceArticle["faqs"] = [];

  for (const faq of [...base, ...extra]) {
    if (seen.has(faq.question)) continue;
    seen.add(faq.question);
    merged.push(faq);
  }

  return merged;
}

function enrichServiceForRiyadh(article: ServiceArticle): ServiceArticle {
  const extraSections = serviceRiyadhExtraSections[article.slug] ?? [];
  const extraFaqs = serviceRiyadhExtraFaqs[article.slug] ?? [];
  const riyadhKeywords = [
    `${article.shortTitle} الرياض`,
    `شركة ${article.shortTitle} الرياض`,
  ];

  return {
    ...article,
    keywords: [...new Set([...article.keywords, ...riyadhKeywords])],
    sections: [...article.sections, ...extraSections],
    faqs: mergeFaqsByQuestion(article.faqs, extraFaqs),
  };
}

export const serviceArticles: ServiceArticle[] = baseServiceArticles.map(enrichServiceForRiyadh);

export function getServiceArticle(slug: string): ServiceArticle | undefined {
  return serviceArticles.find((service) => service.slug === slug);
}
