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
Theatrical but refined. Indulgent without being chaotic. Champagne-gold + teal on charcoal — premium, not loud. The hook is the **show**: dessert plated live with liquid nitrogen at -196°C in front of guests. Not "ice cream catering" — a dessert moment.

## Tech Stack
- **Next.js 16.1.6** (App Router, static export — `output: "export"` in next.config.ts)
- **React 19.2.3** + TypeScript 5
- **Tailwind CSS v4** with custom palette tokens via `@theme inline` in `globals.css`
- **Framer Motion 12** for subtle scroll-triggered fades and parallax
- No backend — fully static. Form posts to `business.webhook_url` (n8n endpoint, currently null until client provides)
- **Dev port: 3001** (so it doesn't collide with the NSP project on 3000)

## Design System

### Anti-Vibecode Rules
- NO gradient text unless it's a deliberate brand accent
- NO generic dessert-stock-photo aesthetics
- NO perfectly symmetrical card grids — vary card heights, alternating layouts preferred
- NO oversized rounded corners (max 12-16px on cards, 32px on phone bezel)
- NO blue/purple gradients
- NO excessive drop shadows — subtle elevation only
- NO more than 2 visible font weights at a time

### Palette (CSS custom properties — see `src/app/globals.css`)

| Token | Value | Usage |
|---|---|---|
| `--color-charcoal` | `#0E0E10` | Primary background (body, hero, packages, contact) |
| `--color-charcoal-light` | `#1A1A1D` | Elevated surfaces (cards, brand strip) |
| `--color-charcoal-dark` | `#050507` | Deepest panels (footer) |
| `--color-teal` | `#5DBFB8` | Logo-matching accent — H1 highlights, check icons, ambient glows |
| `--color-teal-deep` | `#2F8F89` | Hover/active teal |
| `--color-gold` | `#C9A86A` | Champagne gold — CTAs, eyebrows, dividers |
| `--color-gold-light` | `#E2C58B` | Hover/CTA highlight |
| `--color-cream` | `#F5F1E8` | Off-white text on dark |
| `--color-warm-white` | `#FBF8F0` | Light pill backgrounds (brand marquee tiles) |
| `--color-border` | `rgba(201,168,106,0.18)` | Subtle gold dividers |

### Typography
- **Headings:** DM Serif Display (Google Fonts via `next/font`)
- **Body:** DM Sans (Google Fonts via `next/font`)
- Font scale via `clamp()` for fluid sizing
- Generous line-height (1.6–1.8 on body)

### Layout Principles
- Asymmetric over centred grids
- Generous whitespace
- Section padding varies — not identical on every section
- Max content width 1280px
- Mobile-first responsive (Tailwind breakpoints)

### Motion
- Framer Motion `<FadeIn>` wrapper for scroll-triggered fades (0.4–0.7s)
- Hero: subtle parallax + ambient blur orbs
- Brand marquee: CSS `@keyframes brand-marquee` translateX -50%, 40s desktop / 25s mobile, paused on hover
- Hover: tile scale 1.04, gold glow ring; CTA colour swap

## Page Structure (single-page scroll)

| # | Section | Component | Purpose |
|---|---|---|---|
| 1 | Navigation | `Navigation.tsx` | Fixed top, transparent → charcoal/95 on scroll |
| 2 | Hero | `Hero.tsx` | Headline + landscape phone mockup with YouTube embed (autoplay+mute+loop) |
| 3 | About | `About.tsx` | "Theatre, served cold" — story copy + temp visual placeholder |
| 4 | Brand Marquee | `BrandMarquee.tsx` | Auto-scroll strip of partner logos on light pills |
| 5 | Packages | `Packages.tsx` | 3-card tier display (Classic / Signature / Premium), Signature is "Most popular" |
| 6 | Contact | `Contact.tsx` | Enquiry form (Name, Email, Phone, Event Type, Package, Message) + kiosk info + Google Maps |
| 7 | Footer | `Footer.tsx` | 4-column dark footer + Instagram |

## Data Layer — `data/agency.json`

Single JSON file feeds every component. Schema overview:

| Top-level key | Shape | Used by |
|---|---|---|
| `business` | object — name, legal_name, tagline, brand_tagline, about_text, address, phone, email, website, youtube_hero_url, google_maps_url, social, hours, webhook_url | Hero, About, Contact, Footer, Navigation |
| `event_types` | string[] (8 entries) | Contact form select, Footer |
| `packages` | array of {name, tier, guest_capacity, highlights[]} (3 entries — no prices) | Packages section, Contact form select |
| `menu` | object — note + signature_flavours[] + custom_flavour_note | Packages footnote (custom_flavour_note) |
| `brand_partners` | array of {name, logo} (14 entries) | BrandMarquee |
| `service_area` | string | (not currently rendered) |
| `reviews` | empty array — placeholder until real reviews land | (Testimonials.tsx is dormant) |
| `_pending_brand_logos` | string[] — 16 brands awaiting client press kit | reference only |

## Standing Rules
1. **No public pricing.** Every package CTA routes to the contact form. Never show dollar amounts on the site.
2. **No fake reviews ever.** `reviews[]` stays empty until client supplies real testimonials with attribution.
3. **Brand marquee shows real partners only.** No filler logos. Missing logos go in `_pending_brand_logos[]` until client supplies.
4. **All CTAs route to enquiry form** (`#contact`). Hero, package cards, navigation, mobile menu — all converge on the same form.
5. **Form submission only fires when `webhook_url` is non-null.** Form silently no-ops in dev until n8n endpoint is live.

## File Structure
```
/data/agency.json         — single source of truth for all content
/src/app/
  layout.tsx              — metadata, fonts, JSON-LD (FoodEstablishment + CateringService)
  page.tsx                — composes the section order
  globals.css             — Tailwind + Celsius palette tokens + marquee CSS
/src/components/
  Navigation.tsx, Hero.tsx, About.tsx, BrandMarquee.tsx,
  Packages.tsx, Contact.tsx, Footer.tsx, FadeIn.tsx
  Testimonials.tsx        — DORMANT (// @ts-nocheck), awaiting real reviews
/public/images/
  celsius-logo.png        — primary brand mark (1820×841)
  brands/                 — 14 partner logos (mixed SVG/PNG/JPG)
/assets/
  celsius-source/         — original scraped logo + favicon
  brand-logos/            — pre-publish drop zone
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
- [ ] Square favicon variants (current `public/favicon.ico` is Bosland's)
- [ ] Hero / event photography pack (About visual is a TEMP placeholder)
- [ ] Real menu — `menu.signature_flavours[]` is placeholder content
- [ ] n8n webhook URL → `business.webhook_url`
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
- Jack switches between Mac and Windows PC
