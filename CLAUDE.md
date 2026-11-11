# CLAUDE.md — permanent project instructions

Portfolio of **ten individually designed UK small-business websites**, built to be customised and
sold to real businesses. Fictional businesses now; commercial products later.

Read in this order when starting a session: `CLAUDE.md` → `PROJECT_STATUS.md` → `HANDOVER.md` →
`BUSINESS_PORTFOLIO.md` (brief for the site you're working on) → `DESIGN_SYSTEM.md`.

## Objectives (in priority order)
1. **Design quality.** Each site must look individually commissioned. No shared visual template.
2. **Working functionality.** Booking/quote/enquiry flows that actually work (demo mode clearly
   labelled; real providers one config change away). Never fake a confirmed booking silently.
3. **Sellability.** All business content in `src/site.config.ts`; theme in `src/styles/theme.css`;
   images in `src/assets/photos` + `src/images.ts`. A README per site explains customisation.
4. **Performance, SEO, accessibility.** CWV targets, unique titles/descriptions, schema, WCAG 2.2 AA.

## Design rules (non-negotiable)
- Every site has its own typeface pairing, palette, hero composition, section order, shape
  language and motion signature. Check the distinctiveness table in `BUSINESS_PORTFOLIO.md`.
- 60/30/10 colour as a starting point; the accent must *pop*. No beige-luxury defaults, no
  purple-blue gradients, no Inter, no three-identical-cards rows, no decorative blobs.
- Typography does the heavy lifting: oversized headings, deliberate scale contrast.
- Motion is purposeful and respects `prefers-reduced-motion` (handled in `base.css`).
- Mobile is designed, not shrunk: check nav, hero crops, forms, wizard steps, tap targets (44px).
- Content must be specific and believable, written for a UK audience (en-GB spelling, £, UK
  phone formats, postcodes, local area names). Never generic "we are passionate about…" copy.
- All fictional data is labelled: `site.isFictional = true` shows the demo banner; fictional
  credentials carry `fictional: true`; reviews sections say "fictional reviews for demonstration".

## Stack & conventions
- pnpm workspace. `apps/<slug>` = one Astro 5 static site. `packages/core` = `@site/core`
  (design-neutral: config types, booking engine, forms, SEO helpers, base CSS, smoke test).
- Tailwind v4 via `@tailwindcss/vite`; tokens live in each site's `theme.css` under `@theme`.
  Components reference tokens (`bg-volt`, `font-display`), never raw hex.
- Fonts self-hosted via `@fontsource` packages, imported in `theme.css`.
- Interactivity: plain `<script>` in Astro for simple things; **Preact islands only for
  stateful wizards** (`client:load`). Keep JS small.
- Images: `astro:assets` `<Image>` with `widths` + `sizes`; hero images `loading="eager"
  fetchpriority="high"`; everything else lazy. Register images in `src/images.ts`.
- Booking: `site.booking.provider` ∈ `demo | calcom | calendly | custom`. Forms:
  `site.forms.provider` ∈ `demo | netlify | formspree | custom`.
- Pages use `Base.astro` which wires `Head.astro` (title, description, canonical, OG, JSON-LD).
  Home page gets LocalBusiness schema automatically; FAQ pages pass `faqSchema`.
- URL style: `trailingSlash: 'never'`, `build.format: 'file'` → `/services`, `/book`.
- TypeScript strict. `defineSite()` validates config shape.

## Commands
```bash
pnpm install                                   # root
pnpm --filter <slug> dev                       # e.g. pnpm --filter kingpin-barbers dev
pnpm --filter <slug> build && pnpm --filter <slug> check
pnpm --filter <slug> test                      # smoke test on dist (links, meta, console errors, overflow)
node packages/core/scripts/smoke.mjs apps/<slug>/dist --screens <dir>   # + screenshots
pnpm build                                     # all sites
```
Playwright is pre-installed globally at `/opt/node-tools/node_modules/playwright` (used by smoke.mjs).

## Quality gate per site (all must pass before "complete")
1. `build` + `check` clean. 2. `smoke.mjs` passes at mobile + desktop. 3. Booking/enquiry flow
driven end-to-end in a browser script (`packages/core/scripts/flows/<slug>.mjs`). 4. Screenshots reviewed as a design director; weaknesses
fixed, not just noted. 5. README written. 6. `PROJECT_STATUS.md` + `HANDOVER.md` updated. 7. Commit.

## Imagery
Primary source: original AI-generated photography via the Figma MCP `generate_image` tool
(file `wPUbZyQa74dc1N20CiXFAy`, session created per task). Download the full-res URL with curl
immediately (expires in 7 days), convert to JPEG q82 with sharp into `src/assets/photos`.
Prompt for documentary realism, UK settings, no readable text/logos, brand-appropriate grading.
Each site's `/credits` page states images are generated and must be replaced with client photos.
Fallback when Figma credits are exhausted: Canva `create-design` (brief: "A single full-bleed
photograph filling the whole page, no text…") → poll → `export-design` jpg → download; see
HANDOVER §5. Last resort: `packages/core/scripts/fetch-images.mjs` (Openverse) — quality is poor; avoid.
Wizard islands: apply URL presets in `useEffect`, never in `useState` initialisers (hydration).

## Git
Commit after every meaningful milestone with descriptive messages. Branch:
`claude/uk-small-business-websites-my7lc2`. Push with `git push -u origin <branch>`.
