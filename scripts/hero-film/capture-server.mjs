// Serves the hero film page and writes the frames it posts back.
// Local tool for regenerating public/hero/*: it listens on 127.0.0.1 only.
//
//   node scripts/hero-film/capture-server.mjs            then open http://127.0.0.1:4599/?capture=1
//
// Frames land in scripts/hero-film/out/frames, stills in scripts/hero-film/out.
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const here = new URL('./', import.meta.url);
const out = new URL('out/', here);
const frames = new URL('frames/', out);
await mkdir(frames, { recursive: true });

const body = async (request) => {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks);
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  try {
    if (request.method === 'GET' && url.pathname === '/') {
      response.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
      return response.end(await readFile(new URL('film.html', here)));
    }
    if (request.method === 'GET' && url.pathname === '/poesis-logo.png') {
      response.writeHead(200, { 'content-type': 'image/png' });
      return response.end(await readFile(new URL('../../public/poesis-logo.png', here)));
    }
    if (request.method === 'POST' && url.pathname === '/frame') {
      const index = Number(url.searchParams.get('i'));
      if (!Number.isInteger(index) || index < 0 || index > 99999) throw new Error('invalid frame index');
      await writeFile(new URL(`frame_${String(index).padStart(5, '0')}.jpeg`, frames), await body(request));
      response.writeHead(204);
      return response.end();
    }
    if (request.method === 'POST' && url.pathname === '/still') {
      const name = url.searchParams.get('name') ?? '';
      if (!/^[a-z0-9-]+\.png$/.test(name)) throw new Error('invalid still name');
      await writeFile(new URL(name, out), await body(request));
      response.writeHead(204);
      return response.end();
    }
    response.writeHead(404);
    response.end();
  } catch (error) {
    response.writeHead(400, { 'content-type': 'text/plain' });
    response.end(String(error.message));
  }
});

const port = Number(process.env.PORT ?? 4599);
server.listen(port, '127.0.0.1', () => console.log(`hero film: http://127.0.0.1:${port}/  ->  ${fileURLToPath(out)}`));
