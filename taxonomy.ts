// Single source of truth for the fixed lists used by manifests, the JSON schema,
// the site facets and the MCP server filters. Labels are Estonian UI text.

export const TYPES = ['skill', 'mcp', 'prompt', 'dataset', 'retsept'] as const;
export const DOMAINS = [
  'oigus', 'raamatupidamine', 'avalik-sektor', 'meedia', 'haridus',
  'ettevotlus', 'pollumajandus', 'keel', 'andmed', 'muu',
] as const;
export const AUDIENCES = ['algaja', 'praktik', 'arendaja'] as const;
export const WORKS_WITH = ['claude', 'chatgpt', 'copilot', 'cursor', 'any-mcp-client', 'local'] as const;

export type EntryType = (typeof TYPES)[number];
export type Domain = (typeof DOMAINS)[number];
export type Audience = (typeof AUDIENCES)[number];
export type WorksWith = (typeof WORKS_WITH)[number];

export const LABELS_ET = {
  type: {
    skill: 'Oskus', mcp: 'MCP server', prompt: 'Prompt', dataset: 'Andmestik', retsept: 'Retsept',
  } satisfies Record<EntryType, string>,
  domain: {
    oigus: 'Õigus', raamatupidamine: 'Raamatupidamine', 'avalik-sektor': 'Avalik sektor',
    meedia: 'Meedia', haridus: 'Haridus', ettevotlus: 'Ettevõtlus', pollumajandus: 'Põllumajandus',
    keel: 'Keel', andmed: 'Andmed', muu: 'Muu',
  } satisfies Record<Domain, string>,
  audience: {
    algaja: 'Algaja', praktik: 'Praktik', arendaja: 'Arendaja',
  } satisfies Record<Audience, string>,
  works_with: {
    claude: 'Claude', chatgpt: 'ChatGPT', copilot: 'Copilot', cursor: 'Cursor',
    'any-mcp-client': 'Iga MCP klient', local: 'Kohalik',
  } satisfies Record<WorksWith, string>,
};

export function taxonomyForIndex() {
  return {
    types: [...TYPES],
    domains: [...DOMAINS],
    audiences: [...AUDIENCES],
    works_with: [...WORKS_WITH],
    labels_et: LABELS_ET,
  };
}
