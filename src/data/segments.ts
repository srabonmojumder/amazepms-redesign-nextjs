import type { Segment } from "@/types/content";

/** The six property types Amaze serves. Drives the filterable segments module. */
export const segments: Segment[] = [
  {
    id: "residential",
    label: "Gated Communities",
    code: "SEG-01",
    headline: "Residential communities where residents notice everything",
    description:
      "In a gated community, the RWA committee and every resident sees the work daily. Consistency across housekeeping, security, landscaping, and amenities is what renews the contract.",
    keyServices: [
      "security-services",
      "housekeeping-deep-cleaning",
      "landscaping-gardening",
      "swimming-pool-maintenance",
    ],
    stat: { value: "24/7", label: "Manned security & upkeep" },
    image: {
      src: "/images/segments/residential.jpg",
      alt: "A landscaped gated residential community",
      width: 1600,
      height: 1000,
    },
  },
  {
    id: "corporate",
    label: "Offices & IT Parks",
    code: "SEG-02",
    headline: "Corporate offices and IT parks that run on uptime",
    description:
      "Grade-A workplaces demand invisible, reliable facilities: reception that represents the brand, MEP that never falters, and cleaning that meets an audited standard before the first employee arrives.",
    keyServices: [
      "mep-operations",
      "office-support-services",
      "housekeeping-deep-cleaning",
      "security-services",
    ],
    stat: { value: "Grade-A", label: "Workplace standards" },
    image: {
      src: "/images/segments/corporate.jpg",
      alt: "A modern corporate office lobby in an IT park",
      width: 1600,
      height: 1000,
    },
  },
  {
    id: "retail",
    label: "Malls & Retail",
    code: "SEG-03",
    headline: "Malls and retail with high footfall and zero tolerance for mess",
    description:
      "Retail environments are judged in seconds. High-footfall cleaning, crowd-aware security, parking flow, and spotless washrooms directly shape dwell time and repeat visits.",
    keyServices: [
      "housekeeping-deep-cleaning",
      "security-services",
      "parking-management",
      "pest-control",
    ],
    stat: { value: "High", label: "Footfall readiness" },
    image: {
      src: "/images/segments/retail.jpg",
      alt: "A bright, busy shopping mall interior",
      width: 1600,
      height: 1000,
    },
  },
  {
    id: "healthcare",
    label: "Hospitals",
    code: "SEG-04",
    headline: "Hospitals where cleaning is clinical, not cosmetic",
    description:
      "Healthcare facilities carry infection-control stakes. Protocol-driven cleaning, disciplined waste handling, uninterrupted MEP, and pest management are matters of patient safety, not appearance.",
    keyServices: [
      "housekeeping-deep-cleaning",
      "mep-operations",
      "pest-control",
      "stp-wtp-operations",
    ],
    stat: { value: "Protocol", label: "Infection-control aware" },
    image: {
      src: "/images/segments/healthcare.jpg",
      alt: "A clean hospital corridor",
      width: 1600,
      height: 1000,
    },
  },
  {
    id: "industrial",
    label: "Industrial",
    code: "SEG-05",
    headline: "Industrial facilities with scale and safety demands",
    description:
      "Plants and warehouses need housekeeping at scale, treatment-plant operation, perimeter security, and MEP support that understands an operating environment — not a boutique one.",
    keyServices: [
      "mep-operations",
      "stp-wtp-operations",
      "security-services",
      "housekeeping-deep-cleaning",
    ],
    stat: { value: "Scale", label: "Large-footprint ops" },
    image: {
      src: "/images/segments/industrial.jpg",
      alt: "An industrial facility exterior with large-scale infrastructure",
      width: 1600,
      height: 1000,
    },
  },
  {
    id: "education",
    label: "Educational Campuses",
    code: "SEG-06",
    headline: "Educational campuses that stay safe between bells",
    description:
      "Schools and universities balance open access with student safety. Campus security, hostel and grounds upkeep, pest control, and pool maintenance all run on the academic calendar.",
    keyServices: [
      "security-services",
      "housekeeping-deep-cleaning",
      "landscaping-gardening",
      "pest-control",
    ],
    stat: { value: "Campus", label: "Student-safety focus" },
    image: {
      src: "/images/segments/education.jpg",
      alt: "A university campus building with open grounds",
      width: 1600,
      height: 1000,
    },
  },
];

export const segmentById = (id: string): Segment | undefined =>
  segments.find((s) => s.id === id);
