'use client';

import { motion } from 'framer-motion';
import agencyData from '@data/agency.json';

function youtubeIdFromUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const v = parsed.searchParams.get('v');
    if (v) return v;
    const last = parsed.pathname.split('/').filter(Boolean).pop();
    return last ?? '';
  } catch {
    return '';
  }
}

export default function Hero() {
  const ytId = youtubeIdFromUrl(agencyData.business.youtube_hero_url);
  const embedSrc =
    `https://www.youtube.com/embed/${ytId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${ytId}` +
    `&controls=0&modestbranding=1&rel=0&playsinline=1`;

  return (
    <section className="relative overflow-hidden bg-[#FBF8F0] pt-32 pb-20 lg:pt-36 lg:pb-32">
      {/* Subtle ambient tints — softened for cream surface */}
      <div
        className="pointer-events-none absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full blur-[120px]"
        style={{ background: 'rgba(168, 137, 71, 0.12)' }}
      />
      <div
        className="pointer-events-none absolute -left-1/4 bottom-0 h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{ background: 'rgba(47, 143, 137, 0.10)' }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left — Text */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold"
            >
              {agencyData.business.tagline}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-heading text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.08] text-cream"
            >
              Live Liquid Nitrogen Gelato.
              <br />
              <span className="text-teal">Crafted at -196°C.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-6 max-w-xl text-[15px] leading-[1.75] text-cream/55 lg:text-[16px]"
            >
              Theatre dessert catering for weddings, corporate events, brand activations and
              private celebrations across Sydney. Every scoop crafted in front of your guests.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className="inline-block bg-gold px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-charcoal transition-all duration-300 hover:bg-gold-light"
              >
                Enquire for your event
              </a>
              <a
                href="#packages"
                className="inline-block border border-cream/30 px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-cream/80 transition-all duration-300 hover:border-cream/60 hover:text-cream"
              >
                View packages
              </a>
            </motion.div>
          </div>

          {/* Right — Landscape phone with YouTube */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="order-1 lg:order-2"
          >
            <div className="mx-auto w-full max-w-[560px]">
              {/* Phone frame — landscape orientation */}
              <div
                className="relative mx-auto aspect-[19.5/9] w-full overflow-hidden bg-black"
                style={{
                  borderRadius: '32px',
                  border: '5px solid #1A1A1D',
                  boxShadow:
                    '0 30px 80px -20px rgba(26, 26, 29, 0.25), 0 12px 24px -8px rgba(26, 26, 29, 0.18)',
                }}
              >
                {/* Notch — right-side pill in landscape */}
                <div
                  className="absolute right-0 top-1/2 z-[2] -translate-y-1/2"
                  style={{
                    width: '24px',
                    height: '100px',
                    background: '#1a1a1a',
                    borderRadius: '16px 0 0 16px',
                  }}
                />

                {/* YouTube iframe */}
                <iframe
                  src={embedSrc}
                  title="Celsius Dessert Bar — live nitrogen gelato"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                />
              </div>

              <p className="mt-5 text-center text-[11px] uppercase tracking-[0.25em] text-cream/35">
                Watch the show
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
