/**
 * Reference receiver of the poesis.cloud contact form.
 *
 * The site is static, so something else has to receive a request and hand it to
 * Poesis. This module is that something, written against web-standard `Request`
 * and `Response` so it runs unchanged on any serverless platform or Node server.
 * It holds no secret and names no provider: how a request is delivered (a mail
 * API, a mailbox, a ticket) is the `deliver` function its host passes in.
 *
 * Contract, also honoured by the page (src/scripts/contact-brief.ts):
 *   POST, `Content-Type: application/json`, from an allowed origin
 *   body   { name, email, company, goal, message, source, elapsedMs, _gotcha }
 *   200    { "ok": true }                     the request was delivered
 *   422    { "ok": false, "errors": {...} }   a field was refused, or the post looked automated
 *   429    { "ok": false }                    too many requests from one client
 *   other  { "ok": false }                    nothing was delivered
 * The page tells a visitor "sent" on 200 with `ok: true`, and on nothing else.
 */

/** Bounds of each field, identical to those of the form. */
export const LIMITS = { name: 120, email: 254, company: 160, goal: 2000, message: 2000, source: 60 };
export const MAX_BODY_BYTES = 16 * 1024;

const REQUIRED = ['name', 'email', 'goal'];
const SINGLE_LINE = ['name', 'email', 'company', 'source'];
const EMAIL = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

const text = (value) => (typeof value === 'string' ? value : '');
/** No control character survives; a single-line field cannot carry a line break into a mail header. */
const clean = (value, singleLine) => {
  const stripped = text(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  return (singleLine ? stripped.replace(/[\r\n\t]+/g, ' ') : stripped.replace(/\r\n?/g, '\n')).trim();
};

/** Normalises a posted body and lists what is wrong with it, field by field. */
export function validate(input) {
  const body = typeof input === 'object' && input !== null ? input : {};
  const values = {};
  const errors = {};
  for (const key of Object.keys(LIMITS)) {
    values[key] = clean(body[key], SINGLE_LINE.includes(key));
    if (values[key].length > LIMITS[key]) errors[key] = 'too-long';
  }
  for (const key of REQUIRED) if (!values[key]) errors[key] = 'required';
  if (values.email && !errors.email && !EMAIL.test(values.email)) errors.email = 'invalid';
  return { values, errors };
}

/** The request as the plain text of a message, for whichever transport delivers it. */
export function toMessage(values, receivedAt) {
  const lines = [
    `Full name: ${values.name}`,
    `Work email: ${values.email}`,
    ...(values.company ? [`Company / Organization: ${values.company}`] : []),
    '',
    'What they would like to transform:',
    values.goal,
    ...(values.message ? ['', 'Additional context:', values.message] : []),
    '',
    `Sent from poesis.cloud (${values.source || 'contact'}) on ${receivedAt}`,
  ];
  return { subject: `Transformation request: ${values.company || values.name}`, replyTo: values.email, text: lines.join('\n'), receivedAt, ...values };
}

/**
 * @param {object} options
 * @param {string[]} options.allowedOrigins          origins of the site, e.g. ['https://poesis.cloud']
 * @param {(message: object) => Promise<void>} options.deliver   hands the request to Poesis; throws if it could not
 * @param {() => number} [options.now]
 * @param {{ windowMs: number, max: number }} [options.rateLimit]   per client; best effort on a stateless host
 * @param {number} [options.minElapsedMs]            a form filled faster than this was not filled by a person
 * @param {(request: Request) => string} [options.clientKey]
 * @returns {(request: Request) => Promise<Response>}
 */
export function createHandler({
  allowedOrigins,
  deliver,
  now = Date.now,
  rateLimit = { windowMs: 10 * 60 * 1000, max: 5 },
  minElapsedMs = 2500,
  clientKey = (request) => (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown',
}) {
  if (!Array.isArray(allowedOrigins) || !allowedOrigins.length) throw new Error('allowedOrigins is required');
  if (typeof deliver !== 'function') throw new Error('deliver is required');
  const seen = new Map();

  const throttled = (key) => {
    const time = now();
    const recent = (seen.get(key) ?? []).filter((stamp) => time - stamp < rateLimit.windowMs);
    if (recent.length >= rateLimit.max) { seen.set(key, recent); return true; }
    seen.set(key, [...recent, time]);
    // Forget clients that went quiet, so the map cannot grow without bound.
    if (seen.size > 5000) for (const [client, stamps] of seen) if (!stamps.some((stamp) => time - stamp < rateLimit.windowMs)) seen.delete(client);
    return false;
  };

  return async function handle(request) {
    const origin = request.headers.get('origin') ?? '';
    const allowed = allowedOrigins.includes(origin);
    const cors = allowed ? { 'access-control-allow-origin': origin, vary: 'Origin' } : { vary: 'Origin' };
    const reply = (status, body, extra = {}) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...cors, ...extra } });

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: allowed ? 204 : 403, headers: { ...cors, 'access-control-allow-methods': 'POST', 'access-control-allow-headers': 'content-type, accept', 'access-control-max-age': '600' } });
    }
    if (request.method !== 'POST') return reply(405, { ok: false, error: 'method' }, { allow: 'POST, OPTIONS' });
    if (!allowed) return reply(403, { ok: false, error: 'origin' });
    if (!(request.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) return reply(415, { ok: false, error: 'content-type' });
    if (throttled(clientKey(request))) return reply(429, { ok: false, error: 'rate' }, { 'retry-after': String(Math.ceil(rateLimit.windowMs / 1000)) });

    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return reply(413, { ok: false, error: 'size' });
    let body;
    try { body = JSON.parse(raw); } catch { return reply(400, { ok: false, error: 'json' }); }

    // A filled hidden field or an instant submission is refused, and said to be refused:
    // answering "ok" to a robot would also tell a real visitor "sent" for a request that went nowhere.
    const automated = text(body?._gotcha).trim() !== '' || !(Number(body?.elapsedMs) >= minElapsedMs);
    if (automated) return reply(422, { ok: false, error: 'rejected', errors: {} });

    const { values, errors } = validate(body);
    if (Object.keys(errors).length) return reply(422, { ok: false, error: 'invalid', errors });

    try {
      await deliver(toMessage(values, new Date(now()).toISOString()));
    } catch {
      return reply(502, { ok: false, error: 'delivery' });
    }
    return reply(200, { ok: true });
  };
}
