/**
 * يزيل مجلد `.open-next` قبل بناء OpenNext.
 * على Windows قد يحدث EBUSY؛ نستخدم maxRetries/retryDelay وحلقة انتظار قصيرة.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

const dir = path.join(process.cwd(), ".open-next");

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  if (!existsSync(dir)) {
    console.log("[clean-open-next] لا يوجد .open-next — لا حاجة للحذف.");
    return;
  }

  const attempts = 8;
  let lastErr;

  for (let i = 0; i < attempts; i++) {
    try {
      await fs.rm(dir, {
        recursive: true,
        force: true,
        maxRetries: 25,
        retryDelay: 200,
      });
      console.log("[clean-open-next] تم حذف .open-next بنجاح.");
      return;
    } catch (err) {
      lastErr = err;
      const code = /** @type {NodeJS.ErrnoException} */ (err).code;
      console.warn(`[clean-open-next] المحاولة ${i + 1}/${attempts} فشلت (${code ?? err}). انتظر قليلاً…`);
      await sleep(400 * (i + 1));
    }
  }

  console.error("[clean-open-next] لم يُحذف المجلد. أغلِق Cursor مؤقتاً أو استثنِ `.open-next` من الفهرسة/الأنتيفيروس ثم أعد المحاولة.");
  console.error(lastErr);
  process.exit(1);
}

await main();
