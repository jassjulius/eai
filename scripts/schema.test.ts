import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSchema, serializeSchema } from './schema.ts';
import { DOMAINS, TYPES } from '../taxonomy.ts';
import type { ProjectConfig } from './lib.ts';

const config: ProjectConfig = {
  name: 'X', description_et: '', repo: { owner: 'o', name: 'r', branch: 'main' },
  site: { url: 'https://o.github.io', base: '/r' }, stale_after_days: 90,
};

test('schema enums come from taxonomy', () => {
  const schema = buildSchema(config) as any;
  assert.deepEqual(schema.properties.type.enum, [...TYPES]);
  assert.deepEqual(schema.properties.domains.items.enum, [...DOMAINS]);
});

test('schema requires the documented fields and forbids unknown ones', () => {
  const schema = buildSchema(config) as any;
  assert.deepEqual(schema.required, [
    'id', 'type', 'title', 'summary_et', 'summary_en', 'domains', 'audience',
    'works_with', 'language', 'license', 'maintainer', 'last_tested', 'verified',
  ]);
  assert.equal(schema.additionalProperties, false);
  assert.equal(schema.properties.summary_et.maxLength, 160);
});

test('serializeSchema is stable JSON with trailing newline', () => {
  const s = serializeSchema(buildSchema(config));
  assert.ok(s.endsWith('}\n'));
  assert.equal(s, serializeSchema(JSON.parse(s)));
});
