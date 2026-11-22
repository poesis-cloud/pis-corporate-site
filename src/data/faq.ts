/**
 * faq.ts — the questions answered on the conversion pages.
 *
 * Each answer is plain text, so the words a visitor reads and the FAQPage
 * structured data are the same string. Product facts are taken from saf.ts.
 */
import { latestPreRelease, preReleases, supportedHost } from './saf.ts';
import { formatDate } from './format.ts';

export interface FaqItem {
  question: string;
  /** One paragraph per entry. */
  answer: string[];
}

const hosts = `${supportedHost.surfaces.slice(0, -1).join(', ')} and ${supportedHost.surfaces.at(-1)}`;

export const whatIsIt: FaqItem = {
  question: 'What is agentic organizational transformation?',
  answer: [
    'It is the work of redesigning part of an organization so that AI agents carry defined responsibilities inside explicit workflows, under human review.',
    'The unit of change is the organization itself (roles, handoffs, decision rights, artifacts), not a single tool or prompt.',
  ],
};

export const wholeCompany: FaqItem = {
  question: 'Do we have to transform the entire company?',
  answer: ['No. An engagement starts with a bounded scope: a team, a function, a department or one process. The whole organization is one possible scope, not a prerequisite.'],
};

export const versusAgents: FaqItem = {
  question: 'How is Poesis different from simply deploying AI agents?',
  answer: [
    'Deploying agents adds actors. Poesis starts from the organization: it models who is responsible for what, which workflow links them and where a person decides.',
    'That model then runs on SAF, where each step is resolved, checked and recorded. What you keep is an operating model you can read and change, not a set of isolated assistants.',
  ],
};

export const firstPilot: FaqItem = {
  question: 'What does the first pilot involve?',
  answer: [
    'A scope and success criteria agreed with you, a model of the roles and workflows in that scope, a run on SAF with guardrails and human review, and an evidence review at the end.',
    'The review supports one decision: extend, adjust or stop. Duration, access and terms are agreed for each engagement.',
  ],
};

export const openSource: FaqItem = {
  question: 'Is SAF open source?',
  answer: [
    'Yes. The SAF Agentic Harness and the SAF Agentic Organization are published on GitHub as open source, and each repository carries its licence file. Contributions are signed off under the Developer Certificate of Origin.',
    'Other Poesis products have their own terms, and the Poesis names and marks are not covered by the licence.',
  ],
};

export const environments: FaqItem = {
  question: 'Which agent environments are supported today?',
  answer: [
    `One: ${supportedHost.name}, through the ${hosts}.`,
    'Host bindings are separate adapters, so other hosts can be added. None of them is supported today.',
  ],
};

export const productionReady: FaqItem = {
  question: 'Is the framework production-ready?',
  answer: [
    `No. Both products are in alpha preview: the latest pre-releases are harness ${preReleases.harness.version} and organization ${preReleases.organization.version}, the most recent published on ${formatDate(latestPreRelease.publishedOn)}.`,
    'Interfaces may change, the stable marketplace channel has no release yet, and authenticated human approval is planned rather than shipped. That is why an engagement starts with a bounded pilot under human review.',
  ],
};

export const homeFaq: FaqItem[] = [whatIsIt, wholeCompany, versusAgents, firstPilot, openSource, environments, productionReady];

export const commitment: FaqItem = {
  question: 'What is agreed in advance, and what is not promised?',
  answer: [
    'An engagement is built around a scope and success criteria written before the work starts, and it ends with a review of the evidence the pilot produced.',
    'Poesis does not promise a return on investment, a headcount effect or a delivery date before the scope is known. No such figure appears on this site.',
  ],
};

export const dataAndTools: FaqItem = {
  question: 'Where does the work run, and what happens to our data?',
  answer: [
    'SAF runs locally, on your repositories, inside the agent host your organization already uses. Poesis does not operate a hosted service for it.',
    'Models are called through that host under its own terms, so your existing agreements with the host apply. Access and data handling are agreed before a pilot starts.',
  ],
};

export const prerequisites: FaqItem = {
  question: 'What do we need in place before starting?',
  answer: [
    'For the first three steps: the people who own the perimeter, and time for the conversations.',
    `For the pilot: an agent host that SAF supports, which today means ${supportedHost.name}, and a Git repository for the work. Access and data handling are agreed before the pilot starts.`,
  ],
};

export const whoDoesWhat: FaqItem = {
  question: 'How much of this is automated?',
  answer: [
    'Less than the word "agentic" suggests, on purpose. Understanding the organization, choosing what to delegate, reviewing the work and judging the pilot are done by people.',
    'What agents do is carry out the steps of the workflows that were designed for them, inside the limits the model sets, with each step checked and recorded.',
  ],
};

export const howItWorksFaq: FaqItem[] = [whoDoesWhat, prerequisites, wholeCompany, commitment, productionReady];

export const transformationFaq: FaqItem[] = [wholeCompany, firstPilot, versusAgents, dataAndTools, commitment, productionReady];

export const pilotFaq: FaqItem[] = [firstPilot, wholeCompany, dataAndTools, productionReady];

/** FAQPage structured data for exactly the questions rendered on the page. */
export function faqLd(items: FaqItem[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer.join(' ') },
    })),
  };
}
