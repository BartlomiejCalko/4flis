import Image from "next/image";
import Link from "next/link";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Bath, Hammer, Home, Layers, Ruler, Wrench, CheckCircle2, ArrowRight } from "lucide-react";

type Service = {
  title: string;
  description: string;
  details: string[];
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const SERVICES: Service[] = [
  {
    title: "Flislegging",
    description: "Presis legging av fliser for bad, kjøkken og gulv med fokus på detaljer og holdbarhet.",
    details: [
      "Profesjonell legging av keramiske fliser, steingods og naturstein",
      "Gulv-, vegg- og fasadearbeid i alle størrelser",
      "Mønsterlegging og spesialtilpasninger",
      "Bruk av kvalitetsmaterialer og godkjente lim- og fugeprodukter"
    ],
    Icon: Layers
  },
  {
    title: "Bad",
    description: "Komplette baderomsløsninger i henhold til norsk våtromsnorm NS 3420.",
    details: [
      "Komplett våtromssikring etter gjeldende normer",
      "Membran, sluk og fallplanlegging",
      "Moderne design med funksjonelle løsninger",
      "Samarbeid med rørleggere og elektrikere ved behov"
    ],
    Icon: Bath
  },
  {
    title: "Kjøkken",
    description: "Fliser og overflater som tåler daglig bruk og skaper et moderne kjøkkenmiljø.",
    details: [
      "Benkeplater i kompositt eller naturstein",
      "Sprøytbeskyttelse med fliser eller glassplater",
      "Gulvfliser tilpasset høy trafikk",
      "Koordinering med kjøkkenmontører"
    ],
    Icon: Home
  },
  {
    title: "Betongarbeid",
    description: "Støp, avretting og underlag som sikrer perfekt finish og langvarig kvalitet.",
    details: [
      "Avretting av gulv for optimal vannretting",
      "Betongstøp for terrasser og inngangspartier",
      "Forsterkning og reparasjon av undergulv",
      "Preparering før flislegging"
    ],
    Icon: Hammer
  },
  {
    title: "Oppmåling",
    description: "Nøyaktig planlegging og beregning før montering for best mulig resultat.",
    details: [
      "Detaljert befaring og kartlegging av eksisterende bygningsmasse",
      "Presise mål for materiellbestilling",
      "3D-visualisering ved behov",
      "Råd om materialvalg og løsninger"
    ],
    Icon: Ruler
  },
  {
    title: "Reparasjon",
    description: "Utskifting og reparasjon av skadde fliser, fuger og våtromsløsninger.",
    details: [
      "Skifte av enkelte fliser uten å rive hele gulv/vegg",
      "Fornying av fuger som har blitt mørke eller mistet tetthet",
      "Utbedring av membran og våtromssikring",
      "Garantioppfølging og etterservice"
    ],
    Icon: Wrench
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Befaring og tilbud",
    description: "Vi kommer på befaring, kartlegger behov og gir deg et detaljert pristilbud."
  },
  {
    step: "02",
    title: "Planlegging",
    description: "Sammen velger vi materialer, farger og løsninger som passer ditt prosjekt."
  },
  {
    step: "03",
    title: "Utførelse",
    description: "Vi utfører arbeidet fagmessig, ryddig og til avtalt tid."
  },
  {
    step: "04",
    title: "Overlevering",
    description: "Grundig gjennomgang, opprydding og dokumentasjon av utført arbeid."
  }
];

const Page = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/20 dark:to-transparent"
        aria-label="Tjenester hero"
      >
        <div className="absolute inset-0 pointer-events-none">
          <FlickeringGrid
            className="absolute inset-0"
            color="rgb(99, 102, 241)"
            squareSize={3}
            gridGap={6}
            maxOpacity={0.15}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-indigo-200/30 dark:from-background/50 dark:to-indigo-900/20" />
        </div>

        <div className="relative grid gap-8 md:grid-cols-2 items-center p-6 sm:p-10">
          <div>
            <p className="mb-2 text-xs font-medium tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
              Våre tjenester
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Flisarbeid som varer. Kvalitet i hvert kvadratmeter.
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-700 dark:text-stone-300 leading-relaxed">
              Fra bad til kjøkken, fra gulv til fasade – vi leverer fagmessig flisarbeid med presisjon og estetikk i fokus. 
              Alt arbeid utføres i henhold til gjeldende normer og standarder.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/kontakt"
                aria-label="Be om tilbud"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Be om tilbud
              </Link>
              <Link
                href="/prosjekter"
                aria-label="Se våre prosjekter"
                className="inline-flex items-center justify-center rounded-md border border-indigo-200 dark:border-indigo-900/50 px-4 py-2 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Se prosjekter
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[340px] md:h-[460px] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10">
              <Image
                src="/hero/bad3.jpg"
                alt="Profesjonelt flisarbeid"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mt-16" aria-label="Tjenesteoversikt">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Hva vi tilbyr
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-700 dark:text-stone-300 leading-relaxed">
            Spesialiserte tjenester for både private og næringskunder.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="group relative rounded-xl border border-stone-200/60 bg-white/50 p-6 shadow-sm backdrop-blur dark:border-stone-800/60 dark:bg-stone-900/40 transition-all hover:shadow-lg hover:translate-y-[-2px]"
              tabIndex={0}
              aria-label={service.title}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20">
                  <service.Icon aria-hidden className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">
                    {service.description}
                  </p>
                </div>
              </div>

              <ul className="space-y-2" role="list">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" aria-hidden />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section
        className="mt-16 relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-stone-900/40 dark:via-stone-900/20 dark:to-indigo-950/20 p-6 sm:p-10"
        aria-label="Vår arbeidsprosess"
      >
        <div className="absolute inset-0 pointer-events-none">
          <FlickeringGrid
            className="absolute inset-0"
            color="rgb(99, 102, 241)"
            squareSize={2}
            gridGap={8}
            maxOpacity={0.1}
          />
        </div>

        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Slik jobber vi
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-700 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto">
              En strukturert prosess fra første kontakt til ferdig resultat.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className="relative rounded-xl bg-white/70 dark:bg-stone-900/50 p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                role="article"
              >
                <div className="mb-3">
                  <span className="inline-flex items-center justify-center text-3xl font-bold text-indigo-600/20 dark:text-indigo-400/20">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-700 dark:text-stone-300">
                  {item.description}
                </p>
                {idx < PROCESS_STEPS.length - 1 && (
                  <ArrowRight 
                    className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" 
                    aria-hidden 
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="mt-16 relative overflow-hidden rounded-2xl border border-border bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 text-white"
        aria-label="Kontakt CTA"
      >
        <div className="absolute inset-0 opacity-40">
          <FlickeringGrid className="absolute inset-0" color="rgb(255,255,255)" squareSize={3} gridGap={6} maxOpacity={0.25} />
        </div>
        <div className="relative p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Har du et prosjekt i tankene?</h2>
            <p className="mt-2 text-sm md:text-base/relaxed text-white/90 max-w-2xl">
              Vi gir deg et uforpliktende tilbud og råd om hvilke løsninger som passer best for ditt hjem eller bedrift.
            </p>
          </div>
          <Link
            href="/kontakt"
            aria-label="Gå til kontaktskjema"
            className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Kontakt oss
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Page; 