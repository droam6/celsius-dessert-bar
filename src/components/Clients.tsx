/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from 'react';
import agencyData from '@data/agency.json';

/* Real partners only (see CLAUDE.md). Brands are shown as marks: eight of them, four across,
   so no cell is left empty. Every mark is drawn in one colour and stays still.
   Venues are set as names: several venue marks are symbols nobody recognises without the
   name beside them, and a typeset list reads better than six mismatched logos. */
export default function Clients() {
  const partners = agencyData.brand_partners;
  const brands = partners.filter((p) => p.kind === 'brand');
  const venues = partners.filter((p) => p.kind === 'venue');
  if (!partners.length) return null;

  const rowLabel = 'text-[1rem] leading-[1.5] text-bone/65';

  return (
    <section id="clients" aria-labelledby="clients-title" className="border-y border-bone/15 py-16 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        <h2 id="clients-title" className="sr-only">
          Clients and venues
        </h2>

        {brands.length > 0 && (
          <div className="grid gap-10 lg:grid-cols-[1fr_3.2fr] lg:gap-16">
            <h3 className={rowLabel}>Selected clients</h3>
            <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4 lg:gap-x-12 lg:gap-y-14">
              {brands.map((p) => (
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
        )}

        {venues.length > 0 && (
          <div
            className={`grid gap-6 lg:grid-cols-[1fr_3.2fr] lg:gap-16 ${
              brands.length > 0 ? 'mt-14 border-t border-bone/15 pt-12 lg:mt-20 lg:pt-16' : ''
            }`}
          >
            <h3 className={rowLabel}>Venues we have worked in</h3>
            {/* Same four-column grid and gaps as the logos above; each name spans two columns,
                so the two lists share their left edges. */}
            <ul className="grid gap-x-8 sm:grid-cols-4 lg:gap-x-12">
              {venues.map((p) => (
                <li
                  key={p.name}
                  className="display-sm border-b border-bone/15 py-3 text-[1.375rem] text-bone sm:col-span-2 lg:text-[1.5rem]"
                >
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
