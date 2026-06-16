# تقرير سياسة الفهرسة — دمج عائلات URL

تاريخ التوليد: 2026-06-16T22:24:02.694Z

## ما تم تنفيذه

1. **دمج `/cleaning/{city}/{district}`** مع `/{city}/{neighborhood}#tanzeef-manazil`
   - قسم تنظيف المنازل داخل صفحة الحي
   - صفحات `/cleaning/...` → noindex + canonical للحي + 301 في `public/_redirects`
2. **تقييد service-location** بالرياض + 8 خدمات أساسية فقط
3. **noindex** لصفحات `/{city}/{neighborhood}` خارج الرياض
4. **تحديث sitemap** — إزالة `/cleaning/*` وغير الرياض
5. **الروابط الداخلية** — لا تُربط صفحات مفهرسة بأحياء noindex

## المقارنة

| المقياس | قبل | بعد |
|---|---:|---:|
| أحياء في sitemap | 116 | 44 |
| /cleaning/* في sitemap | 116 | 0 |
| service-location في sitemap | 1771 | 352 |
| **إجمالي sitemap (تقريبي)** | **2128** | **487** |

**تخفيض:** 1641 URL (−77%)

## الخدمات المفهرسة على مستوى الحي (الرياض فقط)

- `cleaning-company-riyadh` → 44 حي = 44 URL
- `house-cleaning` → 44 حي = 44 URL
- `pest-control-riyadh` → 44 حي = 44 URL
- `deep-home-cleaning` → 44 حي = 44 URL
- `water-tank-cleaning` → 44 حي = 44 URL
- `carpet-cleaning-riyadh` → 44 حي = 44 URL
- `villa-cleaning-riyadh` → 44 حي = 44 URL
- `apartment-cleaning-riyadh` → 44 حي = 44 URL

**المجموع:** 8 × 44 = 352 URL

## عائلات URL بعد الدمج

| العائلة | الفهرسة | الدور |
|---|---|---|
| `/{city}/{neighborhood}` | الرياض فقط (44) | **الصفحة الرئيسية للحي** + قسم تنظيف المنازل |
| `/cleaning/{city}/{district}` | لا | انتقال → صفحة الحي (301) |
| `/services/{service}/riyadh/{neighborhood}` | 8 خدمات × 44 حي | صفحات خدمة محلية مختارة |
| `/services/{service}` | نعم (18) | canonical لنية الخدمة |

## فحص الروابط الداخلية → noindex

✅ لا توجد انتهاكات مكتشفة في `app/` و`components/` و`lib/internal-linking/`.

### سياسة الربط

- أحياء قابلة للربط الداخلي: **44** (الرياض فقط)
- أحياء noindex (بدون ربط من الصفحات المفهرسة): **72**
- أزواج service-location المبنية: **352** (كلها `isServiceLocationIndexable`)
