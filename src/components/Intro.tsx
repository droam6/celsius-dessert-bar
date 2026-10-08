import { FadeIn } from './FadeIn';
import { Photo, type PhotoId } from './Photo';
import agencyData from '@data/agency.json';

/* A real sequence, so it is numbered: nitrogen in, churn, serve. */
const steps: { id: PhotoId; text: string; place: string; sizes: string }[] = [
  {
    id: 'pour',
    text: 'Liquid nitrogen goes in at −196°C.',
    place: 'lg:col-span-4',
    sizes: '(min-width: 1024px) 31vw, 100vw',
  },
  {
    id: 'churn',
    text: 'The base freezes as it churns.',
    place: 'lg:col-span-4 lg:mt-40',
    sizes: '(min-width: 1024px) 31vw, 100vw',
  },
  {
    id: 'cup',
    text: 'Served straight from the bowl.',
    place: 'lg:col-span-4 lg:mt-14',
    sizes: '(min-width: 1024px) 31vw, 100vw',
  },
];

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

      <ol className="mx-auto mt-16 grid max-w-[1360px] gap-x-5 gap-y-12 px-6 lg:mt-28 lg:grid-cols-12 lg:px-12">
        {steps.map((s, i) => (
          <li key={s.id} className={s.place}>
            <FadeIn delay={i * 0.12}>
              <figure>
                <Photo id={s.id} sizes={s.sizes} className="h-auto w-full" />
                <figcaption className="mt-4 flex gap-4 text-[0.9375rem] leading-[1.5] text-bone/75">
                  <span className="display-sm text-[1.125rem] leading-[1.25] text-champagne" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>{s.text}</span>
                </figcaption>
              </figure>
            </FadeIn>
          </li>
        ))}
      </ol>
    </section>
  );
}
