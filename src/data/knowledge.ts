/**
 * knowledge.ts — where the Knowledge corpus lives and how it is reached.
 *
 * The corpus itself (research notes, catalog data, solution, product, use case
 * and comparison pages) is not edited by the conversion site. It keeps the URLs
 * it has always had; `/knowledge/` is the single public entry that indexes it.
 * This module only names routes: it holds no editorial content.
 */

/** The former homepage, preserved as the platform overview of the corpus. */
export const platformOverviewPath = '/knowledge/platform';

/** The research argument and thesis formerly carried by the About page. */
export const thesisPath = '/knowledge/thesis';

/** Route families that render inside the Knowledge envelope. */
export const knowledgePrefixes = ['/knowledge', '/catalog', '/solutions', '/usage', '/insights', '/it/', '/services', '/partnerships'] as const;

/**
 * Earlier commercial material kept for reference. These pages stay resolvable
 * and searchable, and say that they are not the current offer.
 */
export const archivePrefixes = ['/services', '/partnerships'] as const;

const within = (pathname: string, prefixes: readonly string[]) => {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return prefixes.some((prefix) => path.startsWith(prefix.endsWith('/') ? prefix : `${prefix}/`));
};

export function knowledgeContext(pathname: string): { inKnowledge: boolean; archive: boolean; isHub: boolean } {
  const isHub = pathname.replace(/\/$/, '') === '/knowledge';
  return { inKnowledge: within(pathname, knowledgePrefixes), archive: within(pathname, archivePrefixes), isHub };
}

export interface ArchiveEntry {
  href: string;
  label: string;
  note: string;
}

/** Archived commercial pages that are not catalog records, listed on the hub. */
export const archiveEntries: ArchiveEntry[] = [
  {
    href: '/catalog/services',
    label: 'Service catalog',
    note: 'Seven service records as published in the catalog, each with its own availability note.',
  },
  {
    href: '/services/pilot',
    label: 'Poesis Pilot brief builder',
    note: 'The earlier catalog-driven pilot brief for an OIP and SIE evaluation.',
  },
  {
    href: '/partnerships/llm-vendor-value-proposal',
    label: 'LLM vendor partnership proposal',
    note: 'A value proposal addressed to language-model vendors.',
  },
];

export const externalDocumentation = [
  { href: 'https://docs.poesis.cloud', label: 'Poesis documentation', note: 'Product and specification documentation.' },
  { href: 'https://docs.poesis.cloud/saf/', label: 'SAF documentation', note: 'The Systemic Agentic Framework: harness, organization, quickstart.' },
  { href: 'https://docs.poesis.cloud/milestones/', label: 'Milestones and versions', note: 'Recorded and planned milestones per product.' },
  { href: 'https://github.com/poesis-cloud', label: 'Poesis on GitHub', note: 'Public repositories, issues and releases.' },
] as const;
