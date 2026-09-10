#!/usr/bin/env node
import { createServer as createHttpServer } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hostHeaderValidation, toNodeHandler } from '@modelcontextprotocol/node';
import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod';
import { entryUrl, getEntry, loadIndex, searchEntries, type IndexFile } from './data.js';

// Usage:
//   node dist/server.js            stdio transport
//   node dist/server.js --http     stateless Streamable HTTP on PORT (default 3000) and HOST (default 0.0.0.0)
// Env: EAI_INDEX_PATH (default ../../site/public/index.json), EAI_ALLOWED_HOSTS (comma list, enables Host header validation)

const here = dirname(fileURLToPath(import.meta.url));
const indexPath = process.env.EAI_INDEX_PATH ?? resolve(here, '../../site/public/index.json');
const index: IndexFile = loadIndex(indexPath);

function asEnum(values: string[]): [string, ...string[]] {
  if (values.length === 0) throw new Error('taxonomy list must not be empty');
  return values as [string, ...string[]];
}

function buildServer(index: IndexFile): McpServer {
  const server = new McpServer(
    { name: `${index.name.toLowerCase()}-registry`, version: '0.1.0' },
    {
      instructions: `Registry of Estonia specific AI knowledge with ${index.entries.length} entries. Call search_entries to find entries, then get_entry for the full manifest and SKILL.md.`,
    },
  );
  const t = index.taxonomy;

  server.registerTool(
    'search_entries',
    {
      title: 'Search registry entries',
      description:
        'Free text search over the registry with optional filters. Every word of the query must appear in the title, summaries, description or SKILL.md. Returns compact hits with ids.',
      inputSchema: z.object({
        query: z.string().optional().describe('Free text query'),
        type: z.enum(asEnum(t.types)).optional().describe('Entry type'),
        domain: z.enum(asEnum(t.domains)).optional().describe('Domain'),
        works_with: z.enum(asEnum(t.works_with)).optional().describe('Client the entry works with'),
        limit: z.number().int().min(1).max(100).optional().describe('Max hits, default 20'),
      }),
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async (args) => {
      const hits = searchEntries(index.entries, args, args.limit ?? 20).map((h) => ({ ...h, url: entryUrl(index, h.id) }));
      return { content: [{ type: 'text', text: JSON.stringify({ total: hits.length, entries: hits }, null, 2) }] };
    },
  );

  server.registerTool(
    'get_entry',
    {
      title: 'Get one registry entry',
      description: 'Full manifest of one entry by id, including attached SKILL.md text when present.',
      inputSchema: z.object({ id: z.string().describe('Entry id, for example telks-mcp') }),
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({ id }) => {
      const entry = getEntry(index.entries, id);
      if (!entry) {
        return { isError: true, content: [{ type: 'text', text: `No entry with id "${id}". Use search_entries to find ids.` }] };
      }
      return { content: [{ type: 'text', text: JSON.stringify({ ...entry, url: entryUrl(index, entry.id) }, null, 2) }] };
    },
  );
  return server;
}

if (process.argv.includes('--http')) {
  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? '0.0.0.0';
  const allowedHosts = (process.env.EAI_ALLOWED_HOSTS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const validateHost = allowedHosts.length > 0 ? hostHeaderValidation(allowedHosts) : null;
  const handler = toNodeHandler(createMcpHandler(() => buildServer(index)));
  createHttpServer((req, res) => {
    if (validateHost && !validateHost(req, res)) return;
    void handler(req, res);
  }).listen(port, host, () => {
    console.error(`MCP Streamable HTTP listening on http://${host}:${port}/mcp (${index.entries.length} entries from ${indexPath})`);
  });
} else {
  serveStdio(() => buildServer(index));
  console.error(`MCP stdio server ready (${index.entries.length} entries from ${indexPath})`);
}
