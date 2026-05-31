/** هيكل تحميل خفيف لحاسبة التقدير — يُعرض قبل lazy-load لتقليل قفزات التخطيط */
export function PriceEstimatorSkeleton() {
  return (
    <div
      className="mx-auto max-w-3xl animate-pulse rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_24px_60px_-20px_rgba(0,35,111,0.12)] dark:border-slate-700 dark:bg-slate-950/80"
      aria-hidden
    >
      <div className="h-1 bg-gradient-to-l from-amber-700 via-amber-400 to-amber-700" />
      <div className="space-y-4 bg-gradient-to-bl from-slate-200/90 to-slate-100/80 px-6 py-10 dark:from-slate-800 dark:to-slate-900 md:px-12 md:py-12">
        <div className="h-4 w-32 rounded bg-white/50 dark:bg-slate-700" />
        <div className="h-8 max-w-md rounded-lg bg-white/60 dark:bg-slate-600" />
        <div className="h-16 max-w-xl rounded-lg bg-white/40 dark:bg-slate-700/80" />
      </div>
      <div className="space-y-6 px-6 py-10 md:px-12 md:py-12">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800" />
        </div>
        <div className="h-24 rounded-2xl bg-slate-100 dark:bg-slate-800" />
        <div className="h-24 rounded-2xl bg-slate-100 dark:bg-slate-800" />
        <div className="h-14 rounded-2xl bg-slate-200/80 dark:bg-slate-700" />
      </div>
    </div>
  );
}
