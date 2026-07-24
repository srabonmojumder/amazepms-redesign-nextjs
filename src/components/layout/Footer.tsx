import Link from "next/link";
import { site, navLinks } from "@/data/site";
import { services } from "@/data/services";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-600 bg-ink-900">
      {/* Faint blueprint grid ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint bg-grid opacity-40"
      />

      <div className="container-page relative py-section">
        {/* Top: address block + columns */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="readout mb-5">Amaze PMS // Since {site.founded}</p>
            <p className="max-w-xs text-lg text-bone-300">{site.tagline}</p>
            <address className="mt-6 not-italic">
              <p className="text-sm text-slate-400">{site.hq.address}</p>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-3 inline-block font-mono text-sm text-bone-300 underline-offset-4 hover:text-amber hover:underline"
              >
                {site.contact.email}
              </a>
            </address>
          </div>

          <FooterColumn title="Services">
            {services.slice(0, 6).map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
            <FooterLink href="/#services">All services →</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Connect">
            <FooterLink href={site.contact.phoneHref}>
              {site.contact.phone}
            </FooterLink>
            {site.social.map((s) => (
              <FooterLink key={s.label} href={s.href} external>
                {s.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-ink-600 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-micro uppercase tracking-widest text-slate-500">
            © {year} {site.legalName}
          </p>
          <p className="font-mono text-micro uppercase tracking-widest text-slate-500">
            {site.hq.area}, {site.hq.state} {"// 17.44°N 78.34°E"}
          </p>
        </div>
      </div>

      {/* Oversized wordmark bleeding off the baseline — the considered detail */}
      <div
        aria-hidden
        className="pointer-events-none select-none px-gutter"
      >
        <span className="block translate-y-[0.18em] font-display text-[clamp(4rem,20vw,18rem)] font-black leading-none tracking-tightest text-ink-800">
          AMAZE
        </span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="readout mb-5">{title}</h2>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "text-sm text-slate-400 transition-colors duration-micro hover:text-bone-200";
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={href} className={className}>
        {children}
      </Link>
    </li>
  );
}
