/**
 * Muddy Paws groom booking — Preact island.
 * Steps: your dog (size, coat) → groom (service, add-ons) → date & time → details → confirmation.
 * Prices come from `groomPrice()`; durations from `groomMins()`; availability from @site/core.
 */
import { useEffect, useMemo, useState } from 'preact/hooks';
import { buildMonth, buildSlots, groupSlots, demoBusyPeriods, fromISODate, formatLongDate, demoReference, validate, dayKeyOf, type BusyPeriod, type OpeningHours, type BookingConfig, type Service } from '@site/core';

interface SizeDef { slug: string; name: string; weight: string; examples: string; multiplier: number; mins: number }
interface CoatDef { slug: string; name: string; examples: string; extraPence: number }
interface AddonDef { slug: string; name: string; pricePence: number; mins: number }
interface Props {
  services: Service[]; sizes: readonly SizeDef[]; coats: readonly CoatDef[]; addons: readonly AddonDef[];
  hours: OpeningHours; booking: BookingConfig; phone: string; policy?: string;
  /** Precomputed price/time tables: price[service][size][coat], mins[service][size]. */
  priceTable: Record<string, Record<string, Record<string, number>>>;
  minsTable: Record<string, Record<string, number>>;
  /** Inline SVG markup for each size key (rendered via dangerouslySetInnerHTML). */
  dogSvgs: Record<string, string>;
}
const gbp = (p: number) => `£${(p / 100).toFixed(p % 100 ? 2 : 0)}`;
const STEPS = ['Your dog', 'The groom', 'When', 'Details', 'Done'];

export default function GroomBooking(p: Props) {
  const params = typeof location !== 'undefined' ? new URLSearchParams(location.search) : null;
  const [step, setStep] = useState(0);
  const [size, setSize] = useState(params?.get('size') ?? '');
  const [coat, setCoat] = useState('');
  const [service, setService] = useState(params?.get('service') ?? '');
  const [addons, setAddons] = useState<string[]>([]);
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [busy, setBusy] = useState<BusyPeriod[] | null>(null);
  const [d, setD] = useState({ owner: '', dog: '', breed: '', phone: '', email: '', notes: '', nervous: false, vaccinated: false, _gotcha: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ ref: string; demo: boolean } | null>(null);
  const [sending, setSending] = useState(false);
  const isDemo = p.booking.provider === 'demo';

  const svc = p.services.find((s) => s.slug === service);
  const price = svc && size ? (p.priceTable[service]?.[size]?.[coat || 'short'] ?? svc.pricePence ?? 0) : 0;
  const addonTotal = addons.reduce((a, s) => a + (p.addons.find((x) => x.slug === s)?.pricePence ?? 0), 0);
  const mins = svc && size ? (p.minsTable[service]?.[size] ?? svc.durationMins ?? 60) + addons.reduce((a, s) => a + (p.addons.find((x) => x.slug === s)?.mins ?? 0), 0) : 0;
  const total = price + addonTotal;
  const needsCoat = !!svc?.price?.startsWith('From');

  const cells = useMemo(() => buildMonth(month.y, month.m, { hours: p.hours, today, horizonDays: p.booking.horizonDays ?? 42, closedDates: p.booking.closedDates, minNoticeHours: p.booking.minNoticeHours, now: today }), [month, p.hours, p.booking, today]);

  useEffect(() => {
    if (!date) return;
    const open = p.hours[dayKeyOf(fromISODate(date))];
    setBusy(open ? demoBusyPeriods(date, open, 'table', 0.4) : []);
  }, [date]);

  const slots = useMemo(() => (date && busy ? buildSlots({ hours: p.hours, iso: date, durationMins: Math.max(15, mins), intervalMins: p.booking.slotIntervalMins ?? 30, busy, minNoticeHours: p.booking.minNoticeHours ?? 0, now: today }) : []), [date, busy, mins, p.hours, p.booking, today]);
  const groups = useMemo(() => groupSlots(slots), [slots]);

  function next() { setStep((s) => Math.min(4, s + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function back() { setStep((s) => Math.max(0, s - 1)); }

  async function confirm(e: Event) {
    e.preventDefault();
    const errs = validate({ ...d, nervous: '', vaccinated: d.vaccinated ? 'y' : '' }, {
      owner: [{ type: 'required', message: 'Your name' }],
      dog: [{ type: 'required', message: 'Your dog\'s name' }],
      phone: [{ type: 'required', message: 'A mobile so we can text when they\'re ready' }, { type: 'ukPhone' }],
      email: [{ type: 'required', message: 'An email for the confirmation' }, { type: 'email' }],
      vaccinated: [{ type: 'required', message: 'Please confirm vaccinations are up to date' }],
    });
    setErrors(errs);
    if (Object.keys(errs).length || d._gotcha) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 600));
    setResult({ ref: demoReference('MP', `${date}${time}${d.email}`), demo: isDemo });
    setSending(false);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const sizeDef = p.sizes.find((s) => s.slug === size);
  const summary = (
    <aside class="bubble p-5 self-start lg:sticky lg:top-6 mb-8 lg:mb-0" aria-label="Booking summary">
      <p class="eyebrow opacity-70">Your booking</p>
      <dl class="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.95rem]">
        <dt class="font-bold">Dog</dt><dd>{sizeDef ? `${sizeDef.name} (${sizeDef.weight})` : '—'}{coat ? `, ${p.coats.find((c) => c.slug === coat)?.name.toLowerCase()} coat` : ''}</dd>
        <dt class="font-bold">Groom</dt><dd>{svc ? svc.name : '—'}{addons.length ? ` + ${addons.length} extra${addons.length > 1 ? 's' : ''}` : ''}</dd>
        <dt class="font-bold">When</dt><dd>{date ? `${formatLongDate(fromISODate(date))}${time ? `, ${time}` : ''}` : '—'}</dd>
        <dt class="font-bold">Time</dt><dd>{mins ? `about ${mins} min` : '—'}</dd>
      </dl>
      <p class="mt-4 pt-3 border-t-[3px] border-cocoa/15 flex justify-between items-baseline"><span class="font-bold">Price</span><span class="display-md">{total ? gbp(total) : '—'}</span></p>
      {isDemo && <p class="mt-3 text-xs opacity-70">Demo mode: availability is simulated and no booking is saved.</p>}
    </aside>
  );

  if (step === 4 && result) {
    return (
      <div class="max-w-2xl">
        <span class="sticker bg-coral" data-pop>{result.demo ? 'Demo booking' : 'Booked!'}</span>
        <h2 class="display-lg mt-4">{result.demo ? 'That\'s how it works.' : `See you soon, ${d.dog}!`}</h2>
        <div class="mt-6 bg-cream border-[3px] border-cocoa rounded-3xl p-6 grid gap-2 text-lg shadow-[6px_6px_0_#4a2b1e]">
          <p><span class="eyebrow opacity-70 block">Reference</span><span class="font-display text-2xl">{result.ref}</span></p>
          <p><span class="eyebrow opacity-70 block">Groom</span>{svc?.name} for {d.dog} ({sizeDef?.name}) · {gbp(total)}</p>
          <p><span class="eyebrow opacity-70 block">When</span>{formatLongDate(fromISODate(date))} at {time} · about {mins} min</p>
        </div>
        <p class="mt-5 text-cocoa/80">{result.demo ? 'Nothing has been saved and no email is sent in demo mode. When connected to a booking provider, this screen confirms the real appointment and emails ' + d.email + '.' : `A confirmation has gone to ${d.email}. We'll text ${d.phone} when ${d.dog} is nearly ready.`}</p>
        {p.policy && <p class="mt-3 text-sm opacity-70">{p.policy}</p>}
        <div class="mt-8 flex gap-3 flex-wrap"><a href="/" class="btn btn-teal">Back home</a><button type="button" class="btn btn-cream" onClick={() => location.reload()}>Book another dog</button></div>
      </div>
    );
  }

  return (
    <div class="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
      <div>
        <ol class="flex gap-1.5 mb-8 flex-wrap" aria-label="Booking progress">
          {STEPS.map((l, i) => (
            <li key={l}><button type="button" disabled={i > step} onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined} class={`sticker !text-sm ${i === step ? '!bg-teal !text-cream' : i < step ? '!bg-mustard' : 'opacity-50'}`}>{i + 1}. {l}</button></li>
          ))}
        </ol>

        {step === 0 && (
          <div>
            <h2 class="display-md mb-2">How big is your dog?</h2>
            <p class="text-cocoa/75 mb-5">Pick the nearest. Prices and times scale with size.</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3" role="radiogroup" aria-label="Dog size">
              {p.sizes.map((s) => (
                <label key={s.slug} class={`group cursor-pointer rounded-3xl border-[3px] border-cocoa p-3 flex flex-col items-center text-center transition-colors ${size === s.slug ? 'bg-teal text-cream' : 'bg-cream hover:bg-cream-2'}`}>
                  <input type="radio" name="size" class="sr-only" checked={size === s.slug} onChange={() => setSize(s.slug)} />
                  <span class="w-full" dangerouslySetInnerHTML={{ __html: p.dogSvgs[s.slug] }} />
                  <span class="font-display font-700 text-lg mt-1">{s.name}</span>
                  <span class="text-xs opacity-80">{s.weight}</span>
                  <span class="text-[11px] opacity-70 mt-1 leading-tight">{s.examples}</span>
                </label>
              ))}
            </div>
            <h2 class="display-md mt-10 mb-2">And the coat?</h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" role="radiogroup" aria-label="Coat type">
              {p.coats.map((c) => (
                <label key={c.slug} class="choice"><input type="radio" name="coat" class="sr-only" checked={coat === c.slug} onChange={() => setCoat(c.slug)} /><span><span class="block">{c.name}</span><span class="block text-xs font-normal opacity-75">{c.examples}{c.extraPence ? ` · +${gbp(c.extraPence)} on clipped grooms` : ''}</span></span></label>
              ))}
            </div>
            <div class="mt-8 flex justify-end"><button type="button" class="btn btn-coral" disabled={!size || !coat} onClick={next}>Next: the groom →</button></div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 class="display-md mb-5">Which groom?</h2>
            <div class="grid gap-3" role="radiogroup" aria-label="Service">
              {p.services.filter((s) => s.bookable).map((s) => {
                const pr = s.price?.startsWith('From') ? p.priceTable[s.slug]?.[size]?.[coat] : s.pricePence;
                const mn = s.price?.startsWith('From') ? p.minsTable[s.slug]?.[size] : s.durationMins;
                return (
                  <label key={s.slug} class={`cursor-pointer rounded-3xl border-[3px] border-cocoa p-4 sm:p-5 grid grid-cols-[1fr_auto] gap-4 items-center ${service === s.slug ? 'bg-teal text-cream' : 'bg-cream hover:bg-cream-2'}`}>
                    <input type="radio" name="service" class="sr-only" checked={service === s.slug} onChange={() => setService(s.slug)} />
                    <span><span class="display-sm block">{s.name}</span><span class="text-sm opacity-85 block mt-1">{s.summary}</span><span class="text-xs opacity-70 block mt-1.5">about {mn} min</span></span>
                    <span class="display-md">{gbp(pr ?? 0)}</span>
                  </label>
                );
              })}
            </div>
            <h3 class="display-sm mt-8 mb-3">Add-ons</h3>
            <div class="grid sm:grid-cols-2 gap-3">
              {p.addons.map((a) => (
                <label key={a.slug} class="choice"><input type="checkbox" class="sr-only" checked={addons.includes(a.slug)} onChange={() => setAddons((xs) => (xs.includes(a.slug) ? xs.filter((x) => x !== a.slug) : [...xs, a.slug]))} /><span class="flex-1">{a.name}</span><span>+{gbp(a.pricePence)}</span></label>
              ))}
            </div>
            <div class="mt-8 flex justify-between gap-3"><button type="button" class="btn btn-cream" onClick={back}>← Back</button><button type="button" class="btn btn-coral" disabled={!service} onClick={next}>Next: pick a time →</button></div>
          </div>
        )}

        {step === 2 && (
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <div class="flex items-center justify-between mb-3">
                <h2 class="display-sm">{new Date(month.y, month.m, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h2>
                <div class="flex gap-2">
                  <button type="button" class="size-11 rounded-full border-[3px] border-cocoa bg-cream" aria-label="Previous month" disabled={month.y === today.getFullYear() && month.m === today.getMonth()} onClick={() => { const x = new Date(month.y, month.m - 1, 1); setMonth({ y: x.getFullYear(), m: x.getMonth() }); }}>‹</button>
                  <button type="button" class="size-11 rounded-full border-[3px] border-cocoa bg-cream" aria-label="Next month" onClick={() => { const x = new Date(month.y, month.m + 1, 1); setMonth({ y: x.getFullYear(), m: x.getMonth() }); }}>›</button>
                </div>
              </div>
              <div class="grid grid-cols-7 gap-1 text-center text-xs font-bold opacity-60 mb-1" aria-hidden="true">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x, i) => <span key={i}>{x}</span>)}</div>
              <div class="grid grid-cols-7 gap-1" role="grid" aria-label="Choose a date">
                {cells.map((c) => (
                  <button key={c.iso} type="button" role="gridcell" disabled={!c.selectable} aria-selected={date === c.iso} aria-label={formatLongDate(c.date) + (c.selectable ? '' : ', unavailable')} onClick={() => { setDate(c.iso); setTime(''); }}
                    class={`aspect-square rounded-full font-display font-600 text-sm border-[3px] ${!c.inMonth ? 'opacity-0 pointer-events-none' : ''} ${date === c.iso ? 'bg-teal text-cream border-cocoa' : c.selectable ? 'bg-cream border-cocoa hover:bg-coral' : 'border-transparent opacity-30 line-through'}`}>{c.date.getDate()}</button>
                ))}
              </div>
              <p class="mt-3 text-xs opacity-70">Closed Sunday &amp; Monday. Late nights Thursday.</p>
            </div>
            <div>
              <h2 class="display-sm mb-3">{date ? formatLongDate(fromISODate(date)) : 'Pick a day first'}</h2>
              {date && slots.filter((s) => s.available).length === 0 && <p class="bubble p-4">Nothing free that day for a {mins}-minute groom — try another.</p>}
              {date && groups.map((g) => (
                <div key={g.label} class="mb-4">
                  <p class="eyebrow opacity-60 mb-2">{g.label}</p>
                  <div class="grid grid-cols-3 gap-2">
                    {g.slots.map((s) => <button key={s.time} type="button" disabled={!s.available} aria-pressed={time === s.time} onClick={() => setTime(s.time)} class={`py-2.5 rounded-full font-display font-600 border-[3px] ${time === s.time ? 'bg-teal text-cream border-cocoa' : s.available ? 'bg-cream border-cocoa hover:bg-coral' : 'border-transparent opacity-30 line-through'}`}>{s.time}</button>)}
                  </div>
                </div>
              ))}
            </div>
            <div class="md:col-span-2 flex justify-between gap-3"><button type="button" class="btn btn-cream" onClick={back}>← Back</button><button type="button" class="btn btn-coral" disabled={!date || !time} onClick={next}>Next: your details →</button></div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={confirm} noValidate class="grid gap-5 max-w-xl">
            <h2 class="display-md">Nearly there</h2>
            <div class="grid sm:grid-cols-2 gap-5">
              <div><label class="label" for="b-owner">Your name</label><input id="b-owner" class="field" autocomplete="name" value={d.owner} onInput={(e) => setD({ ...d, owner: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.owner} />{errors.owner && <p class="text-error text-sm mt-1">{errors.owner}</p>}</div>
              <div><label class="label" for="b-dog">Dog's name</label><input id="b-dog" class="field" value={d.dog} onInput={(e) => setD({ ...d, dog: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.dog} />{errors.dog && <p class="text-error text-sm mt-1">{errors.dog}</p>}</div>
              <div><label class="label" for="b-breed">Breed <span class="font-normal opacity-60">(or best guess)</span></label><input id="b-breed" class="field" value={d.breed} onInput={(e) => setD({ ...d, breed: (e.target as HTMLInputElement).value })} /></div>
              <div><label class="label" for="b-phone">Mobile</label><input id="b-phone" type="tel" class="field" autocomplete="tel" value={d.phone} onInput={(e) => setD({ ...d, phone: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.phone} />{errors.phone && <p class="text-error text-sm mt-1">{errors.phone}</p>}</div>
              <div class="sm:col-span-2"><label class="label" for="b-email">Email</label><input id="b-email" type="email" class="field" autocomplete="email" value={d.email} onInput={(e) => setD({ ...d, email: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.email} />{errors.email && <p class="text-error text-sm mt-1">{errors.email}</p>}</div>
              <div class="sm:col-span-2"><label class="label" for="b-notes">Anything we should know?</label><textarea id="b-notes" class="field" rows={3} placeholder="Matting, sore spots, what you'd like doing…" value={d.notes} onInput={(e) => setD({ ...d, notes: (e.target as HTMLTextAreaElement).value })} /></div>
            </div>
            <label class="choice"><input type="checkbox" class="sr-only" checked={d.nervous} onChange={() => setD({ ...d, nervous: !d.nervous })} /><span>{d.nervous ? '✓ ' : ''}My dog is nervous or hasn't been groomed before</span></label>
            <label class="choice"><input type="checkbox" class="sr-only" checked={d.vaccinated} onChange={() => setD({ ...d, vaccinated: !d.vaccinated })} /><span>{d.vaccinated ? '✓ ' : ''}Vaccinations are up to date and my dog is flea-free</span></label>
            {errors.vaccinated && <p class="text-error text-sm -mt-3">{errors.vaccinated}</p>}
            <div class="hidden" aria-hidden="true"><label>Leave empty <input tabIndex={-1} autocomplete="off" value={d._gotcha} onInput={(e) => setD({ ...d, _gotcha: (e.target as HTMLInputElement).value })} /></label></div>
            {p.policy && <p class="text-sm opacity-70">{p.policy}</p>}
            <div class="flex justify-between gap-3"><button type="button" class="btn btn-cream" onClick={back}>← Back</button><button type="submit" class="btn btn-coral" disabled={sending}>{sending ? 'Booking…' : isDemo ? 'Confirm (demo)' : 'Confirm booking'}</button></div>
          </form>
        )}
      </div>
      {summary}
    </div>
  );
}
