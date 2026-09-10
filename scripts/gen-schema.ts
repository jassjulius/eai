import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { readConfig, SCHEMA_PATH } from './lib.ts';
import { buildSchema, serializeSchema } from './schema.ts';

mkdirSync(dirname(SCHEMA_PATH), { recursive: true });
writeFileSync(SCHEMA_PATH, serializeSchema(buildSchema(readConfig())));
console.log(`wrote ${SCHEMA_PATH}`);
