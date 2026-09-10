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

export interface Taxonomy {
  types: string[];
  domains: string[];
  audiences: string[];
  works_with: string[];
  labels_et: Record<string, Record<string, string>>;
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

export interface SearchFilters {
  query?: string;
  type?: string;
  domain?: string;
  works_with?: string;
}

export type SearchHit = Pick<
  Entry,
  'id' | 'type' | 'title' | 'summary_et' | 'summary_en' | 'domains' | 'works_with' | 'verified' | 'last_tested' | 'install'
>;

export function loadIndex(path: string): IndexFile {
  return JSON.parse(readFileSync(path, 'utf8')) as IndexFile;
}

function haystack(e: Entry): string {
  return [e.id, e.title, e.summary_et, e.summary_en, e.description_et ?? '', e.skill_md ?? '', e.domains.join(' ')]
    .join('\n')
    .toLowerCase();
}

function toHit(e: Entry): SearchHit {
  const { id, type, title, summary_et, summary_en, domains, works_with, verified, last_tested, install } = e;
  return { id, type, title, summary_et, summary_en, domains, works_with, verified, last_tested, ...(install ? { install } : {}) };
}

/** Every query word must appear somewhere in the entry; filters combine with AND. */
export function searchEntries(entries: Entry[], f: SearchFilters, limit = 20): SearchHit[] {
  const tokens = (f.query ?? '').toLowerCase().split(/\s+/).filter(Boolean);
  return entries
    .filter(
      (e) =>
        (!f.type || e.type === f.type) &&
        (!f.domain || e.domains.includes(f.domain)) &&
        (!f.works_with || e.works_with.includes(f.works_with)) &&
        tokens.every((t) => haystack(e).includes(t)),
    )
    .slice(0, limit)
    .map(toHit);
}

export function getEntry(entries: Entry[], id: string): Entry | undefined {
  return entries.find((e) => e.id === id);
}

export function entryUrl(index: IndexFile, id: string): string {
  const base = index.site.base.replace(/\/+$/, '');
  return `${index.site.url.replace(/\/+$/, '')}${base}/e/${id}/`;
}
