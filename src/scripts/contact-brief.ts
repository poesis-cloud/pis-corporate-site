/**
 * contact-brief.ts — the contact request as data.
 *
 * Pure functions shared by the contact form and its tests. They build what is
 * sent (a JSON payload for the receiving endpoint, or the text of an email) and
 * read what comes back. Nothing here touches the network or the page.
 */

export type FieldKey = 'name' | 'email' | 'company' | 'goal' | 'interest';
export type ContactValues = Record<FieldKey, string>;

/**
 * The one optional choice of the form: what the visitor would like to talk about first.
 * It qualifies the request without asking for another sentence. The receiving endpoint
 * accepts these values and no other.
 */
export const interestOptions: { value: string; label: string }[] = [
  { value: 'starting-point', label: 'Where to start' },
  { value: 'pilot', label: 'A first pilot' },
  { value: 'unsure', label: 'Not sure yet' },
];

/** Order, wording and bounds of the request. The receiving endpoint applies the same bounds. */
export const contactFields: { key: FieldKey; label: string; required: boolean; maxLength: number; long?: boolean; options?: { value: string; label: string }[] }[] = [
  { key: 'name', label: 'Name', required: true, maxLength: 120 },
  { key: 'email', label: 'Work email', required: true, maxLength: 254 },
  { key: 'company', label: 'Organization', required: false, maxLength: 160 },
  { key: 'goal', label: 'What we would like to transform', required: true, maxLength: 2000, long: true },
  { key: 'interest', label: 'We would like to discuss', required: false, maxLength: 40, options: interestOptions },
];

/** A field as a reader sees it: the label of a choice, not its code. */
const shown = (field: (typeof contactFields)[number], value: string): string => field.options?.find((option) => option.value === value)?.label ?? value;

/** Longest `mailto:` link the page will hand to a mail app; longer links are cut by some clients. */
export const MAILTO_LIMIT = 1800;

/** The request as plain text. Empty optional fields are left out. */
export function composeBrief(values: ContactValues): string {
  const lines = ['Transformation request', ''];
  for (const field of contactFields) if (!field.long && values[field.key]) lines.push(`${field.label}: ${shown(field, values[field.key])}`);
  for (const field of contactFields) if (field.long && values[field.key]) lines.push('', `${field.label}:`, values[field.key]);
  lines.push('', 'Prepared on poesis.cloud');
  return lines.join('\n');
}

/** A `mailto:` link carrying the request, shortened when the full text would not fit. */
export function briefMailto(email: string, values: ContactValues): { href: string; shortened: boolean } {
  const who = values.company || values.name;
  const link = (subject: string, body: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const subject = who ? `Transformation request: ${who}` : 'Transformation request';
  const full = link(subject, composeBrief(values));
  if (full.length <= MAILTO_LIMIT) return { href: full, shortened: false };
  const short = { ...values };
  for (const field of contactFields) if (field.long && short[field.key]) short[field.key] = '(see the full request pasted below)';
  const shortened = link(subject, composeBrief(short));
  if (shortened.length <= MAILTO_LIMIT) return { href: shortened, shortened: true };
  // Even the short fields are oversized: hand over an empty draft rather than a link a mail app would cut.
  return { href: link('Transformation request', '(paste the request here)'), shortened: true };
}

/**
 * The JSON body posted to the receiving endpoint.
 * `_gotcha` is the hidden field a person never fills; `elapsedMs` is the time
 * between the form appearing and its submission. Both let the endpoint refuse
 * automated posts. `source` names the page the form sits on, never the visitor.
 */
export function buildPayload(values: ContactValues, meta: { source: string; elapsedMs: number; trap: string }): Record<string, string | number> {
  return { ...values, source: meta.source, elapsedMs: Math.max(0, Math.round(meta.elapsedMs)), _gotcha: meta.trap };
}

export type Outcome =
  | { state: 'sent' }
  | { state: 'invalid'; fields: FieldKey[] }
  | { state: 'throttled' }
  | { state: 'failed' };

/**
 * What a reply of the endpoint means. A request is "sent" only when the
 * endpoint answers 2xx with `{ "ok": true }`: anything else, including a 2xx
 * page that is not that JSON, is a failure the visitor is told about.
 */
export function interpretResponse(status: number, body: unknown): Outcome {
  const reply = (typeof body === 'object' && body !== null ? body : {}) as { ok?: unknown; errors?: unknown };
  if (status >= 200 && status < 300 && reply.ok === true) return { state: 'sent' };
  if (status === 429) return { state: 'throttled' };
  if (status === 422 && typeof reply.errors === 'object' && reply.errors !== null) {
    const known = new Set<string>(contactFields.map((field) => field.key));
    const fields = Object.keys(reply.errors).filter((key): key is FieldKey => known.has(key));
    if (fields.length) return { state: 'invalid', fields };
  }
  return { state: 'failed' };
}
