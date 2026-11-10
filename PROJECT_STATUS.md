# PROJECT_STATUS.md — live progress tracker

_Last updated: 2026-11-10 21:40 UTC — end of Fable session. Opus takes over from here._

## Overall
| Area | Status |
|------|--------|
| Research & strategy | ✅ |
| Ten businesses + creative briefs | ✅ BUSINESS_PORTFOLIO.md |
| Monorepo + @site/core | ✅ config, booking engine (same-day notice rule), forms, SEO, smoke test, OG + screenshot scripts |
| Imagery pipelines | ✅ Figma `generate_image` (primary) · ✅ Canva create-design → export (fallback). **Both quotas exhausted at 21:30 UTC 10 Nov; Figma resets 00:00 UTC 11 Nov.** |
| Portfolio index (`apps/portfolio`) | ✅ built; manifest lists 7 built + 3 planned; rerun `pnpm --filter portfolio shots` after each new site |
| Sites complete | **8 / 10** (Lumen + Bright Spark scaffolded with placeholder images) |
| Root `pnpm build` | ✅ all 9 apps build (Forge builds with 0 pages) |

## Per-site status
Legend: ✅ complete & tested · 🟡 in progress · ⬜ not started

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
| 9 | lumen-skin | 4307 | ⬜ | Treatment booking (Cal.com-ready) + consult checklist | ⬜ needs ~10 | ⬜ | ⬜ | ⬜ |
| 10 | bright-spark | 4310 | ⬜ | Free assessment call (20-min slots) + enquiry | ⬜ needs ~8 | ⬜ | ⬜ | ⬜ |

## Current priorities (in order)
1. **`lumen-skin`** (brief #7) — scaffolded with brand-coloured PLACEHOLDER JPEGs in
   `src/assets/photos` (keys: hero, room, facialist, led, serum, texture, exterior, before, after,
   hands). Build the site against them, then replace the files by name with generated photos.
2. **`bright-spark`** (brief #10) — same, placeholders: hero, tutor, laptop, flatlay, online,
   kitchen, whiteboard, papers.
3. Generate real imagery for both when Figma credits reset (00:00 UTC 11 Nov); see HANDOVER §5.
4. Flip `status` for 8–10 in `apps/portfolio/src/projects.ts`; `pnpm --filter portfolio shots`.
5. Side-by-side review of all ten (HANDOVER §8), root README polish, push.

## Known issues / notes
- `git push` returns 403: the Claude GitHub App is not installed on `diggers-123/Websites`. All work
  is committed locally on `claude/uk-small-business-websites-my7lc2`. The user must install the
  app (https://github.com/apps/claude/installations/select_target) or reconnect GitHub; then
  `git push -u origin claude/uk-small-business-websites-my7lc2`.
- Figma AI credits: "Insufficient Figma AI credits … resets at 2026-11-11T00:00:00Z". Canva:
  "User has exceeded their credit quota" (reset time unknown; likely daily).
- All generated image URLs from this session have been downloaded; nothing depends on them.
- Portfolio thumbnails are committed JPEGs; recapture after any home-page change.
