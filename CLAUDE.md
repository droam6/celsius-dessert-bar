# Celsius Dessert Bar — Premium Catering Website

## Mission
Build a premium, conversion-optimized catering website for Celsius Dessert Bar that looks like it was designed by a top-tier Sydney studio — NOT by AI. This is a speculative pitch build aimed at Sydney's high-end events market (weddings, corporate activations, galas). Quality bar: if a competing caterer or event-tech vendor saw this site, they'd want to know who built it.

## Client Details
- Business: Celsius Dessert Bar
- Status: Pending — speculative pitch build (no signed brief yet)
- Address: Kiosk 4, Chatswood Bus Interchange, 436 Victoria Avenue, Chatswood NSW 2067
- Phone: 0451 073 136
- Email: info@celsiusdessertbar.com.au
- Domain: celsiusdessertbar.com.au
- Instagram: @celsiusdessertbar
- Tagline: "Sydney's premier liquid nitrogen gelato experience"
- Operating from: Chatswood kiosk + on-site catering across Sydney

## Service Areas
Sydney metro and surrounds. Catering travels — venues we've serviced include Doltone House, Carriageworks, Royal Randwick, The Lakes Golf Club, Navarra Venues, Pendolino.

## Service Offering
- Live liquid nitrogen gelato catering
- Three event packages (Classic / Signature / Premium) — see `data/agency.json` `packages[]`
- Custom flavour development for Premium package
- Wedding desserts, corporate brand activations, product launches, gala dinners, private parties, festivals, film/TV premieres

## Brand Personality
Luxury, sleek, high-end corporate. The hook is the **show**: gelato frozen live with liquid nitrogen at −196°C in front of guests. Jack's standing brief (8 Oct 2026): keep the luxury mood, but the site must not look AI-generated ("vibecoded").

## Tech Stack
- **Next.js 16.1.6** (App Router, static export — `output: "export"` in next.config.ts)
- **React 19.2.3** + TypeScript 5
- **Tailwind CSS v4** with tokens via `@theme inline` in `globals.css`
- Fonts are self-hosted through `next/font/local` from `src/fonts/` (SIL OFL). No Google Fonts request, and the build works offline.
- No backend — fully static. Form posts to `business.webhook_url`; while that is null it opens the visitor's email app with the enquiry filled in (never drops an enquiry silently).
- **Dev port: 3001**

## Design System ("rework", 8 Oct 2026 — replaces the cream/serif/gold build)

### What was removed, and must not come back
The previous build read as an AI template. These are the tells that were cut:
- A small tracked uppercase label above every heading
- Cream + DM Serif + gold
- Three pricing cards with a "Most popular" badge and tick lists
- Centred "Trusted by" scrolling logo strip
- Phone-frame mockup around the video
- Fade-up on every element
- Mood copy ("Theatre, served cold", "Choose your moment", "The final flourish")
- One coloured accent word in each heading
- Invented provenance in menu copy ("Madagascan", "24-karat", "Murray River")

### Palette (`src/app/globals.css`)
| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#000000` | Page black. Matches the black of the hero film exactly, so the hero has no visible edge. |
| `--color-ink-soft` | `#121212` | Video frame while loading |
| `--color-bone` | `#F1EDE4` | Text on black, primary button |
| `--color-paper` | `#ECE6DA` | The one light surface: packages section and the menu page (set like a printed card) |
| `--color-champagne` | `#C9AE84` | Metal accent on black: focus ring, announcement line. Used rarely. |
| `--color-bronze` | `#6E5837` | Same metal, dark enough for text on paper |

Mint and salmon live in the original logo only. On black the site uses `celsius-logo-mono.png` (one-colour wordmark made from the client's logo; needs client sign-off).

### Typography
- **Display:** Bodoni Moda (variable, optical size axis). Class `.display`. Big and sparing.
- **Small display** (`.display-sm`): same face at a low optical size and weight 500. Use below about 40px, or hyphens, plus signs and hairlines vanish.
- **Body and UI:** Hanken Grotesk.
- `.label` (small tracked caps) is only for form labels and the menu course names. Never above a heading.
- Italic is used in two places only: the temperature in the hero and the package names.
- Sentence case everywhere, including buttons.

### Layout
- Max width 1360px. Black sections run into each other; hairlines (`border-bone/15–25`) separate, not boxes.
- No cards, no shadows, no rounded corners, no gradients except the hero scrim.
- Buttons are flat bone rectangles (`.btn`); secondary actions are underlined text (`.link`).
- Form fields are a label and a bottom line (`.field`).
- Client logos: static grid, one colour (`.logo-mono`, CSS filter; three marks have pre-made `-mono.png` files). `shape` and `scale` in `brand_partners[]` balance their optical weight.

### Motion
- Hero headline rises out of a clipped line (CSS keyframes, no script).
- `<FadeIn>` (IntersectionObserver + CSS, no Framer Motion) once per block, 0.9s. Content is only hidden when `html[data-js]` is set and the visitor has not asked for reduced motion.
- `prefers-reduced-motion`: hero video hidden, poster shown, no entrances. (Jack's Windows PC had "Show animations" off; that was the old "frozen hero" bug.)

## Page Structure

Two routes: `/` and `/menu`.

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Navigation | `Navigation.tsx` | Clear over the hero, black once scrolled. Packages · Clients · Menu · Enquire |
| 2 | Hero | `Hero.tsx` | Smoke film, headline at the bottom on a black scrim. Optional `business.announcement` line (null = hidden) |
| 3 | Film | `Film.tsx` | The real event film (YouTube), full width, no device frame. Player mounts only when scrolled into view. Caption from `business.film_caption` |
| 4 | Intro | `Intro.tsx` | One statement + two short paragraphs from `intro`, then the three-photo sequence (pour, churn, serve). Numbered because it is a real sequence |
| 5 | Clients | `Clients.tsx` | Static one-colour logo grid |
| 5b | Events | `Events.tsx` | Four event photos in two flush rows. In each row one photo keeps its shape, the other is cropped to match |
| 6 | Packages | `Packages.tsx` | One row per package on paper. No prices. Each "Enquire" preselects the package in the form |
| 7 | Contact | `Contact.tsx` | Form (adds event date + guests) and plain contact details |
| 8 | Footer | `Footer.tsx` | Minimal |

`/menu` is set on paper like a printed menu: names only, three courses. It shows "Sample menu." while `menu.note` is non-empty.

### Photographs
- Real event photos only, from the client's USB (rescued 8 Oct 2026 to `Desktop/celsius-photos` on Jack's PC; the originals are **not** in this repo).
- `node tools/photos.mjs <folder of picked originals>` crops, resizes and writes `public/images/photos/*.webp` plus `data/photos.json`. Crop boxes and alt text live in that script. `<Photo id sizes>` renders them with width, height and srcset.
- Every crop in the script was chosen so no recognisable face is left in frame. Keep it that way (rule 7).
- Not used, on purpose: the Stormtrooper shots (third-party characters), anything with children or guests' faces, the insurance and food-safety documents, the newspaper page.
- Small originals (under about 1300px) only go in half-width slots.

## Data Layer — `data/agency.json`

Single JSON file feeds every component. Schema overview:

| Top-level key | Shape | Used by |
|---|---|---|
| `business` | object — name, legal_name, tagline, address, phone, email, website, youtube_hero_url, film_caption, announcement, google_maps_url, social, hours, webhook_url | Hero, Film, Contact, Footer |
| `intro` | heading, body, events | Intro |
| `event_types` | string[] (8 entries) | Contact form select, Footer |
| `packages` | array of {name, guests, flavours, service, …} (3 entries — no prices) + `packages_included[]` | Packages section, Contact form select |
| `menu` | object — note + signature[8]/seasonal[4]/toppings[8] ({name, description}) + rotation_note + custom_flavour_note | /menu page; Packages footnote (custom_flavour_note) |
| `brand_partners` | array of {name, logo, logo_mono?, kind, shape, scale?} (14 entries) | Clients |
| `service_area` | string | (not currently rendered) |
| `reviews` | empty array — placeholder until real reviews land | (Testimonials.tsx is dormant) |
| `_pending_brand_logos` | string[] — 16 brands awaiting client press kit | reference only |

## Standing Rules
1. **No public pricing.** Every package CTA routes to the contact form. Never show dollar amounts on the site.
2. **No fake reviews ever.** `reviews[]` stays empty until client supplies real testimonials with attribution.
3. **Brand marquee shows real partners only.** No filler logos. Missing logos go in `_pending_brand_logos[]` until client supplies.
4. **All CTAs route to enquiry form** (`#contact`). Hero, package cards, navigation, mobile menu — all converge on the same form.
5. **The form never drops an enquiry.** With `webhook_url` null it opens the visitor's email app with the enquiry filled in and says so. Webmail users may see nothing, so a real endpoint is a launch blocker.
6. **No invented facts.** No response-time promises, no "most popular", no provenance claims, no offers the client has not confirmed. `business.announcement` stays null until Jack supplies real wording.
7. **Faces.** The repo is public. Event photos with recognisable faces are never committed; crop faces out, or blur small background ones, before anything is added.

## File Structure
```
/data/agency.json         — single source of truth for all content
/src/app/
  layout.tsx              — metadata, self-hosted fonts, JSON-LD (IceCreamShop, built from agency.json)
  not-found.tsx           — 404 page
  page.tsx                — composes the section order
  menu/page.tsx           — /menu route
  globals.css             — Tailwind + tokens + the few hand-written classes
/src/components/
  Navigation, Hero, Film, Intro, Clients, Events, Packages, Contact, Footer, FadeIn, Photo
  Testimonials.tsx        — DORMANT (// @ts-nocheck), awaiting real reviews
/src/fonts/               — Bodoni Moda + Hanken Grotesk woff2, OFL licences
/tools/photos.mjs         — event photo crops and web sizes (originals stay off the repo)
/public/images/
  celsius-logo.png        — client's colour logo
  celsius-logo-mono.png   — one-colour wordmark for black surfaces
  og-default.jpg          — 1200×630 share image
  brands/                 — 14 partner logos (+ three -mono.png)
  photos/                 — processed event photos (webp), listed in data/photos.json
```

## Dev Commands
```
npm install        # first time
npm run dev        # http://localhost:3001
npm run build      # static export to /out
npm run lint
```

## Pending Items (mirroring Round 3+4)
- [ ] Real testimonials (3 minimum)
- [ ] 16 missing brand partner logos — see `_pending_brand_logos[]`
- [x] Favicons replaced (the "C" from the wordmark on black)
- [x] Event photography: eight shots from the client's USB are in (see Photographs). More can be added through tools/photos.mjs.
- [ ] Client OK for the photos in use, and whether staff are happy to be shown (a strong two-chef stage shot is held back because faces are clear)
- [ ] Better source footage for the hero: the USB copy of the Lancôme film is only 640×360, so the stock smoke stays for now
- [ ] Client sign-off on the one-colour wordmark
- [ ] SEO pass, Google Business Profile, summer offer wording (Jack, 8 Oct)
- [ ] Real menu — `menu.*` is placeholder content (page shows "Sample menu.")
- [ ] Form endpoint → `business.webhook_url` (launch blocker)
- [ ] iOS Safari YouTube autoplay-mute device test
- [ ] Final domain DNS + hosting decision
- [ ] Legal copy: ABN, privacy policy URL, T&Cs

## Workflow (per session)
1. Read `CLAUDE.md`, `progress.md`, `decisions.md`
2. Check `data/agency.json` for current content
3. Components auto-populate from JSON — schema changes in JSON propagate everywhere

## Git
- Repo: `https://github.com/droam6/celsius-dessert-bar` (public)
- Always `git push` at end of each session
- The redesign lives on branch `rework`. Do not merge to `main` until Jack approves it.
- Jack switches between Mac and Windows PC
