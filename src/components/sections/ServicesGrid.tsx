import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/data/services";

export function ServicesGrid() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-24 bg-ink-900 py-section"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="services-heading"
            code="SVC // 09 LINES"
            title="Nine services. One accountable workforce."
            lede="Every line below is delivered in-house — screened, trained, and supervised by Amaze. Not a subcontractor in sight."
          />
          <Reveal className="hidden shrink-0 md:block">
            <Button href="/contact" variant="outline" withArrow>
              Discuss your site
            </Button>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" index={i % 3} key={service.slug}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
