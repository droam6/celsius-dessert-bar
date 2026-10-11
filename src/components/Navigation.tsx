'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import agencyData from '@data/agency.json';

const navLinks = [
  { label: 'Packages', href: '/#packages' },
  { label: 'Clients', href: '/#clients' },
  { label: 'Menu', href: '/menu' },
];

export default function Navigation({ onPaper = false }: { onPaper?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const b = agencyData.business;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* While the phone menu is open the page behind it is switched off (inert), so the Tab key
     and screen readers stay inside the menu. Escape closes it and hands focus back to the
     menu button. If the screen becomes wide enough for the desktop menu (a phone turned on
     its side), the phone menu closes itself: otherwise the page would stay switched off
     behind a menu that is no longer shown. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const wide = window.matchMedia('(min-width: 768px)');
    const onWide = () => wide.matches && setOpen(false);
    const behind = Array.from(document.querySelectorAll<HTMLElement>('main, footer, a[href="#main-content"]'));
    behind.forEach((el) => el.setAttribute('inert', ''));
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    onWide();
    return () => {
      behind.forEach((el) => el.removeAttribute('inert'));
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  /* Over the black hero the bar is clear. Once scrolled (or on the paper menu page) it is solid black. */
  const solid = scrolled || onPaper || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'bg-ink' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[4.5rem] max-w-[1360px] items-center justify-between px-6 lg:px-12"
      >
        <Link href="/" className="relative z-10 -ml-1 p-1" onClick={() => setOpen(false)}>
          <Image
            src="/images/celsius-logo-metal.webp"
            alt="Celsius Dessert Bar, home"
            width={416}
            height={192}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex min-h-11 items-center text-[0.9375rem] text-bone/80 transition-colors hover:text-bone"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="flex min-h-11 items-center border border-bone/45 px-5 text-[0.9375rem] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
          >
            Enquire
          </Link>
        </div>

        {/* Phones: Enquire stays in reach on every screen, beside the menu button. */}
        <div className="relative z-10 flex items-center gap-1 md:hidden">
          {!open && (
            <Link
              href="/#contact"
              className="flex min-h-11 items-center border border-bone/45 px-4 text-[0.9375rem] text-bone"
            >
              Enquire
            </Link>
          )}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-12 w-12 items-center justify-center"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" className="relative block h-3 w-7">
              <span
                className={`absolute left-0 top-0 block h-px w-7 bg-bone transition-transform duration-300 ${
                  open ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-px w-7 bg-bone transition-transform duration-300 ${
                  open ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-ink px-6 pb-10 pt-8 md:hidden"
      >
        <ul className="border-t border-bone/15">
          {navLinks.map((l) => (
            <li key={l.href} className="border-b border-bone/15">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="display block py-5 text-[2.25rem] text-bone"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/#contact" onClick={() => setOpen(false)} className="btn mt-10 w-full">
          Enquire
        </Link>
        <p className="mt-8 flex flex-col text-bone/80">
          <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="flex min-h-11 items-center">
            {b.phone}
          </a>
          <a href={`mailto:${b.email}`} className="flex min-h-11 items-center">
            {b.email}
          </a>
          {b.social.instagram && (
            <a
              href={b.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center"
            >
              Instagram
            </a>
          )}
        </p>
      </div>
    </header>
  );
}
