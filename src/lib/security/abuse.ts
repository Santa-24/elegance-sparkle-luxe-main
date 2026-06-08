import { getRequestIP } from "@tanstack/start-server-core";

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

export function assertEmptyHoneypot(value?: string | null) {
  if ((value ?? "").trim()) {
    throw new Error("Submission rejected.");
  }
}

export function enforceRateLimit(namespace: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const ip = getRequestIP() || "unknown";
  const key = `${namespace}:${ip}`;
  const now = Date.now();
  const bucket = rateBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (bucket.count >= limit) {
    throw new Error("Too many requests. Please try again later.");
  }

  bucket.count += 1;
}
