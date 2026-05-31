import type { NationalNewsArticle } from "./national-news-types";
import { getStaticNationalNewsSlugs, staticNationalNewsArticles } from "./static-national-news";

export function loadNationalNews(): NationalNewsArticle[] {
  return staticNationalNewsArticles;
}

export function getNationalNewsBySlug(slug: string): NationalNewsArticle | null {
  return staticNationalNewsArticles.find((a) => a.slug === slug) ?? null;
}

export { getStaticNationalNewsSlugs };
