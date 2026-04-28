'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { FadeIn } from './FadeIn';
import agencyData from '@data/agency.json';

const PACKAGE_SELECT_EVENT = 'celsius:package-selected';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  useEffect(() => {
    function onSelect(e: Event) {
      const detail = (e as CustomEvent<{ name: string }>).detail;
      if (detail?.name) setSelectedPackage(detail.name);
    }
    window.addEventListener(PACKAGE_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(PACKAGE_SELECT_EVENT, onSelect);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      if (agencyData.business.webhook_url) {
        await fetch(agencyData.business.webhook_url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  }

  const business = agencyData.business;
  const mapsQuery = encodeURIComponent(
    `${business.address.street}, ${business.address.suburb} ${business.address.state} ${business.address.postcode}`
  );

  return (
    <section id="contact" className="overflow-hidden bg-[#FBF8F0] py-24 lg:py-36">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          {/* Left — Form */}
          <div>
            <FadeIn>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                Enquire
              </p>
              <h2 className="mt-4 font-heading text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-cream">
                Book Celsius for
                <br />
                your event
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-cream/45">
                Tell us about the occasion, guest count, and venue. We&apos;ll come back with
                package recommendations and availability within 24 hours.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              {submitted ? (
                <div className="mt-12 border border-gold/25 p-8">
                  <p className="font-heading text-xl text-cream">Thank you for your enquiry.</p>
                  <p className="mt-3 text-[14px] leading-[1.7] text-cream/50">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-12 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="sr-only">Full Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        autoComplete="name"
                        className="w-full border border-cream/10 bg-transparent px-4 py-3.5 text-[14px] text-cream placeholder:text-cream/25 outline-none transition-colors focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="sr-only">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        autoComplete="email"
                        className="w-full border border-cream/10 bg-transparent px-4 py-3.5 text-[14px] text-cream placeholder:text-cream/25 outline-none transition-colors focus:border-gold/50"
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        autoComplete="tel"
                        className="w-full border border-cream/10 bg-transparent px-4 py-3.5 text-[14px] text-cream placeholder:text-cream/25 outline-none transition-colors focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-event-type" className="sr-only">Event Type</label>
                      <select
                        id="contact-event-type"
                        name="event_type"
                        defaultValue=""
                        className="w-full border border-cream/10 bg-transparent px-4 py-3.5 text-[14px] text-cream/80 outline-none transition-colors focus:border-gold/50"
                      >
                        <option value="" disabled>Event Type</option>
                        {agencyData.event_types.map((type) => (
                          <option key={type} value={type} className="bg-charcoal">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-package" className="sr-only">Package interested in</label>
                    <select
                      id="contact-package"
                      name="package"
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="w-full border border-cream/10 bg-transparent px-4 py-3.5 text-[14px] text-cream/80 outline-none transition-colors focus:border-gold/50"
                    >
                      <option value="" className="bg-charcoal">Package interested in</option>
                      {agencyData.packages.map((pkg) => (
                        <option key={pkg.name} value={pkg.name} className="bg-charcoal">
                          {pkg.name}
                        </option>
                      ))}
                      <option value="Not sure yet / custom" className="bg-charcoal">
                        Not sure yet / custom
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell us about your event — date, venue, guest count"
                      rows={4}
                      className="w-full resize-none border border-cream/10 bg-transparent px-4 py-3.5 text-[14px] text-cream placeholder:text-cream/25 outline-none transition-colors focus:border-gold/50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-gold px-10 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-charcoal transition-all duration-300 hover:bg-gold-light disabled:opacity-50"
                  >
                    {sending ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>

          {/* Right — Contact info */}
          <div className="flex flex-col justify-center">
            <FadeIn direction="right" delay={0.15}>
              <div className="space-y-10">
                {/* Phone */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold/60">
                    Call Us
                  </p>
                  <a
                    href={`tel:${business.phone.replace(/\s/g, '')}`}
                    className="mt-2 block font-heading text-2xl text-cream transition-colors hover:text-gold lg:text-3xl"
                  >
                    {business.phone}
                  </a>
                  {business.email && (
                    <a
                      href={`mailto:${business.email}`}
                      className="mt-2 block text-[14px] text-cream/50 transition-colors hover:text-gold"
                    >
                      {business.email}
                    </a>
                  )}
                </div>

                {/* Address */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold/60">
                    Visit Our Kiosk
                  </p>
                  <a
                    href={business.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-[15px] leading-[1.7] text-cream/60 transition-colors hover:text-cream/80"
                  >
                    {business.address.street}
                    <br />
                    {business.address.suburb},{' '}
                    {business.address.state}{' '}
                    {business.address.postcode}
                  </a>
                </div>

                {/* Hours */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold/60">
                    Kiosk Hours
                  </p>
                  <div className="mt-2 space-y-1">
                    {business.hours.map((slot) => (
                      <p key={slot.days} className="text-[14px] text-cream/50">
                        {slot.days}: {slot.hours}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Google Maps embed */}
                <div className="aspect-[16/9] overflow-hidden border border-cream/5">
                  <iframe
                    title="Celsius Dessert Bar Location"
                    src={`https://maps.google.com/maps?q=${mapsQuery}&z=15&output=embed`}
                    className="h-full w-full border-0 grayscale-[40%] contrast-[1.1]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                {/* Social */}
                {business.social.instagram && (
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold/60">
                      Follow Us
                    </p>
                    <div className="mt-3 flex gap-5">
                      <a
                        href={business.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cream/40 transition-colors hover:text-gold"
                        aria-label="Instagram"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
