import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { services, serviceBySlug, serviceSlugs } from "@/data/services";
import { segments } from "@/data/segments";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} — Amaze PMS`,
      description: service.tagline,
      images: [{ url: service.image.src }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const relatedSegments = segments.filter((s) =>
    s.keyServices.includes(service.slug),
  );
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <main id="main">
      <PageHero
        code={`${service.code} // SERVICE`}
        title={service.title}
        lede={service.tagline}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/#services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
        aside={
          <span className="grid h-20 w-20 place-items-center rounded-panel border border-amber/40 bg-ink-800 text-amber">
            <ServiceIcon name={service.icon} className="h-9 w-9" />
          </span>
        }
      />

      {/* Overview: image + description + metrics */}
      <section className="bg-ink-900 py-section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="tick-corner relative">
              <DuotoneImage
                image={service.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/5] rounded-panel border border-ink-600"
                priority
              />
            </div>
          </Reveal>
          <div className="flex flex-col justify-center">
            <p className="readout mb-5">The scope</p>
            <p className="text-lg text-bone-300">{service.description}</p>

            <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-panel border border-ink-600 bg-ink-600">
              {service.metrics.map((m) => (
                <div key={m.label} className="bg-ink-800 p-5">
                  <dt className="font-mono text-micro uppercase tracking-widest text-slate-500">
                    {m.label}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-bold text-amber">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Capabilities — spec sheet */}
      <section className="border-t border-ink-600 bg-ink-800/40 py-section">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="readout mb-4 text-amber">Capabilities</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-bone-100 sm:text-4xl">
              What&apos;s included
            </h2>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-panel border border-ink-600 bg-ink-600 sm:grid-cols-2">
            {service.capabilities.map((cap, i) => (
              <Reveal as="li" index={i % 2} key={cap}>
                <div className="flex h-full items-start gap-4 bg-ink-900 p-6">
                  <span className="mt-1 font-mono text-micro uppercase tracking-widest text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-bone-200">{cap}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Related segments */}
      {relatedSegments.length > 0 && (
        <section className="bg-ink-900 py-section">
          <div className="container-page">
            <p className="readout mb-4 text-amber">Where it matters most</p>
            <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-bone-100 sm:text-4xl">
              Sectors that lean on this service
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {relatedSegments.map((s) => (
                <Link
                  key={s.id}
                  href={`/#segments`}
                  className="inline-flex items-center gap-2 rounded-pill border border-ink-500 px-4 py-2 text-sm text-bone-300 transition-colors duration-micro hover:border-amber/50 hover:text-amber"
                >
                  <span className="h-1.5 w-1.5 rotate-45 bg-amber" />
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="border-t border-ink-600 bg-ink-900 py-section">
        <div className="container-page">
          <p className="readout mb-8">More in-house services</p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 rounded-card border border-ink-600 bg-ink-800 p-6 transition-colors duration-base hover:border-ink-500"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-micro uppercase tracking-widest text-amber">
                      {s.code}
                    </span>
                    <ServiceIcon
                      name={s.icon}
                      className="h-5 w-5 text-slate-500 transition-colors duration-base group-hover:text-amber"
                    />
                  </span>
                  <span className="font-display text-lg font-bold tracking-tight text-bone-100">
                    {s.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner
        eyebrow={`${service.code} // GET STARTED`}
        title={`Need ${service.title.toLowerCase()} done right?`}
        lede="Book a site survey and we'll scope this service — and everything around it — for your property."
      />
    </main>
  );
}
