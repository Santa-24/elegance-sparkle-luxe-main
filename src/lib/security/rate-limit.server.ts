import { createHash } from "node:crypto";
import { getRequestIP } from "@tanstack/start-server-core";

import {
  supabaseDelete,
  supabaseInsert,
  supabaseSelect,
  supabaseUpdate,
} from "@/lib/supabase.server";

type RateLimitRow = {
  id: number;
  ip_hash: string;
  endpoint: string;
  count: number;
  expires_at: string;
  created_at: string;
};

function hashIp(ip: string) {
  return createHash("sha256").update(ip).digest("hex");
}

async function cleanupExpired(endpoint: string) {
  const nowIso = new Date().toISOString();
  try {
    await supabaseDelete(
      "rate_limits",
      `endpoint=eq.${encodeURIComponent(endpoint)}&expires_at=lt.${encodeURIComponent(nowIso)}`,
    );
  } catch {
    // best-effort cleanup
  }
}

export async function enforceDistributedRateLimit(
  endpoint: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
) {
  const ip = getRequestIP() || "unknown";
  const ipHash = hashIp(ip);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + windowMs).toISOString();

  await cleanupExpired(endpoint);

  const rows = await supabaseSelect<RateLimitRow>(
    `rate_limits?select=id,ip_hash,endpoint,count,expires_at,created_at&ip_hash=eq.${ipHash}&endpoint=eq.${encodeURIComponent(endpoint)}&limit=1`,
  );
  const existing = rows[0];

  if (!existing) {
    await supabaseInsert("rate_limits", {
      ip_hash: ipHash,
      endpoint,
      count: 1,
      expires_at: expiresAt,
    });
    return;
  }

  if (new Date(existing.expires_at).getTime() <= now.getTime()) {
    await supabaseUpdate(
      "rate_limits",
      `id=eq.${existing.id}`,
      {
        count: 1,
        expires_at: expiresAt,
      },
      "id",
    );
    return;
  }

  if (existing.count >= limit) {
    throw new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
      status: 429,
      headers: { "content-type": "application/json" },
    });
  }

  await supabaseUpdate(
    "rate_limits",
    `id=eq.${existing.id}`,
    {
      count: existing.count + 1,
    },
    "id",
  );
}
