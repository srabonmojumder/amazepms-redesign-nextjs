import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-900 pt-[var(--nav-height)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint bg-grid opacity-30"
      />
      <div className="container-page relative">
        <p className="readout mb-6">ERR // 404 — OFF THE FLOOR PLAN</p>
        <h1 className="font-display text-6xl font-black tracking-tightest text-bone-100 sm:text-hero">
          404
        </h1>
        <p className="mt-6 max-w-prose text-lg text-bone-300">
          This page isn&apos;t on the schematic. It may have moved, or never
          existed. Let&apos;s get you back to solid ground.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/" size="lg" withArrow>
            Back to home
          </Button>
          <Button href="/#services" size="lg" variant="outline">
            Browse services
          </Button>
        </div>
      </div>
    </main>
  );
}
