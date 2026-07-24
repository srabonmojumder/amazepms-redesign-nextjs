"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";

export function Process() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = fill.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { scaleY: 1 });
        return;
      }
      gsap.set(el, { scaleY: 0, transformOrigin: "top" });
      gsap.to(el, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 60%",
          end: "bottom 75%",
          scrub: 0.5,
        },
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      aria-labelledby="process-heading"
      className="relative border-t border-ink-600 bg-ink-900 py-section"
    >
      <div className="container-page">
        <SectionHeader
          id="process-heading"
          code="PROC // ENGAGEMENT"
          title="From first survey to steady-state, in four moves"
          lede="No black boxes. Here is exactly how a site goes from a walkthrough to a running, audited operation."
        />

        <div ref={root} className="relative mt-14 pl-10 sm:pl-14">
          {/* Track + fill */}
          <span
            aria-hidden
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-ink-600 sm:left-[7px]"
          />
          <span
            ref={fill}
            aria-hidden
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-amber sm:left-[7px]"
          />

          <ol className="flex flex-col gap-12">
            {processSteps.map((step, i) => (
              <Reveal as="li" index={i} key={step.code} className="relative">
                {/* Marker */}
                <span className="absolute -left-10 top-1 grid h-4 w-4 place-items-center rounded-full border border-amber bg-ink-900 sm:-left-14">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-micro uppercase tracking-widest text-amber">
                      {step.code}
                    </span>
                    <span className="font-mono text-micro uppercase tracking-widest text-slate-500">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-bone-100 sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="max-w-prose text-base text-bone-300">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
