import { brandNameAr } from "@/lib/brand";
import { serviceArticles } from "@/lib/service-articles";
import { locations } from "@/src/data/locations";

export const aboutFoundedLabelAr = "منذ أكثر من عشر سنوات";
export const aboutProjectsCount = 500;
export const aboutCities = locations.map((c) => c.name);

export const aboutHeroLead = `انطلقت ${brandNameAr} من الرياض ${aboutFoundedLabelAr}، ونفّذت أكثر من ${aboutProjectsCount} مشروع تنظيف ومكافحة حشرات في أحياء العاصمة والمدن المشمولة — من شقق مفروشة في الملز إلى فلل عائلية في حطين والملقا، ومن غسيل سجاد ومجالس إلى رش صراصير ونمل أبيض في المطابخ والمخازن.`;

export const aboutStoryParagraphs = [
  `بدأنا بفكرة بسيطة: العميل في الرياض يحتاج شركة تنظيف تشرح له ماذا ستفعل قبل الوصول، وليس وعوداً عامة. لذلك بنينا مسار عمل يبدأ بتحديد نوع العقار (شقة، فيلا، مكتب)، المساحة، الحي، ونوع الخدمة — تنظيف دوري، تنظيف عميق، غسيل سجاد، تنظيف واجهات، تعقيم خزان، أو مكافحة حشرات — ثم نوزّع الفريق والمعدات وفق ذلك.`,
  `مع توسع الطلب خارج العاصمة، وسّعنا التغطية لتشمل ${aboutCities.length} مدينة داخل المملكة، مع بقاء الرياض مركز العمليات الرئيسي. نخدم اليوم منازل ومكاتب ومجمعات سكنية في جدة والدمام والخبر ومكة والمدينة وغيرها، مع نفس معيار الشفافية: تقدير قبل الزيارة، مشرف يشرح الخطة، وملخص بعد الانتهاء.`,
  `أكثر من ${aboutProjectsCount} مشروعاً منفّذاً في أحياء الرياض خلال السنوات الماضية علّمنا أن التفاصيل الصغيرة هي ما يبني الثقة: تنسيق دخول العمارة مع الحارس، اختيار pH مناسب للرخام السعودي، عدم رش مبيدات عشوائياً دون تحديد نوع الحشرة، وتهوية المكان بعد الرش قبل عودة الأطفال.`,
];

export const aboutStoryItems = [
  {
    step: "٠١",
    title: "الفكرة التي بدأنا منها",
    icon: "verified_user",
    body: aboutStoryParagraphs[0],
  },
  {
    step: "٠٢",
    title: "من الرياض إلى ١٥ مدينة",
    icon: "location_city",
    body: aboutStoryParagraphs[1],
  },
  {
    step: "٠٣",
    title: "التفاصيل التي تبني الثقة",
    icon: "check_circle",
    body: aboutStoryParagraphs[2],
  },
] as const;

export const aboutStoryQuote =
  "الثقة تُبنى بالتفاصيل: تنسيق الدخول، اختيار المواد، وشرح ما تم بعد كل زيارة.";

export const aboutServiceLines = serviceArticles.map((s) => ({
  slug: s.slug,
  title: s.shortTitle,
  detail: s.excerpt,
}));

export const aboutEquipment = [
  {
    name: "مكانس شفط صناعية وفلاتر HEPA",
    icon: "air",
    use: "إزالة الغبار الناعم من السجاد والمفروشات والزوايا قبل الغسيل — ضرورية في مناخ الرياض والغبار المتكرر.",
  },
  {
    name: "أجهزة بخار جاف للكنب والمجالس",
    icon: "water_vapor",
    use: "تنظيف الأقمشة دون تشبيع بالماء؛ مناسبة للمجالس التراثية والكنب القابل للفك في الرياض.",
  },
  {
    name: "محطات غسيل واستخراج السجاد والموكيت",
    icon: "local_laundry_service",
    use: "شفط عميق للألياف وإزالة البقع والروائح — في الموقع أو بعد النقل حسب نوع النسيج.",
  },
  {
    name: "رشاشات ضغط وسلالم تلسكوبية للواجهات",
    icon: "height",
    use: "تنظيف زجاج وواجهات حجرية للفلل والأبراج دون ترك خطوط جفاف على الزجاج العالي.",
  },
  {
    name: "مضخات ضغط عالٍ وتعقيم خزانات",
    icon: "water_pump",
    use: "غسيل جدران وقاع خزانات المياه وإزالة الطحالب والرواسب قبل إعادة التشغيل.",
  },
  {
    name: "معدات رش مبيدات وصناديق طعم آمنة",
    icon: "pest_control",
    use: "مكافحة صراصير ونمل وبق فراش ونمل أبيض بمواد مصرح بها وخطط وقائية أو علاجية.",
  },
  {
    name: "منظفات pH متوازنة وشامبو سجاد منخفض الرطوبة",
    icon: "science",
    use: "حماية الرخام والسيراميك والأقمشة الحساسة — نختبر زاوية مخفية قبل المعالجة الكاملة.",
  },
] as const;

export const aboutTeamRoles = [
  {
    title: "مشرف ميداني",
    icon: "supervisor_account",
    body: "يصل قبل الفريق أو معه، يمر على الخطة مع العميل، يوزّع المهام، ويقدّم ملخصاً مكتوباً أو شفهياً لما تم قبل المغادرة.",
  },
  {
    title: "فنيو تنظيف منازل وشقق",
    icon: "mop",
    body: "مدرّبون على التنظيف من الأعلى للأسفل، معالجة المطبخ والحمامات، واحترام غرف لا تُفتح عند الطلب.",
  },
  {
    title: "فنيو غسيل سجاد وكنب",
    icon: "chair",
    body: "خبرة في أنواع النسيج السعودي — صوف، صناعي، مخمل مجلس — مع اختيار حرارة البخار وضغط الشفط المناسب.",
  },
  {
    title: "فنيو مكافحة حشرات",
    icon: "pest_control",
    body: "معاينة مسارات الدخول والاختباء قبل الرش؛ شرح مدة التهوية والاحتياطات للأطفال وكبار السن.",
  },
  {
    title: "منسقو مواعيد ودعم واتساب",
    icon: "support_agent",
    body: "تأكيد الموعد قبل 30–60 دقيقة، تنسيق الحارس والمصعد في الأبراج، وإعادة جدولة عند تغيّر خططك.",
  },
] as const;

export const aboutTeamSizes = [
  { place: "شقة غرفتين–ثلاث", size: "فريق 2–3 فنيين" },
  { place: "فيلا أو مكتب واسع", size: "فريق 3–5 فنيين" },
  { place: "مكافحة حشرات + تنظيف عميق", size: "مشرف + فنيو تخصص حسب الحالة" },
];

export const aboutStats = [
  { value: `+${aboutProjectsCount}`, label: "مشروع تنظيف ومكافحة", icon: "home_work" },
  { value: String(aboutCities.length), label: "مدينة نغطيها", icon: "location_city" },
  { value: String(serviceArticles.length), label: "خط خدمة رئيسي", icon: "cleaning_services" },
  { value: "10+", label: "سنوات خبرة في الرياض", icon: "calendar_month" },
] as const;
