// ============================================
// ADMIN - CUSTOMER PREFERENCES MANAGEMENT
// ============================================

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "@/lib/config/server";
import { recordAdminAuditLog } from "@/lib/security/audit.server";

import { requireAdminSession } from "./admin-session";

export type AdminCustomerPreferenceRecord = {
  id: string;
  customer_phone: string;
  customer_email: string;
  customer_name: string;
  preferred_contact_method: "email" | "phone" | "whatsapp" | "sms";
  total_bookings: number;
  total_spent: number;
  loyalty_points: number;
  last_booking_date: string | null;
  created_at: string;
  updated_at: string;
};

type CustomerPreferenceRow = {
  id: string | number;
  customer_phone: string;
  customer_email: string;
  customer_name: string;
  preferred_contact_method: AdminCustomerPreferenceRecord["preferred_contact_method"];
  total_bookings: number;
  total_spent: number;
  loyalty_points: number;
  last_booking_date: string | null;
  created_at: string;
  updated_at: string;
};

const preferredContactMethodSchema = z.enum(["email", "phone", "whatsapp", "sms"]);

export const listAdminCustomerPreferences = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession("admin");
  try {
    const config = getServerConfig();
    const response = await fetch(
      `${config.supabaseUrl}/rest/v1/customer_preferences?select=*&order=total_spent.desc`,
      {
        headers: {
          apikey: config.supabaseAnonKey || "",
          Authorization: `Bearer ${config.supabaseAnonKey}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch customer preferences");
    }

    const data = (await response.json()) as CustomerPreferenceRow[];
    return data.map((pref) => ({
      id: pref.id.toString(),
      customer_phone: pref.customer_phone,
      customer_email: pref.customer_email,
      customer_name: pref.customer_name,
      preferred_contact_method: pref.preferred_contact_method,
      total_bookings: pref.total_bookings,
      total_spent: pref.total_spent,
      loyalty_points: pref.loyalty_points,
      last_booking_date: pref.last_booking_date,
      created_at: pref.created_at,
      updated_at: pref.updated_at,
    })) as AdminCustomerPreferenceRecord[];
  } catch (error) {
    console.error("Error listing customer preferences:", error);
    return [];
  }
});

export const updateAdminCustomerPreference = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      customerId: z.string().min(1),
      updates: z.object({
        preferred_contact_method: preferredContactMethodSchema.optional(),
        loyalty_points: z.number().int().optional(),
      }),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/customer_preferences?id=eq.${data.customerId}`,
        {
          method: "PATCH",
          headers: {
            apikey: config.supabaseAnonKey || "",
            Authorization: `Bearer ${config.supabaseAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data.updates,
            updated_at: new Date().toISOString(),
          }),
        },
      );

      void recordAdminAuditLog({
        action: "update",
        resourceType: "customer_preferences",
        resourceId: data.customerId,
        metadata: data.updates,
      });
      return response.ok;
    } catch (error) {
      console.error("Error updating customer preference:", error);
      return false;
    }
  });

export const addLoyaltyPoints = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      customerId: z.string().min(1),
      points: z.number(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      const getResponse = await fetch(
        `${config.supabaseUrl}/rest/v1/customer_preferences?id=eq.${data.customerId}&select=loyalty_points`,
        {
          headers: {
            apikey: config.supabaseAnonKey || "",
            Authorization: `Bearer ${config.supabaseAnonKey}`,
          },
        },
      );

      if (!getResponse.ok) {
        throw new Error("Failed to fetch customer");
      }

      const currentData = (await getResponse.json()) as Array<{ loyalty_points?: number }>;
      const currentPoints = currentData[0]?.loyalty_points || 0;
      const newPoints = Math.max(0, currentPoints + data.points);

      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/customer_preferences?id=eq.${data.customerId}`,
        {
          method: "PATCH",
          headers: {
            apikey: config.supabaseAnonKey || "",
            Authorization: `Bearer ${config.supabaseAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loyalty_points: newPoints,
            updated_at: new Date().toISOString(),
          }),
        },
      );

      void recordAdminAuditLog({
        action: "update",
        resourceType: "customer_preferences",
        resourceId: data.customerId,
        metadata: { loyalty_points: newPoints },
      });
      return response.ok;
    } catch (error) {
      console.error("Error adding loyalty points:", error);
      return false;
    }
  });

export const getVIPCustomers = createServerFn({ method: "GET" })
  .inputValidator(z.object({ minSpent: z.number().default(50000) }))
  .handler(async ({ data }) => {
    await requireAdminSession("admin");
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/customer_preferences?total_spent=gte.${data.minSpent}&order=total_spent.desc`,
        {
          headers: {
            apikey: config.supabaseAnonKey || "",
            Authorization: `Bearer ${config.supabaseAnonKey}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch VIP customers");
      }

      const currentData = (await response.json()) as CustomerPreferenceRow[];
      return currentData.map((pref) => ({
        id: pref.id.toString(),
        customer_phone: pref.customer_phone,
        customer_email: pref.customer_email,
        customer_name: pref.customer_name,
        preferred_contact_method: pref.preferred_contact_method,
        total_bookings: pref.total_bookings,
        total_spent: pref.total_spent,
        loyalty_points: pref.loyalty_points,
        last_booking_date: pref.last_booking_date,
        created_at: pref.created_at,
        updated_at: pref.updated_at,
      })) as AdminCustomerPreferenceRecord[];
    } catch (error) {
      console.error("Error fetching VIP customers:", error);
      return [];
    }
  });
