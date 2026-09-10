# EAI registry prototype: design

Date: 2026-09-10. Status: approved in chat, implementation starting.

## Purpose

A curated, machine readable registry of Estonia specific AI knowledge:
skills, MCP servers, prompts, public datasets/APIs and short workflow
recipes. Registry, not wiki. No accounts, comments, CMS or backend.
Everything lives in Git. Built by one person as a prototype, designed
for handover to a public programme: boring tech, clean licensing,
nothing tied to personal infrastructure, English in code and manifests,
Estonian in content and UI.

Working title EAI. The name lives only in `eai.config.json`.

## Constraints

- Node LTS (22), TypeScript, npm workspaces. Minimal dependencies.
- Static site with Astro, client side search with Pagefind.
- Code MIT, content in `/entries` CC BY 4.0.
- No features beyond the brief.

## Repo layout

```
eai.config.json          project name, repo owner/name, site URL, base path
taxonomy.ts              single source for fixed lists (type, domain, audience, works_with)
entries/<id>/manifest.yaml  plus optional SKILL.md
schema/entry.schema.json generated from taxonomy.ts, committed, checked for drift
scripts/gen-schema.ts    taxonomy -> schema
scripts/validate.ts      Ajv validation of every manifest, id/folder match, exit 1 on any error
scripts/build-index.ts   all manifests -> site/public/index.json (includes SKILL.md text)
scripts/healthcheck.ts   HTTP ping every install URL, report failures, change nothing
site/                    Astro project (static, no adapter)
mcp/                     MCP server (stdio + streamable HTTP), Dockerfile
.github/                 workflows, issue forms, PR template
README.md CONTRIBUTING.md GOVERNANCE.md LICENSE LICENSE-CONTENT
```

## Data model

Manifest (YAML). Required: id (kebab case, equals folder name), type
(skill|mcp|prompt|dataset|retsept), title, summary_et (<=160),
summary_en (<=160), domains[] (oigus, raamatupidamine, avalik-sektor,
meedia, haridus, ettevotlus, pollumajandus, keel, andmed, muu),
audience[] (algaja|praktik|arendaja), works_with[]
(claude|chatgpt|copilot|cursor|any-mcp-client|local), language[] (ISO
codes), license, maintainer {name, contact}, last_tested (ISO date),
verified (boolean). Optional: install, source, example_prompt_et,
security_note, description_et.

`additionalProperties: false` so typos fail validation.

Index (`site/public/index.json`): `{ generated_at, entries: [manifest +
{ skill_md?: string }] }`. Consumed by the Astro site at build time and
by the MCP server at runtime.

## Components

**Scripts** run with `tsx`. Shared `scripts/lib.ts` loads and parses
manifests. Validate fails the build on any schema error, id mismatch,
or schema drift from taxonomy.

**Site.** Pages: `/` (search box, facets for type/domain/audience/
works_with, compact result list), `/e/<id>/` (entry page), `/panusta/`
(contribute), `/meist/` (about). Estonian UI strings in
`site/src/ui.ts`. Facet labels come from `taxonomy.ts`. Home page
filtering: Pagefind for free text, plus vanilla JS facet filtering over
`index.json`. Stale badge "Aegunud" when last_tested is older than 90
days at build time. Entry page links: source, edit on GitHub, "Teata
probleemist" prefilled issue. Copy buttons are a few lines of vanilla
JS. Plain CSS, system font stack, no component library.

**MCP server.** `@modelcontextprotocol/sdk`. Reads index.json (path via
env `EAI_INDEX_PATH`, default `../site/public/index.json`). Tools:
`search_entries(query?, type?, domain?, works_with?)` and
`get_entry(id)`. Stdio by default, `--http` starts a stateless
Streamable HTTP server on `PORT` (default 3000). Dockerfile copies
built index and server.

**GitHub.** validate.yml (PR + push: validate, build site), healthcheck
.yml (weekly cron: run healthcheck, create or update one issue with a
fixed label), deploy.yml (push to main: build, deploy to Pages). Issue
forms "Paku uut sissekannet" and "Teata probleemist" in Estonian. PR
template checklist.

## Error handling

Scripts print every problem with file path, then exit non zero.
Healthcheck treats network errors and status >= 400 as failures, times
out per URL, never modifies files. MCP tools return a clear error text
for unknown ids.

## Testing

Validate itself is the test of the data. Scripts get small unit tests
with `node:test` via tsx for the pure parts (filter logic, stale
calculation, schema generation). Site and MCP builds must succeed in
CI. MCP smoke test over stdio in the final verification.

## Judgment calls

- Astro static mode, base path from config so it works under
  `<owner>.github.io/<repo>`.
- Manifests YAML, index JSON.
- No tests beyond validation and small unit tests; brief asks for none.
- Old gh CLI (2.4) cannot enable Pages; documented as a manual step.
