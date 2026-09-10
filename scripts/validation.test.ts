import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSchema, serializeSchema } from './schema.ts';
import { checkSchemaDrift, validateEntries } from './validation.ts';
import type { LoadedEntry, ProjectConfig } from './lib.ts';

const config: ProjectConfig = {
  name: 'X', description_et: '', repo: { owner: 'o', name: 'r', branch: 'main' },
  site: { url: 'https://o.github.io', base: '/r' }, stale_after_days: 90,
};
const schema = buildSchema(config);

function entry(id: string, manifest: unknown, extra: Partial<LoadedEntry> = {}): LoadedEntry {
  return { id, dir: `entries/${id}`, manifestPath: `entries/${id}/manifest.yaml`, manifest, ...extra };
}

const valid = {
  id: 'demo', type: 'mcp', title: 'Demo', summary_et: 'Lühike', summary_en: 'Short',
  domains: ['meedia'], audience: ['praktik'], works_with: ['any-mcp-client'], language: ['et'],
  license: 'MIT', maintainer: { name: 'N', contact: 'TODO' }, last_tested: '2026-09-10', verified: true,
};

test('valid manifest passes', () => {
  assert.deepEqual(validateEntries([entry('demo', valid)], schema), []);
});

test('id must match folder name', () => {
  const errors = validateEntries([entry('other', valid)], schema);
  assert.equal(errors.length, 1);
  assert.match(errors[0].message, /folder/);
});

test('schema violations are reported with path', () => {
  const bad = { ...valid, summary_et: 'x'.repeat(161), bogus: 1 };
  const errors = validateEntries([entry('demo', bad)], schema);
  assert.ok(errors.some((e) => e.path === '/summary_et'));
  assert.ok(errors.some((e) => /bogus/.test(e.message)));
});

test('parse errors and missing manifests are reported', () => {
  const errors = validateEntries([entry('demo', undefined, { parseError: 'manifest.yaml is missing' })], schema);
  assert.deepEqual(errors, [{ id: 'demo', path: '', message: 'manifest.yaml is missing' }]);
});

test('checkSchemaDrift detects stale schema file', () => {
  assert.equal(checkSchemaDrift(config, serializeSchema(schema)), null);
  assert.match(checkSchemaDrift(config, '{}') ?? '', /gen-schema/);
});
