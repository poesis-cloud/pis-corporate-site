# Poesis — corporate site (`poesis.cloud`)

The Poesis conversion site. Its first job is to bring Poesis qualified conversations with
decision-makers about one service, **Agentic Organization Transformation**. Its second is to
grow the community around **SAF**, the open-source Systemic Agentic Framework that is the
method and the engine of that service. OAP is out of scope: the site offers no SaaS, no
subscription and no price.

Everything else Poesis has published (research notes, the platform overview, the catalog,
solution and product pages, comparisons) is kept as the **Knowledge** corpus and reached
through `/knowledge/`.

It is distinct from `docs.poesis.cloud` (product and specification documentation) and from the
GitHub organization (the code). It is not the OAP application.

## Two funnels

| Audience | Path | Conversion |
| --- | --- | --- |
| Decision-makers | `/` → `/transformation/` → `/contact/` (the form, and the address `partner@poesis.cloud`) | A request reaching Poesis |
| Developers and architects | `/` → `/developers/` → GitHub, Quickstart, Contributing | Repository visit, install, issue, contribution |

Menu: `Transformation` · `Developers` · `Knowledge` · **Talk to Poesis** (decision of the team,
22 November 2026). There is no Platform, Services or Partnerships entry. `Case Studies` joins the menu with the first
published case. About, Contact and the legal pages are in the footer.

On the home page the prospect's action is the one filled button; the developer path is a quiet
link and one section, not a second funnel of equal weight.

## Stack

- [Astro](https://astro.build), static output. Plain `.astro` components and CSS, no UI framework.
- `@astrojs/sitemap` for the sitemap, [Pagefind](https://pagefind.app) for the Knowledge search.
- No web font, no third-party script except Google Analytics after consent.

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # static build and search index -> dist/
npm run preview
```

Node 22 or later (the tests use `--experimental-strip-types`).

## Structure

```text
src/
  layouts/BaseLayout.astro     head, SEO, structured data, menu, Knowledge envelope, footer
  components/                  Nav, Footer, KnowledgeBar, ProductPanel, CommandBlock, Faq,
                               ContactForm, ContactSection
                               (the other components belong to Knowledge pages)
  pages/
    index.astro                home
    transformation.astro       the service
    how-it-works.astro         the five steps of a transformation
    developers.astro           SAF for developers
    case-studies/              evidence register, one page per published case
    pilot.astro                what a first pilot is
    about.astro  contact.astro
    llms.txt.ts                /llms.txt, generated from data/saf.ts
    knowledge/                 hub, platform overview (the former homepage), thesis
    catalog/ solutions/ usage/ insights/ it/ services/ partnerships/   Knowledge, unchanged URLs
  data/
    site-navigation.ts         menu, footer, catalog views
    saf.ts                     every SAF fact the conversion pages state, with its check date
    method.ts                  the five steps, used by every page that tells the journey
    faq.ts  case-studies.ts  site.ts  knowledge.ts  format.ts
    hero-diagram.json          geometry of the former hero film (kept with its source, no longer used by a page)
    catalog/*.json and the other modules: the Knowledge corpus data
  styles/
    global.css                 Deep Field tokens and the Knowledge components
    site.css                   conversion system: roles of colour, type, components
contact-endpoint/              reference receiver of the contact form, and its contract
scripts/
  *.test.mjs  fixtures/        tests
  hero-film/                   source of the former hero film, no longer shipped (see its README)
```

## Knowledge is preserved, not rewritten

The corpus was not edited: the 17 research notes and the catalog data are byte-identical to
commit `10a34c5`, which `npm run test:site` proves by hash (`scripts/fixtures/knowledge-manifest.json`).
Every address the previous site served still resolves (`scripts/fixtures/legacy-routes.txt`, 213 routes).

What changed around the corpus:

| Before | Now | How |
| --- | --- | --- |
| `/` was the platform overview | `/knowledge/platform/` holds it, sections and anchors intact | Page moved. An old deep link such as `/#affordance-…` or `/#portfolio` is followed to the overview by a script on the home page whenever that anchor exists there; a URL fragment never reaches a server, so no redirect could do it |
| `/pilot/` was the OIP and SIE pilot brief builder | `/services/pilot/` holds the builder; `/pilot/` describes a transformation pilot and links to it | Address kept, content replaced; builder moved. A brief's selection link, `/pilot?value=…`, is forwarded to the builder |
| `/about/` carried the research argument | `/knowledge/thesis/` holds it, text unchanged; `/about/` is short | Sections moved |
| `/services/*`, `/partnerships/*` were offers in the menu | Same addresses, shown with an "Archived offer" notice and listed under Knowledge → Archive | Envelope added by the layout, pages untouched. They carry `noindex, follow` and are out of the sitemap, as is `/catalog/services`: they must not compete with the one service sold today. Nothing in `robots.txt` hides them, so a crawler can read the directive |
| `/catalog/*`, `/solutions/*`, `/usage/*`, `/insights/*`, `/it/alternatives/*` | Same addresses, same content, with the Knowledge bar | Envelope added by the layout |
| Search in the header, indexing every page | Search on `/knowledge/`, indexing Knowledge pages only | `data-pagefind-body` |

Four data modules changed, only in how they derive a route: `site-navigation.ts` (the menu),
`usage.ts`, `services.ts` and `poesis-platform.ts` (links that pointed at the former homepage or
at `/pilot`).

### Redirects on GitHub Pages

GitHub Pages cannot answer with a configurable HTTP 301. The `redirects` of `astro.config.mjs`
produce static pages with `<meta http-equiv="refresh">` and a canonical link: a client-side
redirect, which search engines generally treat as permanent but which is not a 301. For that
reason no existing address was moved by this redesign; pages kept their URL and the hub links to
them. Moving the corpus under `/knowledge/…` would need a host with real redirects (Cloudflare
Pages, Netlify, or a proxy in front of GitHub Pages).

## What the site may say about SAF

`src/data/saf.ts` is the single source of every SAF statement on the conversion pages. Its
values were read from the public repositories, their releases and the marketplace manifest on
the date in `verifiedOn`. Change the values and the date together.

| Statement on the site | Source | Status |
| --- | --- | --- |
| Alpha preview; latest pre-releases: harness 1.0.0-alpha.3 (8 Nov 2026), organization 1.0.0-alpha.4 (22 Nov 2026) | GitHub releases of each repository (pre-release flag) and the preview manifest of the marketplace | Verified on 22 Nov 2026. The two products no longer share a version: the pages print each one, and only on `/developers/`. The docs "Milestones" page still shows harness `v1.0 Implemented` and organization `v0.1`: it is not a source |
| Open source, with no licence named | README, `NOTICE` and plugin manifests declare Apache-2.0, but the `LICENSE` file of the harness is not the canonical text and GitHub reports "Other" | **Not named on the site** until the licence files match what the repositories declare. The pages link to each `LICENSE` file |
| One supported host, GitHub Copilot (CLI, app, VS Code with the Copilot session target) | Harness README ("Today there is one, github-copilot"), docs Quickstart | Verified. No other host is presented as supported |
| Install from the **preview** channel | `marketplace.json` on `preview` lists harness 1.0.0-alpha.3 and organization 1.0.0-alpha.4; on `main` (stable) it lists none; commands match the organization README | Verified in source on 22 Nov 2026. **Not verified by a real install**: on the only machine available, Copilot CLI 0.0.423 rejects the `#preview` reference |
| Published / implemented / in progress / planned, and the known limits | Releases, READMEs, the site's catalog states, the docs page "Known alpha limitations" | Verified; printed separately on `/developers/#status` |
| No count of agents, skills or workflows | The organization was rebuilt between two pre-releases and its numbers changed | The pages link to the roster and catalog kept by the repository (`docs/catalog.md`) and print no number |
| Every workflow ends at a human gate; the decision is recorded as a committed artifact; the person is not authenticated yet | Usage model of the organization ("your decision becomes committed"), docs "known alpha limitations" | Verified on 22 Nov 2026 |
| "SAF Agentic Organization" as the marketing name | Poesis direction: no SAFe mark in marketing; `saf-agentic-organization` stays visible as the technical name | Applied |

`saf-agentic-workspace` is a private repository and is not linked. GitHub Discussions are not
enabled on the SAF repositories and are not mentioned.

## Case studies

`src/data/case-studies.ts` is the evidence register. It holds no real case: none has been
supplied with evidence and publication clearance. While that is so:

- `/case-studies/` keeps its address but is not presented as a collection. It explains how a
  pilot is documented, and is out of the menu, the sitemap and the index. Only the evidence
  section of the home page links to it.
- No fictional example: by decision of the team (22 November 2026) the site shows no invented
  client, even labelled as fiction. `illustrativeExample` in `src/data/case-studies.ts` is `null`.

To publish a real case, add a record with `status: 'published'`: its card, its page, the menu
entry and the proof sections appear. The validator refuses a published case without clearance,
inspectable evidence, stated limits or a method for each figure.

## Contact form

One component, `ContactForm`, on `/contact/` and at the end of the Transformation, How It Works
and Pilot pages. The home page sends to `/contact/` and prints the address. Five fields, three required. Its transport is a build setting:

| Build | What the form does |
| --- | --- |
| No receiver configured (the default, and the current state) | Prepares an email in the visitor's mail app, addressed to `partner@poesis.cloud`, and says so. Never displays a confirmation |
| `PUBLIC_CONTACT_ENDPOINT` and `PUBLIC_CONTACT_PROCESSOR` set | Posts the request as JSON. Shows "Your request has reached Poesis" only when the receiver answers `{ "ok": true }`; otherwise says it was not sent and offers the email |

The receiver, its contract, the two ways to provide one and the go-live check are in
[`contact-endpoint/README.md`](contact-endpoint/README.md). **No receiver exists today and real
reception at `partner@poesis.cloud` has not been verified.**

## Measurement

Events are queued in `dataLayer` and sent to GA4 only after consent. None carries what a visitor
typed: only a placement name and the page path.

| Event | When |
| --- | --- |
| `business_transformation_click` | A link to the Transformation page |
| `business_contact_intent` | A call to action leading to the contact form, or an email draft prepared |
| `business_contact_form_start` | First interaction with the form |
| `business_contact_sent` | The receiver confirmed the request. Never emitted for an email draft |
| `developer_repo_click`, `developer_docs_click`, `developer_install_click` | Links to repositories and documentation, install commands copied |

An element opts in with `data-track` and `data-track-id`.

## SEO

- One H1 per page; title and H1 are the same words on every conversion page, the home page
  included (rule 12 of the SEO register, `strategy/seo.md` in the `poesis` repository). The home
  page's H1 is "Plant one seed. Grow a governed organization of AI agents." (decision of the
  team, 22 November 2026; a test holds the eyebrow, the title, the sentence and the line under
  it). The founder's longer sentence is the intent behind it and is no longer printed. The
  register itself must be updated by its owner for the new keyword owners: `/` (agentic
  organization), `/transformation/` (agentic transformation), `/developers/` (Systemic Agentic
  Framework), `/knowledge/platform/` (Organizational Intelligence Platform, formerly `/`).
- Structured data: `Organization` everywhere; `WebSite` on the home page; `Service`
  and `FAQPage` on `/transformation/`; `SoftwareSourceCode` on `/developers/`; `BreadcrumbList`
  on inner pages; `BlogPosting` on research notes. No price, rating, review or award.
- `/llms.txt` gives language models the entities and the canonical pages. It is generated
  from `src/data/saf.ts`, so it cannot disagree with the pages. A convenience, not a ranking
  lever.

## Tests

```bash
npm test                                           # data, navigation, corpus integrity, SAF facts, contact receiver
npm run build
CHECK_BUILT_USAGE=1 npm run test:usage             # built catalog, usage and pilot pages
CHECK_BUILT_PORTFOLIO=1 npm run test:portfolio     # built portfolio pages
npm run test:built                                 # built conversion site, legacy routes, links
```

Two built checks fail on `main` and still fail here, both in Knowledge templates this redesign
does not touch: product pages no longer print the milestone version beside each feature
(`test:portfolio`, "built core routes…"), and the service cards of `/catalog/services` carry no
status badge (`test:usage`, "built catalog cards…").

`npm run sync-roadmap` exports to the sibling documentation repository; it is not part of this
flow. Workspace checks (`CHECK_WORKSPACE_PORTFOLIO=1`) need the sibling strategy and
documentation repositories.

## Hero scene

The hero of the home page ends with one workflow shown as an illustration, in six beats: a
request, a draft, the checks of the harness (write rule, schema, journal), a human decision, the
commit, and the organization that gains a branch. It is markup and CSS in `src/pages/index.astro`
and `src/styles/site.css`: no film, no picture file, no dependency. The whole picture is the
default; it plays only with scripts on (so that the pause control exists) and for visitors who
accept motion, and it holds while off screen. Captures: `docs/review/2026-11-22/`.

The former hero film is no longer shipped. Its source stays in `scripts/hero-film/`, with its
geometry in `src/data/hero-diagram.json`, until the new hero is validated.

## Deploy

`.github/workflows/deploy.yaml` builds and publishes `main` to GitHub Pages; `public/CNAME`
targets `poesis.cloud`. Nothing in this branch deploys by itself.

## License

Proprietary — see [LICENSE](LICENSE). (c) 2026 Poesis · Created by Clément Cazaud.
