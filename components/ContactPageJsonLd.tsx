import {
  brandAddressAr,
  brandEmail,
  brandNameAr,
  brandPhoneDisplay,
  brandWorkingHoursAr,
} from "@/lib/brand";

/** FAQ لصفحة اتصل بنا — يدعم ظهور الأسئلة التوضيحية في نتائج البحث عند قبول جوجل للصفحة */
export function ContactPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `كيف أتواصل مع ${brandNameAr} لطلب التنظيف أو الاستفسار؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `يمكنكم الاتصال على الرقم ${brandPhoneDisplay}، أو مراسلتنا عبر واتساب، أو البريد الإلكتروني ${brandEmail}. نستقبل طلبات الحجز والاستفسارات خلال أوقات العمل المعروضة في صفحة اتصل بنا.`,
        },
      },
      {
        "@type": "Question",
        name: `ما هي خدمات ${brandNameAr} التي يمكن الاستفسار عنها؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `نوفر تنظيف المنازل والمكاتب، التنظيف العميق، غسيل السجاد والموكيت، تنظيف الواجهات الزجاجية، ومكافحة الحشرات بمواد آمنة وفريق مدرب، مع إمكانية التنسيق وفق مدينتكم وحيّكم ضمن مناطق التغطية.`,
        },
      },
      {
        "@type": "Question",
        name: "هل يمكن تحديد موعد زيارة أو معاينة قبل الخدمة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم؛ يمكنكم طرح ذلك عبر الهاتف أو واتساب أو البريد، وسيقوم الفريق بتوجيهكم وفق سياسة المواعيد المتاحة.",
        },
      },
      {
        "@type": "Question",
        name: `ما هو عنوانكم وساعات العمل؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `يقع مقر خدماتنا في ${brandAddressAr}. أوقات الاستجابة للاستفسارات والحجز: ${brandWorkingHoursAr}.`,
        },
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
