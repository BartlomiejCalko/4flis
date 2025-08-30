import HomeHero from "@/components/sections/HomeHero";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export default function Home() {
  return (
    <div className="font-sans">
      <HomeHero />
      <div className="fixed inset-0 z-0 pointer-events-none">
          <FlickeringGrid
            className="w-full h-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        </div>
    </div>
  );
}
