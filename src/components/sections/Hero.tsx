"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Headline tokens — grouped into visual lines; amber marks the key figure. */
const HEADLINE: { text: string; accent?: boolean }[][] = [
  [{ text: "We" }, { text: "keep" }],
  [{ text: "20", accent: true }, { text: "million", accent: true }, { text: "sq.ft" }],
  [{ text: "running." }],
];

const HERO_READOUTS = [
  { label: "Uptime", value: "99.4%" },
  { label: "Sites", value: "200+" },
  { label: "Workforce", value: "15,000+" },
  { label: "Coverage", value: "PAN-India" },
];

const HERO_IMAGE = {
  src: "/images/misc/hero.jpg",
  alt: "A modern high-rise building exterior seen from below at dusk",
  width: 2560,
  height: 1600,
};

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      gsap.set(words, { yPercent: 115 });
      gsap.set("[data-hero-eyebrow], [data-hero-fade]", { autoAlpha: 0, y: 18 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });
      tl.to("[data-hero-eyebrow]", { autoAlpha: 1, y: 0, duration: 0.6 })
        .to(words, { yPercent: 0, duration: 0.95, stagger: 0.08 }, "-=0.25")
        .to(
          "[data-hero-fade]",
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 },
          "-=0.55",
        );

      // Scroll-out parallax: background drifts slower, content lifts and fades.
      gsap.to("[data-hero-bg]", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-hero-content]", {
        y: -48,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "62% top",
          scrub: true,
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink-900"
    >
      {/* Background image — parallax layer */}
      <div data-hero-bg className="absolute inset-0 z-0 scale-110">
        <DuotoneImage
          image={HERO_IMAGE}
          priority
          intensity="base"
          sizes="100vw"
          className="h-full w-full"
        />
      </div>

      {/* Blueprint grid + vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-blueprint bg-grid opacity-[0.3]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(130%_100%_at_50%_0%,transparent_45%,rgba(11,13,14,0.5)_100%)]"
      />
      {/* Editorial legibility scrim — darkens the type side, keeps the building */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-ink-900 via-ink-900/70 to-ink-900/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2 bg-gradient-to-t from-ink-900 to-transparent"
      />

      {/* Corner ticks framing the viewport */}
      <HeroCornerTicks />

      {/* CONTENT */}
      <div
        data-hero-content
        className="container-page relative z-10 flex min-h-[100svh] flex-col justify-between pb-8 pt-[calc(var(--nav-height)+clamp(1.5rem,4vh,3.5rem))]"
      >
        {/* Eyebrow */}
        <div data-hero-eyebrow className="flex items-center gap-3">
          <span className="h-px w-8 shrink-0 bg-amber" />
          <p className="min-w-0 font-mono text-micro uppercase tracking-widest text-bone-300">
            Integrated Facility Management{" "}
            <span className="text-slate-400">{"// Since 2001"}</span>
          </p>
        </div>

        {/* Headline block with dimension-line detail */}
        <div className="relative flex flex-1 items-center py-[clamp(1.5rem,4vh,3rem)]">
          <div className="relative w-full">
            {/* Architect's dimension line — the considered detail */}
            <DimensionLine />

              <h1
                id="hero-heading"
                className="font-display font-black uppercase leading-[0.9] tracking-tightest text-bone-100"
              >
                {HEADLINE.map((line, li) => (
                  <span key={li} className="block text-hero">
                    {line.map((word, wi) => (
                      <span
                        key={wi}
                        className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom last:mr-0"
                      >
                        <span
                          data-word
                          className={cn(
                            "inline-block will-change-transform",
                            word.accent && "text-amber",
                          )}
                        >
                          {word.text}
                        </span>
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              <p
                data-hero-fade
                className="mt-6 max-w-prose text-lg text-bone-300"
              >
                Housekeeping, MEP, security, and more — delivered entirely by our
                own trained workforce across{" "}
                <span className="text-bone-100">20 million square feet</span> of
                Indian property.
              </p>

              <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.4}>
                  <Button href="/contact" size="lg" withArrow>
                    Request a site survey
                  </Button>
                </Magnetic>
                <Button href="/#services" size="lg" variant="outline">
                  Explore services
                </Button>
              </div>
            </div>
          </div>

        {/* Live-ops readout strip */}
        <div
          data-hero-fade
          className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink-600/80 pt-5"
        >
          {HERO_READOUTS.map((r) => (
            <div key={r.label} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-amber" />
              <span className="font-mono text-micro uppercase tracking-widest text-slate-400">
                {r.label}
                <span className="mx-1.5 text-ink-500">/</span>
                <span className="text-bone-200">{r.value}</span>
              </span>
            </div>
          ))}
          <span className="ml-auto hidden items-center gap-2 font-mono text-micro uppercase tracking-widest text-slate-500 sm:flex">
            Scroll
            <span className="inline-block h-4 w-px animate-scan bg-amber/60" />
          </span>
        </div>
      </div>
    </section>
  );
}

/** Amber corner brackets at the viewport edges — control-room chrome. */
function HeroCornerTicks() {
  const base = "pointer-events-none absolute h-4 w-4 border-amber/50";
  return (
    <div aria-hidden className="absolute inset-[clamp(0.75rem,2vw,1.5rem)] z-0">
      <span className={cn(base, "left-0 top-0 border-l border-t")} />
      <span className={cn(base, "right-0 top-0 border-r border-t")} />
      <span className={cn(base, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(base, "bottom-0 right-0 border-b border-r")} />
    </div>
  );
}

/** Vertical dimension line annotating the headline height. */
function DimensionLine() {
  return (
    <div
      aria-hidden
      className="absolute -left-6 top-0 hidden h-full flex-col items-center justify-between md:flex lg:-left-10"
    >
      <span className="h-2 w-2 rotate-45 border-l border-t border-amber/60" />
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-amber/10 via-amber/40 to-amber/10" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[0.5rem] uppercase tracking-widest text-amber/70">
          20M sq.ft
        </span>
      </div>
      <span className="h-2 w-2 rotate-45 border-b border-r border-amber/60" />
    </div>
  );
}
