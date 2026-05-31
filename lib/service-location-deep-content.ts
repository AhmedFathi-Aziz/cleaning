import type { ServiceSection } from "@/lib/service-articles-types";
import { cityClimateNote, cityDustNote, pickVariant } from "@/lib/content-seed-utils";
import { getNeighborhoodServiceHighlights } from "@/lib/neighborhood-services-deep-content";
import type { CityLocation, Neighborhood } from "@/src/data/locations";

export type ServiceLocationFaq = { question: string; answer: string };

export type ServiceLocationPageContent = {
  localIntro: string[];
  sections: ServiceSection[];
  faqs: ServiceLocationFaq[];
  preparationBullets: string[];
};

type BuildCtx = {
  seed: string;
  city: CityLocation;
  neighborhood: Neighborhood;
  hood: string;
  cityName: string;
  citySlug: string;
  landmarks: string;
  driveMin: number;
};

function buildCtx(city: CityLocation, neighborhood: Neighborhood, serviceSlug: string): BuildCtx {
  return {
    seed: `${serviceSlug}/${city.slug}/${neighborhood.slug}`,
    city,
    neighborhood,
    hood: neighborhood.name,
    cityName: city.name,
    citySlug: city.slug,
    landmarks: neighborhood.nearbyLandmarksAr,
    driveMin: neighborhood.approxDriveMinutesFromTeamStaging,
  };
}

function localContextSection(ctx: BuildCtx, serviceLabel: string): ServiceSection {
  const { hood, cityName, landmarks, driveMin } = ctx;
  return {
    heading: `لماذا ${serviceLabel} في حي ${hood} يختلف عن حي آخر؟`,
    paragraphs: [
      landmarks,
      `عند طلب ${serviceLabel} في حي ${hood}، ${cityName}، نأخذ هذا السياق المحلي في الحسبان: نوع العمارة، كثافة الحركة، وطريقة الوصول للموقع. التقدير الأولي للوصول من نقطة انطلاق الفريق يُحدَّد تقريباً بـ ${driveMin} دقيقة — قد يختلف حسب الزحمة والمسار الفعلي.`,
      cityClimateNote(ctx.citySlug),
    ],
  };
}

function schedulingSection(ctx: BuildCtx, serviceLabel: string): ServiceSection {
  const { hood, cityName, driveMin, seed } = ctx;
  const slotSets: [string, string][] = [
    [
      `في ${hood} نفضّل تنسيق الموعد معك قبل الذروة إن كان المدخل يمر بشارع مزدحم؛ هذا يقلل انتظار المعدات عند الباب.`,
      `اذكر عند الحجز إن كان هناك موقف محدود أو مدخل خدمة جانبي — شائع في بعض قطع ${cityName}.`,
    ],
    [
      `الوصول التقريبي لحي ${hood} يُخطَّط بـ ${driveMin} دقيقة من انطلاق الفريق؛ نؤكد الوقت عبر واتساب قبل التحرك.`,
      `إن كنت تحتاج ${serviceLabel} قبل مناسبة، حدّد الموعد قبل 48–72 ساعة لضمان فريق مناسب للمساحة.`,
    ],
    [
      `سكان ${hood} الذين يعملون من المنزل أحياناً يطلبون فترة بعد الظهر؛ نحاول التكيّف مع ذلك عند الإمكان.`,
      `في ${cityName}، أيام نهاية الأسبوع مزدحمة للمجالس والاستقبالات — الحجز المبكر أنسب للكنب والسجاد.`,
    ],
    [
      `إن كان المنزل في ${hood} جديد الإشغال، أرسل صوراً للمدخل والسلالم لتجهيز معدات مناسبة للمساحات الضيقة إن وُجدت.`,
      `نؤكد مدة ${serviceLabel} المتوقعة حسب المساحة حتى لا تتعارض مع مواعيدك في ${cityName}.`,
    ],
  ];
  const [a, b] = pickVariant(seed, "sched", slotSets);
  return {
    heading: `الجدولة والوصول إلى حي ${hood}`,
    paragraphs: [a, b],
    bullets: pickVariant(seed, "sched-b", [
      [`تحديد موعد يناسب دوامك أو حضانة الأطفال في ${hood}.`, `إبلاغنا بوجود مصعد أو سلم ضيق قبل وصول الفريق.`],
      [`تأكيد رقم جوال للتواصل عند الاقتراب من ${cityName}.`, `طلب تأجيل مبكر إن تغيّرت خطط المناسبة.`],
      [`ذكر الطابق ووجود موقف قريب لتسريع التفريغ.`, `اختيار وقت بعيد عن ريّ الحديقة إن كان هناك غسل خارجي.`],
      [`إرسال موقع واتساب دقيق للعمارة أو الفيلا في ${hood}.`, `تحديد غرف «لا تُفتح» إن رغبت بخصوصية.`],
    ]),
  };
}

function crossServiceSection(ctx: BuildCtx, pairs: [string, string][]): ServiceSection {
  const chosen = pickVariant(ctx.seed, "cross", pairs);
  return {
    heading: `خدمات مكمّلة لسكان حي ${ctx.hood}`,
    paragraphs: [
      `كثير من طلبات ${ctx.cityName} في حي ${ctx.hood} تجمع أكثر من خدمة في زيارة واحدة أو على أيام متقاربة — ${chosen[0]}`,
      chosen[1],
    ],
    bullets: pickVariant(ctx.seed, "cross-b", [
      [`تنظيف منزل ثم غسيل سجاد في ${ctx.hood} بعد الظهر.`, `مكافحة حشرات بعد تنظيف عميق للمطبخ.`],
      [`تنظيف واجهة مع غسل نوافذ داخلية من نفس الجهة.`, `تنظيف فناء ثم رش وقائي للحوش.`],
      [`تنظيف خزان قبل موسم سفر طويل من ${ctx.cityName}.`, `تنظيف كنب قبل استقبال ضيوف نهاية الأسبوع.`],
      [`تنظيف عميق بعد تشطيب ثم تعقيم خزان المياه.`, `غسيل سجاد مع تنظيف مجالس في نفس العنوان.`],
    ]),
  };
}

function highlightSection(
  ctx: BuildCtx,
  serviceSlug: string,
  fallbackHeading: string,
  fallbackParagraphs: string[],
): ServiceSection {
  const block = getNeighborhoodServiceHighlights(ctx.city, ctx.neighborhood).find((b) => b.slug === serviceSlug);
  if (block) {
    return { heading: block.heading, paragraphs: block.paragraphs, bullets: block.bullets };
  }
  return { heading: fallbackHeading, paragraphs: fallbackParagraphs };
}

function buildHouseCleaning(ctx: BuildCtx): ServiceLocationPageContent {
  const { hood, cityName, seed } = ctx;
  return {
    localIntro: [
      `تنظيف منازل وشقق في حي ${hood}، ${cityName} — خطة تُبنى على عدد الغرف، نوع الأرضيات، ووجود مطبخ مفتوح أو مجالس واسعة. ${ctx.landmarks}`,
      cityDustNote(ctx.citySlug, cityName),
    ],
    sections: [
      localContextSection(ctx, "تنظيف المنازل"),
      highlightSection(ctx, "house-cleaning", `نظافة دورية في حي ${hood}`, [
        `نبدأ من تحديد أولوياتك: مطبخ وحمامات، غبار على الأثاث، أو تنظيف عميق قبل مناسبة في ${hood}.`,
      ]),
      schedulingSection(ctx, "تنظيف المنزل"),
      {
        heading: `تفاصيل الغرف والأسطح في ${hood}`,
        paragraphs: pickVariant(seed, "house-room", [
          [
            `المطابخ المدمجة في شقق ${cityName} تجمع دهوناً على الخزائن العلوية؛ نخصص وقتاً للشفاط والأسطح حسب الاتساخ.`,
            `الحمامات مع تركيبات قديمة تحتاج فركاً لطيفاً للجوانب السيراميك دون خدش.`,
          ],
          [
            `المداخل والممرات في ${hood} هي أول ما يلاحظه الضيوف؛ كنس ومسح متدرج يقلل إعادة الغبار على السجاد.`,
            `غرف النوم: التركيز على تحت السرير والزوايا عند التنظيف العميق.`,
          ],
          [
            `المجالس الواسعة في ${cityName} تحتاج ترتيباً للوسائد ومسحاً للأسطح قبل غسيل الكنب إن طُلب.`,
            `النوافذ المطلة على شارع رئيسي في ${hood} تستحق مسح إطارات أسبوعياً في مواسم الغبار.`,
          ],
          [
            `السلالم الداخلية والدرابزين تجمع غباراً سريعاً؛ نبدأ من الأعلى عند التنظيف الشامل.`,
            `غرف الأطفال: نستخدم مساراً يقلل الروائح القوية إن أبلغتنا بذلك.`,
          ],
        ]),
      },
      crossServiceSection(ctx, [
        [
          "غسيل سجاد أو كنب في نفس الزيارة شائع بعد تنظيف الصالات.",
          "بعد تنظيف المطبخ، رش وقائي للحشرات يعطي نتيجة أطول في المطابخ المزدحمة.",
        ],
        [
          "تنظيف خزان المياه منطقي بعد فترة إغلاق طويل للمنزل.",
          "تنظيف الفناء الخارجي يكمّل المداخل بعد العواصف.",
        ],
      ]),
    ],
    faqs: pickVariant(seed, "house-faq", [
      [
        {
          question: `كم تستغرق زيارة تنظيف شقة في حي ${hood}؟`,
          answer: `شقة غرفتين–ثلاث في ${cityName} غالباً 3–5 ساعات حسب الاتساخ؛ الفيلا أطول — يُحدد التقدير عند الحجز.`,
        },
        {
          question: `هل تنظفون مداخل العمائر في ${hood}؟`,
          answer: "نعم ضمن نطاق متفق عليه للسلالم والمداخل المشتركة إن كان الوصول مسموحاً وآمناً.",
        },
        {
          question: `ماذا أجهّز قبل وصول الفريق إلى ${cityName}؟`,
          answer: "تفريغ أسطح المطبخ، تحديد غرف لا تُفتح، وإبلاغنا بوجود حيوانات أليفة أو حساسية من روائح.",
        },
        {
          question: `هل التنظيف الدوري في ${hood} أرخص من زيارة واحدة؟`,
          answer: "الزيارات المنتظمة غالباً أسرع لأن الفريق يعرف المسار؛ السعر يُناقش حسب التكرار والمساحة.",
        },
      ],
    ]),
    preparationBullets: pickVariant(seed, "house-prep", [
      [`تحديد أولويات الغرف في ${hood} قبل الموعد.`, "إخفاء أغراض شخصية حساسة.", "توفير ماء وكهرباء.", "إبلاغنا بموقف السيارة."],
      [`تفريغ الثلاجة من على الباب إن طُلب تنظيف عميق للمطبخ.`, `ذكر وجود مكيف مركزي في ${cityName}.`, "تحديد مدخل الخدمة.", "تأكيد وقت انتهاء متوقع."],
    ]),
  };
}

function buildDeepHomeCleaning(ctx: BuildCtx): ServiceLocationPageContent {
  const { hood, cityName, seed } = ctx;
  return {
    localIntro: [
      `تنظيف عميق للمنازل في حي ${hood} — يشمل زوايا، خلف الأثاث، ودهون المطبخ بعد التشطيب أو الإيجار. ${ctx.landmarks}`,
      `في ${cityName} يُطلب التنظيف العميق غالباً قبل السكن، بعد مناسبة، أو عند تراكم غبار مواسم الرياح.`,
    ],
    sections: [
      localContextSection(ctx, "التنظيف العميق"),
      {
        heading: `متى يُطلب التنظيف العميق في ${hood}؟`,
        paragraphs: pickVariant(seed, "deep-when", [
          [
            `بعد التشطيب في ${cityName}: غبار جص ودهان على الأرضيات والنوافذ قبل فرش الأثاث.`,
            `قبل عيد أو زواج: مجالس وحمامات ضيوف في ${hood} تحتاج وقتاً إضافياً.`,
          ],
          [
            `بعد إيجار طويل: المستأجر الجديد في ${hood} يبدأ بتنظيف عميق قبل الانتقال.`,
            `بعد أعمال بناء قريبة: غبار ناعم يدخل من النوافذ المفتوحة.`,
          ],
          [
            `عند تراكم دهون المطبخ المفتوح على الخزائن في شقق ${cityName}.`,
            `بعد فترة إغلاق المنزل (سفر أو ترميم جزئي).`,
          ],
          [
            `قبل تصوير عقار للبيع في ${hood}.`,
            `عند ملاحظة روائح في السجاد أو الستائر — قد يُدمج مع غسيل منفصل.`,
          ],
        ]),
      },
      {
        heading: `خطوات التنظيف العميق داخل ${hood}`,
        paragraphs: [
          cityDustNote(ctx.citySlug, cityName),
          `نبدأ من الأعلى (ثريات، الكورنيس، أعلى الخزائن) ثم ننزل للأرضيات في ${hood} لتجنب إعادة اتساخ ما تم تنظيفه.`,
        ],
        bullets: pickVariant(seed, "deep-steps", [
          ["إزالة غبار الزوايا والمفاتيح.", "تنظيف داخل الخزائن عند الطلب.", "فرك جوانب الحمام.", "مسح النوافذ الداخلية ضمن النطاق."],
          ["شفط تحت الأثاث القابل للتحريك.", "تنظيف شفاط المطبخ.", "تلميع أسطح المطبخ.", "تعقيم مقابض الأبواب."],
        ]),
      },
      schedulingSection(ctx, "التنظيف العميق"),
      crossServiceSection(ctx, [
        ["غسيل سجاد بعد التنظيف العميق.", "مكافحة حشرات للمطبخ بعد إزالة الدهون."],
        ["تنظيف خزان بعد إغلاق طويل.", "تنظيف واجهة إن كان الغبار على النوافذ الخارجية."],
      ]),
    ],
    faqs: [
      {
        question: `هل التنظيف العميق مناسب بعد التشطيب في ${hood}؟`,
        answer: "نعم — من أكثر الطلبات: إزالة غبار البناء قبل السكن.",
      },
      {
        question: `كم يوماً يحتاج تنظيف عميق لفيلا في ${cityName}؟`,
        answer: "فيلا متوسطة قد تحتاج فريقاً ليوم كامل؛ الشقة أقل — يُحدد بعد وصف المساحة.",
      },
      {
        question: "هل يمكن دمج التنظيف العميق مع غسيل سجاد؟",
        answer: `غالباً نعم في ${hood} بجدولة متتابعة مع مراعاة التهوية والجفاف.`,
      },
      {
        question: "ماذا لا يشمل التنظيف العميق؟",
        answer: "أعمال كهرباء، سباكة، أو إزالة مخلفات بناء ثقيلة — تُحدد حدود الخدمة قبل الدفع.",
      },
    ],
    preparationBullets: [
      `إفراغ خزائن المطبخ إن طُلب تنظيفها من الداخل في ${hood}.`,
      "تحريك أثاث خفيف قابل للسحب أو تنسيق مع الفريق.",
      "توفير تهوية جيدة بعد التنظيف الرطب.",
      "ذكر وجود أطفال أو حساسية.",
    ],
  };
}

function buildCarpetCleaning(ctx: BuildCtx): ServiceLocationPageContent {
  const { hood, cityName, seed } = ctx;
  return {
    localIntro: [
      `غسيل سجاد وموكيت في حي ${hood} — شفط عميق، معالجة بقع، وتجفيف مناسب لسماكة النسيج. ${ctx.landmarks}`,
      `في ${cityName} يختلف نوع السجاد (تركي، إيراني، صناعي)؛ المعاينة تحدد طريقة الغسل والمدة.`,
    ],
    sections: [
      localContextSection(ctx, "غسيل السجاد"),
      {
        heading: `اعتبارات السجاد في ${hood}`,
        paragraphs: pickVariant(seed, "carpet-local", [
          [
            `السجاد الكبير في صالات ${cityName} قد يحتاج مساحة للتمديد والتهوية — نناقش ذلك عند الحجز.`,
            `بقع الشاي والقهوة في مجالس ${hood} تستجيب أفضل إن عُولجت قبل تجفُّلها.`,
          ],
          [
            `الموكيت المثبت على الدرج في ${hood} يحتاج معدات مختلفة عن السجاد المنفصل.`,
            `السجاد الفاتح يظهر غبار ${cityName} أسرع — شفط دوري يطيل فترة بين الغسلات.`,
          ],
          [
            `بعد المناسبات في ${hood} يتكرر طلب غسيل سجاد الصالة مع الكنب.`,
            `الرطوبة والتهوية تحددان وقت العودة للمشي على السجاد.`,
          ],
          [
            `سجاد غرف الأطفال في ${cityName}: نفضّل مواد أخف رائحة عند الإبلاغ مسبقاً.`,
            `حواف السجاد عند المداخل تجمع تراباً — تنظيف الحافة جزء من الجودة.`,
          ],
        ]),
      },
      {
        heading: "من الشفط إلى التجفيف",
        paragraphs: [
          "الشفط الجاف قبل أي سوائل يمنع دفع الأوساخ للداخل.",
          `في ${hood} التكييف والنوافذ المفتوحة تسرّع الجفاف — ننصح بتهوية بعد الغسل.`,
        ],
        bullets: ["معاينة نوع النسيج.", "اختبار بقع حساسة.", "شفط عميق.", "غسل/بخار حسب الحالة.", "تجفيف وتعليمات ما بعد الخدمة."],
      },
      schedulingSection(ctx, "غسيل السجاد"),
      crossServiceSection(ctx, [
        ["غسيل كنب في نفس اليوم.", "تنظيف عميق للصالة قبل الغسل."],
        ["تنظيف منزل شامل بعد غسيل السجاد.", "مكافحة حشرات إن لاحظت نشاطاً قرب السجاد."],
      ]),
    ],
    faqs: [
      {
        question: `كم يجف السجاد في ${cityName}؟`,
        answer: "من عدة ساعات إلى يوم حسب السماكة والتهوية — التكييف يسرّع العملية.",
      },
      {
        question: `هل تنقلون السجاد من ${hood}؟`,
        answer: "الأغلبية تُغسل في الموقع؛ النقل يُناقش للقطع الصغيرة أو الحالات الخاصة.",
      },
      {
        question: "هل تزيلون بقعاً قديمة؟",
        answer: "نقيّم البقع في المعاينة؛ بعضها يخف ولا يختفي بالكامل.",
      },
      {
        question: "هل غسيل السجاد آمن للأطفال؟",
        answer: "نستخدم مساراً مناسباً وننصح بتهوية قبل عودة الأطفال للغرفة.",
      },
    ],
    preparationBullets: [
      "إزالة أثاث صغير عن السجاد.",
      `تفريغ الغرفة قدر الإمكان في ${hood}.`,
      "ذكر نوع البقع وعمرها.",
      "تأكيد مصدر تهوية بعد الغسل.",
    ],
  };
}

function buildSofaCleaning(ctx: BuildCtx): ServiceLocationPageContent {
  const { hood, cityName, seed } = ctx;
  return {
    localIntro: [
      `تنظيف كنب ومجالس ومفروشات في حي ${hood} — معاينة القماش، شفط عميق، ومعالجة بقع. ${ctx.landmarks}`,
      `مجالس ${cityName} غالباً أقمشة غنية؛ البخار الجاف والتجفيف قبل استقبال الضيوف من أولويات سكان ${hood}.`,
    ],
    sections: [
      localContextSection(ctx, "تنظيف الكنب"),
      {
        heading: `أنسجة المجالس في ${hood}`,
        paragraphs: pickVariant(seed, "sofa-fabric", [
          [
            `الكنب المفتوح على المطبخ في ${cityName} يجمع دهوناً — معالجة البقع قبل التنظيف العام.`,
            `المجالس التراثية تحتاج رطوبة أقل واختباراً في زاوية مخفية.`,
          ],
          [
            `كنب الأطفال في ${hood}: نذكر حساسية الجلد أو الربو عند الحجز.`,
            `الوسائد المنفصلة تُنظف بخطوة إضافية إن طُلب.`,
          ],
          [
            `قبل ضيوف نهاية الأسبوع في ${cityName} يكثر حجز الخميس صباحاً.`,
            `الكنب الفاتح يظهر غبار ${hood} خلال أيام — الشفط الدوري يمد العمر بين الغسلات.`,
          ],
          [
            `جلد صناعي مقابل قماش: مسار مختلف تماماً — صورة أو وصف يسرّع التقييم.`,
            `روائح الحيوانات الأليفة قد تحتاج معالجة إضافية.`,
          ],
        ]),
      },
      {
        heading: "خطوات تنظيف الكنب في موقعك",
        paragraphs: [
          "شفط عميق للأتربة قبل أي سوائل — خاصة تحت الوسائد والدرز.",
          `في ${hood} نحدد وقت التجفيف حسب التهوية؛ فتح نافذة أفضل من شمس حارقة مباشرة على القماش.`,
        ],
        bullets: ["معاينة نوع القماش.", "اختبار لون.", "معالجة بقع.", "تنظيف عام.", "تهوية وتعليمات."],
      },
      schedulingSection(ctx, "تنظيف الكنب"),
      crossServiceSection(ctx, [
        ["غسيل سجاد الصالة مع الكنب.", "تنظيف ستائر أو مسارات الغبار."],
        ["تنظيف منزل قبل المناسبة.", "مكافحة حشرات إن لاحظت نشاطاً خلف الأثاث."],
      ]),
    ],
    faqs: [
      {
        question: `هل تنظفون مجالس تراثية في ${hood}؟`,
        answer: "نعم بمواد أقل رطوبة واختبار في زاوية مخفية عند الحاجة.",
      },
      {
        question: "كم يستغرق تجفيف الكنب؟",
        answer: `يعتمد على القماش والتهوية في ${cityName} — غالباً من ساعات إلى يوم.`,
      },
      {
        question: "هل تزيلون بقع الشاي والقهوة؟",
        answer: "البقع الحديثة أفضل؛ القديمة قد تخف دون اختفاء كامل.",
      },
      {
        question: `هل الخدمة في ${hood} تشمل كنب السيارة؟`,
        answer: "التركيز على المنزل؛ كنب السيارة يُناقش كطلب منفصل.",
      },
    ],
    preparationBullets: [
      "إزالة وسائد وأغطية قابلة للغسل.",
      "ذكر نوع البقع.",
      `تأمين تهوية في ${hood}.`,
      "إبلاغنا بوجود أطفال رضع.",
    ],
  };
}

function buildFacadeCleaning(ctx: BuildCtx): ServiceLocationPageContent {
  const { hood, cityName, seed } = ctx;
  return {
    localIntro: [
      `تنظيف واجهات زجاجية وحجرية في حي ${hood} — إزالة غبار وأملاح وآثار مطر دون إتلاف المواد. ${ctx.landmarks}`,
      `ارتفاع المبنى ونوع الواجهة في ${cityName} يحددان معدات السلامة ومدة التنفيذ.`,
    ],
    sections: [
      localContextSection(ctx, "تنظيف الواجهات"),
      {
        heading: `واجهات ${hood}: زجاج، حجر، أو مختلط`,
        paragraphs: pickVariant(seed, "facade-type", [
          [
            `أبراج ${cityName} بزجاج كبير تحتاج مسحاً منهجياً من الأعلى للأسفل.`,
            `الواجهات الحجرية لا تتحمل ضغطاً عالياً على الفواصل — نختبر منطقة صغيرة أولاً.`,
          ],
          [
            `فلل ${hood} بارتفاعين: سلم أو منصة قد تكفي دون رافعة.`,
            `آثار مياه من الري على الزجاج الأرضي شائعة — معالجة منفصلة عن الغبار.`,
          ],
          [
            `واجهات تجارية في ${cityName} قرب ${hood}: جدولة بعد ساعات الدوام.`,
            `إطارات النوافذ الألومنيوم تجمع غباراً — مسحها جزء من المظهر النهائي.`,
          ],
          [
            `بعد عاصفة غبارية في ${cityName} يعود تراكم سريع على الشرفات.`,
            `نوافذ منزلية من الداخل يمكن طلبها ضمن نفس الزيارة.`,
          ],
        ]),
      },
      {
        heading: "السلامة والتنسيق",
        paragraphs: [
          `نقيّم الوصول للموقع في ${hood}: موقف للمعدات، تداخل مع جيران، أو تصريح من إدارة العمارة.`,
          "الضغط العالي يُستخدم بحذر وبالاتفاق — ليس افتراضياً على كل الأسطح.",
        ],
      },
      schedulingSection(ctx, "تنظيف الواجهة"),
      crossServiceSection(ctx, [
        ["مسح نوافذ داخلية.", "تنظيف بلاط مدخل خارجي."],
        ["تنظيف فناء بعد غبار.", "تنظيف واجهة متجر أو مكتب."],
      ]),
    ],
    faqs: [
      {
        question: `هل تنظفون واجهات عالية في ${hood}؟`,
        answer: "نعم بعد تقييم الارتفاع ونوع الزجاج/الحجر ومعدات السلامة.",
      },
      {
        question: "هل الضغط العالي آمن؟",
        answer: "يُستخدم بدرجة مناسبة وباختبار — بعض الحجر والفواصل حساسة.",
      },
      {
        question: `كم مرة أنظف الواجهة في ${cityName}؟`,
        answer: "كل 2–4 أشهر حسب الغبار والموقع — قرب طرق رئيسية أسرع اتساخاً.",
      },
      {
        question: "هل تحتاج تصريح من العمارة؟",
        answer: "في بعض العمائر نعم — ننسّق معك قبل الموعد.",
      },
    ],
    preparationBullets: [
      "إبلاغنا بارتفاع تقريبي للمبنى.",
      `تأكيد موقف أو مدخل معدات في ${hood}.`,
      "ذكر نوع الواجهة (زجاج/حجر/مختلط).",
      "إبلاغ جيران أو حارس إن لزم.",
    ],
  };
}

function buildWaterTankCleaning(ctx: BuildCtx): ServiceLocationPageContent {
  const { hood, cityName, seed } = ctx;
  return {
    localIntro: [
      `تنظيف خزانات مياه في حي ${hood} — تقليل ترسبات ومواد عضوية لتحسين جودة الماء. ${ctx.landmarks}`,
      cityClimateNote(ctx.citySlug),
    ],
    sections: [
      localContextSection(ctx, "تنظيف الخزانات"),
      highlightSection(ctx, "water-tank-cleaning", `خزانات المياه في ${hood}`, [
        `نوع الخزان (علوي/أرضي) وموقعه في ${cityName} يُحددان مدة الخدمة وطريقة التصريف.`,
      ]),
      {
        heading: `قبل وبعد تنظيف الخزان في ${hood}`,
        paragraphs: pickVariant(seed, "tank-after", [
          [
            "تجنّب شرب أو طبخ من الخزان حتى يُعلَن جاهزيته بعد الشطف المتفق.",
            `في ${cityName} حرارة الصيف تزيد ترسبات — دورة سنوية أو نصف سنوية شائعة.`,
          ],
          [
            "ماء أول ملء قد يحمل راسباً خفيفاً — شطفة إضافية قصيرة أحياناً.",
            `الوصول للسطح في ${hood} يحتاج تنسيقاً مع الحارس أو المالك.`,
          ],
          [
            "بعد أعمال بناء قرب الخزان: فحص الغطاء والفتحات.",
            "خزان مشترك في العمارة: تنسيق مع الجيران لتوقف مؤقت للماء.",
          ],
          [
            "فلتر منزلي قد يحتاج دورة بعد التنظيف — راجع دليل الصانع.",
            `صور الخزان قبل الزيارة تقلل المفاجآت في ${cityName}.`,
          ],
        ]),
      },
      schedulingSection(ctx, "تنظيف الخزان"),
      crossServiceSection(ctx, [
        ["تنظيف منزل بعد إعادة تعبئة الخزان.", "فحص تسريبات مع سبّاك إن لزم."],
        ["تنظيف خزانين (رئيسي واحتياطي).", "تعقيم إضافي عند طلب."],
      ]),
    ],
    faqs: [
      {
        question: `كم مرة أنظف الخزان في ${cityName}؟`,
        answer: "غالباً مرة إلى مرتين سنوياً — الفريق يوصي بعد المعاينة.",
      },
      {
        question: `هل الخدمة تشمل ${hood} بالكامل؟`,
        answer: "نعم ضمن نطاق التغطية؛ أرسل موقعك للتأكيد.",
      },
      {
        question: "ماذا أجهّز قبل الزيارة؟",
        answer: "تحديد موقع الخزان، إبلاغنا بمضخة أو محبس حساس، وتفريغ استخدام الماء للشرب.",
      },
      {
        question: "هل تنظفون خزانات بلاستيك ومعدن؟",
        answer: "نعم — المادة تحدد أدوات ومواد التنظيف.",
      },
    ],
    preparationBullets: [
      "تحديد نوع وموقع الخزان.",
      "تنسيق الوصول للسطح.",
      "إبلاغ عن تسريبات سابقة.",
      `تأكيد وقت إعادة التعبئة في ${hood}.`,
    ],
  };
}

function buildPestControl(ctx: BuildCtx): ServiceLocationPageContent {
  const { hood, cityName, seed } = ctx;
  return {
    localIntro: [
      `مكافحة حشرات ورش آمن في حي ${hood} — تحديد النوع والموقع قبل المعالجة. ${ctx.landmarks}`,
      `في ${cityName} يختلف نشاط الحشرات بين المواسم؛ وصف المكان يسرّع التشخيص.`,
    ],
    sections: [
      localContextSection(ctx, "مكافحة الحشرات"),
      highlightSection(ctx, "pest-control", `رش حشرات في ${hood}`, [
        `المطبخ والحمام ومداخل الخدمة في ${cityName} من أكثر نقاط دخول الصراصير — التقييم يبدأ من هناك.`,
      ]),
      {
        heading: `خطة مكافحة في ${hood} وليس رشة عامة`,
        paragraphs: pickVariant(seed, "pest-plan", [
          [
            "تحديد نوع الحشرة (صراصير، نمل، بق…) يوجّه المنتج والتركيز.",
            `وجود أطفال أو حيوانات في ${hood} يغيّر التوقيت ومدة التهوية.`,
          ],
          [
            "النمل يتبع مساراً — إغلاق مصدر جذب أو تجفيف ركن قد يكون جزءاً من الحل.",
            `حدائق ${cityName} قرب ${hood}: الري والمخلفات العضوية تجذب حشرات.`,
          ],
          [
            "مكاتب منزلية في الشقق: جدولة خارج حضور العملاء.",
            "رطوبة الشرفات — تنظيف تجمعات الماء بين الزيارات.",
          ],
          [
            "بعد الرش: اتباع تعليمات التهوية قبل عودة الرضع للغرفة.",
            "لا تخلط منتجات منزلية قوية قبل وصول الفريق.",
          ],
        ]),
        bullets: [
          "راجع موسوعة الحشرات على الموقع (/guides/pest) قبل الحجز.",
          "صورة بعيدة للحشرة تساعد التقييم.",
          "إخلاء أواني مكشوفة عند الطلب.",
        ],
      },
      schedulingSection(ctx, "مكافحة الحشرات"),
      crossServiceSection(ctx, [
        ["تنظيف عميق للمطبخ قبل الرش.", "تنظيف فناء لإزالة موائل."],
        ["تنظيف خزان إن ارتبطت الروائح بالماء.", "متابعة زيارة ثانية عند الحاجة."],
      ]),
    ],
    faqs: [
      {
        question: `هل الرش آمن للأطفال في ${hood}؟`,
        answer: "يُختار المنتج والتركيز مع مدة انتظار للتهوية يوضحها الفني.",
      },
      {
        question: "أين أجد دليلاً عن نوع الحشرة؟",
        answer: "موسوعة الحشرات (/guides/pest) تغطي الأنواع الشائعة بسياق محلي.",
      },
      {
        question: `هل تحتاج زيارة متابعة في ${cityName}؟`,
        answer: "بعض الحالات نعم — يُشرح ذلك بعد الزيارة الأولى.",
      },
      {
        question: "ماذا أفعل قبل الرش؟",
        answer: "تغطية أواني مكشوفة، إبلاغ عن حساسية، وتهوية بعد التنفيذ.",
      },
    ],
    preparationBullets: [
      "وصف نوع الحشرة والغرفة.",
      "إبلاغ عن أطفال وحيوانات.",
      "إغلاق أطعمة مكشوفة.",
      `تحديد وقت مناسب في ${hood}.`,
    ],
  };
}

function buildGardenCleaning(ctx: BuildCtx): ServiceLocationPageContent {
  const { hood, cityName, seed } = ctx;
  return {
    localIntro: [
      `تنظيف حدائق وفناء في حي ${hood} — كنس، بلاط، مخلفات نباتية، وترتيب المظهر العام. ${ctx.landmarks}`,
      `فناء ${cityName} قد يكون مرصوفاً بالكامل؛ الخدمة تركز على النظافة لا تصميم المنظر.`,
    ],
    sections: [
      localContextSection(ctx, "تنظيف الحدائق"),
      highlightSection(ctx, "garden-cleaning", `فناء ${hood}`, [
        `زوايا الشواء والري في ${cityName} تجمع دهوناً وأوراقاً — تنظيف دوري يقلل روائح وجذب حشرات.`,
      ]),
      {
        heading: `فناء ${hood}: بلاط، حصى، أو مختلط`,
        paragraphs: pickVariant(seed, "garden-surface", [
          [
            cityDustNote(ctx.citySlug, cityName),
            "كنس جاف قبل أي رش يمنع طيناً على البلاط.",
          ],
          [
            `شبكة ريّ في ${hood}: نتفادى تعطيلها — اذكر موعد الري عند الحجز.`,
            "مجالس خارجية: كنس قبل غسل خفيف للأثاث.",
          ],
          [
            "مصارف ضيقة تنسد بالأوراق — جمع قبل الغسل.",
            `بعد مناسبة خارجية في ${cityName} يُفضّل جدولة سريعة.`,
          ],
          [
            "حدود مشتركة مع جيران: وقت ريّ أقل ازدحاماً.",
            "لا نستبدل مهندس مناظر — تنظيف وترتيب فقط.",
          ],
        ]),
      },
      schedulingSection(ctx, "تنظيف الحديقة"),
      crossServiceSection(ctx, [
        ["مكافحة حشرات للحوش.", "تنظيف مداخل بعد غبار."],
        ["تنظيف واجهة زجاج.", "تنظيف مجلس خارجي وكنب."],
      ]),
    ],
    faqs: [
      {
        question: `هل تشمل الخدمة فناء بدون عشب في ${hood}؟`,
        answer: "نعم — كنس وضغط معتدل للبلاط وإزالة مخلفات شائعة.",
      },
      {
        question: "هل تقصون الأشجار؟",
        answer: "التركيز على التنظيف؛ القص الكبير خارج النطاق الأساسي.",
      },
      {
        question: `متى أفضل وقت للتنظيف في ${cityName}؟`,
        answer: "صباحاً أو قبل مناسبة — تجنّب أوقات ريّ الجيران إن أمكن.",
      },
      {
        question: "هل الضغط العالي آمن على البلاط؟",
        answer: "يُختبر ويُستخدم بدرجة مناسبة — بعض البلاط رقيق.",
      },
    ],
    preparationBullets: [
      "تحديد مساحة الفناء تقريباً.",
      "إزالة عوائق صغيرة.",
      "ذكر وجود ريّ آلي.",
      `تنسيق مدخل الفناء في ${hood}.`,
    ],
  };
}

const builders: Record<string, (ctx: BuildCtx) => ServiceLocationPageContent> = {
  "house-cleaning": buildHouseCleaning,
  "deep-home-cleaning": buildDeepHomeCleaning,
  "carpet-cleaning": buildCarpetCleaning,
  "sofa-cleaning": buildSofaCleaning,
  "facade-cleaning": buildFacadeCleaning,
  "water-tank-cleaning": buildWaterTankCleaning,
  "pest-control": buildPestControl,
  "garden-cleaning": buildGardenCleaning,
};

export function getServiceLocationPageContent(
  serviceSlug: string,
  city: CityLocation,
  neighborhood: Neighborhood,
): ServiceLocationPageContent | null {
  const builder = builders[serviceSlug];
  if (!builder) return null;
  return builder(buildCtx(city, neighborhood, serviceSlug));
}
