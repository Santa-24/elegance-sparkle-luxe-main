import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  clearAdminSession,
  getAdminSession,
  requireAdminSession,
  saveAdminSession,
} from "./admin-session";
import { recordAdminAuditLog } from "@/lib/security/audit.server";

const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator(adminLoginSchema)
  .handler(async ({ data }) => {
    const profile = await saveAdminSession({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
    await recordAdminAuditLog({
      action: "login",
      resourceType: "admin_session",
      resourceId: String(profile.adminUserId),
      userId: String(profile.adminUserId),
      metadata: {
        email: profile.email,
        role: profile.role,
      },
    });
    return { authorized: true, email: profile.email, role: profile.role };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await requireAdminSession("editor");
  await recordAdminAuditLog({
    action: "logout",
    resourceType: "admin_session",
    resourceId: String(session.adminUserId),
    userId: String(session.adminUserId),
    metadata: {
      email: session.email,
      role: session.role,
    },
  });
  await clearAdminSession();
  return { success: true };
});

export const getAdminSessionStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getAdminSession();
  if (!session) {
    return { authenticated: false };
  }

  try {
    const validatedSession = await requireAdminSession("editor");
    return {
      authenticated: true,
      email: validatedSession.email,
      role: validatedSession.role,
    };
  } catch {
    await clearAdminSession();
    return { authenticated: false };
  }
});
