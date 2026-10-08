import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Page not found | Celsius Dessert Bar',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navigation onPaper />
      <main id="main-content" className="mx-auto flex min-h-[80svh] max-w-[1360px] flex-col justify-end px-6 pb-20 pt-40 lg:px-12 lg:pb-28">
        <h1 className="display text-[clamp(3rem,9vw,8rem)] leading-[0.98] text-bone">
          Page not found
        </h1>
        <p className="mt-6 max-w-[28rem] text-bone/75">
          The link is broken or the page has moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href="/" className="btn">
            Back to the home page
          </Link>
          <Link href="/#contact" className="link flex min-h-12 items-center text-[0.9375rem] text-bone">
            Enquire about an event
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
