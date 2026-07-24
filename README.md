# Amaze PMS — "Operational Precision"

A premium marketing-site redesign for **Amaze Property Management Solutions Pvt Ltd**,
an Integrated Facility Management (IFM) services company in India — *not* a software
product. The site is built to feel **institutional first, beautiful second**, for the
facility heads, RWA committees, and procurement leads who evaluate a vendor for
multi-year contracts.

> Headline promise: **"We keep 20 million square feet running."**

---

## Overview

- **9 in-house services** (Housekeeping, MEP, Security, Pest Control, Landscaping,
  STP/WTP, Parking, Pool, Office Support), each with a spec-sheet detail page.
- **6 property sectors** served, presented as an interactive filter.
- A signature **pinned horizontal "Inside a site day"** scroll scene walking a
  24-hour operations cycle.
- Fully responsive (360 → 1920), keyboard-navigable, and with a real
  `prefers-reduced-motion` path throughout.
- Content is **typed and data-driven** — every section reads from `src/data/*`.

### Routes

| Route | Description |
| --- | --- |
| `/` | Home — the showcase page (11 sections) |
| `/services/[slug]` | Dynamic service detail, statically generated for all 9 services |
| `/about` | Company story, founder, principles |
| `/contact` | Contact details + working, validated contact form |
| `sitemap.xml`, `robots.txt` | Generated from the data layer |

---

## Design rationale — "Operational Precision"

Facility management is *invisible work that keeps buildings alive*. Rather than the
default dark-mode-with-purple-gradient AI look, the design language is a **precision
operations control room**: technical blueprint aesthetics meeting warm human service.

- **Palette.** Deep architectural charcoal (`#0B0D0E`) with layered near-black
  surfaces, a single confident accent — **safety amber `#FFB020`** (hi-vis vests,
  hazard tape) used sparingly (roughly one accent per viewport). Warm **bone
  `#F4F2EE`** light sections (testimonials) break the dark rhythm so the site never
  reads like another dark portfolio.
- **Motifs that make it original.** A faint blueprint grid revealed on scroll;
  corner tick marks and an architect's **dimension line** on the hero; monospace
  **live-ops readouts** (`SEC-04 // POST`, `UPTIME 99.4%`) as UI chrome; floor-plan
  SVG lines that **draw themselves on scroll**; charcoal/amber **duotone imagery**
  with a grain overlay so stock photography stops looking like stock.
- **Type.** Display **Satoshi** (self-hosted), body **Inter** (17px, 1.65),
  micro/technical **JetBrains Mono**. A fully fluid `clamp()` type scale — no fixed
  px sizes in components.
- **Motion.** Engineered, not bouncy. Entrances on `cubic-bezier(0.22,1,0.36,1)`,
  transforms on `(0.65,0,0.35,1)`; transform/opacity only; 60–80ms staggers.

Every section carries one considered detail a human art director would argue for —
the hero's dimension line, the in-house hub-and-spoke that builds on scroll, the
24-hour ruler with a live indicator, the success-state reference number, etc.

---

## Tech decisions

- **Next.js 15 (App Router) + React 19 + TypeScript (strict).** Server Components by
  default; `"use client"` only where interactivity requires it. Static generation for
  every route.
- **Tailwind CSS v3 with a full token layer** (`tailwind.config.ts`). Chose v3 over
  v4 deliberately: the brief calls for a token-heavy JS config, which v4's CSS-first
  config would fight. Colors, the fluid type scale, spacing, easings, shadows, and
  keyframes are all tokens — **zero magic values in JSX**.
- **GSAP + ScrollTrigger** for scroll-driven scenes (hero parallax, pinned horizontal
  scroll, SVG draw-ins, progress fills). All work is wrapped in `useGSAP` /
  `gsap.context()` with proper cleanup; responsive scenes use `gsap.matchMedia` so
  resize and teardown are automatic.
- **Framer Motion** for component-level micro-interactions (magnetic CTA, segment
  filter with `layoutId`/`AnimatePresence`, reveal entrances, form/slider states).
- **Lenis** smooth scroll, **synced to GSAP's ticker** (single rAF loop,
  `lagSmoothing(0)`, `ScrollTrigger.update` on scroll) and fully torn down on unmount.
  Disabled entirely under reduced motion (native scroll).
- **`next/font`** self-hosts Satoshi (local `.woff2`) + Inter/JetBrains Mono; every
  image uses **`next/image`** with explicit dimensions (no layout shift).
- **No UI kit.** Every component — button, card, marquee, magnetic wrapper, draggable
  slider, tabs, map — is built from scratch.

---

## Folder structure

```
src/
  app/                      # routes, layouts, metadata, sitemap/robots, fonts
    services/[slug]/        # dynamic service pages (generateStaticParams)
    about/  contact/        # inner routes
  components/
    sections/               # Hero, ServicesGrid, DayTimeline, CoverageMap, ...
    ui/                     # Button, Reveal, Marquee, Magnetic, DuotoneImage, ...
    layout/                 # Nav, Footer, SmoothScrollProvider
  hooks/                    # useMediaQuery, useReducedMotion, useMousePosition, useLenis
  lib/                      # gsap registration, motion presets, utils
  data/                     # services, segments, testimonials, process, dayTimeline,
                            # coverage, site, story, about, clients (all typed)
  styles/                   # globals.css (base, component utilities, reduced-motion)
  types/                    # content.ts (content model), global.d.ts
```

**Conventions**

- One shared `Reveal` component owns the standard entrance animation — no section
  re-implements scroll-reveal logic.
- Every scroll scene branches on `prefers-reduced-motion` and forces a visible
  end-state (never leaves content hidden).
- Heavy scroll scenes simplify below `768px`: the horizontal "site day" becomes a
  vertical stacked timeline, not a broken drag.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (zero warnings)
npm run typecheck  # tsc --noEmit (zero errors)
```

**Requirements:** Node 18.18+ (Node 20+ recommended). The Satoshi font files ship in
`src/app/fonts/`; Inter and JetBrains Mono are fetched and self-hosted at build time
by `next/font`.

Deploy: **Vercel-ready** (zero config).

---

## Accessibility

- Semantic landmarks (`header`/`nav`/`main`/`section`/`article`/`footer`), a single
  `<h1>` per page, logical heading order, skip-to-content link.
- All interactive elements are keyboard-operable: nav + mobile overlay (focus trap
  return, `Esc` to close), segment tabs (`tablist`/`tab`/`tabpanel`), the testimonial
  slider (arrow keys + buttons), map pins (focusable buttons), and the contact form
  (`aria-invalid` + `aria-describedby`, focus moves to the first invalid field).
- Visible amber focus ring on every focusable element.
- **WCAG AA contrast**: muted slate and the amber accent were tuned per background
  (a dark `amber-700` is used for text on the light bone section).
- A genuine reduced-motion path: Lenis and all scroll scenes are disabled, entrances
  render statically, and count-ups jump to their final value.

---

## Performance notes

- Static generation for all routes; `next/image` (AVIF/WebP, sized) with the hero
  marked `priority` for LCP; lazy-loaded imagery below the fold.
- Self-hosted fonts with `display: swap` and system fallbacks; explicit image and
  type dimensions keep **CLS ≈ 0**.
- Animation runs on transform/opacity only; Lenis shares GSAP's single rAF ticker.
- The interactive home page ships GSAP + Framer Motion + Lenis (~the bulk of the
  shared bundle). See *"With more time"* for how I'd trim it further.

---

## Content integrity

Per the brief, nothing is fabricated: no real client logos, certifications, or
awards, and no invented statistics beyond the verified figures (20M+ sq ft, 15,000+
staff, 200+ clients, founded 2001). Client names are neutral placeholders
(e.g. "Northgate Residences") and testimonials are labelled **representative**.
Imagery is license-safe placeholder photography processed through the duotone
treatment, with clean swap points in `src/data/*` for real Amaze assets.

---

## With more time

- **Code-split the heavy scroll scenes** (`DayTimeline`, `CoverageMap`,
  `InHouseDiagram`) behind `next/dynamic` with SSR'd content but deferred hydration,
  to cut initial JS/TBT on the home page.
- **Real backend** for the contact form (currently a client-only demo submission)
  with server actions, spam protection, and email delivery.
- **Real assets**: replace placeholder photography and the stylized India map with a
  survey-accurate SVG and permissioned client logos.
- A **CMS** (or MDX) layer behind `src/data/*` so marketing can edit content.
- **Automated checks**: Playwright visual regression + axe-core in CI, and a Lighthouse
  budget gate.
- Richer per-service **case studies** and a careers section (the bone "human"
  treatment would extend naturally there).
```
