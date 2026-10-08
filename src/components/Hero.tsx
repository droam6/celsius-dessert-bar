'use client';

import { useEffect, useRef } from 'react';
import agencyData from '@data/agency.json';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const announcement = agencyData.business.announcement;

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      {/* Background video — full opacity, native speed, no effects on the element itself */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-smoke-poster.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        {/* Phones get the 720p file (about half the size). Browsers that ignore `media` just take the first source. */}
        <source src="/videos/hero-smoke-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/videos/hero-smoke.mp4" type="video/mp4" />
      </video>

      <div className="hero-scrim" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-6 pb-10 pt-40 lg:px-12 lg:pb-14">
        <h1 className="display text-[13.2vw] leading-[0.98] text-bone md:text-[clamp(4.5rem,9.6vw,9.25rem)]">
          <span className="rise">
            <span>Gelato, frozen</span>
          </span>{' '}
          <span className="rise">
            <span>
              live at <em>&minus;196&deg;C</em>
            </span>
          </span>
        </h1>

        <div className="settle mt-9 flex flex-col gap-7 border-t border-bone/25 pt-7 lg:mt-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[30rem]">
            <p className="text-[1.0625rem] leading-[1.6] text-bone/85 lg:text-[1.125rem]">
              A liquid nitrogen dessert bar for corporate events, brand launches and weddings
              across Sydney.
            </p>
            {announcement && <p className="mt-3 text-[0.9375rem] text-champagne">{announcement}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href="#contact" className="btn">
              Enquire
            </a>
            <a href="#packages" className="link flex min-h-12 items-center text-[0.9375rem] text-bone">
              See the packages
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
