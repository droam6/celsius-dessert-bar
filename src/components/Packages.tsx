'use client';

import { FadeIn } from './FadeIn';
import agencyData from '@data/agency.json';

export const PACKAGE_SELECT_EVENT = 'celsius:package-selected';

function selectPackage(name: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(PACKAGE_SELECT_EVENT, { detail: { name } })
  );
  const target = document.getElementById('contact');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Packages() {
  const packages = agencyData.packages;

  return (
    <section
      id="packages"
      className="bg-[#F0EBDD] py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <FadeIn>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Event Packages
          </p>
          <h2 className="mt-4 max-w-2xl font-heading text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-cream">
            Choose your moment
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-cream/60">
            Three tiers built for the size and feel of your event. Pricing is tailored
            to your venue, guest count, and brand experience — enquire for a quote.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-20 lg:gap-7">
          {packages.map((pkg, i) => {
            const isFeatured = i === 1; // Signature
            return (
              <FadeIn key={pkg.name} delay={0.1 + i * 0.08}>
                <div
                  className={`package-card group relative flex h-full flex-col border bg-[#FFFFFF] p-7 transition-all duration-500 lg:p-8 ${
                    isFeatured
                      ? 'package-card--featured border-gold/40 lg:-translate-y-3'
                      : 'border-[var(--color-border)] hover:-translate-y-1.5 hover:border-gold'
                  }`}
                >
                  {/* Most popular ribbon — solid gold pill, cream text */}
                  {isFeatured && (
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                      <span className="block bg-gold px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#FBF8F0]">
                        Most popular
                      </span>
                    </div>
                  )}

                  {/* Tier badge top-right — outlined deeper-gold pill on white */}
                  <span className="absolute right-6 top-6 flex h-7 w-7 items-center justify-center rounded-full border border-gold bg-[#FFFFFF] text-[11px] font-medium text-gold">
                    {pkg.tier}
                  </span>

                  {/* Name */}
                  <h3 className="font-heading text-2xl text-cream lg:text-3xl">
                    {pkg.name}
                  </h3>

                  {/* Capacity */}
                  <p className="mt-2 text-[13px] uppercase tracking-[0.15em] text-cream/65">
                    {pkg.guest_capacity}
                  </p>

                  {/* Divider */}
                  <div
                    className="my-7 h-[1px] w-full"
                    style={{ background: 'var(--color-border)' }}
                  />

                  {/* Highlights */}
                  <ul className="space-y-3.5">
                    {pkg.highlights.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-3 text-[14px] leading-[1.6] text-cream/80"
                      >
                        <CheckIcon className="mt-[3px] h-4 w-4 shrink-0 text-teal" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-8 flex-1" />
                  <button
                    type="button"
                    onClick={() => selectPackage(pkg.name)}
                    className={`mt-6 inline-flex items-center justify-center px-6 py-3 text-[12px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                      isFeatured
                        ? 'bg-gold text-[#FBF8F0] hover:bg-gold-dark'
                        : 'border border-gold text-gold hover:bg-gold hover:text-[#FBF8F0]'
                    }`}
                  >
                    Enquire about {pkg.name}
                  </button>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Custom-flavour note */}
        {agencyData.menu?.custom_flavour_note && (
          <FadeIn delay={0.5}>
            <p className="mt-12 text-center text-[13px] text-cream/55 lg:mt-16">
              {agencyData.menu.custom_flavour_note}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
