'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { FadeIn } from './FadeIn';
import agencyData from '@data/agency.json';

const PACKAGE_SELECT_EVENT = 'celsius:package-selected';

type Status = 'idle' | 'sending' | 'sent' | 'mail' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [selectedPackage, setSelectedPackage] = useState('');

  useEffect(() => {
    function onSelect(e: Event) {
      const detail = (e as CustomEvent<{ name: string }>).detail;
      if (detail?.name) setSelectedPackage(detail.name);
    }
    window.addEventListener(PACKAGE_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(PACKAGE_SELECT_EVENT, onSelect);
  }, []);

  const business = agencyData.business;
  const tel = business.phone.replace(/\s/g, '');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (data.company) return; // honeypot

    // Until the webhook is live, hand the enquiry to the visitor's own email app
    // so nothing is ever silently dropped.
    if (!business.webhook_url) {
      const lines = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || '-'}`,
        `Event type: ${data.event_type || '-'}`,
        `Event date: ${data.event_date || '-'}`,
        `Guests: ${data.guests || '-'}`,
        `Package: ${data.package || 'Not sure yet'}`,
        '',
        data.message || '',
      ];
      const href =
        `mailto:${business.email}` +
        `?subject=${encodeURIComponent(`Event enquiry from ${data.name}`)}` +
        `&body=${encodeURIComponent(lines.join('\n'))}`;
      window.location.href = href;
      setStatus('mail');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(business.webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-40">
      <div className="mx-auto grid max-w-[1360px] gap-x-28 gap-y-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:px-12">
        <FadeIn>
          <h2 className="display text-[clamp(2.5rem,5.4vw,4.75rem)] text-bone">
            Tell us about your event
          </h2>
          <p className="mt-6 max-w-[28rem] text-bone/75">
            Send the date, venue and guest count. We&apos;ll reply with availability and a
            quote.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="lg:row-span-2">
          {status === 'sent' ? (
            <div role="status" className="border-t border-bone/20 pt-8">
              <p className="display text-[2rem] text-bone">Thank you. Your enquiry is with us.</p>
              <p className="mt-4 text-bone/75">We&apos;ll reply by email or phone.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2" noValidate={false}>
              <div>
                <label htmlFor="c-name" className="label text-bone/60">Name</label>
                <input id="c-name" name="name" type="text" required autoComplete="name" className="field" />
              </div>
              <div>
                <label htmlFor="c-email" className="label text-bone/60">Email</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" className="field" />
              </div>
              <div>
                <label htmlFor="c-phone" className="label text-bone/60">
                  Phone <span className="normal-case tracking-normal text-bone/60">(optional)</span>
                </label>
                <input id="c-phone" name="phone" type="tel" autoComplete="tel" className="field" />
              </div>
              <div>
                <label htmlFor="c-type" className="label text-bone/60">Event type</label>
                <select id="c-type" name="event_type" defaultValue="" className="field">
                  <option value="">Choose one</option>
                  {agencyData.event_types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="c-date" className="label text-bone/60">Event date</label>
                <input id="c-date" name="event_date" type="text" placeholder="e.g. 14 December" className="field placeholder:text-bone/50" />
              </div>
              <div>
                <label htmlFor="c-guests" className="label text-bone/60">Guests</label>
                <input id="c-guests" name="guests" type="text" inputMode="numeric" placeholder="e.g. 120" className="field placeholder:text-bone/50" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-package" className="label text-bone/60">Package</label>
                <select
                  id="c-package"
                  name="package"
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="field"
                >
                  <option value="">Not sure yet</option>
                  {agencyData.packages.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name} ({p.guests.toLowerCase()} guests)
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-message" className="label text-bone/60">
                  Venue and anything else we should know
                </label>
                <textarea id="c-message" name="message" rows={3} className="field resize-y" />
              </div>

              {/* Honeypot: hidden from people, tempting to bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="c-company">Company</label>
                <input id="c-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="sm:col-span-2">
                <button type="submit" disabled={status === 'sending'} className="btn w-full cursor-pointer sm:w-auto">
                  {status === 'sending' ? 'Sending' : 'Send enquiry'}
                </button>
                <p role="status" aria-live="polite" className="mt-5 min-h-6 text-[0.9375rem] text-bone/80">
                  {status === 'mail' && (
                    <>
                      Your email app should have opened with the enquiry ready to send. If it
                      did not, email{' '}
                      <a href={`mailto:${business.email}`} className="link">{business.email}</a>{' '}
                      or call <a href={`tel:${tel}`} className="link">{business.phone}</a>.
                    </>
                  )}
                  {status === 'error' && (
                    <>
                      That did not send. Please email{' '}
                      <a href={`mailto:${business.email}`} className="link">{business.email}</a>{' '}
                      or call <a href={`tel:${tel}`} className="link">{business.phone}</a>.
                    </>
                  )}
                </p>
              </div>
            </form>
          )}
        </FadeIn>

        <FadeIn className="lg:col-start-1 lg:row-start-2">
          <address className="border-t border-bone/20 pt-8 not-italic">
            <a href={`tel:${tel}`} className="display flex min-h-12 items-center text-[2.25rem] text-bone lg:text-[2.75rem]">
              {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className="link mt-1 inline-flex min-h-11 items-center text-bone/90">
              {business.email}
            </a>

            <p className="mt-6 max-w-[24rem] leading-[1.6] text-bone/75">
              Our kiosk is at {business.address.street}, {business.address.suburb}{' '}
              {business.address.state} {business.address.postcode}. Open{' '}
              {business.hours.map((slot, i) => (
                <span key={slot.days}>
                  {i > 0 && ' and '}
                  {slot.days}, {slot.hours}
                </span>
              ))}
              .
            </p>
            <p className="mt-4 flex flex-wrap gap-x-7 gap-y-1">
              <a
                href={business.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="link flex min-h-11 items-center text-[0.9375rem] text-bone/90"
              >
                Open in Google Maps
              </a>
              {business.social.instagram && (
                <a
                  href={business.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link flex min-h-11 items-center text-[0.9375rem] text-bone/90"
                >
                  Instagram
                </a>
              )}
            </p>
          </address>
        </FadeIn>
      </div>
    </section>
  );
}
