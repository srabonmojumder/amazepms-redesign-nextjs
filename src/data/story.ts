import type { ImageAsset } from "@/types/content";

/** Editorial "why integrated, in-house facility management" argument. */
export interface StoryPoint {
  code: string;
  problem: string;
  answer: string;
  detail: string;
}

export const whyIFM = {
  code: "SEC-01 // WHY IFM",
  title: "One building. A dozen kinds of work. Too many vendors.",
  lede: "Most facilities are run by a patchwork of subcontractors, each with its own supervisor, invoice, and excuse. Integrated, in-house management replaces that patchwork with a single accountable operation.",
  visual: {
    src: "/images/misc/inhouse.jpg",
    alt: "An operations team coordinating facility work inside a building",
    width: 1600,
    height: 1000,
  } satisfies ImageAsset,
  points: [
    {
      code: "01",
      problem: "Fragmented accountability",
      answer: "One team owns the whole building",
      detail:
        "When housekeeping, security, and MEP are three different vendors, every problem becomes someone else's problem. We put one accountable operation over all of it.",
    },
    {
      code: "02",
      problem: "Subcontracted, untraceable labour",
      answer: "15,000+ trained, on-payroll professionals",
      detail:
        "Our people are our own — screened, trained, and supervised by us. Not a rotating cast of subcontracted labour you never meet twice.",
    },
    {
      code: "03",
      problem: "Reactive, fix-it-when-it-breaks upkeep",
      answer: "Planned, logged, preventive operations",
      detail:
        "Preventive maintenance schedules, checkpoint logs, and audited checklists mean issues are caught on a round — not reported by an angry tenant.",
    },
    {
      code: "04",
      problem: "Standards that drift after handover",
      answer: "Audited standards that hold for years",
      detail:
        "The quality you see on day one is documented and audited so it still looks the same in month eighteen. Consistency is the product.",
    },
  ] satisfies StoryPoint[],
};

/** In-house advantage diagram: services under one roof vs fragmented vendors. */
export const inHouse = {
  code: "SEC-05 // IN-HOUSE",
  title: "Every service, under one roof",
  lede: "No subcontracting, no hand-offs, no gaps between vendors. Nine service lines, one workforce, one point of accountability.",
  nodes: [
    "Housekeeping",
    "MEP O&M",
    "Security",
    "Pest Control",
    "Landscaping",
    "STP / WTP",
    "Parking",
    "Pool Care",
    "Office Support",
  ],
  hub: "Amaze Ops",
};
