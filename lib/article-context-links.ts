import type { InternalPromoLink } from "@/lib/related-service-links";

/** روابط داخلية مخصّصة لصفحات الخدمات (تُدمج مع قسم «خدمات ذات صلة») */
export function getServiceArticleContextLinks(slug: string): InternalPromoLink[] {
  const cleaningHub: InternalPromoLink = {
    href: "/cleaning/riyadh",
    title: "تنظيف منازل حسب أحياء الرياض",
    description: "صفحات أحياء مع سياق محلي — مفيدة بعد اختيار نوع الخدمة وقبل تحديد الموعد.",
  };

  switch (slug) {
    case "apartment-cleaning-riyadh":
      return [
        {
          href: "/services/house-cleaning",
          title: "تنظيف منازل في الرياض",
          description: "مناسب للدور الأرضي أو الفلل الصغيرة — مقارنة مع خطة الشقق في الأبراج.",
        },
        {
          href: "/services/villa-cleaning-riyadh",
          title: "تنظيف فلل بالرياض",
          description: "مساحات أوسع، مداخل متعددة، وحدائق — عند الانتقال من شقة إلى فلة.",
        },
        {
          href: "/services/deep-home-cleaning",
          title: "تنظيف عميق للمنزل",
          description: "مطبخ وحمامات بمعايير أثقل — قبل استقبال أو بعد تشطيب الشقة.",
        },
        {
          href: "/services/cleaning-company-riyadh",
          title: "شركة تنظيف بالرياض",
          description: "نظرة شاملة على خدمات التنظيف والتنسيق في العاصمة.",
        },
        cleaningHub,
      ];
    case "villa-cleaning-riyadh":
      return [
        {
          href: "/services/apartment-cleaning-riyadh",
          title: "تنظيف شقق بالرياض",
          description: "أبراج ومجمعات — تنسيق مع الحارس وخطط دورية للوحدات السكنية.",
        },
        {
          href: "/services/house-cleaning",
          title: "تنظيف منازل دوري",
          description: "صيانة أسبوعية أو شهرية للمنازل المستقلة والدور الأرضي.",
        },
        {
          href: "/services/facade-cleaning",
          title: "غسيل واجهات وكلادينج",
          description: "يكمل تنظيف الفلل بعد مواسم الغبار في الرياض.",
        },
        {
          href: "/services/deep-home-cleaning",
          title: "تنظيف عميق شامل",
          description: "مطبخ، حمامات، وغرف قبل المناسبات أو بعد الإجازات الطويلة.",
        },
        cleaningHub,
      ];
    case "house-cleaning":
      return [
        {
          href: "/services/apartment-cleaning-riyadh",
          title: "تنظيف شقق وأبراج سكنية",
          description: "خطط للمجمعات السكنية مع تنسيق دخول العمارة والمصعد.",
        },
        {
          href: "/services/villa-cleaning-riyadh",
          title: "تنظيف فلل سكنية",
          description: "فريق ومعدات لمساحات أكبر ومداخل متعددة.",
        },
        {
          href: "/services/cleaning-company-riyadh",
          title: "شركة تنظيف بالرياض",
          description: "كل خدمات التنظيف والتنسيق في صفحة واحدة.",
        },
        cleaningHub,
      ];
    case "carpet-cleaning-riyadh":
      return [
        {
          href: "/services/sofa-cleaning-riyadh",
          title: "تنظيف كنب بالرياض",
          description: "كنب الصالة — يُدمج مع السجاد في زيارة واحدة عند التهوية.",
        },
        {
          href: "/services/majlis-cleaning-riyadh",
          title: "تنظيف مجالس بالرياض",
          description: "بساط المجلس تحت الوسائد — غسيل منفصل أو ضمن الباقة.",
        },
        {
          href: "/services/house-cleaning",
          title: "تنظيف منازل دوري",
          description: "صيانة الغرف بين جلسات غسيل السجاد.",
        },
        {
          href: "/services/deep-home-cleaning",
          title: "تنظيف عميق للمنزل",
          description: "مطبخ وحمامات بمعايير أثقل — يكمّل غسيل السجاد.",
        },
        cleaningHub,
      ];
    case "sofa-cleaning-riyadh":
      return [
        {
          href: "/services/majlis-cleaning-riyadh",
          title: "تنظيف مجالس بالرياض",
          description: "وسائد أرضية وجدارية ودرج مبطّن — يُدمج مع الكنب عند الطلب.",
        },
        {
          href: "/services/carpet-cleaning",
          title: "غسيل سجاد وموكيت",
          description: "سجاد الصالة تحت الكنب — شفط وتنظيف أعمق.",
        },
        {
          href: "/services/house-cleaning",
          title: "تنظيف منازل دوري",
          description: "صيانة الصالة والمطبخ بين جلسات غسيل الكنب.",
        },
        {
          href: "/services/apartment-cleaning-riyadh",
          title: "تنظيف شقق بالرياض",
          description: "تنظيف شامل للشقة مع جدولة الكنب في نفس اليوم عند السعة.",
        },
        cleaningHub,
      ];
    case "majlis-cleaning-riyadh":
      return [
        {
          href: "/services/sofa-cleaning",
          title: "تنظيف كنب ومفروشات",
          description: "كنب الصالة والشازلونج — يُدمج مع المجلس في زيارة واحدة عند السعة.",
        },
        {
          href: "/services/carpet-cleaning",
          title: "غسيل سجاد وموكيت",
          description: "السجاد المركزي في المجلس — شفط وتنظيف أعمق من المسح المنزلي.",
        },
        {
          href: "/services/villa-cleaning-riyadh",
          title: "تنظيف فلل بالرياض",
          description: "مجالس واسعة ومداخل مزدوجة — فريق ووقت مناسبان للمساحة.",
        },
        {
          href: "/services/house-cleaning",
          title: "تنظيف منازل دوري",
          description: "صيانة الصالة والمطبخ بين جلسات غسيل المجلس.",
        },
        cleaningHub,
      ];
    case "post-construction-cleaning-riyadh":
      return [
        {
          href: "/services/deep-home-cleaning",
          title: "تنظيف عميق للمنزل",
          description: "للتراكمات بعد السكن — يكمّل تنظيف ما بعد التشطيب الأولي.",
        },
        {
          href: "/services/apartment-cleaning-riyadh",
          title: "تنظيف شقق بالرياض",
          description: "صيانة دورية بعد الانتقال لشقة جديدة في برج أو مجمع.",
        },
        {
          href: "/services/villa-cleaning-riyadh",
          title: "تنظيف فلل بالرياض",
          description: "فلل متعددة الطوابق — جدولة بعد التسليم من المقاول.",
        },
        {
          href: "/services/facade-cleaning",
          title: "غسيل واجهات زجاج",
          description: "واجهات خارجية علوية بعد أعمال البناء والتشطيب.",
        },
        cleaningHub,
      ];
    case "cleaning-company-riyadh":
      return [
        {
          href: "/services/post-construction-cleaning-riyadh",
          title: "تنظيف بعد التشطيب بالرياض",
          description: "إزالة غبار الجص والدهان قبل السكن أو الافتتاح.",
        },
        {
          href: "/services/apartment-cleaning-riyadh",
          title: "تنظيف شقق بالرياض",
          description: "تفاصيل زيارات الأبراج والمجمعات والتسعير حسب الغرف.",
        },
        {
          href: "/services/villa-cleaning-riyadh",
          title: "تنظيف فلل بالرياض",
          description: "فلل واستراحات — واجهات وحدائق عند الطلب.",
        },
        {
          href: "/services/house-cleaning",
          title: "تنظيف منازل",
          description: "زيارات دورية أو شاملة للمنازل المستقلة.",
        },
        {
          href: "/services/pest-control",
          title: "مكافحة حشرات مرخّصة",
          description: "برامج وقائية وعلاجية تُنسَّق مع جدول التنظيف.",
        },
        cleaningHub,
      ];
    default:
      return [];
  }
}

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
