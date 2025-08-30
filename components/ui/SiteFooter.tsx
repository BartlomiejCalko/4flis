"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";


const SiteFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Bunntekst" className="relative z-10 border-t border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label="Hjem">
              <Image src="/logo_flis.png" alt="4FLIS" width={40} height={40} />
              <span className="text-lg font-extrabold tracking-tight text-slate-900">4FLIS</span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-slate-700">
              Skreddersydd flislegging for hjem og næring – detaljene som gjør forskjellen.
            </p>
          </div>

          <nav aria-label="Sider">
            <h3 className="text-sm font-semibold text-slate-900">Sider</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/" className="text-sm text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">Hjem</Link></li>
              <li><Link href="/om-oss" className="text-sm text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">Om oss</Link></li>
              <li><Link href="/tjenester" className="text-sm text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">Tjenester</Link></li>
              <li><Link href="/prosjekter" className="text-sm text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">Prosjekter</Link></li>
              <li><Link href="/kontakt" className="text-sm text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">Kontakt</Link></li>
            </ul>
          </nav>

          <div aria-label="Kontakt">
            <h3 className="text-sm font-semibold text-slate-900">Kontakt</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>E-post: <a href="mailto:post@4flis.no" className="hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">post@4flis.no</a></li>
              <li>Telefon: <a href="tel:+4700000000" className="hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">+47 00 00 00 00</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center">
          <p className="text-xs text-slate-600">© {year} 4FLIS. Alle rettigheter forbeholdt.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter; 