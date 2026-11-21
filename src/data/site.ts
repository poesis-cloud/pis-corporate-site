/**
 * site.ts — facts the conversion pages share.
 *
 * Every value here is checkable in this repository or on the public GitHub
 * organization. Nothing in this module is a product claim.
 */

/** The only contact address published by Poesis (see the legal pages). */
export const contactEmail = 'partner@poesis.cloud';

export const externalLinks = {
  github: 'https://github.com/poesis-cloud',
  docs: 'https://docs.poesis.cloud',
  linkedin: 'https://www.linkedin.com/company/poesis-cloud',
} as const;

/**
 * Where the contact form posts a request, set at build time.
 *
 *   PUBLIC_CONTACT_ENDPOINT    https URL of the receiving endpoint (contract: contact-endpoint/README.md)
 *   PUBLIC_CONTACT_PROCESSOR   name of the service operating that endpoint, printed in the privacy policy
 *
 * Neither is a secret: both end up in the page. With no endpoint the form says
 * that it prepares an email and never claims to have sent anything. A half
 * configuration fails the build, so the site cannot ship a form that posts
 * somewhere the privacy policy does not name.
 */
function contactTransport(): { endpoint: string; processor: string } | null {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
  const endpoint = (env.PUBLIC_CONTACT_ENDPOINT ?? '').trim();
  const processor = (env.PUBLIC_CONTACT_PROCESSOR ?? '').trim();
  if (!endpoint && !processor) return null;
  const local = /^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//.test(endpoint);
  if (!/^https:\/\/[^\s"'<>]+$/.test(endpoint) && !local) throw new Error('PUBLIC_CONTACT_ENDPOINT must be an https URL');
  if (!processor) throw new Error('PUBLIC_CONTACT_PROCESSOR must name the service that receives the contact form');
  return { endpoint, processor };
}
export const contact = contactTransport();

/** Spread on a link that leaves the site: it opens in a new tab without giving that tab access to this page. */
export const externalLinkAttributes = { target: '_blank', rel: 'noopener noreferrer' } as const;

/**
 * Consent-gated measurement plan. The names are queued in `dataLayer` and leave
 * the browser only after the visitor accepts analytics. No event carries what a
 * visitor typed: only the name of the placement and the path of the page.
 *
 *   business_transformation_click   a link to the Transformation page
 *   business_contact_intent         a call to action leading to the contact form
 *   business_contact_form_start     first interaction with the form
 *   business_contact_sent           the receiving endpoint confirmed the request,
 *                                   never emitted for an email draft
 *   developer_docs_click            a link to the documentation
 *   developer_repo_click            a link to a repository
 *   developer_install_click         the install commands were copied or opened
 */
export type TrackEvent =
  | 'business_transformation_click'
  | 'business_contact_intent'
  | 'business_contact_form_start'
  | 'business_contact_sent'
  | 'developer_docs_click'
  | 'developer_repo_click'
  | 'developer_install_click';

/** The service Poesis sells. One offer, one name. */
export const offerName = 'Agentic Organization Transformation';
