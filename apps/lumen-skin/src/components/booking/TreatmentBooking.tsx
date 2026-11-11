/**
 * Lumen treatment booking — Preact island. treatment → date & time → details → done.
 * Rendered only when booking.provider is 'demo' or 'custom'; Cal.com/Calendly embed otherwise.
 */
import { useEffect, useMemo, useState } from 'preact/hooks';
import { buildMonth, buildSlots, groupSlots, demoBusyPeriods, fromISODate, formatLongDate, demoReference, validate, dayKeyOf, type BusyPeriod, type OpeningHours, type BookingConfig, type Service } from '@site/core';

interface Props { services: Service[]; hours: OpeningHours; booking: BookingConfig; phone: string; policy?: string }
const STEPS = ['Treatment', 'When', 'Details', 'Done'];
const gbp = (p: number) => (p === 0 ? 'Free' : `£${(p / 100).toFixed(0)}`);

export default function TreatmentBooking(p: Props) {
  const [step, setStep] = useState(0);
  const [slug, setSlug] = useState('');
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [busy, setBusy] = useState<BusyPeriod[] | null>(null);
  const [d, setD] = useState({ name: '', phone: '', email: '', first: true, notes: '', _gotcha: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ ref: string } | null>(null);
  const [sending, setSending] = useState(false);
  const isDemo = p.booking.provider === 'demo';
  useEffect(() => { const q = new URLSearchParams(location.search); if (q.get('treatment')) setSlug(q.get('treatment')!); }, []);

  const svc = p.services.find((s) => s.slug === slug);
  const mins = svc?.durationMins ?? 60;
  const cells = useMemo(() => buildMonth(month.y, month.m, { hours: p.hours, today, horizonDays: p.booking.horizonDays ?? 42, closedDates: p.booking.closedDates, minNoticeHours: p.booking.minNoticeHours, now: today }), [month, p.hours, p.booking, today]);
  useEffect(() => { if (!date) return; const open = p.hours[dayKeyOf(fromISODate(date))]; setBusy(open ? demoBusyPeriods(date, open, 'room', 0.5) : []); }, [date]);
  const slots = useMemo(() => (date && busy ? buildSlots({ hours: p.hours, iso: date, durationMins: mins, intervalMins: p.booking.slotIntervalMins ?? 15, busy, minNoticeHours: p.booking.minNoticeHours ?? 0, now: today }) : []), [date, busy, mins, p.hours, p.booking, today]);
  const groups = useMemo(() => groupSlots(slots), [slots]);
  const next = () => { setStep((s) => Math.min(3, s + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const back = () => setStep((s) => Math.max(0, s - 1));

  async function confirm(e: Event) {
    e.preventDefault();
    const errs = validate(d as unknown as Record<string, string>, { name: [{ type: 'required', message: 'Your name' }], phone: [{ type: 'required', message: 'A mobile for your reminder' }, { type: 'ukPhone' }], email: [{ type: 'required', message: 'Email for the confirmation' }, { type: 'email' }] });
    setErrors(errs); if (Object.keys(errs).length || d._gotcha) return;
    setSending(true); await new Promise((r) => setTimeout(r, 600));
    setResult({ ref: demoReference('LU', `${slug}${date}${time}${d.email}`) }); setSending(false); setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const summary = (
    <aside class="panel p-6 self-start lg:sticky lg:top-6" aria-label="Booking summary">
      <p class="eyebrow">Your booking</p>
      <dl class="mt-3 grid gap-2 text-sm">
        <div class="flex justify-between gap-3"><dt class="text-mute">Treatment</dt><dd class="text-right font-medium">{svc ? svc.name : '—'}</dd></div>
        <div class="flex justify-between gap-3"><dt class="text-mute">When</dt><dd class="text-right">{date ? `${formatLongDate(fromISODate(date))}${time ? `, ${time}` : ''}` : '—'}</dd></div>
        <div class="flex justify-between gap-3"><dt class="text-mute">Length</dt><dd>{svc ? `${mins} min` : '—'}</dd></div>
        <div class="flex justify-between gap-3 border-t border-lilac-2 pt-2 mt-1"><dt class="font-medium">Price</dt><dd class="display-sm">{svc ? gbp(svc.pricePence ?? 0) : '—'}</dd></div>
      </dl>
      {isDemo && <p class="mt-4 text-xs text-mute">Demo mode: availability is simulated and nothing is saved. Set <code>booking.provider</code> to <code>calcom</code> to go live.</p>}
    </aside>
  );

  if (step === 3 && result) {
    return (
      <div class="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div>
          <p class="eyebrow">{isDemo ? 'Demo booking' : 'Confirmed'}</p>
          <h2 class="display-lg mt-2">{isDemo ? 'That\'s how it works.' : 'See you soon.'}</h2>
          <p class="mt-4 text-plum/80 max-w-lg">{isDemo ? `In demo mode nothing is saved. Connected to Cal.com or a custom API, this confirms the appointment and emails ${d.email}.` : `Confirmation sent to ${d.email}; a reminder text goes to ${d.phone} the day before.`}</p>
          <div class="panel p-6 mt-6 grid sm:grid-cols-2 gap-4 text-sm"><div><p class="eyebrow">Reference</p><p class="display-sm mt-1">{result.ref}</p></div><div><p class="eyebrow">When</p><p class="mt-1">{formatLongDate(fromISODate(date))}, {time}</p></div><div><p class="eyebrow">Where</p><p class="mt-1">First floor, 41 Gardner Street, North Laine — there's a lift.</p></div><div><p class="eyebrow">Before you come</p><p class="mt-1">{d.first ? 'Arrive 10 minutes early for your consultation form. ' : ''}No retinoids for 3 days before peels or needling.</p></div></div>
          <div class="mt-6 flex gap-3 flex-wrap"><a href="/" class="btn btn-plum">Home</a><button type="button" class="btn btn-outline" onClick={() => location.reload()}>Book another</button></div>
        </div>
        {summary}
      </div>
    );
  }

  return (
    <div class="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
      <div class="min-w-0">
        <ol class="flex gap-2 mb-8 flex-wrap" aria-label="Progress">{STEPS.map((l, i) => <li key={l}><button type="button" disabled={i > step} onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined} class={`chip !cursor-default ${i === step ? '!bg-plum !text-white !border-plum' : i < step ? '!bg-lilac-2' : 'opacity-50'}`}>{i + 1}. {l}</button></li>)}</ol>

        {step === 0 && (
          <div>
            <h2 class="display-md mb-5">Which treatment?</h2>
            <div class="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Treatment">
              {p.services.filter((s) => s.bookable).map((s) => <label key={s.slug} class={`panel p-5 cursor-pointer border-2 ${slug === s.slug ? 'border-tang' : 'border-transparent hover:border-lilac-2'}`}><input type="radio" name="treatment" class="sr-only" checked={slug === s.slug} onChange={() => { setSlug(s.slug); setTime(''); }} /><span class="flex items-baseline justify-between gap-3"><span class="display-sm">{s.name}</span><span class="font-display font-600">{gbp(s.pricePence ?? 0)}</span></span><span class="block text-sm text-plum/75 mt-1.5">{s.summary}</span><span class="block text-xs text-mute mt-2">{s.durationMins} min</span></label>)}
            </div>
            <div class="mt-8 flex justify-end"><button type="button" class="btn btn-tang" disabled={!slug} onClick={next}>Next: pick a time →</button></div>
          </div>
        )}

        {step === 1 && (
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <div class="flex items-center justify-between mb-3"><h2 class="display-md">{new Date(month.y, month.m, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h2><div class="flex gap-1"><button type="button" class="size-10 rounded-full bg-white" aria-label="Previous month" disabled={month.y === today.getFullYear() && month.m === today.getMonth()} onClick={() => { const x = new Date(month.y, month.m - 1, 1); setMonth({ y: x.getFullYear(), m: x.getMonth() }); }}>‹</button><button type="button" class="size-10 rounded-full bg-white" aria-label="Next month" onClick={() => { const x = new Date(month.y, month.m + 1, 1); setMonth({ y: x.getFullYear(), m: x.getMonth() }); }}>›</button></div></div>
              <div class="grid grid-cols-7 gap-1 text-center text-xs text-mute mb-1" aria-hidden="true">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x, i) => <span key={i}>{x}</span>)}</div>
              <div class="grid grid-cols-7 gap-1" role="grid" aria-label="Choose a date">{cells.map((c) => <button key={c.iso} type="button" role="gridcell" disabled={!c.selectable} aria-selected={date === c.iso} aria-label={formatLongDate(c.date) + (c.selectable ? '' : ', unavailable')} onClick={() => { setDate(c.iso); setTime(''); }} class={`aspect-square rounded-full text-sm font-medium ${!c.inMonth ? 'opacity-0 pointer-events-none' : ''} ${date === c.iso ? 'bg-plum text-white' : c.selectable ? 'bg-white hover:bg-tang hover:text-white' : 'text-mute/50 line-through'}`}>{c.date.getDate()}</button>)}</div>
              <p class="mt-2 text-xs text-mute">Tuesday–Saturday, late night Thursday. 24 hours' notice.</p>
            </div>
            <div>
              <h2 class="display-md mb-3">{date ? formatLongDate(fromISODate(date)) : 'Pick a day'}</h2>
              {date && slots.filter((s) => s.available).length === 0 && <p class="panel p-4 text-sm">Fully booked that day for a {mins}-minute treatment — try another.</p>}
              {date && groups.map((g) => <div key={g.label} class="mb-4"><p class="eyebrow mb-2">{g.label}</p><div class="grid grid-cols-3 gap-2">{g.slots.map((s) => <button key={s.time} type="button" disabled={!s.available} aria-pressed={time === s.time} onClick={() => setTime(s.time)} class={`py-2.5 rounded-full text-sm font-medium ${time === s.time ? 'bg-plum text-white' : s.available ? 'bg-white hover:bg-tang hover:text-white' : 'text-mute/40 line-through'}`}>{s.time}</button>)}</div></div>)}
            </div>
            <div class="md:col-span-2 flex justify-between gap-3"><button type="button" class="btn btn-outline" onClick={back}>← Back</button><button type="button" class="btn btn-tang" disabled={!date || !time} onClick={next}>Next: your details →</button></div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={confirm} noValidate class="grid gap-4 max-w-xl">
            <h2 class="display-md">Your details</h2>
            <div class="grid sm:grid-cols-2 gap-4">
              <div><label class="label" for="b-name">Name</label><input id="b-name" class="field" autocomplete="name" value={d.name} onInput={(e) => setD({ ...d, name: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.name} />{errors.name && <p class="text-error text-sm mt-1">{errors.name}</p>}</div>
              <div><label class="label" for="b-phone">Mobile</label><input id="b-phone" type="tel" class="field" autocomplete="tel" value={d.phone} onInput={(e) => setD({ ...d, phone: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.phone} />{errors.phone && <p class="text-error text-sm mt-1">{errors.phone}</p>}</div>
              <div class="sm:col-span-2"><label class="label" for="b-email">Email</label><input id="b-email" type="email" class="field" autocomplete="email" value={d.email} onInput={(e) => setD({ ...d, email: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.email} />{errors.email && <p class="text-error text-sm mt-1">{errors.email}</p>}</div>
              <div class="sm:col-span-2"><label class="label" for="b-notes">Anything we should know? <span class="font-normal text-mute">(skin concerns, medication, pregnancy)</span></label><textarea id="b-notes" class="field" rows={3} value={d.notes} onInput={(e) => setD({ ...d, notes: (e.target as HTMLTextAreaElement).value })} /></div>
            </div>
            <label class="chip relative self-start"><input type="checkbox" checked={d.first} onChange={() => setD({ ...d, first: !d.first })} />{d.first ? '✓ ' : ''}This is my first visit</label>
            <div class="hidden" aria-hidden="true"><label>Leave empty <input tabIndex={-1} autocomplete="off" value={d._gotcha} onInput={(e) => setD({ ...d, _gotcha: (e.target as HTMLInputElement).value })} /></label></div>
            {p.policy && <p class="text-sm text-mute">{p.policy}</p>}
            <div class="flex justify-between gap-3"><button type="button" class="btn btn-outline" onClick={back}>← Back</button><button type="submit" class="btn btn-tang" disabled={sending}>{sending ? 'Booking…' : isDemo ? 'Confirm (demo)' : 'Confirm booking'}</button></div>
          </form>
        )}
      </div>
      {summary}
    </div>
  );
}
