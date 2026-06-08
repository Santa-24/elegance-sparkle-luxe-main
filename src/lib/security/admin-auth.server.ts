import { clearSession, getSession, updateSession } from "@tanstack/start-server-core";
import { createHash } from "node:crypto";

export type AdminRole = "super_admin" | "admin" | "editor";

export type AdminSessionData = {
  email: string;
  role: AdminRole;
  adminUserId: string;
};

const SESSION_NAME = "em-admin";

function ensureRequiredSecurityEnv() {
  const missing: string[] = [];

  if (!process.env.ADMIN_SESSION_SECRET) missing.push("ADMIN_SESSION_SECRET");
  if (!process.env.SESSION_SECRET) missing.push("SESSION_SECRET");
  if (!process.env.JWT_SECRET) missing.push("JWT_SECRET");
  if (!getAdminEmail()) missing.push("ADMIN_EMAIL");
  if (!getAdminPassword()) missing.push("ADMIN_PASSWORD");

  if (missing.length > 0) {
    throw new Error(`Missing required security environment variables: ${missing.join(", ")}`);
  }

  return {
    nodeEnv: process.env.NODE_ENV,
    adminSessionSecret: process.env.ADMIN_SESSION_SECRET || "",
  };
}

function getSessionPassword() {
  const config = ensureRequiredSecurityEnv();
  const material = `${process.env.SESSION_SECRET}:${config.adminSessionSecret}:${process.env.JWT_SECRET}`;
  return createHash("sha256").update(material).digest("hex");
}

function getSessionConfig() {
  const config = ensureRequiredSecurityEnv();
  return {
    name: SESSION_NAME,
    password: getSessionPassword(),
    cookie: {
      httpOnly: true,
      sameSite: "strict" as const,
      secure: config.nodeEnv === "production",
      path: "/",
    },
  };
}

function getAdminEmail() {
  return (process.env.ADMIN_EMAIL || process.env.VITE_ADMIN_EMAIL || "").trim().toLowerCase();
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

function getAdminRole(): AdminRole {
  const rawRole = (process.env.ADMIN_ROLE || "super_admin").trim().toLowerCase();
  if (rawRole === "admin" || rawRole === "editor") {
    return rawRole;
  }
  return "super_admin";
}

function hashToUuid(seed: string) {
  const hex = createHash("sha256").update(seed).digest("hex");
  const chars = hex.slice(0, 32).split("");
  chars[12] = "4";
  chars[16] = ((parseInt(chars[16], 16) & 0x3) | 0x8).toString(16);
  return [
    chars.slice(0, 8).join(""),
    chars.slice(8, 12).join(""),
    chars.slice(12, 16).join(""),
    chars.slice(16, 20).join(""),
    chars.slice(20, 32).join(""),
  ].join("-");
}

function buildAdminSession(email: string): AdminSessionData {
  const normalizedEmail = email.trim().toLowerCase();
  return {
    email: normalizedEmail,
    role: getAdminRole(),
    adminUserId: hashToUuid(`admin:${normalizedEmail}`),
  };
}

export async function saveAdminSession(input: { email: string; password: string }): Promise<{
  email: string;
  role: AdminRole;
  adminUserId: string;
}> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const expectedEmail = getAdminEmail();
  const expectedPassword = getAdminPassword();

  if (!expectedEmail || !expectedPassword) {
    throw new Error("Admin credentials are not configured.");
  }

  if (normalizedEmail !== expectedEmail || input.password !== expectedPassword) {
    throw new Error("Invalid login credentials");
  }

  const sessionData = buildAdminSession(normalizedEmail);

  await updateSession<AdminSessionData>(getSessionConfig(), sessionData);

  return sessionData;
}

export async function getAdminSession() {
  const session = await getSession<AdminSessionData>(getSessionConfig());
  return session.data ?? null;
}

export async function requireAdminSession(minRole: AdminRole = "editor") {
  const session = await getSession<AdminSessionData>(getSessionConfig());
  const data = session.data;

  if (!data) {
    throw new Response("Forbidden", { status: 403 });
  }

  if (!data.email || !data.role || !data.adminUserId) {
    throw new Response("Forbidden", { status: 403 });
  }

  const rolePriority: Record<AdminRole, number> = {
    editor: 1,
    admin: 2,
    super_admin: 3,
  };

  const currentRole = data.role;

  if (rolePriority[currentRole] < rolePriority[minRole]) {
    throw new Response("Forbidden", { status: 403 });
  }

  return data;
}

export async function requireSuperAdmin() {
  return requireAdminSession("super_admin");
}

export async function clearAdminSession() {
  await clearSession(getSessionConfig());
}
