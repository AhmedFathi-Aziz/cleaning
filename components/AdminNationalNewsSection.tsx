"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import type { NationalNewsArticle } from "@/lib/national-news-types";

const inputClass =
  "mt-1 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-on-background shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-on-surface-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20";

function isoToDatetimeLocal(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function datetimeLocalToIso(local: string): string {
  const d = new Date(local);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

export function AdminNationalNewsSection() {
  const [articles, setArticles] = useState<NationalNewsArticle[]>([]);
  const [readonlySlugs, setReadonlySlugs] = useState<string[]>([]);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [bodyMd, setBodyMd] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceLabel, setSourceLabel] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [keywordsStr, setKeywordsStr] = useState("");
  const [publishedAtLocal, setPublishedAtLocal] = useState(isoToDatetimeLocal(new Date().toISOString()));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadArticles = useCallback(async () => {
    const r = await fetch("/api/admin/national-news", { credentials: "include" });
    if (!r.ok) return;
    const j = (await r.json()) as { articles: NationalNewsArticle[]; readonlySlugs: string[] };
    setArticles(j.articles);
    setReadonlySlugs(j.readonlySlugs ?? []);
  }, []);

  useEffect(() => {
    void loadArticles();
  }, [loadArticles]);

  const resetForm = () => {
    setSlug("");
    setTitle("");
    setExcerpt("");
    setBodyMd("");
    setSourceUrl("");
    setSourceLabel("");
    setSeoTitle("");
    setSeoDescription("");
    setKeywordsStr("");
    setPublishedAtLocal(isoToDatetimeLocal(new Date().toISOString()));
    setError("");
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const keywords = keywordsStr
      .split(/[,،]/u)
      .map((s) => s.trim())
      .filter(Boolean);
    const r = await fetch("/api/admin/national-news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        slug,
        title,
        excerpt,
        bodyMd,
        sourceUrl,
        sourceLabel,
        publishedAt: datetimeLocalToIso(publishedAtLocal),
        seoTitle,
        seoDescription,
        keywords,
      }),
    });
    setLoading(false);
    if (!r.ok) {
      const j = (await r.json().catch(() => ({}))) as { error?: string };
      setError(j.error || "فشل الحفظ");
      return;
    }
    await loadArticles();
    resetForm();
  };

  const edit = (a: NationalNewsArticle) => {
    setSlug(a.slug);
    setTitle(a.title);
    setExcerpt(a.excerpt);
    setBodyMd(a.bodyMd);
    setSourceUrl(a.sourceUrl);
    setSourceLabel(a.sourceLabel ?? "");
    setSeoTitle(a.seoTitle ?? "");
    setSeoDescription(a.seoDescription ?? "");
    setKeywordsStr(a.keywords?.join(", ") ?? "");
    setPublishedAtLocal(isoToDatetimeLocal(a.publishedAt));
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const del = async (s: string) => {
    if (!confirm("حذف الخبر من التخزين؟")) return;
    const res = await fetch(`/api/admin/national-news/${encodeURIComponent(s)}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      alert(j.error || "فشل الحذف");
      return;
    }
    await loadArticles();
  };

  return (
    <>
      <form
        onSubmit={save}
        className="hydro-shadow mt-10 space-y-5 rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6 md:p-8"
      >
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => resetForm()}
            className="rounded-full border border-outline-variant bg-background px-5 py-2 text-sm font-bold text-primary hover:border-secondary hover:bg-secondary/5"
          >
            خبر جديد
          </button>
        </div>
        <div>
          <label htmlFor="news-slug" className="block text-sm font-semibold text-primary">
            slug (رابط الخبر — أحرف لاتينية وأرقام وشرطات)
          </label>
          <input id="news-slug" dir="ltr" value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="news-title" className="block text-sm font-semibold text-primary">
            عنوان الخبر
          </label>
          <input id="news-title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="news-published" className="block text-sm font-semibold text-primary">
            تاريخ النشر
          </label>
          <input
            id="news-published"
            type="datetime-local"
            value={publishedAtLocal}
            onChange={(e) => setPublishedAtLocal(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="news-excerpt" className="block text-sm font-semibold text-primary">
            المقتطف (يظهر في قائمة الأخبار)
          </label>
          <textarea id="news-excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={`${inputClass} min-h-[88px]`} />
        </div>
        <div>
          <label htmlFor="news-body" className="block text-sm font-semibold text-primary">
            المحتوى (Markdown)
          </label>
          <textarea id="news-body" value={bodyMd} onChange={(e) => setBodyMd(e.target.value)} className={`${inputClass} min-h-[220px] font-mono text-sm`} />
        </div>
        <div className="rounded-2xl border border-secondary/25 bg-secondary/5 p-5">
          <p className="mb-4 text-sm font-extrabold text-secondary">المصدر الخارجي</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="news-source-url" className="block text-sm font-semibold text-primary">
                رابط المصدر (إلزامي)
              </label>
              <input
                id="news-source-url"
                dir="ltr"
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className={inputClass}
                placeholder="https://..."
                required
              />
            </div>
            <div>
              <label htmlFor="news-source-label" className="block text-sm font-semibold text-primary">
                تسمية المصدر (اختياري — مثال: اسم الجهة)
              </label>
              <input
                id="news-source-label"
                value={sourceLabel}
                onChange={(e) => setSourceLabel(e.target.value)}
                className={inputClass}
                placeholder="هيئة، وزارة، موقع إخباري…"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-secondary/25 bg-secondary/5 p-5">
          <p className="mb-4 text-sm font-extrabold text-secondary">العنوان والوصف خارج الخبر (اختياري)</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="news-seo-title" className="block text-sm font-semibold text-primary">
                عنوان بديل للصفحة (إن تُرك فارغاً يُستخدم عنوان الخبر)
              </label>
              <input id="news-seo-title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="news-seo-desc" className="block text-sm font-semibold text-primary">
                وصف مختصر يظهر مع الرابط عند المشاركة (اختياري)
              </label>
              <textarea id="news-seo-desc" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} className={`${inputClass} min-h-[72px]`} />
            </div>
            <div>
              <label htmlFor="news-keywords" className="block text-sm font-semibold text-primary">
                وسوم مساعدة (افصل بينها بفاصلة)
              </label>
              <input id="news-keywords" value={keywordsStr} onChange={(e) => setKeywordsStr(e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {error ? <p className="text-sm font-medium text-error">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="liquid-gradient rounded-full px-10 py-3.5 font-bold text-on-primary shadow-[0_12px_40px_rgba(0,35,111,0.12)] transition-opacity disabled:opacity-60"
        >
          حفظ الخبر
        </button>
      </form>

      <div className="mt-14 space-y-4">
        <h2 className="font-headline text-lg font-extrabold text-primary">كل الأخبار</h2>
        {articles.map((a) => {
          const readonly = readonlySlugs.includes(a.slug);
          return (
            <div
              key={a.slug}
              className="hydro-shadow flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-outline-variant bg-background p-4"
            >
              <div>
                <p className="font-bold text-primary">{a.title}</p>
                <p className="text-xs text-on-surface-variant" dir="ltr">
                  /news/{a.slug}
                </p>
                {readonly ? (
                  <p className="mt-2 text-xs font-medium text-secondary">
                    مدمج من ملف النظام — الحذف معطّل؛ يمكنك تعديله بحفظ نسخة بنفس الرابط.
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/news/${encodeURIComponent(a.slug)}`}
                  className="rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm font-bold text-primary hover:border-secondary"
                >
                  معاينة
                </Link>
                <button
                  type="button"
                  onClick={() => edit(a)}
                  className="rounded-xl bg-secondary/15 px-4 py-2 text-sm font-bold text-secondary hover:bg-secondary/25"
                >
                  تعديل
                </button>
                <button
                  type="button"
                  onClick={() => void del(a.slug)}
                  disabled={readonly}
                  className="rounded-xl bg-error/10 px-4 py-2 text-sm font-bold text-error hover:bg-error/15 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  حذف
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
