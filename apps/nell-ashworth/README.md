# Nell Ashworth Photography — website

Photography-led portfolio with an overlapping type-on-image hero, film-frame-numbered asymmetric
galleries, a hover image-reveal text nav, and a date-availability enquiry that checks against a
list of booked dates. Astro 5 + Tailwind v4; no framework JavaScript. Static output.

> Fictional demonstration business. All photographs are AI-generated placeholders — a real
> photographer's site must use their own work.

## Pages
`/` · `/weddings` · `/families` · `/portfolio` · `/pricing` · `/about` · `/journal` (+ 2 posts) ·
`/check-your-date` · `/contact` · `/privacy` · `/credits` · `404`

## Quick start
```bash
pnpm install
pnpm --filter nell-ashworth dev     # http://localhost:4306
pnpm --filter nell-ashworth build
pnpm --filter nell-ashworth test
```

## Customisation guide
1. **Business details** — `src/site.config.ts` (`site`): name, contact, studio address, areas,
   hours, social, nav, CTAs, services (grouped by `category`: Weddings / Families / Portraits —
   price, includes), testimonials, FAQs, legal, credentials. `isFictional: false` removes the banner.
2. **Availability** — `bookedDates` and `blackoutDates` arrays in `src/site.config.ts` drive the
   demo date check. In production, generate `bookedDates` at build time from a calendar (e.g.
   parse a public iCal feed in `astro.config.mjs` or a small script) or replace the check in
   `src/components/DateCheck.astro` with a fetch to an availability API / Cal.com.
3. **Photographs** — `src/assets/photos/` + `src/images.ts`. Galleries are defined in
   `src/content.ts` → `frames[]` (key, alt, orientation `wide|tall|square`, caption). The
   `weddingFrames`/`familyFrames` subsets feed the section pages; hero crossfade keys are at the
   top of `src/pages/index.astro`. Images are stored greyscale here; colour work is fine too.
4. **Journal** — `src/content.ts` → `posts[]`.
5. **Logo** — a letter-spaced wordmark in `Header.astro` with a vermilion full stop (`.stop`);
   `public/favicon.svg`; OG via `packages/core/scripts/make-og.mjs`.
6. **Colours & fonts** — `src/styles/theme.css` `@theme`: `--color-paper`, `--color-ink`,
   `--color-verm` (the single accent). Fonts Instrument Serif + Instrument Sans. Utilities:
   `serif-xl/lg/md/sm`, `caption`, `frame-no`, `hairline`, text `btn` / `btn-solid` / `btn-verm`.
7. **Enquiry form** — `src/components/DateCheck.astro` (used on `/check-your-date` and `/contact`).
   Delivery via `site.forms.provider`. Accepts `?date=YYYY-MM-DD` and `?type=` presets.
8. **SEO** — `site.seo` + `SITE_URL` in `astro.config.mjs`; `schemaType: 'ProfessionalService'`
   (consider `Photographer` if you prefer); journal posts emit `BlogPosting`.
9. **Legal** — `privacy.astro` template with a review notice; it covers photograph consent.

## Deployment
Static. Build `pnpm --filter nell-ashworth build`; publish `apps/nell-ashworth/dist`.

## Testing
`check` + `test`. Development flow verified: date check (booked / free weekday / blackout /
free weekend), validation (3 errors), demo submission, hover image-reveal nav, mobile nav.
