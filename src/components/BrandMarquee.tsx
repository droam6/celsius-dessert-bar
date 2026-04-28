import Image from 'next/image';
import agencyData from '@data/agency.json';

// Logos that are white-on-transparent and would vanish on cream — wrap in a dark pill.
const NEEDS_DARK_BG = new Set<string>([
  'Navarra Venues',
]);

export default function BrandMarquee() {
  const partners = agencyData.brand_partners;
  // Duplicate the list so the keyframe can translate -50% for a seamless loop.
  const track = [...partners, ...partners];

  return (
    <section
      id="brands"
      className="border-y border-[var(--color-border)] bg-[#FBF8F0] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-10">
        <p className="font-heading text-[12px] uppercase tracking-[0.4em] text-gold">
          Trusted by
        </p>
        <p className="mt-3 text-[14px] leading-[1.6] text-cream/60 lg:text-[15px]">
          From global brands to Sydney&apos;s most iconic venues.
        </p>
      </div>

      <div className="relative mt-10 overflow-hidden lg:mt-12">
        {/* Edge fades — match cream section bg */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#FBF8F0] to-transparent lg:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#FBF8F0] to-transparent lg:w-32" />

        <div className="brand-marquee-track flex w-max items-center gap-4 lg:gap-6">
          {track.map((partner, i) => {
            const needsDarkBg = NEEDS_DARK_BG.has(partner.name);
            return (
              <div
                key={`${partner.name}-${i}`}
                className="brand-tile shrink-0"
                title={partner.name}
                data-needs-dark-bg={needsDarkBg ? 'true' : undefined}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={200}
                  height={56}
                  className="brand-tile-logo object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
