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
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  // Always render the same motion element (never swap element type between
  // server and client — that causes a hydration mismatch that can leave the
  // content stuck at the server's opacity:0). Under reduced motion we simply
  // disable the entrance with initial={false}, showing content immediately.
  return (
    <MotionTag
      className={className}
      // Reduced motion: force the visible end-state on mount (do NOT use
      // initial={false} — that keeps the server's opacity:0 inline style).
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.7, ease: EASE.entrance, delay: delay + index * 0.07 }
      }
    >
      {children}
    </MotionTag>
  );
}
