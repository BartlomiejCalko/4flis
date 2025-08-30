"use client";

import React from "react";
import FlipLink from "@/components/ui/text-effect-flipper";

const OurVisionSection: React.FC = () => {
  return (
    <section
      className="relative flex flex-row h-[calc(100vh-4rem)] w-full items-center justify-center bg-gradient-to-br from-purple-200 to-blue-300 dark:from-stone-900 dark:to-stone-950 backdrop-blur-md p-6 rounded-xl"
      aria-label="Our vision section"
    >
      <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex flex-row items-center justify-center gap-6">
        <FlipLink href="/om-oss">Sammen</FlipLink>
        <FlipLink href="/om-oss">med</FlipLink>
        </div>
        <div className="flex flex-row items-center justify-center gap-6">
        <FlipLink href="/om-oss">de</FlipLink>
        <FlipLink href="/om-oss">beste</FlipLink>
        </div>
        <div className="flex flex-row items-center justify-center gap-6">
        <FlipLink href="/om-oss">vi</FlipLink>
        <FlipLink href="/om-oss">skaper</FlipLink>
        </div>
        <div className="flex flex-row items-center justify-center gap-6">
        <FlipLink href="/om-oss">det</FlipLink>
        <FlipLink href="/om-oss">beste</FlipLink>
        </div>
        
      </div>
    </section>
  );
};

export default OurVisionSection; 