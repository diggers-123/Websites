# DESIGN_SYSTEM.md — technical foundations & shared principles

"Design system" here means the **shared engineering foundation**, not a shared look. Visual
identity is per site and lives in that site's `theme.css` + components.

## Repository layout
```
apps/
  <slug>/                      one Astro site per business (see BUSINESS_PORTFOLIO.md for slugs)
    astro.config.mjs           site URL, integrations (preact, sitemap), tailwind vite plugin
    src/site.config.ts         ALL business content — the file a client edit touches
    src/styles/theme.css       @theme tokens (colours, fonts, radius), site utilities, keyframes
    src/images.ts              image registry: key → import (config refers to keys)
    src/assets/photos/*.jpg    photography (generated; replace per client)
    src/layouts/Base.astro     html shell: Head, DemoBanner, Header, Footer, scripts
    src/layouts/Legal.astro    legal-page wrapper with "template notice"
    src/components/            site-specific components (Header, Footer, hero pieces…)
    src/components/booking/    Preact wizard(s) if the site has one
    src/pages/*.astro          routes
    public/                    favicon.svg, robots.txt, og.jpg
    README.md                  customisation + deployment guide
  portfolio/                   studio index page linking all ten sites
packages/core/                 @site/core (design-neutral)
  src/config.ts                SiteConfig types, hours() helper, defineSite()
  src/booking/engine.ts        calendar grid, slot generation, demo availability, references
  src/forms/index.ts           validate(), submitForm(), enhanceForm() progressive enhancement
  src/seo/index.ts             titles, canonical, LocalBusiness/Service/FAQ/Breadcrumb schema, hours
  src/components/Head.astro    shared <head>
  src/components/DemoBanner.astro
  src/components/reveal.ts     initReveal() (IntersectionObserver), initMobileNav()
  src/styles/base.css          resets, focus ring, skip link, reduced motion, form-state hooks
  scripts/smoke.mjs            build verification (links, meta, h1, alt, console errors, overflow, screenshots)
  scripts/make-og.mjs          OG image generator (photo + SVG overlay)
  scripts/fetch-images.mjs     Openverse fallback fetcher (rarely useful)
```

## Config-driven content
`SiteConfig` (packages/core/src/config.ts) covers: identity, contact, address (+ optional map
embed), service areas & postcode prefixes, opening hours, social, nav, CTAs, services (with
price/duration/bookable), team (with per-member hours), testimonials, FAQs, forms provider,
booking provider, SEO (siteUrl, schemaType, OG image), legal entity, credentials.

Rule: a component may *shape* content (layout, emphasis) but never *own* it. If you find
yourself typing a phone number or price in a component, move it to config.

## Theming contract (Tailwind v4)
Each `theme.css`:
```css
@import 'tailwindcss';
@import '@site/core/styles/base.css';
@import '@fontsource/...';
@theme {
  --color-<name>: …;      /* exposes bg-<name>, text-<name>, border-<name> */
  --font-display: …; --font-sans: …; --font-mono: …;
  --color-focus: …;       /* used by base.css focus ring + skip link */
  --color-error: …;
}
@utility display-xl { … } /* site-specific type scale utilities */
@utility btn { … }        /* site-specific button language */
```
Changing a brand = editing `@theme` values + swapping `@fontsource` imports.

## Booking architecture
- `engine.ts` is pure: `buildMonth()` → `DayCell[]`, `buildSlots()` → `Slot[]` from hours +
  duration + busy periods + min-notice; `demoBusyPeriods()` seeded per date/resource so demo
  availability is stable and testable; `groupSlots()` → Morning/Afternoon/Evening.
- Wizards are Preact islands taking `services`, `team`, `hours`, `booking` as props from config.
- `provider: 'demo'` → labelled demo, no network. `'custom'` → `GET {endpoint}/availability`,
  `POST {endpoint}/book`. `'calcom'`/`'calendly'` → the Book page renders their inline embed
  instead of the wizard.
- Quote calculators (catering, grooming) follow the same island pattern but submit via `submitForm`.

## Forms architecture
Plain HTML forms (work without JS for Netlify). `enhanceForm()` adds inline validation (UK phone,
postcode, email rules), `aria-invalid`, focus management, honeypot, and provider submission with
honest status messages (`demo` state says nothing was sent).

## SEO baseline (every site)
Unique `<title>` via `titleTemplate`, meta description per page, canonical, OG/Twitter, `en_GB`,
sitemap (`@astrojs/sitemap`), robots.txt, LocalBusiness JSON-LD on home (with hours, geo,
areaServed, sameAs), FAQPage schema on FAQ pages, Service schema available via `serviceSchema()`.
Local phrases used naturally in H1/H2/intro copy (e.g. "barbers in Leeds city centre").

## Accessibility baseline
Skip link, `:focus-visible` ring using the site accent, semantic landmarks, one `<h1>` per page,
labelled form controls with `aria-describedby` errors, disclosure nav with `aria-expanded` and
Escape handling, 44px targets, reduced-motion kill-switch, marquee duplicates `aria-hidden`,
calendar as `role=grid` with full-date `aria-label`s, colour contrast checked per palette
(accent-on-dark text used only at large sizes or with sufficient contrast).

## Performance baseline
Static HTML, ~10–25 kB JS on pages with an island, zero JS on most pages, self-hosted fonts
(variable where available, subset by fontsource), responsive `<Image>` with explicit sizes, hero
eager + `fetchpriority=high`, everything else lazy, no third-party scripts unless a provider
embed is enabled.

## Testing
`smoke.mjs` runs on every build. Per-site browser flow scripts live in the site README's
"Testing" section (and `/tmp` during development — copy useful ones into `packages/core/scripts`).
