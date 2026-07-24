"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * True when the user has requested reduced motion. Every scroll scene and
 * entrance animation branches on this to ship a real reduced-motion path.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
