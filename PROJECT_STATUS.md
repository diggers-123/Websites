# PROJECT_STATUS.md — live progress tracker

_Last updated: 2026-11-10 (Fable session 1)_

## Overall
| Area | Status |
|------|--------|
| Research & strategy | ✅ done (summarised in BUSINESS_PORTFOLIO.md / DESIGN_SYSTEM.md) |
| Ten businesses selected + creative briefs | ✅ done — BUSINESS_PORTFOLIO.md |
| Monorepo + @site/core foundations | ✅ done (config, booking engine, forms, SEO, smoke test, OG generator) |
| Imagery pipeline | ✅ Figma `generate_image` → full-res download → sharp JPEG (see CLAUDE.md) |
| Portfolio index site (`apps/portfolio`) | ⬜ not started |
| Sites complete | **1 / 10** |

## Per-site status
Legend: ✅ complete & tested · 🟡 in progress · ⬜ not started

| # | Site | Pages | Booking/enquiry | Imagery | Tests | README | Status |
|---|------|-------|-----------------|---------|-------|--------|--------|
| 1 | kingpin-barbers | 12/12 | Wizard (barber→cut→date→time→details→confirm), contact form | 13 generated | build ✓ check ✓ smoke ✓ e2e ✓ | ✅ | ✅ |
| 2 | hollowell-gardens | ⬜ | consultation request + postcode check | ⬜ | ⬜ | ⬜ | ⬜ |
| 3 | bramley-electrical | ⬜ | quote request + emergency lane | ⬜ | ⬜ | ⬜ | ⬜ |
| 4 | muddy-paws | ⬜ | groom booking w/ size pricing | ⬜ | ⬜ | ⬜ | ⬜ |
| 5 | nell-ashworth | ⬜ | date-availability enquiry | ⬜ | ⬜ | ⬜ | ⬜ |
| 6 | cinder-and-salt | ⬜ | quote calculator | ⬜ | ⬜ | ⬜ | ⬜ |
| 7 | lumen-skin | ⬜ | treatment booking (Cal.com-ready) | ⬜ | ⬜ | ⬜ | ⬜ |
| 8 | forge-fitness | ⬜ | free consult booking + timetable | ⬜ | ⬜ | ⬜ | ⬜ |
| 9 | northgate-garage | ⬜ | MOT/service slot booking w/ reg input | ⬜ | ⬜ | ⬜ | ⬜ |
| 10 | bright-spark | ⬜ | free call booking + enquiry | ⬜ | ⬜ | ⬜ | ⬜ |

## Kingpin Barbers — detail
- Pages: home, services, barbers, book, gallery, about, contact, faq, privacy, terms, credits, 404.
- Functionality: booking wizard (Preact) with per-barber hours, closed dates, 21-day horizon,
  1h min notice, deterministic demo availability, validation, honeypot, demo confirmation;
  URL presets `/book?barber=Marcus` and `/book?service=skin-fade`; contact form via `enhanceForm`.
- Design critique done: fixed mobile-nav containing-block bug (backdrop-blur), header wrapping at
  1280px, about-page hero scale, scroll-reveal no-JS fallback.
- Outstanding (minor): consider a "Cal.com per-barber links" example in README; add a
  `credits` exclusion in sitemap (done via filter).

## Current priorities (in order)
1. Build `hollowell-gardens` (editorial serif, drawn-on-scroll botanicals, before/after slider,
   consultation request) — most different from Kingpin; proves range.
2. Build `cinder-and-salt` (quote calculator island) — second distinct functional pattern.
3. Build `muddy-paws` (illustrated size selector + booking) — custom SVG illustration work.
4. Portfolio index site.
5. Remaining six sites, then side-by-side distinctiveness review.

## Outstanding cross-cutting work
- `apps/portfolio` studio index.
- Root `README.md` (currently a stub).
- Per-site browser flow scripts to be stored under `packages/core/scripts/flows/` (currently
  the Kingpin flow lives in HANDOVER.md as a template).
- Final side-by-side review of all ten.
