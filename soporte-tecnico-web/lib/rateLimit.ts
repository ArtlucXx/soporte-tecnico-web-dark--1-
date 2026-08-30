import { NextRequest } from "next/server";

/**
 * Simple in-memory fixed-window rate limiter.
 *
 * Good enough to stop a single attacker/script from hammering an
 * endpoint (contact form spam, login brute force) on a normal
 * long-running Node process (VPS, Railway, Render, etc.).
 *
 * Limitation: the counters live in this process's memory, so they
 * reset on restart/deploy and are NOT shared across multiple server
 * instances or regions. For real protection against large-scale
 * DDoS traffic you also need something in front of the app at the
 * network level (Cloudflare, a host with built-in DDoS protection,
 * etc.) — this only guards the application layer.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Periodically drop old entries so this Map can't grow forever.
setInterval(() => {
  const now = Date.now();
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt < now) buckets.delete(key);
  });
}, 5 * 60 * 1000);

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * @param key unique key, e.g. `contact:${ip}`
 * @param limit max requests allowed within the window
 * @param windowMs window size in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}