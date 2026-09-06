import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.env.SITE_ROOT || '.');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.pdf': 'application/pdf', '.mp3': 'audio/mpeg' };
const server = http.createServer(async (request, response) => {
    try {
        const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
        const segments = pathname.split('/');
        if (segments.some(segment => segment.startsWith('.') || ['node_modules', 'scratch', 'docs'].includes(segment))) {
            response.writeHead(403).end();
            return;
        }
        const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
        if (!file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
        const content = await readFile(file);
        response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }).end(content);
    } catch { response.writeHead(404).end('Arquivo não encontrado'); }
});
server.listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log(`K-Matrizes: http://127.0.0.1:${server.address().port}`));
