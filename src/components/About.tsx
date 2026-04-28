'use client';

import { FadeIn } from './FadeIn';
import agencyData from '@data/agency.json';

export default function About() {
  const business = agencyData.business;

  return (
    <section
      id="about"
      className="overflow-hidden bg-[#FFFFFF] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        {/* TEMP: placeholder panel hidden until client supplies event photography */}
        {/*
        <FadeIn direction="left">
          <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]" ...>
            ...gradient placeholder removed for light palette...
          </div>
        </FadeIn>
        */}

        <div className="flex flex-col">
          <FadeIn>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              About Celsius
            </p>
            <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-cream">
              Theatre,
              <br />
              served <span className="text-gold">cold</span>.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="my-8 h-[1px] w-16 bg-gold/40" />
            <p className="text-base leading-[1.75] text-cream/70">
              {business.about_text}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 border-l-2 border-teal/40 pl-6">
              <p className="text-[15px] leading-[1.7] text-cream/80">
                Every event is plated live — small-batch flavours,
                liquid-nitrogen showmanship, and bespoke menus designed around
                your guests, your venue, and your brand.
              </p>
              <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.15em] text-teal">
                Crafted at -196°C
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
