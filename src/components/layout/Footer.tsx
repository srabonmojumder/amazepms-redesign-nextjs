import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { site, navLinks } from "@/data/site";
import { services } from "@/data/services";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-600 bg-ink-900">
      {/* Faint blueprint grid ground */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint bg-grid opacity-30"
      /> */}

      <div className="container-page relative pb-10 pt-16 sm:pt-20">
        {/* Top: brand block + link columns */}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-5 text-base text-bone-300">{site.tagline}</p>
            <address className="mt-6 flex flex-col gap-2 not-italic">
              <span className="text-sm text-slate-400">{site.hq.address}</span>
              <a
                href={`mailto:${site.contact.email}`}
                className="font-mono text-sm text-bone-300 underline-offset-4 transition-colors duration-micro hover:text-amber hover:underline"
              >
                {site.contact.email}
              </a>
            </address>
          </div>

          <FooterColumn title="Services">
            {services.slice(0, 5).map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
            <FooterLink href="/#services" accent>
              All services →
            </FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <FooterLink href="/contact" accent>
              Request a survey →
            </FooterLink>
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
        <div className="mt-14 flex flex-col gap-4 border-t border-ink-600 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-micro uppercase leading-[1.6] tracking-widest text-slate-500">
            © {year} {site.legalName}
          </p>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
            <p className="font-mono text-micro uppercase leading-[1.6] tracking-widest text-slate-500">
              {site.hq.area}, {site.hq.state} {"// 17.44°N 78.34°E"}
            </p>
            <a
              href="#main"
              className="inline-flex w-fit items-center gap-1.5 font-mono text-micro uppercase tracking-widest text-slate-400 transition-colors duration-micro hover:text-amber"
            >
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden>
                <path
                  d="M6 10V2M3 5l3-3 3 3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to top
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark — contained in a tight cropped band, not a void */}
      <div
        aria-hidden
        className="pointer-events-none relative flex h-[clamp(3rem,9vw,7.5rem)] items-start justify-center overflow-hidden"
      >
        <span className="-translate-y-[0.1em] whitespace-nowrap font-display text-[clamp(5rem,17vw,13rem)] font-black leading-none tracking-tightest text-ink-800">
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
  accent,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  accent?: boolean;
}) {
  const className = accent
    ? "text-sm font-medium text-amber underline-offset-4 transition-colors duration-micro hover:text-amber-300"
    : "text-sm text-slate-400 transition-colors duration-micro hover:text-bone-200";
  if (external) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
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
