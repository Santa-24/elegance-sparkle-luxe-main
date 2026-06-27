// ============================================
// FORMATTING UTILITIES - Display & Conversion
// ============================================

/**
 * Format date for display
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Format date and time for display
 */
export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

/**
 * Format currency for Indian Rupees
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

/**
 * Generate a customer-friendly booking reference
 */
export function generateBookingCode(): string {
  const date = new Date();
  const timestamp = date.getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `EM-${timestamp}-${random}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Get countdown days from a validity string/date
 */
export function getCountdownDays(validity?: string): number {
  if (!validity) {
    return 15;
  }

  const dates = validity.match(/\d{4}-\d{2}-\d{2}/g);
  const endDate = dates?.[dates.length - 1];
  if (!endDate) {
    return 15;
  }

  const target = new Date(`${endDate}T23:59:59`);
  if (Number.isNaN(target.getTime())) {
    return 15;
  }

  return Math.max(1, Math.ceil((target.getTime() - Date.now()) / 86400000));
}
