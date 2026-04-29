import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة تحكم المدونة",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-on-background antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {children}
    </div>
  );
}
