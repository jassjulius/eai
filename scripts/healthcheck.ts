import { checkUrl, isHttpUrl, renderReport, type EntryCheck } from './healthcheck-lib.ts';
import { loadAllEntries, type Manifest } from './lib.ts';

// Progress goes to stderr, the Markdown report to stdout, so callers can redirect stdout to a file.
const targets = loadAllEntries()
  .filter((e) => !e.parseError)
  .map((e) => e.manifest as Manifest)
  .filter((m) => typeof m.install === 'string' && isHttpUrl(m.install))
  .map((m) => ({ id: m.id, url: m.install as string }));

const results: EntryCheck[] = [];
for (const t of targets) {
  const r = await checkUrl(t.url);
  results.push({ ...t, ...r });
  console.error(`${r.ok ? 'ok  ' : 'FAIL'} ${t.id} ${t.url} ${r.status ?? r.error ?? ''}`);
}

process.stdout.write(renderReport(results, new Date()));
process.exit(results.some((r) => !r.ok) ? 1 : 0);
