// ============================================
// ADMIN - USERS / RBAC MANAGEMENT
// ============================================

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { recordAdminAuditLog } from "@/lib/security/audit.server";
import { supabaseInsert, supabaseSelect, supabaseUpdate } from "@/lib/supabase.server";

import { requireSuperAdmin } from "./admin-session";

export type AdminUserRecord = {
  id: string;
  auth_user_id: string | null;
  email: string;
  role: "super_admin" | "admin" | "editor";
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminUserInput = {
  auth_user_id?: string;
  email: string;
  role: AdminUserRecord["role"];
  is_active: boolean;
};

type AdminUserRow = {
  id: string | number;
  auth_user_id: string | null;
  email: string;
  role: AdminUserRecord["role"];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

const roleSchema = z.enum(["super_admin", "admin", "editor"]);

export const listAdminUsers = createServerFn({ method: "GET" }).handler(async () => {
  await requireSuperAdmin();
  const rows = await supabaseSelect<AdminUserRow>(
    "admin_users?select=id,auth_user_id,email,role,is_active,created_at,updated_at&order=created_at.desc",
  );

  return rows.map((user) => ({
    id: String(user.id),
    auth_user_id: user.auth_user_id,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
    created_at: user.created_at,
    updated_at: user.updated_at,
  })) as AdminUserRecord[];
});

export const upsertAdminUser = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().optional(),
      auth_user_id: z.string().optional(),
      email: z.string().email(),
      role: roleSchema,
      is_active: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    await requireSuperAdmin();
    const payload: AdminUserInput = {
      auth_user_id: data.auth_user_id?.trim() || undefined,
      email: data.email.trim().toLowerCase(),
      role: data.role,
      is_active: data.is_active,
    };

    if (data.id) {
      await supabaseUpdate(
        "admin_users",
        `id=eq.${encodeURIComponent(data.id)}`,
        {
          auth_user_id: payload.auth_user_id ?? null,
          email: payload.email,
          role: payload.role,
          is_active: payload.is_active,
          updated_at: new Date().toISOString(),
        },
        "id",
      );
      void recordAdminAuditLog({
        action: "update",
        resourceType: "admin_users",
        resourceId: data.id,
        metadata: {
          email: payload.email,
          role: payload.role,
          is_active: payload.is_active,
        },
      });
      return null;
    }

    await supabaseInsert("admin_users", {
      auth_user_id: payload.auth_user_id ?? null,
      email: payload.email,
      role: payload.role,
      is_active: payload.is_active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    void recordAdminAuditLog({
      action: "create",
      resourceType: "admin_users",
      resourceId: payload.email,
      metadata: {
        email: payload.email,
        role: payload.role,
        is_active: payload.is_active,
      },
    });

    return null;
  });

export const deleteAdminUser = createServerFn({ method: "POST" })
  .inputValidator(z.object({ userId: z.string().min(1) }))
  .handler(async ({ data }) => {
    await requireSuperAdmin();
    await supabaseUpdate(
      "admin_users",
      `id=eq.${encodeURIComponent(data.userId)}`,
      {
        is_active: false,
        updated_at: new Date().toISOString(),
      },
      "id",
    );
    void recordAdminAuditLog({
      action: "archive",
      resourceType: "admin_users",
      resourceId: data.userId,
    });
    return true;
  });

export const changeUserRole = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      userId: z.string().min(1),
      newRole: roleSchema,
    }),
  )
  .handler(async ({ data }) => {
    await requireSuperAdmin();
    await supabaseUpdate(
      "admin_users",
      `id=eq.${encodeURIComponent(data.userId)}`,
      {
        role: data.newRole,
        updated_at: new Date().toISOString(),
      },
      "id",
    );
    void recordAdminAuditLog({
      action: "update",
      resourceType: "admin_users",
      resourceId: data.userId,
      metadata: { role: data.newRole },
    });
    return true;
  });
