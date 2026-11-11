# Bright Spark Tutoring — website

Exercise-book tuition site: grid-paper sections, ruled A4 "sheets" with a red margin, highlighter
swipes that draw in on scroll, sticky-note cards, handwritten margin annotations, and a free
assessment-call booking island (20-minute slots, Cal.com-ready). Astro 5 + Tailwind v4 + one
Preact island. Static output.

> Fictional demonstration business. Replace all details before launch. Photography is AI-generated
> (see `/credits`). The safeguarding page is a template and **must** be reviewed before going live.

## Pages
`/` · `/subjects` · `/subjects/<slug>` ×5 · `/how-it-works` (+ `#faq`) · `/pricing` · `/results` ·
`/about` · `/book` · `/resources` · `/resources/<slug>` ×3 · `/contact` · `/safeguarding` ·
`/privacy` · `/terms` · `/credits` · `404`

## Quick start
```bash
pnpm install
pnpm --filter bright-spark dev     # http://localhost:4310
pnpm --filter bright-spark build
pnpm --filter bright-spark test
```

## Customisation guide
1. **Business details** — `src/site.config.ts` (`site`): name, owner, phone, email, address
   (exact address is only shown as street + area), lesson hours (drive the booking calendar),
   social, nav, CTAs, services (the `assessment-call` service plus one per subject), team,
   testimonials, FAQs, legal (sole trader + ICO reference), credentials. `isFictional: false`
   removes the banner.
2. **Subjects** — `subjects` export: slug (matches a service), name, image key, levels, boards,
   headline, intro paragraphs, topics, results line. Drives `/subjects`, `/subjects/[slug]`, the
   home sticky notes, the booking island's subject chips and the enquiry form.
3. **Pricing** — `pricing` export: rows per level (online / in-person, pence), `packDiscount`,
   notes. Pack prices are computed. `/pricing` worked example uses the GCSE row.
4. **Results & reviews** — `results` export (stats with `stat`/`suffix`/`label`, stories with
   from/to grades) and `site.testimonials`. All marked fictional; replace with consented data.
5. **Resources** — `resources` export: slug, title, summary, readMins, body paragraphs. Each
   article emits `Article` + `BreadcrumbList` schema.
6. **Year groups** — `yearGroups` export (booking island select + enquiry form).
7. **Logo** — `src/components/Logo.astro` (star + "Bright Spark" with highlighter; `invert` for
   dark backgrounds); `public/favicon.svg`; OG via `packages/core/scripts/make-og.mjs`.
8. **Colours & fonts** — `src/styles/theme.css` `@theme`: `--color-paper` (dominant),
   `--color-ink` (secondary), `--color-hi` (highlighter accent), `--color-sky`, `--color-red`
   (correction marks only). Fonts: Plus Jakarta Sans + Caveat (`hand`). Utilities: `grid-paper`,
   `sheet` (ruled page; use `leading-8` so text sits on the lines), `hl` (animated swipe; use
   `hl-static` where no animation is wanted, and a `bg-hi text-ink` box on dark backgrounds),
   `sticky-note` / `sticky-sky` / `sticky-white` + `tilt-l` / `tilt-r`, `btn-ink/hi/outline/white`,
   `card`, `tick`, `chip`. Form classes live in `@layer components`.
9. **Margin notes** — `src/components/Note.astro` (`arrow="left|right|down|none"`, `rotate`).
10. **Images** — `src/assets/photos/` + `src/images.ts` (keys `hero, tutor, laptop, flatlay,
    online, kitchen, whiteboard, papers`). Replace a JPEG by filename. Never publish photos of
    students without written parental consent.
11. **Booking** — `site.booking` (`provider`, `calcomLink`, `slotIntervalMins: 20`, `horizonDays`,
    `minNoticeHours`, `closedDates`, `policy`). `provider: 'demo'` renders `CallBooking.tsx`
    (student → when → details → demo reference `BS-xxxx`); `'calcom'` embeds Cal.com. URL presets:
    `/book?subject=<slug>&year=<year group>`.
12. **Forms** — enquiry (`contact.astro`: year group, subject chips, mode, goal) via `enhanceForm`;
    delivery via `site.forms.provider` (`demo | netlify | formspree | custom`). Honeypot `_gotcha`.
13. **SEO** — `site.seo` + `SITE_URL` in `astro.config.mjs`; `schemaType: 'EducationalOrganization'`.
    Subject pages emit `Service` + `BreadcrumbList`; how-it-works emits `FAQPage`.
14. **Legal** — `privacy.astro` (children's data, lesson notes, retention), `terms.astro`,
    `safeguarding.astro` (**template — review against KCSIE / local procedures, add the local
    authority contact, replace fictional DBS details**). `Legal.astro` takes a custom `notice`.

## Deployment
Static. Build `pnpm --filter bright-spark build`; publish `apps/bright-spark/dist`.

## Testing
`check` + `test`. Development flow verified: `?subject=physics&year=Year 11` presets, date +
20-minute slot selection, validation (3 errors), demo confirmation with reference; enquiry chips +
validation (4 errors) + demo status; highlighter swipes animate on scroll; mobile nav.
