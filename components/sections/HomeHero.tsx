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
    <ContainerScroll className="h-[350vh]">
      <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4">
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

      <ContainerScale className="relative z-10 text-center">
        <h1 className="max-w-xl text-5xl font-bold tracking-tighter text-slate-800 ">
          Din animerte hero
        </h1>
        <p className="my-6 max-w-xl text-sm text-slate-700 md:text-base">
          En hero-seksjon med scroll-animasjoner og levende galleri.
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
  );
};

export default HomeHero; 