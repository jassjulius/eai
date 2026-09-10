import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { LoadedEntry, ProjectConfig } from './lib.ts';
import { buildSchema, serializeSchema } from './schema.ts';

export interface ValidationError {
  id: string;
  path: string;
  message: string;
}

export function checkSchemaDrift(config: ProjectConfig, currentFileText: string): string | null {
  const expected = serializeSchema(buildSchema(config));
  if (expected === currentFileText) return null;
  return 'schema/entry.schema.json is out of date with taxonomy.ts. Run: npm run gen-schema';
}

export function validateEntries(entries: LoadedEntry[], schema: object): ValidationError[] {
  const ajv = new Ajv({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const errors: ValidationError[] = [];

  for (const entry of entries) {
    if (entry.parseError) {
      errors.push({ id: entry.id, path: '', message: entry.parseError });
      continue;
    }
    if (!validate(entry.manifest)) {
      for (const err of validate.errors ?? []) {
        const extra = err.keyword === 'additionalProperties'
          ? ` (${String((err.params as { additionalProperty?: string }).additionalProperty)})`
          : '';
        errors.push({ id: entry.id, path: err.instancePath, message: `${err.message ?? 'invalid'}${extra}` });
      }
    }
    const manifestId = (entry.manifest as { id?: unknown } | undefined)?.id;
    if (typeof manifestId === 'string' && manifestId !== entry.id) {
      errors.push({ id: entry.id, path: '/id', message: `id "${manifestId}" must equal the folder name "${entry.id}"` });
    }
  }
  return errors;
}
