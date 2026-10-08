import { FadeIn } from './FadeIn';
import agencyData from '@data/agency.json';

export default function Intro() {
  const intro = agencyData.intro;

  return (
    <section id="about" className="py-24 lg:py-40">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-6 lg:grid-cols-[1.5fr_1fr] lg:gap-24 lg:px-12">
        <FadeIn>
          <h2 className="display max-w-[48rem] text-[clamp(2.25rem,4.9vw,4.5rem)] leading-[1.05] text-bone">
            {intro.heading}
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} className="max-w-[30rem] lg:pt-3">
          <p className="text-[1.125rem] leading-[1.65] text-bone/85">{intro.body}</p>
          <p className="mt-5 leading-[1.65] text-bone/65">{intro.events}</p>
        </FadeIn>
      </div>
    </section>
  );
}
