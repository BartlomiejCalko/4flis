"use client";

import React from "react";
import { Bath, Hammer, Home, Layers, Ruler, Wrench, type LucideIcon } from "lucide-react";
import MagicBento, { type BentoCardProps } from "@/components/MagicBento";


type Service = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const SERVICES: Service[] = [
  { title: "Flislegging", description: "Presis legging av fliser for bad, kjøkken og gulv.", Icon: Layers },
  { title: "Bad", description: "Komplette baderomsløsninger i henhold til våtromsnorm.", Icon: Bath },
  { title: "Kjøkken", description: "Fliser og overflater som tåler daglig bruk og ser bra ut.", Icon: Home },
  { title: "Betongarbeid", description: "Støp, avretting og underlag for perfekt finish.", Icon: Hammer },
  { title: "Oppmåling", description: "Nøyaktig planlegging og beregning før montering.", Icon: Ruler },
  { title: "Reparasjon", description: "Utskifting og reparasjon av skadde fliser og fuger.", Icon: Wrench },
];

const mapServicesToCards = (services: Service[]): (BentoCardProps & { Icon?: LucideIcon })[] => {
  const colors = ["#0a0a0a", "#0b0a14", "#0d0a1a", "#0e0a20", "#100a26", "#120a2c"];
  return services.map((s, i) => ({
    title: s.title,
    description: s.description,
    label: "Tjeneste",
    color: colors[i % colors.length],
    Icon: s.Icon,
  }));
};

const TjenesterSection: React.FC = () => {
  const cards = mapServicesToCards(SERVICES);

  return (
    <section
      id="tjenester"
      aria-labelledby="tjenester-heading"
      className="relative flex flex-col z-10 mx-auto w-full max-w-7xl h-[calc(100vh-4rem)] px-4 py-16 sm:px-6 lg:px-8 items-center justify-center p-6 rounded-xl"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="tjenester-heading" className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Tjenester
        </h2>
        <p className="mt-3 text-sm text-stone-700 dark:text-stone-200 md:text-base">
          Vi leverer kvalitet i alle ledd – fra planlegging til ferdig resultat.
        </p>
      </div>

      <div className="relative mt-10 flex w-full items-center justify-center">
        <MagicBento
          textAutoHide
          enableSpotlight
          enableStars
          enableBorderGlow
          
          clickEffect
          enableMagnetism
          glowColor="50, 0, 235"
          cards={cards}
          fullScreen
          containerClassName="w-full"
          gridClassName=""
          renderCardContent={(card, _index) => {
            const IconComp = (card as unknown as { Icon?: LucideIcon }).Icon;
            return (
              <>
                <div className="flex items-start gap-4 text-white">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/20">
                    {IconComp ? <IconComp aria-hidden className="h-6 w-6" /> : null}
                    <span className="sr-only">{card.title}</span>
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                    <p className="mt-1 text-sm text-white/80">{card.description}</p>
                  </div>
                </div>
              </>
            );
          }}
        />
      </div>
    </section>
  );
};

export default TjenesterSection; 