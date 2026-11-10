# Hollowell Garden Design — website

Editorial, portfolio-led website for a garden designer, with case studies, a four-stage process,
a journal and a consultation-request form with live postcode-area checking. Astro 5 + Tailwind v4,
zero framework JavaScript (plain scripts only). Static output.

> Fictional demonstration business. Replace all details before launch.

## Pages
`/` · `/gardens` (+ `/gardens/<slug>` × 6 case studies, before/after slider) · `/services`
(+ `/services/<slug>` × 4) · `/process` · `/about` · `/journal` (+ 3 posts) · `/contact` ·
`/areas` · `/privacy` · `/credits` · `404`

## Quick start
```bash
pnpm install
pnpm --filter hollowell-gardens dev     # http://localhost:4302
pnpm --filter hollowell-gardens build
pnpm --filter hollowell-gardens test
```

## Customisation guide
1. **Business details** — `src/site.config.ts`: name, phone, email, address, `serviceAreas`,
   `postcodePrefixes` (drives the live postcode check on the contact form), hours, social, nav,
   CTAs, services (name, summary, description, price, includes, image key, optional faqs),
   team, testimonials, faqs, legal, credentials. Set `isFictional: false` to remove the banner.
2. **Logo** — `src/components/Logo.astro` (seed-head SVG + "Hollowell" wordmark) and
   `public/favicon.svg`. Regenerate `public/og.jpg` with `packages/core/scripts/make-og.mjs`.
3. **Colours & fonts** — `src/styles/theme.css` `@theme`: `--color-linen` (dominant),
   `--color-moss` (secondary), `--color-terra` (accent), `--color-sage`. Fonts: Fraunces
   (serif, variable with optical sizes) and Figtree via `@fontsource-variable/*`; change the
   imports and `--font-serif` / `--font-sans`.
4. **Images** — add JPEGs to `src/assets/photos/`, register in `src/images.ts`; refer by key in
   `site.config.ts` and `src/content.ts`. Recommended: landscape 1600×1067, portrait 1200×1500.
5. **Case studies & journal** — `src/content.ts` (`gardens[]`, `posts[]`). Each garden has brief,
   place, year, size, type (drives the filter), cover, gallery, optional before/after pair,
   story paragraphs, plants, services, budget band.
6. **Botanical drawings** — `src/components/Botanical.astro` (four hand-made SVGs that draw on
   scroll). Swap paths for the client's own illustrations or remove.
7. **Prices** — `price` strings on each service; also mentioned in `process.astro` stage cards
   and `content.ts` FAQ copy; search for "£" when changing fees.
8. **Consultation form** — `src/pages/contact.astro`. Provider via `site.forms.provider`
   (`demo` | `netlify` | `formspree` | `custom`). Rules in the page's `<script>`. The form
   preselects a service from `?service=<slug>` (service pages link this way).
9. **Booking** — this business arranges visits by phone/email, so there is no slot booking. To
   add Cal.com for consultations, embed it on `contact.astro` (see Kingpin's `book.astro` for the
   inline snippet) and set `site.booking.provider: 'calcom'`.
10. **SEO** — `site.seo.siteUrl` + `SITE_URL` in `astro.config.mjs`; `schemaType`
    `LandscapeArchitect`; update `public/robots.txt`. Service pages emit `Service` schema,
    journal posts `BlogPosting`, case studies `BreadcrumbList`.
11. **Legal** — `privacy.astro` is a template with a review notice; adapt before launch.

## Deployment
Static. Netlify / Vercel / Cloudflare Pages: build `pnpm --filter hollowell-gardens build`,
publish `apps/hollowell-gardens/dist`.

## Testing
`pnpm --filter hollowell-gardens check` · `pnpm --filter hollowell-gardens test`. The
development flow script checked: service preselect, postcode in/out-of-area notes, validation
(4 errors on empty submit), demo submission status, garden-type filter, before/after range
input, mobile nav.
