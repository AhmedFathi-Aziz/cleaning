import Script from "next/script";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

/**
 * يحمّل gtag.js عند توفر معرّف GA4 — `afterInteractive` يوازن بين جاهزية `window.gtag` لأحداث الواجهة وأداء أول رسم.
 */
export function GoogleAnalytics() {
  if (!gaId?.startsWith("G-")) return null;

  const idJson = JSON.stringify(gaId);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${idJson}, { send_page_view: true });
`}
      </Script>
    </>
  );
}
