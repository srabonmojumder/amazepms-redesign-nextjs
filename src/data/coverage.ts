import type { CoverageCity } from "@/types/content";

/**
 * PAN-India coverage. Coordinates are normalized (0–100) to the India map
 * viewBox in the CoverageMap component. Site counts are representative.
 */
export const coverageCities: CoverageCity[] = [
  { name: "Hyderabad", x: 46, y: 58, sites: 62, region: "South", isHQ: true },
  { name: "Bengaluru", x: 43, y: 68, sites: 38, region: "South" },
  { name: "Chennai", x: 52, y: 72, sites: 27, region: "South" },
  { name: "Pune", x: 34, y: 56, sites: 21, region: "West" },
  { name: "Mumbai", x: 29, y: 54, sites: 24, region: "West" },
  { name: "Delhi NCR", x: 42, y: 30, sites: 19, region: "North" },
  { name: "Kolkata", x: 68, y: 50, sites: 12, region: "East" },
  { name: "Ahmedabad", x: 28, y: 45, sites: 9, region: "West" },
  { name: "Vijayawada", x: 52, y: 60, sites: 8, region: "South" },
  { name: "Visakhapatnam", x: 58, y: 57, sites: 7, region: "East" },
];

export const coverageSummary = {
  cities: coverageCities.length,
  regions: 5,
  note: "Representative footprint — operations span metros and Tier-2 cities PAN India.",
};
