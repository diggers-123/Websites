# Ten UK small-business websites

A portfolio of ten individually designed, fully functioning, multi-page websites for fictional UK
sole traders and small businesses — built as reusable products to customise and sell to real
businesses. Astro 5 + Tailwind v4 monorepo; Preact islands only for booking/quote wizards.

| # | Site | Business | Dev port | Status |
|---|------|----------|----------|--------|
| 1 | `apps/kingpin-barbers` | Barbershop, Leeds | 4301 | ✅ |
| 2 | `apps/hollowell-gardens` | Garden designer, Stroud | 4302 | ✅ |
| 3 | `apps/cinder-and-salt` | Wood-fired pizza catering, Norwich | 4303 | ✅ |
| 4 | `apps/muddy-paws` | Dog groomer, Harrogate | 4304 | ✅ |
| 5 | `apps/bramley-electrical` | Electrician, Sheffield | 4305 | ✅ |
| 6 | `apps/nell-ashworth` | Wedding & family photographer, Edinburgh | 4306 | ✅ |
| 7 | `apps/northgate-garage` | Garage & MOT, Stockport | 4309 | ✅ |
| 8 | `apps/forge-fitness` | Personal trainer, Cardiff | 4308 | 🟡 in progress |
| 9 | `apps/lumen-skin` | Skin studio, Brighton | 4307 | ⬜ |
| 10 | `apps/bright-spark` | Tutor, Cambridge | 4310 | ⬜ |
| — | `apps/portfolio` | Studio index of all ten | 4300 | ✅ |

## Run it
```bash
pnpm install
pnpm --filter kingpin-barbers dev      # any site: pnpm --filter <slug> dev
pnpm --filter portfolio dev            # the index at http://localhost:4300
pnpm build                             # build every site
pnpm --filter <slug> check             # TypeScript / Astro diagnostics
pnpm --filter <slug> test              # smoke test the built site
pnpm --filter portfolio shots          # recapture portfolio thumbnails from built sites
```

## Documents
- `CLAUDE.md` — permanent rules, standards and commands.
- `PROJECT_STATUS.md` — live progress tracker.
- `HANDOVER.md` — exact current state, recipes, pipelines, next actions.
- `BUSINESS_PORTFOLIO.md` — the ten businesses and their creative briefs.
- `DESIGN_SYSTEM.md` — shared engineering foundations (not a shared look).
- `apps/<slug>/README.md` — per-site customisation and deployment guide.

## Selling a site to a real client
Each site keeps all business content in `src/site.config.ts`, all brand tokens in
`src/styles/theme.css`, and all photos in `src/assets/photos` + `src/images.ts`. The per-site
README walks through name, logo, colours, fonts, images, services, prices, contact details,
booking provider (demo → Cal.com / Calendly / custom API), form provider (demo → Netlify /
Formspree / custom) and deployment. Legal pages are ICO-based templates flagged for review.

All businesses, people, reviews and credentials are fictional; photography is AI-generated for
demonstration and must be replaced with the client's own.
