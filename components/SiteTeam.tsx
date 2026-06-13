import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { brandLogoPath, brandNameAr } from "@/lib/brand";
import { teamMembers, teamPageIntro, type TeamMember } from "@/lib/content/team-members";
import { primaryCityNameAr } from "@/lib/region";

function TeamMemberCard({ member }: { member: TeamMember }) {
  const displayName = member.honorific ? `${member.honorific} ${member.name}` : member.name;

  return (
    <article id={member.id} className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 text-right shadow-[0_12px_40px_rgba(0,35,111,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-[0_20px_50px_rgba(0,35,111,0.08)] sm:p-7 scroll-mt-28">
      <div className="mb-5 flex items-start gap-4">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-sm">
          <Image
            src={member.image ?? brandLogoPath}
            alt={`${displayName} — ${brandNameAr}`}
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-headline text-xl font-extrabold text-primary sm:text-2xl">{displayName}</h2>
          <p className="mt-1 text-sm font-bold leading-relaxed text-secondary">{member.specialty}</p>
        </div>
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-white text-primary shadow-sm transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
          <Icon name={member.icon} className="text-xl" />
        </span>
      </div>

      <ul className="mb-4 space-y-2 text-sm font-semibold text-on-surface-variant">
        <li className="flex items-center justify-end gap-2">
          <span>خبرة {member.yearsExperience} سنوات</span>
          <Icon name="calendar_month" className="shrink-0 text-base text-primary/70" />
        </li>
      </ul>

      <p className="flex-1 text-sm font-medium leading-8 text-on-surface-variant md:text-base">{member.highlight}</p>
    </article>
  );
}

export function SiteTeam() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-white px-6 pb-14 pt-24 md:px-8 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-7xl text-right">
          <p className="mb-4 inline-flex items-center gap-3 rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-extrabold text-primary shadow-sm sm:text-sm">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/8 text-primary">
              <Icon name="groups_3" className="text-lg" />
            </span>
            فريق {brandNameAr}
          </p>
          <h1 className="font-headline text-[clamp(1.85rem,3.5vw+0.5rem,3.25rem)] font-extrabold leading-[1.12] tracking-tight text-primary">
            فريق العمل
          </h1>
          <p className="mt-2 font-headline text-lg font-bold text-secondary md:text-xl">
            عمالة مدربة في {primaryCityNameAr} — أسماء وتخصصات واضحة
          </p>
          <p className="mt-5 max-w-3xl text-base font-medium leading-[1.9] text-on-surface-variant md:text-lg">
            {teamPageIntro}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-6 py-16 md:px-8 md:py-24" aria-label="أعضاء الفريق">
        <div className="mx-auto max-w-7xl">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <li key={member.id}>
                <TeamMemberCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-6 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-100 bg-white px-8 py-8 text-right shadow-[0_16px_45px_rgba(0,35,111,0.06)] md:px-10 md:py-10">
          <Icon name="verified_user" className="mb-4 text-3xl text-secondary/70" />
          <p className="font-headline text-lg font-extrabold leading-[1.85] text-primary md:text-xl">
            وجود أشخاص بأسماء وتخصصات محددة يرفع الثقة — لأنك تعرف من يشرف على زيارتك قبل وصول الفريق.
          </p>
          <p className="mt-4 text-sm font-medium leading-8 text-on-surface-variant md:text-base">
            عند الحجز يمكنك طلب{" "}
            <Link href="/features/trained-cleaning-team" className="font-bold text-secondary underline-offset-2 hover:underline">
              فريق نسائي فقط
            </Link>{" "}
            عند التوفر، أو التواصل مع المشرف الميداني قبل بدء العمل.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 pb-24 md:px-8 md:pb-28">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-8 rounded-3xl border border-slate-100 bg-white px-8 py-12 shadow-[0_24px_60px_rgba(0,35,111,0.08)] md:flex-row md:items-center md:px-12 md:py-14">
          <div className="text-center md:text-right">
            <p className="mb-2 text-sm font-extrabold text-secondary">احجز مع فريقنا</p>
            <h2 className="mb-2 font-headline text-2xl font-extrabold text-primary md:text-3xl">
              تريد التعامل مع فريق محدد أو مشرف معيّن؟
            </h2>
            <p className="text-base font-medium text-on-surface-variant">
              اذكر الحي ونوع الخدمة عند التواصل — ننسّق الفريق المناسب ونؤكد الموعد قبل الوصول.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3 md:justify-start">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-[0_10px_28px_rgba(0,35,111,0.18)] transition hover:opacity-95"
            >
              اتصل بنا
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-8 py-3.5 text-base font-bold text-primary shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              انضم للفريق
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
