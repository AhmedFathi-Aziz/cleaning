/**
 * محتوى مرجعي فريد لكل حي (مسافة زمنية تقريبية + معالم/سياق محلي)
 * لتقليل تشابه الصفحات البرمجية وتحسين الإشارات لجودة المحتوى.
 * الأرقام تقديرية للتخطيط وليست تعهدات زمنية صارمة.
 */
export type NeighborhoodLocalDetail = {
  approxDriveMinutesFromTeamStaging: number;
  nearbyLandmarksAr: string;
};

export const neighborhoodLocalDetails: Record<string, NeighborhoodLocalDetail> = {
  // الرياض
  "riyadh/olaya": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "الحي يجاور محور طريق الملك فهد مع كثافة أبراج إدارية ومراكز أعمال، ما يعني طلباً متكرراً على تنظيف مكاتب وواجهات زجاجية واستقبالات فاخرة.",
  },
  "riyadh/al-malaz": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "منطقة حضرية قديمة نسبياً بشوارع أضيق وتنوّع بين عمائر سكنية ومحال تجارية صغيرة، مناسبة لخطط تنظيف دورية للمداخل والسلالم المشتركة.",
  },
  "riyadh/al-narjis": {
    approxDriveMinutesFromTeamStaging: 22,
    nearbyLandmarksAr:
      "أحياء شمالية بإطلالة على امتدادات سكنية حديثة ومجمعات خدمات، غالباً ما يُطلب فيها تنظيف عميق بعد الانتقال وتهيئة الفلل قبل الإشغال.",
  },
  "riyadh/al-yasmin": {
    approxDriveMinutesFromTeamStaging: 24,
    nearbyLandmarksAr:
      "شبكة طرق تربط الحي بمجمعات تجارية شمال الرياض؛ يكثر طلب غسل المفروشات والمجالس بعد المناسبات العائلية في المنازل الممتدة.",
  },
  "riyadh/al-sahafah": {
    approxDriveMinutesFromTeamStaging: 20,
    nearbyLandmarksAr:
      "منطقة تجمع بين أبراج سكنية وأجنحة خدمات؛ الوصول للعديد من العمائر يمر عبر دوارات كثيفة، فيُفضَّل تنسيق المواعيد خارج أوقات الذروة القصوى.",
  },
  "riyadh/hittin": {
    approxDriveMinutesFromTeamStaging: 21,
    nearbyLandmarksAr:
      "حي مخدّم بمساحات خضراء ومجمعات حديثة؛ عمليات تنظيف الواجهات والحدائق الخلفية للفلل شائعة مع مواسم الغبار.",
  },
  "riyadh/al-malqa": {
    approxDriveMinutesFromTeamStaging: 26,
    nearbyLandmarksAr:
      "يميل الحي لقطع أوسع وفلل متعددة الطوابق؛ يبرز طلب تنظيف السجاد الكبير والدرج الداخلي بعد الفعاليات والزيارات الطويلة.",
  },
  "riyadh/al-rawdah": {
    approxDriveMinutesFromTeamStaging: 18,
    nearbyLandmarksAr:
      "خليط من عمائر قديمة ومجددة مع مقاهٍ ومطاعم على الشوارع الرئيسية؛ تنظيف دهون المطابخ المدمجة ولمعات الأسطح يتكرر في الشقق الصغيرة.",
  },
  // جدة
  "jeddah/al-rawdah": {
    approxDriveMinutesFromTeamStaging: 17,
    nearbyLandmarksAr:
      "قرب كورنيش جدة والحركة السياحية يزيد الطلب على تنظيف شقق مطلة وبُيوت ضيافة؛ الرطوبة المالحة تؤثر على الواجهات والنوافذ.",
  },
  "jeddah/al-salamah": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "منطقة خدمات وسكن متوسط الكثافة؛ أسواق محلية ومدارس قريبة تجعل أوقات الذروة الصباحية والمسائية مهمة عند جدولة الزيارات.",
  },
  "jeddah/al-hamra": {
    approxDriveMinutesFromTeamStaging: 13,
    nearbyLandmarksAr:
      "حي تجاري حيوي مع أبراج ومكاتب؛ تنظيف الواجهات الزجاجية والاستقبالات بعد أوقات الدوام الرسمي شائع في الطلبات الدورية.",
  },
  "jeddah/al-shati": {
    approxDriveMinutesFromTeamStaging: 12,
    nearbyLandmarksAr:
      "القرب من البحر يعني أتربة رملية وأملاح على الشرفات؛ يُنصح بجدولة تنظيف خارجي للنوافذ والبلكونات بعد الرياح القوية.",
  },
  "jeddah/al-safa": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "شوارع متعرجة بين فلل وشقق؛ مداخل ضيقة أحياناً تستدعي تجهيزاً خفيفاً للمعدات عند تنظيف السجاد والكنب داخل المنزل.",
  },
  "jeddah/al-nahdah": {
    approxDriveMinutesFromTeamStaging: 19,
    nearbyLandmarksAr:
      "منطقة في تحول عمراني؛ كثير من الوحدات الجديدة تحتاج تنظيفاً بعد التشطيب أو إزالة غبار البناء من الأسطح والخزائن.",
  },
  "jeddah/al-zahra": {
    approxDriveMinutesFromTeamStaging: 20,
    nearbyLandmarksAr:
      "قطاعات سكنية متوسطة مع مراكز صحية قريبة؛ يبرز طلب التعقيم المحدود وتنظيف الأرضيات بعد زيارات العائلة.",
  },
  "jeddah/al-nuzhah": {
    approxDriveMinutesFromTeamStaging: 18,
    nearbyLandmarksAr:
      "تنوّع بين عمائر قديمة ومجددة؛ السلالم المشتركة والمواقف تحت الأرض تحتاج ضغطاً وممسحة دورية لمنع تراكم الرطوبة والروائح.",
  },
  // الدمام
  "dammam/al-shati": {
    approxDriveMinutesFromTeamStaging: 11,
    nearbyLandmarksAr:
      "الكورنيش والممشى يجذبان نشاطاً مسائياً؛ الشقق المطلة تحتاج تنظيفاً أكثر تكراراً للنوافذ بسبب الرذاذ البحري والغبار العالق.",
  },
  "dammam/al-mazruiyah": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "حي سكني متوسط مع مدارس ومستوصفات؛ عمليات التنظيف العائلي تتركز غالباً في المطابخ والمجالس قبل المناسبات المحلية.",
  },
  "dammam/al-faisaliyah": {
    approxDriveMinutesFromTeamStaging: 13,
    nearbyLandmarksAr:
      "قرب محاور الشرقية الرئيسية؛ سهولة الوصول للفرق لكن ازدحام الطرق وقت الظهيرة قد يؤخر الوصول بضع دقائق.",
  },
  "dammam/al-nada": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "شبكة شوارع متعددة المداخل؛ تحديد بوابة العمارة بدقة يقلّل وقت التسليم عند حمل معدات غسيل السجاد.",
  },
  "dammam/al-rayan": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "مساحات سكنية أنسب للفلل الصغيرة؛ يكثر طلب تنظيف الحوش الخارجي والممرات المبلطة بعد الأمطار المتقطعة.",
  },
  "dammam/taybah": {
    approxDriveMinutesFromTeamStaging: 17,
    nearbyLandmarksAr:
      "أحياء هادئة نسبياً؛ تنظيف عميق بعد الإيجار الجديد من أكثر الطلبات شيوعاً مع التركيز على خزائن المطبخ والحمامات.",
  },
  "dammam/al-dabab": {
    approxDriveMinutesFromTeamStaging: 18,
    nearbyLandmarksAr:
      "تنوّع في أعمار البناء؛ بعض الوحدات تحتاج معالجة ترسبات مياه على الأسطح الخارجية قبل غسل الواجهة بالكامل.",
  },
  "dammam/badr": {
    approxDriveMinutesFromTeamStaging: 19,
    nearbyLandmarksAr:
      "مناطق فاصلة بين كتل سكنية؛ تنسيق المواعيد مع حراس الأمن في المجمعات يُسرّع الدخول للفرق.",
  },
  // الخبر
  "khobar/al-aqrabiyah": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "حي يضم شوارع تجارية مزدحمة نهاراً؛ تنظيف المحلات الصغيرة والمكاتب المدمجة مع الشقق العلوية يتطلب تنسيقاً لوقت الإغلاق.",
  },
  "khobar/al-rakah": {
    approxDriveMinutesFromTeamStaging: 13,
    nearbyLandmarksAr:
      "قرب الواجهة البحرية مع مخارج متعددة؛ الممرات المشتركة بين العمائر تحتاج تنظيفاً دورياً للأتربة القادمة مع نسيم البحر.",
  },
  "khobar/al-thuqbah": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "خليط سكني وتعليمي؛ بعد أيام الاختبارات يزيد طلب تنظيف شامل للغرف والمكتبات في المنازل ذات الطلاب.",
  },
  "khobar/golden-belt": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "مسارات حديثة نسبياً مع تقاطعات سريعة؛ سهولة إيقاف معدات التحميل قرب المداخل الخلفية يختصر زمن البداية.",
  },
  "khobar/north-khobar": {
    approxDriveMinutesFromTeamStaging: 17,
    nearbyLandmarksAr:
      "امتدادات سكنية أوسع؛ الفلل المتعددة الطوابق تحتاج غالباً لفرق تعمل على دورين متزامنين عند التنظيف العميق.",
  },
  "khobar/south-khobar": {
    approxDriveMinutesFromTeamStaging: 18,
    nearbyLandmarksAr:
      "مناطق أقدم بنياناً في بعض القطاعات؛ تجديد السيراميك والدهانات يترافق غالباً بطلب إزالة غبار البناء الدقيق.",
  },
  // مكة المكرمة
  "makkah/al-aziziyah": {
    approxDriveMinutesFromTeamStaging: 19,
    nearbyLandmarksAr:
      "منطقة مرتفعة نسبياً بمناخ حار؛ التكييف المركزي والمجاري العلوية تحتاج تنظيفاً دورياً لتقليل تراكم الغبار والروائح.",
  },
  "makkah/al-shawqiyah": {
    approxDriveMinutesFromTeamStaging: 20,
    nearbyLandmarksAr:
      "شقق مضغوطة مع مداخل مشتركة؛ تنسيق مواعيد الطوابق العليا يقلّل انتظار المصعد عند نقل معدات غسيل السجاد.",
  },
  "makkah/al-sharai": {
    approxDriveMinutesFromTeamStaging: 22,
    nearbyLandmarksAr:
      "امتداد سكني على مسافات؛ بعض الشوارع الفرعية ضيقة فيُفضّل تحديد نقطة لقاء قريبة من موقف السيارة.",
  },
  "makkah/al-awali": {
    approxDriveMinutesFromTeamStaging: 21,
    nearbyLandmarksAr:
      "قطاع يمزج بين وحدات قديمة وحديثة؛ تنظيف السلالم الخارجية بعد الأمطار المتفرقة يمنع انزلاقاً على الدرج الحجري.",
  },
  "makkah/batha-quraysh": {
    approxDriveMinutesFromTeamStaging: 18,
    nearbyLandmarksAr:
      "كثافة تجارية محيطة؛ الشقق القريبة من المحاور الرئيسية تحتاج إغلاقاً جيداً للنوافذ أثناء مواسم الغبار.",
  },
  "makkah/al-nawwariyah": {
    approxDriveMinutesFromTeamStaging: 17,
    nearbyLandmarksAr:
      "شوارع متدرجة؛ المنازل المتعددة المستويات تحتاج ترتيباً لتسلسل الغرف حتى لا يُعاد اتساخ الممر بعد التنظيف.",
  },
  // المدينة المنورة
  "madinah/al-aziziyah": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "حي خدمات متنوعة؛ الطلبات تشمل غالباً تنظيف بعد الزيارات الطويلة للمعالم الدينية القريبة مع عودة الحشود الموسمية.",
  },
  "madinah/quba": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "جوار منطقة تاريخية وزوار؛ بعض الوحدات المؤجرة قصيرة الأجل تحتاج تنظيفاً سريعاً بين كل ضيف وآخر.",
  },
  "madinah/al-hijrah": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "امتدادات سكنية هادئة؛ الحدائق الصغيرة أمام الفلل تجمع أوراقاً جافة تحتاج كنساً قبل غسل البلاط.",
  },
  "madinah/shuran": {
    approxDriveMinutesFromTeamStaging: 17,
    nearbyLandmarksAr:
      "شوارع فرعية متعددة؛ تحديد رقم الشقة والبوابة يقلّل الاتصالات أثناء الوصول خصوصاً في الليل.",
  },
  "madinah/al-daithah": {
    approxDriveMinutesFromTeamStaging: 18,
    nearbyLandmarksAr:
      "منطقة فيها عمائر متوسطة الارتفاع؛ تنظيف الواجهات الأمامية بالضغط المعتدل يناسب طلاء الجدران الرملي الشائع.",
  },
  "madinah/al-faisaliyah": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "حي متوسط الكثافة مع مدارس؛ أوقات ما بعد الظهر مناسبة لتنظيف المجالس قبل ضيوف المساء.",
  },
  // الطائف
  "taif/shihar": {
    approxDriveMinutesFromTeamStaging: 13,
    nearbyLandmarksAr:
      "مناخ أبرد من السهل؛ الرطوبة المعتدلة مع الأمطار المتقطعة تعني عناية إضافية بمداخل المنزل والمدافئ الخارجية بعد الشتاء.",
  },
  "taif/al-wisam": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "تخطيط حديث نسبياً؛ الشقق الواسعة تحتاج وقت إضافياً عند التنظيف العميق للزوايا العالية والإضاءة المعلقة.",
  },
  "taif/al-hawiyah": {
    approxDriveMinutesFromTeamStaging: 19,
    nearbyLandmarksAr:
      "امتداد أوسع عن وسط الطائف؛ جدولة الزيارة مع احتساب العودة على طريق منعرج يُحسّن دقة وقت الوصول المتوقع.",
  },
  "taif/al-faisaliyah": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "قطاع سكني مخدّم؛ تنظيف أسطح البلاكونات بعد العواصف الرملية الخفيفة شائع قبل استقبال الضيوف.",
  },
  "taif/al-salamah": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "قرب مراكز خدمات؛ المكاتب الصغيرة المدمجة مع الشقق تحتاج تنظيفاً صباحياً قبل دوام الزائرين.",
  },
  "taif/jabrah": {
    approxDriveMinutesFromTeamStaging: 17,
    nearbyLandmarksAr:
      "شوارع متعرجة بين المنازل؛ بعض المداخل الخلفية تناسب إدخال خراطيم الماء لغسل الفناء الداخلي.",
  },
  // أبها
  "abha/al-mansak": {
    approxDriveMinutesFromTeamStaging: 11,
    nearbyLandmarksAr:
      "تضاريس أعلى مع هواء أنظف غالباً؛ الغبار الناعم يتراكم على الشرفات، فيُستحسن مسح الإطارات الزجاجية دورياً.",
  },
  "abha/al-murooj": {
    approxDriveMinutesFromTeamStaging: 12,
    nearbyLandmarksAr:
      "حي مخدّم بمساحات مفتوحة؛ تنظيف الفلل بعد المناسبات الخارجية يشمل غالباً الأرضيات الحجرية حول المجلس.",
  },
  "abha/al-khalidiyah": {
    approxDriveMinutesFromTeamStaging: 10,
    nearbyLandmarksAr:
      "قرب مراكز مدينة أبها؛ سهولة الوصول يقلّل زمن التأخير، مع مراعاة ازدحام أوقات العصر في بعض الشوارع الرئيسية.",
  },
  "abha/al-rabwah": {
    approxDriveMinutesFromTeamStaging: 13,
    nearbyLandmarksAr:
      "إطلالات أعلى في بعض القطاعات؛ الرياح القوية أحياناً تنقل غباراً إلى الداخل عند فتح النوافذ لساعات طويلة.",
  },
  "abha/al-sadd": {
    approxDriveMinutesFromTeamStaging: 12,
    nearbyLandmarksAr:
      "منطقة تجمع سكناً وتجارة محلية؛ تنظيف الواجهات التجارية الصغيرة بالماء البارد يقلّل بقعاً من عادات الفتح المبكر.",
  },
  "abha/shamsan": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "قطاع هادئ نسبياً؛ المنازل متعددة الطوابق تحتاج تسلسلاً من الأعلى للأسفل أثناء التنظيف العميق لتجنب إعادة ترسب الغبار.",
  },
  // تبوك
  "tabuk/al-murooj": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "أجواء صحراوية باردة شتاءً؛ تراكم غبار على العتبات الخارجية يستدعي كنساً جافاً قبل استخدام الماء على البلاط.",
  },
  "tabuk/al-wurud": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "تخطيط حدائق محلي؛ الأوراق الجافة والحصى الصغير يدخل مع الأحذاء إلى المجالس فيحتاج كنساً متكرراً.",
  },
  "tabuk/al-faisaliyah": {
    approxDriveMinutesFromTeamStaging: 13,
    nearbyLandmarksAr:
      "حي خدمات متوسطة؛ الشقق القريبة من الدوائر الحكومية تطلب غالباً تنظيفاً بعد أسبوع عمل مزدحم للعائلة.",
  },
  "tabuk/al-nahdah": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "امتدادات أحدث؛ بعض الوحدات الجديدة تحتاج إزالة ملصقات النوافذ وبقايا بودرة الجص قبل التلميع النهائي.",
  },
  "tabuk/al-rayan": {
    approxDriveMinutesFromTeamStaging: 17,
    nearbyLandmarksAr:
      "شوارع واسعة نسبياً؛ مواقف أمام الفيلا تسهل تفريغ معدات التنظيف دون إغلاق الطريق.",
  },
  "tabuk/al-sulaimaniyah": {
    approxDriveMinutesFromTeamStaging: 18,
    nearbyLandmarksAr:
      "منطقة سكنية هادئة؛ طلبات تعقيم مقيدة للأسطح التي تلمسها الأطفال تزداد مع بداية العام الدراسي.",
  },
  // بريدة
  "buraydah/al-rayan": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "حي وسط بريدة نسبياً؛ الوصول سريع من المحاور الداخلية مع ازدحام محلي وقت السوق المسائي.",
  },
  "buraydah/al-fayziyah": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "قطاعات فيها فلل متوسطة؛ تنظيف الأسيجة الخارجية بعد مواسم الرياح الغبارية يحافظ على مظهر الواجهة.",
  },
  "buraydah/al-nahdah": {
    approxDriveMinutesFromTeamStaging: 13,
    nearbyLandmarksAr:
      "قرب مراكز طبية وتعليم؛ أوقات منتصف النهار أنسب للزيارات لتفادي تزاحم مداخل المدارس.",
  },
  "buraydah/al-iskan": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "وحدات إسكان متجانسة؛ الساحات المشتركة بين المجمعات تحتاج تنسيقاً مع الإدارة قبل استخدام ماء الضغط العالي.",
  },
  "buraydah/al-rabwah": {
    approxDriveMinutesFromTeamStaging: 17,
    nearbyLandmarksAr:
      "ارتفاع طفيف في بعض الشوارع؛ المنازل ذات المداخل الخلفية تناسب إخراج السجاد للتهوية بعد الغسيل.",
  },
  "buraydah/al-safa": {
    approxDriveMinutesFromTeamStaging: 18,
    nearbyLandmarksAr:
      "شوارع فرعية متعددة؛ تحديد اسم الحارة أو رقم لوحة المنزل يقلّل الالتباس بين العمائر المتشابهة.",
  },
  // حائل
  "hail/east-al-muntazah": {
    approxDriveMinutesFromTeamStaging: 12,
    nearbyLandmarksAr:
      "جوار مساحات ترفيهية؛ غبار الملاعب الرملية القريبة قد يدخل المنزل مع حركة الأطفال فيحتاج ممسحة يومية للمدخل.",
  },
  "hail/west-al-muntazah": {
    approxDriveMinutesFromTeamStaging: 13,
    nearbyLandmarksAr:
      "منطقة مخدّمة بحدائق؛ تنظيف الشرفات بعد الري بالرشاشات يمنع بقعاً جيرية على الزجاج إذا جُفّت بالشمس.",
  },
  "hail/al-khuzama": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "حي سكني متوسط؛ الشقق ذات السجاد الفاتح تحتاج عناية أكثر حذراً مع الأطفال والمشروبات.",
  },
  "hail/al-naqrah": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "امتدادات أوسع بين المنازل؛ الفناء الخلفي للشواء الخارجي يحتاج تنظيف دهون الشواية دورياً لتجنب تراكم الرائحة.",
  },
  "hail/salah-al-din": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "شوارع تجارية قريبة؛ شقق فوق المحلات تحتاج عزلاً جيداً للنوافذ لتقليل غبار الشوارع أثناء الذروة.",
  },
  "hail/al-jamiyeen": {
    approxDriveMinutesFromTeamStaging: 17,
    nearbyLandmarksAr:
      "قرب جامعة أو معاهد؛ طلبات التنظيف العامة قبل بداية الفصل أو بعد الإجازات الطويلة شائعة للشقق المشتركة.",
  },
  // جازان
  "jazan/al-shati": {
    approxDriveMinutesFromTeamStaging: 10,
    nearbyLandmarksAr:
      "رطوبة بحرية أعلى؛ العفن الخفيف على الإطارات الخارجية للنوافذ يحتاج تجفيفاً جيداً بعد الغسل.",
  },
  "jazan/al-suwais": {
    approxDriveMinutesFromTeamStaging: 11,
    nearbyLandmarksAr:
      "حي سكني متنوع؛ بعض المنازل القديمة ذات أسقف عالية تحتاج سلماً إضافياً عند تنظيف الثريات والمراوح.",
  },
  "jazan/al-rawdah": {
    approxDriveMinutesFromTeamStaging: 12,
    nearbyLandmarksAr:
      "شوارع مزروعة جزئياً؛ أوراق النخيل والثمار المتساقطة أمام المدخل تحتاج كنساً قبل غسل الممر.",
  },
  "jazan/al-matar": {
    approxDriveMinutesFromTeamStaging: 13,
    nearbyLandmarksAr:
      "قرب محور حركة؛ الضوضاء والغبار من الطريق الرئيسي يزيد وصول الأتربة للشرفات الأمامية.",
  },
  "jazan/al-safa": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "منطقة هادئة نسبياً؛ تنظيف المجالس التراثية الخشبية يحتاج مواد أقل رطوبة لتجنب تشوه الألواح.",
  },
  "jazan/al-naseem": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "امتداد سكني أحدث؛ طلبات تعطير خفيف وتلميع أرضيات البورسلان بعد المناسبات متكررة.",
  },
  // نجران
  "najran/al-fahd": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "مناخ صحرائي حار؛ التكثيف على تنظيف مرشحات التكييف الداخلية يقلّل تراكم الغبار على الأسطح القريبة من الفتحات.",
  },
  "najran/al-athaybah": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "حي متوسط الكثافة؛ المداخل المزدوجة للفلل تحتاج مسحاً متناوباً لتجنب إدخال الرمل مع السيارات.",
  },
  "najran/al-mukhayyam": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "شوارع فرعية غير منتظمة الشكل؛ تحديد نقطة وقوف للمعدات قبل الصعود للطابق يوفر وقتاً على الطاقم.",
  },
  "najran/al-araysah": {
    approxDriveMinutesFromTeamStaging: 17,
    nearbyLandmarksAr:
      "منطقة فيها أنماط بناء متنوعة؛ تنظيف الحجر الطبيعي على الواجهات يختلف عن الطلاء البلاستيكي في المواد المستخدمة.",
  },
  "najran/dahdah": {
    approxDriveMinutesFromTeamStaging: 18,
    nearbyLandmarksAr:
      "امتدادات أبعد عن المركز؛ التنسيق المسبق لوقت الوصول مع احتساب حرارة الظهيرة يحسّن راحة الفريق والعميل.",
  },
  "najran/al-qabil": {
    approxDriveMinutesFromTeamStaging: 19,
    nearbyLandmarksAr:
      "حي هادئ؛ المنازل ذات الحوش الواسع تحتاج خطّة لتنظيف الممر الطويل قبل الوصول لغرف الضيوف.",
  },
  // الأحساء
  "al-ahsa/al-hofuf": {
    approxDriveMinutesFromTeamStaging: 13,
    nearbyLandmarksAr:
      "قلب الحاضرة التاريخية والحديثة؛ بعض الدروب الضيقة تستدعي حمل معدات أخف عند الطوابق العليا بدون مصعد بضاعة.",
  },
  "al-ahsa/al-mubarraz": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "كثافة تجارية وسكنية؛ تنظيف الواجهات بعد مواسم الغبار المحلي يبرز لمعان المحلات الأرضية للزبائن.",
  },
  "al-ahsa/al-khalidiyah": {
    approxDriveMinutesFromTeamStaging: 12,
    nearbyLandmarksAr:
      "حي خدمات متنوعة؛ الشقق القريبة من الأسواق المركزية تحتاج تنظيفاً أسبوعياً للمداخل المشتركة.",
  },
  "al-ahsa/al-salmaniyah": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "مناطق فيها مجمعات حديثة؛ البلكونات الزجاجية تحتاج مسحاً بزوايا لتجنب خطوط الماء بعد الجفاف تحت الشمس.",
  },
  "al-ahsa/al-mazrou": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "امتدادات زراعية قريبة؛ غبار الطرق الترابية القريبة يزيد على الأرضيات الداكنة فيحتاج مكنسة قبل الممسحة.",
  },
  "al-ahsa/al-faisaliyah": {
    approxDriveMinutesFromTeamStaging: 11,
    nearbyLandmarksAr:
      "قرب محاور تنقل رئيسية؛ سهولة الوصول للفرق مع مراعاة أوقات الذروة عند المدارس المحيطة.",
  },
  // الجبيل
  "jubail/jubail-al-balad": {
    approxDriveMinutesFromTeamStaging: 12,
    nearbyLandmarksAr:
      "أزقة قديمة وبنية متنوعة؛ بعض المنازل ذات سلالم ضيقة تحتاج تقسيم المعدات إلى حملتين صغيرتين.",
  },
  "jubail/al-fanateer": {
    approxDriveMinutesFromTeamStaging: 11,
    nearbyLandmarksAr:
      "قرب الكورنيش والمرافئ؛ الملح والرذاذ على النوافذ الأمامية يتكرر في الطلبات بعد أيام الرياح الجنوبية.",
  },
  "jubail/al-deffi": {
    approxDriveMinutesFromTeamStaging: 13,
    nearbyLandmarksAr:
      "حي سكني مخدّم؛ تنظيف الفلل بعد الإيجار للشركات يشمل غالباً مطابخ متعددة المواقد والثلاجات الكبيرة.",
  },
  "jubail/dareen": {
    approxDriveMinutesFromTeamStaging: 14,
    nearbyLandmarksAr:
      "منطقة تجمع بين شقق وفلل؛ الممرات المبلطة بالحجر تحتاج فرشاة ناعمة لتجنب خدوش السطح الملموس.",
  },
  "jubail/taybah": {
    approxDriveMinutesFromTeamStaging: 15,
    nearbyLandmarksAr:
      "امتداد أهدأ؛ طلبات تنظيف شامل قبل ضيوف العيد متكررة مع التركيز على السجاد المركزي في الصالة.",
  },
  "jubail/al-mutrafiyah": {
    approxDriveMinutesFromTeamStaging: 16,
    nearbyLandmarksAr:
      "شوارع متفرعة؛ المنازل ذات المدخل الخلفي للمطبخ تناسب إخراج أكياس النفايات بسرعة أثناء التنظيف العميق.",
  },
};
