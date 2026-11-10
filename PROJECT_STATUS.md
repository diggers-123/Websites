# PROJECT_STATUS.md — live progress tracker

_Last updated: 2026-11-10 (Fable session 1, after site 4 + portfolio index)_

## Overall
| Area | Status |
|------|--------|
| Research & strategy | ✅ |
| Ten businesses + creative briefs | ✅ BUSINESS_PORTFOLIO.md |
| Monorepo + @site/core | ✅ (config, booking engine incl. same-day notice rule, forms, SEO, smoke test, OG + screenshot scripts) |
| Imagery pipeline | ✅ Figma `generate_image` → curl → sharp (see HANDOVER §5) |
| Portfolio index (`apps/portfolio`) | ✅ built; `pnpm --filter portfolio shots` recaptures thumbnails from built sites |
| Sites complete | **4 / 10** |

## Per-site status
Legend: ✅ complete & tested · 🟡 in progress · ⬜ not started

| # | Site | Port | Pages | Booking / enquiry | Imagery | Tests | README | Status |
|---|------|------|-------|-------------------|---------|-------|--------|--------|
| 1 | kingpin-barbers | 4301 | 12 | Slot wizard (barber→cut→date→time) | 13 gen | build ✓ check ✓ smoke ✓ e2e ✓ | ✅ | ✅ |
| 2 | hollowell-gardens | 4302 | 24 | Consultation form + postcode check; before/after slider; filters | 12 gen | ✓ ✓ ✓ ✓ | ✅ | ✅ |
| 3 | cinder-and-salt | 4303 | 17 | Live quote calculator (guests/package/extras/travel/peak/min-spend) | 10 gen | ✓ ✓ ✓ ✓ | ✅ | ✅ |
| 4 | muddy-paws | 4304 | 12 | Size/coat-priced groom wizard; illustrated size picker | 8 gen + 5 SVG dogs | ✓ ✓ ✓ ✓ | ✅ | ✅ |
| 5 | bramley-electrical | 4305 | ⬜ | Quote request (job type, photos) + emergency lane | ⬜ | ⬜ | ⬜ | ⬜ |
| 6 | nell-ashworth | 4306 | ⬜ | Date-availability enquiry (seeded booked dates) | ⬜ | ⬜ | ⬜ | ⬜ |
| 7 | lumen-skin | 4307 | ⬜ | Treatment booking (Cal.com-ready) + consult checklist | ⬜ | ⬜ | ⬜ | ⬜ |
| 8 | forge-fitness | 4308 | ⬜ | Free consult booking + timetable enquiry | ⬜ | ⬜ | ⬜ | ⬜ |
| 9 | northgate-garage | 4309 | ⬜ | MOT/service slot booking w/ reg-plate input | ⬜ | ⬜ | ⬜ | ⬜ |
| 10 | bright-spark | 4310 | ⬜ | Free assessment call (20-min slots) + enquiry | ⬜ | ⬜ | ⬜ | ⬜ |

## Current priorities (in order)
1. `bramley-electrical` (brief #3) — quote request with job type + urgency, emergency red lane,
   label-tag photo annotations, grid-paper sections, fixed-price table.
2. `nell-ashworth` (brief #5) — photography-dominant; needs ~12 generated documentary wedding/
   family images; date-check enquiry against seeded booked dates in config.
3. `northgate-garage` (brief #9) — reg-plate input, job-card hero, slot booking (reuse engine).
4. `forge-fitness`, `lumen-skin`, `bright-spark`.
5. Root README; side-by-side distinctiveness review of all ten; refresh portfolio shots; push.

## Known issues / notes
- `git push` returns 403: the Claude GitHub App is not installed on `diggers-123/Websites`.
  All work is committed locally on `claude/uk-small-business-websites-my7lc2`. The user needs to
  install the app (https://github.com/apps/claude/installations/select_target) or reconnect
  GitHub, then `git push -u origin claude/uk-small-business-websites-my7lc2`.
- Figma asset URLs expire 7 days after generation — all generated images are already saved
  into each app's `src/assets/photos`, so nothing depends on those URLs.
- Portfolio thumbnails must be recaptured (`pnpm --filter portfolio shots`) after any home-page
  change; they are committed JPEGs.
