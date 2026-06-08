// ============================================
// ADMIN - CONTACT MESSAGES MANAGEMENT
// ============================================

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "@/lib/config/server";
import { recordAdminAuditLog } from "@/lib/security/audit.server";

import { requireAdminSession } from "./admin-session";

export type AdminContactMessageRecord = {
  id: string;
  customer_name: string;
  customer_email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
  updated_at: string;
};

type ContactMessageRow = {
  id: string | number;
  customer_name: string;
  customer_email: string;
  phone: string;
  subject: string;
  message: string;
  status: AdminContactMessageRecord["status"];
  created_at: string;
  updated_at: string;
};

const messageStatusSchema = z.enum(["new", "read", "replied", "archived"]);

export const listAdminContactMessages = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession("admin");
  try {
    const config = getServerConfig();
    const response = await fetch(
      `${config.supabaseUrl}/rest/v1/contact_messages?select=*&order=created_at.desc&deleted_at=is.null`,
      {
        headers: {
          apikey: config.supabaseAnonKey || "",
          Authorization: `Bearer ${config.supabaseAnonKey}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch contact messages");
    }

    const data = (await response.json()) as ContactMessageRow[];
    return data.map((msg) => ({
      id: msg.id.toString(),
      customer_name: msg.customer_name,
      customer_email: msg.customer_email,
      phone: msg.phone,
      subject: msg.subject,
      message: msg.message,
      status: msg.status,
      created_at: msg.created_at,
      updated_at: msg.updated_at,
    })) as AdminContactMessageRecord[];
  } catch (error) {
    console.error("Error listing contact messages:", error);
    return [];
  }
});

export const updateAdminContactMessageStatus = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      messageId: z.string().min(1),
      status: messageStatusSchema,
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/contact_messages?id=eq.${data.messageId}`,
        {
          method: "PATCH",
          headers: {
            apikey: config.supabaseAnonKey || "",
            Authorization: `Bearer ${config.supabaseAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: data.status,
            updated_at: new Date().toISOString(),
          }),
        },
      );

      void recordAdminAuditLog({
        action: "status_change",
        resourceType: "contact_messages",
        resourceId: data.messageId,
        metadata: { status: data.status },
      });
      return response.ok;
    } catch (error) {
      console.error("Error updating message status:", error);
      return false;
    }
  });

export const archiveAdminContactMessage = createServerFn({ method: "POST" })
  .inputValidator(z.object({ messageId: z.string().min(1) }))
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/contact_messages?id=eq.${data.messageId}`,
        {
          method: "PATCH",
          headers: {
            apikey: config.supabaseAnonKey || "",
            Authorization: `Bearer ${config.supabaseAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deleted_at: new Date().toISOString(),
          }),
        },
      );

      void recordAdminAuditLog({
        action: "archive",
        resourceType: "contact_messages",
        resourceId: data.messageId,
      });
      return response.ok;
    } catch (error) {
      console.error("Error archiving message:", error);
      return false;
    }
  });
