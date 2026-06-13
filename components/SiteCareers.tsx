import Link from "next/link";

import { Icon } from "@/components/Icon";
import { brandEmail, brandNameAr, brandWhatsapp } from "@/lib/brand";
import { careerOpenings } from "@/lib/careers";

export function SiteCareers() {
  const sorted = [...careerOpenings].sort((a, b) => {
    const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return db - da;
  });

  return (
    <main className="bg-slate-50 px-4 pb-24 pt-28 sm:px-6 md:px-8">
      <div className="mx-auto max-w-4xl text-right">
        <header className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-extrabold text-secondary">انضم إلى الفريق</p>
          <h1 className="mt-2 font-headline text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl">
            وظائف شركة تنظيف بالرياض
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-on-surface-variant md:text-lg">
            نبحث عن فنيين ومشرفين يلتزمون بالجودة في التنظيف ومكافحة الحشرات. تصفّح الشواغر أو أرسل سيرتك
            لفريق الموارد البشرية.
          </p>
        </header>

        <section className="mt-10 grid gap-6 sm:grid-cols-2" aria-labelledby="careers-benefits-heading">
          <h2 id="careers-benefits-heading" className="sr-only">
            لماذا تعمل معنا
          </h2>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <Icon name="groups_3" className="text-2xl" />
            </div>
            <h3 className="font-headline text-lg font-bold text-primary">بيئة عمل احترافية</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              فرق مدربة، سلامة مهنية، وتنسيق واضح للمواعيد والمهام.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <Icon name="trending_up" className="text-2xl" />
            </div>
            <h3 className="font-headline text-lg font-bold text-primary">نمو ضمن قطاع الخدمات</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              قطاع ينمو مع اقتصاد المملكة، مع فرص للتعلّم المستمر على أرض الميدان.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="open-roles-heading">
          <h2 id="open-roles-heading" className="font-headline text-2xl font-extrabold text-primary">
            الوظائف المتاحة
          </h2>

          {sorted.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-on-surface-variant">
              <Icon name="work" className="mx-auto mb-4 text-4xl text-primary/40" />
              <p className="font-headline text-lg font-bold text-primary">لا توجد شواغر منشورة حالياً</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed">
                يمكنك التواصل معنا عبر البريد أو واتساب في قسم «طريقة التقديم» أدناه لإرسال سيرتك الذاتية، وسنتواصل معك عند توفر فرص
                مناسبة.
              </p>
            </div>
          ) : (
            <ul className="mt-8 grid gap-6">
              {sorted.map((job) => (
                <li key={job.id}>
                  <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-secondary">
                      {job.department ? <span>{job.department}</span> : null}
                      {job.location ? <span>{job.location}</span> : null}
                      {job.employmentType ? <span>{job.employmentType}</span> : null}
                    </div>
                    <h3 className="mt-3 font-headline text-xl font-bold text-primary">{job.title}</h3>
                    <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-on-surface-variant">
                      {job.description}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          className="mt-14 rounded-2xl border border-primary/15 bg-gradient-to-br from-[#062a73]/95 to-[#031a49] p-8 text-white shadow-lg sm:p-10"
          aria-labelledby="apply-heading"
        >
          <h2 id="apply-heading" className="font-headline text-2xl font-extrabold">
            طريقة التقديم
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-white/90">
            أرسل سيرتك الذاتية أو نبذة عن خبرتك عبر البريد مع وضوح المسمى الوظيفي المطلوب في عنوان الرسالة، أو تواصل معنا
            عبر واتساب لاستكمال البيانات الأولية.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-end">
            <a
              href={`mailto:${brandEmail}?subject=${encodeURIComponent(`طلب توظيف — ${brandNameAr}`)}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#062a73] shadow-md transition hover:bg-white/95"
            >
              <Icon name="mail" className="text-xl" />
              إرسال عبر البريد
            </a>
            <a
              href={brandWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <Icon name="chat" className="text-xl" />
              واتساب
            </a>
          </div>
          <p className="mt-6 text-center text-sm text-white/75 sm:text-right">
            <Link href="/contact" className="font-bold text-sky-200 underline-offset-2 hover:underline">
              صفحة اتصل بنا
            </Link>
            {" للنماذج والبيانات الكاملة."}
          </p>
        </section>
      </div>
    </main>
  );
}
