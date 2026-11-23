/**
 * demo-scenarios.ts — the cases played by the demonstration panel (DemoChat.astro).
 *
 * Two tabs, as Clément worded them on 22 November 2026: "Build agentic
 * organizations" and "Run agentic organizations". Neither is "for developers"
 * or "for organizations": each speaks to several profiles, so each holds four
 * short cases, asked by four different people.
 *
 * Everything a case prints about SAF was read in the public repositories on
 * 23 November 2026, at `main` of saf-agentic-organization (690f611) and of
 * saf-agentic-harness (941c83f). Read them again when src/data/saf.ts is refreshed:
 *
 *   who you talk to, the first run, the gate     docs/usage-model.md
 *   author and challenge panel of each workflow  docs/catalog.md
 *   file names and patterns                      the tree, conf/workspace.conf.yaml
 *   YAML and Markdown lines                      the files named in each window
 *   what the harness refuses                     README.md, section "Verifying"
 *   what happens when it refuses                 instructions/shared/reports-handling.instructions.md
 *                                                ("When the harness says no"), usage model, last table
 *   the rule behind each refusal shown           conf/access-control-list.conf.yaml (an expert may write
 *                                                challenges only); epic-transition.workflow.conf.yaml
 *                                                (approved-epic-has-a-go-business-case)
 *
 * The panel is a chat: the request is typed in a message field, and the one who
 * answers writes a short message at each step (`tell`), which says in plain words
 * what the window of that step shows. A refusal ends on its resolution.
 *
 * The requests are illustrative, and the panel says so. The first Run request is
 * the example of the usage model, word for word. Angle brackets are the patterns
 * of the workspace configuration, not placeholders left by mistake.
 *
 * The page prints no count of agents or workflows that moves between two
 * pre-releases; "six experts" is the challenge panel of one workflow.
 */
import { installCommands } from './saf.ts';

/** One line of a window. `code` is set in the monospaced face; `say` is a sentence. */
export type DemoLine =
  | { code: string; prompt?: boolean; tag?: string }
  | { say: string }
  /** Agents of the organization, by their slug. */
  | { roster: string[] }
  /** The three answers a person can give at a gate; the first is the one this case plays. */
  | { choice: string[] }
  /** The harness says no: the rule that refuses, by its slug in the workflow or its name in the harness. */
  | { refused: string }
  /** What the refusal led to, once remedied. */
  | { resolved: string };

export interface DemoStep {
  /** What the one who answers writes in the conversation when this step is reached. */
  tell: string;
  /** Name of the step, on its button. */
  title: string;
  /** What the window shows: a file, a folder, a terminal, or who is writing. */
  window: string;
  lines: DemoLine[];
  /** The step ends on a refusal, and its button says so. */
  refused?: boolean;
}

export interface DemoCase {
  key: string;
  /** Short name of the case, on its button. */
  label: string;
  /** The person who asks. */
  asker: string;
  ask: string;
  /** Who answers: Poesis, or the orchestrator of the layer, by its slug. */
  responder: string;
  /** Said after the name when the responder is an agent of the organization. */
  responderRole?: string;
  reply: string;
  /** Four steps, shown as steps 3 to 6 of the case. */
  steps: [DemoStep, DemoStep, DemoStep, DemoStep];
}

export interface DemoTab {
  key: 'build' | 'run';
  /** The verb, then the rest of the name: "Build" + "agentic organizations". */
  verb: string;
  rest: string;
  /** What this side is, in one sentence, on the screen where a visitor chooses. */
  pitch: string;
  /** Who this side speaks to: several profiles, never one audience. */
  audience: string;
  /** What the empty message field invites, in the conversation of this side. */
  placeholder: string;
  /**
   * The side at a glance, drawn under that sentence where there is room. Build: the folders of
   * saf-agentic-organization and what each one declares. Run: the loop of the usage model.
   */
  outline: { code?: string; say: string }[];
  cases: DemoCase[];
}

/** The three answers of a human gate (usage model: accept, concerns, reject). */
const gateAnswers = ['Accept', 'Concerns', 'Reject'];
/** The four moments of a loop workflow, as the usage model names them. */
const loop = ['The owner drafts', 'Experts challenge', 'The owner revises', 'You decide'] as const;
const answered: DemoLine[] = [
  { say: 'Every finding gets an answer:' },
  { code: 'challengeLedger', tag: 'accepted · rejected with a reason · deferred' },
  { say: 'The answers stay in the artifact.' },
];
const findingsOnly: DemoLine = { say: 'Experts write findings. They never edit the artifact.' };

export const build: DemoTab = {
  key: 'build',
  verb: 'Build',
  rest: 'agentic organizations',
  pitch: 'Declare the roles, workflows and rules of an organization of AI agents.',
  audience: 'Operations, process, risk and engineering leads',
  placeholder: 'Ask Poesis',
  outline: [{ code: 'agents/', say: 'roles' }, { code: 'workflows/', say: 'steps and gates' }, { code: 'artifacts/', say: 'contracts' }, { code: 'conf/', say: 'access rules' }],
  cases: [
    {
      key: 'rules',
      label: 'Rules',
      asker: 'Risk and compliance lead',
      ask: 'What stops an agent from rewriting a document it does not own?',
      responder: 'Poesis',
      reply: 'Its write rights. You declare them, and the harness refuses every write outside them.',
      steps: [
        { tell: 'Each agent has write rights by kind of document. An expert may write challenges, nothing else.', title: 'Declare who may write what', window: 'conf/access-control-list.conf.yaml', lines: [{ code: '- slug: security-expert' }, { code: '  privileges:' }, { code: '  - artifact: challenge' }, { say: 'An expert may write challenges. Nothing else.' }] },
        { tell: 'So when an expert tries to edit the Feature, the harness refuses. Nothing is committed.', title: 'The harness refuses the write', refused: true, window: 'security-expert writes to a Feature', lines: [{ refused: 'denied' }, { say: 'A Feature has one writer, its owner. The write is not committed.' }] },
        { tell: 'The remedy is built in: the expert writes its finding in a challenge packet.', title: 'The expert writes a finding', window: 'challenges/', lines: [{ code: '<workflow-slug>-security-expert.challenge.md' }, { say: 'Findings only. The Feature is untouched.' }] },
        { tell: 'Resolved. The owner answers the finding in the Feature, and the answer stays on record.', title: 'The owner answers it', window: 'product-manager answers', lines: [...answered, { resolved: 'One writer per document. Every finding answered.' }] },
      ],
    },
    {
      key: 'roles',
      label: 'Roles',
      asker: 'Operations lead',
      ask: 'Can agents hold the roles of our product managers, architects and security experts?',
      responder: 'Poesis',
      reply: 'Yes. Each role becomes a declared agent: its mission, what it owns and what it never does.',
      steps: [
        { tell: 'A role is one Markdown file: its mission, what it owns, what it never does.', title: 'Declare each role', window: 'agents/product-manager.agent.md', lines: [{ code: '## Mission' }, { code: '## You own' }, { code: '## You never' }, { code: '## How you judge' }] },
        { tell: 'Its craft is a skill, loaded at every step the agent takes.', title: 'Give it a craft', window: 'skills/product-manager.skill.md', lines: [{ code: '## Always ask' }, { code: '## Authoring guide' }, { code: '## Lens by artifact' }, { say: 'Injected at every step the agent takes.' }] },
        { tell: 'Experts are agents too. They challenge what the owners write.', title: 'Add experts who challenge', window: 'agents/', lines: [{ code: 'security-expert.agent.md' }, { code: 'ux-designer.agent.md' }, { code: 'data-protection-officer.agent.md' }, findingsOnly] },
        { tell: 'And one orchestrator per layer is the agent people talk to.', title: 'Name who people talk to', window: 'agents/release-train-engineer.agent.md', lines: [{ code: 'release-train-engineer', tag: 'orchestrator' }, { say: 'People state a concern in their own words. The orchestrator maps it to one workflow.' }] },
      ],
    },
    {
      key: 'workflows',
      label: 'Workflows',
      asker: 'Process owner',
      ask: 'Can we write down how a feature request is drafted, challenged, then decided by us?',
      responder: 'Poesis',
      reply: 'Yes. A workflow declares each step, the agent that takes it and the artifact it must deliver.',
      steps: [
        { tell: 'A workflow is one YAML file. It names the orchestrator that runs it.', title: 'Name the workflow', window: 'workflows/art/feature-refinement.workflow.conf.yaml', lines: [{ code: 'slug: feature-refinement' }, { code: 'orchestrator: release-train-engineer' }] },
        { tell: 'Each step names its agent and the artifact it must deliver.', title: 'Declare each step', window: 'feature-refinement.workflow.conf.yaml', lines: [{ code: '- slug: draft' }, { code: '  actor: product-manager' }, { code: '  artifact: feature' }, { code: '- slug: challenge-security-expert' }, { code: '  actor: security-expert' }] },
        { tell: 'Its conditions are checked by the harness, on what is committed.', title: 'Set its conditions', window: 'feature-refinement.workflow.conf.yaml', lines: [{ code: '- kind: postcondition' }, { code: '  slug: every-packet-is-answered' }, { say: 'Checked by the harness on committed state. Not advice in a prompt.' }] },
        { tell: 'And it ends with a person. Your decision is recorded after you made it.', title: 'End at a human gate', window: 'workflows/art/feature-transition.workflow.conf.yaml', lines: [{ code: '- slug: record-transition' }, { code: '  actor: product-manager' }, { say: 'Your decision is recorded as one state change, after you made it.' }] },
      ],
    },
    {
      key: 'install',
      label: 'Install',
      asker: 'Developer',
      ask: 'Help me set up a governed agentic organization.',
      responder: 'Poesis',
      reply: 'Let’s configure an organization with declared agents, workflows and governance rules.',
      steps: [
        { tell: 'Install the plugins from the preview channel.', title: 'Install SAF harness', window: 'Terminal', lines: installCommands.slice(0, 2).map((command) => ({ code: command, prompt: true })) },
        { tell: 'An organization is files: agents, workflows, artifact schemas, access rules.', title: 'Declare organization components', window: 'saf-agentic-organization', lines: [{ code: 'agents/release-manager.agent.md' }, { code: 'workflows/art/release-on-demand.workflow.conf.yaml' }, { code: 'artifacts/art/release.artifact.schema.json' }, { code: 'conf/access-control-list.conf.yaml' }] },
        { tell: 'One command runs every workflow to its human gate and proves each refusal.', title: 'Validate with the harness', window: 'Terminal', lines: [{ code: 'make verify', prompt: true }, { say: 'Loads the organization through the harness.' }, { say: 'Runs every workflow to its human gate.' }, { say: 'Proves each refusal.' }] },
        { tell: 'The work lands in your Git: the artifacts and the gate decisions.', title: 'Review artifacts in Git', window: 'Your Git workspace', lines: [{ code: '<release-slug>.release.md' }, { code: '<decision-slug>.gate-decision.md', tag: 'accepted · accepted-with-concerns · rejected' }] },
      ],
    },
  ],
};

export const run: DemoTab = {
  key: 'run',
  verb: 'Run',
  rest: 'agentic organizations',
  pitch: 'State a concern in your own words. Agents draft, experts challenge, you decide.',
  audience: 'Product, portfolio, architecture and delivery teams',
  placeholder: 'State your concern',
  outline: [{ say: 'Your concern' }, { say: 'Draft' }, { say: 'Challenge' }, { say: 'Revise' }, { say: 'Your decision' }],
  cases: [
    {
      key: 'refusal',
      label: 'A refusal',
      asker: 'Portfolio lead',
      ask: 'Move the online channel Epic to ready.',
      responder: 'value-management-officer',
      responderRole: 'orchestrator',
      reply: 'I propose the workflow epic-transition. Shall I start?',
      steps: [
        { tell: 'Refused. This Epic cannot be ready yet.', title: 'The harness says no', refused: true, window: 'epic-transition', lines: [{ refused: 'approved-epic-has-a-go-business-case' }, { say: 'An Epic becomes ready only with a Lean Business Case that recommends go.' }] },
        { tell: 'A Lean Business Case is missing. The workflow lean-business-case produces it.', title: 'The orchestrator names what is missing', window: 'value-management-officer', lines: [{ say: 'Missing: a Lean Business Case for this Epic.' }, { code: 'lean-business-case', tag: 'the workflow that produces it' }, { say: 'It never works around a check.' }] },
        { tell: 'The case is written. Five experts challenged it, and its owner answered every finding.', title: 'The case is written and challenged', window: 'Five experts, one packet each', lines: [{ roster: ['enterprise-architect', 'financial-controller', 'security-expert', 'data-protection-officer', 'legal-counsel'] }, { say: 'epic-owner drafts it, then answers every finding.' }] },
        { tell: 'Resolved. You said go, and the move to ready is now recorded.', title: 'You decide, and the move is recorded', window: 'Human gate', lines: [{ say: 'Go or no-go?' }, { choice: ['Go', 'No-go'] }, { code: 'epic-transition', tag: 'now records the move' }, { resolved: 'The Epic is ready, with its business case on record.' }] },
      ],
    },
    {
      key: 'product',
      label: 'Product',
      asker: 'Product lead',
      ask: 'We need customers to be able to export their invoices as PDF.',
      responder: 'release-train-engineer',
      responderRole: 'orchestrator',
      reply: 'This is a Feature. I propose the workflow feature-refinement. Shall I start?',
      steps: [
        { tell: 'The Product Manager has drafted the Feature.', title: loop[0], window: 'product-manager writes', lines: [{ code: '<feature-slug>.feature.md' }, { say: 'Description, benefit hypothesis, acceptance criteria, WSJF.' }] },
        { tell: 'Six experts each wrote one packet of findings.', title: loop[1], window: 'Six experts, one packet each', lines: [{ roster: ['system-architect', 'software-engineer', 'quality-engineer', 'security-expert', 'ux-designer', 'data-protection-officer'] }, findingsOnly] },
        { tell: 'The Product Manager revised the Feature and answered every finding.', title: loop[2], window: 'product-manager answers', lines: answered },
        { tell: 'Your turn. Is this Feature ready for PI Planning?', title: loop[3], window: 'Human gate', lines: [{ say: 'Is this Feature ready for PI Planning?' }, { choice: gateAnswers }, { code: 'feature-transition', tag: 'records the move to ready' }] },
      ],
    },
    {
      key: 'architecture',
      label: 'Architecture',
      asker: 'Lead architect',
      ask: 'Our services need one way to authenticate to each other. Which one?',
      responder: 'release-train-engineer',
      responderRole: 'orchestrator',
      reply: 'This is an architecture decision. I propose the workflow architecture-decision. Shall I start?',
      steps: [
        { tell: 'The System Architect has drafted the decision.', title: loop[0], window: 'system-architect writes', lines: [{ code: '<adr-slug>.adr.md' }, { say: 'Context, options kept open, the decision proposed, its consequences.' }] },
        { tell: 'Five experts each wrote one packet of findings.', title: loop[1], window: 'Five experts, one packet each', lines: [{ roster: ['software-engineer', 'security-expert', 'platform-engineer', 'data-engineer', 'ai-engineer'] }, findingsOnly] },
        { tell: 'The System Architect revised it and answered every finding.', title: loop[2], window: 'system-architect answers', lines: answered },
        { tell: 'Your turn. Do you accept this decision?', title: loop[3], window: 'Human gate', lines: [{ say: 'Do you accept this decision?' }, { choice: gateAnswers }, { code: 'adr-transition', tag: 'records it: proposed → accepted' }] },
      ],
    },
    {
      key: 'code',
      label: 'Code',
      asker: 'Engineering lead',
      ask: 'The Story “download an invoice as PDF” is ready. Implement it.',
      responder: 'scrum-master',
      responderRole: 'orchestrator',
      reply: 'I propose the workflow story-implementation: test-first, on a branch. Shall I start?',
      steps: [
        { tell: 'The Software Engineer has implemented the Story on a branch, test-first.', title: loop[0], window: 'software-engineer writes', lines: [{ code: '<story-slug>.code-change.md' }, { say: 'What changed, where, and the evidence that it meets the Definition of Done.' }] },
        { tell: 'Five experts reviewed the change.', title: loop[1], window: 'Five experts, one packet each', lines: [{ roster: ['quality-engineer', 'security-expert', 'observability-engineer', 'database-administrator', 'accessibility-specialist'] }, findingsOnly] },
        { tell: 'The findings are fixed or answered, and the tests pass.', title: loop[2], window: 'software-engineer answers', lines: [{ say: 'Findings are fixed in the code or answered. Tests pass.' }, { code: 'status: ready-for-review' }] },
        { tell: 'Your turn. You review and merge the pull request: the organization never merges code.', title: loop[3], window: 'Human gate', lines: [{ say: 'You review and merge the pull request. The organization never merges code.' }, { choice: ['Merge', 'Request changes'] }, { code: 'code-change-transition', tag: 'records your decision' }] },
      ],
    },
  ],
};

export const demoTabs: DemoTab[] = [build, run];
