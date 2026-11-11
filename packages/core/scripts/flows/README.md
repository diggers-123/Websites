# Browser flow scripts

One Playwright script per site, driving the booking / quote / enquiry flow end to end against
the built `dist/`. Each serves `dist/` on a random port, drives headless Chromium, prints
checkpoints and ends with `errors: []` when the page produced no console or page errors.

```bash
pnpm --filter <slug> build
node packages/core/scripts/flows/<slug>.mjs apps/<slug>/dist <dir-for-screenshots>
```

They assume the demo providers (`booking.provider: 'demo'`, `forms.provider: 'demo'`) and the
default site content; adjust selectors if you change labels or button text.
