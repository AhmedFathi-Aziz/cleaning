import type { ServiceSection } from "@/lib/service-articles-types";
import { getServiceArticle } from "@/lib/service-articles";
import {
  buildProgrammaticServiceLocationContent,
  type ServiceLocationFaq,
} from "@/lib/service-location-uniqueness";
import type { CityLocation, Neighborhood } from "@/src/data/locations";

export type { ServiceLocationFaq };

export type ServiceLocationPageContent = {
  localIntro: string[];
  customerProblems: string[];
  serviceRecommendations: string[];
  sections: ServiceSection[];
  faqs: ServiceLocationFaq[];
  preparationBullets: string[];
};

export function getServiceLocationPageContent(
  serviceSlug: string,
  city: CityLocation,
  neighborhood: Neighborhood,
): ServiceLocationPageContent {
  const service = getServiceArticle(serviceSlug);
  const serviceLabel = service?.shortTitle ?? "الخدمة";
  return buildProgrammaticServiceLocationContent(city, neighborhood, serviceSlug, serviceLabel);
}
