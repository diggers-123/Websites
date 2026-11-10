# Cinder & Salt — website

Event-catering website with a live quote calculator (Preact island), event-type pages, menu board,
transparent pricing and a contact form. Astro 5 + Tailwind v4. Static output.

> Fictional demonstration business. Replace all details before launch.

## Pages
`/` · `/events` (+ `/events/<slug>` × 4) · `/menu` · `/pricing` · `/gallery` · `/about` · `/faq` ·
`/quote` (calculator) · `/contact` · `/privacy` · `/terms` · `/credits` · `404`

## Quick start
```bash
pnpm install
pnpm --filter cinder-and-salt dev     # http://localhost:4303
pnpm --filter cinder-and-salt build
pnpm --filter cinder-and-salt test
```

## Customisation guide
1. **Business details** — `src/site.config.ts` (`site`): name, phone, email, address, service
   areas, `postcodePrefixes`, hours, social, nav, CTAs, packages (as `services`), team,
   testimonials, FAQs, legal, credentials. `isFictional: false` removes the demo banner.
2. **Pricing rules** — `src/site.config.ts` (`pricing`): per-head package prices (taken from
   `services[].pricePence`), min/max guests, minimum spend by day type, peak months and uplift,
   extras (per head or flat), travel (free radius, per-mile, miles-by-postcode-area table),
   deposit rate. The calculator, pricing page and worked examples all read from this object.
   The "second oven over 120 guests" rule is in `QuoteCalculator.tsx` → `estimate()`.
3. **Logo** — `src/components/Logo.astro` (ampersand-flame mark with flicker) and
   `public/favicon.svg`; regenerate `public/og.jpg` via `packages/core/scripts/make-og.mjs`.
4. **Colours & fonts** — `src/styles/theme.css` `@theme`: `--color-char` (dominant),
   `--color-kraft` (secondary), `--color-flame` (accent), plus `cream`, `ember`, `ash`. Fonts:
   Bricolage Grotesque (display), Work Sans (body), Caveat (hand notes). The kraft-paper and
   chalkboard textures are CSS utilities (`kraft-paper`, `chalkboard`); torn edges are
   `torn-top` / `torn-bottom` with `--torn-color`.
5. **Images** — `src/assets/photos/` + `src/images.ts`. Keys are used in `content.ts` and pages.
6. **Events, menu, gallery** — `src/content.ts`.
7. **Quote form delivery** — `site.forms.provider` (`demo` | `netlify` | `formspree` | `custom`).
   The calculator submits all fields plus an `estimate` text summary. For Netlify, add a hidden
   static form with matching field names (see Netlify docs for JS-rendered forms).
8. **Calendar/availability** — `site.booking.closedDates` blocks dates in the calculator. For
   real availability, point `site.booking.provider: 'custom'` + `endpoint` and extend
   `QuoteCalculator.tsx` to fetch booked dates.
9. **SEO** — `site.seo` + `SITE_URL` in `astro.config.mjs`; `schemaType: 'FoodEstablishment'`;
   update `public/robots.txt`.
10. **Legal** — `privacy.astro`, `terms.astro` are templates with a review notice.

## Deployment
Static. Build `pnpm --filter cinder-and-salt build`, publish `apps/cinder-and-salt/dist`.

## Testing
`check` + `test` (smoke). Development flow script verified: URL presets, guest slider →
second-oven rule, package switch, extras, travel by postcode area, peak-Saturday uplift,
closed-date block, minimum-spend message, validation, demo submission.
