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

              {/* Ambient radial glow behind the map */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/[0.03] blur-3xl"
              />

              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <defs>
                  {/* Gradient fill for the map silhouette */}
                  <linearGradient id="mapFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,176,32,0.06)" />
                    <stop offset="100%" stopColor="rgba(18,21,23,0.8)" />
                  </linearGradient>
                  {/* Glow filter for active pins */}
                  <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Radial gradient for HQ pulse */}
                  <radialGradient id="hqPulse">
                    <stop offset="0%" stopColor="rgba(255,176,32,0.35)" />
                    <stop offset="100%" stopColor="rgba(255,176,32,0)" />
                  </radialGradient>
                </defs>

                {/* Map fill */}
                <path
                  d={INDIA_PATH}
                  fill="url(#mapFill)"
                  stroke="none"
                />
                {/* Map outline — animated draw */}
                <path
                  data-coast
                  d={INDIA_PATH}
                  fill="none"
                  className="stroke-amber/40"
                  strokeWidth={0.5}
                  strokeLinejoin="round"
                />

                {/* Connection lines from HQ to other cities */}
                {coverageCities
                  .filter((c) => !c.isHQ)
                  .map((city) => (
                    <line
                      key={`line-${city.name}`}
                      x1={hq.x}
                      y1={hq.y}
                      x2={city.x}
                      y2={city.y}
                      className={
                        city.name === activeName
                          ? "stroke-amber/30"
                          : "stroke-ink-500/40"
                      }
                      strokeWidth={0.2}
                      strokeDasharray="1 1.5"
                    />
                  ))}

                {/* City hotspots — SVG circles for modern look */}
                {coverageCities.map((city) => {
                  const isActive = city.name === activeName;
                  return (
                    <g key={city.name}>
                      {/* HQ outer pulse ring */}
                      {city.isHQ && (
                        <>
                          <circle
                            cx={city.x}
                            cy={city.y}
                            r={4}
                            fill="url(#hqPulse)"
                            className="animate-pulse-dot"
                          />
                          <circle
                            cx={city.x}
                            cy={city.y}
                            r={2.5}
                            fill="none"
                            className="stroke-amber/20"
                            strokeWidth={0.3}
                          />
                        </>
                      )}

                      {/* Active ring */}
                      {isActive && !city.isHQ && (
                        <>
                          <circle
                            cx={city.x}
                            cy={city.y}
                            r={3}
                            fill="none"
                            className="stroke-amber/25 animate-pulse-dot"
                            strokeWidth={0.3}
                          />
                          <circle
                            cx={city.x}
                            cy={city.y}
                            r={2}
                            fill="none"
                            className="stroke-amber/15"
                            strokeWidth={0.2}
                          />
                        </>
                      )}

                      {/* Core dot */}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={isActive || city.isHQ ? 1.2 : 0.8}
                        className={
                          isActive || city.isHQ
                            ? "fill-amber"
                            : "fill-amber/60"
                        }
                        filter={isActive || city.isHQ ? "url(#pinGlow)" : undefined}
                      />

                      {/* Inner highlight dot */}
                      {(isActive || city.isHQ) && (
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={0.4}
                          className="fill-white/80"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Interactive button layer on top of SVG */}
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
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 p-2"
                    style={{ left: `${city.x}%`, top: `${city.y}%` }}
                  >
                    {/* Tooltip */}
                    {isActive && (
                      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2">
                        <span className="flex items-center gap-2 whitespace-nowrap rounded-md border border-ink-500/60 bg-ink-800/90 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-widest text-bone-200 shadow-panel backdrop-blur-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_6px_rgba(255,176,32,0.5)]" />
                          {city.name}
                          <span className="text-amber">{city.sites}</span>
                        </span>
                        {/* Tooltip arrow */}
                        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-ink-800/90" />
                      </span>
                    )}
                    {/* Non-active label for HQ */}
                    {!isActive && city.isHQ && (
                      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.5rem] uppercase tracking-widest text-amber/70">
                        HQ
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
              {/* Status bar */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-micro uppercase tracking-widest text-amber">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-amber" />
                  {active.isHQ ? "HQ // ACTIVE" : "SITE // ACTIVE"}
                </span>
                <span className="rounded-md border border-ink-500/50 bg-ink-700/50 px-2 py-0.5 font-mono text-micro uppercase tracking-widest text-slate-400">
                  {active.region}
                </span>
              </div>

              {/* City name */}
              <p className="mt-4 font-display text-3xl font-black tracking-tight text-bone-100">
                {active.name}
              </p>

              {/* Stats grid */}
              <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-card border border-ink-600 bg-ink-600">
                <div className="bg-ink-900 p-4">
                  <p className="font-display text-2xl font-black text-amber">
                    {active.sites}
                  </p>
                  <p className="readout mt-1">Sites</p>
                </div>
                <div className="bg-ink-900 p-4">
                  <p className="font-display text-2xl font-black text-bone-100">
                    {coverageSummary.cities}
                  </p>
                  <p className="readout mt-1">Cities</p>
                </div>
                <div className="bg-ink-900 p-4">
                  <p className="font-display text-2xl font-black text-bone-100">
                    {coverageSummary.regions}
                  </p>
                  <p className="readout mt-1">Regions</p>
                </div>
              </div>

              {/* City list */}
              <div className="mt-6 flex flex-wrap gap-2">
                {coverageCities.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => setActiveName(city.name)}
                    className={`rounded-md border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-widest transition-all duration-200 ${
                      city.name === activeName
                        ? "border-amber/40 bg-amber/10 text-amber"
                        : "border-ink-500/40 bg-ink-700/30 text-slate-400 hover:border-amber/20 hover:text-bone-300"
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
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
