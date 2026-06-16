/**
 * يولّد قواعد 301 لصفحات service×حي غير المبنية (كانت في sitemap قديماً).
 * npx tsx scripts/generate-service-location-redirects.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  getServiceLocationWildcardRedirectRules,
} from "../lib/service-location-redirect-target.ts";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const redirectsPath = path.join(root, "public", "_redirects");
const markerStart = "# --- service-location redirects (generated) ---";
const markerEnd = "# --- end service-location redirects ---";

function main() {
  const wildcards = getServiceLocationWildcardRedirectRules();

  const generated = [
    markerStart,
    `# ${new Date().toISOString()} — ${wildcards.length} قاعدة wildcard`,
    "",
    ...wildcards.map((r) => `${r.from}    ${r.to}    301`),
    markerEnd,
    "",
  ].join("\n");

  let base = "";
  if (fs.existsSync(redirectsPath)) {
    base = fs.readFileSync(redirectsPath, "utf8");
    const start = base.indexOf(markerStart);
    if (start !== -1) {
      const end = base.indexOf(markerEnd, start);
      base = end === -1 ? base.slice(0, start) : base.slice(0, start) + base.slice(end + markerEnd.length);
    }
    base = base.trimEnd() + "\n\n";
  }

  fs.writeFileSync(redirectsPath, base + generated, "utf8");
  console.log(`[redirects] wildcards: ${wildcards.length}`);
  console.log(`[redirects] → ${path.relative(root, redirectsPath)}`);
}

main();
