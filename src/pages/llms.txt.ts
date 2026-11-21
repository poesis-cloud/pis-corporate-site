/**
 * /llms.txt — the entities and canonical pages of the site, for language models.
 *
 * Generated at build time so that every SAF fact comes from src/data/saf.ts and
 * cannot drift from what the pages state. A convenience, not a ranking lever.
 */
import type { APIRoute } from 'astro';
import { harness, latestPreRelease, maturityLabel, organization, safLinks, supportedHost, verifiedOn } from '../data/saf.ts';
import { publishedCaseStudies } from '../data/case-studies.ts';

const site = 'https://poesis.cloud';
const cases = publishedCaseStudies.length
  ? `${publishedCaseStudies.length} client case ${publishedCaseStudies.length === 1 ? 'study is' : 'studies are'} published.`
  : 'No client case study is published yet.';

const body = `# Poesis

> Poesis is a company that guides the agentic transformation of organizations: redesigning a team, a function or a whole organization so that AI agents carry defined responsibilities inside explicit workflows, under human review. Its method and engine is SAF, the Systemic Agentic Framework, which Poesis publishes as open source.

Names that are easy to confuse:

- **Poesis** is the company. It sells one service: agentic transformation.
- **SAF (Systemic Agentic Framework)** is the open-source framework Poesis builds. It is not SAFe, the Scaled Agile Framework, which is a trademark of Scaled Agile, Inc.
- **${harness.name}** (\`${harness.technicalName}\`) is the deterministic engine: it resolves each workflow step, checks agent write grants and artifact schemas, and records what happened.
- **${organization.name}** (\`${organization.technicalName}\`) is a first ready-made agentic organization for scaled agile delivery, run by the harness.

Status, read from the public repositories on ${verifiedOn}: both products are in ${maturityLabel.toLowerCase()} (latest pre-release ${latestPreRelease.version}, published ${latestPreRelease.publishedOn}), licensed under ${harness.license}, and supported on one agent host, ${supportedHost.name}. They are plugins for an agent host, not a hosted service. ${cases}

## Service

- [Agentic transformation](${site}/transformation/): the service, its method in four steps, how an engagement is framed and its limits
- [A first pilot](${site}/pilot/): what a pilot involves and what it is not
- [Case studies](${site}/case-studies/): how pilots are documented; lists published cases when there are any
- [Contact](${site}/contact/): how to reach Poesis

## Open source

- [SAF overview](${site}/open-source/): the two products, how a step goes through SAF, install commands, first workflow, community
- [SAF documentation](${safLinks.docs}): reference documentation and quickstart
- [${harness.technicalName}](${harness.repository}): source code and specification of the harness
- [${organization.technicalName}](${organization.repository}): source code of the organization

## Knowledge

- [Knowledge base](${site}/knowledge/): entry to the whole corpus, with search
- [Research notes](${site}/insights/research): the published research notes
- [The thesis](${site}/knowledge/thesis/): the argument behind the company
- [Platform overview](${site}/knowledge/platform/): the Organizational Intelligence Platform and the delivery status of its parts
- [Catalog](${site}/catalog/): use cases, capabilities, features, products and services, each with its status

## Company

- [About Poesis](${site}/about/): vision, origin of the method, team
`;

export const GET: APIRoute = () => new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
