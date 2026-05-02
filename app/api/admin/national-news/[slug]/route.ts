import { isAdmin } from "@/lib/admin-auth";
import { loadStoredNationalNews, saveNationalNews } from "@/lib/national-news-store";
import { staticNationalNewsArticles } from "@/lib/static-national-news";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request, context: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin(request))) {
    return Response.json({ error: "غير مصرّح" }, { status: 401 });
  }

  const { slug } = await context.params;
  const decoded = decodeURIComponent(slug);
  const stored = await loadStoredNationalNews();
  const filtered = stored.filter((a) => a.slug !== decoded);

  if (filtered.length === stored.length) {
    const existsOnlyAsStatic = staticNationalNewsArticles.some((a) => a.slug === decoded);
    if (existsOnlyAsStatic) {
      return Response.json(
        {
          error:
            "هذا الخبر مدمج من ملف النظام. لتعديله أو إزالته عدّل المشروع أو أنشئ نسخة بنفس slug من لوحة التحكم لتصبح قابلة للحذف.",
        },
        { status: 400 },
      );
    }
    return Response.json({ error: "غير موجود" }, { status: 404 });
  }

  await saveNationalNews(filtered);
  return Response.json({ ok: true });
}
