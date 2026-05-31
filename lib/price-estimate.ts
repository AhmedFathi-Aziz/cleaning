/** تقدير داخلي فقط — لا يُعرض للمستخدم؛ يُذكر في رسالة واتساب كمرجع للفريق إن رغبت لاحقاً */
export type EstimateServiceType = "cleaning" | "pest" | "tank";

const BASE: Record<EstimateServiceType, number> = {
  cleaning: 180,
  pest: 340,
  tank: 260,
};

const PER_ROOM: Record<EstimateServiceType, number> = {
  cleaning: 22,
  pest: 42,
  tank: 18,
};

const PER_AREA_BLOCK: Record<EstimateServiceType, number> = {
  cleaning: 18,
  pest: 32,
  tank: 24,
};

/** مساحة بالمتر المربع — كل 50 م² تضيف كتلة سعر */
export function computeEstimateSar(rooms: number, areaSqm: number, type: EstimateServiceType): number {
  const r = Math.min(Math.max(rooms, 1), 20);
  const a = Math.min(Math.max(areaSqm, 40), 800);
  const blocks = Math.max(0, Math.floor(a / 50));
  return Math.round(BASE[type] + r * PER_ROOM[type] + blocks * PER_AREA_BLOCK[type]);
}

export const serviceTypeLabelsAr: Record<EstimateServiceType, string> = {
  cleaning: "تنظيف عام (منزل / شقة)",
  pest: "مكافحة حشرات / رش",
  tank: "تنظيف وتعقيم خزانات المياه",
};
