import Image from "next/image";
import Link from "next/link";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Hammer, Shield, Sparkles } from "lucide-react";

const Page = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/20 dark:to-transparent"
        aria-label="Om oss hero"
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
              Om oss
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Håndverk med presisjon. Flis som varer.
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-700 dark:text-stone-300 leading-relaxed">
              Vi er et dedikert team som leverer moderne flis- og overflatearbeid for hjem og næring. Vi kombinerer
              kvalitet, estetikk og pålitelighet – fra planlegging til ferdig resultat.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/prosjekter"
                aria-label="Se våre prosjekter"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Se prosjekter
              </Link>
              <Link
                href="/kontakt"
                aria-label="Kontakt oss"
                className="inline-flex items-center justify-center rounded-md border border-indigo-200 dark:border-indigo-900/50 px-4 py-2 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Kontakt oss
              </Link>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-white/70 dark:bg-white/5 p-3 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                <dt className="text-xs text-slate-600 dark:text-stone-300">År erfaring</dt>
                <dd className="mt-1 text-xl font-semibold">10+</dd>
              </div>
              <div className="rounded-xl bg-white/70 dark:bg-white/5 p-3 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                <dt className="text-xs text-slate-600 dark:text-stone-300">Prosjekter</dt>
                <dd className="mt-1 text-xl font-semibold">100+</dd>
              </div>
              <div className="rounded-xl bg-white/70 dark:bg-white/5 p-3 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                <dt className="text-xs text-slate-600 dark:text-stone-300">Tilfredshet</dt>
                <dd className="mt-1 text-xl font-semibold">100%</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="relative h-[340px] md:h-[460px] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10">
              <Image
                src="/hero/bad4.jpg"
                alt="Vårt arbeid – moderne baderomsprosjekt"
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

      {/* Story */}
      <section className="mt-16 grid gap-8 md:grid-cols-5 items-start" aria-label="Vår historie">
        <div className="md:col-span-2">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Vår historie
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-700 dark:text-stone-300 leading-relaxed">
            Fra små oppdrag til komplekse totalprosjekter – vi har vokst med ambisjonen om å skape varige løsninger.
            Hvert prosjekt er en mulighet til å levere presisjon, ryddighet og faglig stolthet.
          </p>
        </div>
        <ul className="md:col-span-3 grid gap-4 sm:grid-cols-2" role="list">
          <li className="group rounded-xl border border-border bg-background p-5 transition-transform duration-200 hover:translate-y-[-2px]">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                <Hammer className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-semibold">Kvalitet i alle ledd</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Vi bruker riktige materialer og dokumenterte prosesser for et varig resultat.
                </p>
              </div>
            </div>
          </li>
          <li className="group rounded-xl border border-border bg-background p-5 transition-transform duration-200 hover:translate-y-[-2px]">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                <Shield className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-semibold">Pålitelig samarbeid</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tydelig kommunikasjon, avtalt fremdrift og trygg oppfølging – gjennom hele prosjektet.
                </p>
              </div>
            </div>
          </li>
          <li className="group rounded-xl border border-border bg-background p-5 transition-transform duration-200 hover:translate-y-[-2px]">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-semibold">Estetikk som skiller seg ut</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Vi designer og leverer flater som løfter helheten – ned til minste detalj.
                </p>
              </div>
            </div>
          </li>
          <li className="group rounded-xl border border-border bg-background p-5 transition-transform duration-200 hover:translate-y-[-2px]">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                <Hammer className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-semibold">Nøyaktig utførelse</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Skarpe linjer, riktige fall og perfekte overganger – faget i fokus.
                </p>
              </div>
            </div>
          </li>
        </ul>
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
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Klar for å starte et prosjekt?</h2>
            <p className="mt-2 text-sm md:text-base/relaxed text-white/90 max-w-2xl">
              Ta kontakt for en uforpliktende prat. Vi hjelper deg fra idé til ferdig løsning.
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