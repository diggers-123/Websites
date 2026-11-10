/**
 * Kingpin booking wizard — Preact island.
 * Steps: barber → service → date & time → details → confirm.
 *
 * Availability source depends on site.booking.provider:
 *  - "demo":   deterministic demo busy periods (clearly labelled on screen)
 *  - "custom": GET `${endpoint}/availability?date=&barber=&service=` → BusyPeriod[]
 *              POST `${endpoint}/book` with the booking payload → { reference }
 * Cal.com / Calendly providers never render this component (see pages/book.astro).
 */
import { useEffect, useMemo, useState } from 'preact/hooks';
import {
  buildMonth,
  buildSlots,
  groupSlots,
  demoBusyPeriods,
  fromISODate,
  formatLongDate,
  demoReference,
  minsToHHMM,
  validate,
  type BusyPeriod,
  type Service,
  type TeamMember,
  type OpeningHours,
  type BookingConfig,
  type DayKey,
} from '@site/core';

export interface WizardProps {
  services: Service[];
  team: TeamMember[];
  hours: OpeningHours;
  booking: BookingConfig;
  businessName: string;
  phone: string;
  policy?: string;
}

type Step = 0 | 1 | 2 | 3 | 4;
const STEP_LABELS = ['Barber', 'Cut', 'Date & time', 'Details', 'Done'];
const ANY = '__any__';

function Stepper({ step, onJump }: { step: Step; onJump: (s: Step) => void }) {
  return (
    <ol class="grid grid-cols-5 border-[3px] border-chalk mb-8" aria-label="Booking progress">
      {STEP_LABELS.map((label, i) => {
        const state = i < step ? 'done' : i === step ? 'current' : 'todo';
        return (
          <li key={label} class="contents">
            <button
              type="button"
              disabled={state === 'todo' || step === 4}
              onClick={() => onJump(i as Step)}
              aria-current={state === 'current' ? 'step' : undefined}
              class={`px-2 py-3 text-left border-r-[3px] border-chalk last:border-r-0 flex flex-col gap-1 min-h-[64px] ${
                state === 'current' ? 'bg-volt text-ink' : state === 'done' ? 'bg-chalk text-ink hover:bg-volt' : 'text-smoke'
              }`}
            >
              <span class="font-mono text-[11px] tracking-widest">0{i + 1}</span>
              <span class="font-display uppercase text-sm sm:text-lg leading-none">{label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export default function BookingWizard(p: WizardProps) {
  const params = typeof location !== 'undefined' ? new URLSearchParams(location.search) : null;
  const presetBarber = params?.get('barber');
  const presetService = params?.get('service');

  const [step, setStep] = useState<Step>(presetBarber ? 1 : 0);
  const [barber, setBarber] = useState<string>(() => {
    const m = p.team.find((t) => t.name === presetBarber || t.name.split(' ')[0] === presetBarber);
    return m ? m.name : presetBarber ? ANY : '';
  });
  const [serviceSlug, setServiceSlug] = useState<string>(presetService ?? '');
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [busy, setBusy] = useState<BusyPeriod[] | null>(null);
  const [loadingBusy, setLoadingBusy] = useState(false);
  const [details, setDetails] = useState({ name: '', phone: '', email: '', notes: '', _gotcha: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ reference: string; demo: boolean } | null>(null);
  const [submitError, setSubmitError] = useState('');

  const service = p.services.find((s) => s.slug === serviceSlug);
  const member = p.team.find((t) => t.name === barber);
  const isDemo = p.booking.provider === 'demo';

  // Barber-specific hours: merge override over shop hours
  const effectiveHours = useMemo<OpeningHours>(() => {
    const h = { ...p.hours };
    if (member?.hours) for (const k of Object.keys(member.hours) as DayKey[]) h[k] = member.hours[k] ?? null;
    return h;
  }, [member, p.hours]);

  const cells = useMemo(
    () =>
      buildMonth(month.y, month.m, {
        hours: effectiveHours,
        today,
        horizonDays: p.booking.horizonDays ?? 21,
        closedDates: p.booking.closedDates,
        minNoticeHours: p.booking.minNoticeHours,
        now: today,
      }),
    [month, effectiveHours, today, p.booking],
  );

  // Load busy periods when date/barber/service change
  useEffect(() => {
    if (!date || !service) return;
    let cancelled = false;
    setBusy(null);
    const key = fromISODate(date).getDay();
    const dayKey = (['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as DayKey[])[key];
    const open = effectiveHours[dayKey];
    if (!open) {
      setBusy([]);
      return;
    }
    if (p.booking.provider === 'custom' && p.booking.endpoint) {
      setLoadingBusy(true);
      fetch(`${p.booking.endpoint}/availability?date=${date}&barber=${encodeURIComponent(barber)}&service=${serviceSlug}`)
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((data: BusyPeriod[]) => !cancelled && setBusy(data))
        .catch(() => !cancelled && setBusy([]))
        .finally(() => !cancelled && setLoadingBusy(false));
    } else {
      // Demo: deterministic. "Any barber" = intersection of all barbers' busy periods is complex;
      // we approximate by using the least-busy barber for the day.
      if (barber === ANY) {
        const all = p.team.filter((t) => t.bookable !== false).map((t) => demoBusyPeriods(date, open, t.name, 0.5));
        all.sort((a, b) => a.length - b.length);
        setBusy(all[0] ?? []);
      } else {
        setBusy(demoBusyPeriods(date, open, barber, 0.5));
      }
    }
    return () => {
      cancelled = true;
    };
  }, [date, barber, serviceSlug]);

  const slots = useMemo(() => {
    if (!date || !service || busy === null) return [];
    return buildSlots({
      hours: effectiveHours,
      iso: date,
      durationMins: service.durationMins ?? 30,
      intervalMins: p.booking.slotIntervalMins ?? 15,
      busy,
      minNoticeHours: p.booking.minNoticeHours ?? 0,
      now: today,
    });
  }, [date, service, busy, effectiveHours, p.booking, today]);

  const groups = useMemo(() => groupSlots(slots), [slots]);
  const availableCount = slots.filter((s) => s.available).length;

  function pickDate(iso: string) {
    setDate(iso);
    setTime('');
  }

  function changeMonth(delta: number) {
    const d = new Date(month.y, month.m + delta, 1);
    setMonth({ y: d.getFullYear(), m: d.getMonth() });
  }

  function validateDetails() {
    const e = validate(details, {
      name: [{ type: 'required', message: 'We need a name for the booking' }, { type: 'minLength', value: 2 }],
      phone: [{ type: 'required', message: 'A mobile number so we can reach you' }, { type: 'ukPhone' }],
      email: [{ type: 'required', message: 'An email for your confirmation' }, { type: 'email' }],
      notes: [{ type: 'maxLength', value: 300 }],
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function confirm() {
    if (!validateDetails()) return;
    if (details._gotcha) return; // honeypot
    setSubmitting(true);
    setSubmitError('');
    const payload = {
      barber: barber === ANY ? 'any' : barber,
      service: serviceSlug,
      date,
      time,
      ...details,
    };
    try {
      if (p.booking.provider === 'custom' && p.booking.endpoint) {
        const r = await fetch(`${p.booking.endpoint}/book`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        setResult({ reference: data.reference ?? 'confirmed', demo: false });
      } else {
        await new Promise((r) => setTimeout(r, 600));
        setResult({ reference: demoReference('KP', `${date}${time}${details.email}`), demo: true });
      }
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitError(`We couldn't save that booking. Please try again or call ${p.phone}.`);
    } finally {
      setSubmitting(false);
    }
  }

  const summary = (
    <aside class="border-[3px] border-chalk p-5 bg-ink-2 lg:sticky lg:top-24" aria-label="Booking summary">
      <h2 class="display-sm mb-4">Your booking</h2>
      <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt class="mono-label text-smoke">Barber</dt>
        <dd>{barber === ANY ? 'Any barber' : barber || '—'}</dd>
        <dt class="mono-label text-smoke">Cut</dt>
        <dd>{service ? `${service.name} · ${service.price}` : '—'}</dd>
        <dt class="mono-label text-smoke">When</dt>
        <dd>{date ? `${formatLongDate(fromISODate(date))}${time ? `, ${time}` : ''}` : '—'}</dd>
        {service && <><dt class="mono-label text-smoke">Length</dt><dd>{service.durationMins} min</dd></>}
      </dl>
      {isDemo && (
        <p class="mt-5 text-xs text-volt border-t border-chalk/20 pt-4">
          Demo mode: availability is simulated and no real booking is made. See the README to connect a booking system.
        </p>
      )}
    </aside>
  );

  if (step === 4 && result) {
    return (
      <div class="max-w-2xl">
        <p class="mono-label text-volt mb-4">{result.demo ? 'Demo booking' : 'Booking confirmed'}</p>
        <h2 class="display-lg">
          {result.demo ? 'That\'s how it works.' : 'You\'re in the book.'}
        </h2>
        <div class="mt-8 border-[3px] border-volt p-6 grid gap-3 text-lg">
          <p><span class="mono-label text-smoke block">Reference</span><span class="font-mono text-2xl">{result.reference}</span></p>
          <p><span class="mono-label text-smoke block">Barber</span>{barber === ANY ? 'Any available barber' : barber}</p>
          <p><span class="mono-label text-smoke block">Cut</span>{service?.name} · {service?.price}</p>
          <p><span class="mono-label text-smoke block">When</span>{formatLongDate(fromISODate(date))} at {time}</p>
        </div>
        {result.demo ? (
          <p class="mt-6 text-chalk/80">
            In demo mode nothing has been saved and no email is sent. When the site is connected to a booking provider,
            this screen confirms the real appointment and a confirmation email goes to <strong>{details.email}</strong>.
          </p>
        ) : (
          <p class="mt-6 text-chalk/80">A confirmation has been sent to <strong>{details.email}</strong>. Need to change it? Use the link in that email or ring {p.phone}.</p>
        )}
        {p.policy && <p class="mt-4 text-sm text-smoke">{p.policy}</p>}
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="/" class="btn btn-volt">Back to the shop</a>
          <button type="button" class="btn btn-ghost" onClick={() => location.reload()}>Book another</button>
        </div>
      </div>
    );
  }

  return (
    <div class="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
      <div>
        <Stepper step={step} onJump={(s) => setStep(s)} />

        {step === 0 && (
          <fieldset>
            <legend class="display-md mb-6">Who's cutting?</legend>
            <div class="grid sm:grid-cols-2 gap-4">
              <label class={`cursor-pointer border-[3px] p-5 flex flex-col gap-2 ${barber === ANY ? 'border-volt bg-volt text-ink' : 'border-chalk hover:border-volt'}`}>
                <input type="radio" name="barber" class="sr-only" checked={barber === ANY} onChange={() => setBarber(ANY)} />
                <span class="display-sm">Any barber</span>
                <span class="text-sm opacity-80">First available chair. Most choice of times.</span>
              </label>
              {p.team.filter((t) => t.bookable !== false).map((t) => (
                <label key={t.name} class={`cursor-pointer border-[3px] p-5 flex flex-col gap-2 ${barber === t.name ? 'border-volt bg-volt text-ink' : 'border-chalk hover:border-volt'}`}>
                  <input type="radio" name="barber" class="sr-only" checked={barber === t.name} onChange={() => setBarber(t.name)} />
                  <span class="display-sm">{t.name}</span>
                  <span class="text-sm opacity-80">{t.role}</span>
                  {t.bio && <span class="text-sm opacity-70 line-clamp-2">{t.bio}</span>}
                </label>
              ))}
            </div>
            <div class="mt-8 flex justify-end">
              <button type="button" class="btn btn-volt" disabled={!barber} onClick={() => setStep(1)}>Next: pick a cut →</button>
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend class="display-md mb-6">What are we doing?</legend>
            <div class="grid gap-3">
              {p.services.filter((s) => s.bookable).map((s) => (
                <label key={s.slug} class={`cursor-pointer border-[3px] p-4 sm:p-5 grid grid-cols-[1fr_auto] gap-4 items-center ${serviceSlug === s.slug ? 'border-volt bg-volt text-ink' : 'border-chalk hover:border-volt'}`}>
                  <input type="radio" name="service" class="sr-only" checked={serviceSlug === s.slug} onChange={() => { setServiceSlug(s.slug); setTime(''); }} />
                  <span>
                    <span class="display-sm block">{s.name}</span>
                    <span class="text-sm opacity-80 block mt-1">{s.summary}</span>
                    <span class="font-mono text-xs tracking-widest opacity-70 block mt-2">{s.durationMins} MIN</span>
                  </span>
                  <span class="font-mono text-2xl">{s.price}</span>
                </label>
              ))}
            </div>
            <div class="mt-8 flex justify-between gap-3">
              <button type="button" class="btn btn-ghost" onClick={() => setStep(0)}>← Back</button>
              <button type="button" class="btn btn-volt" disabled={!service} onClick={() => setStep(2)}>Next: date &amp; time →</button>
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <div class="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8">
            <div>
              <div class="flex items-center justify-between mb-4">
                <h3 class="display-md">{new Date(month.y, month.m, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h3>
                <div class="flex gap-2">
                  <button type="button" class="size-11 border-[3px] border-chalk hover:bg-volt hover:text-ink hover:border-volt" aria-label="Previous month" onClick={() => changeMonth(-1)} disabled={month.y === today.getFullYear() && month.m === today.getMonth()}>‹</button>
                  <button type="button" class="size-11 border-[3px] border-chalk hover:bg-volt hover:text-ink hover:border-volt" aria-label="Next month" onClick={() => changeMonth(1)}>›</button>
                </div>
              </div>
              <div class="grid grid-cols-7 gap-1 text-center mono-label text-smoke mb-2" aria-hidden="true">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => <span key={d}>{d}</span>)}
              </div>
              <div class="grid grid-cols-7 gap-1" role="grid" aria-label="Choose a date">
                {cells.map((c) => (
                  <button
                    key={c.iso}
                    type="button"
                    role="gridcell"
                    disabled={!c.selectable}
                    aria-selected={date === c.iso}
                    aria-label={formatLongDate(c.date) + (c.selectable ? '' : ', unavailable')}
                    onClick={() => pickDate(c.iso)}
                    class={`aspect-square font-mono text-sm border-2 ${
                      !c.inMonth ? 'opacity-0 pointer-events-none' : ''
                    } ${date === c.iso ? 'bg-volt text-ink border-volt' : c.selectable ? 'border-chalk/40 hover:border-volt' : 'border-transparent text-smoke/50 line-through'}`}
                  >
                    {c.date.getDate()}
                  </button>
                ))}
              </div>
              <p class="mt-3 text-xs text-smoke">Closed Sunday &amp; Monday. Booking up to {p.booking.horizonDays ?? 21} days ahead.</p>
            </div>
            <div>
              <h3 class="display-md mb-4">{date ? formatLongDate(fromISODate(date)) : 'Pick a date'}</h3>
              {date && loadingBusy && <p class="text-smoke">Checking availability…</p>}
              {date && !loadingBusy && busy !== null && availableCount === 0 && (
                <p class="border-[3px] border-smoke p-4 text-chalk/80">Nothing free that day for a {service?.name}. Try another date or "Any barber".</p>
              )}
              {date && !loadingBusy && groups.map((g) => (
                <div key={g.label} class="mb-5">
                  <p class="mono-label text-smoke mb-2">{g.label}</p>
                  <div class="grid grid-cols-4 gap-2">
                    {g.slots.map((s) => (
                      <button
                        key={s.time}
                        type="button"
                        disabled={!s.available}
                        aria-pressed={time === s.time}
                        onClick={() => setTime(s.time)}
                        class={`font-mono text-sm py-2.5 border-2 ${time === s.time ? 'bg-volt text-ink border-volt' : s.available ? 'border-chalk/50 hover:border-volt' : 'border-transparent text-smoke/40 line-through'}`}
                      >
                        {s.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {time && service && (
                <p class="text-sm text-chalk/70">{time} – {minsToHHMM(slots.find((s) => s.time === time)!.end)} · {service.durationMins} min</p>
              )}
            </div>
            <div class="md:col-span-2 flex justify-between gap-3">
              <button type="button" class="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
              <button type="button" class="btn btn-volt" disabled={!date || !time} onClick={() => setStep(3)}>Next: your details →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              confirm();
            }}
            class="grid gap-5 max-w-xl"
          >
            <h3 class="display-md">Nearly there</h3>
            <div>
              <label class="label" for="bk-name">Your name</label>
              <input id="bk-name" class="field" autocomplete="name" value={details.name} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} onInput={(e) => setDetails({ ...details, name: (e.target as HTMLInputElement).value })} />
              {errors.name && <span id="err-name" class="text-error text-sm mt-1 block">{errors.name}</span>}
            </div>
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="label" for="bk-phone">Mobile</label>
                <input id="bk-phone" class="field" type="tel" autocomplete="tel" inputMode="tel" value={details.phone} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'err-phone' : undefined} onInput={(e) => setDetails({ ...details, phone: (e.target as HTMLInputElement).value })} />
                {errors.phone && <span id="err-phone" class="text-error text-sm mt-1 block">{errors.phone}</span>}
              </div>
              <div>
                <label class="label" for="bk-email">Email</label>
                <input id="bk-email" class="field" type="email" autocomplete="email" inputMode="email" value={details.email} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} onInput={(e) => setDetails({ ...details, email: (e.target as HTMLInputElement).value })} />
                {errors.email && <span id="err-email" class="text-error text-sm mt-1 block">{errors.email}</span>}
              </div>
            </div>
            <div>
              <label class="label" for="bk-notes">Anything we should know? <span class="text-smoke font-normal">(optional)</span></label>
              <textarea id="bk-notes" class="field" rows={3} value={details.notes} onInput={(e) => setDetails({ ...details, notes: (e.target as HTMLTextAreaElement).value })} />
              {errors.notes && <span class="text-error text-sm mt-1 block">{errors.notes}</span>}
            </div>
            <div class="hidden" aria-hidden="true">
              <label>Leave this empty <input tabIndex={-1} autocomplete="off" value={details._gotcha} onInput={(e) => setDetails({ ...details, _gotcha: (e.target as HTMLInputElement).value })} /></label>
            </div>
            {p.policy && <p class="text-sm text-smoke">{p.policy}</p>}
            {submitError && <p class="text-error" role="alert">{submitError}</p>}
            <div class="flex justify-between gap-3">
              <button type="button" class="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
              <button type="submit" class="btn btn-volt" disabled={submitting}>{submitting ? 'Booking…' : isDemo ? 'Confirm (demo)' : 'Confirm booking'}</button>
            </div>
          </form>
        )}
      </div>
      {summary}
    </div>
  );
}
