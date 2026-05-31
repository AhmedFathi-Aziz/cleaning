/**
 * يرسل حدث GA4 عبر `window.gtag` إن وُجد، دون إيقاف التطبيق إن لم يكن التتبع محمّلاً بعد.
 */
export function sendGtagEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const g = window.gtag;
  if (typeof g !== "function") return;
  g("event", eventName, params ?? {});
}
