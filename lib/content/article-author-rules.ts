/**
 * تعيين المؤلف من فريق العمل حسب موضوع المقال (يُستخدم في سكربتات المزامنة).
 */
export const articleAuthorTeamIds = {
  ahmedFathy: "ahmed-fathy",
  mohammedAhmad: "mohammed-ahmad",
  khalidOtaibi: "khalid-otaibi",
  nouraSaud: "noura-saud",
  fahedShamri: "fahed-shamri",
  abdullahQhtani: "abdullah-qhtani",
  saraHarbi: "sara-harbi",
} as const;

export const defaultArticleAuthorTeamId = articleAuthorTeamIds.ahmedFathy;

const pestPattern = /حشر|pest|صراص|بق|نمل|رش|آفات|مبيد/i;
const fabricPattern = /سجاد|كنب|مجلس|carpet|sofa|majlis|موكيت|ستائر|مفروش/i;
const tanksFacadesPattern = /خزان|واجه|tank|facade|pool|مياه|مكيف|مسابح/i;
const homeCleaningPattern = /فيلا|شقة|منزل|house|villa|apartment|تنظيف|cleaning|نقل|أثاث|مطبخ|مواد/i;

export function inferArticleAuthorId(
  slug: string,
  extras: { keywords?: string[]; title?: string; excerpt?: string } = {},
): string {
  const haystack = [slug, extras.title, extras.excerpt, ...(extras.keywords ?? [])]
    .filter(Boolean)
    .join(" ");

  if (pestPattern.test(haystack)) return articleAuthorTeamIds.fahedShamri;
  if (fabricPattern.test(haystack)) return articleAuthorTeamIds.nouraSaud;
  if (tanksFacadesPattern.test(haystack)) return articleAuthorTeamIds.abdullahQhtani;
  if (homeCleaningPattern.test(haystack)) return articleAuthorTeamIds.khalidOtaibi;

  return articleAuthorTeamIds.mohammedAhmad;
}

export function inferNewsAuthorId(
  slug: string,
  extras: { keywords?: string[]; title?: string; excerpt?: string } = {},
): string {
  const haystack = [slug, extras.title, extras.excerpt, ...(extras.keywords ?? [])]
    .filter(Boolean)
    .join(" ");

  if (pestPattern.test(haystack)) return articleAuthorTeamIds.fahedShamri;
  if (tanksFacadesPattern.test(haystack)) return articleAuthorTeamIds.abdullahQhtani;
  if (/نظافة|تنظيف|صحة|hygiene|clean/i.test(haystack)) return articleAuthorTeamIds.mohammedAhmad;
  if (/سياحة|ضيافة|مدرسة|tourism|school/i.test(haystack)) return articleAuthorTeamIds.saraHarbi;

  return articleAuthorTeamIds.ahmedFathy;
}
