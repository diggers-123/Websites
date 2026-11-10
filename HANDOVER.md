# HANDOVER.md — Fable → Opus

_Last updated: 2026-11-10 after sites 1–4 and the portfolio index. Keep current after every milestone._

## 0. If you are Opus reading this
1. Read `CLAUDE.md` (rules), `PROJECT_STATUS.md` (where we are), then this file, then the brief
   for the next site in `BUSINESS_PORTFOLIO.md`.
2. `pnpm install` at the root, then `pnpm build` (builds all apps) and
   `pnpm --filter kingpin-barbers test` to confirm the toolchain works in your container.
3. Build the next site in the priority order in `PROJECT_STATUS.md`, following the recipe in §3.
   Use the four built sites as *engineering* references (structure, config, testing) — never as
   visual references. Each remaining site must look like a different studio made it; its
   typefaces, palette, hero, section order, shape language and motion are specified in its brief.
4. Do not rebuild the four finished sites. Improve one only if you find a concrete defect.
5. After each site: README, `PROJECT_STATUS.md`, this file, `apps/portfolio/src/projects.ts`
   (flip `status` to `'built'`, set `pages`), `pnpm --filter portfolio shots`, commit.
6. Finish with the side-by-side review (§8), root README, and push (see push note in STATUS).

## 1. Project overview
Ten fictional UK small-business websites, each a standalone Astro static site in a pnpm monorepo,
sharing only design-neutral code (`@site/core`). Purpose: commercially reusable website products.
Full brief: the original prompt; distilled rules: `CLAUDE.md`; per-site briefs: `BUSINESS_PORTFOLIO.md`.

## 2. Exact current state
- Branch `claude/uk-small-business-websites-my7lc2`, all work committed locally (push blocked — see STATUS).
- `packages/core`: complete for current needs. API surface documented in `DESIGN_SYSTEM.md`.
- Built and verified: `kingpin-barbers`, `hollowell-gardens`, `cinder-and-salt`, `muddy-paws`,
  `portfolio`. Each has build ✓, `astro check` ✓ (0 errors), smoke test ✓ (mobile + desktop),
  and a browser flow script run during development (summarised in each README's Testing section).
- Not started: bramley-electrical, nell-ashworth, lumen-skin, forge-fitness, northgate-garage, bright-spark.

## 3. How to build a new site (the working recipe — ~1 session each)
1. Scaffold: `mkdir -p apps/<slug>/{public,src/{styles,layouts,components,pages,assets/photos}}`;
   copy `package.json`, `tsconfig.json`, `astro.config.mjs`, `public/robots.txt` from
   `apps/kingpin-barbers`, then change name, port (4305…4310 per STATUS table), site URL and the
   `@fontsource` packages for the brief's typefaces (check availability with `npm view`).
   `pnpm install` at root.
2. `src/site.config.ts` from the brief: realistic services, prices, hours, testimonials (4–5),
   FAQs (6–8), legal, credentials (`fictional: true`). Content quality matters as much as design —
   specific, local, en-GB, no generic marketing copy. Extra structured content (case studies,
   menus, timetables) goes in `src/content.ts`.
3. `src/styles/theme.css`: `@theme` tokens (3 brand colours + supporting), font imports, type-scale
   utilities (`display-xl` etc. — name them to suit the brand), button language, dividers, form
   fields, motion keyframes. Nothing visual from another site should survive.
4. Imagery (§5): 8–13 images. Register in `src/images.ts`. Generate `public/og.jpg` with
   `node ../../packages/core/scripts/make-og.mjs <photo> public/og.jpg '<svg…>' <darken>`.
   `public/favicon.svg` hand-made.
5. Layouts: `Base.astro` (Head, DemoBanner, Header, Footer, mobile CTA bar if the brief wants one,
   `initReveal` + `initMobileNav` script), `Legal.astro` (template-notice box).
   **Mobile nav rule**: header `relative`; panel `absolute inset-x-0 top-full h-[calc(100dvh-100%)]`
   (never `fixed` — and never `backdrop-blur` on the header, it breaks containing blocks).
6. Pages per the brief's list. Every page: unique title + description via `Base` props; one `<h1>`;
   FAQ pages pass `schema={[faqSchema(...)]}`; service detail pages pass `serviceSchema` +
   `breadcrumbSchema`. Hero image `loading="eager" fetchpriority="high"`; all `<Image>` get
   `widths` + `sizes`. Absolutely-positioned images need a sized parent (`relative aspect-… w-full`).
7. Functionality: reuse `@site/core` (`buildMonth`, `buildSlots`, `demoBusyPeriods`, `validate`,
   `submitForm`, `enhanceForm`, `postcodeInArea`). Write a Preact island only for a stateful wizard;
   pass `minNoticeHours` + `now` to `buildMonth`. Honeypot field `_gotcha` on every form.
8. Verify: `pnpm --filter <slug> build && pnpm --filter <slug> check`, then
   `node packages/core/scripts/smoke.mjs apps/<slug>/dist --screens <dir>`. Write a flow script
   (template in §6) and run it. Read the screenshots as a design director and fix what's weak.
9. README (copy structure from `apps/muddy-paws/README.md`), STATUS, HANDOVER, portfolio manifest,
   `pnpm --filter portfolio shots`, commit.

## 4. Technical decisions (and why)
- **Astro 5.18 (not 6/7)**: known-good Tailwind v4 Vite plugin; stable docs; static output.
- **Tailwind v4 `@theme`** per site: tokens become utilities; one file to retheme.
- **Preact islands only for wizards** (~10 kB); everything else zero-JS HTML.
- **`build.format: 'file'`, no trailing slash**: clean URLs on any static host.
- **@fontsource self-hosted fonts**: no third-party requests; variable fonts where available.
- **Deterministic demo availability** (seeded PRNG per date/resource): testable, consistent, labelled.
- **`defineSite()` returns `SiteConfig`** so optional fields type-check in components.
- **Playwright** pre-installed at `/opt/node-tools/node_modules/playwright`; `smoke.mjs` and
  `portfolio-shots.mjs` fall back to that path. Do not add playwright to any package.json.
- **`html.js` gate** on `[data-reveal]` so content shows if JS fails; smoke test scrolls pages
  (instant) before screenshots so lazy images/reveals fire.
- **Astro strips `alt=""`** from `<Image>` output → smoke test flags it; give decorative images a
  short real alt instead.
- **SVG illustrations as strings** (`muddy-paws/src/dogs.ts`) so Astro and Preact share them.

## 5. Imagery pipeline (important)
- Tool: Figma MCP `mcp__Figma__generate_image` (load via ToolSearch
  `select:mcp__Figma__generate_image,mcp__Figma__create_session`). File key
  `wPUbZyQa74dc1N20CiXFAy` (team `team::903578201153601498`). Create a session first with
  `mcp__Figma__create_session` (fileKey + description). Default model `gpt-image-2.5-flare`
  gives excellent photographic realism. Sizes: 1024×1280 portrait, 1536×1024 landscape, 1024×1024.
- Each call returns `image.url` (full-res PNG, expires in 7 days). Download immediately in a bash
  loop: `curl -f -sS -L -o name.png "<url>"`, then convert with sharp
  (`require('/home/user/Websites/node_modules/.pnpm/node_modules/sharp')`, jpeg q82 mozjpeg) into
  `src/assets/photos/`, delete the PNGs. See any previous session command for the exact loop.
- Prompt style that works: "Documentary photograph … [UK place] … [lighting] … [brand grading] …
  no readable text or logos". Ask for specific, diverse, realistic people. Keep brand grading
  consistent within a site (e.g. "high contrast monochrome-leaning" for Kingpin, "bright saturated
  teal/mustard" for Muddy Paws).
- Cost: consumes the user's Figma AI credits. ~8–13 images per site is enough.
- Canva `generate-image` also works but exposes only thumbnails; Openverse fetcher is unusable.

## 6. Flow-test template (adapt per site)
Each dev flow script serves `dist/` on a random port and drives Chromium; see
`packages/core/scripts/smoke.mjs` for the static server. Pattern used for the four sites:
```js
import pw from '/opt/node-tools/node_modules/playwright/index.js'; const { chromium } = pw;
// …serve dist…; page.goto('/book?…'); click options; pick first [role=gridcell]:not([disabled]);
// pick first button[aria-pressed]:not([disabled]); submit empty → count .text-error;
// fill fields → submit → waitForSelector(confirmation text); also mobile nav + contact form.
```
Consider saving future scripts under `packages/core/scripts/flows/<slug>.mjs` (not yet done).

## 7. Design decisions already made (do not reuse motifs across sites)
- Kingpin: Anton/Space Grotesk/JetBrains Mono; jet/chalk/chartreuse; hazard stripes; marquee;
  trading cards; mobile bottom booking bar; poster numbering.
- Hollowell: Fraunces/Figtree; linen/moss/terracotta; hairlines; draw-on-scroll botanicals;
  editorial 12-col grid with offsets; giant serif numerals; before/after range slider; pill buttons.
- Cinder & Salt: Bricolage/Work Sans/Caveat; charcoal/kraft/flame; torn edges; kraft texture;
  chalkboard; stamps; 3D-push buttons; rotated cards; vertical sticky quote tab.
- Muddy Paws: Fredoka/Nunito; mustard/teal/coral/cocoa; blob photo masks; outlined stickers with
  hard shadows; wave dividers; speech bubbles; SVG dog mascots; pill nav in a capsule.
- Portfolio: Instrument Serif/Sans; paper/ink/electric blue — intentionally unlike all ten.

## 8. Final side-by-side review checklist (end of project)
Open `apps/portfolio` after `pnpm build && pnpm --filter portfolio shots`. For all ten: different
primary typeface, hero composition, section order, shape language, motion; suits its industry;
no placeholder text; no broken links (smoke passes); README present; demo labels visible;
mobile nav works; contrast of accent-on-background text checked.

## 9. Next actions (ordered)
1. `apps/bramley-electrical` per brief #3 (imagery prompts: Sheffield terraces/brick, consumer
   units, EV charger on brick, van, electrician portrait, EICR testing, downlights — neutral
   honest documentary look with yellow accents in the scene).
2. `apps/nell-ashworth` per brief #5.
3. `apps/northgate-garage` per brief #9.
4. `apps/forge-fitness`, `apps/lumen-skin`, `apps/bright-spark`.
5. Root README (overview + how to run everything + how to sell/customise), final review, push.
