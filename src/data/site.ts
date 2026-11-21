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
  safDocs: 'https://docs.poesis.cloud/saf/',
  linkedin: 'https://www.linkedin.com/company/poesis-cloud',
} as const;

/**
 * Consent-gated measurement plan. The names are queued in `dataLayer` by the
 * delegated listener in BaseLayout and leave the browser only after the visitor
 * accepts analytics. `business_contact_sent` is deliberately absent: the site
 * cannot observe an email being sent, so it never reports one.
 */
export type TrackEvent =
  | 'business_contact_intent'
  | 'developer_docs_click'
  | 'developer_repo_click'
  | 'developer_install_click';
