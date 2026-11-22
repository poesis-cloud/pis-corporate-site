/**
 * /llms.txt — the entities and canonical pages of the site, for language models.
 *
 * Generated at build time so that every SAF fact comes from src/data/saf.ts and
 * cannot drift from what the pages state. A convenience, not a ranking lever.
 */
import type { APIRoute } from 'astro';
import { harness, latestPreRelease, maturityLabel, organization, preReleases, safLinks, supportedHost, verifiedOn } from '../data/saf.ts';
import { publishedCaseStudies } from '../data/case-studies.ts';
import { offerName } from '../data/site.ts';

const site = 'https://poesis.cloud';
const cases = publishedCaseStudies.length
  ? `${publishedCaseStudies.length} client case ${publishedCaseStudies.length === 1 ? 'study is' : 'studies are'} published.`
  : 'No client case study is published yet.';

const body = `# Poesis

> Poesis is a company that guides the agentic transformation of organizations: redesigning a team, a function or a whole organization so that AI agents carry defined responsibilities inside explicit workflows, under human review. Its method and engine is SAF, the Systemic Agentic Framework, which Poesis publishes as open source.

Names that are easy to confuse:

- **Poesis** is the company. It sells one service: ${offerName}.
- **SAF (Systemic Agentic Framework)** is the open-source framework Poesis builds. It is not SAFe, the Scaled Agile Framework, which is a trademark of Scaled Agile, Inc.
- **${harness.name}** (\`${harness.technicalName}\`) is the deterministic engine: it resolves each workflow step, checks agent write grants and artifact schemas, and records what happened.
- **${organization.name}** (\`${organization.technicalName}\`) is a first ready-made agentic organization for scaled agile delivery, run by the harness.

Status, read from the public repositories on ${verifiedOn}: both products are in ${maturityLabel.toLowerCase()} (latest pre-releases: harness ${preReleases.harness.version}, organization ${preReleases.organization.version}, the most recent published ${latestPreRelease.publishedOn}), open source, and supported on one agent host, ${supportedHost.name}. They are plugins for an agent host, not a hosted service. ${cases}

## Service

- [${offerName}](${site}/transformation/): the service, who it is for, how an engagement is framed and its limits
- [How it works](${site}/how-it-works/): the five steps of a transformation, and who does what at each
- [A first pilot](${site}/pilot/): what a pilot involves and what it is not
${publishedCaseStudies.length ? `- [Case studies](${site}/case-studies/): published pilots, each with its evidence\n` : ''}- [Contact](${site}/contact/): how to reach Poesis

## Developers

- [Build with SAF](${site}/developers/): the two products, what exists today, how a step goes through SAF, install commands, first workflow, contribution
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
