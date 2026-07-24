"use client";

import Link from "next/link";
import { useRef } from "react";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/types/content";

/**
 * Spec-sheet service card. On hover: a duotone image fades in behind the
 * content, the icon shifts, and an amber spotlight follows the cursor (driven
 * by CSS vars set on pointermove — no React re-render per frame).
 */
export function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={`/services/${service.slug}`}
      onPointerMove={handleMove}
      className="group relative flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-card border border-ink-600 bg-ink-800 p-6 transition-colors duration-base hover:border-ink-500 sm:p-7"
    >
      {/* Duotone image reveal */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-base ease-entrance group-hover:opacity-100">
        <DuotoneImage
          image={service.image}
          intensity="strong"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-ink-900/78" />
      </div>

      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-base group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--x, 50%) var(--y, 0%), rgba(255,176,32,0.15), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-micro uppercase tracking-widest text-amber">
          {service.code}
        </span>
        <span className="grid h-11 w-11 place-items-center rounded-card border border-ink-600 bg-ink-900/60 text-slate-400 transition-all duration-base group-hover:border-amber/40 group-hover:text-amber">
          <ServiceIcon
            name={service.icon}
            className="h-5 w-5 transition-transform duration-base ease-entrance group-hover:-translate-y-0.5"
          />
        </span>
      </div>

      <div className="relative">
        <h3 className="font-display text-xl font-bold tracking-tight text-bone-100">
          {service.title}
        </h3>
        <p className="mt-2 text-sm text-slate-400 transition-colors duration-base group-hover:text-bone-300">
          {service.tagline}
        </p>

        {/* Spec-sheet metric strip */}
        <div className="mt-5 flex items-center justify-between border-t border-ink-600 pt-4">
          <span className="font-mono text-micro uppercase tracking-widest text-slate-500">
            {service.metrics[0]?.label}
            <span className="mx-1.5 text-ink-500">/</span>
            <span className="text-bone-300">{service.metrics[0]?.value}</span>
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-micro uppercase tracking-widest text-slate-500 transition-colors duration-base group-hover:text-amber">
            View
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
