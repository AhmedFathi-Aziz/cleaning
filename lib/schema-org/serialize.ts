/**
 * Safe JSON-LD serialization for <script type="application/ld+json">.
 * Mitigates `</script>` injection and breaks U+2028/U+2029 that can truncate JSON in HTML parsers.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
