"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dayPanels } from "@/data/dayTimeline";
import type { DayPanel } from "@/types/content";

/** 24h ruler ticks. */
const HOURS = [0, 4, 8, 12, 16, 20, 24];
const timeToPct = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return (((h ?? 0) + (m ?? 0) / 60) / 24) * 100;
};

/**
 * "Inside a site day" — a pinned horizontal scroll scene on desktop, a
 * vertical timeline on mobile / under reduced motion.
 *
 * Robustness:
 *  - gsap.matchMedia gates the pin to (min-width:768px) + no reduced motion,
 *    and auto-reverts on resize / query change (correct cleanup).
 *  - CSS `motion-reduce:!` + mobile classes provide the vertical fallback,
 *    so there is never a broken horizontal drag.
 *  - Track distance is measured lazily in functional start/end (correct on
 *    every ScrollTrigger.refresh / resize).
 */
export function DayTimeline() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          if (!track) return;

          const distance = () => track.scrollWidth - track.clientWidth;

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
          });

          const st = ScrollTrigger.create({
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            animation: tween,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (indicatorRef.current) {
                gsap.set(indicatorRef.current, { left: `${self.progress * 100}%` });
              }
              if (counterRef.current) {
                const idx = Math.min(
                  dayPanels.length,
                  Math.round(self.progress * (dayPanels.length - 1)) + 1,
                );
                counterRef.current.textContent = String(idx).padStart(2, "0");
              }
            },
          });

          // Per-panel content reveals tied to horizontal position.
          const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
          panels.forEach((panel) => {
            gsap.from(panel.querySelectorAll("[data-reveal]"), {
              y: 34,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 72%",
                toggleActions: "play none none reverse",
              },
            });
          });

          return () => st.kill();
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="operations"
      aria-labelledby="day-heading"
      className="relative flex scroll-mt-24 flex-col overflow-hidden bg-ink-800/40 py-section md:h-screen md:justify-between md:py-0 motion-reduce:!h-auto motion-reduce:!py-section"
    >
      {/* Blueprint ground */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint-fine bg-grid-fine opacity-40"
      /> */}

      {/* Header */}
      <div className="container-page relative md:pt-[calc(var(--nav-height)+1.5rem)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-4">
          <SectionHeader
            id="day-heading"
            code="OPS // 24-HOUR CYCLE"
            title="Inside a site day"
            lede="Facility management is invisible when it works. Scroll through one 24-hour cycle on a live site — from the 05:00 shift start to the 23:00 night watch."
          />
          <p className="hidden shrink-0 font-mono text-micro uppercase tracking-widest text-slate-500 md:block">
            <span ref={counterRef} className="text-3xl font-normal text-amber">
              01
            </span>
            <span className="text-3xl text-ink-500"> / 0{dayPanels.length}</span>
            <br />
            <span className="mt-1 inline-block">Drag-free · scroll to advance</span>
          </p>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative z-10 mt-10 flex flex-col gap-6 px-gutter md:mt-0 md:h-[62vh] md:shrink-0 md:flex-row md:items-center md:gap-8 md:px-0 md:pl-gutter motion-reduce:!mt-10 motion-reduce:!h-auto motion-reduce:!flex-col motion-reduce:!px-gutter motion-reduce:!pl-gutter"
      >
        {dayPanels.map((panel, i) => (
          <Panel key={panel.time} panel={panel} index={i} total={dayPanels.length} />
        ))}
        {/* End spacer so the last panel isn't flush on desktop */}
        <div aria-hidden className="hidden shrink-0 md:block md:w-[8vw]" />
      </div>

      {/* 24-hour ruler */}
      <div className="container-page relative mt-12 md:mb-6 md:mt-0">
        <div className="relative h-12">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink-500" />
          {/* Hour ticks */}
          {HOURS.map((h) => (
            <div
              key={h}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${(h / 24) * 100}%` }}
            >
              <span className="block h-2 w-px bg-ink-500" />
              <span className="absolute left-1/2 mt-1 -translate-x-1/2 font-mono text-[0.5625rem] uppercase tracking-widest text-slate-500">
                {String(h).padStart(2, "0")}:00
              </span>
            </div>
          ))}
          {/* Panel markers */}
          {dayPanels.map((p) => (
            <span
              key={p.time}
              className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-amber/70"
              style={{ left: `${timeToPct(p.time)}%` }}
              title={p.time}
            />
          ))}
          {/* Live indicator (desktop scrub only) */}
          <div
            ref={indicatorRef}
            aria-hidden
            className="absolute top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block motion-reduce:!hidden"
            style={{ left: "0%" }}
          >
            <span className="block h-4 w-4 rounded-full border-2 border-amber bg-ink-900 shadow-amber-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  panel,
  index,
  total,
}: {
  panel: DayPanel;
  index: number;
  total: number;
}) {
  return (
    <article
      data-panel
      className="tick-corner relative flex w-full shrink-0 flex-col overflow-hidden rounded-panel border border-ink-600 bg-ink-800 md:h-full md:w-[62vw] md:flex-row lg:w-[46vw]"
    >
      {/* Text content — left side */}
      <div className="relative flex flex-1 flex-col justify-between p-7 md:p-9">
        {/* Ghosted hour numeral */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[9rem] font-black leading-none text-ink-700/60 md:text-[13rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative flex items-start justify-between">
          <div data-reveal>
            <p className="readout text-amber">{panel.phase}</p>
            <p className="mt-1.5 font-display text-4xl font-black tracking-tight text-bone-100 md:text-5xl">
              {panel.time}
            </p>
          </div>
          <span
            data-reveal
            className="rounded-pill border border-ink-500 px-3 py-1 font-mono text-micro uppercase tracking-widest text-slate-400"
          >
            {panel.serviceCode}
          </span>
        </div>

        <div className="relative mt-6">
          <h3
            data-reveal
            className="font-display text-2xl font-bold tracking-tight text-bone-100 md:text-3xl"
          >
            {panel.title}
          </h3>
          <p data-reveal className="mt-3 max-w-md text-base text-bone-300">
            {panel.description}
          </p>

          <div data-reveal className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink-600 pt-4">
            {panel.readouts.map((r) => (
              <span
                key={r.label}
                className="flex items-center gap-2 font-mono text-micro uppercase tracking-widest text-slate-400"
              >
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-amber" />
                {r.label}
                <span className="text-ink-500">/</span>
                <span className="text-bone-200">{r.value}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Image — right side */}
      {panel.image && (
        <div data-reveal className="relative hidden w-[42%] shrink-0 md:block">
          {/* Gradient overlay left-to-right for seamless blending */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-ink-800 via-ink-800/60 to-transparent"
          />
          {/* Subtle amber glow top-left corner */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-8 top-1/4 z-10 h-32 w-32 rounded-full bg-amber/5 blur-3xl"
          />
          <Image
            src={panel.image.src}
            alt={panel.image.alt}
            width={panel.image.width}
            height={panel.image.height}
            className="h-full w-full object-cover opacity-60 mix-blend-luminosity transition-opacity duration-500 hover:opacity-80 hover:mix-blend-normal"
          />
        </div>
      )}

      <span className="sr-only">
        Panel {index + 1} of {total}
      </span>
    </article>
  );
}

