/**
 * case-studies.ts — the evidence register behind /case-studies/.
 *
 * A case appears on the site only when it is `published`, and it may be
 * published only when every item of `publicationChecklist` holds. Nothing here
 * is illustrative: an empty list is the honest state until Poesis supplies a
 * case that is traceable and cleared for publication.
 *
 * To publish a case: add a record below with `status: 'published'`. The detail
 * page at /case-studies/<slug>/ and its card are generated from it.
 */

/** What the work was. A demonstration is never presented as a client pilot. */
export type EvidenceKind = 'demonstration' | 'pilot' | 'operational-deployment';

export const evidenceKinds: Record<EvidenceKind, { label: string; meaning: string }> = {
  demonstration: {
    label: 'Demonstration',
    meaning: 'Run by Poesis on its own material or on sample data. It shows how the method works, not what a client obtained.',
  },
  pilot: {
    label: 'Pilot',
    meaning: 'Run with an organization on a real, bounded scope, with agreed success criteria and a human review of the evidence.',
  },
  'operational-deployment': {
    label: 'Operational deployment',
    meaning: 'In regular use beyond the pilot scope, with named owners and an operating model.',
  },
};

export interface MeasuredResult {
  /** What was measured, in plain words. */
  indicator: string;
  /** The value as measured, with its unit. Never an estimate or a projection. */
  value: string;
  /** How and over which period it was measured. */
  method: string;
}

export interface EvidenceLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  slug: string;
  status: 'draft' | 'published';
  kind: EvidenceKind;
  title: string;
  summary: string;
  /** Sector, and the client name only with written permission. */
  context: string;
  problem: string;
  scope: string;
  method: string;
  agentsAndWorkflows: string;
  humanControls: string;
  period: string;
  evidence: EvidenceLink[];
  measuredResults: MeasuredResult[];
  limits: string;
  learnings: string;
  nextStep: string;
  /** Who cleared publication, and when (ISO date). Required to publish. */
  publicationClearance: { clearedBy: string; clearedOn: string };
}

/** The editorial template of a case, in reading order. */
export const caseStudyTemplate: { field: string; expects: string }[] = [
  { field: 'Context', expects: 'Sector and size of the organization. The client is named only with written permission.' },
  { field: 'Problem', expects: 'The situation before the work, in the words of the people who owned it.' },
  { field: 'Scope', expects: 'The team, function or process covered, and what was left out.' },
  { field: 'Method', expects: 'How the agentic seed was modelled and which SAF products and versions were used.' },
  { field: 'Agents and workflows', expects: 'The roles, workflows and artifact contracts that were applied.' },
  { field: 'Human controls', expects: 'Where people reviewed, decided or stopped the work.' },
  { field: 'Period', expects: 'Start and end dates of the observed work.' },
  { field: 'Evidence', expects: 'Links to the artifacts, journals or reports a reader can inspect.' },
  { field: 'Measured results', expects: 'Only indicators that were measured, with their method. No projections.' },
  { field: 'Limits', expects: 'What the work does not show, and what went wrong.' },
  { field: 'Learnings and next step', expects: 'What changed in the method, and what the organization decided next.' },
];

/** Conditions a case must meet before its status may become `published`. */
export const publicationChecklist: string[] = [
  'The work took place, and its artifacts or journals can be shown',
  'Every figure was measured, and its method is stated',
  'The organization agreed in writing to what is published, including its name if it appears',
  'The case states whether it is a demonstration, a pilot or an operational deployment',
  'Limits and unresolved points are written down',
];

/** No case has been supplied with evidence and publication clearance yet. */
export const caseStudies: CaseStudy[] = [];

export const publishedCaseStudies = caseStudies.filter((study) => study.status === 'published');

export function validateCaseStudies(entries: CaseStudy[] = caseStudies): void {
  const slugs = entries.map((study) => study.slug);
  if (new Set(slugs).size !== slugs.length) throw new Error('Duplicate case study slug');
  for (const study of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(study.slug)) throw new Error(`Invalid case study slug: ${study.slug}`);
    if (study.status !== 'published') continue;
    if (!study.publicationClearance.clearedBy.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(study.publicationClearance.clearedOn)) throw new Error(`Case study published without clearance: ${study.slug}`);
    if (!study.evidence.length) throw new Error(`Case study published without inspectable evidence: ${study.slug}`);
    if (!study.limits.trim()) throw new Error(`Case study published without stated limits: ${study.slug}`);
    for (const result of study.measuredResults) if (!result.method.trim()) throw new Error(`Unsourced result in case study: ${study.slug}`);
  }
}
validateCaseStudies();
