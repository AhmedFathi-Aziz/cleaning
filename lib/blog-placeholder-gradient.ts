/**
 * تدرجات ثابتة بلون رسمي فاخر لمقالات بلا صورة غلاف — الاختيار يعتمد على الـ slug ليبقى لكل مقال لون ثابت.
 */
const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(148deg, #0a1e32 0%, #132a45 36%, #1a3a5c 100%)",
  "linear-gradient(142deg, #0c282c 0%, #143e44 40%, #1a5356 100%)",
  "linear-gradient(135deg, #16182e 0%, #232542 45%, #2f3358 100%)",
  "linear-gradient(145deg, #24150f 0%, #352018 42%, #452a1f 100%)",
  "linear-gradient(138deg, #18132a 0%, #241f3f 40%, #2e2c52 100%)",
  "linear-gradient(140deg, #0a2530 0%, #123a48 48%, #174d5e 100%)",
  "linear-gradient(135deg, #0f2238 0%, #183250 46%, #21456a 100%)",
  "linear-gradient(148deg, #141f2d 0%, #1e2d42 52%, #283a52 100%)",
] as const;

export function coverPlaceholderGradient(slug: string): string {
  let h = 216;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return PLACEHOLDER_GRADIENTS[h % PLACEHOLDER_GRADIENTS.length];
}
