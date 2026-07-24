"use client";

import { Children, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Seamless CSS marquee. Renders the track twice and translates -50% so the
 * loop is continuous. Pauses on hover; under reduced motion it becomes a
 * static, horizontally-scrollable row (still fully accessible).
 */
export function Marquee({
  children,
  duration = 40,
  className,
}: {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const items = Children.toArray(children);

  if (reduced) {
    return (
      <div className={cn("flex gap-12 overflow-x-auto", className)}>
        {items}
      </div>
    );
  }

  return (
    <div
      className={cn("group/marquee relative flex overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {[0, 1].map((dup) => (
        <div
          key={dup}
          aria-hidden={dup === 1}
          className="flex shrink-0 animate-marquee items-center gap-12 pr-12 group-hover/marquee:[animation-play-state:paused]"
        >
          {items}
        </div>
      ))}
    </div>
  );
}
