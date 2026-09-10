export interface UrlCheck {
  ok: boolean;
  status?: number;
  error?: string;
}
export interface EntryCheck extends UrlCheck {
  id: string;
  url: string;
}

export function isHttpUrl(s: string): boolean {
  return /^https?:\/\//i.test(s);
}

/** Reachable unless the target is gone (404, 410) or failing (5xx). Other 4xx means the host answers. */
export function classifyStatus(status: number): boolean {
  if (status === 404 || status === 410) return false;
  return status < 500;
}

export async function checkUrl(url: string, fetchImpl: typeof fetch = fetch, timeoutMs = 10_000): Promise<UrlCheck> {
  const opts = (method: string): RequestInit => ({
    method,
    redirect: 'follow',
    signal: AbortSignal.timeout(timeoutMs),
    headers: { 'user-agent': 'eai-healthcheck' },
  });
  try {
    let res = await fetchImpl(url, opts('HEAD'));
    if (res.status === 405 || res.status === 501) res = await fetchImpl(url, opts('GET'));
    return { ok: classifyStatus(res.status), status: res.status };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export function renderReport(results: EntryCheck[], now: Date): string {
  const failures = results.filter((r) => !r.ok);
  const lines = [
    `# Healthcheck ${now.toISOString().slice(0, 10)}`,
    '',
    `${failures.length} of ${results.length} install URLs failed.`,
    '',
  ];
  if (failures.length > 0) {
    lines.push('| Entry | URL | Result |', '|---|---|---|');
    for (const f of failures) {
      const result = f.status !== undefined ? `HTTP ${f.status}` : (f.error ?? 'error');
      lines.push(`| ${f.id} | ${f.url} | ${result} |`);
    }
    lines.push(
      '',
      'Fix the `install` field or the target, then rerun the workflow. This report is generated automatically and changes no files.',
    );
  }
  return lines.join('\n') + '\n';
}
