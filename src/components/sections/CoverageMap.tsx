"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { coverageCities, coverageSummary } from "@/data/coverage";

/**
 * Stylized India silhouette (viewBox 0..100) — not survey-accurate; drawn to
 * match the blueprint aesthetic and to contain the normalized city pins.
 */
const INDIA_PATH =
  "M40,9 L46,12 L52,15 L57,20 L62,24 L68,28 L74,33 L79,37 L76,41 L72,42 L71,46 " +
  "L69,51 L65,55 L61,59 L57,64 L53,71 L48,79 L44,88 L41,80 L38,72 L35,65 L32,59 " +
  "L30,54 L28,50 L25,46 L23,42 L26,41 L27,39 L25,37 L28,31 L32,24 L35,17 L38,12 Z";

export function CoverageMap() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const hq = coverageCities.find((c) => c.isHQ) ?? coverageCities[0]!;
  const [activeName, setActiveName] = useState(hq.name);
  const active = coverageCities.find((c) => c.name === activeName) ?? hq;

  useGSAP(
    () => {
      const path = root.current?.querySelector<SVGPathElement>("[data-coast]");
      if (!path) return;
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      if (reduced) {
        path.style.strokeDashoffset = "0";
        return;
      }
      path.style.strokeDashoffset = String(len);
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          end: "bottom 70%",
          scrub: 0.8,
        },
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      id="coverage"
      aria-labelledby="coverage-heading"
      className="relative scroll-mt-24 border-t border-ink-600 bg-ink-900 py-section"
    >
      <div className="container-page">
        <SectionHeader
          id="coverage-heading"
          code="GEO // PAN-INDIA"
          title="On the ground across the country"
          lede={coverageSummary.note}
        />

        <div ref={root} className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          {/* Map */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="relative aspect-square">
              {/* Blueprint grid backing */}
              <div
                aria-hidden
                className="absolute inset-0 bg-blueprint-fine bg-grid-fine opacity-30"
              />
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <path
                  d={INDIA_PATH}
                  className="fill-ink-800/60"
                  stroke="none"
                />
                <path
                  data-coast
                  d={INDIA_PATH}
                  fill="none"
                  className="stroke-amber/60"
                  strokeWidth={0.4}
                  strokeLinejoin="round"
                />
              </svg>

              {/* City pins overlaid as accessible buttons */}
              {coverageCities.map((city) => {
                const isActive = city.name === activeName;
                return (
                  <button
                    key={city.name}
                    type="button"
                    onMouseEnter={() => setActiveName(city.name)}
                    onFocus={() => setActiveName(city.name)}
                    onClick={() => setActiveName(city.name)}
                    aria-label={`${city.name}: ${city.sites} sites`}
                    aria-pressed={isActive}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${city.x}%`, top: `${city.y}%` }}
                  >
                    <span className="relative flex items-center justify-center">
                      {city.isHQ && (
                        <span className="absolute h-5 w-5 animate-pulse-dot rounded-full bg-amber/25" />
                      )}
                      <span
                        className={
                          isActive
                            ? "relative h-3 w-3 rounded-full border-2 border-ink-900 bg-amber shadow-amber-glow"
                            : "relative h-2 w-2 rounded-full bg-amber/70 transition-transform duration-micro hover:scale-125"
                        }
                      />
                    </span>
                    {(isActive || city.isHQ) && (
                      <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono text-[0.5rem] uppercase tracking-widest text-bone-300">
                        {city.name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Readout panel */}
          <div className="flex flex-col justify-center">
            <div className="tick-corner relative rounded-panel border border-ink-600 bg-ink-800 p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-micro uppercase tracking-widest text-amber">
                  {active.isHQ ? "HQ // ACTIVE" : "SITE // ACTIVE"}
                </span>
                <span className="font-mono text-micro uppercase tracking-widest text-slate-500">
                  {active.region}
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-black tracking-tight text-bone-100">
                {active.name}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-ink-600 bg-ink-600">
                <div className="bg-ink-900 p-4">
                  <p className="font-display text-2xl font-black text-amber">
                    {active.sites}
                  </p>
                  <p className="readout mt-1">Sites managed</p>
                </div>
                <div className="bg-ink-900 p-4">
                  <p className="font-display text-2xl font-black text-bone-100">
                    {coverageSummary.cities}
                  </p>
                  <p className="readout mt-1">Cities total</p>
                </div>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                Hover or tab through the map to inspect coverage by city. Figures
                are representative of an active PAN-India footprint.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
