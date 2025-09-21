import React from "react";
import { ShieldCheck, Clock3, Handshake, BadgeCheck, Sparkles, Ruler } from "lucide-react";


type Usp = {
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const USPS: Usp[] = [
  { title: "Kvalitet i alle ledd", description: "Fagmessig utførelse med varige løsninger og rene detaljer.", Icon: ShieldCheck },
  { title: "På tid og på budsjett", description: "Forutsigbar fremdrift og tydelige milepæler.", Icon: Clock3 },
  { title: "Ryggdekning og garanti", description: "Vi står for arbeidet vårt – og kommer tilbake ved behov.", Icon: BadgeCheck },
  { title: "God dialog", description: "Tett samarbeid fra befaring til ferdig levert.", Icon: Handshake },
  { title: "Presisjon og finish", description: "Nøyaktige mål, rette fuger og sømløse overganger.", Icon: Ruler },
  { title: "Estetikk som varer", description: "Materialvalg og utførelse som tåler tidens tann.", Icon: Sparkles },
];

const USPSection: React.FC = () => {
  return (
    <section
      id="hvorfor-oss"
      aria-labelledby="usp-heading"
      className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="usp-heading" className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Hvorfor velge oss
        </h2>
        <p className="mt-3 text-sm text-stone-700 dark:text-stone-200 md:text-base">
          Verdier som styrer alle våre prosjekter – fra første kontakt til overlevering.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {USPS.map((item) => (
          <div
            key={item.title}
            className="group relative rounded-xl border border-stone-200/60 bg-white/50 p-6 shadow-sm backdrop-blur dark:border-stone-800/60 dark:bg-stone-900/40 transition-colors"
            role="article"
            aria-label={item.title}
            tabIndex={0}
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20">
                <item.Icon aria-hidden className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default USPSection; 