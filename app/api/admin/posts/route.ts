import { isAdmin } from "@/lib/admin-auth";
import { loadPosts, loadStoredPosts, savePosts } from "@/lib/post-store";
import type { BlogPost } from "@/lib/post-types";
import { staticBlogPosts } from "@/lib/static-blog-posts";

export const dynamic = "force-dynamic";

function slugOk(slug: string) {
  if (slug.length < 1 || slug.length > 120) return false;
  if (slug.includes("/") || slug.includes("?")) return false;
  return true;
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
  const posts = await loadPosts();
  const stored = await loadStoredPosts();
  const storedSlugSet = new Set(stored.map((p) => p.slug));
  const readonlySlugs = staticBlogPosts.filter((p) => !storedSlugSet.has(p.slug)).map((p) => p.slug);
  return Response.json({ posts, readonlySlugs });
}

export async function POST(request: Request) {
  const deny = await requireAuth(request);
  if (deny) return deny;

  let body: Partial<BlogPost>;
  try {
    body = (await request.json()) as Partial<BlogPost>;
  } catch {
    return Response.json({ error: "جسون غير صالح" }, { status: 400 });
  }

  const {
    slug,
    title,
    excerpt,
    bodyMd,
    coverKey,
    publishedAt,
    seoTitle,
    seoDescription,
    keywords,
    author,
    coverImage,
  } = body;
  if (!slug || !title || typeof excerpt !== "string" || typeof bodyMd !== "string") {
    return Response.json({ error: "حقول slug و title و excerpt و bodyMd مطلوبة" }, { status: 400 });
  }
  if (!slugOk(slug)) {
    return Response.json({ error: "slug غير صالح" }, { status: 400 });
  }

  const stored = await loadStoredPosts();
  const existing = stored.find((p) => p.slug === slug);

  const next: BlogPost = {
    ...(existing ?? {}),
    slug,
    title,
    excerpt,
    bodyMd,
    coverKey: coverKey ?? null,
    publishedAt:
      typeof publishedAt === "string" && publishedAt.length > 0
        ? publishedAt
        : existing?.publishedAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const applyTrim = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

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
    const list = Array.isArray(keywords)
      ? keywords.map((k) => String(k).trim()).filter(Boolean)
      : [];
    if (list.length) next.keywords = list;
    else delete next.keywords;
  }
  if (author !== undefined) {
    const t = applyTrim(author);
    if (t) next.author = t;
    else delete next.author;
  }
  if (coverImage !== undefined) {
    const t = applyTrim(coverImage);
    if (t) next.coverImage = t;
    else delete next.coverImage;
  }

  const idx = stored.findIndex((p) => p.slug === slug);
  const posts = [...stored];
  if (idx >= 0) posts[idx] = next;
  else posts.unshift(next);

  await savePosts(posts);
  return Response.json({ ok: true, post: next });
}
