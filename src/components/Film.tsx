'use client';

import { useEffect, useRef, useState } from 'react';
import { FadeIn } from './FadeIn';
import agencyData from '@data/agency.json';

function youtubeIdFromUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const v = parsed.searchParams.get('v');
    if (v) return v;
    return parsed.pathname.split('/').filter(Boolean).pop() ?? '';
  } catch {
    return '';
  }
}

/* still: only the film's own still is shown, nothing is loaded from YouTube's player.
   loop:  the film plays silently on a loop, with no player chrome.
   sound: the film plays from the start with sound and YouTube's own controls. */
type Mode = 'still' | 'loop' | 'sound';

/* The real event film, shown as wide as the page allows. No device frame.
   The YouTube player is heavy, so it is only loaded once the frame scrolls into view;
   until then the frame shows the film's own still. Visitors can stop it and can turn the
   sound on. Each state is a fresh player address, so the buttons do not depend on
   YouTube's script API. */
export default function Film() {
  const { youtube_hero_url, film_caption } = agencyData.business;
  const ytId = youtubeIdFromUrl(youtube_hero_url);
  const frameRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const stopRef = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);
  const [mode, setMode] = useState<Mode>('still');

  /* A pressed button can disappear (Stop goes when the film stops, the big Play goes when it
     starts). Keyboard focus is handed to its counterpart, so it never falls back to the top
     of the page. Only after a press, never when the film starts by itself. */
  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    (mode === 'still' ? playRef.current : stopRef.current)?.focus();
  }, [mode]);

  function press(next: Mode, handFocus = false) {
    moveFocus.current = handFocus;
    setMode(next);
  }

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    // Visitors who ask for less motion get the still and a Play button instead of autoplay.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMode((m) => (m === 'still' ? 'loop' : m));
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!ytId) return null;

  // youtube-nocookie.com is YouTube's privacy-enhanced player address.
  const base = `https://www.youtube-nocookie.com/embed/${ytId}`;
  const src =
    mode === 'sound'
      ? `${base}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1`
      : `${base}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&rel=0&playsinline=1`;

  const control =
    'flex min-h-11 cursor-pointer items-center border border-bone/35 px-4 text-[0.9375rem] text-bone transition-colors hover:border-bone';

  return (
    <section id="film" aria-labelledby="film-title" className="pt-6 lg:pt-10">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        <h2 id="film-title" className="sr-only">
          Film: Celsius at an event
        </h2>
        <FadeIn>
          <figure>
            <div
              ref={frameRef}
              className="relative aspect-video w-full overflow-hidden bg-ink-soft bg-cover bg-center"
              style={{
                // Sharp still first; the smaller one sits underneath in case the large one does not exist.
                backgroundImage: `url(https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg), url(https://i.ytimg.com/vi/${ytId}/hqdefault.jpg)`,
              }}
            >
              {mode !== 'still' && (
                <iframe
                  key={mode}
                  src={src}
                  title={`Celsius Dessert Bar film: ${film_caption}`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  // The silent loop is scenery: it takes no clicks and is skipped by the Tab key,
                  // so a stray tap cannot bring up YouTube's own overlays. With sound on it is a
                  // normal player.
                  tabIndex={mode === 'loop' ? -1 : undefined}
                  className={`absolute inset-0 h-full w-full border-0 ${mode === 'loop' ? 'pointer-events-none' : ''}`}
                />
              )}
              {mode === 'still' && (
                <button
                  ref={playRef}
                  type="button"
                  onClick={() => press('loop', true)}
                  aria-label="Play the film"
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-ink/25"
                >
                  <span className="flex h-16 w-16 items-center justify-center border border-bone/70 bg-ink/60 text-bone">
                    <svg aria-hidden="true" width="16" height="19" viewBox="0 0 11 13" fill="currentColor">
                      <path d="M0 0l11 6.5L0 13z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
              <span className="text-[1rem] text-bone/85">{film_caption}</span>
              <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {mode === 'sound' ? (
                  <button type="button" onClick={() => press('loop')} className={control}>
                    Mute
                  </button>
                ) : (
                  <button type="button" onClick={() => press('sound')} className={control}>
                    Play with sound
                  </button>
                )}
                {mode !== 'still' && (
                  <button ref={stopRef} type="button" onClick={() => press('still', true)} className={control}>
                    Stop
                  </button>
                )}
                <a
                  href={youtube_hero_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link flex min-h-11 items-center text-[0.9375rem] text-bone/80"
                >
                  Watch on YouTube
                </a>
              </span>
            </figcaption>
          </figure>
        </FadeIn>
      </div>
    </section>
  );
}
