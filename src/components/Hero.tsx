'use client';

import { useEffect, useRef, useState } from 'react';
import agencyData from '@data/agency.json';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    videoRef.current?.play().catch(() => setPaused(true));
  }, []);

  /* The smoke loops for as long as the page is open, so visitors get a way to stop it. */
  function toggleVideo() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

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
        // The button follows what the video is really doing: if the browser refuses autoplay
        // (low power mode, data saver) it shows Play, not Pause.
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      >
        {/* Phones get the 720p file (about half the size). Browsers that ignore `media` just take the first source. */}
        <source src="/videos/hero-smoke-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/videos/hero-smoke.mp4" type="video/mp4" />
      </video>

      <div className="hero-scrim" aria-hidden="true" />

      {/* Extra room at the bottom on phones for the pause button, which sits in the corner there. */}
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-6 pb-[4.75rem] pt-40 lg:px-12 lg:pb-14">
        <h1 className="display text-[13.2vw] leading-[0.98] text-bone md:text-[clamp(4.5rem,9.6vw,9.25rem)]">
          <span className="rise">
            <span>Gelato, frozen</span>
          </span>{' '}
          <span className="rise">
            <span>
              live at <em className="metal metal--sheen">&minus;196&deg;C</em>
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
            <button
              type="button"
              data-video-toggle
              onClick={toggleVideo}
              aria-label={paused ? 'Play the background video' : 'Pause the background video'}
              className="absolute bottom-4 right-6 flex h-11 w-11 cursor-pointer items-center justify-center border border-bone/25 text-bone/80 transition-colors hover:border-bone hover:text-bone lg:static"
            >
              {paused ? (
                <svg aria-hidden="true" width="11" height="13" viewBox="0 0 11 13" fill="currentColor">
                  <path d="M0 0l11 6.5L0 13z" />
                </svg>
              ) : (
                <svg aria-hidden="true" width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <path d="M0 0h3.4v12H0zM6.6 0H10v12H6.6z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
