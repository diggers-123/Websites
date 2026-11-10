# HANDOVER.md — Fable → Opus

_Last updated: 2026-11-10. Keep this current after every milestone._

## 0. If you are Opus reading this
1. Read `CLAUDE.md` (rules), then `PROJECT_STATUS.md` (where we are), then this file.
2. `pnpm install` at the root, then `pnpm --filter kingpin-barbers build && pnpm --filter kingpin-barbers test`
   to confirm the toolchain works in your container.
3. Open `BUSINESS_PORTFOLIO.md` and build the next site in the priority order in
   `PROJECT_STATUS.md`. Use Kingpin as the *engineering* reference (structure, config, testing),
   **never** as a visual reference — each site must look like a different studio made it.
4. Do not rebuild Kingpin. Improve it only if a concrete defect is found.
5. Update `PROJECT_STATUS.md` and this file after each site. Commit after each site.

## 1. Project overview
Ten fictional UK small-business websites, each a standalone Astro static site in a pnpm
monorepo, sharing only design-neutral code (`@site/core`). Purpose: commercially reusable
website products. Full brief is in the original prompt; the distilled rules are in `CLAUDE.md`.

## 2. Exact current state
- Branch `claude/uk-small-business-websites-my7lc2`, committed, pushed (see git log).
- `packages/core` complete for current needs (see DESIGN_SYSTEM.md for API surface).
- `apps/kingpin-barbers` complete: builds, type-checks, passes smoke test at 390px and 1440px,
  booking/contact/nav flows verified in headless Chromium.
- No other apps exist yet. `apps/portfolio` not started.

## 3. How to build a new site (the working recipe)
1. `mkdir -p apps/<slug>` and copy from Kingpin **only**: `astro.config.mjs` (change URL + port),
   `tsconfig.json`, `package.json` (rename, change port, swap font packages), `public/robots.txt`,
   `src/layouts/Base.astro` + `Legal.astro` (keep structure, restyle), `src/pages/credits.astro`,
   `404.astro`, `privacy.astro`, `terms.astro` (reword per business).
2. Write `src/site.config.ts` from the creative brief: realistic services, prices, hours,
   testimonials, FAQs, legal. Content quality matters as much as design.
3. Write `src/styles/theme.css`: new `@theme` tokens, fonts, type-scale utilities, button
   language, motion keyframes. Nothing from Kingpin's theme should survive except the structure.
4. Generate imagery (section 5), register in `src/images.ts`.
5. Build components + pages per the brief's page list and homepage concept.
6. Functionality: reuse `@site/core` booking engine / forms; write a new island only where the
   brief needs one (quote calculator, size-based estimate, date check).
7. `pnpm --filter <slug> build && check && test`; write a flow script (template in §6); review
   screenshots as a design director; fix; README; status docs; commit.

## 4. Technical decisions (and why)
- **Astro 5.18 (not 6/7)**: known-good Tailwind v4 Vite plugin; stable docs; static output.
- **Tailwind v4 `@theme`** per site: tokens become utilities; one file to retheme.
- **Preact islands only for wizards**: ~10 kB; everything else is zero-JS HTML.
- **`build.format: 'file'`, no trailing slash**: clean URLs on any static host.
- **Self-hosted fonts via @fontsource**: no third-party requests, no CLS from late swaps.
- **Deterministic demo availability** (seeded PRNG): testable, consistent, honest "demo" labels.
- **`defineSite()` returns `SiteConfig`** (not a narrowed literal) so optional fields type-check
  in components.
- **Playwright**: pre-installed at `/opt/node-tools/node_modules/playwright`; `smoke.mjs` falls
  back to that path. Do **not** add playwright to package.json (browser version mismatch).
- **`html.js` class** gates `[data-reveal]` hiding so content is visible if JS fails.
- **Smoke script scrolls each page (instant) before screenshots** so lazy images and reveals fire.

## 5. Imagery pipeline (important)
- Tool: Figma MCP `mcp__Figma__generate_image` (load via ToolSearch `select:mcp__Figma__generate_image`).
  File key `wPUbZyQa74dc1N20CiXFAy` (team `team::903578201153601498`). Create a session first:
  `mcp__Figma__create_session` with that file key. Model default `gpt-image-2.5-flare` gives
  excellent photographic realism. Sizes: 1024×1280 portrait, 1536×1024 landscape, 1024×1024.
- Each call returns `image.url` (full-res PNG, expires in 7 days). Download immediately:
  `curl -f -sS -L -o name.png "<url>"`, then convert: sharp JPEG quality 82 mozjpeg into
  `src/assets/photos/`. Delete the PNGs.
- Prompt style that works: "Documentary photograph … [UK place] … [lighting] … [brand grading] …
  no visible text or logos". Ask for diverse, realistic people; avoid celebrity likeness.
- Cost: consumes the user's Figma AI credits. Be selective: ~8–14 images per site.
- Canva `generate-image` also works but only exposes thumbnails without a design export step.
- Openverse fetcher exists but results are unusable for commercial subjects.

## 6. Flow-test template (Kingpin booking) — adapt per site
```js
import pw from '/opt/node-tools/node_modules/playwright/index.js'; const { chromium } = pw;
// serve dist/ on a local port (see packages/core/scripts/smoke.mjs for a tiny static server),
// then: goto /book?barber=Marcus → click service → next → click first [role=gridcell]:not([disabled])
// → click first button[aria-pressed]:not([disabled]) → next → submit empty (expect 3 .text-error)
// → fill #bk-name/#bk-phone/#bk-email → submit → expect "That's how it works" + reference.
```
The full script used is in the session scratchpad; recreate it per site under
`packages/core/scripts/flows/<slug>.mjs` (todo).

## 7. Design decisions already made
See `BUSINESS_PORTFOLIO.md` for all ten briefs. Kingpin executed per brief: Anton + Space
Grotesk + JetBrains Mono; jet/chalk/chartreuse; hazard-stripe dividers; marquee; trading-card
barbers; mobile bottom booking bar; poster-style numbered sections. Do not reuse these motifs
elsewhere.

## 8. Known issues / caveats
- Figma asset URLs expire in 7 days — always download immediately.
- `astro check` warns about nothing currently; keep it at 0 errors.
- The demo banner adds ~30px at the top; screenshots include it. Set `isFictional:false` to hide.

## 9. Next actions (ordered)
1. `apps/hollowell-gardens` per brief #2.
2. `apps/cinder-and-salt` per brief #6.
3. `apps/muddy-paws` per brief #4.
4. `apps/portfolio` index (studio-quality; links to each site's dev/preview URL; include
   screenshots generated by smoke.mjs `--screens`).
5. Remaining sites: bramley-electrical, nell-ashworth, lumen-skin, forge-fitness,
   northgate-garage, bright-spark.
6. Side-by-side review; root README; final push.
