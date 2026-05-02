/**
 * OpenNext يكتب `.open-next/cloudflare/next-env.mjs` بـ append؛ أحياناً (مثلاً بعد EBUSY
 * على Windows أو عمليات متزامنة) يتكرر نفس الـ exports فيفشل bundling لـ Wrangler.
 * يبقي أول تعريف لكل `export const name` ويحذف الباقي.
 */
import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), ".open-next/cloudflare/next-env.mjs");
if (!fs.existsSync(file)) {
  console.log("[dedupe-open-next-env] لا يوجد next-env.mjs — تخطي.");
  process.exit(0);
}

const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
const kept = [];
const seenExports = new Set();

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) continue;
  const m = /^export const (\w+)/.exec(trimmed);
  if (m) {
    if (seenExports.has(m[1])) continue;
    seenExports.add(m[1]);
  }
  kept.push(line);
}

fs.writeFileSync(file, `${kept.join("\n").replace(/\s+$/, "")}\n`);
console.log("[dedupe-open-next-env] تم ضبط next-env.mjs.");
