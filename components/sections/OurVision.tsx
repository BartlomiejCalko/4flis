"use client";

import React from "react";
import FlipLink from "@/components/ui/text-effect-flipper";

const OurVisionSection: React.FC = () => {
  return (
    <section
      className="relative flex flex-row min-h-[50vh] md:h-[calc(100vh-4rem)] w-full items-center justify-center p-4 py-16 md:py-4"
      aria-label="Our vision section"
    >
      <div className="flex flex-col items-center justify-center gap-2 md:gap-6 px-2 md:px-4 text-center bg-gradient-to-br from-purple-400/50 to-blue-500/20 dark:from-purple-500/5 dark:to-blue-500/3 w-full h-full rounded-xl py-12 md:py-0">
        <div className="flex flex-row items-center justify-center gap-3 md:gap-6">
        <FlipLink href="/om-oss">Sammen</FlipLink>
        <FlipLink href="/om-oss">med</FlipLink>
        </div>
        <div className="flex flex-row items-center justify-center gap-3 md:gap-6">
        <FlipLink href="/om-oss">de</FlipLink>
        <FlipLink href="/om-oss">beste</FlipLink>
        </div>
        <div className="flex flex-row items-center justify-center gap-3 md:gap-6">
        <FlipLink href="/om-oss">vi</FlipLink>
        <FlipLink href="/om-oss">skaper</FlipLink>
        </div>
        <div className="flex flex-row items-center justify-center gap-3 md:gap-6">
        <FlipLink href="/om-oss">det</FlipLink>
        <FlipLink href="/om-oss">beste</FlipLink>
        </div>
        
      </div>
    </section>
  );
};

export default OurVisionSection; 