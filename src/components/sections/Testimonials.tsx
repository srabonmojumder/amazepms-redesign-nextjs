"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { testimonials } from "@/data/testimonials";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/utils";

/** Segment label → representative photo revealed behind the card on hover. */
const segmentImages: Record<string, string> = {
  "Gated Community": "/images/segments/residential.jpg",
  "Corporate Office": "/images/segments/corporate.jpg",
  Hospital: "/images/segments/healthcare.jpg",
  "Mall & Retail": "/images/segments/retail.jpg",
};
const FALLBACK_IMAGE = "/images/segments/residential.jpg";

/** Two-letter monogram for the avatar chip. */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

/**
 * Draggable, scrubbable testimonial slider — no carousel library. Pointer drag
 * (Framer's core drag), snap-to-card on release, prev/next controls, keyboard
 * arrows, and a live progress scrubber. GSAP + ScrollTrigger handles the
 * staggered entrance; hover states are CSS so they stay smooth mid-drag.
 */
export function Testimonials() {
  const root = useRef<HTMLElement>(null);
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
      // Track fills the container; its own overflow is exactly the scroll range.
      maxScroll.current = Math.max(0, track.scrollWidth - track.clientWidth);
      setMaxScrollState(maxScroll.current);
      // Re-clamp current position after resize.
      const clamped = clamp(x.get(), -maxScroll.current, 0);
      x.set(clamped);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [x]);

  // GSAP staggered rise-in, fired by an IntersectionObserver so the reveal
  // can never get stuck invisible (ScrollTrigger + Lenis refresh timing was
  // flaky here). gsap.set runs in useLayoutEffect → no first-paint flash.
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".testi-card");
      if (!cards.length) return;
      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(cards, { opacity: 0, y: 48 });
      const play = () =>
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.09,
          overwrite: true,
        });
      const el = containerRef.current;
      if (!el || typeof IntersectionObserver === "undefined") {
        play();
        return;
      }
      const io = new IntersectionObserver(
        (entries, obs) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            obs.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      io.observe(el);
      return () => io.disconnect();
    },
    { scope: root, dependencies: [reduced] },
  );

  const progress = useTransform(x, (v) =>
    maxScrollState > 0 ? clamp(-v / maxScrollState, 0, 1) : 0,
  );

  const maxIndex = () =>
    step.current > 0
      ? Math.max(0, Math.ceil((maxScroll.current - 2) / step.current)) // -2px absorbs sub-pixel rounding
      : 0;

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
      ref={root}
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

        {/* Slider — vertical padding leaves room for the hover lift + shadow */}
        <div
          ref={containerRef}
          className="mt-10 overflow-hidden py-8"
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
            className="flex cursor-grab gap-6 active:cursor-grabbing"
          >
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="testi-card group relative flex w-full shrink-0 flex-col overflow-hidden rounded-panel border border-slate-300 bg-bone-50 p-8 shadow-[0_1px_2px_rgba(11,13,14,0.04)] transition-[transform,box-shadow,border-color] duration-base ease-out-expo hover:-translate-y-1.5 hover:border-amber-500 hover:shadow-[0_28px_60px_-28px_rgba(11,13,14,0.4)] md:w-[calc((100%-1.5rem)/2)] md:p-10 xl:w-[calc((100%-3rem)/3)]"
                aria-roledescription="slide"
              >
                {/* Segment photo fades in on hover; a charcoal scrim + duotone
                    keeps the (now light) type legible over the image. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-base ease-out-expo group-hover:opacity-100"
                >
                  <Image
                    src={segmentImages[t.segment] ?? FALLBACK_IMAGE}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 27rem, 86vw"
                    className="duotone scale-105 object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-ink-900/60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/35 to-ink-900/55" />
                </div>

                {/* Top row: segment tag + oversized quote glyph */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-pill border border-slate-300 bg-bone-100/70 px-3 py-1 font-mono text-micro uppercase tracking-widest text-amber-700 backdrop-blur-sm transition-colors duration-base group-hover:border-amber-400/50 group-hover:bg-ink-900/40 group-hover:text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    {t.segment}
                  </span>
                  <span
                    aria-hidden
                    className="-mt-4 select-none font-display text-6xl leading-none text-amber-400 transition-all duration-base ease-out-expo group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-amber-300"
                  >
                    &ldquo;
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="relative z-10 mt-5 flex-1 font-display text-lg font-medium leading-snug text-ink-800 transition-colors duration-base group-hover:text-bone-50 md:text-xl">
                  {t.quote}
                </blockquote>

                {/* Footer: monogram avatar + attribution */}
                <figcaption className="relative z-10 mt-8 flex items-center gap-4 border-t border-slate-300 pt-6 transition-colors duration-base group-hover:border-bone-300/25">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-400 bg-bone-100 font-display text-sm font-bold text-ink-900 transition-colors duration-base group-hover:border-amber-400 group-hover:bg-amber-400">
                    {initials(t.author)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-ink-900 transition-colors duration-base group-hover:text-white">
                      {t.author}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-600 transition-colors duration-base group-hover:text-bone-300">
                      {t.role} · {t.organization}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>

        {/* Scrubber */}
        <div className="mt-8 flex items-center gap-4">
          <div className="relative h-1 w-full max-w-xs overflow-hidden rounded-pill bg-slate-300">
            <motion.span
              className="absolute inset-y-0 left-0 w-full origin-left rounded-pill bg-amber-500"
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
      className="grid h-12 w-12 place-items-center rounded-full border border-slate-500 text-ink-900 transition-colors duration-micro hover:border-amber-500 hover:bg-amber-400 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-500 disabled:hover:bg-transparent"
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
