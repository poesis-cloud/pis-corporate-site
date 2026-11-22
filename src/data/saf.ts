/**
 * saf.ts — what the conversion pages may say about SAF, and where each fact was read.
 *
 * Source of truth: the public repositories, their releases and the marketplace
 * manifest, read on `verifiedOn`. The Knowledge catalog keeps its own historical
 * version labels; this module does not reconcile them (see the claims matrix in
 * the README). Update the values and the date together, never one without the other.
 */

/** Date the repositories, releases and marketplace manifests below were last read. */
export const verifiedOn = '2026-11-22';

/** Public maturity label. The exact public version wording is a Poesis decision. */
export const maturityLabel = 'Alpha preview';

/**
 * Latest tagged pre-release of each product. The two repositories are released
 * separately and no longer carry the same version: never print one for both.
 */
export const preReleases = {
  harness: { version: '1.0.0-alpha.3', tag: 'v1.0.0-alpha.3', publishedOn: '2026-11-08' },
  organization: { version: '1.0.0-alpha.4', tag: 'v1.0.0-alpha.4', publishedOn: '2026-11-22' },
} as const;

/** The most recent of the two, for the places that date the state of the project. */
export const latestPreRelease = preReleases.organization;

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
  /** The licence file of the repository. No licence name is printed until those files match their declared licence. */
  licenceFile: string;
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
  licenceFile: `${repo('saf-agentic-harness')}/blob/main/LICENSE`,
};

export const organization: SafProduct = {
  key: 'organization',
  name: 'SAF Agentic Organization',
  technicalName: 'saf-agentic-organization',
  plugin: 'poesis-saf-agentic-organization',
  audience: 'For teams and end users',
  summary: 'A first ready-made agentic organization for scaled agile delivery, run by the harness. You talk to an orchestrator; role agents draft, expert agents challenge each main artifact, and every workflow ends with your decision.',
  provides: [
    'Orchestrators for the portfolio, large solution, release train and team levels, each naming the next workflow',
    'Role agents that author, and a bench of expert agents that challenge what was written before it reaches you',
    'Skills, role instructions, artifact templates and schemas the harness checks',
  ],
  repository: repo('saf-agentic-organization'),
  releases: `${repo('saf-agentic-organization')}/releases`,
  contributing: `${repo('saf-agentic-organization')}/blob/main/CONTRIBUTING.md`,
  issues: `${repo('saf-agentic-organization')}/issues`,
  docs: 'https://docs.poesis.cloud/saf/safe-agentic-organization/',
  licenceFile: `${repo('saf-agentic-organization')}/blob/main/LICENSE`,
};

export const safProducts: SafProduct[] = [harness, organization];

/**
 * The roster and the workflow catalog of the organization, kept by its repository.
 * The pages link to it and print no count: the numbers changed between two pre-releases.
 */
export const organizationCatalog = `${repo('saf-agentic-organization')}/blob/main/docs/catalog.md`;

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

export const orchestrators = ['value-management-officer', 'solution-train-engineer', 'release-train-engineer', 'scrum-master'] as const;

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
  limitations: 'https://docs.poesis.cloud/saf/agentic-harness/limitations/',
  /** The SAF repositories of the organization, listed together so a visitor can star them. */
  repositories: 'https://github.com/orgs/poesis-cloud/repositories?q=saf',
  developerCertificate: 'https://developercertificate.org/',
} as const;

/**
 * What exists today and what does not, kept apart on purpose.
 * Sources: the releases and READMEs of the two repositories, the marketplace
 * manifests, and the delivery states recorded in the site's own catalog.
 */
export const maturity: { published: string[]; implemented: string[]; partial: string[]; planned: string[] } = {
  published: [
    `Both plugins as pre-releases, on the preview channel of the marketplace: harness ${preReleases.harness.version}, organization ${preReleases.organization.version}`,
    'The source code, specifications and tests of both, in public repositories',
  ],
  implemented: [
    'Resolution of the next workflow step from configuration and recorded outcomes',
    'Selection of a model profile by task capability and configured cost ranking',
    'Delivery of each role’s instructions and skills when its session opens',
    'Authorization of agent writes against declared grants',
    'Validation of written artifacts against their schemas (structured data and Markdown metadata)',
    'A journal of harness calls for each session, and validated writes committed to Git',
  ],
  partial: [
    'The ready-made organization: it was rebuilt for its latest pre-release, and its documentation is still being aligned with it',
  ],
  planned: [
    'Authenticated human approval: today every workflow ends at a human gate, where a person accepts, raises concerns or rejects, and that decision is recorded as a committed artifact; who decided is not yet authenticated',
    'A final release on the stable channel: none has been published',
    'Agent hosts other than GitHub Copilot: none is supported',
  ],
};

/** Limitations the project itself publishes for the alpha (see `safLinks.limitations`). */
export const knownLimits: string[] = [
  'If a harness hook times out or cannot start, the host lets the call through: that control fails open.',
  'One workflow instance per orchestrator session, and no concurrent workflow instances.',
  'Journals are local to a machine: a workflow instance cannot be continued on another one.',
  'Deleting or moving a governed artifact is not supported.',
  'In the Copilot app and CLI, shell commands are guarded by their text only.',
  'The project has not yet verified marketplace installs on the Copilot CLI live, nor the CLI on macOS and Windows with real models.',
];

/**
 * Observed on 2026-11-21 and not replayed since, not taken from the documentation: Copilot CLI 0.0.423
 * (March 2026) rejects the `#preview` marketplace reference. The SAF sources
 * state no minimum version, so the page asks for a current one.
 */
export const cliVersionNote = 'Use a current version of the Copilot CLI. An early one (0.0.423) does not understand the #preview reference of the first command; the project records its own tests against runtime 1.0.105.';
