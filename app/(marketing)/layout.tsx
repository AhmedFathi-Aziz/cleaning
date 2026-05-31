import { WhatsAppFloatingChip } from "@/components/ContactQuickForm";
import { RelatedServicesSection } from "@/components/RelatedServicesSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      {children}
      <RelatedServicesSection />
      <SiteFooter />
      <WhatsAppFloatingChip />
    </>
  );
}
