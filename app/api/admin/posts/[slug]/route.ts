import { isAdmin } from "@/lib/admin-auth";
import { loadStoredPosts, savePosts } from "@/lib/post-store";
import { staticBlogPosts } from "@/lib/static-blog-posts";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request, context: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin(request))) {
    return Response.json({ error: "غير مصرّح" }, { status: 401 });
  }

  const { slug } = await context.params;
  const decoded = decodeURIComponent(slug);
  const stored = await loadStoredPosts();
  const filtered = stored.filter((p) => p.slug !== decoded);

  if (filtered.length === stored.length) {
    const existsOnlyAsStatic = staticBlogPosts.some((p) => p.slug === decoded);
    if (existsOnlyAsStatic) {
      return Response.json(
        { error: "هذا المقال مدمج من ملف النظام. لتعديله أو إزالته عدّل المشروع أو أنشئ نسخة بنفس slug من لوحة التحكم لتصبح قابلة للحذف." },
        { status: 400 },
      );
    }
    return Response.json({ error: "غير موجود" }, { status: 404 });
  }

  await savePosts(filtered);
  return Response.json({ ok: true });
}
