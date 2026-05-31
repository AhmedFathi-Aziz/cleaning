"use client";

import {
  Bug,
  Building2,
  Calculator,
  Droplets,
  Home,
  Layers,
  Loader2,
  Maximize2,
  PanelTop,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { WhatsAppLogo } from "@/components/WhatsAppLogo";
import { brandNameAr, brandWhatsapp } from "@/lib/brand";
import { type EstimateServiceType, serviceTypeLabelsAr } from "@/lib/price-estimate";
import { sendGtagEvent } from "@/lib/send-gtag-event";

type TankKind = "overhead" | "ground" | "unknown";

const tankKindLabels: Record<TankKind, string> = {
  overhead: "خزان علوي (على السطح)",
  ground: "خزان أرضي / سفلي",
  unknown: "غير متأكد — أحتاج توجيهًا",
};

function digitsFromBrandWhatsapp(): string {
  const m = brandWhatsapp.match(/(\d{10,15})/);
  return m?.[1] ?? "966500000000";
}

function normalizeSaudiMobile(input: string): string | null {
  const d = input.replace(/\D/g, "");
  if (d.length < 9) return null;
  if (d.startsWith("966")) return d.length >= 12 ? d.slice(0, 12) : null;
  if (d.startsWith("0") && d[1] === "5") return `966${d.slice(1)}`;
  if (d.startsWith("5") && d.length === 9) return `966${d}`;
  return null;
}

export function PriceEstimatorTool() {
  const [rooms, setRooms] = useState(4);
  const [areaSqm, setAreaSqm] = useState(180);
  /** لمكافحة الحشرات — بدل عدد الغرف */
  const [floors, setFloors] = useState(2);
  const [tankKind, setTankKind] = useState<TankKind>("overhead");
  const [tankVolumeM3, setTankVolumeM3] = useState(10);
  const [serviceType, setServiceType] = useState<EstimateServiceType>("cleaning");
  const [step, setStep] = useState<"form" | "calculating" | "lead">("form");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const startCalculate = useCallback(() => {
    sendGtagEvent("estimate_step_progress", {
      from_step: 1,
      to_step: 2,
      step_name: "form_to_calculating",
    });
    setStep("calculating");
    window.setTimeout(() => setStep("lead"), 2000);
  }, []);

  const openWhatsAppWithLead = useCallback(() => {
    const normalized = normalizeSaudiMobile(phone);
    if (!normalized) {
      setPhoneError("يرجى إدخال رقم جوال سعودي صحيح (مثال: 05xxxxxxxx)");
      return;
    }
    setPhoneError(null);
    const company = digitsFromBrandWhatsapp();
    const displayPhone = phone.trim();
    let details = "";
    if (serviceType === "cleaning") {
      details =
        `— عدد الغرف (تقريبي): ${rooms}\n` + `— مساحة المنزل (تقريباً): ${areaSqm} م²\n`;
    } else if (serviceType === "pest") {
      details =
        `— مساحة المسكن تقريباً: ${areaSqm} م²\n` + `— عدد الطوابق: ${floors}\n`;
    } else {
      details =
        `— نوع الخزان: ${tankKindLabels[tankKind]}\n` +
        `— السعة التقريبية: ${tankVolumeM3} م³\n`;
    }

    const body =
      `السلام عليكم، طلب عرض سعر من حاسبة الموقع — ${brandNameAr}\n` +
      `— نوع الخدمة: ${serviceTypeLabelsAr[serviceType]}\n` +
      details +
      `— رقم التواصل (واتساب): ${displayPhone}\n` +
      `أرجو إرسال عرض السعر النهائي على هذا الرقم.`;
    const url = `https://wa.me/${company}?text=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [phone, rooms, areaSqm, floors, tankKind, tankVolumeM3, serviceType]);

  const serviceCards: { id: EstimateServiceType; icon: typeof Sparkles }[] = [
    { id: "cleaning", icon: Sparkles },
    { id: "pest", icon: Bug },
    { id: "tank", icon: Droplets },
  ];

  const fieldSectionClass =
    "rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/60 dark:shadow-none md:p-6";

  const sectionTitleClass =
    "mb-4 flex items-center gap-2 border-e-[3px] border-secondary/50 pe-3 text-xs font-bold uppercase tracking-[0.18em] text-primary/70 dark:border-teal-500/40 dark:text-slate-300";

  return (
    <div className="mx-auto max-w-3xl text-right" dir="rtl">
      <div className="relative">
        <div
          className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.35rem] bg-gradient-to-b from-primary/[0.12] via-transparent to-secondary/[0.08] opacity-90 blur-2xl dark:from-primary/25 dark:to-secondary/15"
          aria-hidden
        />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_32px_80px_-16px_rgba(0,35,111,0.18),0_0_0_1px_rgba(255,255,255,0.6)_inset] dark:border-slate-700/90 dark:bg-slate-950 dark:shadow-[0_28px_70px_-20px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div
            className="absolute inset-x-0 top-0 z-10 h-[3px] bg-gradient-to-l from-teal-400/80 via-teal-500/90 to-teal-400/80 dark:from-teal-500/50 dark:via-teal-400/60 dark:to-teal-500/50"
            aria-hidden
          />
          <div className="relative border-b border-slate-200/90 bg-gradient-to-bl from-slate-50 via-[#eef3f8] to-[#e6edf6] px-6 py-10 text-slate-800 dark:border-slate-600/40 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 md:px-12 md:py-12">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_100%_0%,rgba(0,100,148,0.07),transparent_52%),radial-gradient(ellipse_75%_55%_at_0%_100%,rgba(148,163,184,0.14),transparent_48%)] dark:bg-[radial-gradient(ellipse_85%_65%_at_100%_0%,rgba(45,212,191,0.06),transparent_52%),radial-gradient(ellipse_75%_55%_at_0%_100%,rgba(148,163,184,0.08),transparent_48%)]"
              aria-hidden
            />
            <div className="relative flex flex-wrap items-start gap-5">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 bg-white shadow-md ring-1 ring-slate-200/50 dark:border-slate-600 dark:bg-slate-700/80 dark:ring-slate-600/50">
                <Calculator className="h-7 w-7 text-secondary dark:text-sky-300" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.26em] text-secondary dark:text-teal-300/95">
                  تقدير مجاني — بدون التزام
                </p>
                <p className="mt-2 font-headline text-xl font-extrabold leading-snug text-slate-800 dark:text-slate-100 md:text-2xl">
                  أدخل التفاصيل ثم تابع عبر واتساب
                </p>
                <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 md:text-[0.95rem]">
                  الأداة تغطي تنظيف المنزل أو الشقة، ومكافحة الحشرات والرش، وتنظيف وتعقيم خزانات المياه — تتغيّر
                  الأسئلة حسب الخيار لتكون دقيقة وسهلة، ثم نتابع معك رسمياً عبر واتساب. السعر النهائي يُحدَّد بعد
                  المعاينة والموقع.
                </p>
              </div>
            </div>
          </div>

        <div className="relative bg-gradient-to-b from-slate-50/95 via-white to-slate-50/80 px-6 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900/95 md:px-12 md:py-12">
          {step === "form" ? (
            <div className="space-y-8 md:space-y-10">
              <fieldset className={fieldSectionClass}>
                <legend className="sr-only">نوع الخدمة</legend>
                <p className={sectionTitleClass}>
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-secondary dark:text-teal-400" aria-hidden />
                  نوع الخدمة
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {serviceCards.map(({ id, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setServiceType(id)}
                      className={`group flex flex-col items-end gap-3 rounded-2xl border bg-white/80 p-4 text-right shadow-sm transition-all duration-200 dark:bg-slate-900/40 ${
                        serviceType === id
                          ? "border-primary shadow-[0_12px_36px_-8px_rgba(0,35,111,0.28)] ring-1 ring-primary/20 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)]"
                          : "border-slate-200/90 hover:border-slate-300 hover:shadow-md dark:border-slate-600/80 dark:hover:border-slate-500"
                      }`}
                    >
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                          serviceType === id
                            ? "border-secondary/35 bg-primary/5 text-primary dark:bg-primary/20"
                            : "border-slate-200/80 bg-slate-50 text-secondary group-hover:border-secondary/25 dark:border-slate-600 dark:bg-slate-800/80"
                        }`}
                      >
                        <Icon className="h-5 w-5 shrink-0" aria-hidden />
                      </span>
                      <span className="text-sm font-bold leading-snug text-primary">{serviceTypeLabelsAr[id]}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              {serviceType === "cleaning" ? (
                <>
                  <div className={fieldSectionClass}>
                    <label
                      htmlFor="rooms-range"
                      className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold text-primary"
                    >
                      <Home className="h-4 w-4 text-secondary dark:text-sky-400" aria-hidden />
                      عدد الغرف (تقريبي):{" "}
                      <span className="tabular-nums rounded-lg bg-primary/5 px-2 py-0.5 text-secondary dark:bg-primary/20">
                        {rooms}
                      </span>
                    </label>
                    <input
                      id="rooms-range"
                      type="range"
                      min={1}
                      max={12}
                      step={1}
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200/90 accent-primary dark:bg-slate-700"
                    />
                    <div className="mt-2 flex justify-between text-xs font-semibold tracking-wide text-on-surface-variant">
                      <span>12+</span>
                      <span>1</span>
                    </div>
                  </div>

                  <div className={fieldSectionClass}>
                    <label
                      htmlFor="area-range-cleaning"
                      className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold text-primary"
                    >
                      <Maximize2 className="h-4 w-4 text-secondary dark:text-sky-400" aria-hidden />
                      مساحة المنزل بالتقريب (م²):{" "}
                      <span className="tabular-nums rounded-lg bg-primary/5 px-2 py-0.5 text-secondary dark:bg-primary/20">
                        {areaSqm}
                      </span>
                    </label>
                    <input
                      id="area-range-cleaning"
                      type="range"
                      min={80}
                      max={500}
                      step={10}
                      value={areaSqm}
                      onChange={(e) => setAreaSqm(Number(e.target.value))}
                      className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200/90 accent-secondary dark:bg-slate-700"
                    />
                    <div className="mt-2 flex justify-between text-xs font-semibold tracking-wide text-on-surface-variant">
                      <span>500</span>
                      <span>80</span>
                    </div>
                  </div>
                </>
              ) : null}

              {serviceType === "pest" ? (
                <>
                  <div className={fieldSectionClass}>
                    <label
                      htmlFor="area-range-pest"
                      className="mb-3 flex flex-wrap items-center gap-2 text-sm font-bold text-primary"
                    >
                      <Maximize2 className="h-4 w-4 text-secondary dark:text-sky-400" aria-hidden />
                      مساحة المسكن تقريباً (م²):{" "}
                      <span className="tabular-nums rounded-lg bg-primary/5 px-2 py-0.5 text-secondary dark:bg-primary/20">
                        {areaSqm}
                      </span>
                    </label>
                    <p className="mb-4 text-xs font-medium leading-relaxed text-on-surface-variant">
                      تساعدنا المساحة على تقدير نطاق المعالجة داخل المنزل أو الشقة.
                    </p>
                    <input
                      id="area-range-pest"
                      type="range"
                      min={80}
                      max={500}
                      step={10}
                      value={areaSqm}
                      onChange={(e) => setAreaSqm(Number(e.target.value))}
                      className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200/90 accent-secondary dark:bg-slate-700"
                    />
                    <div className="mt-2 flex justify-between text-xs font-semibold tracking-wide text-on-surface-variant">
                      <span>500</span>
                      <span>80</span>
                    </div>
                  </div>

                  <div className={fieldSectionClass}>
                    <label
                      htmlFor="floors-range"
                      className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold text-primary"
                    >
                      <Building2 className="h-4 w-4 text-secondary dark:text-sky-400" aria-hidden />
                      عدد الطوابق:{" "}
                      <span className="tabular-nums rounded-lg bg-primary/5 px-2 py-0.5 text-secondary dark:bg-primary/20">
                        {floors}
                      </span>
                    </label>
                    <input
                      id="floors-range"
                      type="range"
                      min={1}
                      max={6}
                      step={1}
                      value={floors}
                      onChange={(e) => setFloors(Number(e.target.value))}
                      className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200/90 accent-primary dark:bg-slate-700"
                    />
                    <div className="mt-2 flex justify-between text-xs font-semibold tracking-wide text-on-surface-variant">
                      <span>6</span>
                      <span>1</span>
                    </div>
                  </div>
                </>
              ) : null}

              {serviceType === "tank" ? (
                <>
                  <fieldset className={fieldSectionClass}>
                    <legend className="sr-only">نوع الخزان</legend>
                    <p className={sectionTitleClass}>
                      <Droplets className="h-3.5 w-3.5 shrink-0 text-secondary dark:text-sky-400" aria-hidden />
                      نوع الخزان
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {(
                        [
                          { id: "overhead" as const, icon: PanelTop, label: tankKindLabels.overhead },
                          { id: "ground" as const, icon: Layers, label: tankKindLabels.ground },
                          { id: "unknown" as const, icon: Building2, label: tankKindLabels.unknown },
                        ] as const
                      ).map(({ id, icon: Icon, label }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setTankKind(id)}
                          className={`group flex flex-col items-end gap-3 rounded-2xl border bg-white/80 p-4 text-right shadow-sm transition-all duration-200 dark:bg-slate-900/40 ${
                            tankKind === id
                              ? "border-secondary shadow-[0_12px_36px_-8px_rgba(0,100,148,0.22)] ring-1 ring-secondary/25 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)]"
                              : "border-slate-200/90 hover:border-slate-300 hover:shadow-md dark:border-slate-600/80 dark:hover:border-slate-500"
                          }`}
                        >
                          <span
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                              tankKind === id
                                ? "border-secondary/40 bg-secondary/5 text-secondary dark:bg-secondary/15"
                                : "border-slate-200/80 bg-slate-50 text-on-surface-variant group-hover:border-secondary/25 dark:border-slate-600 dark:bg-slate-800/80"
                            }`}
                          >
                            <Icon className="h-5 w-5 shrink-0" aria-hidden />
                          </span>
                          <span className="text-sm font-bold leading-snug text-primary">{label}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className={fieldSectionClass}>
                    <label
                      htmlFor="tank-volume"
                      className="mb-3 flex flex-wrap items-center gap-2 text-sm font-bold text-primary"
                    >
                      <Droplets className="h-4 w-4 text-secondary dark:text-sky-400" aria-hidden />
                      السعة التقريبية للخزان (م³):{" "}
                      <span className="tabular-nums rounded-lg bg-primary/5 px-2 py-0.5 text-secondary dark:bg-primary/20">
                        {tankVolumeM3}
                      </span>
                    </label>
                    <p className="mb-4 text-xs font-medium leading-relaxed text-on-surface-variant">
                      إن لم تكن متأكداً، اختر أقرب تقدير؛ الفريق يضبط السعر بعد المعاينة.
                    </p>
                    <input
                      id="tank-volume"
                      type="range"
                      min={1}
                      max={50}
                      step={1}
                      value={tankVolumeM3}
                      onChange={(e) => setTankVolumeM3(Number(e.target.value))}
                      className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200/90 accent-secondary dark:bg-slate-700"
                    />
                    <div className="mt-2 flex justify-between text-xs font-semibold tracking-wide text-on-surface-variant">
                      <span>50</span>
                      <span>1</span>
                    </div>
                  </div>
                </>
              ) : null}

              <button
                type="button"
                onClick={startCalculate}
                dir="rtl"
                className="flex w-full items-center gap-4 rounded-[14px] border border-white/15 bg-[#128C7E] px-4 py-3.5 text-right shadow-[0_10px_28px_rgba(18,140,126,0.38)] transition hover:bg-[#139d8c] hover:shadow-[0_12px_32px_rgba(18,140,126,0.45)] active:scale-[0.99] dark:border-white/10 dark:bg-[#128C7E] dark:hover:bg-[#139d8c]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-extrabold leading-snug text-white md:text-[1.05rem]">
                    احسب التقدير وتابع عبر واتساب
                  </span>
                  <span className="mt-1 block text-sm font-medium leading-tight text-white/90">
                    رد سريع خلال دقائق
                  </span>
                </span>
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                  aria-hidden
                >
                  <WhatsAppLogo className="h-7 w-7 text-[#128C7E]" />
                </span>
              </button>
            </div>
          ) : null}

          {step === "calculating" ? (
            <div
              className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-slate-200/80 bg-white/60 py-16 text-center dark:border-slate-700/80 dark:bg-slate-900/40 md:py-20"
              role="status"
              aria-live="polite"
            >
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-secondary/25 bg-secondary/5 dark:bg-secondary/15">
                <Loader2 className="h-10 w-10 animate-spin text-secondary dark:text-sky-400" aria-hidden />
              </span>
              <p className="max-w-md px-4 text-lg font-extrabold leading-relaxed text-primary md:text-xl">
                جاري تجهيز طلبك… أدخل رقم الواتساب في الخطوة التالية لإرسال التفاصيل لفريقنا.
              </p>
              <p className="max-w-sm px-4 text-sm font-medium leading-relaxed text-on-surface-variant">
                لا نعرض سعراً نهائياً هنا — يُراجع الطلب من قِبل {brandNameAr} ليتوافق مع طبيعة المكان والمواد
                المطلوبة.
              </p>
            </div>
          ) : null}

          {step === "lead" ? (
            <div className="space-y-7">
              <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-bl from-slate-50 to-white p-6 shadow-sm dark:border-slate-600/80 dark:from-slate-900/80 dark:to-slate-950/80 md:p-7">
                <p className="flex items-start gap-3 border-e-[3px] border-secondary/55 pe-4 text-base font-bold leading-relaxed text-primary">
                  <WhatsAppLogo className="mt-0.5 h-5 w-5 shrink-0 text-[#128C7E]" aria-hidden />
                  أدخل رقم الواتساب الذي تريد استلام عرض السعر عليه — تُفتح محادثة رسمية مع فريقنا ورسالة جاهزة
                  ببياناتك.
                </p>
              </div>

              <div>
                <label
                  htmlFor="wa-phone"
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-primary/70 dark:text-slate-400"
                >
                  رقم الواتساب
                </label>
                <input
                  id="wa-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="05xxxxxxxx"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError(null);
                  }}
                  className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3.5 text-left text-lg font-semibold tracking-wide text-slate-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  dir="ltr"
                />
                {phoneError ? <p className="mt-2 text-sm font-bold text-error">{phoneError}</p> : null}
              </div>

              <button
                type="button"
                onClick={openWhatsAppWithLead}
                dir="rtl"
                className="flex w-full items-center gap-4 rounded-[14px] border border-white/15 bg-[#128C7E] px-4 py-3.5 text-right shadow-[0_10px_28px_rgba(18,140,126,0.38)] transition hover:bg-[#139d8c] hover:shadow-[0_12px_32px_rgba(18,140,126,0.45)] active:scale-[0.99]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-extrabold text-white">إرسال الطلب على واتساب</span>
                  <span className="mt-1 block text-sm font-medium text-white/90">فتح المحادثة برسالة جاهزة</span>
                </span>
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                  aria-hidden
                >
                  <WhatsAppLogo className="h-7 w-7 text-[#128C7E]" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setPhone("");
                  setPhoneError(null);
                }}
                className="w-full py-2 text-sm font-bold text-secondary underline-offset-4 hover:underline"
              >
                تعديل البيانات
              </button>

              <p className="text-center text-xs font-medium leading-relaxed text-on-surface-variant">
                بالمتابعة أنت توافق على أن التقدير تقريبي وأن السعر النهائي يُحدَّد بعد التواصل أو المعاينة عند
                الحاجة.{" "}
                <Link href="/privacy" className="font-bold text-primary hover:underline">
                  سياسة الخصوصية
                </Link>
              </p>
            </div>
          ) : null}
        </div>
        </div>
      </div>
    </div>
  );
}
