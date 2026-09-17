// Per-instance throttle; Turnstile provides the cross-instance abuse challenge.
const attempts = new Map<string, { count: number; until: number }>();
export function checkCheerRateLimit(key: string, now = Date.now()) {
  if (attempts.size > 5000) {
    for (const [entry, value] of attempts) if (value.until <= now) attempts.delete(entry);
  }
  const current = attempts.get(key);
  if (!current || current.until <= now) {
    attempts.set(key, { count: 1, until: now + 15 * 60_000 });
    return true;
  }
  current.count++;
  return current.count <= 5;
}
