import { site, stats } from "@/data/site";
import { services } from "@/data/services";

/**
 * Temporary Phase 1 verification page. Confirms the token layer, fonts, and
 * typed data are wired. Replaced by real sections in later phases.
 */
export default function Home() {
  return (
    <main id="main" className="min-h-screen bg-ink-900">
      <section className="container-page py-section">
        <p className="readout mb-6">SYSTEM // PHASE 01 — SCAFFOLD OK</p>
        <h1 className="font-display text-5xl font-black text-bone-200">
          {site.name}
        </h1>
        <p className="mt-4 max-w-prose text-lg text-bone-300">{site.tagline}</p>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-ink-600 bg-ink-600 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink-800 p-6">
              <p className="font-display text-3xl font-black text-amber">
                {s.prefix}
                {s.value.toLocaleString("en-IN")}
                {s.suffix}
              </p>
              <p className="mt-2 text-sm text-slate-400">{s.label}</p>
              <p className="readout mt-3">{s.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p className="readout mb-4">SERVICES // {services.length} LINES</p>
          <ul className="grid gap-px overflow-hidden rounded-panel border border-ink-600 bg-ink-600 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <li key={svc.slug} className="tick-corner relative bg-ink-800 p-6">
                <span className="readout text-amber">{svc.code}</span>
                <h2 className="mt-2 font-display text-xl font-bold text-bone-200">
                  {svc.title}
                </h2>
                <p className="mt-2 text-sm text-slate-400">{svc.tagline}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
