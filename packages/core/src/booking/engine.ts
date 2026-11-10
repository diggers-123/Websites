/**
 * Booking engine — pure functions, no DOM, no framework.
 *
 * Generates calendar days and time slots from opening hours, service duration and
 * a set of unavailable periods. In "demo" mode the unavailability is deterministic
 * (seeded from the date string) so the wizard behaves consistently and can be tested.
 *
 * When connected to a real backend, replace `getBusyPeriods` with a fetch to your
 * availability API returning `BusyPeriod[]` for the day.
 */
import type { DayKey, OpeningHours } from '../config';

export interface BusyPeriod {
  /** Minutes from midnight. */
  start: number;
  end: number;
}

export interface Slot {
  /** "HH:MM" */
  time: string;
  /** Minutes from midnight. */
  start: number;
  end: number;
  available: boolean;
}

export interface DayCell {
  date: Date;
  iso: string; // YYYY-MM-DD
  dayKey: DayKey;
  inMonth: boolean;
  isPast: boolean;
  isToday: boolean;
  isOpen: boolean; // business open that weekday
  isClosedDate: boolean; // in closedDates
  selectable: boolean;
}

const DAY_FROM_JS: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function dayKeyOf(d: Date): DayKey {
  return DAY_FROM_JS[d.getDay()];
}

export function hhmmToMins(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export function minsToHHMM(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export interface CalendarOptions {
  hours: OpeningHours;
  today?: Date;
  horizonDays?: number;
  closedDates?: string[];
  /** Week starts Monday by default (UK). */
  weekStartsMonday?: boolean;
}

/** Build a 6-row month grid for a given month. */
export function buildMonth(year: number, month: number, opts: CalendarOptions): DayCell[] {
  const today = startOfDay(opts.today ?? new Date());
  const horizon = addDays(today, opts.horizonDays ?? 42);
  const closed = new Set(opts.closedDates ?? []);
  const first = new Date(year, month, 1);
  const weekStart = opts.weekStartsMonday === false ? 0 : 1;
  const offset = (first.getDay() - weekStart + 7) % 7;
  const gridStart = addDays(first, -offset);
  const cells: DayCell[] = [];
  for (let i = 0; i < 42; i++) {
    const date = addDays(gridStart, i);
    const iso = toISODate(date);
    const dayKey = dayKeyOf(date);
    const inMonth = date.getMonth() === month;
    const isPast = date < today;
    const isToday = date.getTime() === today.getTime();
    const isOpen = !!opts.hours[dayKey];
    const isClosedDate = closed.has(iso);
    const beyond = date > horizon;
    cells.push({
      date,
      iso,
      dayKey,
      inMonth,
      isPast,
      isToday,
      isOpen,
      isClosedDate,
      selectable: inMonth && !isPast && !beyond && isOpen && !isClosedDate,
    });
  }
  return cells;
}

/** Deterministic PRNG from a string seed (xmur3 + mulberry32). Small and dependency-free. */
export function seeded(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = (h ^= h >>> 16) >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Demo busy periods: a realistic-looking, deterministic set of existing bookings for a
 * day. `density` 0..1 controls how full the day is. Used only when
 * `booking.provider === "demo"`.
 */
export function demoBusyPeriods(
  iso: string,
  open: { open: string; close: string },
  resourceKey = 'any',
  density = 0.45,
): BusyPeriod[] {
  const rnd = seeded(`${iso}|${resourceKey}`);
  const start = hhmmToMins(open.open);
  const end = hhmmToMins(open.close);
  const out: BusyPeriod[] = [];
  let cursor = start;
  while (cursor < end) {
    const len = [30, 30, 45, 60, 60, 90][Math.floor(rnd() * 6)];
    if (rnd() < density) out.push({ start: cursor, end: Math.min(cursor + len, end) });
    cursor += len;
  }
  return out;
}

export interface SlotOptions {
  hours: OpeningHours;
  iso: string;
  durationMins: number;
  intervalMins?: number;
  busy?: BusyPeriod[];
  /** Minimum notice in hours (slots sooner than now + notice are unavailable). */
  minNoticeHours?: number;
  now?: Date;
  /** Override hours for a specific resource (e.g. a barber's own shift). */
  hoursOverride?: Partial<OpeningHours>;
}

export function buildSlots(opts: SlotOptions): Slot[] {
  const date = fromISODate(opts.iso);
  const key = dayKeyOf(date);
  const open = (opts.hoursOverride && key in opts.hoursOverride ? opts.hoursOverride[key] : undefined) ?? opts.hours[key];
  if (!open) return [];
  const interval = opts.intervalMins ?? 15;
  const start = hhmmToMins(open.open);
  const end = hhmmToMins(open.close);
  const busy = opts.busy ?? [];
  const now = opts.now ?? new Date();
  const noticeMins = (opts.minNoticeHours ?? 0) * 60;
  const isToday = toISODate(now) === opts.iso;
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const slots: Slot[] = [];
  for (let t = start; t + opts.durationMins <= end; t += interval) {
    const s = t;
    const e = t + opts.durationMins;
    const clash = busy.some((b) => s < b.end && e > b.start);
    const tooSoon = isToday && s < nowMins + noticeMins;
    slots.push({ time: minsToHHMM(s), start: s, end: e, available: !clash && !tooSoon });
  }
  return slots;
}

/** Group slots into Morning / Afternoon / Evening for friendlier UIs. */
export function groupSlots(slots: Slot[]): { label: string; slots: Slot[] }[] {
  const groups = [
    { label: 'Morning', slots: slots.filter((s) => s.start < 12 * 60) },
    { label: 'Afternoon', slots: slots.filter((s) => s.start >= 12 * 60 && s.start < 17 * 60) },
    { label: 'Evening', slots: slots.filter((s) => s.start >= 17 * 60) },
  ];
  return groups.filter((g) => g.slots.length > 0);
}

export function formatLongDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatShortDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

/** A short human reference like "KP-7F3A" for demo confirmations. */
export function demoReference(prefix: string, seedStr: string): string {
  const rnd = seeded(seedStr);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 4; i++) s += chars[Math.floor(rnd() * chars.length)];
  return `${prefix}-${s}`;
}
