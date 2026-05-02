import { isAdmin } from "@/lib/admin-auth";
import { loadNationalNews, loadStoredNationalNews, saveNationalNews } from "@/lib/national-news-store";
import type { NationalNewsArticle } from "@/lib/national-news-types";
import { staticNationalNewsArticles } from "@/lib/static-national-news";

export const dynamic = "force-dynamic";

function slugOk(slug: string) {
  if (slug.length < 1 || slug.length > 120) return false;
  if (slug.includes("/") || slug.includes("?")) return false;
  return true;
}

function isValidHttpUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

async function requireAuth(request: Request): Promise<Response | null> {
  if (!(await isAdmin(request))) {
    return Response.json({ error: "غير مصرّح" }, { status: 401 });
  }
  return null;
}

export async function GET(request: Request) {
  const deny = await requireAuth(request);
  if (deny) return deny;
  const articles = await loadNationalNews();
  const stored = await loadStoredNationalNews();
  const storedSlugSet = new Set(stored.map((a) => a.slug));
  const readonlySlugs = staticNationalNewsArticles.filter((a) => !storedSlugSet.has(a.slug)).map((a) => a.slug);
  return Response.json({ articles, readonlySlugs });
}

export async function POST(request: Request) {
  const deny = await requireAuth(request);
  if (deny) return deny;

  let body: Partial<NationalNewsArticle>;
  try {
    body = (await request.json()) as Partial<NationalNewsArticle>;
  } catch {
    return Response.json({ error: "جسون غير صالح" }, { status: 400 });
  }

  const { slug, title, excerpt, bodyMd, sourceUrl, publishedAt, seoTitle, seoDescription, keywords, sourceLabel } =
    body;
  if (!slug || !title || typeof excerpt !== "string" || typeof bodyMd !== "string") {
    return Response.json({ error: "حقول slug و title و excerpt و bodyMd مطلوبة" }, { status: 400 });
  }
  if (typeof sourceUrl !== "string" || !sourceUrl.trim()) {
    return Response.json({ error: "رابط المصدر sourceUrl مطلوب" }, { status: 400 });
  }
  const urlTrim = sourceUrl.trim();
  if (!isValidHttpUrl(urlTrim)) {
    return Response.json({ error: "رابط المصدر غير صالح (استخدم http أو https)" }, { status: 400 });
  }
  if (!slugOk(slug)) {
    return Response.json({ error: "slug غير صالح" }, { status: 400 });
  }

  const stored = await loadStoredNationalNews();
  const existing = stored.find((a) => a.slug === slug);

  const next: NationalNewsArticle = {
    ...(existing ?? {}),
    slug,
    title,
    excerpt,
    bodyMd,
    sourceUrl: urlTrim,
    publishedAt:
      typeof publishedAt === "string" && publishedAt.length > 0
        ? publishedAt
        : existing?.publishedAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const applyTrim = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

  if (sourceLabel !== undefined) {
    const t = applyTrim(sourceLabel);
    if (t) next.sourceLabel = t;
    else delete next.sourceLabel;
  }
  if (seoTitle !== undefined) {
    const t = applyTrim(seoTitle);
    if (t) next.seoTitle = t;
    else delete next.seoTitle;
  }
  if (seoDescription !== undefined) {
    const t = applyTrim(seoDescription);
    if (t) next.seoDescription = t;
    else delete next.seoDescription;
  }
  if (keywords !== undefined) {
    const list = Array.isArray(keywords) ? keywords.map((k) => String(k).trim()).filter(Boolean) : [];
    if (list.length) next.keywords = list;
    else delete next.keywords;
  }

  const idx = stored.findIndex((a) => a.slug === slug);
  const articles = [...stored];
  if (idx >= 0) articles[idx] = next;
  else articles.unshift(next);

  await saveNationalNews(articles);
  return Response.json({ ok: true, article: next });
}
