import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { supabaseInsert } from "../supabase.server";
import { assertEmptyHoneypot } from "../security/abuse";
import { enforceDistributedRateLimit } from "../security/rate-limit.server";

const contactInputSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number."),
  email: z.string().trim().email().optional().or(z.literal("")),
  service: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10).max(2000),
  honeypot: z.string().optional().default(""),
});

type ContactMessageRow = {
  id: number;
};

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator(contactInputSchema)
  .handler(async ({ data }) => {
    await enforceDistributedRateLimit("contact");
    assertEmptyHoneypot(data.honeypot);

    const [row] = await supabaseInsert<ContactMessageRow>("contact_messages", {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      service_name: data.service?.trim() || null,
      message: data.message.trim(),
      status: "new",
    });

    return {
      messageId: row.id,
    };
  });
