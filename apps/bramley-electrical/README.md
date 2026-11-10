# Bramley Electrical — website

Tradesperson website with a quote-request form (job type, property, urgency, photos, postcode
check), a dedicated 24/7 emergency lane, a fixed-price menu and per-service pages. Astro 5 +
Tailwind v4; zero framework JavaScript. Static output.

> Fictional demonstration business. Replace all details before launch.

## Pages
`/` · `/services` (+ `/services/<slug>` × 6) · `/pricing` · `/emergency` · `/quote` · `/reviews` ·
`/areas` (postcode checker) · `/about` · `/contact` · `/privacy` · `/credits` · `404`

## Quick start
```bash
pnpm install
pnpm --filter bramley-electrical dev     # http://localhost:4305
pnpm --filter bramley-electrical build
pnpm --filter bramley-electrical test
```

## Customisation guide
1. **Business details** — `src/site.config.ts` (`site`): name, phone, email, address, service
   areas, `postcodePrefixes` (drives the postcode checks), hours, social (incl. Checkatrade),
   nav, CTAs, services (name, category, summary, description, price, includes, image, faqs),
   team, testimonials, FAQs, legal (company + VAT numbers), credentials. `isFictional: false`
   removes the banner.
2. **Fixed-price menu** — `fixedPrices` in the same file (pence). Home shows the first 8;
   `/pricing` shows all.
3. **Emergency pricing & number** — `emergency` object: first-hour rates, per-half-hour, response
   target, phone. Used on the header strip, emergency page, pricing page and mobile bar.
4. **Logo** — `src/components/Logo.astro` (bolt + wordmark) and `public/favicon.svg`; OG image via
   `packages/core/scripts/make-og.mjs`.
5. **Colours & fonts** — `src/styles/theme.css` `@theme`: `--color-concrete` (dominant),
   `--color-graphite` (secondary), `--color-yellow` (accent), `--color-red` (emergency only),
   `--color-steel`. Fonts: Barlow Condensed + Barlow. Utilities: `grid-paper`, `tag`, `tick`,
   `dashed-box`, hard-shadow `btn`.
6. **Photo annotations** — `src/components/Annotated.astro` takes `tags: [{x, y, text}]` in
   percent coordinates; adjust positions when swapping photos.
7. **Images** — `src/assets/photos/` + `src/images.ts`.
8. **Quote form** — `src/pages/quote.astro`. Delivery via `site.forms.provider`. Photo upload
   requires a provider that accepts files (Netlify Forms with `enctype="multipart/form-data"`
   and `data-netlify`, or a custom endpoint); in demo mode previews only. Accepts `?job=<slug>`.
9. **Contact form** — `src/pages/contact.astro`.
10. **SEO** — `site.seo` + `SITE_URL` in `astro.config.mjs`; `schemaType: 'Electrician'`;
    `public/robots.txt`. Service pages emit `Service` + `BreadcrumbList` (+ FAQ) schema.
11. **Legal** — `privacy.astro` template with review notice. Replace fictional registration/
    insurance wording with the real scheme and policy details.

## Deployment
Static. Build `pnpm --filter bramley-electrical build`; publish `apps/bramley-electrical/dist`.

## Testing
`check` + `test`. Development flow verified: `?job=` preselect, postcode in/out-of-area notes,
validation (4 errors on empty submit), demo submission status, areas checker, mobile nav.
