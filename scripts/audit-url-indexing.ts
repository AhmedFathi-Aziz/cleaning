/**
 * تقرير سياسة الفهرسة بعد دمج عائلات URL.
 * الاستخدام: npx tsx scripts/audit-url-indexing.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getCleaningProgrammaticStaticParams } from "../lib/programmatic-cleaning-seo";
import { getServiceLocationStaticParams } from "../lib/service-location-pages";
import {
  isNeighborhoodHubIndexable,
  PRIMARY_SERVICE_LOCATION_SLUGS,
  shouldInternallyLinkToNeighborhoodHub,
} from "../lib/url-indexing-policy";
import { locations } from "../src/data/locations";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const reportPath = path.join(root, "reports", "url-indexing-policy.md");

const LINK_SOURCE_GLOBS = ["app", "components", "lib/internal-linking"] as const;

function walkTsxTs(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walkTsxTs(full, out);
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

/** يكتشف روابط HTML مباشرة لأحياء noindex في ملفات الواجهة */
function scanInternalLinksToNoindexHubs(): string[] {
  const nonIndexableCities = locations.filter((c) => !shouldInternallyLinkToNeighborhoodHub(c.slug));
  const violations: string[] = [];

  const files = LINK_SOURCE_GLOBS.flatMap((rel) => walkTsxTs(path.join(root, rel)));

  for (const file of files) {
    const rel = path.relative(root, file).replace(/\\/g, "/");
    const text = fs.readFileSync(file, "utf8");

    // صفحات الأحياء نفسها قد تربط أحياءها (noindex→noindex) — نستثنيها
    if (rel.includes("[citySlug]/[neighborhoodSlug]")) continue;
    if (rel.includes("cleaning/[citySlug]/[districtSlug]")) continue;

    for (const city of nonIndexableCities) {
      const hubPattern = new RegExp(`href=\\{?[\`'"]/?${city.slug}/[a-z0-9-]+`, "g");
      const serviceLocPattern = new RegExp(
        `href=\\{?[\`'"]/services/[a-z0-9-]+/${city.slug}/[a-z0-9-]+`,
        "g",
      );
      if (hubPattern.test(text)) {
        violations.push(`${rel} → neighborhood hub in ${city.slug}`);
      }
      if (serviceLocPattern.test(text)) {
        const hasIndexableGuard = text.includes("getServiceLinkFromNeighborhood") || text.includes("isServiceLocationIndexable");
        if (!hasIndexableGuard) {
          violations.push(`${rel} → service-location in ${city.slug}`);
        }
      }
    }
  }

  return [...new Set(violations)].sort();
}

function main() {
  const allNeighborhoods = locations.flatMap((c) =>
    c.neighborhoods.map((n) => ({ city: c.slug, neighborhood: n.slug })),
  );
  const indexableNeighborhoods = allNeighborhoods.filter((p) => isNeighborhoodHubIndexable(p.city));
  const serviceLocations = getServiceLocationStaticParams();
  const cleaningDistricts = getCleaningProgrammaticStaticParams();
  const linkViolations = scanInternalLinksToNoindexHubs();

  const before = {
    sitemapNeighborhoods: allNeighborhoods.length,
    sitemapCleaning: cleaningDistricts.length,
    sitemapServiceLocation: 1771,
    sitemapTotal: 2128,
  };

  const afterSitemap = {
    neighborhoods: indexableNeighborhoods.length,
    cleaning: 0,
    serviceLocation: serviceLocations.length,
    staticAndContent: 91,
  };
  const afterTotal =
    afterSitemap.staticAndContent + afterSitemap.neighborhoods + afterSitemap.serviceLocation;

  const lines = [
    "# تقرير سياسة الفهرسة — دمج عائلات URL",
    "",
    `تاريخ التوليد: ${new Date().toISOString()}`,
    "",
    "## ما تم تنفيذه",
    "",
    "1. **دمج `/cleaning/{city}/{district}`** مع `/{city}/{neighborhood}#tanzeef-manazil`",
    "   - قسم تنظيف المنازل داخل صفحة الحي",
    "   - صفحات `/cleaning/...` → noindex + canonical للحي + 301 في `public/_redirects`",
    "2. **تقييد service-location** بالرياض + 8 خدمات أساسية فقط",
    "3. **noindex** لصفحات `/{city}/{neighborhood}` خارج الرياض",
    "4. **تحديث sitemap** — إزالة `/cleaning/*` وغير الرياض",
    "5. **الروابط الداخلية** — لا تُربط صفحات مفهرسة بأحياء noindex",
    "",
    "## المقارنة",
    "",
    "| المقياس | قبل | بعد |",
    "|---|---:|---:|",
    `| أحياء في sitemap | ${before.sitemapNeighborhoods} | ${afterSitemap.neighborhoods} |`,
    `| /cleaning/* في sitemap | ${before.sitemapCleaning} | ${afterSitemap.cleaning} |`,
    `| service-location في sitemap | ${before.sitemapServiceLocation} | ${afterSitemap.serviceLocation} |`,
    `| **إجمالي sitemap (تقريبي)** | **${before.sitemapTotal}** | **${afterTotal}** |`,
    "",
    `**تخفيض:** ${before.sitemapTotal - afterTotal} URL (−${Math.round(((before.sitemapTotal - afterTotal) / before.sitemapTotal) * 100)}%)`,
    "",
    "## الخدمات المفهرسة على مستوى الحي (الرياض فقط)",
    "",
    ...PRIMARY_SERVICE_LOCATION_SLUGS.map((s) => `- \`${s}\` → 44 حي = 44 URL`),
    "",
    `**المجموع:** ${PRIMARY_SERVICE_LOCATION_SLUGS.length} × 44 = ${serviceLocations.length} URL`,
    "",
    "## عائلات URL بعد الدمج",
    "",
    "| العائلة | الفهرسة | الدور |",
    "|---|---|---|",
    "| `/{city}/{neighborhood}` | الرياض فقط (44) | **الصفحة الرئيسية للحي** + قسم تنظيف المنازل |",
    "| `/cleaning/{city}/{district}` | لا | انتقال → صفحة الحي (301) |",
    "| `/services/{service}/riyadh/{neighborhood}` | 8 خدمات × 44 حي | صفحات خدمة محلية مختارة |",
    "| `/services/{service}` | نعم (18) | canonical لنية الخدمة |",
    "",
    "## فحص الروابط الداخلية → noindex",
    "",
    linkViolations.length === 0
      ? "✅ لا توجد انتهاكات مكتشفة في `app/` و`components/` و`lib/internal-linking/`."
      : [
          `⚠️ **${linkViolations.length}** انتهاك محتمل:`,
          "",
          ...linkViolations.map((v) => `- ${v}`),
        ].join("\n"),
    "",
    "### سياسة الربط",
    "",
    `- أحياء قابلة للربط الداخلي: **${indexableNeighborhoods.length}** (الرياض فقط)`,
    `- أحياء noindex (بدون ربط من الصفحات المفهرسة): **${allNeighborhoods.length - indexableNeighborhoods.length}**`,
    `- أزواج service-location المبنية: **${serviceLocations.length}** (كلها \`isServiceLocationIndexable\`)`,
    "",
  ];

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, lines.join("\n"), "utf8");
  console.log(`[audit-url-indexing] sitemap: ${before.sitemapTotal} → ${afterTotal}`);
  console.log(`[audit-url-indexing] internal-link violations: ${linkViolations.length}`);
  console.log(`[audit-url-indexing] report → ${path.relative(root, reportPath)}`);

  if (linkViolations.length > 0) {
    console.error("[audit-url-indexing] FAILED — fix internal links to noindex hubs");
    process.exitCode = 1;
  }
}

main();
