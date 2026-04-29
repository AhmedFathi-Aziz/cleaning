import type { BlogPost } from "./post-types";
import { KV_MEDIA_PREFIX, KV_POSTS_KEY, R2_MEDIA_PREFIX, R2_POSTS_KEY } from "./post-types";
import { staticBlogPosts } from "./static-blog-posts";

import { getBindings } from "./cf-bindings";

/** تخزين مؤقت عند `next dev` بدون ربطات Cloudflare */
let memoryPosts: BlogPost[] = [];
const memoryMedia = new Map<string, { data: ArrayBuffer; contentType: string }>();

function r2MediaObjectKey(publicKey: string): string {
  return `${R2_MEDIA_PREFIX}${publicKey}`;
}

function kvMediaKey(publicKey: string): string {
  return `${KV_MEDIA_PREFIX}${publicKey}`;
}

function mergePosts(storedPosts: BlogPost[]): BlogPost[] {
  const postsBySlug = new Map<string, BlogPost>();
  for (const post of staticBlogPosts) postsBySlug.set(post.slug, post);
  for (const post of storedPosts) postsBySlug.set(post.slug, post);

  return [...postsBySlug.values()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/** مقالات محفوظة في الذاكرة أو KV أو R2 فقط (بدون دمج مع posts.json). */
export async function loadStoredPosts(): Promise<BlogPost[]> {
  const env = await getBindings();
  if (env?.MEDIA) {
    try {
      const obj = await env.MEDIA.get(R2_POSTS_KEY);
      if (!obj) return [];
      const raw = await obj.text();
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
    } catch {
      return [];
    }
  }
  if (env?.ARTICLES) {
    try {
      const raw = await env.ARTICLES.get(KV_POSTS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
    } catch {
      return [];
    }
  }
  return memoryPosts;
}

function arrayBufferToStream(buf: ArrayBuffer): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(buf));
      controller.close();
    },
  });
}

export async function loadPosts(): Promise<BlogPost[]> {
  return mergePosts(await loadStoredPosts());
}

/** احفظ قائمة المقالات المخزنة فقط (بدون تمرير القائمة المدمجة مع posts.json). */
export async function savePosts(posts: BlogPost[]): Promise<void> {
  const env = await getBindings();
  if (env?.MEDIA) {
    await env.MEDIA.put(R2_POSTS_KEY, JSON.stringify(posts), {
      httpMetadata: { contentType: "application/json" },
    });
    return;
  }
  if (env?.ARTICLES) {
    await env.ARTICLES.put(KV_POSTS_KEY, JSON.stringify(posts));
    return;
  }
  memoryPosts = posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await loadPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function putMediaObject(key: string, data: ArrayBuffer, contentType: string): Promise<void> {
  const env = await getBindings();
  const r2Key = r2MediaObjectKey(key);
  if (env?.MEDIA) {
    await env.MEDIA.put(r2Key, data, { httpMetadata: { contentType } });
    return;
  }
  if (env?.ARTICLES) {
    await env.ARTICLES.put(kvMediaKey(key), data, {
      metadata: { ct: contentType },
    });
    return;
  }
  memoryMedia.set(r2Key, { data, contentType });
}

export async function getMediaObject(
  publicKey: string,
): Promise<{ body: ReadableStream | null; contentType: string } | null> {
  const env = await getBindings();
  const r2Key = r2MediaObjectKey(publicKey);
  if (env?.MEDIA) {
    const obj = await env.MEDIA.get(r2Key);
    if (!obj?.body) return null;
    return {
      body: obj.body as unknown as ReadableStream,
      contentType: obj.httpMetadata?.contentType ?? "application/octet-stream",
    };
  }
  if (env?.ARTICLES) {
    const k = kvMediaKey(publicKey);
    const res = await env.ARTICLES.getWithMetadata<ArrayBuffer>(k, { type: "arrayBuffer" });
    if (!res.value) return null;
    const meta = res.metadata as { ct?: string } | undefined;
    return {
      body: arrayBufferToStream(res.value),
      contentType: meta?.ct ?? "application/octet-stream",
    };
  }
  const m = memoryMedia.get(r2Key);
  if (!m) return null;
  return {
    body: arrayBufferToStream(m.data),
    contentType: m.contentType,
  };
}
