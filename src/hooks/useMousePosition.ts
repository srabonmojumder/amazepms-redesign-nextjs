"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

/**
 * Tracks pointer position relative to a target element without triggering
 * React re-renders — writes into a ref that callers read in rAF/GSAP loops.
 * Used by the magnetic button and services spotlight.
 */
export function useMousePosition(
  targetRef: React.RefObject<HTMLElement | null>,
  onMove?: (local: Point, normalized: Point) => void,
) {
  const position = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const handle = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      position.current = { x, y };
      onMove?.(
        { x, y },
        { x: x / rect.width - 0.5, y: y / rect.height - 0.5 },
      );
    };

    el.addEventListener("pointermove", handle);
    return () => el.removeEventListener("pointermove", handle);
  }, [targetRef, onMove]);

  return position;
}
