/**
 * saf.ts — what the conversion pages may say about SAF, and where each fact was read.
 *
 * Source of truth: the public repositories, their releases and the marketplace
 * manifest, read on `verifiedOn`. The Knowledge catalog keeps its own historical
 * version labels; this module does not reconcile them (see the claims matrix in
 * the README). Update the values and the date together, never one without the other.
 */

/** Date the repositories, releases and marketplace manifests below were last read. */
export const verifiedOn = '2026-11-21';

/** Public maturity label. The exact public version wording is a Poesis decision. */
export const maturityLabel = 'Alpha preview';

/** Latest tagged pre-release, identical on both product repositories. */
export const latestPreRelease = {
  version: '1.0.0-alpha.3',
  tag: 'v1.0.0-alpha.3',
  publishedOn: '2026-11-08',
} as const;

const repo = (name: string) => `https://github.com/poesis-cloud/${name}`;

export interface SafProduct {
  key: 'harness' | 'organization';
  /** Marketing name. The organization's name avoids the SAFe trademark on purpose. */
  name: string;
  /** Exact technical name, kept visible for search, install and code access. */
  technicalName: string;
  plugin: string;
  audience: string;
  summary: string;
  provides: string[];
  repository: string;
  releases: string;
  contributing: string;
  issues: string;
  docs: string;
  license: 'Apache-2.0';
}

export const harness: SafProduct = {
  key: 'harness',
  name: 'SAF Agentic Harness',
  technicalName: 'saf-agentic-harness',
  plugin: 'poesis-saf-agentic-harness',
  audience: 'For developers and architects',
  summary: 'The deterministic engine an agentic organization runs on. It knows no methodology: an organization declares its agents, workflows, instructions, skills, model profiles, access rules and artifact contracts, and the harness resolves and checks each step against them.',
  provides: [
    'Resolves the next eligible workflow step, its model profile, instructions and skills from configuration and recorded outcomes',
    'Checks agent write grants and validates written artifacts against declared schemas before they are committed',
    'Records harness invocations in per-session journals and commits validated writes to Git',
  ],
  repository: repo('saf-agentic-harness'),
  releases: `${repo('saf-agentic-harness')}/releases`,
  contributing: `${repo('saf-agentic-harness')}/blob/main/CONTRIBUTING.md`,
  issues: `${repo('saf-agentic-harness')}/issues`,
  docs: 'https://docs.poesis.cloud/saf/agentic-harness/',
  license: 'Apache-2.0',
};

export const organization: SafProduct = {
  key: 'organization',
  name: 'SAF Agentic Organization',
  technicalName: 'saf-agentic-organization',
  plugin: 'poesis-saf-agentic-organization',
  audience: 'For teams and end users',
  summary: 'A first ready-made agentic organization for scaled agile delivery: portfolio, program and team orchestrators with a specialist bench, run by the harness. You talk to an orchestrator; it sequences the work and names the next workflow.',
  provides: [
    'Three orchestrators (portfolio, program, team) and a bench of specialist agents for authoring, architecture, development, QA, security, operations, documentation and UX',
    'Workflows across the portfolio, program and team levels: planning, refinement, synchronization, review and retrospective',
    'Skills, role instructions, artifact templates and schemas the harness checks',
  ],
  repository: repo('saf-agentic-organization'),
  releases: `${repo('saf-agentic-organization')}/releases`,
  contributing: `${repo('saf-agentic-organization')}/blob/main/CONTRIBUTING.md`,
  issues: `${repo('saf-agentic-organization')}/issues`,
  docs: 'https://docs.poesis.cloud/saf/safe-agentic-organization/',
  license: 'Apache-2.0',
};

export const safProducts: SafProduct[] = [harness, organization];

/** Counted in the `main` branch of saf-agentic-organization on `verifiedOn`. */
export const organizationInventory = { agents: 14, skills: 37, workflows: 25 } as const;

export const marketplace = {
  repository: repo('saf-marketplace'),
  /** Carries the alpha pre-releases. */
  preview: { id: 'poesis-saf-preview', source: 'poesis-cloud/saf-marketplace#preview' },
  /** Reserved for final releases; its manifest listed no plugin on `verifiedOn`. */
  stable: { id: 'poesis-saf', source: 'poesis-cloud/saf-marketplace' },
} as const;

/**
 * Preview-channel install, as documented in the Quickstart and in the
 * organization README, and as printed by `install.sh --preview --dry-run`.
 */
export const installCommands: string[] = [
  `copilot plugin marketplace add ${marketplace.preview.source}`,
  `copilot plugin install ${harness.plugin}@${marketplace.preview.id}`,
  `copilot plugin install ${organization.plugin}@${marketplace.preview.id}`,
];

export const firstRunCommand = `copilot --agent ${organization.plugin}:value-management-officer`;

export const orchestrators = ['value-management-officer', 'release-train-engineer', 'scrum-master'] as const;

export const prerequisites: string[] = [
  'GitHub Copilot CLI (the GitHub Copilot app and VS Code install from the same marketplace)',
  'Git 2.38 or later, with a Git identity configured',
  'Python 3.10 or later',
];

/** The single host adapter that exists today, with the surfaces it covers. */
export const supportedHost = {
  name: 'GitHub Copilot',
  surfaces: ['Copilot CLI', 'GitHub Copilot app', 'VS Code with the Copilot session target'],
  notSupported: 'VS Code Local sessions are not supported: the plugin hooks do not run there.',
} as const;

export const safLinks = {
  docs: 'https://docs.poesis.cloud/saf/',
  quickstart: 'https://docs.poesis.cloud/saf/quickstart/',
  usage: 'https://docs.poesis.cloud/saf/usage/',
  github: 'https://github.com/poesis-cloud',
  developerCertificate: 'https://developercertificate.org/',
} as const;
