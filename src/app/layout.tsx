import type { Metadata, Viewport } from "next";
import { satoshi, inter, jetbrainsMono } from "./fonts";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Integrated Facility Management, In-House`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: [
    "integrated facility management",
    "facility management India",
    "housekeeping services",
    "MEP operations",
    "security services",
    "Hyderabad facility management",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Integrated Facility Management, In-House`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Integrated Facility Management`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0D0E",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-modal focus:rounded-card focus:bg-amber focus:px-4 focus:py-2 focus:font-mono focus:text-micro focus:uppercase focus:tracking-widest focus:text-ink-900">
          Skip to content
        </a>
        <JsonLd />
        <SmoothScrollProvider>
          <Nav />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
