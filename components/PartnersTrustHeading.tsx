type Props = {
  title: string;
  subtitle: string;
  /** مثال: `partners-heading` لربط `aria-labelledby` في الصفحة الرئيسية */
  headingId?: string;
};

/** عنوان موحّد لأقسام الشركاء — خط فاصل خفيف وأنيميشن ناعم يحترم تقليل الحركة */
export function PartnersTrustHeading({ title, subtitle, headingId }: Props) {
  return (
    <div className="mb-14 text-center md:mb-16">
      <h2
        id={headingId}
        className="font-headline text-2xl font-extrabold tracking-tight text-primary md:text-3xl lg:text-[2rem]"
      >
        {title}
      </h2>
      <div className="mx-auto mt-5 flex flex-col items-center gap-4">
        <span className="h-px w-20 bg-gradient-to-l from-transparent via-primary/35 to-transparent md:w-28" aria-hidden />
        <p
          className="mx-auto max-w-2xl text-sm leading-relaxed text-on-surface-variant/95 md:text-[1.0625rem]"
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
