# EAI

A curated, machine readable registry of Estonia specific AI knowledge: skills, MCP servers, prompts, public datasets and APIs, and short workflow recipes. It is a registry, not a wiki. There are no accounts, comments or CMS. Everything lives in this Git repository: each entry is a YAML manifest, validated against a JSON schema, compiled into a single `index.json` that drives both the static site and the MCP server.

This is a prototype built for handover to a public programme. See [GOVERNANCE.md](GOVERNANCE.md). Contributions: [CONTRIBUTING.md](CONTRIBUTING.md) (Estonian, with an English summary).

## Run locally

Prerequisites: Node 22 (see `.nvmrc`) and npm.

| Command | What it does |
|---|---|
| `npm ci` | Install all workspaces (root scripts, `site`, `mcp`) |
| `npm run validate` | Validate every `entries/*/manifest.yaml` against `schema/entry.schema.json`, fail on any error |
| `npm test` | Unit tests for scripts, site helpers and the MCP search logic |
| `npm run dev` | Build the index and start the Astro dev server at `http://localhost:4321/eai/` (free text search falls back to substring matching in dev; Pagefind runs only in the build) |
| `npm run build:site` | Build the index, the static site and the Pagefind search index into `site/dist` |
| `npm run preview` | Serve `site/dist` locally |
| `npm run build:mcp` | Compile the MCP server into `mcp/dist` |
| `npm run healthcheck` | HTTP ping every `install` URL, print a Markdown report to stdout, exit 1 on failures. Changes nothing. |
| `npm run gen-schema` | Regenerate the JSON schema from `taxonomy.ts` (run after changing the fixed lists) |
| `npm run build` | validate + build site + build MCP |

### MCP server

After `npm run build:site` (or at least `npm run build:index`) and `npm run build:mcp`:

```bash
node mcp/dist/server.js          # stdio transport
node mcp/dist/server.js --http   # stateless Streamable HTTP at http://0.0.0.0:3000/mcp
```

Environment: `PORT` (3000), `HOST` (0.0.0.0), `EAI_INDEX_PATH` (default `site/public/index.json`), `EAI_ALLOWED_HOSTS` (comma separated hostnames; when set, requests with other `Host` headers get 403).

Tools: `search_entries` (free text plus optional `type`, `domain`, `works_with`, `limit`) and `get_entry` (by `id`, returns the full manifest and attached `SKILL.md`).

Claude Desktop or Claude Code (stdio):

```json
{ "mcpServers": { "eai": { "command": "node", "args": ["/absolute/path/to/EAI/mcp/dist/server.js"] } } }
```

Container (build context is the repository root so the index is compiled from `entries/`):

```bash
docker build -f mcp/Dockerfile -t eai-mcp .
docker run --rm -p 3000:3000 eai-mcp
```

## Add an entry

1. Copy an existing folder under `entries/`. The folder name is the entry `id` (kebab case).
2. Fill `manifest.yaml`. Required fields and allowed values are in `schema/entry.schema.json`. Skills may add a `SKILL.md` next to the manifest.
3. Run `npm run validate`.
4. Open a pull request. CI runs the same validation and builds the site.

The fixed lists (type, domains, audience, works_with) live in `taxonomy.ts`. After changing them: `npm run gen-schema`, commit the schema, and update the options in `.github/ISSUE_TEMPLATE/paku-uut-sissekannet.yml` by hand.

`verified: true` means a maintainer actually ran the entry on `last_tested`. Entries older than `stale_after_days` (90) show an "Aegunud" (stale) badge.

## Repository layout

```
eai.config.json           project name, repo owner/name/branch, site URL and base path, stale window
taxonomy.ts               single source for the fixed lists and their Estonian labels
entries/<id>/             manifest.yaml, optional SKILL.md            (CC BY 4.0)
schema/entry.schema.json  generated from taxonomy.ts, committed, drift is a validation error
scripts/                  validate, build-index, healthcheck, gen-schema (tsx, tested with node:test)
site/                     Astro static site, Estonian UI, Pagefind search; reads site/public/index.json
mcp/                      MCP server (stdio and Streamable HTTP), Dockerfile
.github/                  validate, weekly healthcheck issue, Pages deploy; issue forms; PR template
```

`site/public/index.json`, `site/dist` and `mcp/dist` are generated and not committed.

## Renaming the project

The name, repository coordinates and site URL live only in `eai.config.json`. Package names (`eai`, `eai-site`, `eai-mcp`) and the `EAI_*` environment variables are code identifiers and can stay or be renamed independently.

## Deployment

`deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`. Enable Pages once in the repository settings with source "GitHub Actions".

GitHub Pages on a **private** repository requires a paid plan (GitHub Pro, Team or Enterprise). On the Free plan the deploy job fails or the site is not served. Options:

- make the repository public, or
- use Cloudflare Pages: delete or disable `.github/workflows/deploy.yml`, connect the repository in Cloudflare Pages with build command `npm run build:site` and output directory `site/dist`, and set `site.url` to the Cloudflare URL and `site.base` to `/` in `eai.config.json`.

## Licenses

Code: MIT ([LICENSE](LICENSE)). Content in `entries/`: CC BY 4.0 ([LICENSE-CONTENT](LICENSE-CONTENT)).
