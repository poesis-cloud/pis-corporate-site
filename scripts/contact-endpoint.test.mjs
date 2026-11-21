/**
 * Tests of the reference receiver of the contact form (contact-endpoint/handler.mjs).
 *
 * They run the handler in process, with a recording transport: no network, no
 * account. They establish the contract the page relies on, above all that a
 * request is acknowledged with `ok: true` only when it was really handed over.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHandler, LIMITS, MAX_BODY_BYTES, toMessage, validate } from '../contact-endpoint/handler.mjs';
import { buildPayload, interpretResponse } from '../src/scripts/contact-brief.ts';

const ORIGIN = 'https://poesis.cloud';
const valid = { name: 'Ada Lovelace', email: 'ada@example.org', company: 'Analytical Engines', goal: 'Our release process.', message: 'Two teams.' };

function setup(overrides = {}) {
  const delivered = [];
  let clock = 1_800_000_000_000;
  const handle = createHandler({
    allowedOrigins: [ORIGIN],
    deliver: async (message) => { delivered.push(message); },
    now: () => clock,
    clientKey: () => 'client-a',
    ...overrides,
  });
  const post = (body, { origin = ORIGIN, headers = {}, method = 'POST', raw } = {}) => handle(new Request('https://receiver.example/contact', {
    method,
    headers: { ...(origin ? { origin } : {}), 'content-type': 'application/json', ...headers },
    body: method === 'POST' ? (raw ?? JSON.stringify(body)) : undefined,
  }));
  return { handle, post, delivered, advance: (ms) => { clock += ms; } };
}
const payload = (values = valid, meta = {}) => buildPayload(values, { source: 'contact', elapsedMs: 9000, trap: '', ...meta });

test('a valid request from the site is delivered once and acknowledged', async () => {
  const { post, delivered } = setup();
  const response = await post(payload());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get('access-control-allow-origin'), ORIGIN);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(delivered.length, 1);
  const [message] = delivered;
  assert.equal(message.subject, 'Transformation request: Analytical Engines');
  assert.equal(message.replyTo, 'ada@example.org');
  assert.ok(message.text.includes('Full name: Ada Lovelace'));
  assert.ok(message.text.includes('Our release process.'));
  assert.ok(message.text.includes('Sent from poesis.cloud (contact) on 2027-'));
  // The page reads this reply as "sent", and reads nothing else that way.
  assert.deepEqual(interpretResponse(response.status, { ok: true }), { state: 'sent' });
});

test('a failed delivery is never acknowledged', async () => {
  const { post } = setup({ deliver: async () => { throw new Error('mail transport down'); } });
  const response = await post(payload());
  assert.equal(response.status, 502);
  const body = await response.json();
  assert.equal(body.ok, false);
  assert.deepEqual(interpretResponse(response.status, body), { state: 'failed' });
});

test('missing, malformed and oversized fields are refused, field by field, and nothing is delivered', async () => {
  const { post, delivered } = setup({ rateLimit: { windowMs: 1000, max: 100 } });
  const cases = [
    [{ ...valid, name: '   ' }, { name: 'required' }],
    [{ ...valid, email: 'not-an-address' }, { email: 'invalid' }],
    [{ ...valid, email: '', goal: '' }, { email: 'required', goal: 'required' }],
    [{ ...valid, goal: 'x'.repeat(LIMITS.goal + 1) }, { goal: 'too-long' }],
    [{ ...valid, company: 'c'.repeat(LIMITS.company + 1) }, { company: 'too-long' }],
  ];
  for (const [values, errors] of cases) {
    const response = await post(payload(values));
    assert.equal(response.status, 422);
    const body = await response.json();
    assert.deepEqual(body.errors, errors);
    assert.deepEqual(interpretResponse(422, body), { state: 'invalid', fields: Object.keys(errors) });
  }
  // Optional fields may be empty.
  assert.equal((await post(payload({ ...valid, company: '', message: '' }))).status, 200);
  assert.equal(delivered.length, 1);
  assert.equal(delivered[0].subject, 'Transformation request: Ada Lovelace');
  // Addresses a browser accepts are accepted here too: an apostrophe, a plus tag, a subdomain.
  for (const email of ["o'brien@company.com", 'ada+poesis@mail.example.org', 'first.last@sub.domain.co.uk']) {
    assert.equal((await post(payload({ ...valid, email }))).status, 200, email);
  }
  for (const email of ['ada@example', 'ada example@x.org', '<ada@example.org>', 'ada@exa"mple.org']) {
    assert.equal((await post(payload({ ...valid, email }))).status, 422, email);
  }
});

test('automated posts are refused and told so: a filled trap, an instant submission, a missing timer', async () => {
  const { post, delivered } = setup({ rateLimit: { windowMs: 1000, max: 100 } });
  for (const meta of [{ trap: 'http://spam.example' }, { elapsedMs: 300 }, { elapsedMs: Number.NaN }]) {
    const response = await post(payload(valid, meta));
    assert.equal(response.status, 422);
    const body = await response.json();
    assert.equal(body.ok, false);
    assert.equal(body.error, 'rejected');
    // Not "sent": a person who tripped the timer is told the request did not go through.
    assert.deepEqual(interpretResponse(422, body), { state: 'failed' });
  }
  const { elapsedMs, ...untimed } = payload();
  assert.equal((await post(untimed)).status, 422);
  assert.equal(delivered.length, 0);
});

test('only the site may post: other origins, methods and content types are turned away', async () => {
  const { post, handle, delivered } = setup({ rateLimit: { windowMs: 1000, max: 100 } });
  const foreign = await post(payload(), { origin: 'https://evil.example' });
  assert.equal(foreign.status, 403);
  assert.equal(foreign.headers.get('access-control-allow-origin'), null);
  assert.equal((await post(payload(), { origin: null })).status, 403);
  assert.equal((await post(payload(), { headers: { 'content-type': 'text/plain' } })).status, 415);
  assert.equal((await post(null, { raw: '{not json' })).status, 400);
  assert.equal((await post(null, { raw: JSON.stringify({ ...payload(), message: 'm'.repeat(MAX_BODY_BYTES) }) })).status, 413);
  const get = await handle(new Request('https://receiver.example/contact', { method: 'GET', headers: { origin: ORIGIN } }));
  assert.equal(get.status, 405);
  assert.equal(get.headers.get('allow'), 'POST, OPTIONS');
  // Preflight: allowed for the site, refused for anyone else.
  const preflight = await handle(new Request('https://receiver.example/contact', { method: 'OPTIONS', headers: { origin: ORIGIN } }));
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('access-control-allow-methods'), 'POST');
  assert.equal((await handle(new Request('https://receiver.example/contact', { method: 'OPTIONS', headers: { origin: 'https://evil.example' } }))).status, 403);
  assert.equal(delivered.length, 0);
});

test('one client cannot flood the receiver, and is let back in after the window', async () => {
  const { post, delivered, advance } = setup({ rateLimit: { windowMs: 60_000, max: 3 } });
  for (let attempt = 0; attempt < 3; attempt++) assert.equal((await post(payload())).status, 200);
  const blocked = await post(payload());
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get('retry-after'), '60');
  assert.deepEqual(interpretResponse(429, await blocked.json()), { state: 'throttled' });
  assert.equal(delivered.length, 3);
  advance(60_001);
  assert.equal((await post(payload())).status, 200);
  assert.equal(delivered.length, 4);
});

test('what a visitor types cannot forge a header or smuggle control characters', () => {
  const { values, errors } = validate({
    name: 'Ada\r\nBcc: evil@example.org',
    email: 'ada@example.org\r\nBcc: evil@example.org',
    company: 'Engines\u0000\u0007',
    goal: 'Line one\r\nLine two',
    message: 42,
    source: 'home',
  });
  assert.equal(values.name, 'Ada Bcc: evil@example.org');
  assert.doesNotMatch(values.name, /[\r\n]/);
  assert.equal(errors.email, 'invalid');
  assert.equal(values.company, 'Engines');
  assert.equal(values.goal, 'Line one\nLine two');
  assert.equal(values.message, '');
  const message = toMessage({ ...values, email: 'ada@example.org' }, '2026-11-21T00:00:00.000Z');
  assert.doesNotMatch(message.subject, /[\r\n]/);
  assert.doesNotMatch(message.replyTo, /[\r\n]/);
  // Unknown fields never reach the message.
  assert.deepEqual(Object.keys(validate({ ...valid, admin: true, __proto__: { polluted: true } }).values).sort(), Object.keys(LIMITS).sort());
});

test('the receiver refuses to start without an origin list, a transport or a trusted client key', () => {
  const key = () => 'client';
  assert.throws(() => createHandler({ allowedOrigins: [], deliver: async () => {}, clientKey: key }), /allowedOrigins/);
  assert.throws(() => createHandler({ allowedOrigins: [ORIGIN], clientKey: key }), /deliver/);
  // No default: guessing the client from a header it controls would defeat the rate limit.
  assert.throws(() => createHandler({ allowedOrigins: [ORIGIN], deliver: async () => {} }), /clientKey/);
});

test('each client has its own quota', async () => {
  let client = 'a';
  const { post } = setup({ clientKey: () => client, rateLimit: { windowMs: 60_000, max: 1 } });
  assert.equal((await post(payload())).status, 200);
  assert.equal((await post(payload())).status, 429);
  client = 'b';
  assert.equal((await post(payload())).status, 200);
});
