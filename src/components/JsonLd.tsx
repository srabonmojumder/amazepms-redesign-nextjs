import { site } from "@/data/site";
import { services } from "@/data/services";

/**
 * LocalBusiness structured data for rich results. Rendered once in the root
 * layout. Only verified facts from the data layer are used.
 */
export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phone,
    foundingDate: String(site.founded),
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.title,
    },
    parentOrganization: {
      "@type": "Organization",
      name: site.parent,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.hq.city,
      addressRegion: site.hq.state,
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: services.map((s) => s.title),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.tagline,
        url: `${site.url}/services/${s.slug}`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, generated from our own typed data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
