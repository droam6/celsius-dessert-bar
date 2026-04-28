# Celsius Dessert Bar — Client Approval Checklist

> Site: celsiusdessertbar.com.au
> Status: speculative pitch build, awaiting client sign-off
> Last updated: Round 4

---

## ALREADY DONE (built into the pitch)

| Item | Status |
|---|---|
| Repo + GitHub origin (`droam6/celsius-dessert-bar`) | Done |
| Next.js 16 / React 19 / Tailwind v4 / Framer Motion stack | Done |
| Single-page layout: Hero → About → Brands → Packages → Contact → Footer | Done |
| Hero with landscape phone mockup + YouTube autoplay-mute embed | Done |
| About section with Celsius story copy | Done |
| Brand partner marquee — 14 logos on light pills, auto-scroll, hover gold glow | Done |
| 3-tier package section (Classic / Signature / Premium), no public pricing | Done |
| Enquiry form with Event Type + Package selects, package preselect from cards | Done |
| Google Maps embed (Chatswood kiosk) | Done |
| FoodEstablishment + CateringService JSON-LD schema | Done |
| Sitemap, robots.txt, canonical URL, en-AU hreflang, OG/Twitter cards | Done |
| DM Serif Display + DM Sans loaded via `next/font` | Done |
| Dark-first palette (charcoal + teal + champagne gold + cream) | Done |
| Navigation: scroll-aware, mobile hamburger, anchor links | Done |
| Footer: 4-column, kiosk hours, Instagram link | Done |

---

## REQUIRES CLIENT'S DECISION (Yes / No)

| # | Question | Default Assumption |
|---|---|---|
| 1 | **Domain:** Confirm the site goes live on `celsiusdessertbar.com.au`? | Yes |
| 2 | **Tagline:** Are we keeping "Sydney's premier liquid nitrogen gelato experience" + brand tagline "Crafted live. Served at -196°C."? | Yes |
| 3 | **About copy:** Is the `business.about_text` in `data/agency.json` accurate (Chatswood kiosk → catering positioning)? | Awaiting confirmation |
| 4 | **Package names + tiers:** "Classic / Signature / Premium" — does this match how you sell? | Awaiting confirmation |
| 5 | **Package highlights:** The bullets per tier (2 chefs, 1 hour show, etc.) — accurate? Anything to add/remove? | Awaiting confirmation |
| 6 | **Custom flavour note:** "Premium package guests receive a bespoke flavour designed by our chefs" — true? | Awaiting confirmation |
| 7 | **Public pricing:** Site currently shows zero prices, every CTA routes to the form. Keep it that way? | Yes (confirmed in D3) |
| 8 | **Instagram only?** No Facebook / TikTok / LinkedIn presence to link out to? | Awaiting confirmation |
| 9 | **Service area copy:** "Sydney metro and surrounds" — broad enough? Or any geographic specifics worth calling out? | Awaiting confirmation |

---

## REQUIRES CLIENT TO PROVIDE

| # | Item | Detail | Blocking? |
|---|---|---|---|
| 1 | **Final logo files** | High-res master (PNG and ideally SVG) of the teal-script Celsius wordmark. Current `public/images/celsius-logo.png` is scraped from the live site (1820×841). | Soft — current asset works for pitch |
| 2 | **Favicon set** | Square brand mark (32, 192, 512 px) + apple-touch-icon (180px) + maskable. Current `public/favicon.ico`/`icon-192.png`/`apple-touch-icon.png` are leftover Bosland defaults. | Soft — works but looks wrong on bookmark/PWA install |
| 3 | **OG / social card image** | 1200×630 hero image for link previews. Currently using the logo PNG as a placeholder. | Soft — fine for pitch, needs a hero shot before launch |
| 4 | **Hero / event photography** | Pack of 6–10 high-res event shots: live nitrogen show, plated desserts, brand activations, weddings. Used in About section + future gallery. | Soft — About has a TEMP placeholder panel |
| 5 | **Real menu** | `menu.signature_flavours[]` in JSON is placeholder content. Need final 8–12 flavour names + any GF/vegan callouts. | Yes — for Packages footnote |
| 6 | **Real testimonials** | 3 minimum, ideally 5. Each with name, role/event type, quote (1–3 sentences), source attribution. `reviews[]` is empty — Testimonials component is dormant. | Yes — for credibility section |
| 7 | **16 missing brand partner logos** | See `_pending_brand_logos[]` in `data/agency.json`: The Calyx, Western Sydney University, The Star, Priceline, Four Seasons, MCA Australia, ICC Sydney, Goulburn Mulwaree Library, Museum of Illusions Sydney, Liverpool City Council, Ivy, Amaze In Taste, Applause Entertainment, Zest, Vivid Sydney (full mark), Extraordinary Events (higher-res). Press-kit drop preferred. | Yes — for marquee completeness |
| 8 | **Form endpoint (n8n webhook)** | `business.webhook_url` is currently `null`, so submissions silently no-op. Need either an n8n URL or a Formspree endpoint. | YES — site can't capture leads without it |
| 9 | **Confirm Instagram URL** | `https://www.instagram.com/celsiusdessertbar/` — verify this is the active account. | Soft |
| 10 | **Phone + email** | `0451 073 136` and `info@celsiusdessertbar.com.au` — confirm both are monitored daily. | Soft |
| 11 | **Kiosk hours** | "Mon–Fri 7:00 AM – 5:00 PM, Sat–Sun 12:00 PM – 5:00 PM" — accurate? | Soft |

---

## DEPLOYMENT & LEGAL (before launch)

| # | Item | Detail | Owner |
|---|---|---|---|
| 1 | **Domain DNS + hosting decision** | Static export on Vercel / Netlify / Cloudflare Pages? Or roll into existing hosting? | Jack + client |
| 2 | **ABN** | For footer + invoicing. Currently no ABN line in JSON. | Client to provide |
| 3 | **Registered business name** | Confirm "Celsius Dessert Bar" is the trading name to display. | Client |
| 4 | **Privacy policy URL** | Required when collecting form data. Either we draft a generic one or client supplies. | Client + Jack |
| 5 | **T&Cs** | Particularly cancellation, deposits, dietary disclaimers for nitrogen-frozen products. | Client |
| 6 | **GTM / GA4 container ID** | `<!-- AWAITING_GTM_ID -->` placeholders in `layout.tsx`. | Client to provide ID |
| 7 | **Meta Pixel** (optional) | If running Meta Ads. Not currently scaffolded. | Client decision |
| 8 | **Google Business Profile** | Verify the kiosk listing — Maps embed pulls from address fields. | Client |

---

## TIME-TO-LAUNCH (after greenlight)

| Task | Source of input | Estimated time |
|---|---|---|
| Wire n8n webhook | Client provides URL | 10 min |
| Add GTM container | Client provides ID | 5 min |
| Drop real photography | Client provides pack | 30 min |
| Drop missing brand logos | Client provides press kit | 20 min |
| Replace placeholder menu | Client provides final list | 5 min |
| Add real testimonials | Client provides | 15 min |
| Replace favicon set | Client provides square mark or Jack designs | 30 min |
| Static build + deploy | — | 15 min |
| DNS cutover | — | 30 min (propagation pending) |

Estimated total once client is ready: **~2.5 hours of work + DNS**.
