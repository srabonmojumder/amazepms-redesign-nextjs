import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { CTABanner } from "@/components/sections/CTABanner";
import { site, stats } from "@/data/site";
import { about } from "@/data/about";

export const metadata: Metadata = {
  title: "About — 20+ years, delivered in-house",
  description:
    "Amaze PMS is an Integrated Facility Management company founded in 2001 in Hyderabad. A subsidiary of the Action Group, delivering every service in-house across India.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        code="ABOUT // SINCE 2001"
        title="Two decades of keeping buildings running"
        lede={site.description}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      {/* Story + founder */}
      <section className="bg-ink-900 py-section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="tick-corner relative">
              <DuotoneImage
                image={about.founderImage}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/5] rounded-panel border border-ink-600"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-card border border-ink-600 bg-ink-900/70 p-4 backdrop-blur-panel">
                <p className="font-display font-bold text-bone-100">
                  {site.founder.name}
                </p>
                <p className="mt-1 text-sm text-slate-400">{site.founder.title}</p>
              </div>
            </div>
          </Reveal>

          <div className="order-1 flex flex-col justify-center lg:order-2">
            <p className="readout mb-5">The origin</p>
            {about.story.map((para, i) => (
              <Reveal as="p" index={i} key={i} className="mb-5 text-lg text-bone-300">
                {para}
              </Reveal>
            ))}
            <Reveal index={2}>
              <blockquote className="mt-4 border-l-2 border-amber pl-5">
                <p className="font-display text-xl text-bone-100">
                  &ldquo;{site.founder.bio}&rdquo;
                </p>
                <cite className="mt-3 block font-mono text-micro uppercase not-italic tracking-widest text-slate-500">
                  {site.founder.name} — {site.founder.title}
                </cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-ink-600 bg-ink-800/50 py-16">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-ink-600 bg-ink-600 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal as="div" index={i} key={s.label}>
                <div className="h-full bg-ink-800 p-6">
                  <p className="font-display text-4xl font-black tracking-tight text-amber">
                    {s.prefix}
                    <CountUp value={s.value} format={s.suffix !== ""} />
                    {s.suffix}
                  </p>
                  <dd className="mt-2 text-sm text-slate-400">{s.label}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-ink-900 py-section">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="readout mb-4">
              <span className="text-amber">HOW WE WORK</span>
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-bone-100 sm:text-4xl">
              Four principles we don&apos;t bend on
            </h2>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {about.principles.map((p, i) => (
              <Reveal as="li" index={i % 2} key={p.code}>
                <div className="tick-corner relative h-full rounded-card border border-ink-600 bg-ink-800 p-7">
                  <span className="font-mono text-micro uppercase tracking-widest text-amber">
                    {p.code}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-bone-100">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-base text-bone-300">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner
        eyebrow="WORK WITH US"
        title="One workforce. Every service. Your building."
      />
    </main>
  );
}
