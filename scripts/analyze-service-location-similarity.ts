/**
 * Analyzes Jaccard text similarity across all /services/{cat}/{city}/{hood} pages.
 * Run: npm run analyze:service-location
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  analyzeServiceLocationSimilarity,
  formatSimilarityReportMarkdown,
} from "@/lib/service-location-similarity";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function main() {
  console.log("Analyzing service-location page similarity (full corpus)…");
  const started = Date.now();
  const report = analyzeServiceLocationSimilarity(0);
  const elapsed = ((Date.now() - started) / 1000).toFixed(1);

  const md = formatSimilarityReportMarkdown(report);
  const outDir = path.join(root, "reports");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "service-location-similarity.md");
  fs.writeFileSync(outFile, `${md}\n\n_Generated in ${elapsed}s._\n`, "utf8");

  console.log(`Total pages: ${report.totalPages}`);
  console.log(`Pairs >50%: ${report.globalPairsAbove50}`);
  console.log(`Pairs >40%: ${report.globalPairsAbove40}`);
  console.log(`Report: ${outFile}`);

  if (report.globalPairsAbove50 > 0) {
    console.log("\nTop 5 worst pairs:");
    for (const p of report.allPairsAbove50.slice(0, 5)) {
      console.log(`  ${(p.similarity * 100).toFixed(1)}%  ${p.urlA}  ↔  ${p.urlB}`);
    }
    process.exitCode = 1;
  }
}

main();
