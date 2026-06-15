"use client";

import { useCallback, useEffect, useId, useState } from "react";

import { Icon } from "@/components/Icon";
import { WhatsAppChipLink } from "@/components/ContactQuickForm";
import { brandNameAr, brandWhatsapp } from "@/lib/brand";
import {
  formatLeadAnswer,
  getLeadFormQuestions,
  type LeadFormQuestion,
} from "@/lib/sticky-lead-form";

type ServiceStickyLeadFormProps = {
  serviceTitle: string;
  serviceSlug: string;
  /** حي أو مدينة — اختياري لصفحات المواقع */
  locationLabel?: string;
  /** عرض مضغوط داخل الشريط الجانبي */
  variant?: "sidebar" | "drawer";
  onClose?: () => void;
};

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-right text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-[#4a8f82]/45 focus:outline-none focus:ring-2 focus:ring-[#4a8f82]/12";

const labelClass = "mb-1.5 block text-xs font-bold text-slate-600";

/** ألوان هادئة — خلفية فاتحة ونص داكن لراحة العين أثناء القراءة */
const formPanelBg =
  "border border-[#d9e6e1] bg-gradient-to-bl from-[#f8fbfa] to-[#eef4f2] shadow-[0_8px_24px_rgba(30,58,50,0.06)]";
const formPanelClass = `rounded-3xl ${formPanelBg} p-5 md:p-6`;
const formAccentBtn =
  "bg-[#4a8f82] text-white shadow-sm transition hover:bg-[#3f7d71] active:scale-[0.99]";
const formMobileBarBtn =
  "rounded-2xl bg-[#4a8f82] px-5 py-3.5 text-white shadow-[0_8px_22px_rgba(74,143,130,0.28)] transition hover:bg-[#3f7d71] active:scale-[0.98]";

function useLeadFormState(serviceSlug: string) {
  const questions = getLeadFormQuestions(serviceSlug);
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, ""])),
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);

  const setAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  return { questions, answers, setAnswer, name, setName, phone, setPhone, honeypot, setHoneypot, error, setError };
}

function buildWhatsAppText(
  serviceTitle: string,
  serviceSlug: string,
  locationLabel: string | undefined,
  questions: LeadFormQuestion[],
  answers: Record<string, string>,
  name: string,
  phone: string,
): string {
  const lines = [
    `طلب خدمة — ${brandNameAr}`,
    `الخدمة: ${serviceTitle}`,
    locationLabel ? `الموقع: ${locationLabel}` : null,
    `الصفحة: /services/${serviceSlug}`,
    "",
    `الاسم: ${name.trim()}`,
    `الجوال: ${phone.trim()}`,
    "",
    "— تفاصيل الطلب —",
    ...questions.map((q) => `${q.label} ${formatLeadAnswer(q, answers[q.id] ?? "")}`),
  ].filter((line): line is string => Boolean(line));

  return lines.join("\n");
}

function LeadFormFields({
  serviceTitle,
  serviceSlug,
  locationLabel,
  variant,
  onClose,
}: ServiceStickyLeadFormProps) {
  const formId = useId();
  const { questions, answers, setAnswer, name, setName, phone, setPhone, honeypot, setHoneypot, error, setError } =
    useLeadFormState(serviceSlug);

  const sendWhatsApp = useCallback(() => {
    if (honeypot) return;

    if (!name.trim() || !phone.trim()) {
      setError("يرجى إدخال الاسم ورقم الجوال.");
      return;
    }

    for (const q of questions) {
      if (q.required && !answers[q.id]) {
        setError(`يرجى اختيار: ${q.label}`);
        return;
      }
    }

    setError(null);
    const text = buildWhatsAppText(serviceTitle, serviceSlug, locationLabel, questions, answers, name, phone);
    const base = brandWhatsapp.split("?")[0] ?? brandWhatsapp;
    window.open(`${base}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    onClose?.();
  }, [answers, honeypot, locationLabel, name, onClose, phone, questions, serviceSlug, serviceTitle, setError]);

  const compact = variant === "sidebar";

  return (
    <div className="text-right">
      <div className={compact ? "mb-4" : "mb-5 flex items-start justify-between gap-3"}>
        <div>
          <h2 className={`font-headline font-extrabold text-[#1a3d36] ${compact ? "text-lg" : "text-xl"}`}>
            {compact ? "طلب عرض سعر" : "نموذج طلب سريع"}
          </h2>
          <p className={`mt-1.5 leading-6 text-slate-600 ${compact ? "text-xs" : "text-sm"}`}>
            {compact
              ? "أجب على الأسئلة لنحدد العرض المناسب — رد خلال دقائق."
              : "أسئلة قصيرة تساعدنا على تمييز طلبك الجاد وتجهيز عرض مناسب."}
          </p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200/80 text-slate-600 transition hover:bg-slate-200"
            aria-label="إغلاق النموذج"
          >
            <Icon name="close" className="text-xl" />
          </button>
        ) : null}
      </div>

      <input
        type="text"
        name="website"
        className="sr-only"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden
      />

      <div className={`${compact ? "space-y-3" : "space-y-4"}`}>
        {questions.map((q) => (
          <div key={q.id}>
            <label htmlFor={`${formId}-${q.id}`} className={labelClass}>
              {q.label}
              {q.required ? <span className="text-red-600"> *</span> : null}
            </label>
            <select
              id={`${formId}-${q.id}`}
              value={answers[q.id]}
              onChange={(e) => setAnswer(q.id, e.target.value)}
              className={`${fieldClass} ${compact ? "py-2 text-xs" : ""}`}
            >
              <option value="">— اختر —</option>
              {q.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-name`} className={labelClass}>
              الاسم <span className="text-red-600">*</span>
            </label>
            <input
              id={`${formId}-name`}
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: أحمد"
              className={`${fieldClass} ${compact ? "py-2 text-xs" : ""}`}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-phone`} className={labelClass}>
              الجوال <span className="text-red-600">*</span>
            </label>
            <input
              id={`${formId}-phone`}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+9665xxxxxxxxx"
              className={`${fieldClass} text-left ${compact ? "py-2 text-xs" : ""}`}
            />
          </div>
        </div>

        {error ? (
          <p className="text-xs font-semibold text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={sendWhatsApp}
          className={`flex w-full items-center justify-center gap-2 rounded-xl font-extrabold ${formAccentBtn} ${
            compact ? "px-4 py-2.5 text-sm" : "px-5 py-3.5 text-base"
          }`}
        >
          <Icon name="send" className="text-lg" />
          إرسال عبر واتساب
        </button>
      </div>
    </div>
  );
}

/** نموذج ثابت في الشريط الجانبي لصفحات الخدمات (سطح المكتب) */
export function ServiceStickyLeadForm(props: ServiceStickyLeadFormProps) {
  return (
    <div className={formPanelClass} aria-labelledby="sticky-lead-form-heading">
      <span id="sticky-lead-form-heading" className="sr-only">
        نموذج طلب عرض سعر لخدمة {props.serviceTitle}
      </span>
      <LeadFormFields {...props} variant="sidebar" />
    </div>
  );
}

const SCROLL_THRESHOLD = 280;

/** شريط سفلي ثابت على الجوال يظهر بعد التمرير */
export function ServiceStickyLeadFormMobileBar(props: ServiceStickyLeadFormProps) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const syncDock = () => {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      if (visible && !open && isMobile) {
        root.dataset.mobileLeadDock = "1";
      } else {
        delete root.dataset.mobileLeadDock;
      }
    };
    syncDock();
    window.addEventListener("resize", syncDock);
    return () => {
      delete root.dataset.mobileLeadDock;
      window.removeEventListener("resize", syncDock);
    };
  }, [visible, open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!visible) return null;

  return (
    <>
      {!open ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex flex-col items-start gap-2.5 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
          <div className="pointer-events-auto">
            <WhatsAppChipLink />
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`pointer-events-auto flex w-full items-center justify-between gap-3 ${formMobileBarBtn}`}
          >
            <span className="text-right">
              <span className="block text-sm font-extrabold">طلب عرض سعر — {props.serviceTitle}</span>
              <span className="mt-0.5 block text-xs font-medium text-white/80">أسئلة سريعة + رد عبر واتساب</span>
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
              <Icon name="edit_note" className="text-2xl" />
            </span>
          </button>
        </div>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="نموذج طلب الخدمة">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-label="إغلاق"
          />
          <div
            className={`absolute inset-x-0 bottom-0 max-h-[min(92svh,42rem)] overflow-y-auto rounded-t-[1.75rem] ${formPanelBg} px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5`}
          >
            <LeadFormFields {...props} variant="drawer" onClose={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
