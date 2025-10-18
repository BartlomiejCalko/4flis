"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ZoomParallax } from "@/components/ui/zoom-parallax";


type Project = {
  title: string;
  imageUrl: string;
  href: string;
};

const PROJECTS: Project[] = [
  { title: "Lyst bad", imageUrl: "/hero/bad3.jpg", href: "/prosjekter" },
  { title: "Mørke fliser", imageUrl: "/hero/bad7.jpg", href: "/prosjekter" },
  { title: "Moderne dusj", imageUrl: "/hero/bad4.jpg", href: "/prosjekter" },
  { title: "Detaljert arbeid", imageUrl: "/hero/bad8.jpg", href: "/prosjekter" },
  { title: "Moderne dusj", imageUrl: "/hero/bad2.jpg", href: "/prosjekter" },
  { title: "Detaljert arbeid", imageUrl: "/hero/bad6.jpg", href: "/prosjekter" },
];

const FeaturedProjectsSection: React.FC = () => {
  const parallaxImages = React.useMemo(
    () => PROJECTS.map((p) => ({ src: p.imageUrl, alt: p.title })),
    []
  );

  const mobileImages = PROJECTS.slice(0, 3);

  return (
    <section
      id="featured-projects"
      aria-labelledby="featured-projects-heading"
      className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="featured-projects-heading" className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Utvalgte prosjekter
        </h2>
        <p className="mt-3 text-sm text-stone-700 dark:text-stone-200 md:text-base">
          Et utvalg av arbeid vi er stolte av.
        </p>
      </div>

      {/* Mobile: Simple grid with 3 images */}
      <div className="mt-10 md:hidden grid grid-cols-1 gap-4">
        {mobileImages.map((project, index) => (
          <div key={index} className="relative w-full h-64 overflow-hidden rounded-xl shadow-lg">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Desktop: Zoom Parallax showcase */}
      <div className="mt-10 hidden md:block">
        <ZoomParallax images={parallaxImages} />
      </div>

      <div className="mt-10 md:-mt-48 text-center">
        <Link
          href="/prosjekter"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Se alle prosjekter"
        >
          Se alle bilder
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection; 