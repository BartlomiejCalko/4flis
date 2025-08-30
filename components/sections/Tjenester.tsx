"use client";

import React from "react";
import { Bath, Hammer, Home, Layers, Ruler, Wrench, type LucideIcon } from "lucide-react";


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

const TjenesterSection: React.FC = () => {
  return (
    <section
      id="tjenester"
      aria-labelledby="tjenester-heading"
      className="relative flex flex-col z-10 mx-auto w-full max-w-7xl h-[calc(100vh-4rem)] px-4 py-16 sm:px-6 lg:px-8 items-center justify-center bg-gradient-to-br from-white to-gray-200 backdrop-blur-xl p-6 rounded-xl"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="tjenester-heading" className="text-3xl font-bold tracking-tight text-slate-900">
          Tjenester
        </h2>
        <p className="mt-3 text-sm text-slate-700 md:text-base">
          Vi leverer kvalitet i alle ledd – fra planlegging til ferdig resultat.
        </p>
      </div>

      <ul role="list" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ title, description, Icon }) => (
          <li key={title} role="listitem">
            <div
              className="group h-full rounded-xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:shadow-md focus-within:shadow-md"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                  <Icon aria-hidden className="h-6 w-6" />
                  <span className="sr-only">{title}</span>
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm text-slate-700">{description}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TjenesterSection; 