// ============================================
// ADMIN - EMAIL TEMPLATES MANAGEMENT
// ============================================

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "@/lib/config/server";

import { requireAdminSession } from "./admin-session";

export type AdminEmailTemplateRecord = {
  id: string;
  template_name: string;
  subject: string;
  body: string;
  variables: Record<string, string> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminEmailTemplateInput = {
  template_name: string;
  subject: string;
  body: string;
  variables?: Record<string, string>;
  is_active?: boolean;
};

type EmailTemplateRow = {
  id: string | number;
  template_name: string;
  subject: string;
  body: string;
  variables: Record<string, string> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export const listAdminEmailTemplates = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  try {
    const config = getServerConfig();
    const response = await fetch(
      `${config.supabaseUrl}/rest/v1/email_templates?select=*&order=template_name.asc`,
      {
        headers: {
          apikey: config.supabaseAnonKey || "",
          Authorization: `Bearer ${config.supabaseAnonKey}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch email templates");
    }

    const data = (await response.json()) as EmailTemplateRow[];
    return data.map((template) => ({
      id: template.id.toString(),
      template_name: template.template_name,
      subject: template.subject,
      body: template.body,
      variables: template.variables,
      is_active: template.is_active,
      created_at: template.created_at,
      updated_at: template.updated_at,
    })) as AdminEmailTemplateRecord[];
  } catch (error) {
    console.error("Error listing email templates:", error);
    return [];
  }
});

export const upsertAdminEmailTemplate = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().optional(),
      template_name: z.string().min(1),
      subject: z.string().min(1),
      body: z.string().min(1),
      variables: z.record(z.string()).optional(),
      is_active: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    try {
      const config = getServerConfig();
      const isUpdate = !!data.id;
      const payload = {
        template_name: data.template_name,
        subject: data.subject,
        body: data.body,
        variables: data.variables || {},
        is_active: data.is_active ?? true,
        updated_at: new Date().toISOString(),
      };

      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/email_templates${isUpdate ? `?id=eq.${data.id}` : ""}`,
        {
          method: isUpdate ? "PATCH" : "POST",
          headers: {
            apikey: config.supabaseAnonKey || "",
            Authorization: `Bearer ${config.supabaseAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isUpdate ? payload : { ...payload, created_at: new Date().toISOString() },
          ),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to ${isUpdate ? "update" : "create"} template`);
      }

      return null;
    } catch (error) {
      console.error("Error upserting email template:", error);
      return null;
    }
  });

export const deleteAdminEmailTemplate = createServerFn({ method: "POST" })
  .inputValidator(z.object({ templateId: z.string().min(1) }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/email_templates?id=eq.${data.templateId}`,
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
      console.error("Error deleting email template:", error);
      return false;
    }
  });

export const getAdminEmailTemplateByName = createServerFn({ method: "GET" })
  .inputValidator(z.object({ templateName: z.string().min(1) }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    try {
      const config = getServerConfig();
      const response = await fetch(
        `${config.supabaseUrl}/rest/v1/email_templates?template_name=eq.${data.templateName}&limit=1`,
        {
          headers: {
            apikey: config.supabaseAnonKey || "",
            Authorization: `Bearer ${config.supabaseAnonKey}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch email template");
      }

      const rows = await response.json();
      if (!rows.length) {
        return null;
      }

      const template = rows[0];
      return {
        id: template.id.toString(),
        template_name: template.template_name,
        subject: template.subject,
        body: template.body,
        variables: template.variables,
        is_active: template.is_active,
        created_at: template.created_at,
        updated_at: template.updated_at,
      } as AdminEmailTemplateRecord;
    } catch (error) {
      console.error("Error fetching email template:", error);
      return null;
    }
  });

export const previewEmailTemplate = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      template: z.object({
        id: z.string(),
        template_name: z.string(),
        subject: z.string(),
        body: z.string(),
        variables: z.record(z.string()).nullable(),
        is_active: z.boolean(),
        created_at: z.string(),
        updated_at: z.string(),
      }),
      variables: z.record(z.string()),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    let subject = data.template.subject;
    let body = data.template.body;

    Object.entries(data.variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      subject = subject.replace(new RegExp(placeholder, "g"), value);
      body = body.replace(new RegExp(placeholder, "g"), value);
    });

    return { subject, body };
  });
