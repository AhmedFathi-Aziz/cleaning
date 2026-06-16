import { RelatedServicesSectionLazy } from "@/components/RelatedServicesSectionLazy";

/** روابط الخدمات ذات الصلة — فقط تحت /services (chunk منفصل، بدون SSR) */
export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <RelatedServicesSectionLazy />
    </>
  );
}
