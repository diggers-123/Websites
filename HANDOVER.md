# HANDOVER.md — Fable → Opus

_Written 2026-11-10 21:40 UTC at the end of the Fable session. This is the one-way handover.
Everything Opus needs is in the filesystem; do not assume any conversation history._

## 0. Opus: start here
1. Read `CLAUDE.md` (rules), `PROJECT_STATUS.md` (where we are), this file, then
   `BUSINESS_PORTFOLIO.md` briefs #8 (Forge), #7 (Lumen), #10 (Bright Spark).
2. Confirm the toolchain: `pnpm install` at the root, then `pnpm build` (all 9 apps should build)
   and `pnpm --filter kingpin-barbers test`.
3. Finish **Forge** first (§2 has the exact state). Then Lumen and Bright Spark, each following
   the recipe in §3. Generate imagery with the Figma pipeline (§5) once credits reset.
4. Do not rebuild or restyle sites 1–7. Use them as *engineering* references only. Every remaining
   site must look like a different studio made it — the briefs specify type, palette, hero,
   section order, shape language and motion.
5. After each site: README, `PROJECT_STATUS.md`, this file, `apps/portfolio/src/projects.ts`
   (`status: 'built'`, `pages`), `pnpm --filter portfolio shots`, commit.
6. Finish with the side-by-side review (§8), root README polish, and push (§9).

## 1. Project overview
Ten fictional UK small-business websites, each a standalone Astro static site in a pnpm monorepo,
sharing only design-neutral code (`packages/core` = `@site/core`). Purpose: commercially reusable
website products. Seven are complete and verified; the eighth is scaffolded; two are not started.

## 2. Exact current state

### Complete (build ✓ · `astro check` 0 errors · smoke ✓ mobile+desktop · browser flow ✓ · README ✓)
`kingpin-barbers`, `hollowell-gardens`, `cinder-and-salt`, `muddy-paws`, `bramley-electrical`,
`nell-ashworth`, `northgate-garage`, plus `portfolio` (index page).

### `apps/forge-fitness` — IN PROGRESS (builds with 0 pages)
Written and correct:
- `package.json` (port 4308, fonts `@fontsource/archivo-black`, `@fontsource-variable/archivo`),
  `tsconfig.json`, `astro.config.mjs` (site URL `https://forgept.example.co.uk`), `public/robots.txt`.
- `src/site.config.ts` — full content: services (free consult, 1:1, 10/20 blocks, small group,
  unlimited, online), team, testimonials, FAQs, booking (30-min slots, 21-day horizon, 3h notice),
  SEO (`HealthClub`), legal, credentials; plus exports `timetable` (Mon–Sat small-group sessions)
  and `results` (four stats for count-ups).
- `src/styles/theme.css` — tokens bone/cobalt/volt/coal, Archivo Black + Archivo, utilities
  `display-xl/lg/md/sm`, `stat`, `kicker`, diagonal cuts `cut-tl/cut-br/cut-both`, `stripes`,
  cobalt `.duo` duotone, skew-on-hover `btn-volt/cobalt/coal/outline`, `card`/`card-volt`
  (hard cobalt/volt shadow index cards), form `.field/.label/.choice`.
- `src/images.ts` — keys `hero, coach, group, hands, client` → all five JPEGs exist in
  `src/assets/photos/` (hero via Figma; others via Canva; reviewed, all good).
- `src/layouts/Base.astro` — Head, DemoBanner, Header, Footer (not yet written!), mobile sticky
  CTA, reveal/nav init, and a `[data-count]` count-up script (`data-count="600" data-suffix="+"`).
- `src/components/Logo.astro` (FORGE with weight-plate O), `src/components/Header.astro`
  (nav shows at `xl`, cobalt mobile panel).
Missing (Base.astro imports Footer, so the build will fail as soon as a page exists):
- `src/components/Footer.astro` (coal background, volt kicker labels, hours, nav, credentials).
- `src/components/booking/ConsultBooking.tsx` — Preact island: date (buildMonth with
  `minNoticeHours`/`now`) → 30-min slot (buildSlots, demoBusyPeriods density ~0.3) → studio or
  video call choice → details (name, mobile, email, goal radio: strength / fat loss / return from
  injury / sport / not sure) → demo confirmation with `demoReference('FG', …)`. Copy the hydration
  pattern from `northgate-garage/src/components/booking/GarageBooking.tsx` (URL presets in a
  `useEffect`). Accept `?type=studio|call`.
- Pages per brief #8: `index` (diagonal split hero: bone top-left with headline "STRONGER IN 12
  WEEKS. NO NONSENSE." and volt CTA; cobalt `.duo` hero photo bottom-right using `cut-tl`), "Who I
  train" (3 audience cards), programmes with prices (index cards), timetable grid (from
  `timetable`), results stats with count-ups (from `results`), testimonials, consult CTA;
  `personal-training`, `small-group`, `online`, `pricing`, `timetable` (full grid + "join a
  session" enquiry form via `enhanceForm`), `results`, `about`, `book`, `contact`, `privacy`,
  `terms`, `credits`, `404`.
- `public/favicon.svg`, `public/og.jpg` (make-og.mjs from `hero.jpg`), `README.md`.
- Keep the mobile nav rule (header `relative`, panel `absolute top-full h-[calc(100dvh-100%)]`).

### `apps/lumen-skin` and `apps/bright-spark` — NOT STARTED
Scaffold from `apps/northgate-garage` (it has the latest conventions). Ports 4307 and 4310.
Fonts: Lumen → `@fontsource-variable/outfit` + `@fontsource-variable/dm-sans`;
Bright Spark → `@fontsource-variable/plus-jakarta-sans` + `@fontsource/caveat` (all verified on npm).
Imagery prompts to generate (§5): Lumen — skin close-ups in lilac/warm light, treatment room,
LED mask, facialist portrait (diverse), product textures, Brighton Lanes exterior, before/after
pairs (same person, subtle), hands with serum. Bright Spark — tutor portrait at a desk, teen
student at laptop with equations on screen (abstract), exercise books + highlighters flat-lay,
online lesson on screen, parent + child at kitchen table, Cambridge street exterior, whiteboard
with maths (abstract), stack of past papers.

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
**Credits were exhausted at 21:30 UTC 10 Nov; the error says they reset at 2026-11-11T00:00:00Z.**

**Fallback — Canva create-design → export** (slower, ~60 s/image, 2688×3840 or 1123×794):
`mcp__Canva__create-design` with brief "A single full-bleed photograph filling the whole page, no
text, no overlays, no borders: <photo description>" and `format` "Poster (Portrait)" /
"Flyer (Landscape A4)" / "Instagram Post (Square)"; poll `get-create-design-async-job` with the
job_id + latest continuation_token; then `export-design` `{type:'jpg', quality:90}`; download the
URL(s). Landscape flyers came back as 2 pages with page 1 blank — use the second URL. Canva
generates its own photo from the brief (it does not use `generate-image` media). Quota also
exhausted at 21:35 UTC; reset time unknown.

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
The seven scripts used live only in the session scratchpad; consider saving new ones under
`packages/core/scripts/flows/<slug>.mjs`.

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
- Forge (planned, tokens written): Archivo Black/Archivo; bone/cobalt/volt; diagonal clip-path
  cuts; cobalt duotone photos; stripes; hard-shadow index cards; skew-on-hover buttons; count-ups.
- Lumen (planned): Outfit/DM Sans; lilac/plum/tangerine single light gradient; full-round pills;
  circular treatment carousel; results cards.
- Bright Spark (planned): Plus Jakarta Sans/Caveat; paper/ink blue/highlighter yellow; exercise-
  book grid; highlighter swipes; margin annotations; sticky-note tabs.
- Portfolio: Instrument Serif/Sans; paper/ink/electric blue — intentionally unlike all ten.

## 8. Final side-by-side review checklist
`pnpm build && pnpm --filter portfolio shots && pnpm --filter portfolio build`; open the
portfolio. For all ten: different primary typeface, hero composition, section order, shape
language, motion; suits its industry; no placeholder text; smoke passes; README present; demo
labels visible; mobile nav works; accent-on-background contrast checked; every booking/enquiry
flow driven end to end.

## 9. Push
`git push -u origin claude/uk-small-business-websites-my7lc2` returns 403 until the Claude GitHub
App is installed on `diggers-123/Websites` (https://github.com/apps/claude/installations/select_target)
or GitHub is reconnected. Retry with exponential backoff only for network errors, not for 403.
