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

## Status
Pitch site fully composable, single-page, light editorial palette with one dark cinematic hero. Hero video re-encoded with bulletproof H.264 baseline yuv420p profile after multiple paint failures with the original clip + blend-mode chain. Production-ready pending client content drops (menu, photos, testimonials, missing logos, webhook URL) AND in-browser confirmation that the new video paints (R8 is the last attempt before abandoning video).

## Next
- Hard-refresh in browser to confirm new MP4 actually plays (smoke moving, not frozen poster). If still broken, abandon video, fall back to static smoke poster or a different visual treatment
- Decide whether to keep the round 7/8 instruction .txt files in-repo (currently staged) or move them out before commit
- iOS Safari device test on the PhoneShowcase YouTube embed
- Client review session
