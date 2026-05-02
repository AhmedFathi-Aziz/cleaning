import type { NationalNewsArticle } from "./national-news-types";
import { KV_NATIONAL_NEWS_KEY, R2_NATIONAL_NEWS_KEY } from "./national-news-types";
import { staticNationalNewsArticles } from "./static-national-news";

import { getBindings } from "./cf-bindings";

let memoryNationalNews: NationalNewsArticle[] = [];

function mergeArticles(stored: NationalNewsArticle[]): NationalNewsArticle[] {
  const bySlug = new Map<string, NationalNewsArticle>();
  for (const a of staticNationalNewsArticles) bySlug.set(a.slug, a);
  for (const a of stored) bySlug.set(a.slug, a);
  return [...bySlug.values()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function loadStoredNationalNews(): Promise<NationalNewsArticle[]> {
  const env = await getBindings();
  if (env?.MEDIA) {
    try {
      const obj = await env.MEDIA.get(R2_NATIONAL_NEWS_KEY);
      if (!obj) return [];
      const raw = await obj.text();
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as NationalNewsArticle[]) : [];
    } catch {
      return [];
    }
  }
  if (env?.ARTICLES) {
    try {
      const raw = await env.ARTICLES.get(KV_NATIONAL_NEWS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as NationalNewsArticle[]) : [];
    } catch {
      return [];
    }
  }
  return memoryNationalNews;
}

export async function saveNationalNews(articles: NationalNewsArticle[]): Promise<void> {
  const env = await getBindings();
  if (env?.MEDIA) {
    await env.MEDIA.put(R2_NATIONAL_NEWS_KEY, JSON.stringify(articles), {
      httpMetadata: { contentType: "application/json" },
    });
    return;
  }
  if (env?.ARTICLES) {
    await env.ARTICLES.put(KV_NATIONAL_NEWS_KEY, JSON.stringify(articles));
    return;
  }
  memoryNationalNews = articles;
}

export async function loadNationalNews(): Promise<NationalNewsArticle[]> {
  return mergeArticles(await loadStoredNationalNews());
}

export async function getNationalNewsBySlug(slug: string): Promise<NationalNewsArticle | null> {
  const list = await loadNationalNews();
  return list.find((a) => a.slug === slug) ?? null;
}
