'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/* One quiet entrance, used once per block. The hiding is done in CSS (globals.css) and only
   when script is running and the visitor has not asked for reduced motion, so content is
   never left invisible. */
export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={shown ? 'in' : 'out'}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
