import Link from 'next/link';
import { FadeIn } from './FadeIn';
import { Photo, type PhotoId } from './Photo';
import agencyData from '@data/agency.json';

type Flavour = { name: string; photo: PhotoId; note?: string };

/* A few real flavours, each with its own photo, so a buyer can see what is served.
   Content comes from `flavours.items` in data/agency.json: the client's own photos
   (processed by tools/photos.mjs) and the client's own flavour names. Nothing here is
   invented, so the section stays off the page until at least three are supplied. */
export default function Flavours() {
  const { heading, items } = agencyData.flavours as { heading: string; items: Flavour[] };
  if (items.length < 3) return null;
  const instagram = agencyData.business.social.instagram;

  return (
    <section id="flavours" aria-labelledby="flavours-title" className="border-t border-bone/15 py-20 lg:py-32">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        <FadeIn className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <h2 id="flavours-title" className="display text-[clamp(2.25rem,4.4vw,3.75rem)] text-bone">
            {heading}
          </h2>
          <p className="flex flex-wrap gap-x-7">
            <Link href="/menu" className="link flex min-h-11 items-center text-[0.9375rem] text-bone">
              See the menu
            </Link>
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link flex min-h-11 items-center text-[0.9375rem] text-bone"
              >
                More on Instagram
              </a>
            )}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Four across when the count divides by four, otherwise three, so no row ends in a hole. */}
          <ul
            className={`mt-10 grid grid-cols-2 gap-x-3 gap-y-10 lg:mt-14 lg:gap-x-5 ${
              items.length % 4 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            }`}
          >
            {items.map((f) => (
              <li key={f.name}>
                <figure>
                  <Photo
                    id={f.photo}
                    sizes="(min-width: 1024px) 23vw, 48vw"
                    className="aspect-[4/5] h-auto w-full object-cover"
                  />
                  <figcaption className="mt-3">
                    <span className="display-sm block text-[1.25rem] text-bone lg:text-[1.375rem]">{f.name}</span>
                    {f.note && <span className="mt-1 block text-[0.9375rem] text-bone/65">{f.note}</span>}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
