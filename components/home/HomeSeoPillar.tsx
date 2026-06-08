import Link from "next/link";

import { Icon } from "@/components/Icon";
import { brandPhone, brandPhoneDisplay, brandWhatsapp } from "@/lib/brand";
import { homePillarSections } from "@/lib/content/home-pillar";

const linkClass =
  "font-bold text-secondary underline-offset-2 hover:underline";

/** عمود محتوى SEO غني على الصفحة الرئيسية — 800+ كلمة مع روابط داخلية وCTA */
export function HomeSeoPillar() {
  return (
    <section
      className="border-t border-slate-200 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-950 sm:px-6 md:px-8 md:py-20"
      aria-labelledby="home-pillar-heading"
    >
      <div className="mx-auto max-w-3xl text-right lg:max-w-4xl">
        <p className="text-sm font-extrabold text-secondary">دليل شامل</p>
        <h2
          id="home-pillar-heading"
          className="mt-2 font-headline text-2xl font-extrabold text-primary sm:text-3xl md:text-4xl"
        >
          شركة تنظيف ومكافحة حشرات بالرياض — كل ما تحتاج معرفته
        </h2>
        <p className="mt-5 text-sm font-medium leading-[1.95] text-on-surface-variant sm:text-base">
          إن كنت تبحث عن{" "}
          <strong className="text-primary">شركة تنظيف بالرياض</strong> موثوقة تجمع
          بين النظافة المنزلية ومكافحة الحشرات، فهذا الدليل يلخّص خدماتنا، طريقة
          عملنا، والأحياء التي نغطيها. للحجز السريع{" "}
          <a href={brandWhatsapp} className={linkClass} target="_blank" rel="noopener noreferrer">
            تواصل عبر واتساب
          </a>{" "}
          أو اتصل على{" "}
          <a href={`tel:${brandPhone}`} className={linkClass} dir="ltr">
            {brandPhoneDisplay}
          </a>
          .
        </p>

        <div className="mt-10 space-y-10">
          {homePillarSections.map((section) => (
            <article key={section.heading}>
              <h3 className="font-headline text-xl font-extrabold text-primary md:text-2xl">
                {section.heading}
              </h3>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-sm font-medium leading-[1.95] text-on-surface-variant sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}

          <article>
            <h3 className="font-headline text-xl font-extrabold text-primary md:text-2xl">
              أحياء الرياض التي نخدمها
            </h3>
            <p className="mt-4 text-sm font-medium leading-[1.95] text-on-surface-variant sm:text-base">
              نغطي أحياء شمال الرياض (النرجس، الياسمين، الملقا، حطين)، وسطها
              (العليا، الملك فهد، الملز، العقيق)، وشرقها (النخيل، المروج، القدس،
              الرمال). لكل حي صفحة مخصّصة على{" "}
              <Link href="/cleaning" className={linkClass}>
                موسوعة تنظيف الأحياء
              </Link>{" "}
              و{" "}
              <Link href="/areas" className={linkClass}>
                مناطق التغطية
              </Link>
              . حرارة الصيف في الرياض تسرّع تراكم الغبار على الشرفات والواجهات —
              جدولة تنظيف دوري للمداخل والنوافذ يقلّل ما تراه على الأثاث
              الداخلي.
            </p>
          </article>

          <article>
            <h3 className="font-headline text-xl font-extrabold text-primary md:text-2xl">
              اختر خدمتك وابدأ الحجز
            </h3>
            <p className="mt-4 text-sm font-medium leading-[1.95] text-on-surface-variant sm:text-base">
              تصفّح{" "}
              <Link href="/services/cleaning-company-riyadh" className={linkClass}>
                شركة تنظيف بالرياض
              </Link>
              ،{" "}
              <Link href="/services/house-cleaning" className={linkClass}>
                تنظيف منازل
              </Link>
              ،{" "}
              <Link href="/services/pest-control" className={linkClass}>
                مكافحة حشرات
              </Link>
              ،{" "}
              <Link href="/services/carpet-cleaning-riyadh" className={linkClass}>
                غسيل سجاد
              </Link>
              ، أو{" "}
              <Link href="/services/deep-home-cleaning" className={linkClass}>
                تنظيف عميق
              </Link>
              . استخدم{" "}
              <Link href="/estimate" className={linkClass}>
                حاسبة تقدير السعر
              </Link>{" "}
              للحصول على فكرة أولية، ثم أكّد التفاصيل عبر{" "}
              <Link href="/contact" className={linkClass}>
                صفحة اتصل بنا
              </Link>
              . فريقنا جاهز لاستقبال طلبك اليوم — شركة تنظيف بالرياض التي
              تستحق أن تكون خيارك الأول.
            </p>
          </article>
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <p className="text-sm font-semibold leading-8 text-on-surface-variant md:text-base">
            جاهز لحجز شركة تنظيف بالرياض؟ معاينة مجانية وتقدير واضح قبل التنفيذ.
          </p>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-95"
          >
            احجز الآن
            <Icon name="arrow_back" className="text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
}
