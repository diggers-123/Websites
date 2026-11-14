# PROJECT_STATUS.md — live progress tracker

_Last updated: 2026-11-11 22:40 UTC. **All ten sites complete, pushed and live on Vercel.**_

## Overall
| Area | Status |
|------|--------|
| Research & strategy | ✅ |
| Ten businesses + creative briefs | ✅ BUSINESS_PORTFOLIO.md |
| Monorepo + @site/core | ✅ config, booking engine (same-day notice rule), forms, SEO, smoke test, OG + screenshot scripts, flow scripts |
| Imagery | ✅ all ten sites carry original AI-generated photography (Figma `generate_image`; Forge partly via Canva) |
| Portfolio index (`apps/portfolio`) | ✅ 10 of 10 built; thumbnails current; "pipeline" section hides when nothing is planned |
| Sites complete | **10 / 10** |
| Root `pnpm build` / `pnpm test` | ✅ 11 apps build (173 pages); all smoke tests pass |
| Side-by-side review (HANDOVER §8) | ✅ done 11 Nov — ten distinct typefaces, palettes, heroes, section orders, motifs |
| Push to GitHub | ✅ pushed 11 Nov (Claude GitHub App installed) |
| Live hosting | ✅ all ten sites + portfolio on Vercel (team Digbyc); URLs in README |

## Per-site status
Legend: ✅ complete & tested

| # | Site | Port | Pages | Booking / enquiry | Imagery | Tests | README | Status |
|---|------|------|-------|-------------------|---------|-------|--------|--------|
| 1 | kingpin-barbers | 4301 | 12 | Slot wizard (barber→cut→date→time) | 13 | build ✓ check ✓ smoke ✓ e2e ✓ | ✅ | ✅ |
| 2 | hollowell-gardens | 4302 | 24 | Consultation form + postcode check; before/after; filters | 12 | ✓ ✓ ✓ ✓ | ✅ | ✅ |
| 3 | cinder-and-salt | 4303 | 17 | Live quote calculator | 10 | ✓ ✓ ✓ ✓ | ✅ | ✅ |
| 4 | muddy-paws | 4304 | 12 | Size/coat-priced groom wizard; SVG dogs | 8 + SVG | ✓ ✓ ✓ ✓ | ✅ | ✅ |
| 5 | bramley-electrical | 4305 | 18 | Quote request (photos, postcode) + emergency lane | 10 | ✓ ✓ ✓ ✓ | ✅ | ✅ |
| 6 | nell-ashworth | 4306 | 14 | Date-availability enquiry | 12 | ✓ ✓ ✓ ✓ | ✅ | ✅ |
| 7 | northgate-garage | 4309 | 19 | Reg-plate booking wizard, job card | 9 | ✓ ✓ ✓ ✓ | ✅ | ✅ |
| 8 | forge-fitness | 4308 | 14 | Free-consult wizard (studio/call), join-session form, count-ups | 5 | ✓ ✓ ✓ ✓ | ✅ | ✅ |
| 9 | lumen-skin | 4307 | 18 | Treatment booking (Cal.com-ready), consultation chips, vouchers | 10 | ✓ ✓ ✓ ✓ | ✅ | ✅ |
| 10 | bright-spark | 4310 | 22 | Free assessment call (20-min slots), enquiry w/ year group + subjects | 8 | ✓ ✓ ✓ ✓ | ✅ | ✅ |

## Remaining / optional
1. (done 14 Nov) Vercel projects are connected to GitHub; pushes to the claude branch auto-deploy.
2. Lumen results stories share one before/after pair (mirrored/cropped per story); generate two
   more pairs if the demo is shown to buyers — see `apps/lumen-skin/README.md`.
3. Nice-to-haves, not blockers: Lighthouse pass per site; a `flows` runner script at the root;
   favicon PNG fallbacks for very old browsers.

## Known issues / notes
- Four plain `<slug>.vercel.app` names were already taken by other users, so those projects have
  suffixed production domains (see README). A custom domain per client replaces these.
- Figma AI credits reset daily at 00:00 UTC; Canva quota reset time unknown. All generated image
  URLs have been downloaded; nothing depends on them.
- `smoke.mjs` ignores `net::ERR_ABORTED` request failures (the browser dropping a srcset candidate
  on navigation) — these were flaky false positives under parallel `pnpm test`.
- Portfolio thumbnails are committed JPEGs; recapture (`pnpm --filter portfolio shots`) after any
  home-page change.
