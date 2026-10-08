import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Film from '@/components/Film';
import Clients from '@/components/Clients';
import Packages from '@/components/Packages';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bone focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Film />
        <Intro />
        <Clients />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
