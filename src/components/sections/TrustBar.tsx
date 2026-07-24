import { Marquee } from "@/components/ui/Marquee";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/data/clients";
import { stats } from "@/data/site";

export function TrustBar() {
  return (
    <section
      aria-label="Clients and key figures"
      className="relative border-y border-ink-600 bg-ink-800/50 py-14"
    >
      {/* Client wordmark marquee */}
      <div className="mb-14">
        <div className="container-page mb-6">
          <p className="readout">
            Trusted across 200+ properties{" "}
            <span className="text-ink-500">— representative clients</span>
          </p>
        </div>
        <div className="relative">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-900 to-transparent" />
          <Marquee duration={45}>
            {clients.map((c) => (
              <div key={c.name} className="group flex items-center gap-3">
                <span className="h-1.5 w-1.5 rotate-45 bg-ink-500 transition-colors duration-micro group-hover:bg-amber" />
                <span className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-slate-500 transition-colors duration-micro group-hover:text-bone-200">
                  {c.name}
                </span>
                <span className="whitespace-nowrap font-mono text-[0.5625rem] uppercase tracking-widest text-ink-500 transition-colors duration-micro group-hover:text-amber">
                  {c.segment}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Four key numbers */}
      <div className="container-page">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-ink-600 bg-ink-600 lg:grid-cols-4">
          {stats.map((s, i) => {
            const doFormat = s.suffix !== ""; // years render unformatted
            return (
              <Reveal as="div" index={i} key={s.label} className="h-full">
                <div className="tick-corner relative flex h-full flex-col justify-between gap-6 bg-ink-800 p-6 sm:p-7">
                  <dt className="readout">{s.detail}</dt>
                  <div>
                    <p className="font-display text-4xl font-black tracking-tight text-bone-100 sm:text-5xl">
                      {s.prefix}
                      <span className="text-amber">
                        <CountUp value={s.value} format={doFormat} />
                      </span>
                      {s.suffix}
                    </p>
                    <dd className="mt-2 text-sm text-slate-400">{s.label}</dd>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
