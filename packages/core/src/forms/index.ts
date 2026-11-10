/**
 * Form handling shared by every site.
 *
 * - `validate()` runs field rules and returns error messages keyed by field name.
 * - `submitForm()` sends to the configured provider, or resolves locally in demo mode.
 *
 * Nothing here ever claims a message was delivered unless the provider returned 2xx.
 */
import type { FormsConfig } from '../config';

export type Rule =
  | { type: 'required'; message?: string }
  | { type: 'email'; message?: string }
  | { type: 'ukPhone'; message?: string }
  | { type: 'ukPostcode'; message?: string }
  | { type: 'minLength'; value: number; message?: string }
  | { type: 'maxLength'; value: number; message?: string }
  | { type: 'pattern'; value: RegExp; message?: string }
  | { type: 'custom'; test: (v: string, all: Record<string, string>) => boolean; message: string };

export type Rules = Record<string, Rule[]>;

export const UK_PHONE = /^(\+44\s?|0)(\d\s?){9,10}$/;
export const UK_POSTCODE = /^([A-Z]{1,2}\d[A-Z\d]?|GIR)\s?\d[A-Z]{2}$/i;
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(values: Record<string, string>, rules: Rules): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const [field, fieldRules] of Object.entries(rules)) {
    const raw = values[field] ?? '';
    const v = raw.trim();
    for (const r of fieldRules) {
      let bad = false;
      let msg = '';
      switch (r.type) {
        case 'required':
          bad = v.length === 0;
          msg = r.message ?? 'This field is required';
          break;
        case 'email':
          bad = v.length > 0 && !EMAIL.test(v);
          msg = r.message ?? 'Enter a valid email address';
          break;
        case 'ukPhone':
          bad = v.length > 0 && !UK_PHONE.test(v.replace(/[\s()-]/g, ''));
          msg = r.message ?? 'Enter a valid UK phone number';
          break;
        case 'ukPostcode':
          bad = v.length > 0 && !UK_POSTCODE.test(v);
          msg = r.message ?? 'Enter a valid UK postcode';
          break;
        case 'minLength':
          bad = v.length > 0 && v.length < r.value;
          msg = r.message ?? `Must be at least ${r.value} characters`;
          break;
        case 'maxLength':
          bad = v.length > r.value;
          msg = r.message ?? `Must be ${r.value} characters or fewer`;
          break;
        case 'pattern':
          bad = v.length > 0 && !r.value.test(v);
          msg = r.message ?? 'Invalid format';
          break;
        case 'custom':
          bad = !r.test(v, values);
          msg = r.message;
          break;
      }
      if (bad) {
        errors[field] = msg;
        break;
      }
    }
  }
  return errors;
}

export interface SubmitResult {
  ok: boolean;
  /** True when no real delivery happened (demo mode). */
  demo: boolean;
  message: string;
}

export function postcodeInArea(postcode: string, prefixes: string[] | undefined): boolean | null {
  if (!prefixes || prefixes.length === 0) return null;
  const outward = postcode.toUpperCase().replace(/\s+/g, '').match(/^[A-Z]{1,2}/);
  if (!outward) return false;
  return prefixes.map((p) => p.toUpperCase()).includes(outward[0]);
}

/**
 * Submit `values` according to `config`. Caller has already validated.
 * Honeypot: if the honeypot field is filled, resolve silently as ok (bots think they succeeded).
 */
export async function submitForm(
  config: FormsConfig,
  values: Record<string, string>,
  meta: { formName: string; pageUrl?: string },
): Promise<SubmitResult> {
  const hp = config.honeypot ?? '_gotcha';
  if (values[hp]) return { ok: true, demo: true, message: 'Thanks.' };

  const payload: Record<string, string> = { ...values, 'form-name': meta.formName };
  if (meta.pageUrl) payload._page = meta.pageUrl;
  delete payload[hp];

  switch (config.provider) {
    case 'demo': {
      await new Promise((r) => setTimeout(r, 500));
      return {
        ok: true,
        demo: true,
        message: 'Demo mode: your message was validated but not sent. Connect a form provider to go live.',
      };
    }
    case 'netlify': {
      const body = new URLSearchParams(payload).toString();
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      return res.ok
        ? { ok: true, demo: false, message: 'Thanks — your message has been sent.' }
        : { ok: false, demo: false, message: 'Sorry, something went wrong sending that. Please call us instead.' };
    }
    case 'formspree':
    case 'custom': {
      if (!config.endpoint) {
        return { ok: false, demo: false, message: 'Form endpoint is not configured.' };
      }
      const res = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok
        ? { ok: true, demo: false, message: 'Thanks — your message has been sent.' }
        : { ok: false, demo: false, message: 'Sorry, something went wrong sending that. Please call us instead.' };
    }
  }
}

/** Collect values from a <form> into a plain object (strings only). */
export function formValues(form: HTMLFormElement): Record<string, string> {
  const out: Record<string, string> = {};
  const fd = new FormData(form);
  for (const [k, v] of fd.entries()) {
    if (typeof v === 'string') out[k] = out[k] ? `${out[k]}, ${v}` : v;
    else if (v instanceof File && v.name) out[k] = v.name;
  }
  return out;
}

/**
 * Progressive enhancement for a plain HTML form:
 * - shows inline errors in `[data-error-for=field]` elements
 * - toggles aria-invalid
 * - submits via `submitForm` and swaps in the success/error state
 */
export function enhanceForm(
  form: HTMLFormElement,
  options: {
    config: FormsConfig;
    rules: Rules;
    formName: string;
    onSuccess?: (values: Record<string, string>, result: SubmitResult) => void;
  },
) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  const showErrors = (errors: Record<string, string>) => {
    form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((el) => {
      const field = el.dataset.errorFor!;
      const input = form.elements.namedItem(field) as HTMLElement | RadioNodeList | null;
      const msg = errors[field];
      el.textContent = msg ?? '';
      el.hidden = !msg;
      const target = input instanceof RadioNodeList ? (input[0] as HTMLElement | undefined) : input;
      if (target && 'setAttribute' in target) {
        if (msg) target.setAttribute('aria-invalid', 'true');
        else target.removeAttribute('aria-invalid');
      }
    });
  };

  form.noValidate = true;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const values = formValues(form);
    const errors = validate(values, options.rules);
    showErrors(errors);
    const firstBad = Object.keys(errors)[0];
    if (firstBad) {
      const el = form.elements.namedItem(firstBad);
      const target = el instanceof RadioNodeList ? (el[0] as HTMLElement) : (el as HTMLElement | null);
      target?.focus();
      if (status) {
        status.textContent = 'Please fix the highlighted fields.';
        status.dataset.state = 'error';
      }
      return;
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent ?? '';
      submitBtn.textContent = 'Sending…';
    }
    if (status) {
      status.textContent = '';
      status.dataset.state = 'pending';
    }
    try {
      const result = await submitForm(options.config, values, { formName: options.formName, pageUrl: location.href });
      if (status) {
        status.textContent = result.message;
        status.dataset.state = result.ok ? (result.demo ? 'demo' : 'success') : 'error';
      }
      if (result.ok) {
        form.dataset.submitted = 'true';
        options.onSuccess?.(values, result);
      }
    } catch {
      if (status) {
        status.textContent = 'Sorry, we could not send that. Please try again or call us.';
        status.dataset.state = 'error';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText ?? 'Send';
      }
    }
  });

  // Clear an error as soon as the user edits the field.
  form.addEventListener('input', (e) => {
    const t = e.target as HTMLElement & { name?: string };
    if (!t.name) return;
    const el = form.querySelector<HTMLElement>(`[data-error-for="${t.name}"]`);
    if (el && !el.hidden) {
      el.hidden = true;
      el.textContent = '';
      t.removeAttribute('aria-invalid');
    }
  });
}
