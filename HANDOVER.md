# HANDOVER.md — Fable → Opus

_Written 2026-11-10 21:40 UTC; updated 2026-11-11 12:30 UTC with all ten sites complete. This is the
one-way handover. Everything Opus needs is in the filesystem; do not assume any conversation history._

## 0. Opus: start here
1. Read `CLAUDE.md` (rules), `PROJECT_STATUS.md` (where we are), this file, then
   `BUSINESS_PORTFOLIO.md` for the brief of any site you touch.
2. Confirm the toolchain: `pnpm install` at the root, then `pnpm build` (11 apps, 173 pages) and
   `pnpm test` (all smoke tests pass).
3. **All ten sites are complete and reviewed.** The only outstanding action is the push (§9),
   which needs the user to grant GitHub access. After that, any work is customisation for real
   clients (each site's README) or the optional items in `PROJECT_STATUS.md`.
4. Do not restyle any site. Every one must keep looking like a different studio made it — §7 lists
   the motifs each one owns.
5. If you change a home page: `pnpm --filter <slug> build`, `pnpm --filter <slug> test`, run its
   flow script (`packages/core/scripts/flows/<slug>.mjs`), `pnpm --filter portfolio shots`,
   update `PROJECT_STATUS.md`, commit.

## 1. Project overview
Ten fictional UK small-business websites, each a standalone Astro static site in a pnpm monorepo,
sharing only design-neutral code (`packages/core` = `@site/core`). Purpose: commercially reusable
website products. Seven are complete and verified; the eighth is scaffolded; two are not started.

## 2. Exact current state

### Complete (build ✓ · `astro check` 0 errors · smoke ✓ mobile+desktop · browser flow ✓ · README ✓)
All ten: `kingpin-barbers`, `hollowell-gardens`, `cinder-and-salt`, `muddy-paws`,
`bramley-electrical`, `nell-ashworth`, `northgate-garage`, `forge-fitness`, `lumen-skin`,
`bright-spark`, plus `portfolio` (index page, 10 of 10 built, thumbnails current).

### Latest additions (11 Nov)
- `lumen-skin` (4307, 18 pages): Outfit/DM Sans; lilac/plum/tangerine single "light" gradient;
  circular treatment carousel (scroll-snap with matching `scroll-padding` so the first orb isn't
  clipped); `TreatmentBooking.tsx` (treatment → date & time → details, `?treatment=` preset,
  ref `LU-xxxx`); consultation form with concern chips; voucher form; results stories (one
  before/after pair reused with per-story mirror/crop — see README). Ten Figma photos.
- `bright-spark` (4310, 22 pages): Plus Jakarta Sans/Caveat; paper/ink/highlighter; grid-paper
  sections, ruled `sheet` with red margin (`leading-8` keeps text on the lines), `hl` highlighter
  swipes drawn in by an IntersectionObserver in `Base.astro`, sticky notes, `Note.astro` margin
  annotations; `CallBooking.tsx` (student → when (20-min slots) → details, `?subject=&year=`
  presets, ref `BS-xxxx`); enquiry form with year group + subject chips; safeguarding template
  flagged for review. Eight Figma photos. Lesson: on dark backgrounds use a filled
  `bg-hi text-ink` box, not the swipe (ink text on ink before the animation).
- `packages/core/scripts/flows/<slug>.mjs` — all ten browser flow scripts saved in the repo.
- `smoke.mjs` ignores `net::ERR_ABORTED` (srcset candidate aborted on navigation).

## 3. How to build a site (the working recipe — ~1 session each)
1. Scaffold: `mkdir -p apps/<slug>/{public,src/{styles,layouts,components,pages,assets/photos}}`;
   copy `package.json`, `tsconfig.json`, `astro.config.mjs`, `public/robots.txt` from
   `apps/northgate-garage`, then change name, port, site URL and `@fontsource` packages; keep
   `@astrojs/preact`/`preact` only if the site has an island. `pnpm install` at root.
2. `src/site.config.ts` from the brief: realistic services, prices, hours, testimonials (4–5),
   FAQs (6–8), legal, credentials (`fictional: true`). Content is specific, local, en-GB. Extra
   structured content (timetables, menus, case studies) → `src/content.ts` or extra exports.
3. `src/styles/theme.css`: `@theme` tokens (3 brand colours + supporting), font imports, type-
   scale utilities, button language, dividers, form fields, motion keyframes. Nothing visual from
   another site should survive.
4. Imagery (§5): 8–13 images into `src/assets/photos/` (JPEG q82, long edge ≤1600), register in
   `src/images.ts`. OG: `node ../../packages/core/scripts/make-og.mjs <photo> public/og.jpg '<svg…>' <darken>`.
   Hand-make `public/favicon.svg`.
5. Layouts: `Base.astro` (Head, DemoBanner, Header, Footer, optional mobile CTA bar, script with
   `initReveal` + `initMobileNav`), `Legal.astro` (template-notice box).
   **Mobile nav rule**: header `relative`; panel `absolute inset-x-0 top-full h-[calc(100dvh-100%)]`
   (never `fixed`; never `backdrop-blur` on the header).
6. Pages per the brief. Every page: unique title + description via `Base` props; one `<h1>`;
   FAQ pages pass `schema={[faqSchema(...)]}`; service pages `serviceSchema` + `breadcrumbSchema`.
   Hero image `loading="eager" fetchpriority="high"`; all `<Image>` get `widths` + `sizes`;
   absolutely-positioned images need a sized parent (`relative w-full aspect-… `). Astro drops
   `alt=""` — give decorative images a short real alt. Avoid block-bodied `.map((x) => { … return
   <jsx/> })` inside Astro templates (the type checker mis-parses them); precompute in frontmatter.
7. Functionality: reuse `@site/core` (`buildMonth` with `minNoticeHours`+`now`, `buildSlots`,
   `demoBusyPeriods`, `groupSlots`, `demoReference`, `validate`, `submitForm`, `enhanceForm`,
   `postcodeInArea`). Preact island only for a stateful wizard; **apply URL presets in a
   `useEffect`, never in `useState` initialisers** (Preact skips prop patching during hydration).
   Honeypot `_gotcha` on every form.
8. Verify: `pnpm --filter <slug> build && pnpm --filter <slug> check`, then
   `node packages/core/scripts/smoke.mjs apps/<slug>/dist --screens <dir>`. Write a flow script
   (template §6) and run it. Read screenshots as a design director and fix weaknesses.
9. README (copy structure from `apps/northgate-garage/README.md`), STATUS, HANDOVER, portfolio
   manifest, `pnpm --filter portfolio shots`, commit.

## 4. Technical decisions (and why)
- **Astro 5.18** (not 6/7): known-good Tailwind v4 Vite plugin; static output; stable docs.
- **Tailwind v4 `@theme`** per site; components use tokens only.
- **Preact islands only for wizards** (~10 kB); everything else zero-JS HTML.
- **`build.format: 'file'`, no trailing slash** → clean URLs on any static host.
- **@fontsource self-hosted fonts**; variable fonts where available.
- **Deterministic demo availability** (seeded PRNG per date/resource): testable, labelled.
- **`defineSite()` returns `SiteConfig`** so optional fields type-check in components.
- **Playwright** pre-installed at `/opt/node-tools/node_modules/playwright`; `smoke.mjs` and
  `portfolio-shots.mjs` fall back to it. Do not add playwright to any package.json.
- **`html.js` gate** on `[data-reveal]`; smoke test scrolls pages (instant) before screenshots.
- **SVG illustrations as strings** (`muddy-paws/src/dogs.ts`) so Astro and Preact share them.

## 5. Imagery pipelines
**Primary — Figma `generate_image`** (best quality, full-res URL, ~15 s/image):
load tools via ToolSearch `select:mcp__Figma__generate_image,mcp__Figma__create_session`; file key
`wPUbZyQa74dc1N20CiXFAy` (team `team::903578201153601498`); call `create_session` with that key
first; model `gpt-image-2.5-flare`; sizes 1024×1280 / 1536×1024 / 1024×1024. Each result has
`image.url` (PNG, expires in 7 days) — download at once with curl, convert to JPEG q82 with sharp
(`require('/home/user/Websites/node_modules/.pnpm/node_modules/sharp')`), delete PNGs.
Credits reset daily at 00:00 UTC (confirmed 11 Nov: 18 images generated in one morning).

**Fallback — Canva create-design → export** (slower, ~60 s/image, 2688×3840 or 1123×794):
`mcp__Canva__create-design` with brief "A single full-bleed photograph filling the whole page, no
text, no overlays, no borders: <photo description>" and `format` "Poster (Portrait)" /
"Flyer (Landscape A4)" / "Instagram Post (Square)"; poll `get-create-design-async-job` with the
job_id + latest continuation_token; then `export-design` `{type:'jpg', quality:90}`; download the
URL(s). Landscape flyers came back as 2 pages with page 1 blank — use the second URL. Canva
generates its own photo from the brief (it does not use `generate-image` media). Quota reset
time unknown.

Prompt style that works: "Documentary photograph … [UK place] … [lighting] … [brand grading] …
no readable text or logos"; ask for specific, diverse, realistic people. Keep grading consistent
within a site. Budget 8–13 images per site. Each site's `/credits` page states images are
AI-generated and must be replaced by the client.

## 6. Flow-test template
Each dev flow script serves `dist/` on a random port and drives Chromium; `smoke.mjs` contains
the static-server snippet. Pattern: goto `/book?…` → click options → first
`[role=gridcell]:not([disabled])` → first `button[aria-pressed]:not([disabled])` → submit empty →
count `.text-error` → fill → submit → `waitForSelector(confirmation text)`; plus mobile nav
(`[data-nav-toggle]` → `aria-expanded`) and the contact form via `[data-form-status]`.
Use `button:has-text("…")` rather than `text=…` (the latter matches labels too).
All ten scripts live in `packages/core/scripts/flows/<slug>.mjs` (see the README there).

## 7. Design decisions already made (do not reuse motifs across sites)
- Kingpin: Anton/Space Grotesk/JetBrains Mono; jet/chalk/chartreuse; hazard stripes; marquee;
  trading cards; mobile bottom booking bar; poster numbering.
- Hollowell: Fraunces/Figtree; linen/moss/terracotta; hairlines; draw-on-scroll botanicals;
  12-col editorial grid with offsets; giant serif numerals; before/after slider; pill buttons.
- Cinder & Salt: Bricolage/Work Sans/Caveat; charcoal/kraft/flame; torn edges; kraft texture;
  chalkboard; stamps; 3D-push buttons; rotated cards; vertical sticky quote tab.
- Muddy Paws: Fredoka/Nunito; mustard/teal/coral/cocoa; blob photo masks; outlined stickers with
  hard shadows; wave dividers; speech bubbles; SVG dog mascots; capsule nav.
- Bramley: Barlow Condensed/Barlow; concrete/graphite/safety yellow (+ red for emergency only);
  grid-paper sections; label-maker tags pinned to photos; dashed boxes; tick lists; hard-shadow buttons.
- Nell Ashworth: Instrument Serif/Sans; paper/ink/vermilion full stop; type-on-image overlap hero;
  film-frame numbering; asymmetric 12-col galleries; hover image-reveal text nav; cursor "View" label.
- Northgate: IBM Plex Condensed/Sans/Mono; white/navy/signal red + plate yellow; job-card panels
  with 4px top border; status chips; UK reg-plate input; grid-lines background; checklist ticks.
- Forge: Archivo Black/Archivo; bone/cobalt/volt; diagonal clip-path cuts; cobalt duotone
  photos; stripes; hard-shadow index cards; skew-on-hover buttons; count-ups.
- Lumen: Outfit/DM Sans; lilac/plum/tangerine single light gradient (drifts); full-round pills;
  circular treatment carousel; before/after results cards; concern chips; tilt-on-hover panels.
- Bright Spark: Plus Jakarta Sans/Caveat; paper/ink blue/highlighter yellow; exercise-book grid;
  ruled A4 sheets with red margin; highlighter swipes that draw in; handwritten margin
  annotations with arrows; sticky notes with tape; polaroid-style photo prints; red tick marks.
- Portfolio: Instrument Serif/Sans; paper/ink/electric blue — intentionally unlike all ten.

## 8. Final side-by-side review checklist
**Done 11 Nov 2026** (contact sheets of all ten home pages at desktop and mobile; every item below
checked). Re-run after any visual change.
`pnpm build && pnpm --filter portfolio shots && pnpm --filter portfolio build`; open the
portfolio. For all ten: different primary typeface, hero composition, section order, shape
language, motion; suits its industry; no placeholder text; smoke passes; README present; demo
labels visible; mobile nav works; accent-on-background contrast checked; every booking/enquiry
flow driven end to end.

## 9. Push & hosting
Pushed 11 Nov after the Claude GitHub App was installed. All eleven apps are live on Vercel
(team Digbyc, one project per app; URLs and the redeploy recipe are in the root README). The
Vercel token is a network secret on the "Websites" cloud environment, injected by the proxy for
`api.vercel.com`; pass any hyphen-free placeholder to `--token`.
