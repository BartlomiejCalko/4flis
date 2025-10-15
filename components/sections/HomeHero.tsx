"use client";
import React from "react";
import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "@/components/blocks/hero-gallery-scroll-animation";
import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  "/hero/bad5.jpg",
  "/hero/bad2.jpg",
  "/hero/bad3.jpg",
  "/hero/bad4.jpg",
  "/hero/bad6.jpg"
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

        <ContainerScale className="relative z-10 text-center p-6 rounded-xl mt-6">
          
          {/* <div className="flex flex-col items-center mb-4">
							<Image src="/logo_flis.png" alt="4FLIS" width={80} height={60} />
							<p className="mt-[-18px] font-{bodoni.className} text-8xl">4FLIS</p>
          </div> */}
          <h1 className="max-w-xl text-5xl font-bold tracking-tighter text-slate-800 dark:text-white">
            Flis som varer. Håndverk som skiller seg ut.
          </h1> 
          <p className="my-4 max-w-xl text-sm text-slate-700 dark:text-stone-300 md:text-base">
            Skreddersydd flislegging for hjem og næring – detaljene som gjør forskjellen.
          </p> 
          <div className="flex items-center justify-center gap-4 mt-4">
            <Link
              href="/kontakt"
              aria-label="Kontakt oss"
              className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Kontakt oss
            </Link>
            <Link
              href="/prosjekter"
              aria-label="Se våre prosjekter"
              className="inline-flex items-center justify-center bg-transparent px-4 py-2 text-sm font-medium underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Se våre prosjekter
            </Link>
          
          </div>
        </ContainerScale>
      </ContainerScroll>
    </>
  );
};

export default HomeHero; 