"use client";

import { useState } from "react";

import { Icon } from "@/components/Icon";
import { brandNameAr, brandWhatsapp } from "@/lib/brand";

const WA_TEAL = "bg-[#0E8B7A] hover:bg-[#0c7a6c]";

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
      note.trim() ? `\nالتفاصيل:\n${note.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const base = brandWhatsapp.split("?")[0] ?? brandWhatsapp;
    window.open(`${base}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="text-right">
      <h2 className="mb-6 text-lg font-bold text-slate-900 md:text-xl">نموذج سريع</h2>

      <input type="text" name="website" className="sr-only" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} aria-hidden />

      <div className="space-y-5">
        <div>
          <label htmlFor="quick-name" className="mb-1.5 block text-sm font-semibold text-slate-800">
            الاسم
          </label>
          <input
            id="quick-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: أحمد"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
          />
        </div>

        <div>
          <label htmlFor="quick-phone" className="mb-1.5 block text-sm font-semibold text-slate-800">
            الجوال <span className="text-red-600">*</span>
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
            placeholder="+9665xxxxxxxx"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
          />
        </div>

        <div>
          <label htmlFor="quick-note" className="mb-1.5 block text-sm font-semibold text-slate-800">
            نبذة عن الطلب <span className="text-xs font-normal text-slate-500">(اختياري)</span>
          </label>
          <textarea
            id="quick-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="نوع الخدمة، المدينة، الموعد المناسب…"
            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
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
          className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-md transition ${WA_TEAL}`}
        >
          <Icon name="chat" className="text-xl text-white" />
          إرسال عبر واتساب
        </button>
      </div>
    </div>
  );
}

/** زر واتساب عائم — رد سريع */
export function WhatsAppFloatingChip() {
  return (
    <a
      href={brandWhatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 right-5 z-40 flex max-w-[min(calc(100vw-2rem),17rem)] items-center gap-2 rounded-full border border-white/25 ${WA_TEAL} px-4 py-3 text-xs font-bold text-white shadow-[0_8px_30px_rgba(14,139,122,0.45)] transition hover:scale-[1.02] active:scale-[0.98] md:bottom-8 md:right-8 md:px-5 md:text-sm`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
        <Icon name="chat" className="text-lg text-white" />
      </span>
      <span className="text-right leading-tight">واتساب — رد سريع خلال دقائق</span>
    </a>
  );
}
