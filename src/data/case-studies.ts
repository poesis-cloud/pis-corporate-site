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
import { organization } from './saf.ts';

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

/** The fields of a case that an invented example can honestly fill: no result, no clearance, no kind of evidence. */
export type IllustrativeExample = Omit<CaseStudy, 'status' | 'kind' | 'measuredResults' | 'publicationClearance'>;

/** Printed wherever the example appears. It is the first thing a reader must know about it. */
export const fictionalNotice = 'Fictional example. This organization does not exist and is not a client of Poesis. No engagement took place and nothing was measured. The page shows how a real case is documented.';

/**
 * An invented example, to show and test the format of a case while no real one
 * is published. It is fiction and is handled as fiction everywhere:
 *   - it is not in `caseStudies`, so it never counts as a published case: the menu,
 *     the home page and the Transformation page ignore it;
 *   - its card and its page carry `fictionalNotice`, and it reports no result;
 *   - it is kept out of the sitemap and of search engines, and disappears from the
 *     site as soon as a real case is published.
 * What it names in SAF (agents, workflows) exists in the public repository.
 * Set it to `null` to remove it.
 */
export const illustrativeExample: IllustrativeExample | null = {
  slug: 'example-retail-bank-delivery-team',
  title: 'Fictional example: a delivery team in a retail bank',
  summary: 'An invented walk-through of how one software delivery team of a retail bank could run its backlog refinement and iteration planning as an agentic organization.',
  context: 'A retail bank with a large in-house IT department, working in a scaled agile set-up. The team in this example maintains customer notification services. The bank, the team and the situation are invented.',
  problem: 'Regulatory and product changes reach the team as long documents. Turning one of them into refined features and stories goes through several hands, and the reasons behind each decision are lost on the way. Planning starts from incomplete context.',
  scope: 'One team and two recurring activities: refining features into stories, and planning an iteration. Left out: any change to production systems, anything that touches customer data, and every other team.',
  method: 'The five steps of the Poesis method. The roles and handoffs of the team are mapped; refinement and planning are chosen as the first workflows; the ready-made SAF Agentic Organization is adapted to the team; the pilot runs on the team’s own repository; the evidence is reviewed with the team and its managers.',
  agentsAndWorkflows: 'The program and team orchestrators of the SAF Agentic Organization, with its product manager, product owner, system architect, developer, security expert and UX designer agents. Workflows: feature backlog refinement, team backlog refinement, iteration planning and iteration review. Each step writes one artifact, checked against its schema and committed to the repository.',
  humanControls: 'The team’s product owner reviews every refined feature before it enters planning, and a security reviewer reads anything that touches a control. Nothing is merged without a person. Because SAF does not yet authenticate an approval, the bank records who approved in its own tooling.',
  period: 'None: the scenario is invented.',
  evidence: [
    { label: 'The workflows named above, in the public repository', href: `${organization.repository}/tree/main/workflows` },
    { label: 'The agents named above, in the public repository', href: `${organization.repository}/tree/main/agents` },
  ],
  limits: 'This is not evidence of anything. It shows what a case describes, not what a client obtained. SAF is an alpha preview that runs on GitHub Copilot only, and a bank’s own security and compliance functions would have to accept it before any such pilot.',
  learnings: 'A real case states here what the pilot taught, and what changed in the model as a result.',
  nextStep: 'A real case states here the decision that was taken: extend, adjust or stop.',
};

/** The example is shown only while it cannot be mistaken for, or sit beside, a real case. */
export const shownExample: IllustrativeExample | null = publishedCaseStudies.length === 0 ? illustrativeExample : null;

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
