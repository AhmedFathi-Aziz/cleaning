/** يظهر أثناء تحميل صفحات المجموعة (/) و /services و /about — الهيدر والفوتر يبقيان من التخطيط */
export default function MarketingLoading() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-6 bg-background px-8 py-24"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-14 w-14 animate-spin rounded-full border-4 border-primary border-t-transparent"
        aria-hidden="true"
      />
      <p className="text-center text-base font-semibold text-on-surface-variant">جاري التحميل…</p>
    </div>
  );
}
