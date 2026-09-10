import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const ENTRIES_DIR = join(ROOT, 'entries');
export const SCHEMA_PATH = join(ROOT, 'schema', 'entry.schema.json');
export const INDEX_PATH = join(ROOT, 'site', 'public', 'index.json');
export const CONFIG_PATH = join(ROOT, 'eai.config.json');

export interface ProjectConfig {
  name: string;
  description_et: string;
  repo: { owner: string; name: string; branch: string };
  site: { url: string; base: string };
  stale_after_days: number;
}

export interface Manifest {
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
}

export interface LoadedEntry {
  id: string; // folder name
  dir: string;
  manifestPath: string;
  manifest: unknown; // parsed YAML, validated later
  parseError?: string;
  skillMd?: string;
}

export function readConfig(): ProjectConfig {
  return JSON.parse(readFileSync(CONFIG_PATH, 'utf8')) as ProjectConfig;
}

export function listEntryIds(entriesDir = ENTRIES_DIR): string[] {
  if (!existsSync(entriesDir)) return [];
  return readdirSync(entriesDir)
    .filter((name) => statSync(join(entriesDir, name)).isDirectory())
    .sort();
}

export function loadEntry(id: string, entriesDir = ENTRIES_DIR): LoadedEntry {
  const dir = join(entriesDir, id);
  const manifestPath = join(dir, 'manifest.yaml');
  const entry: LoadedEntry = { id, dir, manifestPath, manifest: undefined };
  if (!existsSync(manifestPath)) {
    entry.parseError = 'manifest.yaml is missing';
    return entry;
  }
  try {
    entry.manifest = parse(readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    entry.parseError = `YAML parse error: ${(err as Error).message}`;
  }
  const skillPath = join(dir, 'SKILL.md');
  if (existsSync(skillPath)) entry.skillMd = readFileSync(skillPath, 'utf8');
  return entry;
}

export function loadAllEntries(entriesDir = ENTRIES_DIR): LoadedEntry[] {
  return listEntryIds(entriesDir).map((id) => loadEntry(id, entriesDir));
}
