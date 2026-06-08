// ============================================
// SERVER CONFIGURATION - Server-only Config
// ============================================

import process from "node:process";

/**
 * Server-only config. The .server.ts suffix prevents Vite from bundling
 * this file into the client — values here never reach the browser.
 *
 * On Cloudflare Workers, env binds at REQUEST time. Module-scope reads
 * (e.g. `const x = process.env.X`) resolve to undefined — always read
 * process.env INSIDE a function or handler.
 */
export function getServerConfig() {
  const config = {
    nodeEnv: process.env.NODE_ENV,
    siteUrl: process.env.VITE_SITE_URL || process.env.SITE_URL || "",
    adminSessionSecret: process.env.ADMIN_SESSION_SECRET || "",
    mediaBucketName: process.env.SUPABASE_MEDIA_BUCKET || "cms-media",
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    sessionSecret: process.env.SESSION_SECRET,
    jwtSecret: process.env.JWT_SECRET,
  };

  const missing: string[] = [];
  if (!config.adminSessionSecret) missing.push("ADMIN_SESSION_SECRET");
  if (!config.sessionSecret) missing.push("SESSION_SECRET");
  if (!config.jwtSecret) missing.push("JWT_SECRET");
  if (!config.supabaseUrl) missing.push("SUPABASE_URL");
  if (!config.supabaseAnonKey) missing.push("SUPABASE_ANON_KEY");
  if (!config.supabaseServiceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return config;
}

export type ServerConfig = ReturnType<typeof getServerConfig>;
