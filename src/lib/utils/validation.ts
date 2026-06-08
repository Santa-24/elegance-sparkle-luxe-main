// ============================================
// VALIDATION UTILITIES - Input Validation
// ============================================

/**
 * Validate Indian phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Indian phone number validation (10 digits, optionally with +91)
  const phoneRegex = /^(?:\+91)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
}

/**
 * Parse phone number to standard format
 */
export function parsePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+${cleaned}`;
  }
  return phone;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get status badge color class
 */
export function getStatusColor(
  status: string,
):
  | "bg-emerald-500/15 text-emerald-700"
  | "bg-rose-500/15 text-rose-700"
  | "bg-[var(--gold)]/20 text-[var(--royal)]"
  | "bg-sky-500/15 text-sky-700" {
  switch (status?.toLowerCase()) {
    case "approved":
    case "active":
    case "visible":
    case "paid":
    case "completed":
      return "bg-emerald-500/15 text-emerald-700";
    case "rejected":
    case "paused":
    case "draft":
    case "cancelled":
    case "failed":
      return "bg-rose-500/15 text-rose-700";
    case "scheduled":
    case "rescheduled":
    case "pending":
      return "bg-[var(--gold)]/20 text-[var(--royal)]";
    default:
      return "bg-sky-500/15 text-sky-700";
  }
}
