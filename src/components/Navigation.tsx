'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { label: 'Brands', href: '#brands' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(251,248,240,0.95)] py-3 backdrop-blur-md border-b border-[var(--color-border)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 lg:px-10">
          <a href="#" className="relative z-10">
            <Image
              src="/images/celsius-logo.png"
              alt="Celsius Dessert Bar"
              width={180}
              height={83}
              className={`w-auto transition-all duration-500 ${scrolled ? 'h-9 lg:h-10' : 'h-10 lg:h-11'}`}
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium uppercase tracking-[0.15em] text-cream/70 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="border border-gold/60 px-5 py-2 text-[13px] font-medium uppercase tracking-[0.15em] text-gold transition-all duration-300 hover:bg-gold hover:text-charcoal"
            >
              Enquire
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 flex flex-col gap-[5px] md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[1.5px] w-6 bg-cream transition-all duration-300 ${
                mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-cream transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-cream transition-all duration-300 ${
                mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-charcoal/98 md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-[15px] font-medium uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                className="mt-4 border border-gold/60 px-8 py-3 text-[13px] font-medium uppercase tracking-[0.15em] text-gold transition-all hover:bg-gold hover:text-charcoal"
              >
                Enquire
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
