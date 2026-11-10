# Forge Personal Training — website

High-energy personal-training site: diagonal clip-path sections, cobalt duotone photography,
volt accents, giant count-up stats, an index-card programme layout, a weekly small-group
timetable with a "join a session" form, and a free-consultation booking island. Astro 5 +
Tailwind v4 + one Preact island. Static output.

> Fictional demonstration business. Replace all details before launch.

## Pages
`/` · `/personal-training` · `/small-group` · `/online` · `/pricing` · `/timetable` · `/results` ·
`/about` · `/book` · `/contact` · `/privacy` · `/terms` · `/credits` · `404`

## Quick start
```bash
pnpm install
pnpm --filter forge-fitness dev     # http://localhost:4308
pnpm --filter forge-fitness build
pnpm --filter forge-fitness test
```

## Customisation guide
1. **Business details** — `src/site.config.ts` (`site`): name, phone, email, address, hours
   (6am–8pm weekdays), social, nav, CTAs, services (grouped by `category`: Start here /
   Personal training / Small group / Online — price, includes), team, testimonials, FAQs, legal,
   credentials. `isFictional: false` removes the banner.
2. **Timetable** — `timetable` export (day → sessions with time, name, focus, where
   `Studio|Bay`). Drives the home teaser, small-group page grid, timetable page and the
   "join a session" select. Beginners' sessions are coloured by name prefix "Beginners";
   Bay sessions by `where: 'Bay'`.
3. **Stats** — `results` export (`stat` like "600+" / "92%" is split into number + suffix for the
   count-up animation).
4. **Logo** — `src/components/Logo.astro` (FORGE with a weight-plate O); `public/favicon.svg`;
   OG via `packages/core/scripts/make-og.mjs`.
5. **Colours & fonts** — `src/styles/theme.css` `@theme`: `--color-bone` (dominant),
   `--color-cobalt` (secondary), `--color-volt` (accent), `--color-coal`. Fonts: Archivo Black +
   Archivo. Utilities: `cut-tl/cut-br/cut-both` (diagonals), `duo` (cobalt duotone), `card`
   / `card-volt`, `stat`, `kicker`, skew-on-hover `btn-*`. Component classes live in
   `@layer components` so Tailwind utilities can override them.
6. **Images** — `src/assets/photos/` + `src/images.ts` (keys `hero, coach, group, hands, client`).
7. **Programme pages** — `src/components/ServicePage.astro` is shared by the three programme
   pages; each page passes its own copy, image, points and FAQs.
8. **Booking** — `site.booking` (`provider`, `slotIntervalMins`, `horizonDays`, `minNoticeHours`,
   `closedDates`, `policy`). `ConsultBooking.tsx` offers studio or video call, 30-minute slots,
   goal/experience radios. URL presets `?type=call|studio&goal=…`. For Cal.com, embed as in
   Kingpin's `book.astro` and set `provider: 'calcom'`.
9. **Forms** — "join a session" (`timetable.astro`) and contact (`contact.astro`) via
   `enhanceForm`; delivery via `site.forms.provider`.
10. **SEO** — `site.seo` + `SITE_URL` in `astro.config.mjs`; `schemaType: 'HealthClub'`
    (or `ExerciseGym`). Programme pages emit `Service` + `BreadcrumbList` (+ FAQ) schema.
11. **Legal** — `privacy.astro` covers health data (special category, explicit consent);
    `terms.astro` covers blocks, cancellations, health, payment. Templates with review notice.

## Deployment
Static. Build `pnpm --filter forge-fitness build`; publish `apps/forge-fitness/dist`.

## Testing
`check` + `test`. Development flow verified: `?type=call` preset, date + slot selection,
validation (4 errors incl. goal), demo confirmation; join-session validation + demo status;
count-up animation; mobile nav.
