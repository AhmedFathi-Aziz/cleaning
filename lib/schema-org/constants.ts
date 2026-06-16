export const SCHEMA_ORG_CONTEXT = "https://schema.org" as const;

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
