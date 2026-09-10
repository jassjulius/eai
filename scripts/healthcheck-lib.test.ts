import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkUrl, classifyStatus, isHttpUrl, renderReport } from './healthcheck-lib.ts';

test('isHttpUrl accepts http(s) only', () => {
  assert.equal(isHttpUrl('https://telks.ee/mcp'), true);
  assert.equal(isHttpUrl('npx something'), false);
  assert.equal(isHttpUrl('TODO'), false);
});

test('classifyStatus: 404, 410 and 5xx fail, other 4xx pass', () => {
  assert.equal(classifyStatus(200), true);
  assert.equal(classifyStatus(405), true);
  assert.equal(classifyStatus(404), false);
  assert.equal(classifyStatus(410), false);
  assert.equal(classifyStatus(503), false);
});

test('checkUrl falls back to GET when HEAD is not allowed', async () => {
  const calls: string[] = [];
  const fakeFetch = (async (_url: string, init?: RequestInit) => {
    calls.push(String(init?.method));
    return new Response(null, { status: init?.method === 'HEAD' ? 405 : 200 });
  }) as unknown as typeof fetch;
  const result = await checkUrl('https://x.test/', fakeFetch);
  assert.deepEqual(calls, ['HEAD', 'GET']);
  assert.deepEqual(result, { ok: true, status: 200 });
});

test('checkUrl reports network errors', async () => {
  const fakeFetch = (async () => { throw new Error('ECONNREFUSED'); }) as unknown as typeof fetch;
  const result = await checkUrl('https://x.test/', fakeFetch);
  assert.equal(result.ok, false);
  assert.match(result.error ?? '', /ECONNREFUSED/);
});

test('renderReport lists failures in a table', () => {
  const md = renderReport([
    { id: 'a', url: 'https://a.test/', ok: true, status: 200 },
    { id: 'b', url: 'https://b.test/', ok: false, status: 404 },
  ], new Date('2026-09-10T06:00:00Z'));
  assert.match(md, /\| b \|/);
  assert.doesNotMatch(md, /\| a \|/);
  assert.match(md, /1 of 2/);
});
