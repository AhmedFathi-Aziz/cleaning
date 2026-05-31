import type { InternalPromoLink } from "@/lib/related-service-links";

/** روابط داخلية مخصّصة لسياق المقال (تُدمج مع روابط التسويق العامة) */
export function getBlogArticleContextLinks(slug: string): InternalPromoLink[] {
  switch (slug) {
    case "deep-cleaning-before-moving":
      return [
        {
          href: "/services/deep-home-cleaning",
          title: "تنظيف عميق للمنزل قبل الانتقال",
          description: "فريق متخصص لغرف المطبخ والحمامات والأسطح — مناسب قبل استلام مفتاح منزل جديد.",
        },
        {
          href: "/services/house-cleaning",
          title: "تنظيف منازل دوري في الرياض",
          description: "صيانة أسبوعية أو شهرية بعد الانتقال للحفاظ على النظافة دون تراكم أتربة.",
        },
        {
          href: "/cleaning/riyadh",
          title: "تنظيف منازل في أحياء الرياض",
          description: "صفحات أحياء الرياض مع تغطية تنظيف ومكافحة حشرات حسب الحي.",
        },
      ];
    case "carpet-cleaning-mistakes":
      return [
        {
          href: "/services/carpet-cleaning",
          title: "غسيل سجاد وموكيت احترافي",
          description: "إزالة بقع وروائح بمعدات مناسبة للأنسجة — بدون الإضرار بالألوان.",
        },
        {
          href: "/services/sofa-cleaning",
          title: "تنظيف كنب ومفروشات",
          description: "غالباً يُحجز مع السجاد في نفس الزيارة لتوفير الوقت.",
        },
        {
          href: "/contact",
          title: "عروض غسيل سجاد وتنظيف",
          description: "أسعارنا تنافسية — تواصل لمعرفة العرض المناسب لغسيل السجاد أو التنظيف العميق.",
        },
      ];
    default:
      return [];
  }
}

export function getNationalNewsContextLinks(slug: string): InternalPromoLink[] {
  const pest: InternalPromoLink = {
    href: "/services/pest-control",
    title: "مكافحة حشرات مرخّصة في الرياض",
    description: "برامج وقائية وعلاجية للمنازل والمطابخ — مع تعليمات سلامة بعد الرش.",
  };
  const guides: InternalPromoLink = {
    href: "/guides/pest",
    title: "موسوعة مكافحة الحشرات",
    description: "أدلة الصراصير، البعوض، النمل، والسلامة بعد الرش قبل الحجز.",
  };

  switch (slug) {
    case "environmental-awareness-pest-control-saudi-arabia":
    case "moh-vector-disease-prevention":
    case "mewa-safe-pesticide-use":
      return [pest, guides, {
        href: "/guides/pest/mosquitoes",
        title: "دليل مكافحة البعوض في الرياض",
        description: "إزالة المياه الراكدة وخيارات الرش للفناء والحدائق.",
      }];
    case "riyadh-municipality-food-hygiene":
      return [
        pest,
        {
          href: "/services/deep-home-cleaning",
          title: "تنظيف عميق للمطابخ المنزلية",
          description: "دهون الشفاط والأسطح — يكمّل معايير النظافة الغذائية في المنزل.",
        },
      ];
    case "sfda-pest-control-food-supply":
      return [pest, {
        href: "/services/house-cleaning",
        title: "تنظيف منازل ومطابخ",
        description: "جدولة دورية مع توثيق زيارات التنظيف والمكافحة للمنشآت الصغيرة.",
      }];
    case "quality-of-life-housing-cleanliness":
      return [
        {
          href: "/services/facade-cleaning",
          title: "غسيل واجهات زجاج وكلادينج",
          description: "مناسب للعمارات والفلل بعد مواسم الغبار في الرياض.",
        },
        pest,
      ];
    case "school-health-hygiene-awareness":
      return [
        pest,
        {
          href: "/services/deep-home-cleaning",
          title: "تنظيف عميق قبل العودة من السفر",
          description: "مطبخ وحمامات وغرف — روتين مفيد بعد إجازات المدارس.",
        },
        guides,
      ];
    default:
      return [pest, guides];
  }
}
