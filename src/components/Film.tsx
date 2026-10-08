import { FadeIn } from './FadeIn';
import agencyData from '@data/agency.json';

function youtubeIdFromUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const v = parsed.searchParams.get('v');
    if (v) return v;
    return parsed.pathname.split('/').filter(Boolean).pop() ?? '';
  } catch {
    return '';
  }
}

/* The real event film, shown as wide as the page allows. No device frame. */
export default function Film() {
  const { youtube_hero_url, film_caption } = agencyData.business;
  const ytId = youtubeIdFromUrl(youtube_hero_url);
  if (!ytId) return null;

  const embedSrc =
    `https://www.youtube.com/embed/${ytId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${ytId}` +
    `&controls=0&modestbranding=1&rel=0&playsinline=1`;

  return (
    <section id="film" aria-labelledby="film-title" className="pt-6 lg:pt-10">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        <h2 id="film-title" className="sr-only">
          Film: Celsius at an event
        </h2>
        <FadeIn>
          <figure>
            <div
              className="relative aspect-video w-full overflow-hidden bg-ink-soft bg-cover bg-center"
              style={{ backgroundImage: `url(https://i.ytimg.com/vi/${ytId}/hqdefault.jpg)` }}
            >
              <iframe
                src={embedSrc}
                title={`Celsius Dessert Bar film: ${film_caption}`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-x-8 text-[0.875rem] text-bone/60">
              <span>{film_caption}</span>
              <a
                href={youtube_hero_url}
                target="_blank"
                rel="noopener noreferrer"
                className="link flex min-h-11 items-center text-bone/80"
              >
                Watch on YouTube
              </a>
            </figcaption>
          </figure>
        </FadeIn>
      </div>
    </section>
  );
}
