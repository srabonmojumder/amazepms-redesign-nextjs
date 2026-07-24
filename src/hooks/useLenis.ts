"use client";

import { useCallback } from "react";

/**
 * Programmatic scrolling that respects the active Lenis instance, with a
 * graceful native fallback (reduced-motion users have no Lenis instance).
 */
export function useLenis() {
  const scrollTo = useCallback(
    (target: string | number | HTMLElement, offset = 0) => {
      const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.2 });
        return;
      }
      // Reduced-motion / no-Lenis fallback
      if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "auto", block: "start" });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target + offset });
      } else {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
    },
    [],
  );

  return { scrollTo };
}
