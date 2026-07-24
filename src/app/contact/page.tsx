import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Book a site survey",
  description:
    "Talk to Amaze PMS about integrated, in-house facility management for your property. Book a no-obligation site survey.",
  alternates: { canonical: "/contact" },
};

const details = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "Phone", value: site.contact.phone, href: site.contact.phoneHref },
  { label: "Head office", value: site.hq.address },
  { label: "Hours", value: "Operations 24/7 · Office Mon–Sat, 9:30–18:30 IST" },
];

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        code="CONTACT // 24-HOUR OPS"
        title="Let's walk your site"
        lede="Tell us about the property. We'll come out, survey it, and show you exactly what an in-house operation would look like — headcount, scope, and SLAs."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="bg-ink-900 py-section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Details */}
          <div>
            <p className="readout mb-6">Direct lines</p>
            <dl className="flex flex-col divide-y divide-ink-600 border-y border-ink-600">
              {details.map((d) => (
                <div key={d.label} className="grid grid-cols-[7rem_1fr] gap-4 py-5">
                  <dt className="font-mono text-micro uppercase tracking-widest text-slate-500">
                    {d.label}
                  </dt>
                  <dd className="text-bone-200">
                    {d.href ? (
                      <a
                        href={d.href}
                        className="underline-offset-4 transition-colors duration-micro hover:text-amber hover:underline"
                      >
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 rounded-panel border border-ink-600 bg-ink-800 p-6">
              <p className="readout text-amber">Why a survey first</p>
              <p className="mt-3 text-sm text-bone-300">
                Every property is different. We don&apos;t quote from a template —
                we walk your site, count the real scope, and price the actual work.
                It&apos;s the same discipline we bring to running it.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
