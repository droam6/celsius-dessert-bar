import Image from 'next/image';
import agencyData from '@data/agency.json';

const quickLinks = [
  { label: 'Brands', href: '#brands' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const eventTypes = agencyData.event_types;

  return (
    <footer className="bg-[#F0EBDD] pt-16 pb-10 lg:pt-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:pr-8">
            <Image
              src="/images/celsius-logo.png"
              alt="Celsius Dessert Bar"
              width={160}
              height={74}
              className="h-10 w-auto"
            />
            <p className="mt-4 text-[13px] leading-[1.7] text-cream/50">
              {agencyData.business.tagline}.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold/70">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] text-cream/55 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Event types */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold/70">
              We Cater
            </p>
            <ul className="mt-4 space-y-2.5">
              {eventTypes.slice(0, 5).map((type) => (
                <li key={type}>
                  <span className="text-[13px] text-cream/55">{type}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold/70">
              Contact
            </p>
            <div className="mt-4 space-y-3">
              <a
                href={`tel:${agencyData.business.phone.replace(/[^0-9+]/g, '')}`}
                className="block text-[13px] text-cream/50 transition-colors hover:text-gold"
              >
                {agencyData.business.phone}
              </a>
              {agencyData.business.email && (
                <a
                  href={`mailto:${agencyData.business.email}`}
                  className="block text-[13px] text-cream/50 transition-colors hover:text-gold"
                >
                  {agencyData.business.email}
                </a>
              )}
              <p className="text-[13px] leading-[1.6] text-cream/50">
                {agencyData.business.address.street}
                <br />
                {agencyData.business.address.suburb},{' '}
                {agencyData.business.address.state}{' '}
                {agencyData.business.address.postcode}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/5 pt-8 sm:flex-row sm:items-center">
          <p className="text-[11px] text-cream/60">
            &copy; {year} {agencyData.business.legal_name}. All rights reserved.
          </p>
          {agencyData.business.social.instagram && (
            <a
              href={agencyData.business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-cream/60 transition-colors hover:text-gold/70"
            >
              @celsiusdessertbar on Instagram
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
