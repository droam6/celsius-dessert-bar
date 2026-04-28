// @ts-nocheck — Bosland orphan, schema-incompatible with Celsius agency.json. Awaiting repurpose/delete decision (see Round 3 STOP 4d).
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import agencyData from '@data/agency.json';

type ReviewSource = 'google' | 'ratemyagent';

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function RateMyAgentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${sizeClass} ${i < rating ? 'text-gold' : 'text-charcoal/10'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeSource, setActiveSource] = useState<ReviewSource>('google');
  const [current, setCurrent] = useState(0);

  const googleReviews = agencyData.google_reviews.filter((r) => r.text.length > 0);
  const rmaReviews = [
    ...agencyData.ratemyagent_reviews,
    ...agencyData.reviews,
  ];

  const activeReviews = activeSource === 'google' ? googleReviews : rmaReviews;

  const next = () => setCurrent((c) => (c + 1) % activeReviews.length);
  const prev = () => setCurrent((c) => (c - 1 + activeReviews.length) % activeReviews.length);

  function switchSource(source: ReviewSource) {
    setActiveSource(source);
    setCurrent(0);
  }

  return (
    <section
      className="bg-warm-white py-20 lg:py-32"
      data-google-place-id={agencyData.agency.google.place_id}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <FadeIn>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Client Experiences
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-charcoal">
            Verified Reviews
          </h2>
        </FadeIn>

        {/* Source badges — the trust anchors */}
        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <button
              onClick={() => switchSource('google')}
              className={`group flex items-center gap-3 border px-5 py-3.5 transition-all duration-300 ${
                activeSource === 'google'
                  ? 'border-charcoal/20 bg-cream shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                  : 'border-charcoal/8 hover:border-charcoal/15'
              }`}
            >
              <GoogleIcon className="h-5 w-5 shrink-0" />
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-xl text-charcoal">
                  {agencyData.stats.google_review_rating}
                </span>
                <StarRating rating={Math.round(agencyData.stats.google_review_rating)} size="sm" />
              </div>
              <span className="text-[12px] text-muted">
                {agencyData.stats.google_review_count} reviews
              </span>
            </button>

            <button
              onClick={() => switchSource('ratemyagent')}
              className={`group flex items-center gap-3 border px-5 py-3.5 transition-all duration-300 ${
                activeSource === 'ratemyagent'
                  ? 'border-charcoal/20 bg-cream shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                  : 'border-charcoal/8 hover:border-charcoal/15'
              }`}
            >
              <RateMyAgentIcon className="h-5 w-5 shrink-0 text-[#f26524]" />
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-xl text-charcoal">
                  {agencyData.stats.ratemyagent_rating}
                </span>
                <StarRating rating={agencyData.stats.ratemyagent_rating} size="sm" />
              </div>
              <span className="text-[12px] text-muted">
                {agencyData.stats.ratemyagent_review_count} reviews
              </span>
            </button>
          </div>
        </FadeIn>

        {/* Review display */}
        <div className="mt-12 lg:mt-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="relative min-h-[200px] flex-1 lg:min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSource}-${current}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* Source indicator inline */}
                  <div className="mb-6 flex items-center gap-2">
                    {activeSource === 'google' ? (
                      <GoogleIcon className="h-4 w-4" />
                    ) : (
                      <RateMyAgentIcon className="h-4 w-4 text-[#f26524]" />
                    )}
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                      {activeSource === 'google' ? 'Google Review' : 'RateMyAgent Review'}
                    </span>
                  </div>

                  <blockquote className="max-w-3xl font-heading text-[clamp(1.25rem,2.5vw,1.85rem)] leading-[1.4] text-charcoal">
                    &ldquo;{activeReviews[current].text}&rdquo;
                  </blockquote>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <StarRating rating={activeReviews[current].rating} size="md" />
                    <div className="h-4 w-[1px] bg-charcoal/12" />
                    <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
                      {activeReviews[current].author}
                    </p>
                    {(() => {
                      const review = activeReviews[current] as Record<string, unknown>;
                      const detail = review.property_area || review.time;
                      return detail ? (
                        <>
                          <div className="h-4 w-[1px] bg-charcoal/12" />
                          <p className="text-[11px] text-muted">
                            {String(detail)}
                          </p>
                        </>
                      ) : null;
                    })()}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <div className="flex shrink-0 gap-2 lg:mt-6">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center border border-charcoal/12 text-charcoal/40 transition-all duration-300 hover:border-gold hover:text-gold"
                aria-label="Previous review"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center border border-charcoal/12 text-charcoal/40 transition-all duration-300 hover:border-gold hover:text-gold"
                aria-label="Next review"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mt-8 flex gap-0">
            {activeReviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="flex h-8 w-8 items-center justify-center"
                aria-label={`Go to review ${i + 1}`}
              >
                <span className={`block h-[2px] transition-all duration-500 ${
                  i === current ? 'w-6 bg-gold' : 'w-2.5 bg-charcoal/12'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
