import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";

/**
 * Inner-route hero. Clears the fixed nav, carries the blueprint grid + corner
 * ticks, and supports an optional breadcrumb and side slot (e.g. readouts).
 */
export function PageHero({
  code,
  title,
  lede,
  breadcrumb,
  aside,
}: {
  code: string;
  title: ReactNode;
  lede?: ReactNode;
  breadcrumb?: { label: string; href: string }[];
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-600 bg-ink-900 pb-16 pt-[calc(var(--nav-height)+clamp(2.5rem,6vh,5rem))]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint bg-grid opacity-[0.25]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent"
      />
      <div className="container-page relative">
        {breadcrumb && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-micro uppercase tracking-widest text-slate-500">
                {breadcrumb.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-2">
                    {i > 0 && <span className="text-ink-500">/</span>}
                    <Link
                      href={c.href}
                      className="transition-colors duration-micro hover:text-amber"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-amber" />
                <span className="font-mono text-micro uppercase tracking-widest text-amber">
                  {code}
                </span>
              </div>
            </Reveal>
            <Reveal index={1}>
              <h1 className="text-balance font-display text-4xl font-black tracking-tightest text-bone-100 sm:text-5xl md:text-6xl">
                {title}
              </h1>
            </Reveal>
            {lede && (
              <Reveal index={2}>
                <p className="mt-6 max-w-prose text-lg text-bone-300">{lede}</p>
              </Reveal>
            )}
          </div>
          {aside && (
            <Reveal index={2} className="lg:justify-self-end">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
