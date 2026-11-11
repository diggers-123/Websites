/**
 * Bright Spark free assessment-call booking — Preact island.
 * student → when (20-minute slots) → details → done. Demo mode simulates availability and saves nothing.
 */
import { useEffect, useMemo, useState } from 'preact/hooks';
import { buildMonth, buildSlots, groupSlots, demoBusyPeriods, fromISODate, formatLongDate, demoReference, validate, dayKeyOf, type BusyPeriod, type OpeningHours, type BookingConfig } from '@site/core';

interface Props { hours: OpeningHours; booking: BookingConfig; subjects: { slug: string; name: string }[]; yearGroups: string[]; phone: string; policy?: string }
const STEPS = ['Student', 'When', 'Details', 'Done'];
const CALL_MINS = 20;

export default function CallBooking(p: Props) {
  const [step, setStep] = useState(0);
  const [year, setYear] = useState('');
  const [subs, setSubs] = useState<string[]>([]);
  const [goal, setGoal] = useState('');
  const [how, setHow] = useState<'phone' | 'video'>('phone');
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [busy, setBusy] = useState<BusyPeriod[] | null>(null);
  const [d, setD] = useState({ name: '', phone: '', email: '', student: '', _gotcha: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ ref: string } | null>(null);
  const [sending, setSending] = useState(false);
  const isDemo = p.booking.provider === 'demo';
  useEffect(() => { const q = new URLSearchParams(location.search); const s = q.get('subject'); if (s && p.subjects.some((x) => x.slug === s)) setSubs([s]); const y = q.get('year'); if (y && p.yearGroups.includes(y)) setYear(y); }, []);

  const cells = useMemo(() => buildMonth(month.y, month.m, { hours: p.hours, today, horizonDays: p.booking.horizonDays ?? 28, closedDates: p.booking.closedDates, minNoticeHours: p.booking.minNoticeHours, now: today }), [month, p.hours, p.booking, today]);
  useEffect(() => { if (!date) return; const open = p.hours[dayKeyOf(fromISODate(date))]; setBusy(open ? demoBusyPeriods(date, open, 'anjali', 0.55) : []); }, [date]);
  const slots = useMemo(() => (date && busy ? buildSlots({ hours: p.hours, iso: date, durationMins: CALL_MINS, intervalMins: p.booking.slotIntervalMins ?? 20, busy, minNoticeHours: p.booking.minNoticeHours ?? 0, now: today }) : []), [date, busy, p.hours, p.booking, today]);
  const groups = useMemo(() => groupSlots(slots), [slots]);
  const toggle = (s: string) => setSubs((x) => (x.includes(s) ? x.filter((y) => y !== s) : [...x, s]));
  const next = () => { setStep((s) => Math.min(3, s + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const back = () => setStep((s) => Math.max(0, s - 1));
  const subjectNames = subs.map((s) => p.subjects.find((x) => x.slug === s)?.name ?? s).join(', ');

  async function confirm(e: Event) {
    e.preventDefault();
    const errs = validate(d as unknown as Record<string, string>, { name: [{ type: 'required', message: 'Your name' }], phone: [{ type: 'required', message: 'The number to call you on' }, { type: 'ukPhone' }], email: [{ type: 'required', message: 'Email for the confirmation' }, { type: 'email' }] });
    setErrors(errs); if (Object.keys(errs).length || d._gotcha) return;
    setSending(true); await new Promise((r) => setTimeout(r, 600));
    setResult({ ref: demoReference('BS', `${year}${subs.join('')}${date}${time}${d.email}`) }); setSending(false); setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const summary = (
    <aside class="sticky-note tilt-r self-start lg:sticky lg:top-6" aria-label="Call summary">
      <p class="hand text-2xl">Your call</p>
      <dl class="mt-3 grid gap-2 text-sm">
        <div class="flex justify-between gap-3"><dt class="opacity-70">Student</dt><dd class="text-right font-700">{year || '—'}</dd></div>
        <div class="flex justify-between gap-3"><dt class="opacity-70">Subjects</dt><dd class="text-right font-700">{subjectNames || '—'}</dd></div>
        <div class="flex justify-between gap-3"><dt class="opacity-70">When</dt><dd class="text-right">{date ? `${formatLongDate(fromISODate(date))}${time ? `, ${time}` : ''}` : '—'}</dd></div>
        <div class="flex justify-between gap-3 border-t border-ink/20 pt-2 mt-1"><dt class="font-700">How</dt><dd>{how === 'phone' ? 'Phone' : 'Video'} · {CALL_MINS} min · free</dd></div>
      </dl>
      {isDemo && <p class="mt-4 text-xs opacity-70">Demo mode: availability is simulated and nothing is saved. Set <code>booking.provider</code> to <code>calcom</code> to go live.</p>}
    </aside>
  );

  if (step === 3 && result) {
    return (
      <div class="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
        <div>
          <p class="eyebrow">{isDemo ? 'Demo booking' : 'Booked'}</p>
          <h2 class="display-lg mt-2">{isDemo ? 'That\'s how it works.' : 'Speak soon.'}</h2>
          <p class="mt-4 text-ink/80 max-w-lg">{isDemo ? `In demo mode nothing is saved. Connected to Cal.com or a custom API, this books the call and emails ${d.email} a confirmation and calendar invite.` : `Confirmation and calendar invite sent to ${d.email}. ${how === 'phone' ? `I'll ring ${d.phone}` : 'The video link is in the email'} at ${time}.`}</p>
          <div class="sheet mt-6 px-6 sm:pl-16 sm:pr-8 py-8 grid sm:grid-cols-2 gap-x-6 text-sm"><div><p class="eyebrow">Reference</p><p class="display-sm mt-1 leading-8">{result.ref}</p></div><div><p class="eyebrow">When</p><p class="mt-1 leading-8">{formatLongDate(fromISODate(date))}, {time}</p></div><div class="mt-4"><p class="eyebrow">Worth having to hand</p><p class="mt-1 leading-8">Recent grades or mock results, and the exam board if you know it.</p></div><div class="mt-4"><p class="eyebrow">Student</p><p class="mt-1 leading-8">{d.student || year}{subjectNames ? ` · ${subjectNames}` : ''}</p></div></div>
          <div class="mt-6 flex gap-3 flex-wrap"><a href="/" class="btn btn-ink">Home</a><button type="button" class="btn btn-outline" onClick={() => location.reload()}>Book another</button></div>
        </div>
        {summary}
      </div>
    );
  }

  return (
    <div class="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
      <div class="min-w-0">
        <ol class="flex gap-2 mb-8 flex-wrap" aria-label="Progress">{STEPS.map((l, i) => <li key={l}><button type="button" disabled={i > step} onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined} class={`chip !cursor-default ${i === step ? '!bg-ink !text-white !border-ink' : i < step ? '!bg-hi !border-ink' : 'opacity-50'}`}>{i + 1}. {l}</button></li>)}</ol>

        {step === 0 && (
          <div class="grid gap-7">
            <h2 class="display-md">Who is the call about?</h2>
            <div><label class="label" for="c-year">Year group</label><select id="c-year" class="field max-w-sm" value={year} onChange={(e) => setYear((e.target as HTMLSelectElement).value)}><option value="">Choose…</option>{p.yearGroups.map((y) => <option key={y} value={y}>{y}</option>)}</select></div>
            <fieldset><legend class="label">Subjects <span class="font-normal text-mute">(pick any)</span></legend><div class="flex flex-wrap gap-2 mt-1">{p.subjects.map((s) => <label key={s.slug} class="chip relative"><input type="checkbox" checked={subs.includes(s.slug)} onChange={() => toggle(s.slug)} />{s.name}</label>)}</div></fieldset>
            <fieldset><legend class="label">How should we talk?</legend><div class="flex flex-wrap gap-2 mt-1">{(['phone', 'video'] as const).map((h) => <label key={h} class="chip relative"><input type="radio" name="how" checked={how === h} onChange={() => setHow(h)} />{h === 'phone' ? 'Phone call' : 'Video call'}</label>)}</div></fieldset>
            <div><label class="label" for="c-goal">What's the goal? <span class="font-normal text-mute">(optional)</span></label><textarea id="c-goal" class="field max-w-xl" rows={2} placeholder="e.g. Grade 4 → 6 in GCSE maths by June; mock was a 4." value={goal} onInput={(e) => setGoal((e.target as HTMLTextAreaElement).value)} /></div>
            <div class="flex justify-end"><button type="button" class="btn btn-ink" disabled={!year} onClick={next}>Next: pick a time →</button></div>
          </div>
        )}

        {step === 1 && (
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <div class="flex items-center justify-between mb-3"><h2 class="display-md">{new Date(month.y, month.m, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h2><div class="flex gap-1"><button type="button" class="size-10 rounded-lg border-2 border-line bg-white" aria-label="Previous month" disabled={month.y === today.getFullYear() && month.m === today.getMonth()} onClick={() => { const x = new Date(month.y, month.m - 1, 1); setMonth({ y: x.getFullYear(), m: x.getMonth() }); }}>‹</button><button type="button" class="size-10 rounded-lg border-2 border-line bg-white" aria-label="Next month" onClick={() => { const x = new Date(month.y, month.m + 1, 1); setMonth({ y: x.getFullYear(), m: x.getMonth() }); }}>›</button></div></div>
              <div class="grid grid-cols-7 gap-1 text-center text-xs text-mute mb-1" aria-hidden="true">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x, i) => <span key={i}>{x}</span>)}</div>
              <div class="grid grid-cols-7 gap-1" role="grid" aria-label="Choose a date">{cells.map((c) => <button key={c.iso} type="button" role="gridcell" disabled={!c.selectable} aria-selected={date === c.iso} aria-label={formatLongDate(c.date) + (c.selectable ? '' : ', unavailable')} onClick={() => { setDate(c.iso); setTime(''); }} class={`aspect-square rounded-lg text-sm font-700 ${!c.inMonth ? 'opacity-0 pointer-events-none' : ''} ${date === c.iso ? 'bg-ink text-white' : c.selectable ? 'bg-white border border-line hover:bg-hi' : 'text-pencil line-through'}`}>{c.date.getDate()}</button>)}</div>
              <p class="mt-2 text-xs text-mute">Weekday afternoons and evenings, Saturday mornings.</p>
            </div>
            <div>
              <h2 class="display-md mb-3">{date ? formatLongDate(fromISODate(date)) : 'Pick a day'}</h2>
              {date && slots.filter((s) => s.available).length === 0 && <p class="card p-4 text-sm">No free 20-minute gaps that day — try another.</p>}
              {date && groups.map((g) => <div key={g.label} class="mb-4"><p class="eyebrow mb-2">{g.label}</p><div class="grid grid-cols-3 gap-2">{g.slots.map((s) => <button key={s.time} type="button" disabled={!s.available} aria-pressed={time === s.time} onClick={() => setTime(s.time)} class={`py-2.5 rounded-lg text-sm font-700 ${time === s.time ? 'bg-ink text-white' : s.available ? 'bg-white border border-line hover:bg-hi' : 'text-pencil line-through'}`}>{s.time}</button>)}</div></div>)}
            </div>
            <div class="md:col-span-2 flex justify-between gap-3"><button type="button" class="btn btn-outline" onClick={back}>← Back</button><button type="button" class="btn btn-ink" disabled={!date || !time} onClick={next}>Next: your details →</button></div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={confirm} noValidate class="grid gap-4 max-w-xl">
            <h2 class="display-md">Your details</h2>
            <div class="grid sm:grid-cols-2 gap-4">
              <div><label class="label" for="b-name">Your name</label><input id="b-name" class="field" autocomplete="name" value={d.name} onInput={(e) => setD({ ...d, name: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.name} />{errors.name && <p class="text-error text-sm mt-1">{errors.name}</p>}</div>
              <div><label class="label" for="b-student">Student's first name <span class="font-normal text-mute">(optional)</span></label><input id="b-student" class="field" value={d.student} onInput={(e) => setD({ ...d, student: (e.target as HTMLInputElement).value })} /></div>
              <div><label class="label" for="b-phone">Phone</label><input id="b-phone" type="tel" class="field" autocomplete="tel" value={d.phone} onInput={(e) => setD({ ...d, phone: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.phone} />{errors.phone && <p class="text-error text-sm mt-1">{errors.phone}</p>}</div>
              <div><label class="label" for="b-email">Email</label><input id="b-email" type="email" class="field" autocomplete="email" value={d.email} onInput={(e) => setD({ ...d, email: (e.target as HTMLInputElement).value })} aria-invalid={!!errors.email} />{errors.email && <p class="text-error text-sm mt-1">{errors.email}</p>}</div>
            </div>
            <div class="hidden" aria-hidden="true"><label>Leave empty <input tabIndex={-1} autocomplete="off" value={d._gotcha} onInput={(e) => setD({ ...d, _gotcha: (e.target as HTMLInputElement).value })} /></label></div>
            {p.policy && <p class="text-sm text-mute">{p.policy}</p>}
            <div class="flex justify-between gap-3"><button type="button" class="btn btn-outline" onClick={back}>← Back</button><button type="submit" class="btn btn-ink" disabled={sending}>{sending ? 'Booking…' : isDemo ? 'Book the call (demo)' : 'Book the call'}</button></div>
          </form>
        )}
      </div>
      {summary}
    </div>
  );
}
