import type { DayPanel } from "@/types/content";

/**
 * "Inside a site day" — six panels walking a 24-hour operations cycle.
 * Drives the pinned horizontal scroll scene (and its mobile vertical stack).
 */
export const dayPanels: DayPanel[] = [
  {
    time: "05:00",
    phase: "Shift start",
    title: "The building wakes before anyone arrives",
    description:
      "The morning housekeeping shift clocks in, checkpoints are logged, and common areas are cleaned and reset while the property is still empty. The standard is set before the first resident opens a door.",
    readouts: [
      { label: "Shift", value: "MORNING // IN" },
      { label: "Housekeeping", value: "ACTIVE" },
      { label: "Zones", value: "12 / 12" },
    ],
    serviceCode: "SVC-01",
  },
  {
    time: "07:30",
    phase: "Systems check",
    title: "MEP rounds keep the plant honest",
    description:
      "Technicians run planned preventive checks on pumps, DG sets, and HVAC before peak load. Readings are logged against the asset register; anything drifting is caught now, not at 6pm when it fails.",
    readouts: [
      { label: "MEP", value: "PPM // RUN" },
      { label: "HVAC load", value: "NOMINAL" },
      { label: "DG standby", value: "READY" },
    ],
    serviceCode: "SVC-02",
  },
  {
    time: "10:00",
    phase: "Peak occupancy",
    title: "Access control holds the perimeter",
    description:
      "As footfall peaks, security manages entry, visitor passes, and vehicle flow. Patrols continue on schedule, each checkpoint scanned, keeping the busiest hours orderly rather than chaotic.",
    readouts: [
      { label: "Security", value: "SEC-04 // POST" },
      { label: "Visitors", value: "LOGGED" },
      { label: "Patrol", value: "ON SCHED" },
    ],
    serviceCode: "SVC-03",
  },
  {
    time: "14:00",
    phase: "Grounds & water",
    title: "Landscaping and treatment plants run their cycle",
    description:
      "Afternoon horticulture rounds and STP/WTP operation happen in parallel. Treated water is routed back to irrigation and flushing — the building quietly recycling its own resources.",
    readouts: [
      { label: "Landscaping", value: "SVC-05 // RUN" },
      { label: "STP", value: "IN SPEC" },
      { label: "Water reuse", value: "ON" },
    ],
    serviceCode: "SVC-06",
  },
  {
    time: "18:30",
    phase: "Shift handover",
    title: "A clean handover, logged and signed",
    description:
      "The day team hands over to the evening shift with written logs: what was done, what's pending, what to watch. Nothing is carried in someone's head. Accountability transfers with the clipboard.",
    readouts: [
      { label: "Handover", value: "DAY → EVE" },
      { label: "Open items", value: "TRACKED" },
      { label: "Logs", value: "SIGNED" },
    ],
    serviceCode: "OPS-00",
  },
  {
    time: "23:00",
    phase: "Night watch",
    title: "Night security carries the quiet hours",
    description:
      "The property is dark and still, but never unmanned. Night patrols continue on checkpoint schedules, CCTV is monitored, and the morning shift will inherit a building that was watched all night.",
    readouts: [
      { label: "Night watch", value: "SEC-11 // POST" },
      { label: "CCTV", value: "MONITORED" },
      { label: "Uptime", value: "99.4%" },
    ],
    serviceCode: "SVC-03",
  },
];
