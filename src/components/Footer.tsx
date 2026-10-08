import Image from 'next/image';
import Link from 'next/link';
import agencyData from '@data/agency.json';

const links = [
  { label: 'Packages', href: '/#packages' },
  { label: 'Clients', href: '/#clients' },
  { label: 'Menu', href: '/menu' },
  { label: 'Enquire', href: '/#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const b = agencyData.business;

  return (
    <footer className="border-t border-bone/15 bg-ink py-14 lg:py-16">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Image
              src="/images/celsius-logo-mono.png"
              alt="Celsius Dessert Bar"
              width={220}
              height={102}
              className="h-14 w-auto"
            />
            <p className="mt-6 max-w-[22rem] text-[0.9375rem] leading-[1.6] text-bone/60">
              {b.address.street}, {b.address.suburb} {b.address.state} {b.address.postcode}
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-9 gap-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex min-h-11 items-center text-[0.9375rem] text-bone/80 transition-colors hover:text-bone"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-bone/15 pt-6 text-[0.8125rem] text-bone/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {b.legal_name}
          </p>
          <p className="flex flex-wrap gap-x-6">
            <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="flex min-h-11 items-center hover:text-bone">
              {b.phone}
            </a>
            <a href={`mailto:${b.email}`} className="flex min-h-11 items-center hover:text-bone">
              {b.email}
            </a>
            {b.social.instagram && (
              <a
                href={b.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center hover:text-bone"
              >
                Instagram
              </a>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
