import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { brandNameAr } from "@/lib/brand";
import { loadPosts } from "@/lib/post-store";
import type { BlogPost } from "@/lib/post-types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مدونة التنظيف ورش الحشرات",
  description: `مقالات من ${brandNameAr} عن خدمات التنظيف، تنظيف المنازل، غسيل السجاد، تنظيف الواجهات، رش الحشرات ومكافحة الحشرات في المملكة العربية السعودية.`,
  keywords: [
    "مدونة تنظيف",
    "نصائح تنظيف منازل",
    "رش حشرات",
    "مكافحة حشرات",
    "غسيل سجاد",
    "تنظيف واجهات",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "مدونة التنظيف ورش الحشرات | السعودية للتنظيف",
    description: "مقالات مفيدة عن خدمات التنظيف ومكافحة الحشرات في المملكة العربية السعودية.",
    url: "/blog",
    type: "website",
    locale: "ar_SA",
  },
};

function getPostImage(post: BlogPost) {
  if (post.coverImage) return post.coverImage;
  if (post.coverKey) return `/api/media/${encodeURIComponent(post.coverKey)}`;
  return null;
}

export default async function BlogPage() {
  const posts = await loadPosts();

  return (
    <main className="px-8 pb-24 pt-32">
      <div className="mx-auto max-w-3xl text-right">
        <h1 className="font-headline text-4xl font-extrabold text-primary md:text-5xl">المدونة</h1>
        <p className="mt-4 text-on-surface-variant">
          مقالات ونصائح عن التنظيف والتعقيم وخدمات العناية بالمنازل والمنشآت.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl gap-10">
        {posts.length === 0 ? (
          <p className="text-center text-on-surface-variant">
            لا توجد مقالات بعد. افتح{" "}
            <Link href="/admin" className="font-bold text-secondary underline">
              لوحة المحرر
            </Link>{" "}
            لإضافة مقال (بعد ضبط ADMIN_PASSWORD).
          </p>
        ) : (
          posts.map((post) => {
            const img = getPostImage(post);
            return (
              <article
                key={post.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-surface-container bg-surface-container-lowest shadow-sm transition hover:shadow-md md:flex-row-reverse"
              >
                {img ? (
                  <div className="relative aspect-video w-full md:w-1/3">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      unoptimized
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col justify-center p-8 text-right">
                  <time className="text-sm text-on-surface-variant" dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("ar-SA")}
                  </time>
                  <h2 className="font-headline mt-2 text-2xl font-bold text-primary">
                    <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="hover:text-secondary">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt ? <p className="mt-3 line-clamp-2 text-on-surface-variant">{post.excerpt}</p> : null}
                  <Link
                    href={`/blog/${encodeURIComponent(post.slug)}`}
                    className="mt-4 inline-flex font-bold text-secondary hover:underline"
                  >
                    اقرأ المزيد
                  </Link>
                </div>
              </article>
            );
          })
        )}
      </div>
    </main>
  );
}
