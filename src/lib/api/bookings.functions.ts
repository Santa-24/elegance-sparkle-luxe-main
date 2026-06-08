import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { supabaseInsert, supabaseSelect } from "../supabase.server";
import { assertEmptyHoneypot } from "../security/abuse";
import { enforceDistributedRateLimit } from "../security/rate-limit.server";

const bookingInputSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number."),
  email: z.string().trim().email().optional().or(z.literal("")),
  service: z.string().trim().min(2).max(160),
  date: z.string().trim().min(10).max(10),
  time: z.string().trim().min(1).max(32),
  notes: z.string().trim().max(1000).optional().default(""),
  honeypot: z.string().optional().default(""),
});

type BookingRow = {
  id: number;
  booking_code: string;
  customer_name: string;
  phone: string;
  email: string | null;
  service_name: string;
  booking_date: string;
  booking_time: string;
  notes: string | null;
  status: string;
  source: string;
  created_at: string;
};

function generateBookingCode() {
  return `EM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export const createBookingRequest = createServerFn({ method: "POST" })
  .inputValidator(bookingInputSchema)
  .handler(async ({ data }) => {
    await enforceDistributedRateLimit("bookings");
    assertEmptyHoneypot(data.honeypot);

    const bookingCode = generateBookingCode();
    const [row] = await supabaseInsert<BookingRow>("bookings", {
      booking_code: bookingCode,
      customer_name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      service_name: data.service.trim(),
      booking_date: data.date,
      booking_time: data.time,
      notes: data.notes?.trim() || null,
      status: "pending",
      source: "website",
    });

    return {
      bookingCode: row.booking_code,
    };
  });

export const listBookings = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await supabaseSelect<BookingRow>(
    "bookings?select=id,booking_code,customer_name,phone,email,service_name,booking_date,booking_time,notes,status,source,created_at&order=created_at.desc",
  );

  return rows.map((row) => ({
    id: row.booking_code,
    name: row.customer_name,
    service: row.service_name,
    date: row.booking_date,
    time: row.booking_time,
    status: (row.status.charAt(0).toUpperCase() + row.status.slice(1)) as
      | "Pending"
      | "Approved"
      | "Rejected"
      | "Rescheduled"
      | "Completed",
    phone: row.phone,
  }));
});
