import Image from "next/image";
import Link from "next/link";

import { images } from "@/lib/assets";
import { Icon } from "@/components/Icon";

export function SiteServices() {
  return (
    <main className="pb-24 pt-32">
      <section className="mx-auto mb-24 max-w-7xl px-8 text-right">
        <div className="max-w-3xl">
          <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-secondary">
            خدماتنا المتميزة
          </span>
          <h1 className="mb-8 font-headline text-5xl font-extrabold leading-[1.1] tracking-tight text-primary md:text-7xl">
            فن النظافة <span className="text-on-tertiary-container">بأعلى المعايير</span> العالمية
          </h1>
          <p className="text-lg font-medium leading-relaxed text-on-surface-variant">
            نقدم في السعودية للتنظيف مجموعة شاملة من الخدمات المصممة بعناية لتعيد لمنزلك رونقه وصحته، باستخدام
            تقنيات متطورة تحترم المساحة والبيئة.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="group relative overflow-hidden rounded-full bg-surface-container-lowest shadow-[0_12px_40px_rgba(30,58,138,0.06)] transition-all duration-500 hover:-translate-y-1 md:col-span-8">
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col justify-center p-12 text-right">
                <Icon name="villa" className="mb-6 text-4xl text-primary" />
                <h2 className="mb-4 text-3xl font-bold text-primary">تنظيف الفلل والقصور</h2>
                <p className="mb-8 leading-relaxed text-on-surface-variant">
                  خدمة شاملة تغطي كل زاوية من مسكنك، من تلميع الرخام إلى تنظيف الواجهات الزجاجية الشاهقة،
                  لضمان بيئة ملكية تليق بك.
                </p>
                <Link
                  href="/contact"
                  className="group/link flex cursor-pointer items-center gap-2 font-bold text-secondary"
                >
                  <span>اكتشف المزيد</span>
                  <Icon name="arrow_back" className="text-sm transition-transform group-hover/link:-translate-x-2" />
                </Link>
              </div>
              <div className="relative h-64 overflow-hidden md:h-full">
                <Image
                  src={images.servicesVilla}
                  alt="داخل فيلا فاخرة بنوافذ عالية وإضاءة طبيعية وأرضيات رخامية نظيفة"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          <div className="group flex flex-col rounded-full bg-surface-container-low p-8 text-right shadow-none transition-all duration-500 hover:bg-surface-container-lowest hover:shadow-[0_12px_40px_rgba(30,58,138,0.06)] md:col-span-4">
            <div className="mb-6 h-48 overflow-hidden rounded-full">
              <Image
                src={images.servicesMajlis}
                alt="مجلس سعودي تقليدي بمنسوجات غنية وإضاءة دافئة"
                width={800}
                height={400}
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
            <Icon name="chair" className="mb-4 text-3xl text-secondary" />
            <h2 className="mb-3 text-2xl font-bold text-primary">تنظيف المجالس</h2>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
              عناية فائقة بالأقمشة والمنسوجات باستخدام تقنيات البخار الجاف التي تحافظ على الألوان وتزيل أصعب
              البقع من جذورها.
            </p>
          </div>

          <div className="group relative h-[400px] overflow-hidden rounded-full shadow-[0_12px_40px_rgba(30,58,138,0.06)] md:col-span-6">
            <Image
              src={images.servicesPest}
              alt="أخصائي تعقيم يستخدم معدات حديثة في ممر مضيء يعكس معايير النظافة"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 to-transparent p-12 text-right">
              <Icon name="pest_control" className="mb-4 text-4xl text-white" />
              <h2 className="mb-2 text-2xl font-bold text-white">مكافحة الحشرات</h2>
              <p className="max-w-sm text-sm leading-relaxed text-on-primary-container">
                حلول وقائية وعلاجية آمنة بيئياً تضمن خلو منزلك من الآفات بشكل نهائي مع ضمانات معتمدة.
              </p>
            </div>
          </div>

          <div className="group flex flex-col justify-center rounded-full bg-tertiary-container p-12 text-right text-on-tertiary transition-all duration-500 hover:scale-[1.02] md:col-span-6">
            <div className="flex items-start justify-between">
              <div className="max-w-md">
                <Icon name="water_drop" className="mb-6 text-5xl text-tertiary-fixed" />
                <h2 className="mb-4 text-3xl font-bold">تنظيف وتعقيم الخزانات</h2>
                <p className="mb-8 font-medium leading-relaxed text-on-tertiary-container">
                  مياهك هي سر صحة عائلتك. نقوم بتعقيم الخزانات وإزالة الرواسب والشوائب وفق أدق المعايير
                  الصحية المحلية والعالمية.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center justify-end gap-3">
                    <span className="text-sm">إزالة الترسبات الكلسية</span>
                    <Icon name="check_circle" className="text-tertiary-fixed" />
                  </li>
                  <li className="flex items-center justify-end gap-3">
                    <span className="text-sm">تعقيم كيميائي آمن</span>
                    <Icon name="check_circle" className="text-tertiary-fixed" />
                  </li>
                  <li className="flex items-center justify-end gap-3">
                    <span className="text-sm">اختبار جودة المياه</span>
                    <Icon name="check_circle" className="text-tertiary-fixed" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-8">
        <div className="relative overflow-hidden rounded-full bg-surface-container-high p-16 text-center md:p-24">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl">جاهز لتحويل منزلك؟</h2>
            <p className="mb-10 font-medium leading-relaxed text-on-surface-variant">
              احجز موعدك اليوم واستمتع بتجربة تنظيف استثنائية تعيد الصفاء والراحة لمساحتك الخاصة.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#book"
                className="rounded-full bg-primary px-10 py-4 font-bold text-white shadow-lg transition-all hover:shadow-xl"
              >
                احجز الآن
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-surface-container-lowest px-10 py-4 font-bold text-primary transition-all hover:bg-white"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
          <div
            className="absolute end-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-secondary/5 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 start-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />
        </div>
      </section>
    </main>
  );
}
