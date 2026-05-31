# النشر على Cloudflare Pages (موقع static)

## إعداد المستودع على GitHub

1. ارفع المشروع إلى GitHub.
2. في [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.

## إعدادات البناء

| الحقل | القيمة |
|--------|--------|
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `20` (أو أحدث LTS) |

## متغيرات البيئة (اختياري)

| المتغير | الوصف |
|---------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://saudi-cleaning.com` |

## النطاق المخصص

1. في مشروع Pages → **Custom domains** → أضف `saudi-cleaning.com` و`www.saudi-cleaning.com`.
2. عيّن **`saudi-cleaning.com`** كـ **Primary domain**.
3. Cloudflare يوجّه `www` تلقائياً إلى النطاق الأساسي — **لا تستخدم** `_redirects` بروابط مطلقة (`https://...`)؛ Pages يقبل مسارات نسبية فقط ولن يطبّق تلك القواعد.

## إضافة محتوى

- **مدونة**: `content/blog/*.md` ثم `npm run blog:sync`
- **أخبار وطنية**: `content/national-news/articles/*.json` ثم `npm run news:sync`

كل push إلى الفرع الرئيسي يعيد البناء والنشر تلقائياً.
