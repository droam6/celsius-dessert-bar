'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import agencyData from '@data/agency.json';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#FBF8F0] pt-24 pb-24"
    >
      {/* Hero background video — full opacity, native speed, no effects */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-smoke-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      >
        <source src="/videos/hero-smoke.mp4" type="video/mp4" />
      </video>

      {/* Bottom gradient — needed for text legibility, NOT applied to the video itself */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[rgba(251,248,240,0.75)] z-[1] pointer-events-none" />

      {/* Text content */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        <div className="max-w-4xl">
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
            className="font-heading text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.05] text-[#FBF8F0]"
          >
            Live Liquid Nitrogen Gelato.
            <br />
            <span className="text-teal">Crafted at -196°C.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-[#FBF8F0]/85 lg:text-[16px]"
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
              className="inline-block border border-[#FBF8F0]/50 px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-[#FBF8F0] transition-all duration-300 hover:border-[#FBF8F0] hover:bg-[#FBF8F0]/10"
            >
              View packages
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
