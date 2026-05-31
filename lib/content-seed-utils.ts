/** اختيار متغيّر ثابت لكل حي/خدمة — نفس المدخلات تعطي نفس النتيجة (مهم لـ SSG) */
export function variantIndex(seed: string, modulo: number): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % modulo;
}

export function pickVariant<T>(seed: string, key: string, options: T[]): T {
  return options[variantIndex(`${seed}:${key}`, options.length)];
}

export function cityClimateNote(citySlug: string): string {
  if (["jeddah", "dammam", "khobar", "jazan"].includes(citySlug)) {
    return "القرب من البحر يرفع الرطوبة على الشرفات والمداخل؛ يُفضّل جدولة أعمال خارجية أو تهوية بعد التنظيف الرطب.";
  }
  if (["abha", "taif", "najran"].includes(citySlug)) {
    return "الارتفاع والبرودة الليلية لا تلغي تراكم الغبار؛ الزيارات الدورية تبقى مفيدة خاصة بعد فترات إغلاق المنزل.";
  }
  if (["riyadh", "buraydah", "hail", "tabuk"].includes(citySlug)) {
    return "الغبار الناعم وحرارة الصيف في هذه المدينة تسرّع اتساخ المداخل والأسطح الخارجية — التخطيط المسبق يقلل إعادة العمل.";
  }
  return "نوع العمارة وكثافة الاستخدام يحددان الخطة أكثر من المناخ وحده.";
}

export function cityDustNote(citySlug: string, cityName: string): string {
  if (["riyadh", "buraydah", "makkah", "madinah", "hail", "tabuk"].includes(citySlug)) {
    return "بعد العواصف الغبارية في المنطقة يُلاحظ تراكم ناعم على الأرضيات والنوافذ؛ تنظيف متدرج من الأعلى للأسفل يمنع إعادة نشر الغبار.";
  }
  if (["jeddah", "dammam", "khobar", "jazan"].includes(citySlug)) {
    return "الملح والرطوبة على الشرفات والمداخل الخارجية في ${cityName} يحتاج مسحاً دورياً حتى لا تتراكم بقعاً صلبة.".replace(
      "${cityName}",
      cityName,
    );
  }
  return `المناخ المحلي في ${cityName} يؤثر على سرعة اتساخ المداخل؛ نناقش معك أولويات الغرف قبل الزيارة.`;
}
