"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Lenis smooth scroll, correctly synced to GSAP's ticker.
 *
 * The "do it properly" checklist:
 *  - Drive Lenis from gsap.ticker (single rAF loop, no double-rAF jank)
 *  - Disable GSAP's lag smoothing so ScrollTrigger stays frame-accurate
 *  - Fire ScrollTrigger.update on every Lenis scroll event
 *  - Bail out entirely under prefers-reduced-motion (native scroll instead)
 *  - Full teardown on unmount
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return; // native scrolling — no smooth interpolation

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false,
    });

    // 1. Keep ScrollTrigger in lockstep with Lenis.
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Drive Lenis from GSAP's ticker (time is in seconds → ms).
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    // 3. Disable lag smoothing so pinned scenes don't drift.
    gsap.ticker.lagSmoothing(0);

    // Expose for anchor-link scrolling elsewhere.
    window.__lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [reduced]);

  // MotionConfig reducedMotion="user" makes every Framer component respect the
  // OS setting automatically (animating only safe properties like opacity, not
  // transforms) WITHOUT any per-component render branching on useReducedMotion —
  // which is what previously caused a server/client hydration mismatch.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
