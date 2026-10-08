'use client';

import { FadeIn } from './FadeIn';
import agencyData from '@data/agency.json';

export const PACKAGE_SELECT_EVENT = 'celsius:package-selected';

function selectPackage(name: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(PACKAGE_SELECT_EVENT, { detail: { name } }));
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* Set like a list on a printed card: one row per package, hairlines, no boxes, no prices (standing rule). */
export default function Packages() {
  const packages = agencyData.packages;
  const included = agencyData.packages_included;

  return (
    <section id="packages" className="on-paper bg-paper py-24 text-ink lg:py-36">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        <FadeIn className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <h2 className="display text-[clamp(2.5rem,5.4vw,4.75rem)]">
            Three packages, by guest count
          </h2>
          <p className="max-w-[30rem] leading-[1.65] text-ink/75 lg:pt-4">
            Each one includes {included[0].toLowerCase()}, {included[1].toLowerCase()}, and{' '}
            {included[2].toLowerCase()}. Pricing depends on your date, venue and guest count,
            so we quote each event.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ul className="mt-14 border-t border-ink lg:mt-24">
            {packages.map((p) => (
              <li
                key={p.name}
                className="grid gap-x-10 gap-y-2 border-b border-ink/25 py-8 md:grid-cols-[1.1fr_1fr_1.6fr_auto] md:items-baseline lg:py-10"
              >
                <h3 className="display text-[2.5rem] italic lg:text-[3.25rem]">{p.name}</h3>
                <p className="display-sm text-[1.5rem] lg:text-[1.75rem]">{p.guests} guests</p>
                <p className="leading-[1.55] text-ink/80">
                  {p.flavours}
                  <br />
                  {p.service}
                </p>
                <button
                  type="button"
                  onClick={() => selectPackage(p.name)}
                  aria-label={`Enquire about the ${p.name} package`}
                  className="link mt-2 flex min-h-12 cursor-pointer items-center justify-self-start text-[0.9375rem] font-medium md:mt-0"
                >
                  Enquire
                </button>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
