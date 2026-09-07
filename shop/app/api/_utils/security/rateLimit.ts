const RATE_LIMIT_WINDOW = 10_000; // 10s
const RATE_LIMIT_MAX = 3; // max 3 requests in window
const ipHits = new Map<string, number[]>();

export function rateLimit(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  const hits = ipHits.get(ip) || [];

  const recentHits = hits.filter((t) => t > windowStart);

  if (recentHits.length >= RATE_LIMIT_MAX) {
    return false; // blocked
  }

  recentHits.push(now);
  ipHits.set(ip, recentHits);

  return true;
}
