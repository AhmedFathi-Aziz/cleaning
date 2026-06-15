import Link from "next/link";

import { MarkdownBody } from "@/components/MarkdownBody";
import { Icon } from "@/components/Icon";
import { ServiceStickyLeadForm, ServiceStickyLeadFormMobileBar } from "@/components/ServiceStickyLeadForm";
import type { InternalPromoLink } from "@/lib/related-service-links";
import { estimateReadingMinutes, extractH2Headings } from "@/lib/markdown-utils";

type Props = {
  bodyMd: string;
  keywords?: string[];
  contextLinks?: InternalPromoLink[];
  /** لنموذج التأهيل الثابت — اختياري */
  leadForm?: { serviceTitle: string; serviceSlug: string };
  children?: React.ReactNode;
};

export function ArticleReadingShell({ bodyMd, keywords, contextLinks = [], leadForm, children }: Props) {
  const headings = extractH2Headings(bodyMd);
  const minutes = estimateReadingMinutes(bodyMd);

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,260px)_1fr] lg:items-start">
      <aside className="space-y-5 lg:sticky lg:top-28">
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-wide text-secondary">وقت القراءة</p>
          <p className="mt-2 font-headline text-2xl font-extrabold text-primary">
            {minutes} {minutes === 1 ? "دقيقة" : "دقائق"}
          </p>
          <p className="mt-1 text-xs font-medium text-on-surface-variant">تقدير تقريبي للمحتوى الكامل</p>
        </div>

        {headings.length > 0 ? (
          <nav
            aria-label="جدول المحتويات"
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <h2 className="font-headline text-lg font-extrabold text-primary">في هذا المقال</h2>
            <ol className="mt-4 space-y-2.5 text-sm font-semibold text-on-surface-variant">
              {headings.map((h, i) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="flex gap-2 transition hover:text-secondary">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-[10px] font-extrabold text-secondary">
                      {i + 1}
                    </span>
                    <span className="leading-6">{h.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {keywords && keywords.length > 0 ? (
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="font-headline text-lg font-extrabold text-primary">كلمات مفتاحية</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-surface-container-low px-3 py-1.5 text-xs font-bold text-primary"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {contextLinks.length > 0 ? (
          <div className="rounded-3xl border border-primary/10 bg-white p-5 shadow-sm">
            <h2 className="font-headline text-lg font-extrabold text-primary">روابط ذات صلة</h2>
            <ul className="mt-3 space-y-3">
              {contextLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group block rounded-xl bg-surface-container-low/80 p-3 transition hover:bg-secondary/10"
                  >
                    <span className="text-sm font-extrabold text-primary group-hover:text-secondary">{link.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-on-surface-variant">{link.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {leadForm ? (
          <ServiceStickyLeadForm
            serviceTitle={leadForm.serviceTitle}
            serviceSlug={leadForm.serviceSlug}
          />
        ) : null}
      </aside>

      {leadForm ? (
        <ServiceStickyLeadFormMobileBar
          serviceTitle={leadForm.serviceTitle}
          serviceSlug={leadForm.serviceSlug}
        />
      ) : null}

      <div className="min-w-0">
        {children}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_18px_55px_rgba(30,58,138,0.06)] sm:p-8 md:p-10">
          <MarkdownBody markdown={bodyMd} />
        </div>

        <p className="mt-6 rounded-2xl border border-secondary/20 bg-secondary/5 px-5 py-4 text-sm font-medium leading-7 text-primary">
          <strong>أسعارنا تنافسية</strong> ولدينا <strong>عروض مميزة</strong>.{" "}
          <Link href="/contact" className="font-extrabold text-secondary underline-offset-2 hover:underline">
            تواصل معنا
          </Link>{" "}
          لمعرفة العرض المناسب لمساحتك ونوع الخدمة.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-l from-primary to-secondary p-6 text-white shadow-lg sm:p-8">
          <div className="max-w-md text-right">
            <p className="font-headline text-xl font-extrabold">هل تحتاج خدمة تنظيف أو مكافحة حشرات؟</p>
            <p className="mt-2 text-sm font-medium leading-7 text-white/90">
              فريقنا في الرياض يحدد الخدمة والموعد المناسبين — تواصل عبر الهاتف أو واتساب.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-primary shadow-md transition hover:bg-slate-50"
            >
              احجز الآن
              <Icon name="calendar_month" className="text-lg" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              كل الخدمات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
