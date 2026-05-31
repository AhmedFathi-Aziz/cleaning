"use client";

import { useState } from "react";

import { WhatsAppLogo } from "@/components/WhatsAppLogo";
import { brandNameAr, brandWhatsapp } from "@/lib/brand";

const NAVY = "bg-[#1D2D3D] hover:bg-[#152530]";
const WA_TEAL = "bg-[#128C7E] hover:bg-[#0f7a6e]";

export function ContactQuickForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [showError, setShowError] = useState(false);

  const sendWhatsApp = () => {
    if (honeypot) return;
    if (!name.trim() || !phone.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    const text = [
      `طلب تواصل — ${brandNameAr}`,
      "",
      `الاسم: ${name.trim()}`,
      `الجوال: ${phone.trim()}`,
      note.trim() ? `\nالرسالة:\n${note.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const base = brandWhatsapp.split("?")[0] ?? brandWhatsapp;
    window.open(`${base}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const fieldClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-right text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D2D3D]/10";

  const labelClass = "mb-1.5 block text-sm font-medium text-slate-600";

  return (
    <div className="text-right">
      <h2 className="mb-7 font-headline text-xl font-extrabold tracking-tight text-[#1D2D3D] md:text-2xl">نموذج سريع</h2>

      <input type="text" name="website" className="sr-only" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} aria-hidden />

      <div className="space-y-5">
        <div>
          <label htmlFor="quick-name" className={labelClass}>
            الاسم
          </label>
          <input
            id="quick-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: أحمد"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="quick-phone" className={labelClass}>
            الجوال <span className="font-semibold text-red-600">*</span>
          </label>
          <input
            id="quick-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+9665xxxxxxxxx"
            className={`${fieldClass} text-left`}
          />
        </div>

        <div>
          <label htmlFor="quick-note" className={labelClass}>
            الرسالة
          </label>
          <textarea
            id="quick-note"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="صف نوع الخدمة والمدينة والحي إن أمكن."
            className={`${fieldClass} resize-y min-h-[7.5rem]`}
          />
        </div>

        {showError ? (
          <p className="text-sm font-semibold text-red-600" role="alert">
            يرجى إدخال الاسم والجوال.
          </p>
        ) : null}

        <button
          type="button"
          onClick={sendWhatsApp}
          className={`flex w-full items-center justify-center rounded-lg px-6 py-3.5 text-base font-bold text-white shadow-[0_4px_14px_rgba(29,45,61,0.28)] transition ${NAVY}`}
        >
          إرسال الطلب
        </button>
      </div>
    </div>
  );
}

/** زر واتساب عائم — يُضاف من تخطيط التسويق ليظهر في كل صفحات الموقع العامة */
export function WhatsAppFloatingChip() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 md:bottom-8 md:right-8">
      <div className="pointer-events-auto relative">
        <div
          className="absolute left-1/2 top-1/2 h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#128C7E]/25 blur-2xl motion-reduce:opacity-40 md:h-[5.5rem] md:w-[5.5rem]"
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-1/2 h-[min(140%,7.5rem)] w-[min(92vw,20rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#128C7E]/12 blur-3xl motion-reduce:hidden"
          aria-hidden
        />
        <a
          href={brandWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل معنا عبر واتساب — رد سريع خلال دقائق"
          dir="ltr"
          className={`relative flex max-w-[min(calc(100vw-2rem),20rem)] items-center gap-3 rounded-[22px] border border-white/30 ${WA_TEAL} py-2.5 pl-3 pr-3.5 text-white shadow-[0_12px_40px_rgba(15,90,80,0.45)] transition hover:scale-[1.02] hover:shadow-[0_14px_44px_rgba(15,90,80,0.5)] active:scale-[0.98] md:gap-3.5 md:py-3 md:pl-3.5 md:pr-4`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#128C7E] shadow-sm md:h-12 md:w-12">
            <WhatsAppLogo className="h-[1.35rem] w-[1.35rem] md:h-6 md:w-6" />
          </span>
          <span dir="rtl" className="min-w-0 flex-1 text-right leading-tight">
            <span className="block text-sm font-extrabold md:text-base">واتساب</span>
            <span className="mt-0.5 block text-[0.7rem] font-medium text-white/95 md:text-xs">رد سريع خلال دقائق</span>
          </span>
        </a>
      </div>
    </div>
  );
}

