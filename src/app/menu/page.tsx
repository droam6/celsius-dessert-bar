import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Photo } from '@/components/Photo';
import agencyData from '@data/agency.json';

const siteUrl = 'https://www.celsiusdessertbar.com.au';
const description =
  'The Celsius Dessert Bar menu: signature and seasonal liquid nitrogen gelato, frozen to order at our Chatswood kiosk and at events across Sydney.';

export const metadata: Metadata = {
  title: 'Menu | Celsius Dessert Bar',
  description,
  alternates: { canonical: `${siteUrl}/menu` },
  openGraph: {
    title: 'Menu | Celsius Dessert Bar',
    description,
    type: 'website',
    locale: 'en_AU',
    url: `${siteUrl}/menu`,
    siteName: 'Celsius Dessert Bar',
    images: [{ url: `${siteUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: 'Celsius Dessert Bar' }],
  },
};

type Item = { name: string };

/* Names only. Descriptions return when the client supplies her own wording. */
function Course({ id, title, aside, items }: { id: string; title: string; aside?: string; items: Item[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="grid gap-6 border-t border-ink py-10 lg:grid-cols-[1fr_2.4fr] lg:gap-16 lg:py-14">
      <div>
        <h2 id={`${id}-title`} className="label text-bronze">
          {title}
        </h2>
        {aside && <p className="mt-3 max-w-[16rem] text-[0.9375rem] leading-[1.55] text-ink/65">{aside}</p>}
      </div>
      <ul className="grid gap-x-12 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.name}
            className="display-sm border-b border-ink/15 py-4 text-[1.5rem] lg:text-[1.875rem]"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MenuPage() {
  const menu = agencyData.menu;
  const isSample = Boolean(menu.note);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bone focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to main content
      </a>
      <Navigation onPaper />
      <main id="main-content" className="on-paper bg-paper text-ink">
        <div className="mx-auto max-w-[1360px] px-6 pb-24 pt-36 lg:px-12 lg:pb-36 lg:pt-48">
          <header className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 pb-12 lg:pb-20">
            <h1 className="display text-[clamp(4rem,13vw,11rem)] leading-[0.9]">
              The menu
            </h1>
            <p className="max-w-[22rem] text-[1rem] leading-[1.6] text-ink/70 lg:pb-4">
              Gelato frozen to order with liquid nitrogen. {menu.rotation_note}
              {isSample && <span className="mt-3 block text-bronze">Sample menu.</span>}
            </p>
          </header>

          <Course id="signature" title="Gelato" items={menu.signature} />
          <Course
            id="seasonal"
            title="Seasonal"
            aside="These change through the year."
            items={menu.seasonal}
          />
          <Course id="toppings" title="Toppings" items={menu.toppings} />

          <Photo id="kiosk" sizes="(min-width: 1360px) 1264px, 100vw" className="mt-4 h-auto w-full object-cover lg:mt-8 lg:aspect-[2.1/1]" />

          <div className="mt-14 flex flex-col gap-8 border-t border-ink pt-12 lg:mt-24 lg:flex-row lg:items-end lg:justify-between lg:pt-16">
            <p className="display max-w-[40rem] text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
              Want the bar at your event?
            </p>
            <Link href="/#contact" className="btn self-start lg:self-auto">
              Enquire
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
