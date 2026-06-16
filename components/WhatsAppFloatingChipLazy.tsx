"use client";

import dynamic from "next/dynamic";

const WhatsAppFloatingChip = dynamic(
  () =>
    import("@/components/ContactQuickForm").then((mod) => ({
      default: mod.WhatsAppFloatingChip,
    })),
  { ssr: false },
);

export function WhatsAppFloatingChipLazy() {
  return <WhatsAppFloatingChip />;
}
