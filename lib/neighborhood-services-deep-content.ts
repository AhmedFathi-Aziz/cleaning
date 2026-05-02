import type { CityLocation, Neighborhood } from "@/src/data/locations";

/** الخدمات التي يُثرى بها محتوى صفحة الحي بالتفصيل العملي */
export const neighborhoodHighlightServiceSlugs = [
  "house-cleaning",
  "water-tank-cleaning",
  "pest-control",
  "garden-cleaning",
] as const;

export type NeighborhoodHighlightSlug = (typeof neighborhoodHighlightServiceSlugs)[number];

export type NeighborhoodServiceHighlightBlock = {
  slug: NeighborhoodHighlightSlug;
  heading: string;
  paragraphs: string[];
  bullets: string[];
};

function variantIndex(seed: string, modulo: number): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % modulo;
}

function climateNote(citySlug: string): string {
  if (["jeddah", "dammam", "khobar", "jazan"].includes(citySlug)) {
    return "المناطق القريبة من البحر غالباً ما ترافقها رطوبة أعلى؛ يستحسن عدم تأجيل تنظيف الخزان عند ملاحظة طعم أو رائحة غير معتادة.";
  }
  if (["abha", "taif", "najran"].includes(citySlug)) {
    return "التضاريس المرتفعة والليالي الباردة لا تعني تجاهل الخزان؛ تراكم الطبقات الدقيقة يحدث أيضاً مع استخدام متقطع أو بعد أعمال صيانة على السطح.";
  }
  if (["riyadh", "buraydah", "hail", "tabuk"].includes(citySlug)) {
    return "الغبار الناعم والحر الشديد يزيدان الحاجة إلى مواعيد منتظمة لتفريغ رواسب والتحقق من سلامة الغطاء والتهوية وفق إرشادات الفني.";
  }
  return "سواء كان المنزل قديماً أو حديثاً، الخطة المناسبة تُبنى بعد معرفة نوع الخزان والمواد والاستخدام الفعلي للمنزل.";
}

function pick<T>(seed: string, key: string, options: T[]): T {
  return options[variantIndex(`${seed}:${key}`, options.length)];
}

function houseBlocks(city: CityLocation, neighborhood: Neighborhood, seed: string): { paragraphs: string[]; bullets: string[] } {
  const { name: hood } = neighborhood;
  const { name: cityName } = city;

  const paragraphSets: [string, string][] = [
    [
      `تنظيف المنازل في حي ${hood} داخل ${cityName} يبدأ من توزيع الوقت على المطبخ والحمامات والمعيشة حسب الاستخدام اليومي، لا من «مسح سطحي» واحد لكل الغرف. إن كان عندك ضيوف متكررين أو أطفالاً صغاراً، نناقش معك أولويات الغبار والأرضيات قبل أول زيارة.`,
      `نرتّب مواعيد تناسب دخول العمائر أو الفلل في ${hood}؛ بعض الشوارع تزدحم أوقاتاً محددة فيُفضّل جدولة أقل تعارضاً مع تنقل سكان البيت أو مواقف السيارات.`,
    ],
    [
      `المنازل والشقق في ${hood} تختلف في مساحة الصالة وممرات الدخول؛ نحدّد معدات التنظيف وحجم الفريق بحيث لا يُضاعف الغبار أثناء العمل (مثلاً بالبدء من الأعلى للأسفل عند التنظيف العميق).`,
      `إذا كنت انتقلت حديثاً إلى ${cityName}، زيارة أولى تركز على خزائن المطبخ والنوافذ والشرفات حيث يتراكم غبار التشطيب أو الفتح المتكرر.`,
    ],
    [
      `قبل المناسبات في حي ${hood}، كثير من العائلات يطلبون تنظيفاً مركزاً للمجالس والمداخل؛ نوضح ما يمكن إنجازه ضمن الوقت المتفق عليه حتى لا تُرفع التوقعات عن الواقع.`,
      `مع أهل ${cityName} نفضّل الشفافية: أي حساسية من روائح أو مواد يُذكر مبكراً لاختيار مسار آمن قدر الإمكان.`,
    ],
    [
      `الفلل ذات الفناء الأمامي في ${hood} تجمع غالباً تراباً على المداخل؛ يُدمج تنظيف الممر مع الداخل بحيث لا يُعاد سحب الغبار بعد انتهاء الغرف.`,
      `خدمة تنظيف منازل متكررة في نفس الحي تساعدنا على فهم أنماط الطلب المحلية في ${cityName} وتقديم وقت تقريبي أوضح عند الحجز.`,
    ],
  ];

  const bulletSets: string[][] = [
    [
      `جدولة مرنة تناسب أيام الدوام أو حضانة الأطفال في ${hood}.`,
      `تركيز على المطبخ والحمامات عند الطلب كمسار أول داخل المنزل.`,
    ],
    [
      `إمكانية التركيز على غرف محددة إن لم يكن مطلوباً تنظيفاً شاملاً للمسكن بالكامل.`,
      `تنسيق يقلّل ازدحام المعدات في الممرات الضيقة إن وُجدت.`,
    ],
    [
      `توضيح ما يُستثنى من الخدمة لتجنب سوء الفهم قبل الموعد.`,
      `مراعاة وجود كبار سن أو حيوانات أليفة عند اختيار المسار والوقت.`,
    ],
    [
      `دعم تحضير المنزل قبل المناسبات مع أولويات تُحدَّد معك كتابياً إن رغبت.`,
      `الالتزام بمعايير ترشيد استخدام الماء داخل الغرف القريبة من الأثاث الحساس.`,
    ],
  ];

  const paragraphs = pick(seed, "house", paragraphSets);
  const bullets = pick(seed, "house-b", bulletSets);
  return { paragraphs, bullets };
}

function tankBlocks(city: CityLocation, neighborhood: Neighborhood, seed: string): { paragraphs: string[]; bullets: string[] } {
  const { name: hood } = neighborhood;
  const { name: cityName, slug: citySlug } = city;
  const climate = climateNote(citySlug);

  const paragraphSets: [string, string][] = [
    [
      `تنظيف خزانات المياه في حي ${hood} داخل ${cityName} يهدف إلى تقليل الطبقات الراسبة والمواد العضوية التي تؤثر على جودة الماء وليس إلى «لمعان خارجي» فقط. يُناقَش نوع الخزان الأرضي أو العلوي قبل الموعد.`,
      climate,
    ],
    [
      `كثير من العائلات تلاحظ تغيّراً طفيفاً في الطعم بعد فترة الخمول أو بعد أعمال السطح؛ التقييم المبدئي يحدد إن كان الغسل الدوري كافياً أو تحتاج خطوة إضافية وفق الحالة.`,
      `في ${hood} ننسّق وصول الفريق مع تصريف آمن للمياه حسب إمكانيات الموقع وإرشادات السلامة.`,
    ],
    [
      `المنازل التي تخدم ضيوفاً أو إيجارات قصيرة في ${cityName} غالباً تحتاج إلى دورة أوضح لتفريغ وإعادة التعبئة بالتنسيق مع أهل المنزل.`,
      climate,
    ],
    [
      `بعد العواصف الغبارية أو أعمال بناء قريبة قد يزيد دخول جزيئات إلى مصادر المياه عبر فتحات؛ يُفحص الغطاء والفلاتر إن وُجدت ضمن نطاق متفق عليه.`,
      `نوضح لسكان ${hood} ما يمكن توقعه من وقت التجفيف أو العودة للاستخدام الآمن بعد الخدمة.`,
    ],
  ];

  const bulletSets: string[][] = [
    [
      `طلب التقرير أو الصور البسيطة للخزان قبل الزيارة يقلّل المفاجآت.`,
      `تجنّب استخدام الماء للشرب أو الطبخ حتى يُعلَن جاهزية الخزان بعد التنظيف المتفق عليه.`,
    ],
    [
      `تحديد موقع الخزان الدقيق (سطح، أرضي، مشترك) يسرّع تقييم المعدات.`,
      `إبلاغ الفريق بوجود مضخة أو محبس معيّن يحتاج تعاملًا حذراً.`,
    ],
    [
      `الالتزام بالمواعيد الدورية يقلّل تكلفة التراكم الشديد لاحقاً.`,
      `شرح حدود الخدمة بوضوح قبل الدفع لتجنّب التوقعات غير الواقعية.`,
    ],
    [
      `مراعاة وجود خزان احتياطي أو بديل للاستخدام أثناء العمل إن لزم.`,
      `الإبلاغ عن تسريبات سابقة أو روائح مستمرة قبل الموعد.`,
    ],
  ];

  const paragraphs = pick(seed, "tank", paragraphSets);
  const bullets = pick(seed, "tank-b", bulletSets);
  return { paragraphs, bullets };
}

function pestBlocks(city: CityLocation, neighborhood: Neighborhood, seed: string): { paragraphs: string[]; bullets: string[] } {
  const { name: hood } = neighborhood;
  const { name: cityName, slug: citySlug } = city;

  const secondSeasonOrHumid = ["jeddah", "dammam", "khobar", "jazan"].includes(citySlug)
    ? `في أجواء رطبة قرب الساحل قد تظهر حشرات تعشق الرطوبة حول المصارف والشرفات؛ يُفضّل تنظيف تجمعات الماء بانتظام بين الزيارات.`
    : `في ${cityName} يختلف نشاط الحشرات بين المواسم؛ صف لنا متى لاحظت الظهور وفي أي غرفة لتقليل التخمين.`;

  const secondCupboards =
    ["jeddah", "dammam", "khobar", "jazan"].includes(citySlug)
      ? `التركيز على مناطق تخزين الطعام الجاف والفتحات خلف الثلاجة شائع في طلبات ${hood}؛ الرطوبة تسرّع ظهور بعض الحشرات إن بقي فتات أو سكر مفتوحاً بلا غطاء محكم.`
      : `التركيز على مناطق تخزين الطعام الجاف والفتحات خلف الثلاجة شائع في طلبات ${hood}.`;

  const paragraphSets: [string, string][] = [
    [
      `مكافحة الحشرات ورش المعالجات الآمنة في حي ${hood} تبدأ من تحديد نوع الحشرة والمكان—مطبخ، حمام، مدخل، أو حديقة—لا من تعميم حل واحد. الأسئلة عن وجود أطفال أو حساسيات توجّه اختيار المسار.`,
      secondSeasonOrHumid,
    ],
    [
      `الفتحات حول السباكة والمجاري الخلفية من أكثر نقاط دخول الصراصير الصغيرة؛ التقييم قد يقترح خطوات بسيطة منزلية قبل أو بعد المعالجة.`,
      `سكان ${hood} الذين يملكون حدائق أو حوشاً مروّياً قد يربطون النشاط بالري؛ نأخذ ذلك بالاعتبار عند وضع الخطة.`,
    ],
    [
      `النمل يتبع مسارات؛ إغلاق مصدر جذب أو تجفيف ركن قد يكون جزءاً من الحل الطويل وليس مجرد رشة عابرة.`,
      `نشرح ما يمكن أن يُنجز في الزيارة الأولى وما يحتاج متابعة وفق نوع الحالة في منزل ${cityName}.`,
    ],
    [
      `المكاتب الصغيرة المدمجة مع الشقق في بعض أجزاء المدينة تحتاج تنسيقاً زمنياً حتى لا يتعارض الرش مع حضور العملاء.`,
      secondCupboards,
    ],
  ];

  const bulletSets: string[][] = [
    [
      `تحديد نوع الحشرة تقريباً أو إرسال صورة بعيدة اللقطات يسرّع التقييم.`,
      `إخلاء الأواني المكشوفة على مقربة من نقطة المعالجة إن طُلب ذلك.`,
    ],
    [
      `عدم إخفاء وجود حيوانات أليفة أو حساسية دوائية.`,
      `الالتزام بتعليمات التهوية قبل وبعد الزيارة حسب المنتج المتفق عليه.`,
    ],
    [
      `إغلاق فتحات تهوية خارجية تالفة قد يُنصح بها بعد المعاينة.`,
      `تجنّب خلط منتجات منزلية قوية قبل وصول الفريق.`,
    ],
    [
      `جدولة خارج أوقات نوم الرضع إن رُفع ذلك كأولوية.`,
      `شرح وجود مصادر ماء مستمرة مثل تسريب خفيف يساعد على استهداف السبب.`,
    ],
  ];

  const paragraphs = pick(seed, "pest", paragraphSets);
  const bullets = pick(seed, "pest-b", bulletSets);
  return { paragraphs, bullets };
}

function gardenBlocks(city: CityLocation, neighborhood: Neighborhood, seed: string): { paragraphs: string[]; bullets: string[] } {
  const { name: hood } = neighborhood;
  const { name: cityName, slug: citySlug } = city;

  const dustSecond = ["riyadh", "buraydah", "makkah", "madinah"].includes(citySlug)
    ? `أوراق النخيل والغبار على البلاط الخارجي يحتاج كنساً جافاً قبل رشّ خفيف لتجنّب طين لاصق.`
    : `في ${cityName} نحدد إن كان المطلوب كنساً وترتيباً أساسياً أم إضافة غسل بلاط بعد مواسم الري الغزيرة.`;

  const eventsSecond = ["riyadh", "buraydah", "makkah", "madinah"].includes(citySlug)
    ? `التنسيق مع المناسبات الخارجية يضبط التوقيت حتى يكون الفناء جاهزاً للضيوف في ${cityName}؛ الغبار المحلي قد يعود بسرعة بعد العواصف فيُفضّل الجدولة وفق الطقس.`
    : `التنسيق مع المناسبات الخارجية يضبط التوقيت حتى يكون الفناء جاهزاً للضيوف في ${cityName}.`;

  const paragraphSets: [string, string][] = [
    [
      `تنظيف الحدائق والفناء في حي ${hood} يشمل غالباً الرصيف حول النباتات، مصارف ماء الري، وزوايا الشواء حيث تتراكم دهون وبقايا.`,
      dustSecond,
    ],
    [
      `الحدائق الصغيرة أمام الفلل قد تبدو «بسيطة» لكنها تجمع حشرات ورطوبة عندما تبقى أوراق متحللة تحت الشجيرات؛ الإزالة الدورية تحسّن المظهر وتقلل روائح.`,
      `ننسّق معك مداخل الفناء الخلفي أو الباب الجانبي لتسهيل إدخال المعدات دون إزعاج الجيران في ${hood}.`,
    ],
    [
      `إذا كان عندك شبكة ريّ آلية، نحاول تجنّب تعطيلها؛ يُذكر موعد الريّ المتوقع عند الحجز.`,
      eventsSecond,
    ],
    [
      `بعض الأحياء فيها أسوار خضراء طويلة تولّد قصاصات؛ الجمع قبل الغسل يمنع انسداد مصارف ضيقة.`,
      `نوضح حدود الخدمة بين «تنظيف مساحة مرصوفة» و«قصّ الأشجار الكبير» إن كان الطلب يختلط بينهما.`,
    ],
  ];

  const bulletSets: string[][] = [
    [
      `تحديد مساحة الفناء تقريباً ووجود بلاط أو حصى.`,
      `إبلاغ الفريق بوجود أسلاك ريّ ظاهرة لتجنّب لقطات المعدات.`,
    ],
    [
      `طلب تجميع النفايات الخضراء في كيس واحد لتسهيل الإخراج.`,
      `ترك موقع مناسب لتفريغ الماء الكدِر إن وُجد غسل بلاط.`,
    ],
    [
      `جدولة بعد انتهاء مناسبة خارجية لتقليل إعادة اتساخ سريع.`,
      `توضيح وجود أثاث خارجي يحتاج مسحاً وليس نقعاً طويلاً.`,
    ],
    [
      `إزالة الأواني الفارغة أو العوائق الصغيرة قبل وصول الفريق.`,
      `اختيار وقت يقلّ فيه ريّ الجيران على الحدود المشتركة إن أمكن.`,
    ],
  ];

  const paragraphs = pick(seed, "garden", paragraphSets);
  const bullets = pick(seed, "garden-b", bulletSets);
  return { paragraphs, bullets };
}

const headings: Record<NeighborhoodHighlightSlug, string> = {
  "house-cleaning": "نظافة المنازل وتنظيف الشقق والفلل",
  "water-tank-cleaning": "تنظيف خزانات المياه",
  "pest-control": "رش الحشرات والمكافحة المنظمة",
  "garden-cleaning": "تنظيف الحدائق والفناء",
};

export function getNeighborhoodServiceHighlights(
  city: CityLocation,
  neighborhood: Neighborhood,
): NeighborhoodServiceHighlightBlock[] {
  const seed = `${city.slug}/${neighborhood.slug}`;
  const hood = neighborhood.name;
  const cityName = city.name;

  const house = houseBlocks(city, neighborhood, seed);
  const tank = tankBlocks(city, neighborhood, seed);
  const pest = pestBlocks(city, neighborhood, seed);
  const garden = gardenBlocks(city, neighborhood, seed);

  return [
    {
      slug: "house-cleaning",
      heading: `${headings["house-cleaning"]} في حي ${hood}`,
      paragraphs: house.paragraphs,
      bullets: house.bullets,
    },
    {
      slug: "water-tank-cleaning",
      heading: `${headings["water-tank-cleaning"]} في حي ${hood} — ${cityName}`,
      paragraphs: tank.paragraphs,
      bullets: tank.bullets,
    },
    {
      slug: "pest-control",
      heading: `${headings["pest-control"]} في ${hood}`,
      paragraphs: pest.paragraphs,
      bullets: pest.bullets,
    },
    {
      slug: "garden-cleaning",
      heading: `${headings["garden-cleaning"]} في حي ${hood} — ${cityName}`,
      paragraphs: garden.paragraphs,
      bullets: garden.bullets,
    },
  ];
}
