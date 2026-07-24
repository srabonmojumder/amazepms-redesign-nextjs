"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/utils";
import { EASE } from "@/lib/motion";

/**
 * Draggable, scrubbable testimonial slider — no carousel library. Pointer drag
 * (Framer's core drag), snap-to-card on release, prev/next controls, keyboard
 * arrows, and a live progress scrubber driven by the same motion value.
 */
export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const step = useRef(0); // px per card (incl. gap)
  const maxScroll = useRef(0);
  const [maxScrollState, setMaxScrollState] = useState(0);

  // Measure card step + max scroll on mount and resize.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;
      const cards = track.children;
      const a = cards[0] as HTMLElement | undefined;
      const b = cards[1] as HTMLElement | undefined;
      step.current = a && b ? b.offsetLeft - a.offsetLeft : a?.offsetWidth ?? 0;
      maxScroll.current = Math.max(0, track.scrollWidth - container.clientWidth);
      setMaxScrollState(maxScroll.current);
      // Re-clamp current position after resize.
      const clamped = clamp(x.get(), -maxScroll.current, 0);
      x.set(clamped);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [x]);

  const progress = useTransform(x, (v) =>
    maxScrollState > 0 ? clamp(-v / maxScrollState, 0, 1) : 0,
  );

  const maxIndex = () =>
    step.current > 0 ? Math.ceil(maxScroll.current / step.current) : 0;

  const goTo = (i: number) => {
    const ci = clamp(i, 0, maxIndex());
    setIndex(ci);
    const target = Math.max(-ci * step.current, -maxScroll.current);
    if (reduced) {
      x.set(target);
    } else {
      animate(x, target, { type: "spring", stiffness: 320, damping: 40 });
    }
  };

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    const projected = x.get() + info.velocity.x * 0.12;
    const nearest = Math.round(-projected / (step.current || 1));
    goTo(nearest);
  };

  return (
    <section
      id="voices"
      aria-labelledby="testi-heading"
      className="relative overflow-hidden bg-bone-100 py-section text-ink-900"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Header — dark type on the warm bone "human" section */}
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-700" />
              <span className="font-mono text-micro uppercase tracking-widest text-amber-700">
                VOICE // REPRESENTATIVE
              </span>
            </div>
            <h2
              id="testi-heading"
              className="text-balance font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl"
            >
              The people who signed off
            </h2>
            <p className="mt-5 max-w-prose text-lg text-slate-600">
              Representative of the facility heads, RWA committees, and
              procurement leads we work with. Drag to read more.
            </p>
          </div>

          {/* Controls */}
          <div className="flex shrink-0 items-center gap-3">
            <SliderButton
              label="Previous testimonial"
              onClick={() => goTo(index - 1)}
              disabled={index <= 0}
              dir="left"
            />
            <SliderButton
              label="Next testimonial"
              onClick={() => goTo(index + 1)}
              disabled={index >= maxIndex()}
              dir="right"
            />
          </div>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="mt-12 overflow-hidden"
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              goTo(index + 1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              goTo(index - 1);
            }
          }}
        >
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.06}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="flex cursor-grab gap-5 active:cursor-grabbing"
          >
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE.entrance }}
                className="tick-corner relative flex w-[84vw] shrink-0 flex-col justify-between rounded-panel border border-slate-300 bg-bone-50 p-7 sm:w-[26rem] md:p-9"
                aria-roledescription="slide"
              >
                <blockquote className="font-display text-lg font-medium leading-snug text-ink-800 md:text-xl">
                  <span aria-hidden className="text-amber-600">
                    &ldquo;
                  </span>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-slate-300 pt-5">
                  <p className="font-display font-bold text-ink-900">{t.author}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {t.role} · {t.organization}
                  </p>
                  <p className="mt-3 font-mono text-micro uppercase tracking-widest text-amber-700">
                    {t.segment}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>

        {/* Scrubber */}
        <div className="mt-8 flex items-center gap-4">
          <div className="relative h-0.5 w-full max-w-xs overflow-hidden rounded-pill bg-slate-300">
            <motion.span
              className="absolute inset-y-0 left-0 w-full origin-left rounded-pill bg-amber-700"
              style={{ scaleX: progress }}
            />
          </div>
          <span className="font-mono text-micro uppercase tracking-widest text-slate-500">
            Drag / arrow keys
          </span>
        </div>
      </div>
    </section>
  );
}

function SliderButton({
  label,
  onClick,
  disabled,
  dir,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  dir: "left" | "right";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-12 w-12 place-items-center rounded-full border border-slate-500 text-ink-900 transition-colors duration-micro hover:border-amber-700 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d={dir === "left" ? "M13 8H3M7 4L3 8l4 4" : "M3 8h10M9 4l4 4-4 4"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
