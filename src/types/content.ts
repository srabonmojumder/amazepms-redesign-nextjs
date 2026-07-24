/**
 * Content model for the entire site. Every section reads typed data shaped
 * by these interfaces — no untyped content lives in JSX.
 */

export type ServiceSlug =
  | "housekeeping-deep-cleaning"
  | "mep-operations"
  | "security-services"
  | "pest-control"
  | "landscaping-gardening"
  | "stp-wtp-operations"
  | "parking-management"
  | "swimming-pool-maintenance"
  | "office-support-services";

export interface Service {
  slug: ServiceSlug;
  /** Zero-padded ops code shown as a mono micro-label, e.g. "SVC-01". */
  code: string;
  title: string;
  /** One-line summary for the grid card. */
  tagline: string;
  /** Longer editorial intro for the detail page. */
  description: string;
  /** Named line items — reads like a technical spec sheet. */
  capabilities: string[];
  /** Measurable commitments / SLAs, shown as readouts. */
  metrics: { label: string; value: string }[];
  /** Placeholder duotone image (swap for real Amaze photography later). */
  image: ImageAsset;
  /** Lucide-free inline icon key resolved by the ServiceIcon component. */
  icon: ServiceIconKey;
}

export type ServiceIconKey =
  | "sparkle"
  | "bolt"
  | "shield"
  | "pest"
  | "leaf"
  | "droplet"
  | "parking"
  | "pool"
  | "concierge";

export interface Segment {
  id: string;
  label: string;
  /** Short code for the filter chip readout. */
  code: string;
  headline: string;
  description: string;
  /** Which services matter most for this segment (slugs). */
  keyServices: ServiceSlug[];
  stat: { value: string; label: string };
  image: ImageAsset;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  /** Placeholder org name — representative, not a real client. */
  organization: string;
  segment: string;
}

export interface ProcessStep {
  code: string;
  title: string;
  description: string;
  /** Duration hint, e.g. "Week 1". */
  duration: string;
}

export interface DayPanel {
  /** 24h clock label, e.g. "05:00". */
  time: string;
  phase: string;
  title: string;
  description: string;
  /** Live-ops readouts specific to this hour. */
  readouts: { label: string; value: string }[];
  serviceCode: string;
  /** Optional scene image for the panel card. */
  image?: ImageAsset;
}

export interface CoverageCity {
  name: string;
  /** Normalized SVG coords (0–100 within the map viewBox). */
  x: number;
  y: number;
  /** Sites under management — representative figure. */
  sites: number;
  region: "North" | "South" | "East" | "West" | "Central";
  isHQ?: boolean;
}

export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  /** Mono sub-label under the number. */
  detail: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface NavLink {
  label: string;
  href: string;
  /** Mono index shown in the mobile menu, e.g. "01". */
  index: string;
}
