import type { ServiceIconKey } from "@/types/content";

/**
 * Minimal 24px line icons for the nine services — drawn, not imported, so the
 * stroke weight and geometry match the blueprint aesthetic. currentColor
 * inherits the card's amber-on-hover treatment.
 */
const PATHS: Record<ServiceIconKey, React.ReactNode> = {
  sparkle: (
    <>
      <path d="M12 3l1.8 4.9L18.9 9.7 14 11.6 12 16.5 10 11.6 5.1 9.7 10.2 7.9z" />
      <path d="M18.5 15.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" />
    </>
  ),
  bolt: <path d="M13 3L5 13h5l-1 8 8-10h-5l1-8z" />,
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  pest: (
    <>
      <ellipse cx="12" cy="13" rx="4" ry="5" />
      <path d="M12 8V5m0 3l-2-2m2 2l2-2M8 11L5 9m11 2l3-2M8 15l-3 1m11-1l3 1" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
      <path d="M9 15c2-3 5-5 8-6" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 3c3 4 6 7 6 10a6 6 0 01-12 0c0-3 3-6 6-10z" />
      <path d="M9 14a3 3 0 003 3" />
    </>
  ),
  parking: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9.5 16V8h3a2.5 2.5 0 010 5H9.5" />
    </>
  ),
  pool: (
    <>
      <path d="M3 17c1.5 0 1.5 1.2 3 1.2S10.5 17 12 17s1.5 1.2 3 1.2S19.5 17 21 17" />
      <path d="M3 13c1.5 0 1.5 1.2 3 1.2S10.5 13 12 13s1.5 1.2 3 1.2S19.5 13 21 13" />
      <path d="M8 13V6a2 2 0 012-2m4 9V6a2 2 0 012-2" />
    </>
  ),
  concierge: (
    <>
      <path d="M4 18h16" />
      <path d="M6 18a6 6 0 0112 0" />
      <path d="M12 6V4m0 2a2 2 0 00-2 2" />
    </>
  ),
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
