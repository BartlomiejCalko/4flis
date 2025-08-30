"use client";
import React from "react";
import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "@/components/blocks/hero-gallery-scroll-animation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const IMAGES = [
  "/bad1.jpg",
  "/bad2.jpg",
  "/bad3.jpg",
  "/bad4.jpg",
  "/bad5.jpg"
];

const HomeHero: React.FC = () => {
  return (
    <>
      {/* Mobile: simple hero without scroll */}
      <div className="md:hidden px-4 py-6 flex flex-col pt-16 pb-16">
        <h1 className="text-center text-3xl font-bold tracking-tighter text-slate-800 dark:text-white">
          Flis som varer. Håndverk som skiller seg ut.
        </h1>
        <p className="mt-3 text-sm text-center text-slate-700 dark:text-stone-300">
          Skreddersydd flislegging for hjem og næring – detaljene som gjør forskjellen.
        </p>
        <div className="mt-5 relative w-full h-64 overflow-hidden rounded-xl shadow-xl">
          <Image
            className="object-cover object-center"
            src={IMAGES[0]}
            alt="Galleri bilde"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Desktop: original scroll/grid experience */}
      <ContainerScroll className="hidden md:block h-[350vh] z-40">
        <BentoGrid className="sticky left-0 top-16 z-0 h-[calc(100vh-4rem)] w-full p-4">
          {IMAGES.map((imageUrl, index) => (
            <BentoCell key={index} className="relative overflow-hidden rounded-xl shadow-xl">
              <Image
                className="object-cover object-center"
                src={imageUrl}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={index === 0}
              />
            </BentoCell>
          ))}
        </BentoGrid>

        <ContainerScale className="relative z-10 text-center p-6 rounded-xl">
          <h1 className="max-w-xl text-5xl font-bold tracking-tighter text-slate-800 dark:text-white">
            Flis som varer. Håndverk som skiller seg ut.
          </h1>
          <p className="my-6 max-w-xl text-sm text-slate-700 dark:text-stone-300 md:text-base">
            Skreddersydd flislegging for hjem og næring – detaljene som gjør forskjellen.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-400">
              Kom i gang
            </Button>
            <Button variant="link" className="bg-transparent px-4 py-2 font-medium">
              Lær mer
            </Button>
          </div>
        </ContainerScale>
      </ContainerScroll>
    </>
  );
};

export default HomeHero; 