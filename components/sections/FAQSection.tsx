import React from "react";


type Faq = { question: string; answer: string };

const FAQS: Faq[] = [
  {
    question: "Hvordan starter vi prosessen?",
    answer: "Ta kontakt via skjemaet vårt. Vi avtaler befaring, vurderer omfang og sender et tydelig tilbud.",
  },
  {
    question: "Hvor lang tid tar et vanlig prosjekt?",
    answer: "Tidslinjen varierer etter størrelse og kompleksitet. Vi gir en konkret plan og holder deg oppdatert.",
  },
  {
    question: "Hvilke materialer anbefaler dere?",
    answer: "Vi anbefaler slitesterke og vedlikeholdsvennlige materialer basert på romtype, bruk og budsjett.",
  },
  {
    question: "Har dere garanti på arbeid?",
    answer: "Ja, vi tilbyr garanti og står for arbeidet vårt. Oppdager du noe i etterkant, tar vi tak i det.",
  },
  {
    question: "Jobber dere i mitt område?",
    answer: "Vi dekker Oslo og omegn. Kontakt oss for å bekrefte om vi dekker ditt område.",
  },
  {
    question: "Kan jeg se flere referanser?",
    answer: "Ja, se prosjektene våre på nettsiden eller be om referanser ved behov.",
  },
];

const FAQSection: React.FC = () => {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative z-10 mx-auto w-full max-w-4xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="text-center">
        <h2 id="faq-heading" className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Ofte stilte spørsmål
        </h2>
        <p className="mt-3 text-sm text-stone-700 dark:text-stone-200 md:text-base">
          Finner du ikke svar? <a href="/kontakt" className="text-indigo-600 underline hover:text-indigo-700 dark:text-indigo-400">Kontakt oss</a>.
        </p>
      </div>

      <div className="mt-10 divide-y divide-stone-200 dark:divide-stone-800 rounded-xl border border-stone-200/60 bg-white/50 p-2 backdrop-blur dark:border-stone-800/60 dark:bg-stone-900/40">
        {FAQS.map((item) => (
          <details
            key={item.question}
            className="group p-4"
            aria-label={item.question}
          >
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-stone-900 outline-none transition hover:text-stone-700 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-stone-100 dark:hover:text-stone-200"
            >
              <span className="text-base font-medium">{item.question}</span>
              <span className="ml-4 h-5 w-5 shrink-0 rounded-full border border-stone-300 text-stone-500 transition group-open:rotate-45 group-open:bg-indigo-50 group-open:text-indigo-600 dark:border-stone-700 dark:text-stone-400 dark:group-open:bg-indigo-500/10 dark:group-open:text-indigo-300 flex items-center justify-center" aria-hidden>
                +
              </span>
            </summary>
            <div className="mt-2 text-sm text-stone-700 dark:text-stone-300">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQSection; 