/**
 * Northgate garage booking — Preact island.
 * Steps: vehicle (reg, make/model) → work → date & drop-off time → details → done.
 * Reg plate is formatted/validated client-side; a DVLA lookup is NOT performed (needs an API key
 * — see README). Availability from @site/core demo engine.
 */
import { useEffect, useMemo, useState } from 'preact/hooks';
import { buildMonth, buildSlots, demoBusyPeriods, fromISODate, formatLongDate, demoReference, validate, dayKeyOf, type BusyPeriod, type OpeningHours, type BookingConfig, type Service } from '@site/core';

interface Props { services: Service[]; hours: OpeningHours; booking: BookingConfig; phone: string; policy?: string }
const STEPS = ['Vehicle', 'Work', 'Date & time', 'Details', 'Done'];
const REG = /^[A-Z]{2}\d{2}\s?[A-Z]{3}$|^[A-Z]\d{1,3}\s?[A-Z]{3}$|^[A-Z]{3}\s?\d{1,3}[A-Z]$|^[A-Z]{1,3}\s?\d{1,4}$|^\d{1,4}\s?[A-Z]{1,3}$/;
const gbp = (p: number) => `£${(p / 100).toFixed(0)}`;
export function formatReg(v: string) {
  const s = v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
  return s.length > 4 && /^[A-Z]{2}\d{2}/.test(s) ? `${s.slice(0, 4)} ${s.slice(4)}` : s;
}

export default function GarageBooking(p: Props) {
  const [step, setStep] = useState(0);
  const [reg, setReg] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [work, setWork] = useState<string[]>([]);
  // URL presets applied after mount (Preact skips prop patching during hydration).
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (q.get('reg')) setReg(formatReg(q.get('reg')!));
    if (q.get('service')) setWork([q.get('service')!]);
  }, []);
  const [courtesy, setCourtesy] = useState(false);
  const [wait, setWait] = useState(false);
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [busy, setBusy] = useState<BusyPeriod[] | null>(null);
  const [d, setD] = useState({ name: '', phone: '', email: '', notes: '', _gotcha: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ ref: string } | null>(null);
  const [sending, setSending] = useState(false);
  const isDemo = p.booking.provider === 'demo';

  const chosen = p.services.filter((s) => work.includes(s.slug));
  const combo = work.includes('mot') && work.includes('full-service');
  const total = chosen.reduce((a, s) => a + (s.pricePence ?? 0), 0) - (combo ? 1500 : 0);
  const mins = chosen.reduce((a, s) => a + (s.durationMins ?? 60), 0);
  const fromPrice = chosen.some((s) => s.price?.toLowerCase().includes('from'));
  const regOk = REG.test(reg.replace(/\s/g, '').replace(/^([A-Z]{2}\d{2})([A-Z]{3})$/, '$1 $2')) || REG.test(reg);

  const cells = useMemo(() => buildMonth(month.y, month.m, { hours: p.hours, today, horizonDays: p.booking.horizonDays ?? 28, closedDates: p.booking.closedDates, minNoticeHours: p.booking.minNoticeHours, now: today }), [month, p.hours, p.booking, today]);
  useEffect(() => { if (!date) return; const open = p.hours[dayKeyOf(fromISODate(date))]; setBusy(open ? demoBusyPeriods(date, open, 'ramp', 0.35) : []); }, [date]);
  const slots = useMemo(() => (date && busy ? buildSlots({ hours: p.hours, iso: date, durationMins: 30, intervalMins: p.booking.slotIntervalMins ?? 30, busy, minNoticeHours: p.booking.minNoticeHours ?? 0, now: today }) : []), [date, busy, mins, p.hours, p.booking, today]);
  const dropOff = slots.filter((s) => s.start < 13 * 60 + 1); // drop-off times through to 13:00

  function next() { setStep((s) => Math.min(4, s + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function back() { setStep((s) => Math.max(0, s - 1)); }

  async function confirm(e: Event) {
    e.preventDefault();
    const errs = validate(d, { name: [{ type: 'required', message: 'Your name' }], phone: [{ type: 'required', message: 'A mobile — we ring before any extra work' }, { type: 'ukPhone' }], email: [{ type: 'required', message: 'Email for the confirmation' }, { type: 'email' }] });
    setErrors(errs); if (Object.keys(errs).length || d._gotcha) return;
    setSending(true); await new Promise((r) => setTimeout(r, 600));
    setResult({ ref: demoReference('NG', `${reg}${date}${time}`) }); setSending(false); setStep(4); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const card = (
    <aside class="job-card p-5 lg:sticky lg:top-6 self-start" aria-label="Job card">
      <div class="flex items-center justify-between gap-3"><p class="eyebrow">Job card</p><span class={`chip ${step === 4 ? 'chip-green' : 'chip-amber'}`}>{step === 4 ? (isDemo ? 'Demo' : 'Booked') : 'Draft'}</span></div>
      <p class="plate mt-3 !text-xl">{reg || '— — —'}</p>
      {vehicle && <p class="text-sm mt-1 text-steel">{vehicle}</p>}
      <dl class="mt-4 text-sm grid gap-2">
        {chosen.length ? chosen.map((s) => <div class="flex justify-between gap-3"><dt>{s.name}</dt><dd class="mono">{s.price}</dd></div>) : <div class="text-steel">No work selected</div>}
        {combo && <div class="flex justify-between gap-3 text-green"><dt>MOT + full service saving</dt><dd class="mono">−£15</dd></div>}
        {courtesy && <div class="flex justify-between gap-3"><dt>Courtesy car</dt><dd class="mono">Free</dd></div>}
      </dl>
      <div class="mt-4 pt-3 border-t hairline flex justify-between items-baseline"><span class="font-display font-600">Estimate</span><span class="mono text-xl">{chosen.length ? `${fromPrice ? 'from ' : ''}${gbp(total)}` : '—'}</span></div>
      <p class="text-xs text-steel mt-1">{mins ? `About ${mins >= 120 ? `${Math.round(mins / 60)} hours` : `${mins} min`}` : ''}{date ? ` · ${formatLongDate(fromISODate(date))}${time ? `, drop-off ${time}` : ''}` : ''}</p>
      {isDemo && <p class="text-xs text-steel mt-3 border-t hairline pt-3">Demo mode: availability is simulated and nothing is saved.</p>}
    </aside>
  );

  if (step === 4 && result) {
    return (
      <div class="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div>
          <span class="chip chip-green">{isDemo ? 'Demo booking' : 'Booked'}</span>
          <h2 class="display-lg mt-3">{isDemo ? 'That\'s the flow.' : 'You\'re booked in.'}</h2>
          <p class="mt-3 text-ink/80 max-w-lg">{isDemo ? 'Nothing has been saved and no email sent in demo mode. When connected to a booking provider, this screen confirms the real job and emails ' + d.email + '.' : `Confirmation sent to ${d.email}. We'll text ${d.phone} when the car is ready.`}</p>
          <dl class="mt-6 job-card p-5 grid sm:grid-cols-2 gap-4 text-sm">
            <div><dt class="eyebrow">Reference</dt><dd class="mono text-lg mt-1">{result.ref}</dd></div>
            <div><dt class="eyebrow">Vehicle</dt><dd class="mt-1">{reg}{vehicle ? ` · ${vehicle}` : ''}</dd></div>
            <div><dt class="eyebrow">Work</dt><dd class="mt-1">{chosen.map((s) => s.name).join(', ')}</dd></div>
            <div><dt class="eyebrow">Drop-off</dt><dd class="mt-1">{formatLongDate(fromISODate(date))}, {time}</dd></div>
          </dl>
          {p.policy && <p class="mt-4 text-sm text-steel">{p.policy}</p>}
          <div class="mt-6 flex gap-3 flex-wrap"><a href="/" class="btn btn-navy">Home</a><button type="button" class="btn btn-outline" onClick={() => location.reload()}>Book another</button></div>
        </div>
        {card}
      </div>
    );
  }

  return (
    <div class="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
      <div class="min-w-0">
        <ol class="flex gap-1 mb-8" aria-label="Booking progress">
          {STEPS.map((l, i) => <li key={l} class="flex-1 min-w-0"><button type="button" disabled={i > step} onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined} class={`w-full text-left px-2 py-2 border-t-4 ${i === step ? 'border-red' : i < step ? 'border-navy' : 'border-pale-2 text-steel'}`}><span class="mono text-[10px] block">0{i + 1}</span><span class="font-display font-600 text-xs sm:text-sm block truncate">{l}</span></button></li>)}
        </ol>

        {step === 0 && (
          <div>
            <h2 class="display-md mb-1">Your vehicle</h2><p class="text-sm text-steel mb-5">Enter your registration so we can look up the schedule and parts.</p>
            <label class="label" for="g-reg">Registration</label>
            <input id="g-reg" class="plate" placeholder="AB12 CDE" autocomplete="off" spellcheck={false} value={reg} onInput={(e) => setReg(formatReg((e.target as HTMLInputElement).value))} aria-invalid={reg.length > 0 && !regOk} aria-describedby="g-reg-note" />
            <p id="g-reg-note" class="text-sm mt-2 text-steel">{reg.length === 0 ? 'UK plates only.' : regOk ? '✓ Looks like a UK registration' : 'That doesn\'t look like a UK registration yet'}</p>
            <p class="text-xs text-steel mt-1">Vehicle look-up by registration needs a DVLA/VES API key — not connected in this demo, so tell us the make and model below.</p>
            <label class="label mt-5" for="g-veh">Make &amp; model <span class="font-normal text-steel">(optional)</span></label>
            <input id="g-veh" class="field max-w-md" placeholder="e.g. Ford Focus 1.0 EcoBoost, 2019" value={vehicle} onInput={(e) => setVehicle((e.target as HTMLInputElement).value)} />
            <div class="mt-8 flex justify-end"><button type="button" class="btn btn-red" disabled={!regOk} onClick={next}>Next: the work →</button></div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 class="display-md mb-1">What needs doing?</h2><p class="text-sm text-steel mb-5">Pick one or more. MOT + full service on the same day saves £15.</p>
            <div class="grid sm:grid-cols-2 gap-3">
              {p.services.filter((s) => s.bookable).map((s) => <label key={s.slug} class="choice items-start"><input type="checkbox" class="mt-1" checked={work.includes(s.slug)} onChange={() => setWork((w) => (w.includes(s.slug) ? w.filter((x) => x !== s.slug) : [...w, s.slug]))} /><span class="flex-1"><span class="font-display font-600 block">{s.name} <span class="mono text-sm text-navy float-right">{s.price}</span></span><span class="text-xs text-steel block mt-0.5">{s.summary}</span></span></label>)}
            </div>
            <div class="grid sm:grid-cols-2 gap-3 mt-5">
              <label class="choice"><input type="checkbox" checked={courtesy} onChange={() => setCourtesy(!courtesy)} /><span>Courtesy car needed <span class="text-xs text-steel block">Free for repairs over £150; subject to availability, over-25s</span></span></label>
              <label class="choice"><input type="checkbox" checked={wait} onChange={() => setWait(!wait)} /><span>I'll wait with the car <span class="text-xs text-steel block">Fine for MOT, tyres, diagnostics, air con</span></span></label>
            </div>
            <div class="mt-8 flex justify-between gap-3"><button type="button" class="btn btn-outline" onClick={back}>← Back</button><button type="button" class="btn btn-red" disabled={!work.length} onClick={next}>Next: date &amp; time →</button></div>
          </div>
        )}

        {step === 2 && (
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <div class="flex items-center justify-between mb-3"><h2 class="display-md">{new Date(month.y, month.m, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h2><div class="flex gap-1"><button type="button" class="size-10 rounded-md border border-steel" aria-label="Previous month" disabled={month.y === today.getFullYear() && month.m === today.getMonth()} onClick={() => { const x = new Date(month.y, month.m - 1, 1); setMonth({ y: x.getFullYear(), m: x.getMonth() }); }}>‹</button><button type="button" class="size-10 rounded-md border border-steel" aria-label="Next month" onClick={() => { const x = new Date(month.y, month.m + 1, 1); setMonth({ y: x.getFullYear(), m: x.getMonth() }); }}>›</button></div></div>
              <div class="grid grid-cols-7 gap-1 text-center mono text-[10px] text-steel mb-1" aria-hidden="true">{['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map((x) => <span key={x}>{x}</span>)}</div>
              <div class="grid grid-cols-7 gap-1" role="grid" aria-label="Choose a date">{cells.map((c) => <button key={c.iso} type="button" role="gridcell" disabled={!c.selectable} aria-selected={date === c.iso} aria-label={formatLongDate(c.date) + (c.selectable ? '' : ', unavailable')} onClick={() => { setDate(c.iso); setTime(''); }} class={`aspect-square rounded-md mono text-sm border ${!c.inMonth ? 'opacity-0 pointer-events-none' : ''} ${date === c.iso ? 'bg-navy text-white border-navy' : c.selectable ? 'border-pale-2 hover:border-navy' : 'border-transparent text-steel/50 line-through'}`}>{c.date.getDate()}</button>)}</div>
              <p class="mt-2 text-xs text-steel">Saturday mornings only. Closed Sunday.</p>
            </div>
            <div>
              <h2 class="display-md mb-3">{date ? 'Drop-off time' : 'Pick a day first'}</h2>
              {date && dropOff.filter((s) => s.available).length === 0 && <p class="job-card p-4 text-sm">Nothing free that day for {mins >= 120 ? 'that much work' : 'that'} — try another.</p>}
              {date && <div class="grid grid-cols-3 gap-2">{dropOff.map((s) => <button key={s.time} type="button" disabled={!s.available} aria-pressed={time === s.time} onClick={() => setTime(s.time)} class={`py-2.5 rounded-md mono text-sm border ${time === s.time ? 'bg-navy text-white border-navy' : s.available ? 'border-pale-2 hover:border-navy' : 'border-transparent text-steel/50 line-through'}`}>{s.time}</button>)}</div>}
              {date && <p class="mt-3 text-xs text-steel">Drop-off between 08:00 and 13:00; we'll text when it's ready. Key safe from 07:00 if you tell us in the notes.</p>}
            </div>
            <div class="md:col-span-2 flex justify-between gap-3"><button type="button" class="btn btn-outline" onClick={back}>← Back</button><button type="button" class="btn btn-red" disabled={!date || !time} onClick={next}>Next: your details →</button></div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={confirm} noValidate class="grid gap-4 max-w-xl">
            <h2 class="display-md">Your details</h2>
            <div class="grid sm:grid-cols-2 gap-4">
              <div><label class="label" for="g-name">Name</label><input id="g-name" class="field" autocomplete="name" value={d.name} onInput={(e) => setD({ ...d, name: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.name} />{errors.name && <p class="text-error text-sm mt-1">{errors.name}</p>}</div>
              <div><label class="label" for="g-phone">Mobile</label><input id="g-phone" type="tel" class="field" autocomplete="tel" value={d.phone} onInput={(e) => setD({ ...d, phone: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.phone} />{errors.phone && <p class="text-error text-sm mt-1">{errors.phone}</p>}</div>
              <div class="sm:col-span-2"><label class="label" for="g-email">Email</label><input id="g-email" type="email" class="field" autocomplete="email" value={d.email} onInput={(e) => setD({ ...d, email: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.email} />{errors.email && <p class="text-error text-sm mt-1">{errors.email}</p>}</div>
              <div class="sm:col-span-2"><label class="label" for="g-notes">Notes <span class="font-normal text-steel">(symptoms, noises, key safe drop-off…)</span></label><textarea id="g-notes" class="field" rows={3} value={d.notes} onInput={(e) => setD({ ...d, notes: (e.target as HTMLTextAreaElement).value })} /></div>
            </div>
            <div class="hidden" aria-hidden="true"><label>Leave empty <input tabIndex={-1} autocomplete="off" value={d._gotcha} onInput={(e) => setD({ ...d, _gotcha: (e.target as HTMLInputElement).value })} /></label></div>
            {p.policy && <p class="text-sm text-steel">{p.policy}</p>}
            <div class="flex justify-between gap-3"><button type="button" class="btn btn-outline" onClick={back}>← Back</button><button type="submit" class="btn btn-red" disabled={sending}>{sending ? 'Booking…' : isDemo ? 'Confirm (demo)' : 'Confirm booking'}</button></div>
          </form>
        )}
      </div>
      {card}
    </div>
  );
}
