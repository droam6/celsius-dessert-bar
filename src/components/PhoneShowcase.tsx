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

export default function PhoneShowcase() {
  const ytId = youtubeIdFromUrl(agencyData.business.youtube_hero_url);
  const embedSrc =
    `https://www.youtube.com/embed/${ytId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${ytId}` +
    `&controls=0&modestbranding=1&rel=0&playsinline=1`;

  return (
    <section
      id="see-it-live"
      className="overflow-hidden bg-[#F0EBDD] py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Heading column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              See it live
            </p>
            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#1A1A1D]">
              Theatre on every table.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-[#1A1A1D]/70 lg:text-[16px]">
              Two professional gelato makers. Live nitrogen pour. Custom flavours plated to
              order. Watch the show that turns dessert into a moment your guests remember.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-block border border-gold px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-gold transition-all duration-300 hover:bg-gold hover:text-charcoal"
            >
              Bring it to your event →
            </a>
          </motion.div>

          {/* Phone mockup column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="mx-auto w-full max-w-[420px] lg:max-w-[640px]">
              <div
                className="relative mx-auto aspect-[19.5/9] w-full overflow-hidden bg-black"
                style={{
                  borderRadius: '32px',
                  border: '5px solid #1A1A1D',
                  boxShadow:
                    '0 30px 80px -20px rgba(26, 26, 29, 0.25), 0 12px 24px -8px rgba(26, 26, 29, 0.18), 0 0 80px -20px rgba(47, 143, 137, 0.25)',
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

                <iframe
                  src={embedSrc}
                  title="Celsius Dessert Bar — live nitrogen gelato"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
