/**
 * site-navigation.ts — the conversion menu, the footer and the catalog views.
 *
 * The primary menu is deliberately three destinations and one call to action:
 * the service, the developer path and the Knowledge corpus. About and Contact
 * are in the footer.
 * Everything that describes the wider Poesis stack is reached through Knowledge
 * (see knowledge.ts), never from the primary menu.
 */
import { contactEmail, externalLinks } from './site.ts';
import { safLinks } from './saf.ts';
import { publishedCaseStudies } from './case-studies.ts';

export interface SiteNavigationItem {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterGroup {
  label: string;
  items: SiteNavigationItem[];
}

/** What someone arrives with: the demand side of the catalog. */
export const needViews: SiteNavigationItem[] = [
  { href: '/catalog/usage', label: 'Use Cases' },
  { href: '/catalog/actors', label: 'Actors' },
  { href: '/catalog/pains', label: 'Pain Points' },
  { href: '/catalog/values', label: 'Values' },
];

/** What answers it: the supply side, from the broadest promise down to the shipped unit. */
export const coverageViews: SiteNavigationItem[] = [
  { href: '/catalog/affordances', label: 'Affordances' },
  { href: '/catalog/capabilities', label: 'Capabilities' },
  { href: '/catalog/features', label: 'Features' },
  { href: '/catalog/qualities', label: 'Qualities' },
];

/** What the catalog records as packaged. */
export const portfolioViews: SiteNavigationItem[] = [
  { href: '/catalog/solutions', label: 'Solutions' },
  { href: '/catalog/products', label: 'Products' },
  { href: '/catalog/services', label: 'Services' },
];

/** Every catalog view, and the in-page nav of every catalog page. */
export const catalogViews: SiteNavigationItem[] = [...needViews, ...coverageViews, ...portfolioViews];

/**
 * Case studies enter the menu and the footer with the first published case,
 * and not before: an empty showcase is not a destination.
 */
const caseStudiesEntry: SiteNavigationItem[] = publishedCaseStudies.length ? [{ href: '/case-studies/', label: 'Case Studies' }] : [];

/** The primary menu, in display order. */
export const siteNavigation: SiteNavigationItem[] = [
  { href: '/transformation/', label: 'Transformation' },
  { href: '/developers/', label: 'Developers' },
  ...caseStudiesEntry,
  { href: '/knowledge/', label: 'Knowledge' },
];

/** The single highlighted action of the header. */
export const navigationCta: SiteNavigationItem = { href: '/contact/', label: 'Talk to Poesis' };

export const footerNavigation: FooterGroup[] = [
  {
    label: 'Transformation',
    items: [
      { href: '/transformation/', label: 'Agentic transformation' },
      { href: '/how-it-works/', label: 'How it works' },
      { href: '/pilot/', label: 'Starting with a pilot' },
      ...caseStudiesEntry,
    ],
  },
  {
    label: 'Developers',
    items: [
      { href: '/developers/', label: 'Build with SAF' },
      { href: '/developers/#install', label: 'Install' },
      { href: safLinks.docs, label: 'SAF documentation', external: true },
      { href: externalLinks.github, label: 'GitHub', external: true },
    ],
  },
  {
    label: 'Knowledge',
    items: [
      { href: '/knowledge/', label: 'Knowledge base' },
      { href: '/insights/research', label: 'Research notes' },
      { href: '/catalog', label: 'Catalog' },
      { href: externalLinks.docs, label: 'Documentation', external: true },
    ],
  },
  {
    label: 'Company',
    items: [
      { href: '/about/', label: 'About' },
      { href: '/contact/', label: 'Contact' },
      { href: `mailto:${contactEmail}`, label: contactEmail },
      { href: externalLinks.linkedin, label: 'LinkedIn', external: true },
    ],
  },
];

export const legalNavigation: SiteNavigationItem[] = [
  { href: '/legal/mentions-legales', label: 'Legal notice' },
  { href: '/legal/privacy', label: 'Privacy policy' },
  { href: '/legal/cookies', label: 'Cookie policy' },
];
