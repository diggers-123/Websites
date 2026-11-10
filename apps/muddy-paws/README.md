# Muddy Paws Dog Grooming — website

Playful, illustrated dog-grooming website with size-based pricing and a booking wizard that shows
the exact price before a time is chosen. Astro 5 + Tailwind v4 + a Preact booking island.

> Fictional demonstration business. Replace all details before launch.

## Pages
`/` · `/services` (price table by size) · `/puppies` · `/about` · `/gallery` · `/faq` · `/book` ·
`/contact` · `/privacy` · `/terms` · `/credits` · `404`

## Quick start
```bash
pnpm install
pnpm --filter muddy-paws dev     # http://localhost:4304
pnpm --filter muddy-paws build
pnpm --filter muddy-paws test
```

## Customisation guide
1. **Business details** — `src/site.config.ts` (`site`). `isFictional: false` removes the banner.
2. **Pricing model** — same file: `sizes` (five bands with `multiplier` for price and `mins` for
   time), `coats` (surcharge on clipped grooms), `addons`, and `groomPrice()` / `groomMins()`.
   Services whose `price` starts with "From" scale by size/coat; others are flat. The services
   page table, home teaser and booking wizard all derive from these.
3. **Logo** — `src/components/Logo.astro` (paw roundel) + `public/favicon.svg`; OG via
   `packages/core/scripts/make-og.mjs`.
4. **Colours & fonts** — `src/styles/theme.css` `@theme`: `--color-mustard` (dominant),
   `--color-teal` (secondary), `--color-coral` (accent), `--color-cocoa` (text/outlines),
   `--color-cream`. Fonts Fredoka + Nunito. Blob photo masks: `blob-a/b/c`. Wave dividers:
   `wave-top` with `--wave-color` set to the colour of the section above.
5. **Dog illustrations** — `src/dogs.ts` (SVG strings per size, used by `Dog.astro` and the
   booking island). Replace with the client's own mascots if they have them.
6. **Images** — `src/assets/photos/` + `src/images.ts` (also holds gallery alt text).
7. **Booking** — `site.booking`: `provider` (`demo` default; `calcom`/`calendly` would replace
   the wizard on `book.astro` as in Kingpin's `book.astro`; `custom` + `endpoint` for your own
   API — adapt `GroomBooking.tsx` `confirm()`), `horizonDays`, `minNoticeHours`, `closedDates`,
   `policy`, `slotIntervalMins`. Hours per weekday in `site.hours`. The wizard accepts
   `?size=<slug>` and `?service=<slug>` presets (used by the home line-up and puppy page).
8. **Contact form** — `site.forms.provider`; rules in `contact.astro`.
9. **SEO** — `site.seo` + `SITE_URL` in `astro.config.mjs`; `schemaType: 'PetGroomer'`
   (not a formal schema.org type; change to `LocalBusiness` if preferred); `public/robots.txt`.
10. **Legal** — `privacy.astro`, `terms.astro` are templates with a review notice.

## Deployment
Static. Build `pnpm --filter muddy-paws build`; publish `apps/muddy-paws/dist`.

## Testing
`check` + `test`. Development flow verified: size preset via URL, coat surcharge (£48 + £6 = £54),
add-on total, same-day notice rule, slot grid, validation (5 errors incl. vaccination tick),
demo confirmation reference; contact validation; mobile nav.
