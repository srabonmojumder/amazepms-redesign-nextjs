"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { navLinks, site } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll state — glass panel + border after the hero starts leaving.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Lock scroll + handle Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const toggleButton = menuButtonRef.current;
    const lenis = window.__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggleButton?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-nav">
      <div
        className={cn(
          "transition-all duration-base ease-entrance",
          scrolled
            ? "border-b border-ink-600 bg-ink-900/70 backdrop-blur-panel"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="container-page flex h-[var(--nav-height)] items-center justify-between gap-4"
        >
          <Wordmark />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative rounded-card px-3 py-2 font-display text-sm font-medium text-bone-300 transition-colors duration-micro hover:text-bone-100"
                >
                  {link.label}
                  <span className="pointer-events-none absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-amber transition-transform duration-micro ease-transform group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Live-ops status chip — the signature control-room detail */}
            <span className="hidden items-center gap-2 rounded-pill border border-ink-600 bg-ink-800/60 px-3 py-1.5 xl:inline-flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-signal-active" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-active" />
              </span>
              <span className="font-mono text-[0.5625rem] uppercase tracking-widest text-slate-400">
                Ops // Online
              </span>
            </span>

            <Button
              href="/contact"
              size="sm"
              className="hidden sm:inline-flex"
              withArrow
            >
              Request a survey
            </Button>

            {/* Mobile menu toggle */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center rounded-card border border-ink-600 bg-ink-800/60 lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="flex h-3 w-5 flex-col justify-between">
                <span
                  className={cn(
                    "h-px w-full bg-bone-200 transition-transform duration-micro ease-transform",
                    open && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-full bg-bone-200 transition-opacity duration-micro",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-full bg-bone-200 transition-transform duration-micro ease-transform",
                    open && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE.entrance }}
            className="fixed inset-0 z-overlay bg-ink-900/95 backdrop-blur-panel lg:hidden"
          >
            <div className="container-page flex h-[var(--nav-height)] items-center justify-between">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="relative grid h-11 w-11 place-items-center rounded-card border border-ink-600 bg-ink-800/80 text-bone-200 transition-colors hover:border-amber/40 hover:text-amber"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 stroke-current"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav
              aria-label="Mobile"
              className="container-page mt-8 flex flex-col"
            >
              <p className="readout mb-6">Navigation</p>
              <ul className="flex flex-col divide-y divide-ink-600 border-y border-ink-600">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.06,
                      duration: 0.4,
                      ease: EASE.entrance,
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="font-display text-3xl font-bold tracking-tight text-bone-200">
                        {link.label}
                      </span>
                      <span className="font-mono text-micro uppercase tracking-widest text-amber">
                        {link.index}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-4">
                <Button href="/contact" size="lg" withArrow onClick={() => setOpen(false)}>
                  Request a survey
                </Button>
                <a
                  href={site.contact.phoneHref}
                  className="font-mono text-sm uppercase tracking-wider text-slate-400"
                >
                  {site.contact.phone}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
