/**
 * Site-structure tests for the SAF-centred conversion site.
 *
 * They hold three lines that the redesign must not cross:
 *   1. the Knowledge corpus is byte-identical to what `main` published;
 *   2. every address `main` served still resolves;
 *   3. the conversion pages say only what src/data/saf.ts can source.
 *
 * Checks of the built output run with CHECK_BUILT_SITE=1 after `npm run build`.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { parse } from 'parse5';
import { siteNavigation, navigationCta, footerNavigation, legalNavigation } from '../src/data/site-navigation.ts';
import { archivePaths, archivePrefixes, knowledgeContext, knowledgePrefixes, platformOverviewPath, thesisPath } from '../src/data/knowledge.ts';
import { cliVersionNote, harness, installCommands, knownLimits, latestPreRelease, marketplace, maturity, maturityLabel, organization, safLinks, safProducts, supportedHost, verifiedOn } from '../src/data/saf.ts';
import { homeFaq, howItWorksFaq, pilotFaq, transformationFaq, faqLd } from '../src/data/faq.ts';
import { caseStudies, fictionalNotice, illustrativeExample, publicationChecklist, publishedCaseStudies, shownExample, validateCaseStudies } from '../src/data/case-studies.ts';
import { briefMailto, buildPayload, composeBrief, contactFields, interpretResponse, MAILTO_LIMIT } from '../src/scripts/contact-brief.ts';
import { LIMITS } from '../contact-endpoint/handler.mjs';
import { methodSteps } from '../src/data/method.ts';
import { contact, contactEmail, contactTransport, offerName } from '../src/data/site.ts';
import { platformSolutions, solutionHref } from '../src/data/poesis-platform.ts';
import { alternatives } from '../src/data/alternatives.ts';

/** Geometry of the hero diagram: the film is drawn from it and the page places its words from it. */
const heroDiagram = JSON.parse(readFileSync(new URL('../src/data/hero-diagram.json', import.meta.url), 'utf8'));

/**
 * Clément Cazaud's decision of 21 November 2026: the title of the home page says what Poesis
 * offers, and his own sentence becomes the signature of Poesis, in italics, beside the picture.
 * Both are held here word for word: changing either is a decision for Poesis, not for a refactor.
 */
const HERO_TITLE = 'Transform your organization with governed AI agents.';
const HERO_SIGNATURE = 'Generate easily and rapidly a seed of an agentic organisation mirroring yours to automatize. Plant it, and watch it to produce and evolve.';

const here = (path) => new URL(path, import.meta.url);
const read = (path) => readFileSync(here(path), 'utf8');
const builtTest = (name, run) => test(name, { skip: process.env.CHECK_BUILT_SITE !== '1' }, run);

const attr = (node, name) => node?.attrs?.find((attribute) => attribute.name === name)?.value;
const hasAttr = (node, name) => attr(node, name) !== undefined;
const elements = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => elements(child, predicate))];
const text = (node) => (node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join(''));
const clean = (value) => value.replace(/\s+/g, ' ').trim();
const hasClass = (node, name) => attr(node, 'class')?.split(/\s+/).includes(name) ?? false;
const first = (node, tag) => elements(node, (candidate) => candidate.tagName === tag)[0];

const documents = new Map();
const distFile = (pathname) => (pathname.endsWith('.html') ? `../dist${pathname}` : `../dist${pathname.replace(/\/$/, '')}/index.html`);
const built = (pathname) => {
  if (!documents.has(pathname)) documents.set(pathname, parse(read(distFile(pathname))));
  return documents.get(pathname);
};
const mainOf = (document) => first(document, 'main');

/** The pages that sell or explain the offer, all indexable. */
const conversionPages = ['/', '/transformation/', '/how-it-works/', '/open-source/', '/pilot/', '/about/', '/contact/'];
/** The pages that end with the contact form, or are it. */
const formPages = ['/', '/transformation/', '/how-it-works/', '/pilot/', '/contact/'];
const noteFiles = () => readdirSync(here('../src/content/insights/')).filter((file) => file.endsWith('.md'));

// ---- 1. the Knowledge corpus is untouched -------------------------------------------------

test('Knowledge content and catalog data are byte-identical to the published baseline', () => {
  const manifest = JSON.parse(read('./fixtures/knowledge-manifest.json'));
  const entries = Object.entries(manifest.files);
  assert.equal(entries.length, 37);
  assert.equal(entries.filter(([path]) => path.startsWith('src/content/insights/')).length, 17);
  for (const [path, expected] of entries) {
    assert.equal(createHash('sha256').update(readFileSync(here(`../${path}`))).digest('hex'), expected, `${path} differs from ${manifest.base.slice(0, 7)}`);
  }
  // Nothing was added to the corpus either: no rewritten or generated article.
  assert.equal(noteFiles().length, 17);
  // Four data modules changed, and only in how they derive a route: the menu, and three
  // helpers that pointed at the former homepage. They are listed, not hashed.
  assert.deepEqual(manifest.rerouted, ['src/data/poesis-platform.ts', 'src/data/services.ts', 'src/data/site-navigation.ts', 'src/data/usage.ts']);
});

test('Knowledge routes are classified without ambiguity', () => {
  for (const path of ['/knowledge/', '/knowledge/platform', '/catalog', '/catalog/usage', '/solutions/saf', '/usage/read-governance-model', '/insights/agentic-safe/', '/it/alternatives/leanix/']) {
    assert.deepEqual(knowledgeContext(path), { inKnowledge: true, archive: false, isHub: path === '/knowledge/' }, path);
  }
  for (const path of ['/services/pilot', '/services/oip-saas/', '/partnerships/llm-vendor-value-proposal', '/catalog/services', '/catalog/services/']) assert.equal(knowledgeContext(path).archive, true, path);
  assert.deepEqual([...archivePaths], ['/catalog/services']);
  assert.equal(knowledgeContext('/catalog/servicesx').archive, false);
  for (const path of conversionPages) assert.equal(knowledgeContext(path).inKnowledge, false, path);
  // A prefix never swallows a sibling: /italy is not /it/, /servicesx is not /services.
  assert.equal(knowledgeContext('/italy/').inKnowledge, false);
  assert.equal(knowledgeContext('/servicesx').inKnowledge, false);
  for (const prefix of archivePrefixes) assert.ok(knowledgePrefixes.includes(prefix));
  assert.equal(platformOverviewPath, '/knowledge/platform');
  assert.equal(thesisPath, '/knowledge/thesis');
});

// ---- 2. what the site may claim about SAF ---------------------------------------------------

test('SAF facts keep their alpha status, verified host and preview-channel install', () => {
  assert.equal(maturityLabel, 'Alpha preview');
  assert.match(latestPreRelease.version, /^\d+\.\d+\.\d+-alpha\.\d+$/);
  assert.equal(latestPreRelease.tag, `v${latestPreRelease.version}`);
  assert.match(verifiedOn, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(verifiedOn >= latestPreRelease.publishedOn);
  assert.deepEqual(installCommands, [
    'copilot plugin marketplace add poesis-cloud/saf-marketplace#preview',
    'copilot plugin install poesis-saf-agentic-harness@poesis-saf-preview',
    'copilot plugin install poesis-saf-agentic-organization@poesis-saf-preview',
  ]);
  assert.notEqual(marketplace.preview.id, marketplace.stable.id);
  // Published, implemented, in progress and planned are kept apart, and none of them oversells.
  for (const list of [maturity.published, maturity.implemented, maturity.partial, maturity.planned, knownLimits]) {
    assert.ok(list.length);
    assert.doesNotMatch(list.join(' '), /production-ready|enterprise-ready|general availability|Claude|Cursor/i);
  }
  assert.ok(maturity.planned.some((item) => item.startsWith('Authenticated human approval')));
  assert.ok(maturity.planned.some((item) => /stable channel/.test(item)));
  assert.ok(maturity.published.some((item) => item.includes(latestPreRelease.version) && item.includes('preview channel')));
  assert.ok(safLinks.limitations.startsWith('https://docs.poesis.cloud/saf/'));
  assert.match(cliVersionNote, /current version of the Copilot CLI/);
  assert.equal(supportedHost.name, 'GitHub Copilot');
  assert.deepEqual(safProducts, [harness, organization]);
  for (const product of safProducts) {
    assert.equal(product.license, 'Apache-2.0');
    for (const link of [product.repository, product.releases, product.contributing, product.issues]) assert.ok(link.startsWith(`https://github.com/poesis-cloud/${product.technicalName}`), link);
    assert.ok(product.docs.startsWith('https://docs.poesis.cloud/saf/'));
    // The marketing name never carries the SAFe mark; the technical name stays exact.
    assert.doesNotMatch(product.name, /SAFe/);
    assert.doesNotMatch([product.summary, product.audience, ...product.provides].join(' '), /SAFe|production-ready|enterprise-ready|\bGA\b|general availability/i);
  }
});

test('FAQ covers the questions buyers and developers ask, and structured data repeats it word for word', () => {
  assert.deepEqual(homeFaq.map((item) => item.question), [
    'What is agentic organizational transformation?',
    'Do we have to transform the entire company?',
    'How is Poesis different from simply deploying AI agents?',
    'What does the first pilot involve?',
    'Is SAF open source?',
    'Which agent environments are supported today?',
    'Is the framework production-ready?',
  ]);
  for (const set of [homeFaq, transformationFaq, pilotFaq, howItWorksFaq]) {
    const ld = faqLd(set);
    assert.equal(ld['@type'], 'FAQPage');
    assert.deepEqual(ld.mainEntity.map((entry) => entry.name), set.map((item) => item.question));
    for (const [index, entry] of ld.mainEntity.entries()) assert.equal(entry.acceptedAnswer.text, set[index].answer.join(' '));
  }
  // One journey, told the same way everywhere: five steps, each saying who does the work.
  assert.deepEqual(methodSteps.map((step) => step.title), [
    'Understand your organization',
    'Identify high-value workflows',
    'Design an agentic organization with SAF',
    'Run a governed pilot',
    'Evaluate, improve and evolve',
  ]);
  for (const step of methodSteps) for (const key of ['summary', 'what', 'who', 'saf', 'result']) assert.ok(step[key].trim(), `${step.title}: ${key}`);
  // No duration, price or result is promised by the method.
  const promise = /\d+\s*(?:weeks?|days?|months?)\b|\d+\s*%|\b\d+x\b|\bROI\b|guarantee/i;
  assert.doesNotMatch(JSON.stringify(methodSteps), promise);
  // The guard itself: it catches a figure, and does not trip on ordinary words.
  for (const text of ['cuts lead time by 30% in the pilot', 'done in 6 weeks', 'a 3x gain', 'a clear ROI', 'we guarantee it']) assert.match(text, promise, text);
  for (const text of ['an android app', 'five steps', 'the first three steps']) assert.doesNotMatch(text, promise, text);
  assert.equal(offerName, 'Agentic Organization Transformation');
  const readiness = homeFaq.at(-1).answer.join(' ');
  assert.match(readiness, /^No\./);
  assert.ok(readiness.includes(latestPreRelease.version));
});

test('no case study is published without evidence, stated limits and clearance', () => {
  assert.equal(caseStudies.length, 0, 'add a case only with its evidence and its publication clearance');
  assert.equal(publishedCaseStudies.length, 0);
  assert.ok(publicationChecklist.length >= 5);
  // The invented example is not a case: it sits outside the register, announces itself as fiction and reports nothing.
  assert.ok(illustrativeExample);
  assert.equal(shownExample, illustrativeExample);
  assert.ok(!caseStudies.includes(illustrativeExample));
  assert.match(illustrativeExample.slug, /^example-/);
  assert.match(illustrativeExample.title, /^Fictional example: /);
  for (const key of ['measuredResults', 'publicationClearance', 'kind', 'status']) assert.equal(key in illustrativeExample, false, key);
  for (const phrase of ['Fictional example.', 'does not exist', 'not a client of Poesis', 'nothing was measured']) assert.ok(fictionalNotice.includes(phrase), phrase);
  assert.doesNotMatch(JSON.stringify(illustrativeExample), /\d+\s*%|€|\$|\bROI\b|\bsaved\b|\bfaster\b/i);
  for (const link of illustrativeExample.evidence) assert.ok(link.href.startsWith('https://github.com/poesis-cloud/'), link.href);
  const record = {
    slug: 'sample', status: 'published', kind: 'pilot', title: 't', summary: 's', context: 'c', problem: 'p', scope: 's', method: 'm',
    agentsAndWorkflows: 'a', humanControls: 'h', period: 'p', evidence: [{ label: 'e', href: 'https://example.org' }],
    measuredResults: [{ indicator: 'i', value: 'v', method: 'measured' }], limits: 'l', learnings: 'l', nextStep: 'n',
    publicationClearance: { clearedBy: 'someone', clearedOn: '2026-01-01' },
  };
  assert.doesNotThrow(() => validateCaseStudies([record]));
  assert.throws(() => validateCaseStudies([{ ...record, publicationClearance: { clearedBy: '', clearedOn: '2026-01-01' } }]), /without clearance/);
  assert.throws(() => validateCaseStudies([{ ...record, evidence: [] }]), /without inspectable evidence/);
  assert.throws(() => validateCaseStudies([{ ...record, limits: ' ' }]), /without stated limits/);
  assert.throws(() => validateCaseStudies([{ ...record, measuredResults: [{ indicator: 'i', value: 'v', method: '' }] }]), /Unsourced result/);
  assert.throws(() => validateCaseStudies([record, record]), /Duplicate/);
  assert.doesNotThrow(() => validateCaseStudies([{ ...record, status: 'draft', evidence: [], limits: '' }]));
});

test('a contact request becomes an email draft or a payload, within the bounds the receiver enforces', () => {
  const values = { name: 'Ada Lovelace', email: 'ada@example.org', company: '', goal: 'Our release process.', message: '' };
  const brief = composeBrief(values);
  assert.ok(brief.startsWith('Transformation request'));
  assert.ok(brief.includes('Full name: Ada Lovelace'));
  assert.ok(brief.includes('Our release process.'));
  assert.ok(!brief.includes('Company'), 'empty optional fields are left out');
  assert.ok(!brief.includes('Additional context'));
  const { href, shortened } = briefMailto(contactEmail, values);
  assert.equal(shortened, false);
  assert.ok(href.startsWith(`mailto:${contactEmail}?subject=`));
  assert.ok(decodeURIComponent(href).includes('Our release process.'));
  const long = briefMailto(contactEmail, { ...values, goal: 'x'.repeat(2000) });
  assert.equal(long.shortened, true);
  assert.ok(long.href.length <= MAILTO_LIMIT);
  // Oversized short fields cannot push the link past the limit either.
  const oversized = briefMailto(contactEmail, { ...values, company: 'o'.repeat(3000), goal: 'x'.repeat(2000) });
  assert.equal(oversized.shortened, true);
  assert.ok(oversized.href.length <= MAILTO_LIMIT);
  // A hostile value stays inert text inside the link.
  const hostile = briefMailto(contactEmail, { ...values, name: 'a&bcc=evil@example.org\r\nBcc: evil@example.org' });
  assert.equal((hostile.href.match(/[?&]bcc=/gi) ?? []).length, 0);
  assert.equal(hostile.href.split('?').length, 2);
  assert.doesNotMatch(hostile.href, /[\r\n]/);

  // The form and the receiver agree on names and bounds.
  assert.deepEqual(contactFields.map((field) => field.key), ['name', 'email', 'company', 'goal', 'message']);
  assert.deepEqual(contactFields.filter((field) => field.required).map((field) => field.key), ['name', 'email', 'goal']);
  for (const field of contactFields) assert.equal(field.maxLength, LIMITS[field.key], field.key);
  assert.deepEqual(buildPayload(values, { source: 'home', elapsedMs: 4321.6, trap: '' }), { ...values, source: 'home', elapsedMs: 4322, _gotcha: '' });

  // "Sent" means the receiver said so, and nothing else does.
  assert.deepEqual(interpretResponse(200, { ok: true }), { state: 'sent' });
  for (const [status, body] of [[200, null], [200, {}], [200, { ok: 'true' }], [204, null], [302, { ok: true }], [500, { ok: true }], [0, null]]) {
    assert.deepEqual(interpretResponse(status, body), { state: 'failed' }, `${status} ${JSON.stringify(body)}`);
  }
  assert.deepEqual(interpretResponse(429, { ok: false }), { state: 'throttled' });
  assert.deepEqual(interpretResponse(422, { ok: false, errors: { email: 'invalid', nonsense: 'x' } }), { state: 'invalid', fields: ['email'] });
  assert.deepEqual(interpretResponse(422, { ok: false, errors: {} }), { state: 'failed' });
  // Under plain Node there is no build environment: no receiver.
  assert.equal(contact, null);
});

test('the form posts only to a complete, safe configuration; anything else is no receiver or a failed build', () => {
  assert.equal(contactTransport({}), null);
  assert.equal(contactTransport({ PUBLIC_CONTACT_ENDPOINT: '  ', PUBLIC_CONTACT_PROCESSOR: '' }), null);
  assert.deepEqual(contactTransport({ PUBLIC_CONTACT_ENDPOINT: ' https://receiver.example/contact ', PUBLIC_CONTACT_PROCESSOR: ' Example Forms ' }), { endpoint: 'https://receiver.example/contact', processor: 'Example Forms' });
  // A local receiver is accepted for tests on this machine only.
  assert.ok(contactTransport({ PUBLIC_CONTACT_ENDPOINT: 'http://127.0.0.1:4601/contact', PUBLIC_CONTACT_PROCESSOR: 'local test receiver' }));
  // Half a configuration never ships: the privacy policy must be able to name who receives the request.
  assert.throws(() => contactTransport({ PUBLIC_CONTACT_ENDPOINT: 'https://receiver.example/contact' }), /PUBLIC_CONTACT_PROCESSOR/);
  assert.throws(() => contactTransport({ PUBLIC_CONTACT_PROCESSOR: 'Example Forms' }), /PUBLIC_CONTACT_ENDPOINT/);
  for (const endpoint of ['http://receiver.example/contact', 'ftp://receiver.example', 'receiver.example/contact', 'javascript:alert(1)', 'https://receiver.example/"onload="x', 'http://127.0.0.1.evil.example/contact']) {
    assert.throws(() => contactTransport({ PUBLIC_CONTACT_ENDPOINT: endpoint, PUBLIC_CONTACT_PROCESSOR: 'Example Forms' }), /https URL/, endpoint);
  }
});

test('menu, call to action, footer and legal links point at distinct, well-formed destinations', () => {
  const internal = [...siteNavigation, navigationCta, ...footerNavigation.flatMap((group) => group.items), ...legalNavigation].filter((item) => !item.external);
  for (const item of internal) assert.match(item.href, /^(\/|mailto:)/, item.href);
  const externals = footerNavigation.flatMap((group) => group.items).filter((item) => item.external);
  for (const item of externals) assert.match(item.href, /^https:\/\//, item.href);
  assert.deepEqual(legalNavigation.map((item) => item.href), ['/legal/mentions-legales', '/legal/privacy', '/legal/cookies']);
  assert.deepEqual(footerNavigation.map((group) => group.label), ['Transformation', 'Open source', 'Knowledge', 'Company']);
});

// ---- 3. the built site ------------------------------------------------------------------------

builtTest('every address the previous site served still resolves', () => {
  const routes = read('./fixtures/legacy-routes.txt').split('\n').filter(Boolean);
  assert.equal(routes.length, 213);
  const missing = routes.filter((route) => !existsSync(here(distFile(route))));
  assert.deepEqual(missing, []);
});

builtTest('the home page says what is sold in its title, keeps the founder\'s sentence as a signature, and has one dominant action', () => {
  const home = built('/');
  const main = mainOf(home);
  const headings = elements(home, (node) => node.tagName === 'h1');
  assert.equal(headings.length, 1);
  assert.equal(clean(text(headings[0])), HERO_TITLE);
  const hero = elements(main, (node) => hasClass(node, 'hero-seed'))[0];
  // The founder's sentence is on the page once, word for word, as a paragraph in the hero: never as a heading.
  const signatures = elements(home, (node) => hasClass(node, 'hero-signature'));
  assert.equal(signatures.length, 1);
  assert.equal(signatures[0].tagName, 'p');
  assert.equal(clean(text(signatures[0])), HERO_SIGNATURE);
  assert.equal(elements(hero, (node) => node === signatures[0]).length, 1);
  assert.equal(clean(text(home)).split(HERO_SIGNATURE).length - 1, 1);
  for (const heading of elements(home, (node) => /^h[1-6]$/.test(node.tagName ?? ''))) assert.ok(!clean(text(heading)).includes('Generate easily'), clean(text(heading)));
  // The offer is named, and said in two short sentences: what Poesis does with SAF, and how to start.
  assert.equal(clean(text(elements(hero, (node) => hasClass(node, 'hero-seed__kicker'))[0])), `${offerName}, by Poesis`);
  const lead = clean(text(elements(hero, (node) => hasClass(node, 'hero-seed__lead'))[0]));
  for (const phrase of ['design and evolve an agentic organization that mirrors yours', 'SAF, our open-source framework', 'one team or one workflow', 'under human oversight']) assert.ok(lead.includes(phrase), phrase);
  assert.ok(lead.split(/\.\s/).length <= 2 && lead.length < 200, 'two short sentences');
  // Nothing in the hero promises an organization that runs itself.
  assert.doesNotMatch(clean(text(hero)), /fully automat|autonomous|without (people|humans)|no human/i);
  // One filled button for the prospect; the developer path is a quiet link, no line of small print under them, and no repository link competes in the hero.
  const actions = elements(hero, (node) => node.tagName === 'a' && hasClass(node, 'btn'));
  assert.deepEqual(actions.map((node) => [clean(text(node)), attr(node, 'href')]), [['Discuss your transformation', '/contact/'], ['Explore SAF', '/open-source/']]);
  assert.equal(elements(hero, (node) => hasClass(node, 'hero-actions__note')).length, 0);
  assert.ok(hasClass(actions[0], 'btn-primary') && hasClass(actions[0], 'btn-lg'));
  assert.ok(hasClass(actions[1], 'btn-quiet') && !hasClass(actions[1], 'btn-primary'));
  assert.equal(elements(hero, (node) => attr(node, 'href')?.startsWith('https://github.com')).length, 0);
  // The service is what is sold: the earlier platform positioning is not on the page.
  const copy = clean(text(main));
  for (const phrase of ['Organizational Intelligence Platform', 'OIP', 'Run a Pilot', 'Partnership']) assert.ok(!copy.includes(phrase), phrase);
  assert.ok(copy.includes('Alpha preview'));
  // No case is published: the page shows no empty showcase and sends nobody to one.
  assert.doesNotMatch(copy, /case stud/i);
  assert.equal(elements(main, (node) => attr(node, 'href')?.startsWith('/case-studies')).length, 0);
  for (const id of ['why', 'method', 'saf', 'faq', 'contact']) assert.equal(elements(main, (node) => node.tagName === 'section' && attr(node, 'id') === id).length, 1, id);
  // The opening table opposes work without a frame to work with SAF, on what SAF ships today, and the page says where it stops.
  const why = elements(main, (node) => attr(node, 'id') === 'why')[0];
  assert.deepEqual(elements(why, (node) => node.tagName === 'h3').map((node) => clean(text(node))), ['Quality', 'Traceability', 'Human decision', 'Separation of roles', 'Ownership', 'Improvement']);
  assert.doesNotMatch(clean(text(why)), /2 days|two days|Claude Code|scorecard|guarantee/i);
  const saf = elements(main, (node) => attr(node, 'id') === 'saf')[0];
  for (const phrase of [maturityLabel, latestPreRelease.version, supportedHost.name, 'not yet recorded or authenticated']) assert.ok(clean(text(saf)).includes(phrase), phrase);
  assert.equal(elements(saf, (node) => attr(node, 'href') === '/open-source/#status').length, 1);
  assert.equal(elements(main, (node) => attr(node, 'id') === 'proof').length, 0);
  // The five steps, in order; install commands live on the open-source page, not here.
  const method = elements(main, (node) => attr(node, 'id') === 'method')[0];
  assert.deepEqual(elements(method, (node) => node.tagName === 'h3').slice(0, 5).map((node) => clean(text(node))), methodSteps.map((step) => step.title));
  assert.equal(elements(main, (node) => node.tagName === 'pre').length, 0);
  // Anchors of the former homepage are not reused, so old deep links can be forwarded.
  for (const id of ['pains', 'affordances', 'usage', 'qualities', 'services', 'portfolio']) assert.equal(elements(home, (node) => attr(node, 'id') === id).length, 0, id);
  // An unknown anchor is looked up in the overview and followed only if it exists there.
  const html = read('../dist/index.html');
  assert.ok(html.includes("fetch('/knowledge/platform/')"));
  assert.ok(html.includes("location.replace('/knowledge/platform/#' + hash)"));
});

builtTest('the hero diagram says the transformation in words: your organization, modelled with SAF, agentic organization', () => {
  const hero = elements(built('/'), (node) => hasClass(node, 'hero-seed'))[0];
  const figure = elements(hero, (node) => node.tagName === 'figure' && hasClass(node, 'hero-diagram'))[0];
  // Described once for readers who do not see it; the picture itself is then silent.
  const caption = elements(figure, (node) => node.tagName === 'figcaption')[0];
  // A short name for the figure; the long description is its caption, read once.
  assert.equal(attr(figure, 'aria-label'), 'How Poesis transforms an organization with SAF');
  assert.ok(!hasAttr(figure, 'aria-labelledby') && hasClass(caption, 'sr-only'));
  for (const phrase of ['your organization', 'modelled with SAF', 'agentic organization', 'governed workflow', 'a person who oversees', 'output checked against its schema', 'people then revise', 'evolves']) assert.ok(clean(text(caption)).includes(phrase), phrase);
  // Two compositions, wide and narrow, each with the same words, placed from the geometry the picture was drawn from.
  const lists = elements(figure, (node) => hasClass(node, 'hero-diagram__labels'));
  assert.deepEqual(lists.map((list) => attr(list, 'class').split(' ').at(-1)), ['hero-diagram__labels--landscape', 'hero-diagram__labels--portrait']);
  for (const [index, name] of ['landscape', 'portrait'].entries()) {
    const view = heroDiagram[name];
    const titles = elements(lists[index], (node) => hasClass(node, 'hero-diagram__title'));
    // The reading order is the transformation itself.
    assert.deepEqual(titles.map((node) => clean(text(first(node, 'strong')))), ['Your organization', 'Modelled with SAF', 'Agentic organization'], name);
    assert.deepEqual(titles.map((node) => clean(text(first(node, 'span')))), ['People, roles and processes', "Your organization's DNA", 'AI agents, each with a role'], name);
    const tags = elements(lists[index], (node) => hasClass(node, 'hero-diagram__tag'));
    assert.deepEqual(tags.map((node) => clean(text(node))).sort(), ['Checked outputs', 'Evolves with evidence', 'Governed workflows', 'Human oversight'], name);
    // Every word sits inside the picture.
    for (const [node, item] of [...titles.map((node, at) => [node, view.titles[at]]), ...tags.map((node, at) => [node, view.tags[at]])]) {
      const [, left, top] = attr(node, 'style').match(/^left:([\d.]+)%;top:([\d.]+)%$/);
      assert.ok(Math.abs(Number(left) - (100 * item.x) / view.width) < 0.01 && Number(left) > 0 && Number(left) < 100, `${name} ${item.id} left`);
      assert.ok(Math.abs(Number(top) - (100 * item.y) / view.height) < 0.01 && Number(top) > 0 && Number(top) < 100, `${name} ${item.id} top`);
    }
  }
  // One step in practice, shown as the chat it is: the Poesis mark, the visitor, the agent, the harness's receipt, the decision.
  const step = elements(figure, (node) => hasClass(node, 'hero-chat'))[0];
  assert.equal(attr(first(step, 'img'), 'src'), '/poesis-logo.png');
  assert.equal(clean(text(elements(step, (node) => hasClass(node, 'hero-chat__head'))[0])), 'Poesis SAF agent in your agent host');
  const lines = elements(step, (node) => node.tagName === 'li');
  assert.deepEqual(lines.map((node) => clean(text(first(node, 'b')))), ['You', 'Agent', 'Harness', 'You']);
  assert.deepEqual(lines.map((node) => attr(node, 'data-role')), ['you', 'agent', 'harness', 'gate']);
  assert.deepEqual(elements(lines[3], (node) => node.tagName === 'span').map((node) => clean(text(node))), ['Accept', 'Concerns', 'Reject']);
  // An illustration, not a control: nothing in it can be clicked or focused.
  assert.equal(elements(step, (node) => ['a', 'button', 'input'].includes(node.tagName) || hasAttr(node, 'tabindex')).length, 0);
  for (const line of lines) assert.ok(clean(text(line)).length <= 34, clean(text(line)));
  // The film brings each line forward in turn: the windows follow one another inside its "work" phase.
  const windows = lines.map((node) => [Number(attr(node, 'data-from')), Number(attr(node, 'data-to'))]);
  for (const [index, [from, to]] of windows.entries()) assert.ok(from < to && from >= 0.4 && to <= 0.76 && (index === 0 || from === windows[index - 1][1]), `window ${index}`);
  // The stage reserves the picture's place before it loads: no layout shift.
  const stage = elements(figure, (node) => hasClass(node, 'hero-diagram__stage'))[0];
  assert.equal(attr(stage, 'style'), `--portrait:${heroDiagram.portrait.width} / ${heroDiagram.portrait.height};--landscape:${heroDiagram.landscape.width} / ${heroDiagram.landscape.height}`);
  // The film carries no words of its own, and the diagram promises nothing SAF does not ship.
  const words = clean(text(figure));
  for (const claim of ['autonomous', 'guarantee', 'unchecked', 'Claude', 'self-']) assert.ok(!words.toLowerCase().includes(claim.toLowerCase()), claim);
});

builtTest('the hero film is local, silent, optional and has a still fallback', () => {
  const hero = elements(built('/'), (node) => hasClass(node, 'hero-seed'))[0];
  const video = first(hero, 'video');
  for (const name of ['autoplay', 'muted', 'loop', 'playsinline']) assert.ok(hasAttr(video, name), name);
  assert.equal(attr(video, 'preload'), 'none');
  assert.ok(!hasAttr(video, 'controls'));
  assert.equal(attr(video, 'aria-hidden'), 'true');
  assert.equal(attr(video, 'tabindex'), '-1');
  // No source in the markup: nothing is fetched until the page has checked width, motion and data preferences.
  assert.equal(elements(video, (node) => node.tagName === 'source').length, 0);
  assert.ok(!hasAttr(video, 'src'));
  const sources = JSON.parse(attr(video, 'data-sources'));
  assert.deepEqual(sources.map((source) => source.type), ['video/webm', 'video/mp4']);
  for (const source of sources) {
    assert.match(source.src, /^\/hero\//);
    const size = statSync(here(`../dist${source.src}`)).size;
    assert.ok(size > 100_000 && size < 2_000_000, `${source.src}: ${size} bytes`);
  }
  // The still is an image under the film, not a `poster` attribute: a poster would be fetched
  // even on screens that never play the film. One picture element serves both compositions, so
  // a screen downloads only the one it shows.
  assert.ok(!hasAttr(video, 'poster'));
  const still = elements(hero, (node) => hasClass(node, 'hero-diagram__still'))[0];
  assert.equal(attr(still, 'alt'), '', 'the figure is described by its caption and its labels');
  // On the first screen of tablets and laptops: not lazy.
  assert.ok(!hasAttr(still, 'loading'));
  assert.deepEqual([attr(still, 'width'), attr(still, 'height')], [String(heroDiagram.portrait.width), String(heroDiagram.portrait.height)]);
  const wide = first(hero, 'source');
  assert.equal(attr(wide, 'media'), '(min-width: 720px)');
  assert.deepEqual([attr(wide, 'width'), attr(wide, 'height')], [String(heroDiagram.landscape.width), String(heroDiagram.landscape.height)]);
  for (const picture of [attr(wide, 'srcset'), attr(still, 'src')]) {
    assert.match(picture, /^\/hero\//);
    assert.ok(statSync(here(`../dist${picture}`)).size < 60_000, picture);
  }
  // Where the diagram is on the first screen, its still is fetched early.
  const preload = elements(built('/'), (node) => node.tagName === 'link' && attr(node, 'rel') === 'preload' && attr(node, 'as') === 'image')[0];
  assert.deepEqual([attr(preload, 'href'), attr(preload, 'media')], [attr(wide, 'srcset'), '(min-width: 1100px)']);
  // The film can be paused: a real button with a name, shown only when the film can play.
  const toggle = elements(hero, (node) => hasClass(node, 'hero-diagram__toggle'))[0];
  assert.equal(toggle.tagName, 'button');
  assert.equal(attr(toggle, 'aria-label'), 'Pause animation');
  assert.ok(hasAttr(toggle, 'hidden'), 'the pause control appears only when the film can play');
  // No leftover of the previous film.
  assert.ok(!existsSync(here('../dist/hero/seed.mp4')) && !existsSync(here('../dist/hero/seed-poster.webp')));
});

builtTest('every page carries the same short menu and the call to action, and none carries the old groups', () => {
  assert.deepEqual(siteNavigation.map((item) => item.label), ['Transformation', 'How It Works', 'Open Source', 'Knowledge']);
  for (const route of [...conversionPages, '/case-studies/', '/knowledge/', platformOverviewPath, '/catalog/', '/solutions/saf/', '/services/oip-saas/', '/insights/agentic-safe/', '/usage/read-governance-model/', '/legal/privacy/', '/404.html']) {
    const header = first(built(route), 'header');
    const nav = first(header, 'nav');
    assert.deepEqual(elements(nav, (node) => node.tagName === 'a').map((node) => [attr(node, 'href'), clean(text(node))]), siteNavigation.map((item) => [item.href, item.label]), route);
    const cta = elements(header, (node) => hasClass(node, 'nav-cta'));
    assert.equal(cta.length, 1, route);
    assert.deepEqual([attr(cta[0], 'href'), clean(text(cta[0]))], [navigationCta.href, navigationCta.label], route);
    assert.equal(elements(header, (node) => node.tagName === 'button' && hasClass(node, 'nav-dropdown-trigger')).length, 0, route);
    assert.doesNotMatch(clean(text(header)), /Platform|Partnership|Services|Run a Pilot|Case Studies/, route);
    // A click towards the offer is measured as such.
    assert.equal(attr(elements(nav, (node) => attr(node, 'href') === '/transformation/')[0], 'data-track'), 'business_transformation_click', route);
  }
});

builtTest('conversion pages have one H1, a matching title, a unique description and valid structured data', () => {
  const descriptions = new Set();
  for (const route of conversionPages) {
    const document = built(route);
    const headings = elements(document, (node) => node.tagName === 'h1');
    assert.equal(headings.length, 1, route);
    const title = clean(text(first(document, 'title')));
    // Every title carries the name once: as a suffix, or because the title already ends with it.
    assert.ok(title.endsWith(' · Poesis') || /(^|\s)Poesis$/.test(title), route);
    assert.ok(!title.includes('Poesis · Poesis'), route);
    // Title and H1 are the same words (SEO register, rule 12), the home page included.
    assert.equal(title.replace(/ · Poesis$/, ''), clean(text(headings[0])).replace(/\.$/, ''), route);
    const description = attr(elements(document, (node) => node.tagName === 'meta' && attr(node, 'name') === 'description')[0], 'content');
    assert.ok(description.length >= 70 && description.length <= 200, `${route}: ${description.length}`);
    assert.ok(!descriptions.has(description), `${route}: duplicate description`);
    descriptions.add(description);
    const canonical = attr(elements(document, (node) => node.tagName === 'link' && attr(node, 'rel') === 'canonical')[0], 'href');
    assert.equal(canonical, `https://poesis.cloud${route}`);
    const blocks = elements(document, (node) => node.tagName === 'script' && attr(node, 'type') === 'application/ld+json').map((node) => JSON.parse(text(node)));
    assert.ok(blocks.some((block) => block['@type'] === 'Organization'), route);
    for (const block of blocks) {
      assert.equal(block['@context'], 'https://schema.org', route);
      // Nothing that would need evidence the site does not have.
      assert.doesNotMatch(JSON.stringify(block), /"(aggregateRating|review|offers|price|award)"/, route);
    }
    const visible = clean(text(mainOf(document)));
    for (const block of blocks.filter((candidate) => candidate['@type'] === 'FAQPage')) {
      for (const entry of block.mainEntity) {
        assert.ok(visible.includes(entry.name), `${route}: ${entry.name}`);
        assert.ok(visible.includes(clean(entry.acceptedAnswer.text).slice(0, 80)), `${route}: answer of ${entry.name}`);
      }
    }
  }
});

builtTest('Knowledge pages wear the envelope, archived offers say so, and only Knowledge enters the search index', () => {
  for (const route of ['/catalog/', '/solutions/saf/', '/usage/read-governance-model/', '/insights/agentic-safe/', '/it/alternatives/leanix/', platformOverviewPath, thesisPath]) {
    const document = built(route);
    assert.equal(elements(document, (node) => hasClass(node, 'kb-bar')).length, 1, route);
    assert.equal(elements(document, (node) => hasClass(node, 'kb-bar__archive')).length, 0, route);
    assert.ok(hasAttr(mainOf(document), 'data-pagefind-body'), route);
  }
  for (const route of ['/services/pilot/', '/services/agentic-transformation/', '/services/oip-saas/', '/partnerships/llm-vendor-value-proposal/', '/catalog/services/']) {
    const notice = elements(built(route), (node) => hasClass(node, 'kb-bar__archive'));
    assert.equal(notice.length, 1, route);
    assert.ok(clean(text(notice[0])).startsWith('Archived offer.'), route);
    assert.ok(elements(notice[0], (node) => attr(node, 'href') === '/transformation/').length, route);
  }
  for (const route of conversionPages) {
    const document = built(route);
    assert.equal(elements(document, (node) => hasClass(node, 'kb-bar')).length, 0, route);
    assert.ok(!hasAttr(mainOf(document), 'data-pagefind-body'), route);
  }
  // Nothing outside the corpus is indexed: no conversion page, and no bundle shipped under public/.
  const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    return entry.isDirectory() ? (entry.name === 'pagefind' ? [] : walk(path)) : entry.name.endsWith('.html') ? [path] : [];
  });
  const root = here('../dist/');
  const indexed = walk(root).filter((file) => readFileSync(file, 'utf8').includes('data-pagefind-body')).map((file) => `/${file.pathname.slice(root.pathname.length)}`);
  assert.ok(indexed.length > 150);
  assert.deepEqual(indexed.filter((path) => !knowledgeContext(path.replace(/index\.html$/, '')).inKnowledge), []);
  assert.ok(existsSync(here('../dist/pagefind/pagefind-ui.js')));
});

builtTest('the Knowledge hub lists the whole corpus and offers its search', () => {
  const hub = built('/knowledge/');
  const hrefs = elements(mainOf(hub), (node) => node.tagName === 'a').map((node) => attr(node, 'href'));
  const slugs = noteFiles().map((file) => file.replace(/\.md$/, ''));
  for (const slug of slugs) assert.ok(hrefs.includes(`/insights/${slug}`), slug);
  for (const alternative of alternatives) assert.ok(hrefs.includes(`/it/alternatives/${alternative.slug}/`), alternative.slug);
  for (const solution of platformSolutions) assert.ok(hrefs.includes(solutionHref(solution)), solution.slug);
  for (const href of ['/insights/research', thesisPath, platformOverviewPath, '/catalog', 'https://docs.poesis.cloud/saf/', '/transformation/']) assert.ok(hrefs.includes(href), href);
  assert.equal(elements(hub, (node) => attr(node, 'id') === 'knowledge-search' && attr(node, 'role') === 'search').length, 1);
  for (const id of ['search', 'research', 'platform', 'catalog', 'solutions', 'comparisons', 'documentation', 'archive']) assert.equal(elements(hub, (node) => attr(node, 'id') === id).length, 1, id);
  // The thesis page keeps the argument the About page used to carry.
  const thesis = built(thesisPath);
  assert.equal(clean(text(first(thesis, 'h1'))), 'A thesis that refused to stay prose.');
  assert.ok(elements(thesis, (node) => attr(node, 'href')?.startsWith('/insights/')).length >= 8);
});

builtTest('internal links of the conversion pages and of the hub resolve, anchors included', () => {
  // Three in-page links of the platform overview already pointed at anchors that did not exist
  // on the previous homepage. They belong to a corpus component and are recorded, not rewritten.
  const knownDeadAnchors = new Set(['#use-case-think', '#use-case-build', '#use-case-run']);
  const broken = [];
  for (const route of [...conversionPages, '/knowledge/', platformOverviewPath, thesisPath, '/404.html']) {
    for (const link of elements(built(route), (node) => node.tagName === 'a')) {
      const href = attr(link, 'href');
      if (!href || !/^[/#]/.test(href) || (route === platformOverviewPath && knownDeadAnchors.has(href))) continue;
      const target = new URL(href, `https://poesis.cloud${route}`);
      if (!existsSync(here(distFile(target.pathname)))) { broken.push(`${route} -> ${href}`); continue; }
      if (target.hash && !elements(built(target.pathname), (node) => attr(node, 'id') === decodeURIComponent(target.hash.slice(1))).length) broken.push(`${route} -> ${href} (anchor)`);
    }
  }
  assert.deepEqual(broken, []);
});

builtTest('external links of the conversion pages open safely and stay on approved hosts', () => {
  const hosts = new Set();
  for (const route of [...conversionPages, '/knowledge/']) {
    for (const link of elements(mainOf(built(route)), (node) => node.tagName === 'a' && /^https?:/.test(attr(node, 'href') ?? ''))) {
      const url = new URL(attr(link, 'href'));
      hosts.add(url.host);
      assert.equal(url.protocol, 'https:', url.href);
      if (attr(link, 'target') === '_blank') assert.match(attr(link, 'rel') ?? '', /noopener/, url.href);
    }
  }
  assert.deepEqual([...hosts].sort(), ['developercertificate.org', 'docs.poesis.cloud', 'github.com', 'www.linkedin.com']);
});

builtTest('the contact form is short, labelled, honest about its transport, and present where a prospect decides', () => {
  for (const route of formPages) {
    const page = built(route);
    const forms = elements(page, (node) => node.tagName === 'form' && hasAttr(node, 'data-contact-form'));
    assert.equal(forms.length, 1, route);
    const form = forms[0];
    const controls = elements(form, (node) => ['input', 'select', 'textarea'].includes(node.tagName));
    assert.deepEqual(controls.map((control) => attr(control, 'data-key')), contactFields.map((field) => field.key), route);
    for (const [index, control] of controls.entries()) {
      const id = attr(control, 'id');
      assert.equal(elements(form, (node) => node.tagName === 'label' && attr(node, 'for') === id).length, 1, `${route} ${id}`);
      assert.equal(Number(attr(control, 'maxlength')), contactFields[index].maxLength, `${route} ${id}`);
      assert.equal(hasAttr(control, 'required'), contactFields[index].required, `${route} ${id}`);
    }
    assert.equal(elements(form, (node) => ['file', 'password', 'tel'].includes(attr(node, 'type'))).length, 0, route);
    assert.equal(attr(form, 'data-source'), route === '/' ? 'home' : route.replaceAll('/', ''), route);
    assert.ok(elements(form, (node) => attr(node, 'href') === '/legal/privacy').length, `${route}: privacy link`);
    // Without JavaScript the form is the browser's own mailto, with native validation.
    assert.equal(attr(form, 'action'), `mailto:${contactEmail}?subject=Transformation%20request`, route);
    assert.equal(attr(form, 'enctype'), 'text/plain', route);
    assert.ok(!hasAttr(form, 'novalidate'), route);
    // The result of a submission is announced, and never pre-written as a success.
    const scope = elements(page, (node) => hasClass(node, 'contact-form'))[0];
    const status = elements(scope, (node) => hasAttr(node, 'data-contact-status'))[0];
    assert.equal(attr(status, 'role'), 'status', route);
    assert.equal(clean(text(status)), '', route);
    // Without scripts the form can only prepare an email: no hidden field sits in the markup to leak into that draft.
    assert.equal(elements(form, (node) => hasAttr(node, 'data-trap') || attr(node, 'name') === '_gotcha').length, 0, route);
    // The fallback link will carry the request once filled in: it must not be sent to analytics by its address.
    assert.ok(!hasAttr(elements(scope, (node) => hasAttr(node, 'data-contact-fallback'))[0], 'data-track'), route);
    const button = clean(text(elements(form, (node) => node.tagName === 'button' && attr(node, 'type') === 'submit')[0]));
    const done = elements(scope, (node) => hasAttr(node, 'data-contact-done'));
    if (hasAttr(form, 'data-endpoint')) {
      // A receiver is configured: the confirmation exists but is hidden until the receiver answers.
      assert.match(attr(form, 'data-endpoint'), /^https:\/\/|^http:\/\/(127\.0\.0\.1|localhost)[:/]/, route);
      assert.equal(button, 'Discuss your transformation', route);
      assert.equal(done.length, 1, route);
      assert.ok(hasAttr(done[0], 'hidden'), route);
      assert.ok(elements(form, (node) => node.tagName === 'noscript').length, `${route}: wording for visitors without scripts`);
    } else {
      // No receiver: the form says it prepares an email, posts nowhere and has no "sent" panel at all.
      assert.equal(button, 'Open in my email app', route);
      assert.ok(clean(text(form)).includes('This form prepares an email in your own mail app'), route);
      assert.equal(done.length, 0, route);
      assert.doesNotMatch(clean(text(scope)), /has reached Poesis|Message sent|was sent\b/i, route);
    }
  }
  const contact = built('/contact/');
  for (const destination of [harness.issues, organization.issues]) assert.ok(elements(contact, (node) => attr(node, 'href') === destination).length, destination);
  // No third-party form service and no key in any page that carries the form.
  for (const route of formPages) assert.doesNotMatch(read(distFile(route)), /formspree|getform|netlify|hubspot|typeform|web3forms|api[_-]?key|secret/i, route);
  // The privacy policy describes the transport that was actually built.
  const posting = hasAttr(first(built('/contact/'), 'form'), 'data-endpoint');
  const privacy = clean(text(mainOf(built('/legal/privacy/'))));
  assert.ok(privacy.includes(posting ? 'The contact form sends what you enter' : 'The contact form runs entirely in your browser'));
});

builtTest('the open-source page shows the verified install commands, and keeps what exists apart from what does not', () => {
  const page = built('/open-source/');
  const copy = clean(text(mainOf(page)));
  const blocks = elements(page, (node) => node.tagName === 'pre').map((node) => text(node));
  assert.ok(blocks.includes(installCommands.join('\n')));
  for (const phrase of [maturityLabel, latestPreRelease.version, 'Apache License 2.0', 'GitHub Copilot', 'No other agent host is supported yet.', 'no response-time commitment', 'What exists today, and what does not.', cliVersionNote]) assert.ok(copy.includes(phrase), phrase);
  for (const item of [...maturity.published, ...maturity.implemented, ...maturity.partial, ...maturity.planned, ...knownLimits]) assert.ok(copy.includes(clean(item)), item);
  assert.ok(elements(page, (node) => attr(node, 'href') === safLinks.limitations).length, 'link to the limitations the project publishes');
  assert.doesNotMatch(copy, /Claude Code|Cursor|production-ready|enterprise-ready|@poesis-saf(?!-preview)\b/);
  // No pill above the title: the status is a sentence.
  assert.equal(elements(elements(page, (node) => hasClass(node, 'intro'))[0], (node) => hasClass(node, 'status')).length, 0);
  for (const id of ['products', 'status', 'how', 'install', 'first-workflow', 'community']) assert.equal(elements(page, (node) => attr(node, 'id') === id).length, 1, id);
  for (const product of safProducts) for (const href of [product.repository, product.docs, product.issues, product.contributing]) assert.ok(elements(page, (node) => attr(node, 'href') === href).length, href);
  assert.ok(elements(page, (node) => attr(node, 'href') === '/transformation/').length, 'the way back to the service');
});

builtTest('links that used to reach the former home page or the pilot builder still reach them', () => {
  // Comparison pages and the architecture map point at the platform overview, not at the sales page.
  for (const alternative of alternatives) {
    const page = built(`/it/alternatives/${alternative.slug}/`);
    assert.equal(elements(mainOf(page), (node) => node.tagName === 'a' && attr(node, 'href') === '/').length, 0, alternative.slug);
    assert.ok(elements(mainOf(page), (node) => attr(node, 'href') === platformOverviewPath).length >= 2, alternative.slug);
  }
  const map = elements(built(platformOverviewPath), (node) => attr(node, 'id') === 'arch-platform-heading')[0];
  assert.equal(attr(first(map, 'a'), 'href'), platformOverviewPath);
  // An archived offer is not sold: its page sells nothing of its own. Its actions lead to the current offer,
  // and the pilot record it described stays one link away, in the list of archived services.
  const service = built('/services/oip-saas/');
  const actions = elements(mainOf(service), (node) => node.tagName === 'a' && hasClass(node, 'btn')).map((node) => [clean(text(node)), attr(node, 'href')]);
  assert.deepEqual(actions, [['See what Poesis offers today', '/transformation/'], ['Discuss your transformation', '/contact/'], ['See the current offer', '/transformation/']]);
  assert.doesNotMatch(clean(text(mainOf(service))), /Discuss future requirements|Start with a Pilot|Shape your Pilot/);
  assert.ok(elements(mainOf(service), (node) => attr(node, 'href') === '/services/pilot').length >= 1);
  assert.equal(elements(mainOf(service), (node) => attr(node, 'href') === '/pilot').length, 0);
  // A brief's selection link is forwarded to the builder.
  assert.ok(read('../dist/pilot/index.html').includes("location.replace('/services/pilot/' + location.search)"));
});

builtTest('every page says the same thing about the human gate: the end of each workflow, not a step inside it', () => {
  // The harness specification: "the human checkpoint is the workflow return boundary", with no gate inside a workflow.
  const inside = /step (of|in) the workflow|review points?\b|points (the workflow names|you chose|where a person)|where a person reviews/i;
  for (const route of [...conversionPages, '/case-studies/', '/case-studies/example-retail-bank-delivery-team/']) assert.doesNotMatch(clean(text(mainOf(built(route)))), inside, route);
  assert.doesNotMatch(read('../dist/llms.txt'), inside);
  for (const route of ['/', '/open-source/', '/how-it-works/']) assert.match(clean(text(mainOf(built(route)))), /ends (at a human gate|by handing its results to a person)|end of each workflow/, route);
  // A Knowledge note keeps its own title: the name is not dropped from titles that merely end with those letters.
  const note = built('/insights/governed-synthetic-autopoiesis/');
  assert.ok(clean(text(first(note, 'title'))).endsWith(' · Poesis'));
});

builtTest('llms.txt is generated from the SAF facts the pages use', () => {
  const llms = read('../dist/llms.txt');
  for (const fact of [verifiedOn, latestPreRelease.version, latestPreRelease.publishedOn, supportedHost.name, maturityLabel.toLowerCase(), harness.repository, organization.repository, 'No client case study is published yet.', offerName, 'https://poesis.cloud/how-it-works/']) assert.ok(llms.includes(fact), fact);
  assert.ok(llms.startsWith('# Poesis\n'));
  assert.doesNotMatch(llms, /undefined|\[object|production-ready|\/case-studies\//);
});

builtTest('without a published case, the register is a quiet page with one fictional example, and nothing presents it as proof', () => {
  const register = built('/case-studies/');
  assert.equal(clean(text(first(register, 'h1'))), 'How Poesis documents its pilots.');
  assert.doesNotMatch(clean(text(mainOf(register))), /Published cases|being documented|No case study is published/);
  // The example announces itself as fiction on its card and at the top of its page, and reports no result.
  assert.deepEqual(readdirSync(here('../dist/case-studies/')).sort(), [illustrativeExample.slug, 'index.html']);
  const card = elements(register, (node) => hasClass(node, 'case-card--fiction'));
  assert.equal(card.length, 1);
  assert.equal(clean(text(elements(card[0], (node) => hasClass(node, 'fiction-notice'))[0])), fictionalNotice);
  const example = built(`/case-studies/${illustrativeExample.slug}/`);
  const body = mainOf(example);
  const notice = elements(body, (node) => hasClass(node, 'fiction-notice'))[0];
  assert.equal(clean(text(notice)), fictionalNotice);
  const order = elements(body, (node) => node.tagName === 'h1' || hasClass(node, 'fiction-notice'));
  assert.ok(hasClass(order[0], 'fiction-notice'), 'the notice comes before the title');
  assert.ok(clean(text(first(example, 'h1'))).startsWith('Fictional example: '));
  assert.ok(clean(text(first(example, 'title'))).startsWith('Fictional example: '));
  assert.ok(clean(text(body)).includes('None. A real case reports here only what was measured'));
  assert.doesNotMatch(clean(text(body)), /Cleared for publication|\d+\s*%/);
  // Neither page is offered to search engines, and no commercial page links to them.
  for (const page of [register, example]) {
    assert.equal(attr(elements(page, (node) => node.tagName === 'meta' && attr(node, 'name') === 'robots')[0], 'content'), 'noindex, follow');
    assert.equal(elements(page, (node) => node.tagName === 'link' && attr(node, 'rel') === 'canonical').length, 0);
  }
  for (const route of conversionPages) assert.equal(elements(built(route), (node) => attr(node, 'href')?.startsWith('/case-studies')).length, 0, route);
});

builtTest('the sitemap and the noindex directives agree, and archived offers are in neither index', () => {
  const sitemap = read('../dist/sitemap-0.xml');
  const listed = new Set([...sitemap.matchAll(/<loc>https:\/\/poesis\.cloud([^<]*)<\/loc>/g)].map((match) => match[1]));
  const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    return entry.isDirectory() ? (entry.name === 'pagefind' || entry.name.startsWith('oap-') ? [] : walk(path)) : entry.name === 'index.html' ? [path] : [];
  });
  const root = here('../dist/');
  const archived = [];
  for (const file of walk(root)) {
    const route = `/${file.pathname.slice(root.pathname.length).replace(/index\.html$/, '')}`;
    const html = readFileSync(file, 'utf8');
    const blocked = /<meta name="robots" content="noindex/.test(html);
    assert.equal(listed.has(route), !blocked, `${route}: ${blocked ? 'noindex but in the sitemap' : 'indexable but missing from the sitemap'}`);
    // An archived offer is a page that carries the archive notice (old redirect stubs under /services/ do not).
    if (html.includes('kb-bar__archive')) {
      assert.ok(blocked, `${route}: archived offer still offered to search engines`);
      archived.push(route);
    }
  }
  // Archived offers: seven service records, the partnership proposal and the list of services.
  assert.equal(archived.length, 9);
  assert.ok(archived.includes('/catalog/services/') && archived.includes('/services/agentic-transformation/') && archived.includes('/services/pilot/'));
  // The current offer and the corpus stay indexed.
  for (const route of [...conversionPages, '/knowledge/', '/knowledge/platform/', '/knowledge/thesis/', '/catalog/', '/catalog/usage/', '/solutions/saf/', '/insights/agentic-safe/', '/it/alternatives/leanix/']) assert.ok(listed.has(route), route);
  assert.doesNotMatch(sitemap, /404|\/oap-|\/case-studies\//);
  // Nothing in robots.txt hides a page: a crawler must be able to read the noindex directive.
  assert.doesNotMatch(read('../dist/robots.txt'), /Disallow: \/\S/);
});

