import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppFloatingChipLazy } from "@/components/WhatsAppFloatingChipLazy";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsAppFloatingChipLazy />
    </>
  );
}
