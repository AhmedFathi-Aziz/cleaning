"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import type { BlogPost } from "@/lib/post-types";
import { brandNameAr } from "@/lib/brand";

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

export function AdminDashboard() {
  const [session, setSession] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [readonlySlugs, setReadonlySlugs] = useState<string[]>([]);

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [bodyMd, setBodyMd] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [keywordsStr, setKeywordsStr] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [publishedAtLocal, setPublishedAtLocal] = useState(isoToDatetimeLocal(new Date().toISOString()));

  const [coverKey, setCoverKey] = useState<string | null>(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [error, setError] = useState("");

  const refreshSession = useCallback(async () => {
    const r = await fetch("/api/admin/session", { credentials: "include" });
    const j = (await r.json()) as { ok: boolean };
    setSession(j.ok);
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const loadPosts = async () => {
    const r = await fetch("/api/admin/posts", { credentials: "include" });
    if (!r.ok) return;
    const j = (await r.json()) as { posts: BlogPost[]; readonlySlugs: string[] };
    setPosts(j.posts);
    setReadonlySlugs(j.readonlySlugs ?? []);
  };

  useEffect(() => {
    if (session) void loadPosts();
  }, [session]);

  const resetForm = () => {
    setSlug("");
    setTitle("");
    setExcerpt("");
    setBodyMd("");
    setSeoTitle("");
    setSeoDescription("");
    setKeywordsStr("");
    setAuthor("");
    setCoverImageUrl("");
    setPublishedAtLocal(isoToDatetimeLocal(new Date().toISOString()));
    setCoverKey(null);
    setUploadMsg("");
    setError("");
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
      credentials: "include",
    });
    setLoading(false);
    if (!r.ok) {
      const j = (await r.json().catch(() => ({}))) as { error?: string };
      setError(j.error || "فشل تسجيل الدخول");
      return;
    }
    setPassword("");
    await refreshSession();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setSession(false);
    setPosts([]);
    setReadonlySlugs([]);
    resetForm();
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadMsg("");
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
    const j = (await r.json()) as { url?: string; key?: string; error?: string };
    if (!r.ok) {
      setUploadMsg(j.error || "فشل الرفع");
      return;
    }
    if (j.key) setCoverKey(j.key);
    setCoverImageUrl("");
    setUploadMsg(j.url ? `تم الرفع. رابط الصورة: ${j.url}` : "تم الرفع.");
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const keywords = keywordsStr
      .split(/[,،]/u)
      .map((s) => s.trim())
      .filter(Boolean);
    const r = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        slug,
        title,
        excerpt,
        bodyMd,
        coverKey,
        publishedAt: datetimeLocalToIso(publishedAtLocal),
        seoTitle,
        seoDescription,
        keywords,
        author,
        coverImage: coverImageUrl.trim(),
      }),
    });
    setLoading(false);
    if (!r.ok) {
      const j = (await r.json().catch(() => ({}))) as { error?: string };
      setError(j.error || "فشل الحفظ");
      return;
    }
    await loadPosts();
    resetForm();
  };

  const edit = (p: BlogPost) => {
    setSlug(p.slug);
    setTitle(p.title);
    setExcerpt(p.excerpt);
    setBodyMd(p.bodyMd);
    setSeoTitle(p.seoTitle ?? "");
    setSeoDescription(p.seoDescription ?? "");
    setKeywordsStr(p.keywords?.join(", ") ?? "");
    setAuthor(p.author ?? "");
    setCoverImageUrl(p.coverImage ?? "");
    setPublishedAtLocal(isoToDatetimeLocal(p.publishedAt));
    setCoverKey(p.coverKey);
    setUploadMsg("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const del = async (s: string) => {
    if (!confirm("حذف المقال من التخزين؟")) return;
    const res = await fetch(`/api/admin/posts/${encodeURIComponent(s)}`, { method: "DELETE", credentials: "include" });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      alert(j.error || "فشل الحذف");
      return;
    }
    await loadPosts();
  };

  if (session === null) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center font-body text-on-surface-variant">
        جاري التحميل…
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-right font-body">
        <div className="hydro-shadow rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-8">
          <h1 className="font-headline text-2xl font-extrabold text-primary">لوحة تحكم المدونة</h1>
          <form onSubmit={login} className="mt-8 space-y-4">
            <label htmlFor="admin-password" className="block text-sm font-semibold text-on-background">
              كلمة المرور
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {error ? <p className="text-sm font-medium text-error">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="liquid-gradient w-full rounded-full py-3.5 font-bold text-on-primary shadow-[0_12px_40px_rgba(0,35,111,0.12)] transition-opacity disabled:opacity-60"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 text-right font-body text-on-background">
      <header className="hydro-shadow flex flex-wrap items-start justify-between gap-4 rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6 md:items-center">
        <div>
          <h1 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">لوحة تحكم المدونة</h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            أنشئ مقالات Markdown مع بيانات SEO، ثم راجع النشر على{" "}
            <Link href="/blog" className="font-bold text-secondary underline decoration-secondary/40 underline-offset-4 hover:text-primary">
              صفحة المدونة
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={() => void logout()}
          className="rounded-full border border-outline-variant bg-background px-5 py-2.5 text-sm font-bold text-primary shadow-sm transition-colors hover:border-secondary hover:bg-secondary/5"
        >
          خروج
        </button>
      </header>

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
            مقال جديد
          </button>
        </div>
        <div>
          <label htmlFor="post-slug" className="block text-sm font-semibold text-primary">
            slug (رابط المقال — أحرف لاتينية وأرقام وشرطات)
          </label>
          <input id="post-slug" dir="ltr" value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="post-title" className="block text-sm font-semibold text-primary">
            عنوان المقال
          </label>
          <input id="post-title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="post-published" className="block text-sm font-semibold text-primary">
            تاريخ النشر
          </label>
          <input
            id="post-published"
            type="datetime-local"
            value={publishedAtLocal}
            onChange={(e) => setPublishedAtLocal(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="post-excerpt" className="block text-sm font-semibold text-primary">
            المقتطف (يظهر في قائمة المدونة)
          </label>
          <textarea id="post-excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={`${inputClass} min-h-[88px]`} />
        </div>
        <div>
          <label htmlFor="post-body" className="block text-sm font-semibold text-primary">
            المحتوى (Markdown)
          </label>
          <textarea id="post-body" value={bodyMd} onChange={(e) => setBodyMd(e.target.value)} className={`${inputClass} min-h-[220px] font-mono text-sm`} />
          <p className="mt-2 text-xs text-on-surface-variant">صورة داخل المقال: ![وصف](رابط_الصورة)</p>
        </div>

        <div className="rounded-2xl border border-secondary/25 bg-secondary/5 p-5">
          <p className="mb-4 text-sm font-extrabold text-secondary">إعدادات SEO (اختياري)</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="post-seo-title" className="block text-sm font-semibold text-primary">
                عنوان الصفحة للبحث (إن لم يُملأ يُستخدم عنوان المقال)
              </label>
              <input id="post-seo-title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="post-seo-desc" className="block text-sm font-semibold text-primary">
                وصف الميتا للبحث
              </label>
              <textarea id="post-seo-desc" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} className={`${inputClass} min-h-[72px]`} />
            </div>
            <div>
              <label htmlFor="post-keywords" className="block text-sm font-semibold text-primary">
                كلمات مفتاحية (افصل بينها بفاصلة عربية أو إنجليزية)
              </label>
              <input id="post-keywords" value={keywordsStr} onChange={(e) => setKeywordsStr(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="post-author" className="block text-sm font-semibold text-primary">
                المؤلف / الجهة
              </label>
              <input
                id="post-author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder={brandNameAr}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="post-cover-url" className="block text-sm font-semibold text-primary">
            صورة الغلاف (رابط مباشر اختياري)
          </label>
          <input
            id="post-cover-url"
            dir="ltr"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            className={inputClass}
            placeholder="https://..."
          />
        </div>
        <div>
          <label htmlFor="post-cover" className="block text-sm font-semibold text-primary">
            أو ارفع صورة غلاف (يُخزَّن محلياً أو على R2 عند الإنتاج)
          </label>
          <input id="post-cover" type="file" accept="image/*" onChange={(e) => void upload(e)} className="mt-2 w-full text-sm text-on-surface-variant file:me-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:font-bold file:text-primary hover:file:bg-primary/15" />
          {coverKey ? (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <p className="text-xs font-medium text-secondary">مفتاح الملف: {coverKey}</p>
              <button
                type="button"
                onClick={() => {
                  setCoverKey(null);
                  setUploadMsg("تمت إزالة صورة الرفع من هذا المقال.");
                }}
                className="text-xs font-bold text-secondary underline decoration-secondary/40"
              >
                إزالة صورة الرفع
              </button>
            </div>
          ) : null}
          {uploadMsg ? <p className="mt-2 text-xs text-on-surface-variant">{uploadMsg}</p> : null}
        </div>
        {error ? <p className="text-sm font-medium text-error">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="liquid-gradient rounded-full px-10 py-3.5 font-bold text-on-primary shadow-[0_12px_40px_rgba(0,35,111,0.12)] transition-opacity disabled:opacity-60"
        >
          حفظ المقال
        </button>
      </form>

      <div className="mt-14 space-y-4">
        <h2 className="font-headline text-lg font-extrabold text-primary">كل المقالات (تشمل المدمجة من الملف الثابت إن وُجدت)</h2>
        {posts.map((p) => {
          const readonly = readonlySlugs.includes(p.slug);
          return (
            <div
              key={p.slug}
              className="hydro-shadow flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-outline-variant bg-background p-4"
            >
              <div>
                <p className="font-bold text-primary">{p.title}</p>
                <p className="text-xs text-on-surface-variant" dir="ltr">
                  /blog/{p.slug}
                </p>
                {readonly ? (
                  <p className="mt-2 text-xs font-medium text-secondary">مدمج من ملف النظام — الحذف معطّل؛ يمكنك تعديله بحفظ نسخة بنفس الرابط.</p>
                ) : null}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => edit(p)}
                  className="rounded-xl bg-secondary/15 px-4 py-2 text-sm font-bold text-secondary hover:bg-secondary/25"
                >
                  تعديل
                </button>
                <button
                  type="button"
                  onClick={() => void del(p.slug)}
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
    </div>
  );
}
