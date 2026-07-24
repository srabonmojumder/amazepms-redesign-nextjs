"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Stagger index — multiplies the base delay for sequenced reveals. */
  index?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Extra delay in seconds. */
  delay?: number;
  as?: "div" | "li" | "span" | "section" | "article" | "p";
  className?: string;
  once?: boolean;
};

/**
 * The single source of truth for entrance animations. Every section uses this
 * instead of re-implementing IntersectionObserver / whileInView logic.
 * Under prefers-reduced-motion it renders content immediately, no transform.
 */
export function Reveal({
  children,
  index = 0,
  y = 22,
  delay = 0,
  as = "div",
  className,
  once = true,
}: RevealProps) {
  const MotionTag = motion[as];

  // Render identically on server and client (no useReducedMotion branch → no
  // hydration mismatch). Reduced motion is handled globally by
  // <MotionConfig reducedMotion="user">, which animates only opacity (safe) and
  // skips the y transform for users who ask for reduced motion.
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE.entrance, delay: delay + index * 0.07 }}
    >
      {children}
    </MotionTag>
  );
}
