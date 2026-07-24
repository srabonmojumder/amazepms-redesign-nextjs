import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { whyIFM } from "@/data/story";

/**
 * Split editorial: a sticky duotone visual on the left holds while the
 * problem→answer column scrolls past it on the right. CSS `sticky` (not GSAP
 * pin) keeps it robust with Lenis and reduced motion alike.
 */
export function WhyIFM() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="relative bg-ink-900 py-section"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Sticky visual */}
          <div className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:h-fit">
            <div className="tick-corner relative">
              <DuotoneImage
                image={whyIFM.visual}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/5] rounded-panel border border-ink-600"
              />
              {/* Blueprint overlay + readouts floating on the visual */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-panel bg-blueprint bg-grid opacity-20"
              />
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                <span className="w-fit rounded-pill border border-ink-500 bg-ink-900/70 px-3 py-1 font-mono text-micro uppercase tracking-widest text-amber backdrop-blur-panel">
                  Integrated Ops
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-card border border-ink-600 bg-ink-900/70 px-4 py-3 backdrop-blur-panel">
                {[
                  { k: "Vendors", v: "1" },
                  { k: "Workforce", v: "In-house" },
                  { k: "Coverage", v: "24/7" },
                ].map((r) => (
                  <span
                    key={r.k}
                    className="font-mono text-micro uppercase tracking-widest text-slate-400"
                  >
                    {r.k}
                    <span className="mx-1.5 text-ink-500">/</span>
                    <span className="text-bone-200">{r.v}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling text column */}
          <div>
            <SectionHeader
              id="why-heading"
              code={whyIFM.code}
              title={whyIFM.title}
              lede={whyIFM.lede}
            />

            <ol className="mt-12 flex flex-col">
              {whyIFM.points.map((p, i) => (
                <Reveal as="li" index={i} key={p.code}>
                  <article className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-t border-ink-600 py-8">
                    <span className="font-mono text-micro uppercase tracking-widest text-amber">
                      {p.code}
                    </span>
                    <div>
                      <p className="flex flex-wrap items-center gap-2 font-mono text-micro uppercase tracking-widest text-slate-500">
                        <span className="text-signal-alert/80 line-through decoration-ink-500">
                          {p.problem}
                        </span>
                      </p>
                      <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-bone-100 sm:text-2xl">
                        {p.answer}
                      </h3>
                      <p className="mt-3 text-base text-bone-300">{p.detail}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
