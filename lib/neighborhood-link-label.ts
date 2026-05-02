/** نص رابط فريد لكل حي (مدينة + اسم الحي) — يحسّن الوضوح لمستخدمي قارئ الشاشة ومحركات البحث */
export function neighborhoodLinkAccessibleLabel(neighborhoodName: string, cityName: string): string {
  return `حي ${neighborhoodName} — ${cityName}`;
}
