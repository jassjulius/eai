import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import { taxonomyForIndex } from '../taxonomy.ts';
import { INDEX_PATH, loadAllEntries, readConfig, ROOT, SCHEMA_PATH, type Manifest } from './lib.ts';
import { validateEntries } from './validation.ts';

const config = readConfig();
const entries = loadAllEntries();
const schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf8'));
const errors = validateEntries(entries, schema);
if (errors.length > 0) {
  console.error('Refusing to build index: manifests are invalid. Run: npm run validate');
  process.exit(1);
}

const index = {
  name: config.name,
  description_et: config.description_et,
  generated_at: new Date().toISOString(),
  repo: config.repo,
  site: config.site,
  stale_after_days: config.stale_after_days,
  taxonomy: taxonomyForIndex(),
  entries: entries
    .map((e) => ({ ...(e.manifest as Manifest), ...(e.skillMd ? { skill_md: e.skillMd } : {}) }))
    .sort((a, b) => a.id.localeCompare(b.id)),
};

mkdirSync(dirname(INDEX_PATH), { recursive: true });
writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + '\n');
console.log(`wrote ${relative(ROOT, INDEX_PATH)} (${index.entries.length} entries)`);
