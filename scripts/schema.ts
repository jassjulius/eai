import { AUDIENCES, DOMAINS, TYPES, WORKS_WITH } from '../taxonomy.ts';
import type { ProjectConfig } from './lib.ts';

const nonEmptyString = { type: 'string', minLength: 1 };

export function buildSchema(config: ProjectConfig): Record<string, unknown> {
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'entry.schema.json',
    title: `${config.name} entry manifest`,
    description: 'One registry entry. Generated from taxonomy.ts by scripts/gen-schema.ts. Do not edit by hand.',
    type: 'object',
    additionalProperties: false,
    required: [
      'id', 'type', 'title', 'summary_et', 'summary_en', 'domains', 'audience',
      'works_with', 'language', 'license', 'maintainer', 'last_tested', 'verified',
    ],
    properties: {
      id: { type: 'string', pattern: '^[a-z0-9]+(-[a-z0-9]+)*$', description: 'Kebab case, must equal the folder name.' },
      type: { type: 'string', enum: [...TYPES] },
      title: nonEmptyString,
      summary_et: { type: 'string', minLength: 1, maxLength: 160 },
      summary_en: { type: 'string', minLength: 1, maxLength: 160 },
      domains: { type: 'array', minItems: 1, uniqueItems: true, items: { type: 'string', enum: [...DOMAINS] } },
      audience: { type: 'array', minItems: 1, uniqueItems: true, items: { type: 'string', enum: [...AUDIENCES] } },
      works_with: { type: 'array', minItems: 1, uniqueItems: true, items: { type: 'string', enum: [...WORKS_WITH] } },
      language: {
        type: 'array', minItems: 1, uniqueItems: true,
        items: {
          type: 'string',
          pattern: '^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$',
          description: 'ISO 639 language code, optionally with region (e.g. et, en, en-GB).',
        },
      },
      license: nonEmptyString,
      maintainer: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'contact'],
        properties: { name: nonEmptyString, contact: nonEmptyString },
      },
      last_tested: { type: 'string', format: 'date', description: 'ISO date (YYYY-MM-DD) when a maintainer last ran this entry.' },
      verified: { type: 'boolean', description: 'True only if a maintainer actually ran it.' },
      install: { ...nonEmptyString, description: 'URL or command to install or connect.' },
      source: { type: 'string', format: 'uri', description: 'Source repository URL.' },
      example_prompt_et: nonEmptyString,
      security_note: nonEmptyString,
      description_et: { ...nonEmptyString, description: 'Longer Markdown description in Estonian.' },
    },
  };
}

export function serializeSchema(schema: Record<string, unknown>): string {
  return JSON.stringify(schema, null, 2) + '\n';
}
