import { Icon } from "@/components/Icon";
import { ServiceStickyLeadForm, ServiceStickyLeadFormMobileBar } from "@/components/ServiceStickyLeadForm";

type ServicePageSidebarProps = {
  serviceTitle: string;
  serviceSlug: string;
  includes: string[];
  locationLabel?: string;
  /** عناصر إضافية فوق النموذج (مثل «جهّز قبل الزيارة») */
  extraBlocks?: React.ReactNode;
};

export function ServicePageSidebar({
  serviceTitle,
  serviceSlug,
  includes,
  locationLabel,
  extraBlocks,
}: ServicePageSidebarProps) {
  return (
    <div className="min-w-0">
      <aside className="space-y-5 lg:sticky lg:top-28">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="font-headline text-lg font-extrabold text-primary">تشمل الخدمة</h2>
          <ul className="mt-4 space-y-3">
            {includes.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
                <Icon name="check_circle" className="text-lg text-secondary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {extraBlocks}

        <ServiceStickyLeadForm
          serviceTitle={serviceTitle}
          serviceSlug={serviceSlug}
          locationLabel={locationLabel}
        />
      </aside>

      <ServiceStickyLeadFormMobileBar
        serviceTitle={serviceTitle}
        serviceSlug={serviceSlug}
        locationLabel={locationLabel}
      />
    </div>
  );
}
