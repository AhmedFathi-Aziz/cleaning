/**
 * لمرة واحدة: يحوّل content/blog/posts.json إلى content/blog/*.md
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = path.join(root, "content", "blog", "posts.json");
const blogDir = path.join(root, "content", "blog");

function yamlValue(v) {
  if (v === null || v === undefined) return "null";
  if (Array.isArray(v)) return JSON.stringify(v);
  if (typeof v === "string") {
    if (v.includes("\n") || v.includes(":")) return JSON.stringify(v);
    return v;
  }
  return String(v);
}

function postToMd(post) {
  const lines = [
    "---",
    `title: ${yamlValue(post.title)}`,
    `excerpt: ${yamlValue(post.excerpt ?? "")}`,
    `seoTitle: ${yamlValue(post.seoTitle)}`,
    `seoDescription: ${yamlValue(post.seoDescription)}`,
    `keywords: ${yamlValue(post.keywords ?? [])}`,
    `author: ${yamlValue(post.author)}`,
    `coverImage: ${yamlValue(post.coverImage)}`,
    `coverKey: ${yamlValue(post.coverKey ?? null)}`,
    `publishedAt: ${post.publishedAt}`,
    `updatedAt: ${post.updatedAt ?? post.publishedAt}`,
    "---",
    "",
    post.bodyMd,
    "",
  ];
  return lines.join("\n");
}

const posts = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
for (const post of posts) {
  const file = path.join(blogDir, `${post.slug}.md`);
  fs.writeFileSync(file, postToMd(post), "utf8");
  console.log(`wrote ${file}`);
}
