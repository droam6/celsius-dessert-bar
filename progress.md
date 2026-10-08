Project: Celsius Dessert Bar — celsiusdessertbar.com.au
Base template: cloned from droam6/bosland-properties-site
YouTube hero video: https://www.youtube.com/watch?v=fy8wgPPoReI
Brand: teal + champagne gold on dark, DM Serif Display + DM Sans
Pricing: hidden, all CTAs → enquiry form

## Round 1 — Repo setup, audit, asset scrape
- gh CLI installed mid-round; cloned droam6/bosland-properties-site → celsius-dessert-bar; new public repo created on GitHub; origin set
- Full audit: Next.js 16 / React 19 / Tailwind v4 / Framer Motion stack confirmed; 9-section single-page Bosland layout catalogued
- Celsius source: 0 SVGs on celsiusdessertbar.com.au (Jimdo CMS, all raster); logo PNG saved at 1820×841
- Brand-logo Round 1: 8/30 SVGs scraped from Wikimedia Commons

## Round 2 — Content infrastructure
- Fixed .gitignore (removed `*.png` blanket rule; added Thumbs.db, /dist/)
- Brand-logo Round 2 press-kit scrape: +6 net additions (carriageworks, doltone-house, navarra-venues, royal-randwick, pendolino, the-lakes-golf-club); 7 garbage captures filtered out
- Inventoried 206 Bosland strings across 19 files; categorised for Round 3 swap
- Proposed asset paths for Celsius logo + favicon; favicon deferred until proper square mark exists

## Round 3 — Content + brand transformation
- data/agency.json rewritten from scratch (business / event_types / packages / menu / brand_partners / reviews / _pending_brand_logos)
- Bosland → Celsius swap across package.json, layout.tsx (full FoodEstablishment + CateringService JSON-LD), sitemap.xml, robots.txt
- Footer, Navigation, Contact rewired to new schema; Suburbs.tsx deleted; orphan components stamped `// @ts-nocheck`
- Hero rebuilt with landscape phone mockup (lifted from north-shore-tiling phone-frame CSS) + YouTube embed (fy8wgPPoReI, autoplay/mute/loop/no-controls)
- Palette swap in globals.css: charcoal #0E0E10, teal #5DBFB8, gold #C9A86A, cream #F5F1E8 — class names preserved so existing components continue to work
- BrandMarquee.tsx built (auto-scroll keyframe, paused on hover); mounted between Hero and Contact

## Round 5 — Palette flip: dark → light editorial
- Globals.css `@theme` rewritten: cream surfaces (#FBF8F0 / #FFFFFF / #F0EBDD), deep teal (#2F8F89), deep gold (#A88947), near-black text (#1A1A1D)
- Bosland-era class names (bg-charcoal, text-cream, charcoal-light/dark, warm-white) re-aliased to light values — zero component refactoring needed for the inversion
- body now light-first: `bg: var(--color-bg); color: var(--color-text)`
- Hero: phone bezel #1A1A1D, glow → real elevation shadow, ambient orbs softened to gold/12 + teal/10
- About: temp gradient placeholder panel commented out (would read broken on cream); section is text-only single-column on white
- BrandMarquee: tile chrome (bg/border/shadow) stripped, edge fades match cream, hover is scale-only, gold-glow ring removed; navarra-venues (white-on-transparent) wrapped in dark pill via data attribute
- Packages: cards on white with real elevation shadow, hover gold border, "Most popular" ribbon solid gold + cream text, tier badges deeper-gold outlined
- Navigation scroll-bar: `rgba(251,248,240,0.95)` + backdrop-blur-md + teal hairline border-bottom
- Footer: explicit `bg-[#F0EBDD]` band override
- Contact form inputs: scoped CSS rule injects white bg + teal/18 border + teal focus ring
- Section rhythm: Hero #FBF8F0 → About #FFFFFF → BrandMarquee #FBF8F0 → Packages #F0EBDD → Contact #FBF8F0 → Footer #F0EBDD

## Round 6 — Smoke video hero + dedicated PhoneShowcase section
- Pexels smoke clip (cottonbro studio, ID 9694240, free commercial licence) downloaded; ffmpeg installed via winget Gyan.FFmpeg
- Compressed to public/videos/hero-smoke.mp4 (1.5 MB, 1920×1080, h264, 10s, no audio) and public/videos/hero-smoke.webm (948 KB, vp9); poster frame public/images/hero-smoke-poster.jpg (51 KB) extracted from t=3s; raw 53 MB source deleted
- Hero.tsx rewritten: full-bleed background `<video>` with mix-blend-mode multiply + 0.85 opacity, cream gradient overlay for legibility, ambient orbs kept above video; phone mockup removed; single max-w-4xl text column, headline scaled up to clamp(2.75rem, 6vw, 5.5rem), subhead widened to max-w-2xl
- New PhoneShowcase.tsx (id=see-it-live, bg #F0EBDD): "See it live" eyebrow + "Theatre on every table." h2 + outline-gold CTA on left, landscape phone with YouTube embed on right (max-w-640 desktop, 420 mobile), teal halo box-shadow restored as section sparkle
- page.tsx render order: Hero → About → PhoneShowcase → BrandMarquee → Packages → Contact → Footer
- Section rhythm: cream → white → deeper cream → cream → deeper cream → cream → deeper cream (no two same-tone neighbours)
- globals.css: prefers-reduced-motion fallback hides hero video, swaps to poster bg, pauses brand marquee
- tsc clean; videos confirmed not blocked by .gitignore

## Round 6 recovery — mix-blend-mode swap
- Diagnosis (DevTools): hero-smoke.webm loaded (304) but invisible. mix-blend-mode: multiply rendered nothing against the transparent parent
- Hero.tsx: video container given explicit bg-[#FBF8F0]; video style swapped to opacity 0.55 + filter contrast(1.1) brightness(1.05) saturate(0.9); cream gradient overlay softened (top 0.10 / mid 0.05 / bottom 0.55) so smoke reads stronger up top
- globals.css reduced-motion: replaced background-blend-mode multiply with stacked linear-gradient(rgba(251,248,240,0.30) → 0.55) over the poster image; same visual logic, no blend-mode dependency

## Round 7 — Hero reset to mix-blend-mode: screen + vertical centring
- Replaced opacity/filter approach with mix-blend-mode: screen (correct mode for white-smoke-on-black source onto a light page — black pixels drop out, white smoke lifts onto cream)
- Video container: no bg colour, overflow-hidden; bottom 2/3 cream gradient (transparent → 0.35 → 0.85) for text legibility, top stays clear for strong smoke
- Section padding rebalanced: pt-32 lg:pt-40 pb-32 → pt-24 pb-24 (flex items-center now handles vertical centering instead of being fought by top padding)
- Added videoRef + useEffect listeners (play/error/forced .play().catch()) so console reveals whether video element mounted, fired play, or autoplay-blocked

## Round 7 video-render-fix — diagnostic strip-down
- Symptoms: paused:false, currentTime advancing, readyState 4 — but visually frozen on poster
- Hypothesis: GPU paint failure on WebM/VP9 + mix-blend-mode combo, or layout collapsing video to 0 dims
- Hero.tsx video block stripped to bare minimum: single MP4 source, inline styles only, position absolute + 100% w/h + objectFit cover, opacity 0.6, no blend mode, no Tailwind classes, gradient overlay temporarily removed
- useEffect extended with 2s setInterval logging currentTime + paused for 10s — distinguishes data-state vs paint-state failure (Outcome A: blend was the cause, B: GPU paint failure, C: actually paused)

## Round 8 — Replace clip with Pexels 9694227 + bulletproof encode
- Old assets removed: hero-smoke.mp4 (1.5 MB R6 build), hero-smoke.webm (948 KB), hero-smoke-poster.jpg
- New Pexels source: cottonbro studio video 9694227 "White smoke against black background" (free commercial licence); 7.5 MB download, 21.84s duration
- Re-encoded with maximum-compatibility profile: H.264 baseline, level 3.1, yuv420p, preset medium, crf 23, scale=1920:1080, no audio, faststart, trimmed to 15s
- Final assets: public/videos/hero-smoke.mp4 5.2 MB; public/images/hero-smoke-poster.jpg 75 KB (frame at t=2s)
- Hero.tsx stripped to bare bones per round-8 mandate: no wrapping container around video, no mix-blend-mode, no opacity, no filters, no playbackRate. Video element sits directly under the section, full opacity, native speed. Bottom gradient as a separate sibling div (z-[1], not on the video) for text legibility
- Decoration removed: gold + teal ambient orbs deleted (per "no extra divs, no overlays, no decorations" rule for the simplified video block)
- Hero text colours flipped for the now-dark hero: h1 → text-[#FBF8F0], subhead → text-[#FBF8F0]/85, "View packages" CTA → border-[#FBF8F0]/50 text-[#FBF8F0] + hover:bg-[#FBF8F0]/10. Eyebrow gold + h1 accent teal + primary gold CTA all unchanged. Rest of site (About → Footer) stays cream/light
- useEffect simplified to a single videoRef.current?.play().catch(() => {}) — diagnostics removed
- globals.css reduced-motion fallback simplified: bare poster image bg, no stacked gradient, no blend-mode

## Round 4 — Cleanup, About + Packages, marquee fix, docs
- Deleted: TrustBar.tsx, Team.tsx, public/images/team/, public/images/boslandheader.jpg
- About.tsx repurposed: "Theatre, served cold" copy + temp decorative gradient panel (TODO photo)
- Services.tsx → Packages.tsx (renamed): 3-card layout (Classic / Signature / Premium), Signature flagged "Most popular", per-card "Enquire about X" CTA dispatches `celsius:package-selected` event + scrolls to #contact
- Contact form: added Package select with preselect-from-event handler
- BrandMarquee redesigned: light pill tiles on warm-white bg (#FBF8F0), full-colour logos (greyscale removed), hover gold glow ring; subhead "From global brands to Sydney's most iconic venues."
- page.tsx render order: Hero → About → BrandMarquee → Packages → Contact
- Docs rewritten: CLAUDE.md, CLIENT-APPROVAL-CHECKLIST.md (full Celsius rewrite); decisions.md appended D5–D7

## Round 9 — State audit + video verification (Windows machine)
- ffmpeg/ffprobe was missing on the Windows PC (R6 install happened elsewhere) — installed via winget Gyan.FFmpeg 8.1.2
- Codec audit PASSED: hero-smoke.mp4 is h264 Constrained Baseline, yuv420p, 1920×1080 — the R8 bulletproof encode is confirmed in place; Hero.tsx confirmed clean (no blend/opacity/filter/playbackRate)
- Rounds 6–8 staged work committed as safety checkpoint (aa80859) before further changes
- PAINT PROOF (Playwright, stand-in for eyeballs): screenshots 3s apart differ, video state playing/advancing — **the hero video paints. PASS.** Verified again at 1440 and 375 after later edits
- Build script `cp -r` (Mac-only) swapped for cross-platform `node -e fs.cpSync` — `npm run build` was failing on Windows at the copy step
- QA tooling: dependency-free Node static server for out/ on :3010 (`next start` unsupported with output:export) + Playwright sweep scripts; qa-screens/ gitignored

## Round 10 — /menu page + navigation
- data/agency.json menu restructured: signature[8] / seasonal[4] / toppings[8] as {name, description} objects + rotation_note (old flat signature_flavours[] replaced; only custom_flavour_note had consumers). Flavour copy is still PLACEHOLDER pending client menu
- New src/app/menu/page.tsx: dark smoke-poster hero band ("The Menu"), Signature Gelato + Seasonal Rotation (teal "Rotating" pills) + Toppings & Finishes as editorial hairline lists (2-col desktop, 1-col mobile), closing CTA band → /#contact, italic seasonal-rotation note; per-route metadata + OG + canonical
- Navigation: "Menu" link added (desktop + mobile, between Brands and Contact); anchors made route-safe (/#brands, /#contact); logo → "/"
- Footer: Menu added to Navigate column, anchors route-safe
- sitemap.xml: /menu added, lastmods bumped

## Round 11 — Polish passes (3 total)
- Pass 1 findings → fixed:
  - Nav links/hamburger were `text-cream`/`bg-cream` (aliased to near-black since R5) → invisible over the dark hero video. Now scroll-state aware: light (#FBF8F0) over hero, dark (#1A1A1D) once scrolled onto cream bar; hamburger also flips when mobile menu opens
  - Hero subhead + "View packages" CTA were cream over white smoke. ffmpeg signalstats across all 375 frames: that zone's luma NEVER drops below 190/255 → flipped to dark #1A1A1D. H1 got a soft text-shadow (min luma 113 in its band); eyebrow → gold-light + text-shadow
  - Top dark scrim gradient added as sibling div (rgba(14,14,16,0.65)→transparent, top 55%) to ground eyebrow/H1 when smoke drifts behind them — video element itself remains 100% untouched
- Pass 2: re-shot 1440 + 375 — hero now reads premium at every sampled frame; paint proof re-PASSED
- Pass 3: full 6-viewport sweep (/, /menu × 375/768/1440) — zero horizontal overflow, zero new issues
- Audits: brand-remnant grep clean (only dormant @ts-nocheck Testimonials orphan + legit address "suburb" fields); pricing sweep clean (every `$` is a template literal); anchors all resolve; images all have alt; robots/sitemap correct; build clean
- Known headless-only blanks: PhoneShowcase YouTube embed + Google Maps iframe don't render in headless Chromium (no autoplay/cookies) — expected, fine in real browsers

## Status
Two-page site (/ + /menu), light editorial palette with dark cinematic heroes. Hero video paint-failure saga CLOSED: R8 encode verified (Constrained Baseline yuv420p) and machine-verified painting via Playwright frame-diff on the Windows PC. Hero text legibility rebuilt from measured per-frame luma. Production-ready pending client content drops.

## Next
- Jack: eyeball hero motion in his own Chrome (machine-level GPU paths were the original suspect) + /menu on a real phone
- iOS Safari device test on the PhoneShowcase YouTube embed
- Client content: real menu (current flavour copy is placeholder), photography, testimonials, 16 missing brand logos, webhook URL, square favicon
- Client review session

## Rework — de-vibecoding pass (8 Oct 2026, branch `rework`)
- Trigger: Jack said the site looked AI-generated. Screenshot review found the template skeleton (label above every heading, pricing cards + badge, marquee, phone frame, cream/serif/gold, mood copy).
- Rebuilt every section and /menu (see CLAUDE.md "Design System" and decisions D23–D26). Favicons and share image replaced (were Bosland leftovers / the raw logo).
- Checked: build clean, eslint clean, no sideways scroll 320–1920, tap targets 44px+, one h1 and ordered headings, package preselect, empty form blocked, reduced-motion fallback, mobile menu + Escape.
- Not verified here: the YouTube film and the smoke video playing (the cloud workspace cannot reach YouTube or decode H.264). Check both in a real browser.
- Independent design review run before hand-off; its findings were applied except the two that need assets: real photos, and the original film footage for the hero.

## Rework — SEO + speed pass (8 Oct 2026)
- Metadata, structured data, sitemap dates, styled 404, lighter hero video (+720p for phones), lazy YouTube player, smaller wordmark file. See D27–D29.
- Lighthouse (mobile, simulated, local static server): home performance 90, accessibility 100, SEO 100; menu 100 / 100 / 100. The one best-practice miss on home is a console error from YouTube being unreachable in the cloud workspace.
- Not verified here: video playback (workspace browser has no H.264) and that phones pick the 720p file. Check in a real browser.
- Jack is running a Claude Code job on his PC to rescue the event photos from a part-corrupt USB stick into `Desktop/celsius-photos` (outside the repo). Contact sheets come back to the web chat for picking.

## Next
- Jack: review `rework` in the browser, then photos (faces cropped or blurred before commit), then SEO, Google Business Profile, summer offer wording
- Launch blockers unchanged: form endpoint, real menu, hosting + DNS at OnlyDomains, ABN, privacy policy, terms
