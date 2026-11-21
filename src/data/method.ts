/**
 * method.ts — how an agentic transformation guided by Poesis unfolds.
 *
 * One list, used by the home page, the Transformation page and How It Works, so
 * the three never describe a different journey. The steps are indicative: scope,
 * pace and terms are agreed for each engagement, and nothing here is a duration,
 * a price or a promised result.
 *
 * Each step says who does the work. Several steps are done by people, with no
 * tool involved; the site must not make them sound automatic.
 */
export interface MethodStep {
  title: string;
  /** One sentence, for the short lists. */
  summary: string;
  /** What happens, in plain words. */
  what: string;
  /** Who does it. */
  who: string;
  /** What SAF contributes at this step, or that it contributes nothing yet. */
  saf: string;
  /** What exists when the step ends. */
  result: string;
}

export const methodSteps: MethodStep[] = [
  {
    title: 'Understand your organization',
    summary: 'We learn how the perimeter really works: who is responsible for what, what is handed over, who decides.',
    what: 'We sit with the people who own the perimeter and map how the work actually gets done: roles, responsibilities, handoffs, decisions, and what hurts today. We agree, in writing, on what would count as success.',
    who: 'Your people and the Poesis team, in conversation. This step is human work.',
    saf: 'Nothing yet. No tool reads your organization for you.',
    result: 'A shared description of the perimeter, and success criteria written before anything is built.',
  },
  {
    title: 'Identify high-value workflows',
    summary: 'We choose the workflows where delegating to agents would matter, and name what stays with people.',
    what: 'Not every task deserves an agent. We look at each candidate workflow for its value, how often it runs, whether its context can be written down, and what happens if it goes wrong. Simpler automation is preferred where it does the job.',
    who: 'The owners of the work decide, with Poesis bringing the questions and the comparison.',
    saf: 'Nothing yet. The choice is a judgment, made by the people accountable for the work.',
    result: 'A short list of workflows, a first one chosen for the pilot, and an explicit list of what is not delegated.',
  },
  {
    title: 'Design an agentic organization with SAF',
    summary: 'We write the seed: roles, workflows and instructions, as files you can read.',
    what: 'We turn the chosen workflows into a small, complete model of an agentic organization: which agent holds which role, the steps of each workflow, the instructions and skills each role needs, the artifacts each step must produce, what each agent may write, and where a person reviews.',
    who: 'Poesis writes the model; you read it and correct it. It is plain files in a repository, not a black box.',
    saf: 'SAF defines the format of the model. Where your work resembles scaled agile delivery, the ready-made SAF Agentic Organization is a starting point; otherwise the model is written for you.',
    result: 'The seed: a first agentic organization, mirroring yours on the chosen scope, versioned in Git.',
  },
  {
    title: 'Run a governed pilot',
    summary: 'The seed runs on real work, on the agreed scope, with people reviewing at the points you chose.',
    what: 'The model is put to work on real tasks. Agents carry out the steps; the harness resolves each step, checks what agents are allowed to write, validates what they produce and records it. Each workflow ends by handing its results to a person, who accepts, raises concerns or rejects.',
    who: 'Your team works with the agents and reviews their output. Poesis runs the pilot with you and adjusts the model.',
    saf: 'The SAF Agentic Harness governs every step. It runs locally, in your agent host and on your repositories. It is an alpha preview: a pilot is run under human review, not unattended.',
    result: 'Real outputs, and the record of how they were produced: artifacts in Git and the journal of each session.',
  },
  {
    title: 'Evaluate, improve and evolve',
    summary: 'We review the evidence against your criteria. You decide: extend, adjust or stop.',
    what: 'We read what the pilot produced against the success criteria agreed at the start, including what did not work. Changes to the model are made the way code changes are: proposed, reviewed, committed. Then the next perimeter can start from a firmer base.',
    who: 'You decide. Poesis presents the evidence and its reading of it.',
    saf: 'The artifacts and journals are the evidence. Because the organization is files in Git, each change is a reviewed, reversible commit.',
    result: 'A decision backed by evidence and, if you go on, a plan for the next scope. Stopping is a legitimate outcome.',
  },
];

/** Where a transformation can start. A small scope is not a lesser one. */
export const scopes: string[] = ['A whole organization', 'A business unit', 'A department', 'A function', 'A team', 'A process'];

/** What an engagement may produce. Which apply, and in what depth, depends on the agreed scope. */
export const deliverables: string[] = [
  'A written scope and success criteria',
  'A short list of workflows worth delegating, and of those that are not',
  'A first model of the agentic organization: the seed',
  'A pilot workflow running on SAF, under human review',
  'An evidence review and, if you go on, a roadmap',
];
