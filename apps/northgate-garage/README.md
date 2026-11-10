# Northgate Motor Works — website

Independent garage website built around a "job card" UI: a registration-plate input in the hero,
a four-step booking wizard (vehicle → work → drop-off slot → details) with a live job-card
estimate, a transparent price list and per-service pages. Astro 5 + Tailwind v4 + a Preact
booking island. Static output.

> Fictional demonstration business. Replace all details before launch.

## Pages
`/` · `/services` (+ `/services/<slug>` × 7) · `/prices` · `/book` · `/reviews` · `/about` · `/faq` ·
`/contact` · `/privacy` · `/terms` · `/credits` · `404`

## Quick start
```bash
pnpm install
pnpm --filter northgate-garage dev     # http://localhost:4309
pnpm --filter northgate-garage build
pnpm --filter northgate-garage test
```

## Customisation guide
1. **Business details** — `src/site.config.ts` (`site`): name, phone, email, address, areas,
   hours (Saturday mornings), social, nav, CTAs, services (name, category, summary, description,
   price, pricePence, durationMins, bookable, includes), team, testimonials, FAQs, legal
   (company + VAT), credentials (MOT station number etc.). `isFictional: false` removes the banner.
2. **Price list** — `priceList` in the same file (pence + note). Home shows the first 7.
3. **Combo discount** — the "MOT + full service saves £15" rule lives in
   `GarageBooking.tsx` (`combo`), the pricing page card and FAQ copy.
4. **Logo** — `src/components/Logo.astro` (roundel + stacked wordmark); `public/favicon.svg`;
   OG image via `packages/core/scripts/make-og.mjs`.
5. **Colours & fonts** — `src/styles/theme.css` `@theme`: `--color-white`/`pale` (dominant),
   `--color-navy` (secondary), `--color-red` (accent), `--color-plate` (reg plate yellow),
   status colours. Fonts: IBM Plex Sans Condensed, IBM Plex Sans, IBM Plex Mono. Utilities:
   `job-card`, `chip-*`, `plate`, `check`, `grid-lines`.
6. **Images** — `src/assets/photos/` + `src/images.ts` (`serviceImage` maps service slug → key).
7. **Booking** — `site.booking` (`provider`, `slotIntervalMins`, `horizonDays`,
   `minNoticeHours`, `closedDates`, `policy`). Drop-off slots run from opening until 13:00
   (`dropOff` filter in `GarageBooking.tsx`). URL presets: `/book?reg=AB12CDE&service=mot`.
   **Vehicle look-up by registration** is not performed — it needs the DVLA Vehicle Enquiry
   Service API key (server-side only). To add it: create a serverless function that calls
   VES with the key and returns make/model/colour/MOT due; call it from the wizard after a valid
   plate. Never put the key in client code.
8. **Contact form** — `site.forms.provider`; rules in `contact.astro`.
9. **SEO** — `site.seo` + `SITE_URL` in `astro.config.mjs`; `schemaType: 'AutoRepair'`;
   service pages emit `Service` + `BreadcrumbList`.
10. **Legal** — `privacy.astro` (mentions DVSA MOT records), `terms.astro` (guarantee, courtesy
    car conditions, storage) — templates with a review notice.

## Deployment
Static. Build `pnpm --filter northgate-garage build`; publish `apps/northgate-garage/dist`.

## Testing
`check` + `test`. Development flow verified: plate formatting on the home form, hand-off to
`/book` with reg + MOT preselected, invalid-plate guard, combo discount in the job card,
courtesy-car line, drop-off slot grid, validation (3 errors), demo confirmation; mobile nav.
