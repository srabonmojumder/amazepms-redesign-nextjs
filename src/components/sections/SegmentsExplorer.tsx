"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { segments } from "@/data/segments";
import { serviceBySlug } from "@/data/services";
import { EASE } from "@/lib/motion";

export function SegmentsExplorer() {
  const [activeId, setActiveId] = useState(segments[0]!.id);
  const active = segments.find((s) => s.id === activeId) ?? segments[0]!;

  return (
    <section
      id="segments"
      aria-labelledby="segments-heading"
      className="relative scroll-mt-24 bg-ink-900 py-section"
    >
      <div className="container-page">
        <SectionHeader
          id="segments-heading"
          code="SEG // 06 SECTORS"
          title="Built for the property you actually run"
          lede="The work is the same discipline everywhere — but a hospital is not a mall, and a gated community is not an IT park. Pick a sector to see what changes."
        />

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Property sectors"
          className="mt-10 flex flex-wrap gap-2"
        >
          {segments.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                aria-controls="segment-panel"
                onClick={() => setActiveId(s.id)}
                className="relative rounded-pill px-4 py-2 font-display text-sm font-medium transition-colors duration-micro"
              >
                {isActive && (
                  <motion.span
                    layoutId="segment-pill"
                    className="absolute inset-0 rounded-pill bg-amber"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={
                    isActive
                      ? "relative z-10 text-ink-900"
                      : "relative z-10 text-slate-400 hover:text-bone-200"
                  }
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <div
          id="segment-panel"
          role="tabpanel"
          className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {/* Visual */}
          <div className="tick-corner relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE.entrance }}
              >
                <DuotoneImage
                  image={active.image}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[16/10] rounded-panel border border-ink-600"
                />
              </motion.div>
            </AnimatePresence>
            <span className="absolute left-4 top-4 rounded-pill border border-ink-500 bg-ink-900/70 px-3 py-1 font-mono text-micro uppercase tracking-widest text-amber backdrop-blur-panel">
              {active.code}
            </span>
            <div className="absolute bottom-4 right-4 rounded-card border border-ink-600 bg-ink-900/70 px-4 py-3 text-right backdrop-blur-panel">
              <p className="font-display text-2xl font-black text-amber">
                {active.stat.value}
              </p>
              <p className="font-mono text-micro uppercase tracking-widest text-slate-400">
                {active.stat.label}
              </p>
            </div>
          </div>

          {/* Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE.entrance }}
              className="flex flex-col justify-center"
            >
              <h3 className="font-display text-2xl font-bold tracking-tight text-bone-100 sm:text-3xl">
                {active.headline}
              </h3>
              <p className="mt-4 text-lg text-bone-300">{active.description}</p>

              <p className="mt-8 readout">Priority services here</p>
              <motion.ul layout className="mt-3 flex flex-wrap gap-2">
                {active.keyServices.map((slug) => {
                  const svc = serviceBySlug(slug);
                  if (!svc) return null;
                  return (
                    <motion.li
                      layout
                      key={slug}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: EASE.entrance }}
                    >
                      <Link
                        href={`/services/${svc.slug}`}
                        className="inline-flex items-center gap-2 rounded-pill border border-ink-500 px-3 py-1.5 text-sm text-bone-300 transition-colors duration-micro hover:border-amber/50 hover:text-amber"
                      >
                        <span className="h-1.5 w-1.5 rotate-45 bg-amber" />
                        {svc.title}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
