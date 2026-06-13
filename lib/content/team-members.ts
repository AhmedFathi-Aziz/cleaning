export type TeamMember = {
  id: string;
  honorific?: string;
  name: string;
  specialty: string;
  yearsExperience: number;
  highlight: string;
  icon: string;
  initials: string;
  /** مسار صورة حقيقية عند توفرها — مثال: /images/team/mohammed-ahmed.webp */
  image?: string;
};

export const teamPageIntro =
  "تعرّف على فريق القيادة والمهندسين والفنيين — بأسماء واضحة ومسميات وظيفية محددة، لا وعوداً عامة بدون وجوه.";

export const teamMembers: TeamMember[] = [
  {
    id: "ahmed-fathy",
    name: "أحمد فتحي",
    specialty: "مدير التقنية والذكاء الاصطناعي",
    yearsExperience: 7,
    highlight:
      "يقود الأنظمة التقنية والذكاء الاصطناعي لتحسين تجربة العملاء، وتنظيم عمليات الحجز والمتابعة، ودعم اتخاذ القرار داخل الفريق الميداني.",
    icon: "engineering",
    initials: "أ ف",
  },
  {
    id: "mohammed-ahmad",
    honorific: "م.",
    name: "محمد أحمد",
    specialty: "مهندس مشرف ميداني — تنظيف ومكافحة حشرات",
    yearsExperience: 10,
    highlight:
      "أشرف على عشرات المشاريع السكنية والتجارية في أحياء الرياض، من تنسيق الدخول مع الحارس إلى ملخص ما تم بعد كل زيارة.",
    icon: "supervisor_account",
    initials: "م أ",
  },
  {
    id: "khalid-otaibi",
    name: "خالد العتيبي",
    specialty: "متخصص تنظيف منازل وفلل",
    yearsExperience: 8,
    highlight:
      "خبرة في التنظيف من الأعلى للأسفل، معالجة المطابخ والحمامات، والتعامل مع الرخام والسيراميك السعودي.",
    icon: "home",
    initials: "خ ع",
  },
  {
    id: "noura-saud",
    name: "نورة السعود",
    specialty: "متخصصة غسيل سجاد ومجالس",
    yearsExperience: 7,
    highlight:
      "تتعامل مع أنواع النسيج المختلفة — صوف، صناعي، مخمل مجلس — باختيار حرارة البخار وضغط الشفط المناسب.",
    icon: "chair",
    initials: "ن س",
  },
  {
    id: "fahed-shamri",
    honorific: "م.",
    name: "فهد الشمري",
    specialty: "مهندس مكافحة حشرات وصحة بيئية",
    yearsExperience: 9,
    highlight:
      "معاينة مسارات الدخول والاختباء قبل الرش، وشرح مدة التهوية والاحتياطات للأطفال وكبار السن وفق معايير السلامة.",
    icon: "pest_control",
    initials: "ف ش",
  },
  {
    id: "abdullah-qhtani",
    honorific: "م.",
    name: "عبدالله القحطاني",
    specialty: "مهندس تعقيم خزانات وتنظيف واجهات",
    yearsExperience: 6,
    highlight:
      "تنفيذ غسيل خزانات المياه وإزالة الرواسب، وتنظيف زجاج وواجهات للفلل والأبراج دون خطوط جفاف.",
    icon: "water_drop",
    initials: "ع ق",
  },
  {
    id: "sara-harbi",
    name: "سارة الحربي",
    specialty: "منسقة مواعيد ودعم عملاء",
    yearsExperience: 5,
    highlight:
      "تأكيد المواعيد قبل 30–60 دقيقة، تنسيق الحارس والمصعد في الأبراج، وإعادة الجدولة عند تغيّر خططك.",
    icon: "support_agent",
    initials: "س ح",
  },
];
