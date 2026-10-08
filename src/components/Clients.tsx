/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from 'react';
import agencyData from '@data/agency.json';

/* Real partners only (see CLAUDE.md). Every mark is drawn in one colour and stays still. */
export default function Clients() {
  const partners = agencyData.brand_partners;
  if (!partners.length) return null;

  return (
    <section id="clients" aria-labelledby="clients-title" className="border-y border-bone/15 py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-6 lg:grid-cols-[1fr_3.2fr] lg:gap-16 lg:px-12">
        <h2 id="clients-title" className="text-[1rem] leading-[1.5] text-bone/65">
          Selected clients
          <br />
          and venues
        </h2>
        <ul className="grid grid-cols-3 items-center gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-5 lg:gap-x-12 lg:gap-y-14">
          {partners.map((p) => (
            <li key={p.name} className="flex items-center justify-start">
              <img
                src={'logo_mono' in p && p.logo_mono ? p.logo_mono : p.logo}
                alt={p.name}
                loading="lazy"
                className={`logo-mono ${p.shape === 'tall' ? 'logo-mono--tall' : ''}`}
                style={{ '--s': 'scale' in p && p.scale ? p.scale : 1 } as CSSProperties}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
