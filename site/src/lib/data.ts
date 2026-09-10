import { readFileSync } from 'node:fs';

export interface Entry {
  id: string;
  type: string;
  title: string;
  summary_et: string;
  summary_en: string;
  domains: string[];
  audience: string[];
  works_with: string[];
  language: string[];
  license: string;
  maintainer: { name: string; contact: string };
  last_tested: string;
  verified: boolean;
  install?: string;
  source?: string;
  example_prompt_et?: string;
  security_note?: string;
  description_et?: string;
  skill_md?: string;
}

export type Facet = 'type' | 'domain' | 'audience' | 'works_with';

export interface Taxonomy {
  types: string[];
  domains: string[];
  audiences: string[];
  works_with: string[];
  labels_et: Record<Facet, Record<string, string>>;
}

export interface IndexFile {
  name: string;
  description_et: string;
  generated_at: string;
  repo: { owner: string; name: string; branch: string };
  site: { url: string; base: string };
  stale_after_days: number;
  taxonomy: Taxonomy;
  entries: Entry[];
}

let cached: IndexFile | undefined;

/** The compiled index (site/public/index.json), produced by `npm run build:index`. */
export function readIndex(): IndexFile {
  if (!cached) cached = JSON.parse(readFileSync(__INDEX_PATH__, 'utf8')) as IndexFile;
  return cached;
}

export function label(tax: Taxonomy, facet: Facet, value: string): string {
  return tax.labels_et[facet]?.[value] ?? value;
}
