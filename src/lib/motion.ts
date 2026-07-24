import type { Variants, Transition } from "framer-motion";

/**
 * Motion tokens — mirrors the easings/durations in tailwind.config.ts so
 * GSAP, Framer Motion, and CSS all speak the same language.
 */
export const EASE = {
  entrance: [0.22, 1, 0.36, 1] as const,
  transform: [0.65, 0, 0.35, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
};

export const DURATION = {
  micro: 0.2,
  base: 0.4,
  section: 0.8,
};

export const STAGGER = 0.07; // 70ms — within the 60–80ms brief window

/** Standard entrance for a single element. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.section, ease: EASE.entrance },
  },
};

/** Parent that staggers children using fadeUp. */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: STAGGER, delayChildren: 0.05 },
  },
};

export const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE.entrance },
  },
};

/** Shared spring for magnetic / layout micro-interactions. */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.6,
};

/** GSAP easing strings registered by CustomEase-free names (native cubic-beziers). */
export const GSAP_EASE = {
  entrance: "power3.out",
  transform: "power2.inOut",
} as const;
