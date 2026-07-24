import type { NavLink, Stat } from "@/types/content";

/**
 * Company facts. Only verified figures from the brief are used here — no
 * invented certifications, awards, or statistics.
 */
export const site = {
  name: "Amaze PMS",
  legalName: "Amaze Property Management Solutions Pvt Ltd",
  tagline: "Integrated Facility Management, delivered entirely in-house.",
  description:
    "Amaze PMS is an Integrated Facility Management company keeping 20 million square feet of property running across India — housekeeping, MEP, security, and more, all delivered by our own trained workforce.",
  parent: "Action Group",
  founded: 2001,
  founder: {
    name: "Subhani Abdul",
    title: "Founder & Managing Director",
    bio: "Indian Navy veteran and Certified Security Practitioner. Founded Amaze in 2001 on a simple conviction: facility management done in-house, not subcontracted, is the only way to guarantee it.",
  },
  url: "https://amazepms.com",
  hq: {
    city: "Hyderabad",
    area: "Cyberabad",
    state: "Telangana",
    country: "India",
    address: "Cyberabad, Hyderabad, Telangana, India",
  },
  contact: {
    email: "connect@amazepms.com",
    phone: "+91 40 0000 0000",
    phoneHref: "tel:+914000000000",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
} as const;

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services", index: "01" },
  { label: "Operations", href: "/#operations", index: "02" },
  { label: "Segments", href: "/#segments", index: "03" },
  { label: "Coverage", href: "/#coverage", index: "04" },
  { label: "About", href: "/about", index: "05" },
];

/** The four headline numbers — count-up animated in the trust bar. */
export const stats: Stat[] = [
  {
    value: 20,
    suffix: "M+",
    label: "Sq. ft. under management",
    detail: "AREA // PAN-INDIA",
  },
  {
    value: 15000,
    suffix: "+",
    label: "Trained professionals",
    detail: "WORKFORCE // IN-HOUSE",
  },
  {
    value: 200,
    suffix: "+",
    label: "Clients served",
    detail: "PORTFOLIO // ACTIVE",
  },
  {
    value: 2001,
    suffix: "",
    prefix: "Est. ",
    label: "Two decades of operations",
    detail: "SINCE // HYDERABAD",
  },
];
