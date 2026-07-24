import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyIFM } from "@/components/sections/WhyIFM";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { DayTimeline } from "@/components/sections/DayTimeline";
import { InHouseDiagram } from "@/components/sections/InHouseDiagram";
import { SegmentsExplorer } from "@/components/sections/SegmentsExplorer";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CoverageMap } from "@/components/sections/CoverageMap";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <TrustBar />
      <WhyIFM />
      <ServicesGrid />
      <DayTimeline />
      <InHouseDiagram />
      <SegmentsExplorer />
      <Process />
      <Testimonials />
      <CoverageMap />
    </main>
  );
}
