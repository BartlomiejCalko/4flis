import HomeHero from "@/components/sections/HomeHero";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import TjenesterSection from "@/components/sections/Tjenester";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjects";

export default function Home() {
  return (
    <div className="font-sans">
      <HomeHero />
      <main className="relative z-10">
        <TjenesterSection />
        <FeaturedProjectsSection />
      </main>
      <div className="fixed inset-0 z-0 pointer-events-none">
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
