// ============================================
// ADMIN - NOTIFICATIONS MANAGEMENT
// ============================================

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "@/lib/config/server";
import { recordAdminAuditLog } from "@/lib/security/audit.server";

import { requireAdminSession } from "./admin-session";

export type AdminNotificationRecord = {
  id: string;
  booking_id: string | null;
  customer_email: string;
  customer_phone: string;
  notification_type: string;
  template_name: string;
  channel: "email" | "sms" | "whatsapp" | "in_app";
  status: "pending" | "sent" | "failed" | "bounced";
  created_at: string;
  sent_at: string | null;
};

type NotificationRow = {
  id: string | number;
  booking_id: string | number | null;
  customer_email: string;
  customer_phone: string;
  notification_type: string;
  template_name: string;
  channel: AdminNotificationRecord["channel"];
  status: AdminNotificationRecord["status"];
  created_at: string;
  sent_at: string | null;
};

const notificationStatusSchema = z.enum(["pending", "sent", "failed", "bounced"]);

export const listAdminNotifications = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      limit: z.number().int().default(100),
      status: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      let query = `select=*&order=created_at.desc&limit=${data.limit}`;
      if (data.status) {
        query += `&status=eq.${data.status}`;
      }

      const response = await fetch(`${config.supabaseUrl}/rest/v1/notifications?${query}`, {
        headers: {
          apikey: config.supabaseAnonKey || "",
          Authorization: `Bearer ${config.supabaseAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const rows = (await response.json()) as NotificationRow[];
      return rows.map((notif) => ({
        id: notif.id.toString(),
        booking_id: notif.booking_id ? notif.booking_id.toString() : null,
        customer_email: notif.customer_email,
        customer_phone: notif.customer_phone,
        notification_type: notif.notification_type,
        template_name: notif.template_name,
        channel: notif.channel,
        status: notif.status,
        created_at: notif.created_at,
        sent_at: notif.sent_at,
      })) as AdminNotificationRecord[];
    } catch (error) {
      console.error("Error listing notifications:", error);
      return [];
    }
  });

export const updateAdminNotificationStatus = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      notificationId: z.string().min(1),
      status: notificationStatusSchema,
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/notifications?id=eq.${data.notificationId}`,
        {
          method: "PATCH",
          headers: {
            apikey: config.supabaseAnonKey || "",
            Authorization: `Bearer ${config.supabaseAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: data.status,
            sent_at: data.status === "sent" ? new Date().toISOString() : null,
          }),
        },
      );

      void recordAdminAuditLog({
        action: "status_change",
        resourceType: "notifications",
        resourceId: data.notificationId,
        metadata: { status: data.status },
      });
      return response.ok;
    } catch (error) {
      console.error("Error updating notification status:", error);
      return false;
    }
  });

export const resendAdminNotification = createServerFn({ method: "POST" })
  .inputValidator(z.object({ notificationId: z.string().min(1) }))
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/notifications?id=eq.${data.notificationId}`,
        {
          method: "PATCH",
          headers: {
            apikey: config.supabaseAnonKey || "",
            Authorization: `Bearer ${config.supabaseAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "pending",
          }),
        },
      );

      void recordAdminAuditLog({
        action: "update",
        resourceType: "notifications",
        resourceId: data.notificationId,
        metadata: { status: "pending" },
      });
      return response.ok;
    } catch (error) {
      console.error("Error resending notification:", error);
      return false;
    }
  });

export const getNotificationStats = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession("admin");
  try {
    const config = getServerConfig();
    const response = await fetch(
      `${config.supabaseUrl}/rest/v1/notifications?select=status,count()`,
      {
        headers: {
          apikey: config.supabaseAnonKey || "",
          Authorization: `Bearer ${config.supabaseAnonKey}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch notification stats");
    }

    const rows = (await response.json()) as Array<{
      status: AdminNotificationRecord["status"];
      count: number;
    }>;
    const stats: Record<string, number> = {
      pending: 0,
      sent: 0,
      failed: 0,
      bounced: 0,
    };

    rows.forEach((item) => {
      stats[item.status] = item.count;
    });

    return stats;
  } catch (error) {
    console.error("Error getting notification stats:", error);
    return {};
  }
});

export const deleteAdminNotification = createServerFn({ method: "POST" })
  .inputValidator(z.object({ notificationId: z.string().min(1) }))
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/notifications?id=eq.${data.notificationId}`,
        {
          method: "DELETE",
          headers: {
            apikey: config.supabaseAnonKey || "",
            Authorization: `Bearer ${config.supabaseAnonKey}`,
          },
        },
      );

      return response.ok;
    } catch (error) {
      console.error("Error deleting notification:", error);
      return false;
    }
  });
