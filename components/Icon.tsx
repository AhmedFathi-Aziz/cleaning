import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  name: string;
};

const iconPaths: Record<string, ReactNode> = {
  apartment: (
    <>
      <path d="M4 21h16" />
      <path d="M7 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
    </>
  ),
  calendar_month: (
    <>
      <path d="M7 3v3M17 3v3M4 9h16" />
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M8 13h2M12 13h2M16 13h2M8 17h2M12 17h2" />
    </>
  ),
  engineering: (
    <>
      <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4 21a8 8 0 0 1 16 0" />
      <path d="M9 4.5 12 3l3 1.5" />
    </>
  ),
  sentiment_satisfied: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h.01M15 10h.01M8.5 14.5a5 5 0 0 0 7 0" />
    </>
  ),
  verified: (
    <>
      <path d="m12 2 2.4 2.2 3.2-.2.8 3.1 2.6 1.8-1.4 2.9.7 3.1-3 1.2-1.6 2.8-3.1-.9-3.1.9-1.6-2.8-3-1.2.7-3.1L3 8.9l2.6-1.8.8-3.1 3.2.2L12 2Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
  verified_user: (
    <>
      <path d="M12 3 19 6v5c0 4.6-2.8 8.1-7 10-4.2-1.9-7-5.4-7-10V6l7-3Z" />
      <path d="m8.8 12 2 2 4.4-4.6" />
    </>
  ),
  shield_person: (
    <>
      <path d="M12 3 19 6v5c0 4.6-2.8 8.1-7 10-4.2-1.9-7-5.4-7-10V6l7-3Z" />
      <circle cx="12" cy="10" r="2" />
      <path d="M8.8 16a3.4 3.4 0 0 1 6.4 0" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" />,
  arrow_back: <path d="M20 12H5M12 5l-7 7 7 7" />,
  arrow_forward: <path d="M4 12h15M12 5l7 7-7 7" />,
  support_agent: (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <path d="M4 13h3v5H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2ZM20 13h-3v5h3a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2Z" />
      <path d="M17 18c0 2-2 3-5 3" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.5-5A8 8 0 1 1 21 12Z" />
      <path d="M8 11h8M8 15h5" />
    </>
  ),
  phone_in_talk: (
    <>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
      <path d="M15 3.5a6 6 0 0 1 5.5 5.5M15 7a2.8 2.8 0 0 1 2 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  groups_3: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 19a7 7 0 0 1 14 0" />
      <circle cx="5" cy="10" r="2" />
      <circle cx="19" cy="10" r="2" />
      <path d="M1.5 19a5 5 0 0 1 6-4M22.5 19a5 5 0 0 0-6-4" />
    </>
  ),
  timer: (
    <>
      <path d="M10 2h4M12 14l3-3" />
      <circle cx="12" cy="14" r="8" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.8 2.8 0 1 1 4.3 2.3c-1 .7-1.8 1.3-1.8 2.7M12 17h.01" />
    </>
  ),
  check_circle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v11h14V10" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  cleaning_services: (
    <>
      <path d="M6 21h12" />
      <path d="M8 21V9l8-4v16" />
      <path d="M7 9h10M10 13h4M10 17h4" />
    </>
  ),
  villa: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V9l7-5 7 5v12" />
      <path d="M9 21v-6h6v6M8 11h2M14 11h2" />
    </>
  ),
  chair: (
    <>
      <path d="M7 12V5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v7" />
      <path d="M5 12h14v5H5zM7 17v4M17 17v4" />
    </>
  ),
  pest_control: (
    <>
      <path d="M12 6a5 5 0 0 1 5 5v4a5 5 0 0 1-10 0v-4a5 5 0 0 1 5-5Z" />
      <path d="M12 6V3M8 4l2 3M16 4l-2 3M7 12H3M21 12h-4M7 16l-3 2M17 16l3 2" />
    </>
  ),
  water_drop: <path d="M12 2s7 7.2 7 12a7 7 0 0 1-14 0c0-4.8 7-12 7-12Z" />,
  home_work: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v11h14V10" />
      <path d="M9 21v-6h6v6" />
      <path d="M10 14h4" />
    </>
  ),
  location_city: (
    <>
      <path d="M3 21h18" />
      <path d="M6 21V7l6-4 6 4v14" />
      <path d="M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2" />
    </>
  ),
  air: (
    <>
      <path d="M4 10h10a3 3 0 1 0 0-6H4" />
      <path d="M4 16h14a4 4 0 0 0 0-8" />
      <path d="M4 22h8a2 2 0 1 0 0-4H4" />
    </>
  ),
  water_vapor: (
    <>
      <path d="M8 16c0 2 1.5 3 4 3s4-1 4-3" />
      <path d="M6 12c0 2 2 3 6 3s6-1 6-3" />
      <path d="M4 8c0 2 2.5 3 8 3s8-1 8-3" />
    </>
  ),
  local_laundry_service: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="12" cy="13" r="4" />
      <path d="M8 7h8" />
    </>
  ),
  height: (
    <>
      <path d="M12 3v18" />
      <path d="M8 7h8M8 17h8" />
      <path d="m9 5 3-2 3 2M9 19l3 2 3-2" />
    </>
  ),
  water_pump: (
    <>
      <path d="M12 3v4" />
      <rect x="6" y="7" width="12" height="10" rx="2" />
      <path d="M9 12h6M12 9v6" />
      <path d="M8 21h8" />
    </>
  ),
  science: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v5l-4 7a2 2 0 0 0 1.7 3h8.6a2 2 0 0 0 1.7-3l-4-7V3" />
      <path d="M9 14h6" />
    </>
  ),
  supervisor_account: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M6 20a6 6 0 0 1 12 0" />
      <path d="M16 6h4v4" />
      <path d="M20 6l-4 4" />
    </>
  ),
  mop: (
    <>
      <path d="M12 3v10" />
      <path d="M8 13h8l-1 8H9l-1-8Z" />
      <path d="M6 21h12" />
    </>
  ),
  nature: (
    <>
      <path d="M12 22V12" />
      <path d="M12 12C12 7 7 4 4 6c0 5 4 8 8 6" />
      <path d="M12 12c0-5 5-8 8-6-3 5-7 8-8 6" />
    </>
  ),
  format_quote: (
    <>
      <path d="M4 10h4v8H4zM14 10h4v8h-4z" />
      <path d="M4 10V8a4 4 0 0 1 4-4M14 10V8a4 4 0 0 1 4-4" />
    </>
  ),
  location_on: (
    <>
      <path d="M12 21s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18M6 6l12 12" />
    </>
  ),
  send: (
    <>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </>
  ),
  edit_note: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </>
  ),
  task_alt: (
    <>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </>
  ),
};

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block h-[1em] w-[1em] shrink-0 ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {iconPaths[name] ?? iconPaths.verified}
    </svg>
  );
}
