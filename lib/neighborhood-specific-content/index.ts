import { riyadhNeighborhoodProfiles } from "./riyadh";
import { riyadhNeighborhoodProfilesPart2 } from "./riyadh-part2";
import type { NeighborhoodSpecificProfile } from "./types";

const profiles: Record<string, NeighborhoodSpecificProfile> = {
  ...riyadhNeighborhoodProfiles,
  ...riyadhNeighborhoodProfilesPart2,
};

export type { NeighborhoodFaq, NeighborhoodSpecificProfile } from "./types";

export function neighborhoodContentKey(citySlug: string, neighborhoodSlug: string): string {
  return `${citySlug}/${neighborhoodSlug}`;
}

export function getNeighborhoodSpecificContent(
  citySlug: string,
  neighborhoodSlug: string,
): NeighborhoodSpecificProfile | null {
  return profiles[neighborhoodContentKey(citySlug, neighborhoodSlug)] ?? null;
}

export function hasNeighborhoodSpecificContent(citySlug: string, neighborhoodSlug: string): boolean {
  return neighborhoodContentKey(citySlug, neighborhoodSlug) in profiles;
}
