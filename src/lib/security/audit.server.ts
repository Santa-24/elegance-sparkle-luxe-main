import { supabaseInsert } from "@/lib/supabase.server";

import { getAdminSession } from "./admin-auth.server";

export type AuditAction =
  | "login"
  | "logout"
  | "create"
  | "update"
  | "delete"
  | "publish"
  | "archive"
  | "restore"
  | "status_change";

export type AuditMetadata = Record<string, unknown>;

export async function recordAdminAuditLog(input: {
  action: AuditAction;
  resourceType: string;
  resourceId: string;
  metadata?: AuditMetadata;
  userId?: string | null;
}) {
  const session = input.userId ? null : await getAdminSession();
  const userId = input.userId ?? session?.adminUserId ?? null;

  if (!userId) {
    return null;
  }

  await supabaseInsert("audit_logs", {
    user_id: userId,
    action: input.action,
    table_name: input.resourceType,
    resource_type: input.resourceType,
    resource_id: input.resourceId,
    metadata: input.metadata ?? {},
    created_at: new Date().toISOString(),
  });

  return true;
}
