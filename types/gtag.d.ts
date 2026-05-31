export {};

declare global {
  interface Window {
    /** Google Analytics / Tag Manager — يُعرَّف عند تحميل gtag.js */
    gtag?: (...args: unknown[]) => void;
  }
}
