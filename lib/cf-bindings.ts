/** الوصول إلى ربطات Cloudflare (R2 وغيرها) عند التشغيل على Worker أو مع opennext dev */
export async function getBindings(): Promise<CloudflareEnv | null> {
  // أثناء `next build` استدعاء getCloudflareContext({ async: true }) قد يحاول Wrangler ويُبطئ التوليد الثابت جداً أو يتجاوز المهلات.
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return null;
  }
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    return ctx.env;
  } catch {
    return null;
  }
}
