import Image from "next/image";
import Link from "next/link";

import { images } from "@/lib/assets";
import { Icon } from "@/components/Icon";
import {
  buildServiceHeroImageAlt,
  buildServiceHeroImageTitle,
  marketingLayoutImageAlt,
} from "@/lib/image-seo";
import { serviceArticles } from "@/lib/service-articles";

const [featuredService, ...otherServices] = serviceArticles;

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
            في السعودية للتنظيف نجمع بين تنظيف المنازل والمكاتب، العناية بالسجاد والمجالس، تنظيف الواجهات،
            ومكافحة الحشرات عند الحاجة — مع تخطيط مسبق يقلّل الإزعاج ويحترم طبيعة كل مساحة.
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
                  خدمة شاملة تغطي تفاصيل المسكن، من العناية بالرخام إلى الواجهات الزجاجية، بهدف مظهر أنظف وصيانة
                  أسهل على المدى القصير.
                </p>
                <Link
                  href="/contact"
                  className="group/link flex cursor-pointer items-center gap-2 font-bold text-secondary"
                >
                  <span>احجز أو استفسر عن تنظيف الفلل والقصور</span>
                  <Icon name="arrow_back" className="text-sm transition-transform group-hover/link:-translate-x-2" />
                </Link>
              </div>
              <div className="relative h-64 overflow-hidden md:h-full">
                <Image
                  src={images.servicesVilla}
                  alt={marketingLayoutImageAlt.villa}
                  title={marketingLayoutImageAlt.villa}
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
                alt={marketingLayoutImageAlt.majlis}
                title={marketingLayoutImageAlt.majlis}
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
              alt={marketingLayoutImageAlt.pest}
              title={marketingLayoutImageAlt.pest}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 to-transparent p-12 text-right">
              <Icon name="pest_control" className="mb-4 text-4xl text-white" />
              <h2 className="mb-2 text-2xl font-bold text-white">مكافحة الحشرات</h2>
                <p className="max-w-sm text-sm leading-relaxed text-on-primary-container">
                خطط وقائية وعلاجية بمواد مناسبة للاستخدام داخل المنزل أو المنشأة، مع متابعة ونصائح لتقليل عودة
                الآفات قدر الإمكان.
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

      {featuredService ? (
        <section
          className="mx-auto mt-24 max-w-7xl px-8"
          aria-labelledby="featured-service-heading"
        >
          <div className="mb-8 flex flex-col gap-3 text-right md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-extrabold text-secondary">خدمة رئيسية في الرياض</p>
              <h2
                id="featured-service-heading"
                className="font-headline mt-2 text-3xl font-extrabold text-primary md:text-4xl"
              >
                {featuredService.title}
              </h2>
            </div>
            <p className="max-w-lg text-sm font-medium leading-7 text-on-surface-variant md:text-base">
              دليل شامل للبحث عن شركة تنظيف موثوقة في العاصمة — مع تفاصيل الخدمة، الأحياء، والأسعار.
            </p>
          </div>

          <Link
            href={`/services/${featuredService.slug}`}
            className="group relative flex min-h-[min(75svh,22rem)] overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_55px_rgba(30,58,138,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(30,58,138,0.14)] sm:min-h-[24rem] md:grid md:min-h-[28rem] md:grid-cols-[1.05fr_0.95fr] md:rounded-[2.5rem]"
          >
            <div className="relative min-h-[220px] bg-primary-container/10 md:min-h-full">
              <Image
                src={featuredService.image}
                alt={buildServiceHeroImageAlt(featuredService)}
                title={buildServiceHeroImageTitle(featuredService)}
                fill
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/15 to-transparent md:bg-gradient-to-l md:from-primary/60 md:via-primary/10 md:to-transparent"
                aria-hidden
              />
            </div>
            <div className="flex flex-col justify-center p-7 text-right md:p-10">
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                <Icon name={featuredService.icon} className="text-2xl" />
              </span>
              <h3 className="font-headline text-2xl font-extrabold leading-snug text-primary md:text-3xl">
                {featuredService.title}
              </h3>
              <p className="mt-4 text-base font-medium leading-8 text-on-surface-variant">
                {featuredService.excerpt}
              </p>
              <ul className="mt-5 space-y-2 text-sm font-semibold text-on-surface-variant">
                {featuredService.includes.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-center justify-end gap-2">
                    <span>{item}</span>
                    <Icon name="check_circle" className="shrink-0 text-lg text-secondary" />
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-secondary">
                اقرأ التفاصيل الكاملة
                <Icon name="arrow_back" className="text-lg transition-transform group-hover:-translate-x-1" />
              </span>
            </div>
          </Link>
        </section>
      ) : null}

      <section className="mx-auto mt-16 max-w-7xl px-8 pb-8" aria-labelledby="all-services-heading">
        <h2 id="all-services-heading" className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
          صفحات خدماتنا بالتفصيل
        </h2>
        <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-on-surface-variant md:text-base">
          اختر الخدمة المناسبة لمساحتك — كل بطاقة تفتح صفحة تفصيلية بالأسعار، الخطوات، والأسئلة الشائعة.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 text-right shadow-sm transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <Icon name={service.icon} className="text-2xl" />
                </span>
                <h3 className="font-headline text-xl font-extrabold text-primary group-hover:text-secondary">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-on-surface-variant">{service.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary">
                  التفاصيل
                  <Icon name="arrow_back" className="text-base transition-transform group-hover:-translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-8 text-right" aria-labelledby="services-guide-heading">
        <h2 id="services-guide-heading" className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
          دمج الخدمات: متى يكون مفيداً؟
        </h2>
        <div className="mt-6 space-y-4 text-sm font-medium leading-[1.9] text-on-surface-variant md:max-w-4xl md:text-base">
          <p>
            كثير من المنازل والمكاتب يحتاج إلى أكثر من مهمة في نفس الفترة: مثلاً تنظيف عميق بعد فترة ازدحام، مع
            غسيل سجاد في غرف محددة، أو مكافحة حشرات بعد ملاحظة نشاط في المطبخ أو المخزن. الجمع بين الخدمات في
            خطة واحدة يقلّل تكرار دخول الفرق ويحافظ على ترتيب المنزل.
          </p>
          <p>
            للمنشآت التجارية، قد يُدمج تنظيف الواجهات مع تنظيف دوري للمداخل؛ للفلل، قد يُراعى تنظيف المجالس
            والسجاد قبل مناسبة. اطلب استشارة عبر{" "}
            <Link href="/contact" className="font-bold text-secondary underline-offset-2 hover:underline">
              صفحة التواصل
            </Link>{" "}
            لترتيب أولوياتك والوقت التقريبي.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "توفير الوقت بتقليل أيام الزيارة المنفصلة.",
            "تنسيق المواد والمعدات حسب ترتيب المهام.",
            "ملخص واحد بعد الانتهاء يوضح ما تم في كل جزء من المنزل أو المكتب.",
          ].map((text) => (
            <li
              key={text}
              className="rounded-2xl border border-slate-200/90 bg-surface-container-lowest/80 p-5 text-sm font-semibold leading-7 text-on-surface-variant dark:border-slate-800 dark:bg-slate-900/40"
            >
              {text}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-8">
        <div className="relative overflow-hidden rounded-full bg-surface-container-high p-16 text-center md:p-24">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl">جاهز لتحويل منزلك؟</h2>
            <p className="mb-10 font-medium leading-relaxed text-on-surface-variant">
              احجز موعداً أو تواصل معنا لتحديد نوع الخدمة والمدة التقريبية — نسعى إلى تجربة واضحة من البداية
              للنهاية.
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
