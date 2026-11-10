/**
 * Forge free-consultation booking — Preact island.
 * Steps: where (studio / video call) → date & 30-min slot → about you → done.
 */
import { useEffect, useMemo, useState } from 'preact/hooks';
import { buildMonth, buildSlots, groupSlots, demoBusyPeriods, fromISODate, formatLongDate, demoReference, validate, dayKeyOf, type BusyPeriod, type OpeningHours, type BookingConfig } from '@site/core';

interface Props { hours: OpeningHours; booking: BookingConfig; phone: string; policy?: string }
const GOALS = ['Get stronger', 'Lose fat', 'Back from injury', 'Sport performance', 'Not sure yet'];
const STEPS = ['Where', 'When', 'About you', 'Done'];

export default function ConsultBooking(p: Props) {
  const [step, setStep] = useState(0);
  const [where, setWhere] = useState<'studio' | 'call'>('studio');
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [busy, setBusy] = useState<BusyPeriod[] | null>(null);
  const [d, setD] = useState({ name: '', phone: '', email: '', goal: '', experience: '', notes: '', _gotcha: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ ref: string } | null>(null);
  const [sending, setSending] = useState(false);
  const isDemo = p.booking.provider === 'demo';
  // URL presets applied after mount (Preact skips prop patching during hydration).
  useEffect(() => { const q = new URLSearchParams(location.search); if (q.get('type') === 'call' || q.get('type') === 'studio') setWhere(q.get('type') as 'studio' | 'call'); if (q.get('goal')) setD((x) => ({ ...x, goal: q.get('goal')! })); }, []);

  const cells = useMemo(() => buildMonth(month.y, month.m, { hours: p.hours, today, horizonDays: p.booking.horizonDays ?? 21, closedDates: p.booking.closedDates, minNoticeHours: p.booking.minNoticeHours, now: today }), [month, p.hours, p.booking, today]);
  useEffect(() => { if (!date) return; const open = p.hours[dayKeyOf(fromISODate(date))]; setBusy(open ? demoBusyPeriods(date, open, where, 0.55) : []); }, [date, where]);
  const slots = useMemo(() => (date && busy ? buildSlots({ hours: p.hours, iso: date, durationMins: 30, intervalMins: 30, busy, minNoticeHours: p.booking.minNoticeHours ?? 0, now: today }) : []), [date, busy, p.hours, p.booking, today]);
  const groups = useMemo(() => groupSlots(slots), [slots]);

  const next = () => { setStep((s) => Math.min(3, s + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const back = () => setStep((s) => Math.max(0, s - 1));

  async function confirm(e: Event) {
    e.preventDefault();
    const errs = validate(d, { name: [{ type: 'required', message: 'Your name' }], phone: [{ type: 'required', message: 'A mobile for a reminder text' }, { type: 'ukPhone' }], email: [{ type: 'required', message: 'Email for the confirmation' }, { type: 'email' }], goal: [{ type: 'required', message: 'Pick the closest' }] });
    setErrors(errs); if (Object.keys(errs).length || d._gotcha) return;
    setSending(true); await new Promise((r) => setTimeout(r, 600));
    setResult({ ref: demoReference('FG', `${date}${time}${d.email}`) }); setSending(false); setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const summary = (
    <aside class="card card-volt p-5 self-start lg:sticky lg:top-6" aria-label="Summary">
      <p class="kicker text-cobalt">Free consult</p>
      <dl class="mt-3 grid gap-2 text-sm">
        <div class="flex justify-between gap-3"><dt class="font-bold">Where</dt><dd>{where === 'studio' ? 'Tyndall Street studio' : 'Video call'}</dd></div>
        <div class="flex justify-between gap-3"><dt class="font-bold">When</dt><dd class="text-right">{date ? `${formatLongDate(fromISODate(date))}${time ? `, ${time}` : ''}` : '—'}</dd></div>
        <div class="flex justify-between gap-3"><dt class="font-bold">Length</dt><dd>30 min</dd></div>
        <div class="flex justify-between gap-3"><dt class="font-bold">Cost</dt><dd class="font-display">£0</dd></div>
      </dl>
      {isDemo && <p class="mt-4 pt-3 border-t-[3px] border-coal/10 text-xs text-mute">Demo mode: availability is simulated and nothing is saved.</p>}
    </aside>
  );

  if (step === 3 && result) {
    return (
      <div class="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
        <div>
          <p class="kicker text-cobalt">{isDemo ? 'Demo booking' : 'Booked'}</p>
          <h2 class="display-lg mt-2">{isDemo ? 'That\'s the flow.' : 'See you soon.'}</h2>
          <p class="mt-4 text-coal/80 max-w-lg">{isDemo ? `Nothing is saved in demo mode. Connected to a booking provider, this confirms the real appointment and emails ${d.email}.` : `Confirmation sent to ${d.email}; a reminder text goes to ${d.phone} the day before.`}</p>
          <div class="card p-5 mt-6 grid sm:grid-cols-2 gap-4 text-sm"><div><p class="kicker text-mute">Reference</p><p class="font-display text-xl mt-1">{result.ref}</p></div><div><p class="kicker text-mute">When</p><p class="mt-1">{formatLongDate(fromISODate(date))}, {time}</p></div><div><p class="kicker text-mute">Where</p><p class="mt-1">{where === 'studio' ? 'Unit 7, Tyndall Street Studios, CF10 4BB — free parking' : 'Video link sent by email'}</p></div><div><p class="kicker text-mute">Bring</p><p class="mt-1">Trainers and clothes you can move in. Nothing else.</p></div></div>
          <div class="mt-6 flex gap-3 flex-wrap"><a href="/" class="btn btn-cobalt">Home</a><button type="button" class="btn btn-outline" onClick={() => location.reload()}>Book another</button></div>
        </div>
        {summary}
      </div>
    );
  }

  return (
    <div class="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
      <div class="min-w-0">
        <ol class="grid grid-cols-4 gap-1 mb-8" aria-label="Progress">{STEPS.map((l, i) => <li key={l}><button type="button" disabled={i > step} onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined} class={`w-full text-left px-2 py-2 border-t-4 ${i === step ? 'border-cobalt' : i < step ? 'border-coal' : 'border-bone-2 text-mute'}`}><span class="kicker block !text-[10px]">0{i + 1}</span><span class="font-display uppercase text-xs sm:text-sm block truncate">{l}</span></button></li>)}</ol>

        {step === 0 && (
          <div>
            <h2 class="display-md mb-2">Where suits you?</h2><p class="text-coal/70 mb-5">Both are 30 minutes and free. In the studio we'll move a bit; on a call we'll just talk.</p>
            <div class="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Where">
              {([['studio', 'In the studio', 'Tyndall Street, Cardiff Bay. Free parking. Trainers on.'], ['call', 'Video call', 'From anywhere. Good for online coaching or a first chat.']] as const).map(([v, t, b]) => <label class={`p-5 cursor-pointer border-[3px] border-coal ${where === v ? 'bg-cobalt text-white shadow-[8px_8px_0_#e8ff47]' : 'bg-white shadow-[8px_8px_0_#1f3bff]'}`}><input type="radio" name="where" class="sr-only" checked={where === v} onChange={() => setWhere(v)} /><span class="display-sm block">{t}</span><span class="text-sm block mt-1 opacity-85">{b}</span></label>)}
            </div>
            <div class="mt-8 flex justify-end"><button type="button" class="btn btn-volt" onClick={next}>Next: pick a time →</button></div>
          </div>
        )}

        {step === 1 && (
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <div class="flex items-center justify-between mb-3"><h2 class="display-md">{new Date(month.y, month.m, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h2><div class="flex gap-1"><button type="button" class="size-10 border-[3px] border-coal bg-white" aria-label="Previous month" disabled={month.y === today.getFullYear() && month.m === today.getMonth()} onClick={() => { const x = new Date(month.y, month.m - 1, 1); setMonth({ y: x.getFullYear(), m: x.getMonth() }); }}>‹</button><button type="button" class="size-10 border-[3px] border-coal bg-white" aria-label="Next month" onClick={() => { const x = new Date(month.y, month.m + 1, 1); setMonth({ y: x.getFullYear(), m: x.getMonth() }); }}>›</button></div></div>
              <div class="grid grid-cols-7 gap-1 text-center kicker !text-[10px] text-mute mb-1" aria-hidden="true">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x, i) => <span key={i}>{x}</span>)}</div>
              <div class="grid grid-cols-7 gap-1" role="grid" aria-label="Choose a date">{cells.map((c) => <button key={c.iso} type="button" role="gridcell" disabled={!c.selectable} aria-selected={date === c.iso} aria-label={formatLongDate(c.date) + (c.selectable ? '' : ', unavailable')} onClick={() => { setDate(c.iso); setTime(''); }} class={`aspect-square font-display text-sm border-[3px] ${!c.inMonth ? 'opacity-0 pointer-events-none' : ''} ${date === c.iso ? 'bg-cobalt text-white border-coal' : c.selectable ? 'bg-white border-coal hover:bg-volt' : 'border-transparent text-mute/50 line-through'}`}>{c.date.getDate()}</button>)}</div>
              <p class="mt-2 text-xs text-mute">6am–8pm weekdays, Saturday mornings.</p>
            </div>
            <div>
              <h2 class="display-md mb-3">{date ? formatLongDate(fromISODate(date)) : 'Pick a day'}</h2>
              {date && slots.filter((s) => s.available).length === 0 && <p class="card p-4 text-sm">Full that day — try another.</p>}
              {date && groups.map((g) => <div key={g.label} class="mb-4"><p class="kicker text-mute mb-2">{g.label}</p><div class="grid grid-cols-3 gap-2">{g.slots.map((s) => <button key={s.time} type="button" disabled={!s.available} aria-pressed={time === s.time} onClick={() => setTime(s.time)} class={`py-2.5 font-display text-sm border-[3px] ${time === s.time ? 'bg-cobalt text-white border-coal' : s.available ? 'bg-white border-coal hover:bg-volt' : 'border-transparent text-mute/50 line-through'}`}>{s.time}</button>)}</div></div>)}
            </div>
            <div class="md:col-span-2 flex justify-between gap-3"><button type="button" class="btn btn-outline" onClick={back}>← Back</button><button type="button" class="btn btn-volt" disabled={!date || !time} onClick={next}>Next: about you →</button></div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={confirm} noValidate class="grid gap-5 max-w-xl">
            <h2 class="display-md">About you</h2>
            <fieldset><legend class="label">What's the goal?</legend><div class="grid sm:grid-cols-2 gap-2 mt-1">{GOALS.map((g) => <label key={g} class="choice relative"><input type="radio" name="goal" checked={d.goal === g} onChange={() => setD({ ...d, goal: g })} />{g}</label>)}</div>{errors.goal && <p class="text-error text-sm mt-1">{errors.goal}</p>}</fieldset>
            <fieldset><legend class="label">Training experience</legend><div class="grid grid-cols-3 gap-2 mt-1">{['None', 'Some', 'Plenty'].map((g) => <label key={g} class="choice relative !justify-center"><input type="radio" name="exp" checked={d.experience === g} onChange={() => setD({ ...d, experience: g })} />{g}</label>)}</div></fieldset>
            <div class="grid sm:grid-cols-2 gap-4">
              <div><label class="label" for="c-name">Name</label><input id="c-name" class="field" autocomplete="name" value={d.name} onInput={(e) => setD({ ...d, name: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.name} />{errors.name && <p class="text-error text-sm mt-1">{errors.name}</p>}</div>
              <div><label class="label" for="c-phone">Mobile</label><input id="c-phone" type="tel" class="field" autocomplete="tel" value={d.phone} onInput={(e) => setD({ ...d, phone: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.phone} />{errors.phone && <p class="text-error text-sm mt-1">{errors.phone}</p>}</div>
              <div class="sm:col-span-2"><label class="label" for="c-email">Email</label><input id="c-email" type="email" class="field" autocomplete="email" value={d.email} onInput={(e) => setD({ ...d, email: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.email} />{errors.email && <p class="text-error text-sm mt-1">{errors.email}</p>}</div>
              <div class="sm:col-span-2"><label class="label" for="c-notes">Anything I should know? <span class="font-normal normal-case tracking-normal text-mute">(injuries, nerves, timing)</span></label><textarea id="c-notes" class="field" rows={3} value={d.notes} onInput={(e) => setD({ ...d, notes: (e.target as HTMLTextAreaElement).value })} /></div>
            </div>
            <div class="hidden" aria-hidden="true"><label>Leave empty <input tabIndex={-1} autocomplete="off" value={d._gotcha} onInput={(e) => setD({ ...d, _gotcha: (e.target as HTMLInputElement).value })} /></label></div>
            {p.policy && <p class="text-sm text-mute">{p.policy}</p>}
            <div class="flex justify-between gap-3"><button type="button" class="btn btn-outline" onClick={back}>← Back</button><button type="submit" class="btn btn-volt" disabled={sending}>{sending ? 'Booking…' : isDemo ? 'Confirm (demo)' : 'Confirm'}</button></div>
          </form>
        )}
      </div>
      {summary}
    </div>
  );
}
