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
import { archivePrefixes, knowledgeContext, knowledgePrefixes, platformOverviewPath, thesisPath } from '../src/data/knowledge.ts';
import { harness, installCommands, latestPreRelease, marketplace, maturityLabel, organization, safProducts, supportedHost, verifiedOn } from '../src/data/saf.ts';
import { homeFaq, pilotFaq, transformationFaq, faqLd } from '../src/data/faq.ts';
import { caseStudies, publicationChecklist, publishedCaseStudies, validateCaseStudies } from '../src/data/case-studies.ts';
import { briefMailto, composeBrief, MAILTO_LIMIT } from '../src/scripts/contact-brief.ts';
import { contactEmail } from '../src/data/site.ts';
import { platformSolutions, solutionHref } from '../src/data/poesis-platform.ts';
import { alternatives } from '../src/data/alternatives.ts';

/** The hero message, verbatim. Changing a word of it is a decision for Poesis, not for a refactor. */
const HERO_MESSAGE = 'Generate easily and rapidly a seed of an agentic organisation mirroring yours to automatize. Plant it, and watch it to produce and evolve.';

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

const conversionPages = ['/', '/transformation/', '/open-source/', '/case-studies/', '/pilot/', '/about/', '/contact/'];

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
  assert.equal(readdirSync(here('../src/content/insights/')).length, 17);
  // Four data modules changed, and only in how they derive a route: the menu, and three
  // helpers that pointed at the former homepage. They are listed, not hashed.
  assert.deepEqual(manifest.rerouted, ['src/data/poesis-platform.ts', 'src/data/services.ts', 'src/data/site-navigation.ts', 'src/data/usage.ts']);
});

test('Knowledge routes are classified without ambiguity', () => {
  for (const path of ['/knowledge/', '/knowledge/platform', '/catalog', '/catalog/usage', '/solutions/saf', '/usage/read-governance-model', '/insights/agentic-safe/', '/it/alternatives/leanix/']) {
    assert.deepEqual(knowledgeContext(path), { inKnowledge: true, archive: false, isHub: path === '/knowledge/' }, path);
  }
  for (const path of ['/services/pilot', '/services/oip-saas/', '/partnerships/llm-vendor-value-proposal']) assert.equal(knowledgeContext(path).archive, true, path);
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
  for (const set of [homeFaq, transformationFaq, pilotFaq]) {
    const ld = faqLd(set);
    assert.equal(ld['@type'], 'FAQPage');
    assert.deepEqual(ld.mainEntity.map((entry) => entry.name), set.map((item) => item.question));
    for (const [index, entry] of ld.mainEntity.entries()) assert.equal(entry.acceptedAnswer.text, set[index].answer.join(' '));
  }
  const readiness = homeFaq.at(-1).answer.join(' ');
  assert.match(readiness, /^No\./);
  assert.ok(readiness.includes(latestPreRelease.version));
});

test('no case study is published without evidence, stated limits and clearance', () => {
  assert.equal(caseStudies.length, 0, 'add a case only with its evidence and its publication clearance');
  assert.equal(publishedCaseStudies.length, 0);
  assert.ok(publicationChecklist.length >= 5);
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

test('the contact brief becomes an email to the published address and never a network call', () => {
  const values = { Name: 'Ada Lovelace', 'Work email': 'ada@example.org', Organization: '', Scope: 'A team', 'What we would like to transform': 'Our release process.', 'Current challenge': '' };
  const brief = composeBrief(values);
  assert.ok(brief.startsWith('Transformation brief'));
  assert.ok(brief.includes('Name: Ada Lovelace'));
  assert.ok(brief.includes('Our release process.'));
  assert.ok(!brief.includes('Organization:'), 'empty optional fields are left out');
  assert.ok(!brief.includes('Current challenge'));
  const { href, shortened } = briefMailto(contactEmail, values);
  assert.equal(shortened, false);
  assert.ok(href.startsWith(`mailto:${contactEmail}?subject=`));
  assert.ok(decodeURIComponent(href).includes('Our release process.'));
  const long = briefMailto(contactEmail, { ...values, 'What we would like to transform': 'x'.repeat(2000) });
  assert.equal(long.shortened, true);
  assert.ok(long.href.length <= MAILTO_LIMIT);
  // A hostile value stays inert text inside the link.
  const hostile = briefMailto(contactEmail, { ...values, Name: 'a&bcc=evil@example.org\r\nBcc: evil@example.org' });
  assert.equal((hostile.href.match(/[?&]bcc=/gi) ?? []).length, 0);
  assert.equal(hostile.href.split('?').length, 2);
  assert.doesNotMatch(hostile.href, /[\r\n]/);
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

builtTest('the home page states the hero message verbatim and opens both funnels', () => {
  const home = built('/');
  const main = mainOf(home);
  const headings = elements(home, (node) => node.tagName === 'h1');
  assert.equal(headings.length, 1);
  assert.equal(clean(text(headings[0])), HERO_MESSAGE);
  const hero = elements(main, (node) => hasClass(node, 'hero-seed'))[0];
  const actions = elements(hero, (node) => node.tagName === 'a' && hasClass(node, 'btn'));
  assert.deepEqual(actions.map((node) => [clean(text(node)), attr(node, 'href')]), [['Discuss your transformation', '/contact/'], ['Get started with SAF', '/open-source/']]);
  assert.ok(elements(hero, (node) => attr(node, 'href') === harness.repository).length, 'a direct repository link sits in the hero');
  // The service is what is sold: the earlier platform positioning is not on the page.
  const copy = clean(text(main));
  for (const phrase of ['Organizational Intelligence Platform', 'OIP', 'Run a Pilot', 'Partnership']) assert.ok(!copy.includes(phrase), phrase);
  assert.ok(copy.includes('Alpha preview'));
  assert.ok(copy.includes('Pilot case studies are being documented.'));
  for (const id of ['why', 'method', 'strengths', 'saf', 'proof', 'open-source', 'faq']) assert.equal(elements(main, (node) => node.tagName === 'section' && attr(node, 'id') === id).length, 1, id);
  // Anchors of the former homepage are not reused, so old deep links can be forwarded.
  for (const id of ['pains', 'affordances', 'usage', 'qualities', 'services', 'portfolio']) assert.equal(elements(home, (node) => attr(node, 'id') === id).length, 0, id);
  assert.ok(read('../dist/index.html').includes("location.replace('/knowledge/platform/#' + hash)"));
});

builtTest('the hero film is local, silent, optional and has a still fallback', () => {
  const hero = elements(built('/'), (node) => hasClass(node, 'hero-seed'))[0];
  const video = first(hero, 'video');
  for (const name of ['autoplay', 'muted', 'loop', 'playsinline']) assert.ok(hasAttr(video, name), name);
  assert.equal(attr(video, 'preload'), 'none');
  assert.ok(!hasAttr(video, 'controls'));
  // No source in the markup: nothing is fetched until the page has checked width, motion and data preferences.
  assert.equal(elements(video, (node) => node.tagName === 'source').length, 0);
  assert.ok(!hasAttr(video, 'src'));
  const sources = JSON.parse(attr(video, 'data-sources'));
  assert.deepEqual(sources.map((source) => source.type), ['video/webm', 'video/mp4']);
  for (const source of sources) {
    assert.match(source.src, /^\/hero\//);
    const size = statSync(here(`../dist${source.src}`)).size;
    assert.ok(size > 100_000 && size < 2_500_000, `${source.src}: ${size} bytes`);
  }
  const still = first(hero, 'img');
  assert.equal(attr(still, 'alt'), '');
  assert.ok(Number(attr(still, 'width')) > 0 && Number(attr(still, 'height')) > 0);
  for (const poster of [attr(video, 'poster'), attr(still, 'src'), attr(first(hero, 'source'), 'srcset')]) {
    assert.match(poster, /^\/hero\//);
    assert.ok(statSync(here(`../dist${poster}`)).size < 60_000, poster);
  }
  const toggle = elements(hero, (node) => hasClass(node, 'hero-seed__toggle'))[0];
  assert.equal(toggle.tagName, 'button');
  assert.ok(hasAttr(toggle, 'hidden'), 'the pause control appears only when the film can play');
});

builtTest('every page carries the four-item menu and the call to action, and none carries the old groups', () => {
  for (const route of [...conversionPages, '/knowledge/', platformOverviewPath, '/catalog/', '/solutions/saf/', '/services/oip-saas/', '/insights/agentic-safe/', '/usage/read-governance-model/', '/legal/privacy/', '/404.html']) {
    const header = first(built(route), 'header');
    const nav = first(header, 'nav');
    assert.deepEqual(elements(nav, (node) => node.tagName === 'a').map((node) => [attr(node, 'href'), clean(text(node))]), siteNavigation.map((item) => [item.href, item.label]), route);
    const cta = elements(header, (node) => hasClass(node, 'nav-cta'));
    assert.equal(cta.length, 1, route);
    assert.deepEqual([attr(cta[0], 'href'), clean(text(cta[0]))], [navigationCta.href, navigationCta.label], route);
    assert.equal(elements(header, (node) => node.tagName === 'button' && hasClass(node, 'nav-dropdown-trigger')).length, 0, route);
    assert.doesNotMatch(clean(text(header)), /Platform|Partnership|Services|Run a Pilot/, route);
  }
});

builtTest('conversion pages have one H1, a matching title, a unique description and valid structured data', () => {
  const descriptions = new Set();
  for (const route of conversionPages) {
    const document = built(route);
    const headings = elements(document, (node) => node.tagName === 'h1');
    assert.equal(headings.length, 1, route);
    const title = clean(text(first(document, 'title')));
    assert.ok(title.endsWith(' · Poesis'), route);
    // Title and H1 are the same words (SEO register, rule 12). The home page is the one
    // documented exception: its H1 is the imposed hero message.
    if (route !== '/') assert.equal(title.replace(/ · Poesis$/, ''), clean(text(headings[0])).replace(/\.$/, ''), route);
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
  for (const route of ['/services/pilot/', '/services/agentic-transformation/', '/services/oip-saas/', '/partnerships/llm-vendor-value-proposal/']) {
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
  const slugs = readdirSync(here('../src/content/insights/')).map((file) => file.replace(/\.md$/, ''));
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

builtTest('the contact page offers a brief that degrades to mailto and labels every field', () => {
  const contact = built('/contact/');
  const form = first(contact, 'form');
  assert.equal(attr(form, 'action'), `mailto:${contactEmail}?subject=Transformation%20brief`);
  assert.equal(attr(form, 'enctype'), 'text/plain');
  assert.ok(!hasAttr(form, 'novalidate'), 'native validation applies without JavaScript');
  const controls = elements(form, (node) => ['input', 'select', 'textarea'].includes(node.tagName));
  assert.equal(controls.length, 6);
  for (const control of controls) {
    const id = attr(control, 'id');
    assert.equal(elements(form, (node) => node.tagName === 'label' && attr(node, 'for') === id).length, 1, id);
    assert.ok(attr(control, 'name'), id);
  }
  assert.deepEqual(controls.filter((control) => hasAttr(control, 'required')).map((control) => attr(control, 'id')), ['brief-name', 'brief-email', 'brief-goal']);
  assert.equal(elements(form, (node) => attr(node, 'type') === 'file' || attr(node, 'type') === 'password').length, 0);
  const copy = clean(text(mainOf(contact)));
  assert.ok(copy.includes('This form does not send anything by itself.'));
  for (const destination of [harness.issues, organization.issues]) assert.ok(elements(contact, (node) => attr(node, 'href') === destination).length, destination);
  // No third-party form endpoint and no key in the page.
  const html = read('../dist/contact/index.html');
  assert.doesNotMatch(html, /formspree|getform|netlify|hubspot|typeform|api[_-]?key|secret/i);
});

builtTest('the open-source page shows the verified install commands, status and limits', () => {
  const page = built('/open-source/');
  const copy = clean(text(mainOf(page)));
  const blocks = elements(page, (node) => node.tagName === 'pre').map((node) => text(node));
  assert.ok(blocks.includes(installCommands.join('\n')));
  for (const phrase of [maturityLabel, latestPreRelease.version, 'Apache License 2.0', 'GitHub Copilot', 'No other agent host is supported yet.', 'no response-time commitment']) assert.ok(copy.includes(phrase), phrase);
  assert.doesNotMatch(copy, /Claude Code|Cursor|production-ready|enterprise-ready|@poesis-saf(?!-preview)\b/);
  for (const id of ['products', 'how', 'install', 'first-workflow', 'community']) assert.equal(elements(page, (node) => attr(node, 'id') === id).length, 1, id);
  for (const product of safProducts) for (const href of [product.repository, product.docs, product.issues, product.contributing]) assert.ok(elements(page, (node) => attr(node, 'href') === href).length, href);
  assert.ok(elements(page, (node) => attr(node, 'href') === '/transformation/').length, 'the way back to the service');
});

builtTest('no case-study page exists while no case is published, and the sitemap keeps old and new routes', () => {
  const directory = here('../dist/case-studies/');
  assert.deepEqual(readdirSync(directory), ['index.html']);
  const sitemap = read('../dist/sitemap-0.xml');
  for (const route of [...conversionPages.filter((route) => route !== '/'), '/knowledge/', '/knowledge/platform/', '/knowledge/thesis/', '/catalog/', '/solutions/saf/', '/insights/agentic-safe/', '/services/agentic-transformation/', '/it/alternatives/leanix/']) {
    assert.ok(sitemap.includes(`<loc>https://poesis.cloud${route}</loc>`), route);
  }
  assert.ok(sitemap.includes('<loc>https://poesis.cloud/</loc>'));
  assert.doesNotMatch(sitemap, /404|\/oap-/);
});
