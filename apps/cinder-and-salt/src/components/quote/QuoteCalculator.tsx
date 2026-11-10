/**
 * Event quote calculator — Preact island.
 * Live estimate from guests × package + extras + travel, with min-spend and peak rules.
 * Submits the enquiry (with the computed summary) through @site/core submitForm.
 */
import { useEffect, useMemo, useState } from 'preact/hooks';
import { validate, submitForm, postcodeInArea, type FormsConfig, type SubmitResult } from '@site/core';

export interface PricingRules {
  packages: { slug: string; name: string; perHead: number; summary: string }[];
  minGuests: number;
  maxGuests: number;
  minSpend: { weekend: number; weekday: number };
  peakMonths: number[];
  peakUplift: number;
  extras: { slug: string; name: string; price: number; perHead: boolean; note: string }[];
  travel: { freeMiles: number; perMile: number; maxMiles: number; areas: Record<string, number> };
  depositRate: number;
}
interface Props { pricing: PricingRules; forms: FormsConfig; closedDates: string[]; phone: string; postcodePrefixes: string[]; isDemo: boolean }

const EVENT_TYPES = ['Wedding', 'Private party', 'Corporate', 'Festival / market', 'Other'];
const gbp = (p: number) => `£${(p / 100).toLocaleString('en-GB', { minimumFractionDigits: p % 100 ? 2 : 0, maximumFractionDigits: p % 100 ? 2 : 0 })}`;

export function estimate(p: PricingRules, s: { guests: number; pkg: string; extras: string[]; date: string; postcode: string }) {
  const pkg = p.packages.find((x) => x.slug === s.pkg) ?? p.packages[0];
  const lines: { label: string; amount: number }[] = [];
  lines.push({ label: `${pkg.name} × ${s.guests} guests`, amount: pkg.perHead * s.guests });
  const extrasChosen = new Set(s.extras);
  if (s.guests > 120) extrasChosen.add('second-oven');
  for (const ex of p.extras) {
    if (!extrasChosen.has(ex.slug)) continue;
    lines.push({ label: ex.perHead ? `${ex.name} × ${s.guests}` : ex.name, amount: ex.perHead ? ex.price * s.guests : ex.price });
  }
  let travel = 0;
  let travelNote = 'Travel: within free radius';
  const outward = s.postcode.toUpperCase().replace(/\s+/g, '').match(/^[A-Z]{1,2}/)?.[0];
  if (outward) {
    const miles = p.travel.areas[outward];
    if (miles == null) travelNote = 'Travel: outside usual area — quoted individually';
    else if (miles > p.travel.freeMiles) {
      travel = (miles - p.travel.freeMiles) * p.travel.perMile * 2;
      travelNote = `Travel: ~${miles} miles each way`;
      lines.push({ label: travelNote, amount: travel });
    }
  }
  let subtotal = lines.reduce((a, l) => a + l.amount, 0);
  let peak = false;
  let weekend = true;
  if (s.date) {
    const d = new Date(s.date + 'T12:00:00');
    const day = d.getDay();
    weekend = day === 0 || day === 6 || day === 5;
    peak = day === 6 && p.peakMonths.includes(d.getMonth());
    if (peak) {
      const uplift = Math.round((pkg.perHead * s.guests) * p.peakUplift);
      lines.push({ label: `Peak Saturday (+${p.peakUplift * 100}% on food)`, amount: uplift });
      subtotal += uplift;
    }
  }
  const minSpend = weekend ? p.minSpend.weekend : p.minSpend.weekday;
  const belowMin = subtotal < minSpend;
  const total = Math.max(subtotal, minSpend);
  return { lines, subtotal, total, low: Math.round((total * 0.95) / 100) * 100, high: Math.round((total * 1.05) / 100) * 100, minSpend, belowMin, peak, travelNote, deposit: Math.round(total * p.depositRate), pkg };
}

export default function QuoteCalculator({ pricing, forms, closedDates, phone, postcodePrefixes, isDemo }: Props) {
  const [guests, setGuests] = useState(80);
  const [pkg, setPkg] = useState(pricing.packages[1].slug);
  const [extras, setExtras] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [postcode, setPostcode] = useState('');
  const [type, setType] = useState(EVENT_TYPES[0]);
  // URL presets applied after mount (Preact skips prop patching during hydration).
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (Number(q.get('guests'))) setGuests(Number(q.get('guests')));
    if (q.get('package')) setPkg(q.get('package')!);
    if (q.get('type')) setType(q.get('type')!);
  }, []);
  const [details, setDetails] = useState({ name: '', email: '', phone: '', venue: '', message: '', _gotcha: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [sending, setSending] = useState(false);

  const est = useMemo(() => estimate(pricing, { guests, pkg, extras, date, postcode }), [pricing, guests, pkg, extras, date, postcode]);
  const closed = closedDates.includes(date);
  const inArea = postcodeInArea(postcode, postcodePrefixes);
  const today = new Date().toISOString().slice(0, 10);

  const toggleExtra = (slug: string) => setExtras((xs) => (xs.includes(slug) ? xs.filter((x) => x !== slug) : [...xs, slug]));

  async function submit(e: Event) {
    e.preventDefault();
    const errs = validate({ ...details, date, postcode }, {
      name: [{ type: 'required', message: 'Your name' }],
      email: [{ type: 'required', message: 'An email for the quote' }, { type: 'email' }],
      phone: [{ type: 'ukPhone' }],
      date: [{ type: 'required', message: 'Pick a date (or your best guess)' }, { type: 'custom', test: (v) => !closedDates.includes(v), message: 'We are closed that day — sorry!' }],
      postcode: [{ type: 'required', message: 'Venue postcode so we can price travel' }, { type: 'ukPostcode' }],
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (details._gotcha) return;
    setSending(true);
    const summary = est.lines.map((l) => `${l.label}: ${gbp(l.amount)}`).join('\n') + `\nEstimate: ${gbp(est.low)}–${gbp(est.high)} (min spend ${gbp(est.minSpend)})`;
    const r = await submitForm(forms, { ...details, eventType: type, date, postcode, guests: String(guests), package: est.pkg.name, extras: extras.join(', '), estimate: summary }, { formName: 'quote', pageUrl: location.href });
    setResult(r);
    setSending(false);
    if (r.ok) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (result?.ok) {
    return (
      <div class="max-w-2xl">
        <p class="eyebrow text-flame mb-3">{result.demo ? 'Demo — not sent' : 'Request received'}</p>
        <h2 class="display-lg">{result.demo ? 'That\'s the flow.' : 'Quote on its way.'}</h2>
        <p class="mt-5 text-lg text-cream/85">{result.demo ? 'In demo mode the request is validated but not delivered. Once a form provider is connected, Rosa gets this summary and replies within one working day with a confirmed price.' : `Rosa will email a confirmed price within one working day. Need it faster? Ring ${phone}.`}</p>
        <div class="mt-8 kraft-paper on-kraft rounded-md p-6">
          <p class="hand text-2xl">Your estimate</p>
          <ul class="mt-3 divide-y divide-char/15">{est.lines.map((l) => <li class="flex justify-between py-2"><span>{l.label}</span><span class="font-display font-700">{gbp(l.amount)}</span></li>)}</ul>
          <p class="flex justify-between mt-3 pt-3 border-t-2 border-char display-sm"><span>Estimate</span><span>{gbp(est.low)} – {gbp(est.high)}</span></p>
        </div>
        <a href="/" class="btn btn-flame mt-8">Back to the fire</a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate class="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
      <div class="grid gap-10">
        {/* 1. Event */}
        <fieldset>
          <legend class="display-md mb-5"><span class="text-flame">1.</span> The event</legend>
          <div class="flex flex-wrap gap-2 mb-6" role="radiogroup" aria-label="Event type">
            {EVENT_TYPES.map((t) => (
              <label key={t} class={`cursor-pointer px-4 py-2.5 rounded-md border-2 font-display font-700 ${type === t ? 'bg-kraft text-char border-kraft' : 'border-char-3 hover:border-kraft'}`}>
                <input type="radio" name="type" class="sr-only" checked={type === t} onChange={() => setType(t)} />{t}
              </label>
            ))}
          </div>
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="label" for="q-date">Event date</label>
              <input id="q-date" type="date" class="field" min={today} value={date} onInput={(e) => setDate((e.target as HTMLInputElement).value)} aria-invalid={!!errors.date} aria-describedby="q-date-note" />
              <p id="q-date-note" class="text-sm mt-1.5 text-ash">{errors.date ? <span class="text-error">{errors.date}</span> : closed ? <span class="text-error">We're closed that day.</span> : est.peak ? 'Peak Saturday — 10% uplift on food applies.' : date ? (new Date(date + 'T12:00:00').getDay() % 6 === 0 || new Date(date + 'T12:00:00').getDay() === 5 ? 'Weekend minimum spend applies.' : 'Weekday — lower minimum spend.') : 'Not sure? Pick your best guess.'}</p>
            </div>
            <div>
              <label class="label" for="q-pc">Venue postcode</label>
              <input id="q-pc" class="field" placeholder="e.g. NR14 8FB" autocomplete="off" value={postcode} onInput={(e) => setPostcode((e.target as HTMLInputElement).value)} aria-invalid={!!errors.postcode} aria-describedby="q-pc-note" />
              <p id="q-pc-note" class="text-sm mt-1.5 text-ash">{errors.postcode ? <span class="text-error">{errors.postcode}</span> : postcode.length < 2 ? 'Used to work out travel.' : inArea === false ? 'Outside our usual area — we\'ll quote travel individually.' : est.travelNote}</p>
            </div>
          </div>
        </fieldset>

        {/* 2. Guests */}
        <fieldset>
          <legend class="display-md mb-5"><span class="text-flame">2.</span> How many mouths?</legend>
          <div class="flex items-end justify-between gap-4 mb-3">
            <label for="q-guests" class="label !mb-0">Guests</label>
            <output for="q-guests" class="display-lg text-kraft tabular-nums" aria-live="polite">{guests}</output>
          </div>
          <input id="q-guests" type="range" class="slider" min={pricing.minGuests} max={pricing.maxGuests} step={5} value={guests} onInput={(e) => setGuests(Number((e.target as HTMLInputElement).value))} />
          <div class="flex justify-between text-sm text-ash mt-2"><span>{pricing.minGuests}</span><span>{guests > 120 ? 'Second oven added' : 'One oven'}</span><span>{pricing.maxGuests}+</span></div>
        </fieldset>

        {/* 3. Package */}
        <fieldset>
          <legend class="display-md mb-5"><span class="text-flame">3.</span> Pick a package</legend>
          <div class="grid sm:grid-cols-3 gap-3">
            {pricing.packages.map((p) => (
              <label key={p.slug} class={`cursor-pointer rounded-md p-5 border-2 flex flex-col gap-2 ${pkg === p.slug ? 'kraft-paper on-kraft border-kraft' : 'border-char-3 hover:border-kraft'}`}>
                <input type="radio" name="package" class="sr-only" checked={pkg === p.slug} onChange={() => setPkg(p.slug)} />
                <span class="display-sm">{p.name}</span>
                <span class="font-display font-800 text-2xl">{gbp(p.perHead)}<span class="text-sm font-sans font-normal opacity-70"> / head</span></span>
                <span class="text-sm opacity-80 leading-snug">{p.summary}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 4. Extras */}
        <fieldset>
          <legend class="display-md mb-5"><span class="text-flame">4.</span> Extras</legend>
          <div class="grid sm:grid-cols-2 gap-3">
            {pricing.extras.filter((x) => x.slug !== 'second-oven').map((x) => (
              <label key={x.slug} class={`cursor-pointer rounded-md p-4 border-2 flex items-start gap-3 ${extras.includes(x.slug) ? 'border-flame bg-char-2' : 'border-char-3 hover:border-kraft'}`}>
                <input type="checkbox" class="mt-1 size-5 accent-flame" checked={extras.includes(x.slug)} onChange={() => toggleExtra(x.slug)} />
                <span><span class="font-display font-700 block">{x.name} <span class="text-kraft">{x.perHead ? `+${gbp(x.price)}/head` : `+${gbp(x.price)}`}</span></span><span class="text-sm text-ash">{x.note}</span></span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 5. Details */}
        <fieldset>
          <legend class="display-md mb-5"><span class="text-flame">5.</span> Where to send it</legend>
          <div class="grid sm:grid-cols-2 gap-5">
            <div><label class="label" for="q-name">Name</label><input id="q-name" class="field" autocomplete="name" value={details.name} onInput={(e) => setDetails({ ...details, name: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.name} />{errors.name && <p class="text-error text-sm mt-1">{errors.name}</p>}</div>
            <div><label class="label" for="q-email">Email</label><input id="q-email" type="email" class="field" autocomplete="email" value={details.email} onInput={(e) => setDetails({ ...details, email: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.email} />{errors.email && <p class="text-error text-sm mt-1">{errors.email}</p>}</div>
            <div><label class="label" for="q-phone">Phone <span class="text-ash font-normal">(optional)</span></label><input id="q-phone" type="tel" class="field" autocomplete="tel" value={details.phone} onInput={(e) => setDetails({ ...details, phone: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.phone} />{errors.phone && <p class="text-error text-sm mt-1">{errors.phone}</p>}</div>
            <div><label class="label" for="q-venue">Venue name <span class="text-ash font-normal">(optional)</span></label><input id="q-venue" class="field" value={details.venue} onInput={(e) => setDetails({ ...details, venue: (e.target as HTMLInputElement).value })} /></div>
            <div class="sm:col-span-2"><label class="label" for="q-msg">Anything else?</label><textarea id="q-msg" class="field" rows={3} placeholder="Timings, dietary needs, access, the vibe…" value={details.message} onInput={(e) => setDetails({ ...details, message: (e.target as HTMLTextAreaElement).value })} /></div>
            <div class="hidden" aria-hidden="true"><label>Leave empty <input tabIndex={-1} autocomplete="off" value={details._gotcha} onInput={(e) => setDetails({ ...details, _gotcha: (e.target as HTMLInputElement).value })} /></label></div>
          </div>
          {result && !result.ok && <p class="text-error mt-4" role="alert">{result.message}</p>}
          <button type="submit" class="btn btn-flame mt-6" disabled={sending}>{sending ? 'Sending…' : isDemo ? 'Send quote request (demo)' : 'Send quote request'}</button>
        </fieldset>
      </div>

      {/* Live estimate */}
      <aside class="kraft-paper on-kraft rounded-md p-6 lg:sticky lg:top-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] rotate-[0.6deg]" aria-live="polite" aria-label="Live estimate">
        <p class="hand text-2xl">Your estimate</p>
        <p class="display-md mt-1 tabular-nums whitespace-nowrap">{gbp(est.low)}<span class="text-char/50"> – </span>{gbp(est.high)}</p>
        <p class="text-sm text-char/70 mt-1">for {guests} guests · {est.pkg.name}</p>
        <ul class="mt-5 divide-y divide-char/15 text-sm">
          {est.lines.map((l) => <li class="flex justify-between gap-3 py-2"><span>{l.label}</span><span class="font-display font-700 tabular-nums">{gbp(l.amount)}</span></li>)}
        </ul>
        {est.belowMin && <p class="mt-3 text-sm bg-char/10 rounded p-2.5">Minimum spend of <strong>{gbp(est.minSpend)}</strong> applies{date ? '' : ' (weekend rate until you pick a date)'} — your package total is {gbp(est.subtotal)}. Add guests or extras to use it fully.</p>}
        <dl class="mt-5 pt-4 border-t-2 border-char grid grid-cols-2 gap-2 text-sm">
          <dt>Deposit to hold the date</dt><dd class="text-right font-display font-700">{gbp(est.deposit)}</dd>
          <dt>Per head (all-in)</dt><dd class="text-right font-display font-700">{gbp(Math.round(est.total / guests))}</dd>
        </dl>
        <p class="mt-4 text-xs text-char/60">Estimates are ±5% and exclude VAT where applicable. Confirmed in writing within one working day.{isDemo ? ' Demo mode: nothing is sent.' : ''}</p>
      </aside>
    </form>
  );
}
