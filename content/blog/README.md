# المدونة (ملفات Markdown ثابتة)

**حالياً: 30 مقالاً** في هذا المجلد (28 من KV + 2 قديمة).

كل مقال في **ملف `.md` منفصل** داخل `content/blog/`. اسم الملف (بدون `.md`) يصبح رابط الصفحة:

`/blog/اسم-الملف`

## إضافة مقال جديد

1. أنشئ ملفاً مثل `summer-cleaning-tips.md`
2. املأ الـ frontmatter والمحتوى:

```md
---
title: عنوان المقال
excerpt: جملتان تظهران في القائمة
seoTitle: عنوان SEO (اختياري)
seoDescription: وصف SEO (اختياري)
keywords: ["كلمة1", "كلمة2"]
author: السعودية للتنظيف
coverImage: https://example.com/image.webp
coverKey: null
publishedAt: 2026-05-22T10:00:00.000Z
updatedAt: 2026-05-22T10:00:00.000Z
---

## عنوان فرعي

نص المقال بصيغة **Markdown**.
```

3. شغّل:

```bash
npm run blog:sync
```

أو `npm run build` (يُشغّل sync تلقائياً في `prebuild`).

4. راجع محلياً: `http://localhost:3000/blog/summer-cleaning-tips`

## قواعد

- **اسم الملف**: أحرف لاتينية صغيرة، أرقام، وشرطات (`a-z`, `0-9`, `-`).
- **`keywords`**: مصفوفة JSON في سطر واحد.
- **`coverImage`**: رابط مطلق، أو ضع الصورة في `public/images/` واستخدمها داخل `bodyMd`.
- الملفات التي تبدأ بـ `_` أو `README.md` لا تُحمَّل.

## استيراد من KV (مرة واحدة)

إن وُجدت مقالات جديدة في Cloudflare KV (`itqan-articles` → `posts.json`):

```bash
npm run blog:export-kv
```

## النشر (Cloudflare Pages)

```bash
npm run build
```

مجلد الناتج: **`out/`** — اربطه بمشروع Cloudflare Pages من GitHub.
