/* eslint-disable @next/next/no-img-element */
import photos from '@data/photos.json';

export type PhotoId = keyof typeof photos;

interface PhotoProps {
  id: PhotoId;
  /** How wide the image is drawn, in CSS terms, so the browser picks the right file. */
  sizes: string;
  className?: string;
}

/* Files and sizes come from tools/photos.mjs (see data/photos.json). */
export function Photo({ id, sizes, className }: PhotoProps) {
  const p = photos[id];
  const largest = p.srcset[p.srcset.length - 1];
  return (
    <img
      src={largest.src}
      srcSet={p.srcset.map((s) => `${s.src} ${s.w}w`).join(', ')}
      sizes={sizes}
      width={p.width}
      height={p.height}
      alt={p.alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
