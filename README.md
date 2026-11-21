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
| Decision-makers | `/` → `/transformation/` or `/how-it-works/` → the contact form, at the end of each of these pages and on `/contact/` | A request reaching Poesis |
| Developers and architects | `/open-source/` → GitHub, Quickstart | Repository visit, install, issue, contribution |

Menu: `Transformation` · `How It Works` · `Open Source` · `Knowledge` · **Let's talk**. There is
no Platform, Services or Partnerships entry. `Case Studies` joins the menu with the first
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
    open-source.astro          SAF for developers
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
    catalog/*.json and the other modules: the Knowledge corpus data
  styles/
    global.css                 Deep Field tokens and the Knowledge components
    site.css                   conversion system: roles of colour, type, components
public/hero/                   background film and posters of the home page
contact-endpoint/              reference receiver of the contact form, and its contract
scripts/
  *.test.mjs  fixtures/        tests
  hero-film/                   source of the film (see its README)
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
| Alpha preview; latest pre-release 1.0.0-alpha.3, 8 Nov 2026 | GitHub releases of both repositories (pre-release flag), `VERSION` | Verified. The public version wording needs a Poesis decision: the catalog shows `1.0` / `1.0.0`, the docs "Milestones" page shows harness `v1.0 Implemented` and organization `v0.1`, the organization `roadmap.yml` marks `v0.1.0` current |
| Apache-2.0 | `LICENSE` and `NOTICE` of the three repositories | Verified |
| One supported host, GitHub Copilot (CLI, app, VS Code with the Copilot session target) | Harness README ("Today there is one, github-copilot"), docs Quickstart | Verified. No other host is presented as supported |
| Install from the **preview** channel | `marketplace.json` on `preview` lists both plugins at 1.0.0-alpha.3; on `main` (stable) it lists none; commands match the Quickstart and `install.sh --preview --dry-run` | Verified in source. **Not verified by a real install**: on the only machine available, Copilot CLI 0.0.423 rejects the `#preview` reference of the first command, and the current CLI needs macOS 13.5. The project's own limitations page says marketplace installs on the CLI are not yet verified live. The stable-channel commands shown first in the READMEs would install nothing today |
| Published / implemented / in progress / planned, and the known limits | Releases, READMEs, the site's catalog states, the docs page "Known alpha limitations" | Verified; printed separately on `/open-source/#status` |
| 14 agents, 37 skills, 25 workflows | Counted on `main` of `saf-agentic-organization` | Verified |
| Human approval is not authenticated yet | Catalog records (`human-gated-advancement`: planned) and docs "known alpha limitations" | Verified |
| "SAF Agentic Organization" as the marketing name | Poesis direction: no SAFe mark in marketing; `saf-agentic-organization` stays visible as the technical name | Applied |

`saf-agentic-workspace` is a private repository and is not linked. GitHub Discussions are not
enabled on the SAF repositories and are not mentioned.

## Case studies

`src/data/case-studies.ts` is the evidence register. It holds no real case: none has been
supplied with evidence and publication clearance. While that is so:

- `/case-studies/` keeps its address but is not presented as a collection. It explains how a
  pilot is documented, is out of the menu, the sitemap and the index, and no commercial page
  links to it. The home and Transformation pages show no "proof" section at all.
- One **fictional example** (`illustrativeExample`, a delivery team in a retail bank) shows the
  format and lets the template be tested. It is not in the register and never counts as a
  case; its card and its page open with a notice that it is fiction; it reports no result; it
  is not indexed. Setting it to `null` removes it. It disappears by itself when a real case is
  published.

To publish a real case, add a record with `status: 'published'`: its card, its page, the menu
entry and the proof sections appear. The validator refuses a published case without clearance,
inspectable evidence, stated limits or a method for each figure.

## Contact form

One component, `ContactForm`, on `/contact/` and at the end of the home, Transformation,
How It Works and Pilot pages. Five fields, three required. Its transport is a build setting:

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

- One H1 per page; title and H1 are the same words on every conversion page except the home
  page, whose H1 is the imposed hero message and whose title names the offer. This is a
  deliberate exception to rule 12 of the SEO register (`strategy/seo.md` in the `poesis`
  repository); the register itself must be updated by its owner for the new keyword owners:
  `/` and `/transformation/` (agentic transformation), `/open-source/` (Systemic Agentic
  Framework), `/knowledge/platform/` (Organizational Intelligence Platform, formerly `/`).
- Structured data: `Organization` everywhere; `WebSite` and `FAQPage` on the home page; `Service`
  and `FAQPage` on `/transformation/`; `SoftwareSourceCode` on `/open-source/`; `BreadcrumbList`
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

## Hero film

See [`scripts/hero-film/README.md`](scripts/hero-film/README.md). The film is drawn from the
real Poesis mark, served locally, silent and paused on request. It opens on the complete
picture, and the home page prints a four-line legend: the seed, and the three signs of the
film (AI agent, human review, checked output). It plays only from 1100 px, where it has room beside the words, and never when the
visitor asks for reduced motion or data; below that width the page shows the same picture as a
still.

## Deploy

`.github/workflows/deploy.yaml` builds and publishes `main` to GitHub Pages; `public/CNAME`
targets `poesis.cloud`. Nothing in this branch deploys by itself.

## License

Proprietary — see [LICENSE](LICENSE). (c) 2026 Poesis · Created by Clément Cazaud.
