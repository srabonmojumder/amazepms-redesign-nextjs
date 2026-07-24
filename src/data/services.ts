import type { Service } from "@/types/content";

/**
 * The nine in-house service lines. Each is the source for its card in the
 * grid AND its /services/[slug] detail page. Images are license-safe
 * placeholders under /public/images/services — swap for real Amaze
 * photography without touching any component.
 */
export const services: Service[] = [
  {
    slug: "housekeeping-deep-cleaning",
    code: "SVC-01",
    title: "Housekeeping & Deep Cleaning",
    tagline: "Daily upkeep and scheduled deep cleans that hold to an audited standard.",
    description:
      "The most visible signal of a well-run building is a clean one. Our housekeeping teams work to documented checklists, colour-coded to prevent cross-contamination, with periodic deep-cleaning cycles for facades, carpets, and high-touch surfaces.",
    capabilities: [
      "Colour-coded daily housekeeping to BICSc-aligned checklists",
      "Scheduled deep cleaning: carpets, upholstery, hard floors",
      "Façade and high-level glass cleaning",
      "Washroom hygiene and consumables management",
      "Waste segregation and disposal coordination",
    ],
    metrics: [
      { label: "Audit cadence", value: "Weekly" },
      { label: "Checklist compliance", value: "Logged" },
      { label: "Shift coverage", value: "2–3 / day" },
    ],
    image: {
      src: "/images/services/housekeeping.jpg",
      alt: "A housekeeping professional cleaning a bright commercial interior",
      width: 1200,
      height: 1500,
    },
    icon: "sparkle",
  },
  {
    slug: "mep-operations",
    code: "SVC-02",
    title: "MEP Operations & Maintenance",
    tagline: "Mechanical, electrical, and plumbing systems kept running — planned, not reactive.",
    description:
      "Downtime in building services is expensive and dangerous. Our MEP technicians run planned preventive maintenance across HVAC, DG sets, transformers, pumps, and plumbing networks, backed by breakdown response and energy-efficiency reviews.",
    capabilities: [
      "Planned preventive maintenance schedules for all MEP assets",
      "HVAC, chillers, and AHU operation & upkeep",
      "DG sets, transformers, and LT/HT panel management",
      "Plumbing networks, pumps, and pressure systems",
      "Breakdown response with logged resolution times",
    ],
    metrics: [
      { label: "PPM adherence", value: "Scheduled" },
      { label: "Breakdown response", value: "Rapid" },
      { label: "Asset register", value: "Tracked" },
    ],
    image: {
      src: "/images/services/mep.jpg",
      alt: "Building services pipework and mechanical plant room equipment",
      width: 1200,
      height: 1500,
    },
    icon: "bolt",
  },
  {
    slug: "security-services",
    code: "SVC-03",
    title: "Security Services",
    tagline: "Trained, uniformed security led by a founder who built his career in it.",
    description:
      "Security is where Amaze began. Our guarding services combine screened, trained personnel with access-control discipline, patrol logging, and incident escalation protocols — supervised by leadership with formal security credentials.",
    capabilities: [
      "Screened, trained, and uniformed security personnel",
      "Access control and visitor management",
      "Patrol scheduling with checkpoint logging",
      "CCTV monitoring support and incident escalation",
      "Emergency and evacuation drill coordination",
    ],
    metrics: [
      { label: "Personnel screening", value: "Verified" },
      { label: "Patrol logging", value: "Checkpoint" },
      { label: "Supervision", value: "Tiered" },
    ],
    image: {
      src: "/images/services/security.jpg",
      alt: "A uniformed security professional monitoring a building entrance",
      width: 1200,
      height: 1500,
    },
    icon: "shield",
  },
  {
    slug: "pest-control",
    code: "SVC-04",
    title: "Pest Control",
    tagline: "Integrated pest management on a schedule, with low-toxicity protocols.",
    description:
      "Pest issues undermine hygiene certifications and tenant confidence. We run integrated pest management on defined cycles — inspection, treatment, and monitoring — favouring targeted, low-toxicity methods appropriate to occupied buildings.",
    capabilities: [
      "Scheduled integrated pest management (IPM) cycles",
      "Rodent, termite, and general pest control",
      "Mosquito and vector fogging for common areas",
      "Low-toxicity, occupant-safe treatment protocols",
      "Treatment logs and compliance documentation",
    ],
    metrics: [
      { label: "Treatment cycle", value: "Monthly" },
      { label: "Method", value: "IPM" },
      { label: "Documentation", value: "Logged" },
    ],
    image: {
      src: "/images/services/pest-control.jpg",
      alt: "A pest control technician servicing a building perimeter",
      width: 1200,
      height: 1500,
    },
    icon: "pest",
  },
  {
    slug: "landscaping-gardening",
    code: "SVC-05",
    title: "Landscaping & Gardening",
    tagline: "Grounds that stay green through the season, not just on handover day.",
    description:
      "Landscaping is the first thing a visitor sees and the easiest thing to let slip. Our horticulture teams maintain lawns, beds, and interior plantscapes with irrigation management and seasonal planting plans.",
    capabilities: [
      "Lawn, hedge, and shrub maintenance",
      "Seasonal planting and bed management",
      "Irrigation scheduling and water conservation",
      "Interior plantscaping and upkeep",
      "Green-waste composting coordination",
    ],
    metrics: [
      { label: "Upkeep cadence", value: "Daily" },
      { label: "Irrigation", value: "Managed" },
      { label: "Seasonal plan", value: "Yes" },
    ],
    image: {
      src: "/images/services/landscaping.jpg",
      alt: "Landscaped grounds with maintained lawn and planting beds",
      width: 1200,
      height: 1500,
    },
    icon: "leaf",
  },
  {
    slug: "stp-wtp-operations",
    code: "SVC-06",
    title: "STP & WTP Operations",
    tagline: "Sewage and water treatment plants operated to compliance, not left idling.",
    description:
      "Poorly run treatment plants are a compliance and health liability. Our operators run STPs and WTPs to process parameters, maintain the electromechanical equipment, and keep the records that regulators and auditors ask for.",
    capabilities: [
      "Daily STP and WTP operation to process parameters",
      "Water quality testing and log maintenance",
      "Pump, blower, and dosing system upkeep",
      "Treated-water reuse for landscaping and flushing",
      "Regulatory compliance documentation support",
    ],
    metrics: [
      { label: "Parameter checks", value: "Daily" },
      { label: "Water reuse", value: "Enabled" },
      { label: "Records", value: "Compliant" },
    ],
    image: {
      src: "/images/services/stp-wtp.jpg",
      alt: "Water treatment plant tanks and process equipment",
      width: 1200,
      height: 1500,
    },
    icon: "droplet",
  },
  {
    slug: "parking-management",
    code: "SVC-07",
    title: "Parking Management",
    tagline: "Orderly parking flow, visitor handling, and revenue discipline where it applies.",
    description:
      "Parking is where a resident or visitor's day begins and ends. We manage traffic flow, slot allocation, visitor parking, and — where relevant — ticketing and revenue reconciliation, keeping congestion and disputes down.",
    capabilities: [
      "Traffic flow and slot allocation management",
      "Visitor and event parking coordination",
      "Boom-barrier and access-system operation",
      "Ticketing and revenue reconciliation (where applicable)",
      "Basement ventilation and safety awareness",
    ],
    metrics: [
      { label: "Flow control", value: "Managed" },
      { label: "Visitor handling", value: "Yes" },
      { label: "Reconciliation", value: "Daily" },
    ],
    image: {
      src: "/images/services/parking.jpg",
      alt: "An organised multi-level parking facility",
      width: 1200,
      height: 1500,
    },
    icon: "parking",
  },
  {
    slug: "swimming-pool-maintenance",
    code: "SVC-08",
    title: "Swimming Pool Maintenance",
    tagline: "Water chemistry and plant kept in balance so the pool is always swim-ready.",
    description:
      "A pool is only an amenity when it is safe and clear. We manage filtration, water chemistry, and cleaning to keep pools within safe parameters, with logged testing and equipment maintenance.",
    capabilities: [
      "Daily water chemistry testing and balancing",
      "Filtration and circulation plant operation",
      "Surface skimming, vacuuming, and tile cleaning",
      "Chemical dosing and storage safety",
      "Equipment maintenance and safety checks",
    ],
    metrics: [
      { label: "Chemistry checks", value: "Daily" },
      { label: "Filtration", value: "Managed" },
      { label: "Safety log", value: "Maintained" },
    ],
    image: {
      src: "/images/services/pool.jpg",
      alt: "A clean, well-maintained swimming pool at a residential community",
      width: 1200,
      height: 1500,
    },
    icon: "pool",
  },
  {
    slug: "office-support-services",
    code: "SVC-09",
    title: "Office Support Services",
    tagline: "Front-of-house and back-of-house staffing that keeps a workplace moving.",
    description:
      "The people who keep an office running rarely get noticed — until they're missing. We provide trained front-office, pantry, mailroom, and facilities-support staff, managed as part of the same accountable workforce as everything else.",
    capabilities: [
      "Front-office and reception staffing",
      "Pantry and cafeteria support",
      "Mailroom and courier coordination",
      "Facility helpdesk and ticket handling",
      "Office movement and space-support assistance",
    ],
    metrics: [
      { label: "Staffing", value: "Trained" },
      { label: "Helpdesk", value: "Ticketed" },
      { label: "Coverage", value: "Business hrs" },
    ],
    image: {
      src: "/images/services/office-support.jpg",
      alt: "A professional reception and front-office workspace",
      width: 1200,
      height: 1500,
    },
    icon: "concierge",
  },
];

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const serviceSlugs = services.map((s) => s.slug);
