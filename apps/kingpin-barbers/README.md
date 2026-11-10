# Kingpin Barber Co. — website

A multi-page barbershop website with online booking. Built with Astro 5, Tailwind v4 and a small
Preact booking island. Static output: deploy anywhere.

> Fictional demonstration business. Replace all details before launch.

## Pages
`/` home · `/services` cuts & prices · `/barbers` · `/book` · `/gallery` · `/about` · `/contact` ·
`/faq` · `/privacy` · `/terms` · `/credits` · `404`

## Quick start
```bash
pnpm install            # from the repository root
pnpm --filter kingpin-barbers dev      # http://localhost:4301
pnpm --filter kingpin-barbers build    # outputs to dist/
pnpm --filter kingpin-barbers test     # smoke test the build
```

## Customisation guide

### 1. Business name, phone, email, address, hours
Edit `src/site.config.ts`. Everything a customer sees comes from this file: `name`, `tagline`,
`phone`/`phoneHref`, `email`, `address`, `serviceAreas`, `hours` (use the `hours()` helper;
`null` = closed), `social`, `nav`, `primaryCta`.
Set `isFictional: false` to remove the demonstration banner.

### 2. Logo
`src/components/Logo.astro` holds the crown-pin SVG mark and the wordmark. Replace the SVG
paths or drop in an `<img>`; keep the `markOnly` prop if you use the mark alone.
Also update `public/favicon.svg` and regenerate `public/og.jpg` (see 10).

### 3. Colours and fonts
`src/styles/theme.css` → `@theme` block. Tokens: `--color-ink` (dominant), `--color-chalk`
(secondary), `--color-volt` (accent), `--color-smoke`, `--color-focus`, `--color-error`.
Fonts are imported from `@fontsource` packages at the top of the file; swap the import and the
`--font-display` / `--font-sans` / `--font-mono` values. Run `pnpm add @fontsource/<name>` in
this app for a new face.

### 4. Images
Put photos in `src/assets/photos/` and register them in `src/images.ts` (key → import). Config
and components refer to keys (`'hero'`, `'shop'`, `'barber-danny'`…). Alt text for the gallery
lives in `src/images.ts` → `gallery`. Recommended sizes: hero 1200×1500 portrait, shop/exterior
1600×1000, barber portraits 1000×1250, gallery 1000–1600px on the long edge. JPEG q80 is fine;
Astro generates responsive variants at build.

### 5. Services and prices
`site.services[]` in `src/site.config.ts`. Each has `slug`, `name`, `category`, `summary`,
`description[]`, `price` (display), `pricePence` (for schema), `durationMins` (drives slot
length), `includes[]`, `bookable`. The home page features the four slugs listed in
`src/pages/index.astro` (`featured`); the services page shows all, grouped by `category`.

### 6. Barbers
`site.team[]`. `bookable: true` makes them selectable in the wizard; `hours: { tue: null }`
marks a day off. Images via keys in `src/images.ts`.

### 7. Reviews, FAQs, credentials
`site.testimonials[]`, `site.faqs[]`, `site.credentials[]` (mark genuine ones `fictional: false`
or omit the flag).

### 8. Booking
`site.booking.provider`:
- `'demo'` (default): the custom wizard with simulated availability, labelled on screen.
- `'calcom'`: set `calcomLink: 'your-handle/haircut'`; the Book page embeds Cal.com inline.
  Create one event type per service (or per barber) in Cal.com; add `calcomLinks` per slug
  if you want deep links from the services page (extend `book.astro` to read them).
- `'calendly'`: set `calendlyUrl`.
- `'custom'`: set `endpoint`. The wizard calls `GET {endpoint}/availability?date=YYYY-MM-DD&barber=&service=`
  expecting `[{start, end}]` (minutes from midnight) and `POST {endpoint}/book` with
  `{barber, service, date, time, name, phone, email, notes}` expecting `{reference}`.
Also set `horizonDays`, `minNoticeHours`, `closedDates`, `policy`.

### 9. Contact form
`site.forms.provider`: `'demo'` | `'netlify'` (add `data-netlify="true"` attribute to the form
in `contact.astro` and deploy to Netlify) | `'formspree'` (set `endpoint`) | `'custom'`
(JSON POST to `endpoint`). Validation rules live in the `<script>` at the bottom of
`src/pages/contact.astro`.

### 10. SEO & social image
`site.seo`: `siteUrl` (also set `SITE_URL` in `astro.config.mjs`), `titleTemplate`,
`defaultDescription`, `schemaType` (`HairSalon`), `priceRange`. Regenerate the OG image:
```bash
node ../../packages/core/scripts/make-og.mjs src/assets/photos/shop.jpg public/og.jpg '<svg …>' 0.55
```
Update `public/robots.txt` with the real domain.

### 11. Legal pages
`src/pages/privacy.astro` and `terms.astro` are templates built from `site.legal`. They carry a
"template notice" box — remove it only after a competent person has reviewed the text for the
real business. Consider adding a cookie banner if you enable analytics or embeds that set cookies.

### 12. Map
Set `address.mapEmbedUrl` to a Google Maps embed URL to show a map on the contact page
(and review the privacy notice regarding Google cookies). Otherwise a styled "open in Maps"
panel is shown.

## Deployment
Static site. Any of:
- **Netlify**: build command `pnpm --filter kingpin-barbers build`, publish `apps/kingpin-barbers/dist`.
  Forms: set `forms.provider: 'netlify'`.
- **Vercel**: framework Astro, root `apps/kingpin-barbers`, output `dist`.
- **Cloudflare Pages**: same build command, output directory as above.
Set the production domain in `site.seo.siteUrl` and `astro.config.mjs` before building.

## Testing
```bash
pnpm --filter kingpin-barbers check   # TypeScript + Astro diagnostics
pnpm --filter kingpin-barbers test    # smoke test (links, meta, console errors, overflow)
```
A full booking-flow browser script used during development is described in `HANDOVER.md`.

## Known limitations
- Demo booking stores nothing and sends no email (by design). Connect a provider to go live.
- "Any barber" demo availability approximates by the least-busy barber for that day.
- Photography is AI-generated for the demo; replace with real photos of the real shop and staff.
