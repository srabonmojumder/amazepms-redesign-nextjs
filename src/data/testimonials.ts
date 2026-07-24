import type { Testimonial } from "@/types/content";

/**
 * Representative testimonials. Organisation names are neutral placeholders —
 * NOT real clients — and the UI labels them as representative.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "What changed with Amaze is accountability. One team owns housekeeping, security, and the plant room — so there's no finger-pointing when something needs fixing. It just gets fixed.",
    author: "Facilities Chair",
    role: "RWA Committee",
    organization: "Northgate Residences",
    segment: "Gated Community",
  },
  {
    id: "t2",
    quote:
      "Our building runs three shifts and never feels understaffed. The MEP preventive schedule alone has cut our unplanned downtime to something we barely think about anymore.",
    author: "Head of Facilities",
    role: "Real Estate",
    organization: "Meridian IT Park",
    segment: "Corporate Office",
  },
  {
    id: "t3",
    quote:
      "In healthcare, cleaning is a clinical process. Amaze came in already thinking in protocols and logs, which is rare. Audits stopped being stressful.",
    author: "General Manager",
    role: "Operations",
    organization: "Sanjeevani Health City",
    segment: "Hospital",
  },
  {
    id: "t4",
    quote:
      "The in-house model is the difference. We used to juggle four vendors and four invoices. Now it's one point of contact who actually knows our site.",
    author: "Procurement Lead",
    role: "Retail Operations",
    organization: "Vantage Malls",
    segment: "Mall & Retail",
  },
  {
    id: "t5",
    quote:
      "Handover-day quality that actually holds twelve months later. The landscaping and pool have looked the same in month one and month eighteen.",
    author: "Estate Manager",
    role: "Community Management",
    organization: "Riverside Enclave",
    segment: "Gated Community",
  },
];
