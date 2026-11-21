// Runs the reference receiver on this machine, to test the contact form end to end
// without any account or network: a "delivered" request is a JSON file in an outbox folder.
//
//   node contact-endpoint/dev-server.mjs
//   PUBLIC_CONTACT_ENDPOINT=http://127.0.0.1:4601/contact PUBLIC_CONTACT_PROCESSOR="local test receiver" npm run build
//
// Environment:
//   PORT              default 4601
//   ALLOWED_ORIGINS   comma-separated, default http://127.0.0.1:4321,http://localhost:4321
//   CONTACT_OUTBOX    folder for delivered requests, default contact-endpoint/outbox (ignored by Git)
//   CONTACT_DELIVERY  set to `fail` to make every delivery fail, to see the form's failure state
//   MIN_ELAPSED_MS    default 2500
//
// It listens on 127.0.0.1 only. It is a test double, not something to deploy.
import { createServer } from 'node:http';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHandler } from './handler.mjs';

const port = Number(process.env.PORT ?? 4601);
const outbox = new URL(process.env.CONTACT_OUTBOX ? `file://${process.env.CONTACT_OUTBOX.replace(/\/?$/, '/')}` : './outbox/', import.meta.url);
await mkdir(outbox, { recursive: true });
let count = 0;

const handle = createHandler({
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://127.0.0.1:4321,http://localhost:4321').split(',').map((origin) => origin.trim()).filter(Boolean),
  minElapsedMs: Number(process.env.MIN_ELAPSED_MS ?? 2500),
  clientKey: () => 'local',
  rateLimit: { windowMs: 60_000, max: Number(process.env.RATE_MAX ?? 5) },
  deliver: async (message) => {
    if (process.env.CONTACT_DELIVERY === 'fail') throw new Error('delivery disabled for this test');
    count += 1;
    await writeFile(new URL(`request-${String(count).padStart(3, '0')}.json`, outbox), `${JSON.stringify(message, null, 2)}\n`);
  },
});

createServer(async (incoming, outgoing) => {
  const chunks = [];
  for await (const chunk of incoming) chunks.push(chunk);
  const request = new Request(`http://127.0.0.1:${port}${incoming.url}`, {
    method: incoming.method,
    headers: Object.fromEntries(Object.entries(incoming.headers).filter(([, value]) => typeof value === 'string')),
    body: ['GET', 'HEAD', 'OPTIONS'].includes(incoming.method ?? '') ? undefined : Buffer.concat(chunks),
  });
  const response = await handle(request);
  outgoing.writeHead(response.status, Object.fromEntries(response.headers));
  outgoing.end(Buffer.from(await response.arrayBuffer()));
}).listen(port, '127.0.0.1', () => console.log(`contact receiver (test double): http://127.0.0.1:${port}/contact  ->  ${outbox.pathname}`));
