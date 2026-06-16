import { getServiceLocationPageContent } from "@/lib/service-location-deep-content";
import { getServiceLocationStaticParams } from "@/lib/service-location-pages";
import { getServiceArticle } from "@/lib/service-articles";
import { getCityBySlug, getNeighborhoodBySlug } from "@/src/data/locations";

const SIMILARITY_THRESHOLD = 0.5;
const TARGET_MAX = 0.4;

function tokenize(text: string): Set<string> {
  const normalized = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  const tokens = normalized.split(" ").filter((t) => t.length > 1);
  return new Set(tokens);
}

/** Jaccard similarity on word tokens (0 = distinct, 1 = identical) */
export function jaccardSimilarity(a: string, b: string): number {
  const setA = tokenize(a);
  const setB = tokenize(b);
  if (setA.size === 0 && setB.size === 0) return 1;
  if (setA.size === 0 || setB.size === 0) return 0;

  let intersection = 0;
  for (const t of setA) {
    if (setB.has(t)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/** Fingerprint of locally unique blocks (landmarks, problems, recommendations, FAQs) */
export function uniqueContentFingerprint(content: ReturnType<typeof getServiceLocationPageContent>): string {
  const parts: string[] = [
    ...content.localIntro,
    ...content.customerProblems,
    ...content.serviceRecommendations,
    ...content.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]),
    ...content.faqs.flatMap((f) => [f.question, f.answer]),
    ...content.preparationBullets,
  ];
  return parts.join("\n");
}

export function flattenServiceLocationContent(content: ReturnType<typeof getServiceLocationPageContent>): string {
  const parts: string[] = [
    ...content.localIntro,
    ...content.customerProblems,
    ...content.serviceRecommendations,
    ...content.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
    ...content.faqs.flatMap((f) => [f.question, f.answer]),
    ...content.preparationBullets,
  ];
  return parts.join("\n");
}

export type PageSimilarityPair = {
  serviceSlug: string;
  urlA: string;
  urlB: string;
  similarity: number;
  templateSimilarity: number;
};

export type ServiceSimilarityStats = {
  serviceSlug: string;
  pageCount: number;
  pairsCompared: number;
  pairsAbove50: number;
  pairsAbove40: number;
  maxSimilarity: number;
  avgSimilarity: number;
  worstPairs: PageSimilarityPair[];
};

export type SimilarityReport = {
  totalPages: number;
  globalPairsAbove50: number;
  globalPairsAbove40: number;
  byService: ServiceSimilarityStats[];
  allPairsAbove50: PageSimilarityPair[];
};

function pageKey(category: string, city: string, neighborhood: string) {
  return `/services/${category}/${city}/${neighborhood}`;
}

export function analyzeServiceLocationSimilarity(samplePerService = 0): SimilarityReport {
  const params = getServiceLocationStaticParams();
  const byService = new Map<string, { key: string; text: string; landmarks: string }[]>();

  for (const { category, city, neighborhood } of params) {
    const c = getCityBySlug(city);
    const n = getNeighborhoodBySlug(city, neighborhood);
    if (!c || !n) continue;

    const content = getServiceLocationPageContent(category, c, n);
    const text = uniqueContentFingerprint(content);
    const key = pageKey(category, city, neighborhood);

    if (!byService.has(category)) byService.set(category, []);
    byService.get(category)!.push({ key, text, landmarks: n.nearbyLandmarksAr });
  }

  const allPairsAbove50: PageSimilarityPair[] = [];
  let globalPairsAbove50 = 0;
  let globalPairsAbove40 = 0;
  const serviceStats: ServiceSimilarityStats[] = [];

  for (const [serviceSlug, pages] of byService) {
    let pairsCompared = 0;
    let pairsAbove50 = 0;
    let pairsAbove40 = 0;
    let sumSim = 0;
    let maxSim = 0;
    const worstPairs: PageSimilarityPair[] = [];

    const comparePages =
      samplePerService > 0 && pages.length > samplePerService
        ? pages.filter((_, i) => i % Math.ceil(pages.length / samplePerService) === 0).slice(0, samplePerService)
        : pages;

    for (let i = 0; i < comparePages.length; i++) {
      for (let j = i + 1; j < comparePages.length; j++) {
        const sim = jaccardSimilarity(comparePages[i].text, comparePages[j].text);
        const strip = (t: string, landmarks: string) =>
          t.split(landmarks).join(" ").replace(/\s+/g, " ").trim();
        const templateSim = jaccardSimilarity(
          strip(comparePages[i].text, comparePages[i].landmarks),
          strip(comparePages[j].text, comparePages[j].landmarks),
        );
        pairsCompared++;
        sumSim += sim;
        if (sim > maxSim) maxSim = sim;

        if (sim > 0.4) {
          pairsAbove40++;
          globalPairsAbove40++;
        }
        if (sim > SIMILARITY_THRESHOLD) {
          pairsAbove50++;
          globalPairsAbove50++;
          const pair: PageSimilarityPair = {
            serviceSlug,
            urlA: comparePages[i].key,
            urlB: comparePages[j].key,
            similarity: Math.round(sim * 1000) / 1000,
            templateSimilarity: Math.round(templateSim * 1000) / 1000,
          };
          worstPairs.push(pair);
          allPairsAbove50.push(pair);
        }
      }
    }

    worstPairs.sort((a, b) => b.similarity - a.similarity);

    serviceStats.push({
      serviceSlug,
      pageCount: pages.length,
      pairsCompared,
      pairsAbove50,
      pairsAbove40,
      maxSimilarity: Math.round(maxSim * 1000) / 1000,
      avgSimilarity: pairsCompared ? Math.round((sumSim / pairsCompared) * 1000) / 1000 : 0,
      worstPairs: worstPairs.slice(0, 10),
    });
  }

  serviceStats.sort((a, b) => b.maxSimilarity - a.maxSimilarity);
  allPairsAbove50.sort((a, b) => b.similarity - a.similarity);

  return {
    totalPages: params.length,
    globalPairsAbove50,
    globalPairsAbove40,
    byService: serviceStats,
    allPairsAbove50,
  };
}

export function formatSimilarityReportMarkdown(report: SimilarityReport): string {
  const lines: string[] = [
    "# Service-Location Similarity Report",
    "",
    "**Metric:** word Jaccard on unique local blocks (intro, landmarks, problems, recommendations, narratives, FAQs)",
    "",
    `**Total pages:** ${report.totalPages}`,
    `**Pairs above 50% (full fingerprint):** ${report.globalPairsAbove50}`,
    `**Pairs above 40% (full fingerprint):** ${report.globalPairsAbove40}`,
    "",
    "_Template similarity (after stripping unique landmark sentences) is typically much lower — see per-pair column in worst offenders._",
    "",
    `**Target:** all pairs below ${TARGET_MAX * 100}%`,
    "",
    "## By Service (sorted by max similarity)",
    "",
    "| Service | Pages | Pairs | Max Sim | Avg Sim | >50% | >40% |",
    "|---------|-------|-------|---------|---------|------|------|",
  ];

  for (const s of report.byService) {
    lines.push(
      `| ${s.serviceSlug} | ${s.pageCount} | ${s.pairsCompared} | ${(s.maxSimilarity * 100).toFixed(1)}% | ${(s.avgSimilarity * 100).toFixed(1)}% | ${s.pairsAbove50} | ${s.pairsAbove40} |`,
    );
  }

  lines.push("", "## Worst Pairs Above 50%", "");
  if (report.allPairsAbove50.length === 0) {
    lines.push("_No pairs above 50% — target met._");
  } else {
    lines.push("| Similarity | Template | Service | URL A | URL B |");
    lines.push("|------------|----------|---------|-------|-------|");
    for (const p of report.allPairsAbove50.slice(0, 100)) {
      lines.push(
        `| ${(p.similarity * 100).toFixed(1)}% | ${(p.templateSimilarity * 100).toFixed(1)}% | ${p.serviceSlug} | ${p.urlA} | ${p.urlB} |`,
      );
    }
    if (report.allPairsAbove50.length > 100) {
      lines.push("", `_…and ${report.allPairsAbove50.length - 100} more pairs._`);
    }
  }

  lines.push("", "## Per-Service Top Offenders", "");
  for (const s of report.byService.filter((x) => x.worstPairs.length > 0).slice(0, 5)) {
    lines.push(`### ${s.serviceSlug}`, "");
    for (const p of s.worstPairs.slice(0, 5)) {
      lines.push(
        `- **${(p.similarity * 100).toFixed(1)}%** (template ${(p.templateSimilarity * 100).toFixed(1)}%) — \`${p.urlA}\` ↔ \`${p.urlB}\``,
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}
