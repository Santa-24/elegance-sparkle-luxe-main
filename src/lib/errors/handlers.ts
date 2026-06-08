// ============================================
// ERROR HANDLERS - Centralized Error Management
// ============================================

/**
 * Error handler for API calls
 */
export function handleApiError(error: unknown): { message: string; code?: string } {
  const errorWithCode = error as Error & { code?: string };

  if (error instanceof Error) {
    return {
      message: error.message,
      code: errorWithCode.code,
    };
  }

  if (typeof error === "string") {
    return { message: error };
  }

  if (error && typeof error === "object" && "message" in error) {
    const errorRecord = error as { message?: unknown; code?: unknown };
    return {
      message: String(errorRecord.message ?? ""),
      code: typeof errorRecord.code === "string" ? errorRecord.code : undefined,
    };
  }

  return { message: "An unexpected error occurred" };
}

/**
 * Error handler for form validation
 */
export function handleValidationError(error: unknown): Record<string, string> {
  if (error instanceof Error && error.message.includes("validation")) {
    return { general: error.message };
  }

  if (error && typeof error === "object" && "errors" in error) {
    const validationError = error as { errors?: Record<string, string> };
    return validationError.errors ?? { general: "Validation failed" };
  }

  return { general: "Validation failed" };
}

/**
 * Safe error logger
 */
export function logError(
  context: string,
  error: unknown,
  additionalInfo?: Record<string, unknown>,
) {
  console.error(`[${context}]`, error, additionalInfo);
}
