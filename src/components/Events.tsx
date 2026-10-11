import { FadeIn } from './FadeIn';
import { Photo } from './Photo';
import agencyData from '@data/agency.json';

/* The bar set up at real events. In each row one photo keeps its own shape and sets the
   height; the other is cropped to match, so the rows sit flush without forcing every
   frame into the same box. The row underneath is the one call to action between the
   top of the page and the packages. */
export default function Events() {
  const instagram = agencyData.business.social.instagram;

  return (
    <section id="events" aria-labelledby="events-title" className="py-20 lg:py-32">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        <h2 id="events-title" className="text-[1rem] leading-[1.5] text-bone/65">
          The bar at events
        </h2>

        <FadeIn className="mt-8 grid gap-3 lg:mt-10 lg:grid-cols-12">
          <Photo
            id="fog-table"
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="h-auto w-full lg:col-span-8"
          />
          <div className="relative lg:col-span-4">
            <Photo
              id="fog-plinth"
              sizes="(min-width: 1024px) 31vw, 100vw"
              className="h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn className="mt-3 grid gap-3 lg:grid-cols-12">
          <Photo
            id="harbour"
            sizes="(min-width: 1024px) 39vw, 100vw"
            className="h-auto w-full lg:col-span-5"
          />
          <div className="relative lg:col-span-7">
            <Photo
              id="mirror-ball"
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-cover lg:object-[center_62%]"
            />
          </div>
        </FadeIn>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between lg:mt-14">
          <p className="max-w-[32rem] text-[1.0625rem] text-bone/85">
            Have a date in mind? Send it with your venue and guest count.
          </p>
          <p className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <a href="#contact" className="btn">
              Enquire
            </a>
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link flex min-h-12 items-center text-[0.9375rem] text-bone"
              >
                More on Instagram
              </a>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
