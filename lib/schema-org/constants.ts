export const SCHEMA_ORG_CONTEXT = "https://schema.org" as const;

/**
 * Mock aggregate rating for JSON-LD — replace with real third-party or on-page review data when available.
 * Google requires ratings to reflect what users can see; keep values aligned with any visible testimonials.
 */
export const MOCK_LOCAL_BUSINESS_AGGREGATE_RATING = {
  "@type": "AggregateRating" as const,
  ratingValue: 4.9,
  reviewCount: 187,
  bestRating: 5,
  worstRating: 1,
};

export type FaqPair = { question: string; answer: string };

export function faqPairsToMainEntity(faqs: FaqPair[]) {
  return faqs.map((faq) => ({
    "@type": "Question" as const,
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: faq.answer,
    },
  }));
}
