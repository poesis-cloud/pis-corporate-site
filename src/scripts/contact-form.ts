/**
 * contact-form.ts — behaviour of the contact form.
 *
 * Two transports, chosen at build time by the `data-endpoint` attribute:
 *   with an endpoint   the request is posted as JSON; the visitor is told it was
 *                      sent only when the endpoint confirms it
 *   without            the request becomes an email draft in the visitor's own
 *                      mail app, and the page says so
 * Without JavaScript the form's own `mailto:` action applies.
 */
import { briefMailto, buildPayload, composeBrief, contactFields, interpretResponse, type ContactValues, type FieldKey, type Outcome } from './contact-brief.ts';

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const SEND_TIMEOUT_MS = 20_000;

function track(name: string, placement: string): void {
  // Queued in dataLayer; it leaves the browser only after analytics consent. No typed value is attached.
  (window as unknown as { gtag?: (...parameters: unknown[]) => void }).gtag?.('event', name, { cta_id: placement, page_path: location.pathname });
}

function addTrap(form: HTMLFormElement): HTMLInputElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'brief-form__trap';
  wrapper.setAttribute('aria-hidden', 'true');
  const input = document.createElement('input');
  input.type = 'text';
  input.name = '_gotcha';
  input.tabIndex = -1;
  input.autocomplete = 'off';
  input.setAttribute('aria-label', 'Leave this field empty');
  input.dataset.trap = '';
  wrapper.append(input);
  form.append(wrapper);
  return input;
}

function mount(form: HTMLFormElement): void {
  const scope = form.parentElement ?? form;
  const status = scope.querySelector<HTMLElement>('[data-contact-status]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!status || !submit) return;

  const endpoint = form.dataset.endpoint ?? '';
  const email = form.dataset.email ?? '';
  const placement = form.dataset.source ?? 'contact';
  const done = scope.querySelector<HTMLElement>('[data-contact-done]');
  const fallback = scope.querySelector<HTMLAnchorElement>('[data-contact-fallback]');
  const copy = form.querySelector<HTMLButtonElement>('[data-contact-copy]');
  // The field a person never sees: added here, so a visitor without scripts, whose form
  // falls back to an email draft, does not find it in that draft.
  const trap = endpoint ? addTrap(form) : null;
  const field = (key: FieldKey) => form.querySelector<Field>(`[data-key="${key}"]`);
  /** The fields of these keys that exist in the form, in the same order. */
  const fieldsOf = (keys: FieldKey[]): Field[] => keys.map(field).filter((element): element is Field => element !== null);
  const fieldKeys = contactFields.map(({ key }) => key);
  const idleLabel = submit.innerHTML;
  const shownAt = Date.now();
  let started = false;

  // With JavaScript the page shows its own messages; without it, the browser's native validation applies.
  form.noValidate = true;

  const values = (): ContactValues => Object.fromEntries(fieldKeys.map((key) => [key, (field(key)?.value ?? '').trim()])) as ContactValues;

  const mark = (element: Field, valid: boolean): void => {
    element.setAttribute('aria-invalid', String(!valid));
    const error = document.getElementById(`${element.id}-error`);
    if (error) error.hidden = valid;
  };
  // Spaces alone are not an answer: the request is built from trimmed values.
  const check = (element: Field): boolean => {
    const valid = (!element.required || element.value.trim() !== '') && element.checkValidity();
    mark(element, valid);
    return valid;
  };
  const validate = (): boolean => {
    // Every field is checked, not only those before the first error, so all of them are marked at once.
    const invalid = fieldsOf(fieldKeys).filter((element) => !check(element));
    invalid[0]?.focus();
    if (invalid.length) status.textContent = invalid.length === 1 ? 'One field needs your attention.' : `${invalid.length} fields need your attention.`;
    return invalid.length === 0;
  };

  form.addEventListener('focusin', () => {
    if (started) return;
    started = true;
    track('business_contact_form_start', placement);
  });
  // A marked field is cleared while it is being corrected, not when the visitor leaves it: leaving it is
  // often the press on the submit button, and a message vanishing at that instant moves the button from
  // under the pointer, so the press is lost.
  for (const element of fieldsOf(fieldKeys)) {
    const recheck = () => { if (element.getAttribute('aria-invalid') === 'true' && (!element.required || element.value.trim() !== '') && element.checkValidity()) mark(element, true); };
    element.addEventListener('input', recheck);
    element.addEventListener('change', recheck);
  }

  const offerEmail = (request: ContactValues): void => {
    if (!fallback) return;
    fallback.href = briefMailto(email, request).href;
    fallback.hidden = false;
  };
  const withdrawEmail = (): void => { if (fallback) fallback.hidden = true; };
  // Measured by placement only: the link itself holds the request and must never be sent as an event value.
  fallback?.addEventListener('click', () => track('business_contact_intent', `${placement}-email-fallback`));

  const report = (outcome: Outcome, request: ContactValues): void => {
    if (outcome.state === 'sent') {
      track('business_contact_sent', placement);
      withdrawEmail();
      form.hidden = true;
      status.textContent = '';
      if (done) { done.hidden = false; done.focus(); }
      return;
    }
    if (outcome.state === 'invalid') {
      const rejected = fieldsOf(outcome.fields);
      for (const element of rejected) mark(element, false);
      rejected[0]?.focus();
      status.textContent = `Your request was not sent: some details were not accepted. Check the marked fields and send again, or send it by email to ${email}.`;
      offerEmail(request);
      return;
    }
    status.textContent = outcome.state === 'throttled'
      ? `Your request was not sent: too many requests came from your network. Wait a few minutes and try again, or write to ${email}.`
      : `Your request was not sent. Try again in a moment, or send it by email to ${email}.`;
    offerEmail(request);
  };

  const send = async (request: ContactValues): Promise<void> => {
    withdrawEmail();
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    submit.textContent = 'Sending…';
    status.textContent = 'Sending your request…';
    let outcome: Outcome = { state: 'failed' };
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(buildPayload(request, { source: placement, elapsedMs: Date.now() - shownAt, trap: trap?.value ?? '' })),
        signal: typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(SEND_TIMEOUT_MS) : undefined,
      });
      outcome = interpretResponse(response.status, await response.json().catch(() => null));
    } catch {
      // Offline, blocked, timed out: the request did not arrive.
    }
    submit.disabled = false;
    form.removeAttribute('aria-busy');
    submit.innerHTML = idleLabel;
    report(outcome, request);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (submit.disabled || !validate()) return;
    const request = values();
    if (endpoint) { void send(request); return; }
    const { href, shortened } = briefMailto(email, request);
    track('business_contact_intent', placement);
    window.location.href = href;
    status.textContent = shortened
      ? `Your mail app should now show a shortened request addressed to ${email}: the full text was too long for a mail link. Use "Copy the request" and paste it into the email. Nothing is sent until you send it.`
      : `Your mail app should now show the request, addressed to ${email}. Nothing is sent until you send it there. If no mail app opened, use "Copy the request" and email it to ${email}.`;
  });

  if (copy && navigator.clipboard) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      if (!validate()) return;
      try {
        await navigator.clipboard.writeText(composeBrief(values()));
        status.textContent = `Request copied. Paste it into an email to ${email}.`;
      } catch {
        status.textContent = `The request could not be copied. Write to ${email} directly.`;
      }
    });
  }
}

for (const form of document.querySelectorAll<HTMLFormElement>('[data-contact-form]')) mount(form);
