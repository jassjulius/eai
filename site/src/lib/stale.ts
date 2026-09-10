const DAY_MS = 86_400_000;

/** True when lastTested (YYYY-MM-DD) is older than staleAfterDays, or unparseable. */
export function isStale(lastTested: string, staleAfterDays: number, now: Date = new Date()): boolean {
  const tested = Date.parse(`${lastTested}T00:00:00Z`);
  if (Number.isNaN(tested)) return true;
  return (now.getTime() - tested) / DAY_MS > staleAfterDays;
}
