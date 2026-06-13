#!/usr/bin/env node
/** One-off audit: static page titles/descriptions after fitMetaTitle + expandMetaDescription */

const brandNameAr = "السعودية للتنظيف";
const META_TITLE_MIN_LEN = 60;
const META_TITLE_MAX_LEN = 65;
const META_DESCRIPTION_TARGET_LEN = 160;

function trimAtNaturalBreak(text, maxLen) {
  const t = text.trim();
  if (t.length <= maxLen) return t;
  const cut = t.slice(0, maxLen - 1).trimEnd();
  const lastSep = Math.max(cut.lastIndexOf("|"), cut.lastIndexOf("—"), cut.lastIndexOf("–"));
  const lastSpace = cut.lastIndexOf(" ");
  const breakAt = lastSep > maxLen * 0.45 ? lastSep : lastSpace > maxLen * 0.55 ? lastSpace : cut.length;
  return `${cut.slice(0, breakAt > 0 ? breakAt : cut.length).trimEnd()}…`;
}

function fitMetaTitle(title) {
  const t = title.trim().replace(/\s+/g, " ");
  if (t.length >= META_TITLE_MIN_LEN && t.length <= META_TITLE_MAX_LEN) return t;
  if (t.length > META_TITLE_MAX_LEN) return trimAtNaturalBreak(t, META_TITLE_MAX_LEN);
  const candidates = [t];
  const pads = [`| ${brandNameAr}`, "— شركة تنظيف بالرياض", "بالرياض | السعودية للتنظيف", "في الرياض"];
  for (const pad of pads) {
    if (t.includes(brandNameAr) && pad.includes(brandNameAr) && pad.startsWith("|")) continue;
    candidates.push(`${t} ${pad}`.replace(/\s+/g, " ").trim());
  }
  const inRange = candidates.filter((c) => c.length >= META_TITLE_MIN_LEN && c.length <= META_TITLE_MAX_LEN);
  if (inRange.length) return inRange.sort((a, b) => b.length - a.length)[0];
  const underMax = candidates.filter((c) => c.length <= META_TITLE_MAX_LEN);
  if (underMax.length) return underMax.sort((a, b) => b.length - a.length)[0];
  return trimAtNaturalBreak(candidates.sort((a, b) => b.length - a.length)[0], META_TITLE_MAX_LEN);
}

function expandMetaDescription(text, cta = "احجز معاينة مجانية عبر واتساب.") {
  let t = text.trim().replace(/\s+/g, " ");
  if (t.length > META_DESCRIPTION_TARGET_LEN) return trimAtNaturalBreak(t, META_DESCRIPTION_TARGET_LEN);
  if (t.length >= 148) return t;
  if (t && !/[.!?…]$/.test(t)) t = `${t}.`;
  const padded = `${t} ${cta}`.trim();
  if (padded.length <= META_DESCRIPTION_TARGET_LEN) return padded;
  return trimAtNaturalBreak(t, META_DESCRIPTION_TARGET_LEN);
}

const pages = [
  ["home", "شركة تنظيف بالرياض | منازل وسجاد ومكافحة حشرات", "شركة تنظيف ومكافحة حشرات بالرياض — تنظيف منازل وفلل، غسيل سجاد، ورش مبيدات في كل الأحياء. فريق مدرب نفّذ +500 مشروع. احجز معاينة مجانية عبر واتساب الآن."],
  ["services", "خدمات تنظيف بالرياض | منازل وسجاد ومكافحة حشرات بالرياض", "خدمات تنظيف بالرياض — تنظيف منازل وفلل، غسيل سجاد، تنظيف واجهات، ومكافحة حشرات. 14 خدمة تفصيلية بفريق مدرب. احجز معاينة مجانية عبر واتساب الآن."],
  ["contact", "اتصل بنا | شركة تنظيف بالرياض — حجز ومعاينة مجانية", "اتصل بشركة تنظيف بالرياض — هاتف وواتساب وحجز تنظيف منازل ومكافحة حشرات في كل الأحياء. معاينة مجانية للمساحات الكبيرة. رد سريع خلال ساعات العمل."],
  ["blog", "مدونة تنظيف بالرياض | نصائح منازل ومكافحة حشرات", "مقالات من السعودية للتنظيف عن تنظيف المنازل، غسيل السجاد، تنظيف الواجهات، رش الحشرات ومكافحتها في الرياض والمملكة — نصائح عملية من فريق ميداني."],
  ["news", "أخبار وطنية عن التنظيف والصحة | السعودية للتنظيف", "متابعة أخبار وطنية تهم المملكة العربية السعودية في التنظيف والصحة والبلديات — ملخصات مرتبطة بخدمات المنازل والمنشآت مع روابط للمصادر الرسمية عند توفرها."],
  ["privacy", "سياسة الخصوصية | شركة تنظيف بالرياض — السعودية للتنظيف", "سياسة الخصوصية لموقع السعودية للتنظيف: البيانات التي نجمعها عند التواصل والحجز، كيف نستخدمها، الاحتفاظ، ملفات تعريف الارتباط، وحقوقك في المملكة العربية السعودية."],
  ["terms", "شروط الاستخدام | شركة تنظيف بالرياض — السعودية للتنظيف", "شروط استخدام موقع السعودية للتنظيف: نطاق الخدمة، التقديرات الإلكترونية، سلوك المستخدم، الملكية الفكرية، حدود المسؤولية، والتواصل الرسمي في المملكة العربية السعودية."],
  ["careers", "وظائف شركة تنظيف بالرياض | انضم لفريقنا — السعودية للتنظيف", "انضم إلى فريق السعودية للتنظيف في الرياض: وظائف تنظيف ومكافحة حشرات، بيئة عمل آمنة، وتقديم عبر البريد أو واتساب. فرص للفنيين والمشرفين الميدانيين."],
  ["areas", "مناطق تغطية تنظيف بالرياض | أحياء العاصمة — السعودية للتنظيف", "مناطق تغطية شركة تنظيف بالرياض — أحياء شمال ووسط وشرق العاصمة. اختر حيك واحجز تنظيف منازل أو مكافحة حشرات. تواصل عبر واتساب للمعاينة المجانية."],
  ["cleaning", `تنظيف منازل بالرياض حسب الحي | موسوعة أحياء — ${brandNameAr}`, "تنظيف منازل وشقق في كل أحياء الرياض — صفحة مخصّصة لكل حي مع سياق محلي ونصائح قبل الحجز. شركة تنظيف بالرياض. احجز معاينة مجانية عبر واتساب الآن."],
  ["estimate", "حاسبة سعر تنظيف بالرياض | تقدير مجاني", "احسب تقدير سعر تنظيف منازل ومكافحة حشرات وتعقيم خزانات في الرياض — أداة مجانية ثم أرسل عبر واتساب. بدون التزام حتى يرد الفريق."],
  ["about", `من نحن | ${brandNameAr} — شركة تنظيف ومكافحة حشرات`, `${brandNameAr}: تأسست في الرياض، أكثر من 500 مشروع تنظيف ومكافحة، تغطية 3 مدينة، فريق مدرب ومعدات بخار وشفط وغسيل سجاد. تعرّف على خدماتنا ومعداتنا.`],
  ["team", `فريق العمل | ${brandNameAr} — عمالة مدربة في الرياض`, `تعرّف على فريق ${brandNameAr}: قيادة تقنية، مهندسون وفنيو تنظيف ومكافحة حشرات في الرياض. أسماء ومسميات وظيفية واضحة لرفع الثقة قبل الزيارة.`],
  ["pest-hub", "موسوعة مكافحة الحشرات في الرياض", "أدلة عملية عن رش الصراصير، بق الفراش، النمل، الأرضة، الفئران والسلامة بعد الرش في الرياض. السعودية للتنظيف."],
  ["house-cleaning", "تنظيف منازل بالرياض | خدمة احترافية للشقق والفلل – السعودية للتنظيف", "تنظيف منازل بالرياض للشقق والفلل والعمارات — فريق مدرب، مواد آمنة، ومواعيد مرنة. احجز زيارة دورية أو تنظيفاً شاملاً قبل المناسبات."],
  ["neighborhood-sample", "أفضل شركة تنظيف في حي النرجس الرياض | اطلب الآن", "احجز تنظيفاً احترافياً في حي النرجس، الرياض مع السعودية للتنظيف."],
];

let titleIssues = 0;
let descIssues = 0;

for (const [slug, rawTitle, rawDesc] of pages) {
  const title = fitMetaTitle(rawTitle);
  const desc = expandMetaDescription(rawDesc);
  const tOk = title.length >= META_TITLE_MIN_LEN && title.length <= META_TITLE_MAX_LEN;
  const dOk = desc.length >= 140 && desc.length <= META_DESCRIPTION_TARGET_LEN;
  if (!tOk) titleIssues++;
  if (!dOk) descIssues++;
  const tFlag = tOk ? "OK" : "WARN";
  const dFlag = dOk ? "OK" : "WARN";
  console.log(`${slug}\n  title[${title.length}] ${tFlag}: ${title}\n  desc[${desc.length}] ${dFlag}: ${desc.slice(0, 80)}…\n`);
}

console.log(`Title issues: ${titleIssues}/${pages.length}`);
console.log(`Description issues: ${descIssues}/${pages.length}`);
