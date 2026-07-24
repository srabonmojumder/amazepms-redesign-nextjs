/**
 * Minimal class merge — no clsx/tailwind-merge dependency. Filters falsy
 * values and joins. Sufficient for this codebase's conditional class needs.
 */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

/** Format an integer with thousands separators (locale-stable, en-IN grouping). */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-IN").format(n);
}
