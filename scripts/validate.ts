import { existsSync, readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { loadAllEntries, readConfig, ROOT, SCHEMA_PATH } from './lib.ts';
import { checkSchemaDrift, validateEntries } from './validation.ts';

const config = readConfig();
const problems: string[] = [];

if (!existsSync(SCHEMA_PATH)) {
  problems.push('schema/entry.schema.json is missing. Run: npm run gen-schema');
} else {
  const drift = checkSchemaDrift(config, readFileSync(SCHEMA_PATH, 'utf8'));
  if (drift) problems.push(drift);
}

const entries = loadAllEntries();
if (problems.length === 0) {
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf8'));
  for (const err of validateEntries(entries, schema)) {
    const file = relative(ROOT, entries.find((e) => e.id === err.id)!.manifestPath);
    problems.push(`${file}: ${err.path || '/'} ${err.message}`);
  }
}

if (problems.length > 0) {
  console.error(`Validation failed with ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`OK: ${entries.length} entries valid`);
