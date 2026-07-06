import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FadeIn } from '@/components/FadeIn';
import agencyData from '@data/agency.json';

const siteUrl = 'https://www.celsiusdessertbar.com.au';

export const metadata: Metadata = {
  title: 'Menu | Celsius Dessert Bar',
  description:
    'Signature and seasonal liquid nitrogen gelato, crafted live at -196°C at our Chatswood kiosk and at events across Sydney.',
  alternates: {
    canonical: `${siteUrl}/menu`,
  },
  openGraph: {
    title: 'Menu | Celsius Dessert Bar',
    description:
      'Signature and seasonal liquid nitrogen gelato, crafted live at -196°C at our Chatswood kiosk and at events across Sydney.',
    type: 'website',
    locale: 'en_AU',
    url: `${siteUrl}/menu`,
    siteName: 'Celsius Dessert Bar',
    images: [
      {
        url: `${siteUrl}/images/celsius-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Celsius Dessert Bar — Live Liquid Nitrogen Gelato Sydney',
      },
    ],
  },
};

type Flavour = { name: string; description: string };

function FlavourList({ items, rotating }: { items: Flavour[]; rotating?: boolean }) {
  return (
    <div className="mt-12 grid gap-x-14 lg:mt-16 lg:grid-cols-2">
      {items.map((item, i) => (
        <FadeIn key={item.name} delay={0.05 + (i % 4) * 0.06}>
          <div className="border-t border-[var(--color-border)] py-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-heading text-xl text-cream lg:text-2xl">{item.name}</h3>
              {rotating && (
                <span className="shrink-0 border border-teal/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-teal">
                  Rotating
                </span>
              )}
            </div>
            <p className="mt-2 max-w-md text-[14px] leading-[1.7] text-cream/60">
              {item.description}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export default function MenuPage() {
  const menu = agencyData.menu;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-charcoal focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        {/* Hero band — dark smoke poster, mirrors the homepage hero */}
        <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-[#0E0E10] pt-28 pb-20">
          <div
            className="absolute inset-0 bg-[url('/images/hero-smoke-poster.jpg')] bg-cover bg-center"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[rgba(14,14,16,0.6)]" aria-hidden="true" />
          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-10">
            <FadeIn>
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold-light">
                From the nitrogen bar
              </p>
              <h1 className="font-heading text-[clamp(2.75rem,6vw,5rem)] leading-[1.05] text-[#FBF8F0]">
                The Menu
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-[#FBF8F0]/80 lg:text-[16px]">
                Small-batch gelato frozen to order at -196°C — every flavour built for the show.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Signature Gelato */}
        <section id="signature" className="bg-[#FFFFFF] py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <FadeIn>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                Signature Gelato
              </p>
              <h2 className="mt-4 max-w-2xl font-heading text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-cream">
                The flavours that made us.
              </h2>
            </FadeIn>
            <FlavourList items={menu.signature} />
          </div>
        </section>

        {/* Seasonal Rotation */}
        <section id="seasonal" className="bg-[#FBF8F0] py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <FadeIn>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                Seasonal Rotation
              </p>
              <h2 className="mt-4 max-w-2xl font-heading text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-cream">
                In season right now
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-cream/60">
                Four spots on the bar are reserved for whatever Sydney&apos;s markets are doing
                best this month.
              </p>
            </FadeIn>
            <FlavourList items={menu.seasonal} rotating />
          </div>
        </section>

        {/* Toppings & Finishes */}
        <section id="toppings" className="bg-[#F0EBDD] py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <FadeIn>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                Toppings &amp; Finishes
              </p>
              <h2 className="mt-4 max-w-2xl font-heading text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-cream">
                The final flourish
              </h2>
            </FadeIn>
            <div className="mt-12 grid gap-x-14 sm:grid-cols-2 lg:mt-16">
              {menu.toppings.map((item, i) => (
                <FadeIn key={item.name} delay={0.05 + (i % 4) * 0.06}>
                  <div className="flex items-baseline justify-between gap-6 border-t border-[var(--color-border)] py-5">
                    <span className="font-heading text-lg text-cream">{item.name}</span>
                    <span className="text-right text-[13px] text-cream/55">
                      {item.description}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-[#FBF8F0] py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <FadeIn>
              <h2 className="max-w-2xl font-heading text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-cream">
                Want this at your event?
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-cream/60">
                Every package is plated live by our chefs — tell us about the occasion and
                we&apos;ll build the menu around it.
              </p>
              <Link
                href="/#contact"
                className="mt-9 inline-block bg-gold px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-charcoal transition-all duration-300 hover:bg-gold-light"
              >
                Enquire for your event
              </Link>
              <p className="mt-10 text-[13px] italic text-cream/50">{menu.rotation_note}</p>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
