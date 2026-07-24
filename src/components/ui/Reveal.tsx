"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  as?: "div" | "li" | "span" | "section" | "article";
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
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.7,
        ease: EASE.entrance,
        delay: delay + index * 0.07,
      }}
    >
      {children}
    </MotionTag>
  );
}
