import { test } from 'node:test';
import assert from 'node:assert/strict';
import { entryUrl, getEntry, searchEntries, type Entry, type IndexFile } from './data.ts';

const base = {
  summary_et: 's', summary_en: 's', audience: ['praktik'], language: ['et'], license: 'MIT',
  maintainer: { name: 'n', contact: 'c' }, last_tested: '2026-09-10', verified: true,
};
const entries: Entry[] = [
  { ...base, id: 'telks-mcp', type: 'mcp', title: 'telks.ee telekava MCP', domains: ['meedia'], works_with: ['any-mcp-client'] },
  { ...base, id: 'pressiteade', type: 'skill', title: 'Pressiteate kirjutamine', domains: ['meedia'], works_with: ['claude'], skill_md: 'kirjuta pressiteade' },
  { ...base, id: 'retsept', type: 'retsept', title: 'Retsept', domains: ['muu'], works_with: ['claude'] },
];

test('free text matches title and skill_md, all words required', () => {
  assert.deepEqual(searchEntries(entries, { query: 'telekava' }).map((h) => h.id), ['telks-mcp']);
  assert.deepEqual(searchEntries(entries, { query: 'kirjuta pressiteade' }).map((h) => h.id), ['pressiteade']);
  assert.deepEqual(searchEntries(entries, { query: 'telekava pressiteade' }), []);
});

test('filters narrow results and combine with AND', () => {
  assert.deepEqual(searchEntries(entries, { domain: 'meedia' }).map((h) => h.id), ['telks-mcp', 'pressiteade']);
  assert.deepEqual(searchEntries(entries, { domain: 'meedia', works_with: 'claude' }).map((h) => h.id), ['pressiteade']);
  assert.deepEqual(searchEntries(entries, { type: 'retsept' }).map((h) => h.id), ['retsept']);
});

test('hits are compact and limited', () => {
  const hits = searchEntries(entries, {}, 2);
  assert.equal(hits.length, 2);
  assert.ok(!('skill_md' in hits[0]));
});

test('getEntry by id', () => {
  assert.equal(getEntry(entries, 'retsept')?.title, 'Retsept');
  assert.equal(getEntry(entries, 'nope'), undefined);
});

test('entryUrl joins site url and base', () => {
  const index = { site: { url: 'https://o.github.io', base: '/eai' } } as IndexFile;
  assert.equal(entryUrl(index, 'x'), 'https://o.github.io/eai/e/x/');
  assert.equal(entryUrl({ site: { url: 'https://e.ee', base: '/' } } as IndexFile, 'x'), 'https://e.ee/e/x/');
});
