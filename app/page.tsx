import HomeHero from "@/components/sections/HomeHero";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import TjenesterSection from "@/components/sections/Tjenester";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjects";
import OurVisionSection from "@/components/sections/OurVision";
import USPSection from "@/components/sections/USPSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <div className="font-sans">
      <HomeHero />
      <main className="relative z-10">
        <OurVisionSection />
        <USPSection />
        <TjenesterSection />
        
        <FeaturedProjectsSection />
        
        <FAQSection />
        <CTASection />
      </main>
      <div className="hidden md:block fixed inset-0 z-0 pointer-events-none">
          <FlickeringGrid
            className="w-full h-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.2}
            flickerChance={0.1}
          />
        </div>
    </div>
  );
}
