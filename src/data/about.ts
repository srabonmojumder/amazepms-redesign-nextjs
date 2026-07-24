import type { ImageAsset } from "@/types/content";

export const about = {
  founderImage: {
    src: "/images/misc/founder.jpg",
    alt: "Portrait representing the leadership of Amaze PMS",
    width: 1200,
    height: 1500,
  } satisfies ImageAsset,
  story: [
    "Amaze was founded in 2001 in Hyderabad on a single, stubborn conviction: facility management done in-house — not subcontracted — is the only way to actually guarantee it.",
    "Two decades on, that conviction is 15,000+ trained professionals keeping more than 20 million square feet of Indian property running. A subsidiary of the Action Group, Amaze operates PAN India across residential communities, corporate campuses, healthcare, retail, industrial, and educational sites.",
  ],
  principles: [
    {
      code: "P-01",
      title: "In-house, always",
      body: "Our people are on our payroll — screened, trained, and supervised by us. Accountability can't be outsourced, so we don't.",
    },
    {
      code: "P-02",
      title: "Documented, not verbal",
      body: "Checklists, logs, and audits. If it isn't written down and signed off, it didn't happen. That's how standards survive past handover.",
    },
    {
      code: "P-03",
      title: "Preventive over reactive",
      body: "We'd rather catch it on a scheduled round than hear about it from an angry tenant. Planned maintenance is cheaper than emergencies.",
    },
    {
      code: "P-04",
      title: "One point of accountability",
      body: "Every service under one roof means one number to call, one team that knows your site, and no vendor pointing at another.",
    },
  ],
};
