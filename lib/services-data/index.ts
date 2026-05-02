import type { ServiceArticle } from "@/lib/service-articles-types";

import { carpetCleaningArticle } from "./carpet-cleaning";
import { deepHomeCleaningArticle } from "./deep-home-cleaning";
import { facadeCleaningArticle } from "./facade-cleaning";
import { gardenCleaningArticle } from "./garden-cleaning";
import { houseCleaningArticle } from "./house-cleaning";
import { pestControlArticle } from "./pest-control";
import { sofaCleaningArticle } from "./sofa-cleaning";
import { waterTankCleaningArticle } from "./water-tank-cleaning";

export const serviceArticles: ServiceArticle[] = [
  houseCleaningArticle,
  deepHomeCleaningArticle,
  carpetCleaningArticle,
  facadeCleaningArticle,
  sofaCleaningArticle,
  pestControlArticle,
  waterTankCleaningArticle,
  gardenCleaningArticle,
];

export function getServiceArticle(slug: string): ServiceArticle | undefined {
  return serviceArticles.find((service) => service.slug === slug);
}
