import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const CTASection: React.FC = () => {
  return (
    <section
      id="kontakt-cta"
      aria-labelledby="cta-heading"
      className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8"
    >
      <div className="overflow-hidden rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-indigo-600 to-violet-600 p-8 shadow-lg dark:border-indigo-500/20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 id="cta-heading" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Klar for nytt prosjekt?
          </h2>
          <p className="mt-3 text-white/90">
            Få en uforpliktende befaring og et tydelig tilbud – raskt og enkelt.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="bg-white text-stone-900 hover:bg-white/90">
              <Link href="/kontakt" aria-label="Gå til kontaktskjema for uforpliktende befaring">
                Bestill befaring
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 