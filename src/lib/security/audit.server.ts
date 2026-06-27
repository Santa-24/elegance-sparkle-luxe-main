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

  const payload: Record<string, any> = {
    user_id: userId,
    action: input.action,
    resource_type: input.resourceType,
    resource_id: input.resourceId,
    metadata: input.metadata ?? {},
    created_at: new Date().toISOString(),
  };

  try {
    await supabaseInsert("audit_logs", payload);
  } catch (error: any) {
    const errorStr = JSON.stringify(error) || "";
    // If it fails due to old columns (table_name, record_id) violating not-null constraints, retry with them
    if (
      errorStr.includes("table_name") ||
      errorStr.includes("record_id") ||
      errorStr.includes("23502")
    ) {
      try {
        await supabaseInsert("audit_logs", {
          ...payload,
          table_name: input.resourceType,
          record_id: input.resourceId,
        });
        return true;
      } catch (retryError) {
        console.error("Fallback audit log insertion failed:", retryError);
      }
    } else {
      console.error("Audit log insertion failed:", error);
    }
    // Silent catch so logging failures don't block core admin operations/login
  }

  return true;
}
