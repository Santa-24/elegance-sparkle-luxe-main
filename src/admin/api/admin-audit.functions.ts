// ============================================
// ADMIN - AUDIT LOGS & ACTIVITY TRACKING
// ============================================

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "@/lib/config/server";

import { requireAdminSession } from "./admin-session";

export type AdminAuditLogRecord = {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string;
  metadata: string | null;
  created_at: string;
};

type AuditLogRow = {
  id: string | number;
  user_id: string | number | null;
  action: string;
  resource_type: string;
  resource_id: string | number;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

function auditHeaders() {
  const config = getServerConfig();
  return {
    apikey: config.supabaseServiceRoleKey || "",
    Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
  };
}

export const listAdminAuditLogs = createServerFn({ method: "GET" })
  .inputValidator(z.object({ limit: z.number().int().default(100) }))
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/audit_logs?select=*&order=created_at.desc&limit=${data.limit}`,
        {
          headers: auditHeaders(),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch audit logs");
      }

      const rows = (await response.json()) as AuditLogRow[];
      return rows.map((log) => ({
        id: log.id.toString(),
        user_id: log.user_id ? log.user_id.toString() : null,
        action: log.action,
        resource_type: log.resource_type,
        resource_id: log.resource_id.toString(),
        metadata: log.metadata ? JSON.stringify(log.metadata) : null,
        created_at: log.created_at,
      })) as AdminAuditLogRecord[];
    } catch (error) {
      console.error("Error listing audit logs:", error);
      return [];
    }
  });

export const getActivitySummary = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      startDate: z.string().min(1),
      endDate: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/audit_logs?created_at=gte.${data.startDate}&created_at=lte.${data.endDate}&select=action,count()`,
        {
          headers: auditHeaders(),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch activity summary");
      }

      const rows = (await response.json()) as Array<{ action: string; count: number }>;
      const summary: Record<string, number> = {};

      rows.forEach((item) => {
        summary[item.action] = item.count;
      });

      return summary;
    } catch (error) {
      console.error("Error getting activity summary:", error);
      return {};
    }
  });

export const getUserActivity = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      userId: z.string().min(1),
      limit: z.number().int().default(50),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/audit_logs?user_id=eq.${data.userId}&order=created_at.desc&limit=${data.limit}`,
        {
          headers: auditHeaders(),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user activity");
      }

      const rows = (await response.json()) as AuditLogRow[];
      return rows.map((log) => ({
        id: log.id.toString(),
        user_id: log.user_id ? log.user_id.toString() : null,
        action: log.action,
        resource_type: log.resource_type,
        resource_id: log.resource_id.toString(),
        metadata: log.metadata ? JSON.stringify(log.metadata) : null,
        created_at: log.created_at,
      })) as AdminAuditLogRecord[];
    } catch (error) {
      console.error("Error getting user activity:", error);
      return [];
    }
  });
