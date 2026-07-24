import type { ProcessStep } from "@/types/content";

/** The four-step engagement model — scroll-progress timeline. */
export const processSteps: ProcessStep[] = [
  {
    code: "STEP-01",
    title: "Site survey & audit",
    description:
      "We walk the property, map every asset and service gap, and understand the standard you're actually being held to — by residents, auditors, or tenants.",
    duration: "Week 1",
  },
  {
    code: "STEP-02",
    title: "Scoped proposal & SLAs",
    description:
      "A transparent scope: headcount, shift patterns, checklists, and measurable SLAs. No bundled surprises — you see exactly what the in-house team will deliver.",
    duration: "Week 2",
  },
  {
    code: "STEP-03",
    title: "Mobilisation & training",
    description:
      "We deploy and train the on-site team to your property's protocols, set up logging and reporting, and run the first cycles under close supervision.",
    duration: "Weeks 3–4",
  },
  {
    code: "STEP-04",
    title: "Operate, audit, improve",
    description:
      "Steady-state operations with scheduled audits, logged compliance, and a single accountable point of contact who reviews performance with you.",
    duration: "Ongoing",
  },
];
