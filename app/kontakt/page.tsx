import React from "react";
import { ContactPage } from "@/components/ui/contact-page";
import { ContactForm } from "@/components/ui/contact-form";

const Page = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="sr-only">Kontakt</h1>
      <section aria-label="Kontakt informacje" className="mb-12">
        <ContactPage />
      </section>
      
    </main>
  );
};

export default Page; 