"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { inHouse } from "@/data/story";

const CX = 500;
const CY = 330;
const RX = 372;
const RY = 244;

/** Precompute node positions around an ellipse (top-first, clockwise). */
const nodes = inHouse.nodes.map((label, i) => {
  const angle = (-90 + (360 / inHouse.nodes.length) * i) * (Math.PI / 180);
  return {
    label,
    x: CX + RX * Math.cos(angle),
    y: CY + RY * Math.sin(angle),
  };
});

export function InHouseDiagram() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      // Reduced motion (or the first render before the media query resolves):
      // force the finished, fully-visible state and skip all animation.
      if (reduced) {
        gsap.set("[data-connector]", { strokeDashoffset: 0 });
        gsap.set("[data-node], [data-hub]", { autoAlpha: 1, scale: 1 });
        return;
      }

      gsap.set("[data-connector]", { strokeDashoffset: 1 });
      gsap.set("[data-node]", { autoAlpha: 0, scale: 0.8, transformOrigin: "center" });
      gsap.set("[data-hub]", { autoAlpha: 0, scale: 0.9, transformOrigin: "center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });
      tl.to("[data-hub]", { autoAlpha: 1, scale: 1, duration: 0.4 })
        .to(
          "[data-connector]",
          { strokeDashoffset: 0, duration: 1, stagger: 0.12, ease: "none" },
          0.2,
        )
        .to(
          "[data-node]",
          { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.12 },
          0.5,
        );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      aria-labelledby="inhouse-heading"
      className="relative overflow-hidden border-y border-ink-600 bg-ink-800/40 py-section"
    >
      {/* Faint blueprint ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint-fine bg-grid-fine opacity-40"
      />
      <div className="container-page relative">
        <SectionHeader
          id="inhouse-heading"
          code={inHouse.code}
          title={inHouse.title}
          lede={inHouse.lede}
          align="center"
        />

        <div ref={root} className="mx-auto mt-14 max-w-5xl">
          <svg
            viewBox="0 0 1000 660"
            className="h-auto w-full"
            role="img"
            aria-label="Diagram: all nine service lines connect to one central Amaze operations hub, delivered in-house."
          >
            {/* Connectors */}
            {nodes.map((n, i) => (
              <line
                key={`c-${i}`}
                data-connector
                pathLength={1}
                x1={CX}
                y1={CY}
                x2={n.x}
                y2={n.y}
                className="[stroke-dasharray:1] stroke-amber/45"
                strokeWidth={1}
              />
            ))}

            {/* Hub */}
            <g data-hub>
              <rect
                x={CX - 96}
                y={CY - 40}
                width={192}
                height={80}
                rx={10}
                className="fill-ink-900 stroke-amber"
                strokeWidth={1.5}
              />
              <text
                x={CX}
                y={CY - 6}
                textAnchor="middle"
                className="fill-amber font-mono text-[13px] uppercase tracking-[0.2em]"
              >
                One Roof
              </text>
              <text
                x={CX}
                y={CY + 18}
                textAnchor="middle"
                className="fill-bone-200 font-display text-[19px] font-bold"
              >
                {inHouse.hub}
              </text>
              {/* Corner ticks on hub */}
              {[
                [CX - 96, CY - 40, 1, 1],
                [CX + 96, CY - 40, -1, 1],
                [CX - 96, CY + 40, 1, -1],
                [CX + 96, CY + 40, -1, -1],
              ].map(([x, y, dx, dy], i) => (
                <path
                  key={`t-${i}`}
                  d={`M ${x} ${(y as number) + 10 * (dy as number)} L ${x} ${y} L ${(x as number) + 10 * (dx as number)} ${y}`}
                  className="stroke-amber"
                  strokeWidth={1.5}
                  fill="none"
                />
              ))}
            </g>

            {/* Service nodes */}
            {nodes.map((n, i) => (
              <g key={`n-${i}`} data-node>
                <rect
                  x={n.x - 78}
                  y={n.y - 21}
                  width={156}
                  height={42}
                  rx={8}
                  className="fill-ink-800 stroke-ink-500"
                  strokeWidth={1}
                />
                <circle cx={n.x - 60} cy={n.y} r={3} className="fill-amber" />
                <text
                  x={n.x - 48}
                  y={n.y + 5}
                  className="fill-bone-200 font-display text-[15px] font-medium"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Contrast caption */}
          <p className="mx-auto mt-8 max-w-prose text-center text-sm text-slate-400">
            <span className="text-bone-200">One hub, nine lines, zero hand-offs.</span>{" "}
            The alternative — a different vendor for each of these — is where
            accountability goes to die.
          </p>
        </div>
      </div>
    </section>
  );
}
