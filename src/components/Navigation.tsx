'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Packages', href: '/#packages' },
  { label: 'Clients', href: '/#clients' },
  { label: 'Menu', href: '/menu' },
];

export default function Navigation({ onPaper = false }: { onPaper?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
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
            src="/images/celsius-logo-mono.png"
            alt="Celsius Dessert Bar, home"
            width={180}
            height={83}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[0.9375rem] text-bone/80 transition-colors hover:text-bone"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="border border-bone/45 px-5 py-2 text-[0.9375rem] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
          >
            Enquire
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-10 -mr-2 flex h-12 w-12 items-center justify-center md:hidden"
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
      </div>
    </header>
  );
}
