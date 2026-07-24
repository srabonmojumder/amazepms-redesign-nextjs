import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

/**
 * Big-type closing CTA. Reused above the footer on the home page and inner
 * routes. The amber scan-line detail keeps the control-room language going.
 */
export function CTABanner({
  eyebrow = "NEXT // GET STARTED",
  title = "Ready to run your building like it matters?",
  lede = "Book a site survey. We walk the property, map the gaps, and show you exactly what an in-house operation would deliver — no obligation.",
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
}) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden border-t border-ink-600 bg-ink-900 py-section"
    >
      {/* Blueprint ground + scan line */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint bg-grid opacity-30"
      /> */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-amber/60 to-transparent"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="readout mb-6 justify-center">{eyebrow}</p>
          </Reveal>
          <Reveal index={1}>
            <h2
              id="cta-heading"
              className="text-balance font-display text-4xl font-black tracking-tight text-bone-100 sm:text-5xl md:text-6xl"
            >
              {title}
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mx-auto mt-6 max-w-prose text-lg text-bone-300">{lede}</p>
          </Reveal>
          <Reveal index={3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={0.4}>
                <Button href="/contact" size="lg" withArrow>
                  Request a site survey
                </Button>
              </Magnetic>
              <a
                href={site.contact.phoneHref}
                className="font-mono text-sm uppercase tracking-wider text-slate-400 transition-colors duration-micro hover:text-amber"
              >
                or call {site.contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
