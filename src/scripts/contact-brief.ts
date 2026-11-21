/**
 * contact-brief.ts — turns the contact brief into the text of an email.
 *
 * Pure functions, shared by the contact page and its tests. Nothing here talks
 * to a network: the result is a string and a `mailto:` link.
 */

export type BriefValues = Record<string, string>;

/** Longest `mailto:` link the page will hand to a mail app; longer links are cut by some clients. */
export const MAILTO_LIMIT = 1800;

const fieldOrder = ['Name', 'Work email', 'Organization', 'Scope'];
const longFields = ['What we would like to transform', 'Current challenge'];

/** The brief as plain text. Empty optional fields are left out. */
export function composeBrief(values: BriefValues): string {
  const lines = ['Transformation brief', ''];
  for (const key of fieldOrder) if (values[key]) lines.push(`${key}: ${values[key]}`);
  for (const key of longFields) if (values[key]) lines.push('', `${key}:`, values[key]);
  lines.push('', 'Prepared on poesis.cloud/contact');
  return lines.join('\n');
}

/** A `mailto:` link carrying the brief, shortened when the full text would not fit. */
export function briefMailto(email: string, values: BriefValues): { href: string; shortened: boolean } {
  const who = values.Organization || values.Name || '';
  const subject = encodeURIComponent(who ? `Transformation brief: ${who}` : 'Transformation brief');
  const link = (body: string) => `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`;
  const full = link(composeBrief(values));
  if (full.length <= MAILTO_LIMIT) return { href: full, shortened: false };
  const short: BriefValues = { ...values };
  for (const key of longFields) if (short[key]) short[key] = '(see the full brief pasted below)';
  const shortened = link(composeBrief(short));
  if (shortened.length <= MAILTO_LIMIT) return { href: shortened, shortened: true };
  // Even the short fields are oversized: hand over an empty draft rather than a link a mail app would cut.
  return { href: `mailto:${email}?subject=${encodeURIComponent('Transformation brief')}&body=${encodeURIComponent('(paste the brief here)')}`, shortened: true };
}
