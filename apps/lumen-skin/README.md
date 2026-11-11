# Lumen Skin Studio — website

Bright, science-led skin studio: a single warm "light" radial gradient that drifts across
lilac pages, circular treatment orbs in a snap-scrolling carousel, before/after results cards,
a concern-chip consultation form, and a treatment-booking island (Cal.com/Calendly-ready).
Astro 5 + Tailwind v4 + one Preact island. Static output.

> Fictional demonstration business. Replace all details before launch. Photography is AI-generated
> (see `/credits`); the three results stories currently share one before/after pair, mirrored/cropped
> per story — give each story its own consented pair via `results[].before/after` keys.

## Pages
`/` · `/treatments` · `/treatments/<slug>` ×5 · `/consultation` · `/prices` · `/results` ·
`/about` · `/faq` · `/book` · `/contact` (+ `#vouchers`) · `/privacy` · `/terms` · `/credits` · `404`

## Quick start
```bash
pnpm install
pnpm --filter lumen-skin dev     # http://localhost:4307
pnpm --filter lumen-skin build
pnpm --filter lumen-skin test
```

## Customisation guide
1. **Business details** — `src/site.config.ts` (`site`): name, phone, email, address, hours
   (Tue–Sat), social (Instagram/TikTok/Google), nav, CTAs, services (`category`: Start here /
   Facials / Resurfacing / Light; `price`, `pricePence`, `durationMins`, `includes`, `bookable`),
   team, testimonials, FAQs, legal, credentials. `isFictional: false` removes the banner.
   The `skin-consultation` service has its own page (`/consultation`) rather than a treatment page.
2. **Courses, concerns, results** — `courses` (name, sessions, price, save, monthly), `concerns`
   (chip list on the consultation form) and `results` (before/after stories: title, plan, quote,
   months) exports in `site.config.ts`.
3. **Logo** — `src/components/Logo.astro` (lowercase "lumen" with a glowing u); `public/favicon.svg`;
   OG via `packages/core/scripts/make-og.mjs`.
4. **Colours & fonts** — `src/styles/theme.css` `@theme`: `--color-lilac` (dominant),
   `--color-plum` (secondary), `--color-tang` (accent), `--color-pink`. Fonts: Outfit + DM Sans.
   Utilities: `light` / `light-plum` (the radial light), `orb`, `panel`, `tilt`, `carousel`,
   `btn-tang/plum/outline/white`, `chip`, `eyebrow`, `display-*`. Component classes live in
   `@layer components` so utilities override them.
5. **Images** — `src/assets/photos/` + `src/images.ts` (keys `hero, room, facialist, led, serum,
   texture, exterior, before, after, hands`; `treatmentImage` maps service slug → key). Replace
   each JPEG with the same filename; the build resizes and converts to WebP.
6. **Treatment pages** — `src/pages/treatments/[slug].astro` reads `service.copy`, `includes`,
   `downtime`, `prep`, `aftercare` and the matching course.
7. **Booking** — `site.booking` (`provider`, `calcomLink`, `slotIntervalMins`, `horizonDays`,
   `minNoticeHours: 24`, `closedDates`, `policy`). `provider: 'demo'` renders
   `TreatmentBooking.tsx` (treatment → date & time → details → demo reference `LU-xxxx`).
   `provider: 'calcom'` embeds Cal.com using `calcomLink`; `'calendly'` embeds `calendlyUrl`.
   URL preset: `/book?treatment=<slug>`.
8. **Forms** — consultation (`consultation.astro`, concern chips + name/mobile/email), contact and
   gift-voucher (`contact.astro`) via `enhanceForm`; delivery via `site.forms.provider`
   (`demo | netlify | formspree | custom`). Honeypot `_gotcha` on every form.
9. **SEO** — `site.seo` + `SITE_URL` in `astro.config.mjs`; `schemaType: 'BeautySalon'`
   (or `HealthAndBeautyBusiness`). Treatment pages emit `Service` + `BreadcrumbList` schema; FAQ page
   emits `FAQPage`.
10. **Legal** — `privacy.astro` covers consultation records and skin photographs as special-category
    data with explicit consent; `terms.astro` covers cancellations, patch tests, courses and
    vouchers. Templates with review notice — have them checked before launch.

## Deployment
Static. Build `pnpm --filter lumen-skin build`; publish `apps/lumen-skin/dist`.

## Testing
`check` + `test`. Development flow verified: `?treatment=signature-facial` preset, date + slot
selection, validation (3 errors), demo confirmation with reference; consultation chips + validation
+ demo status; voucher validation + demo status; mobile nav.
