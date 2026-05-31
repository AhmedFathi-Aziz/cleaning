import type { BlogPost } from "./post-types";
import { getStaticBlogSlugs, staticBlogPosts } from "./static-blog";

export function loadPosts(): BlogPost[] {
  return staticBlogPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  return staticBlogPosts.find((p) => p.slug === slug) ?? null;
}

export { getStaticBlogSlugs };
