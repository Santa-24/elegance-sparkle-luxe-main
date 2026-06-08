// ============================================
// ERROR CAPTURE - Error Boundary Integration
// ============================================

/**
 * Capture React error for reporting
 */
export function captureReactError(error: Error, errorInfo: { componentStack: string }) {
  console.error("React Error:", error, errorInfo);
}

/**
 * Capture unhandled promise rejection
 */
export function captureUnhandledRejection(event: PromiseRejectionEvent) {
  console.error("Unhandled Rejection:", event.reason);
}

/**
 * Setup global error handlers
 */
export function setupGlobalErrorHandlers() {
  if (typeof window !== "undefined") {
    window.addEventListener("unhandledrejection", (event) => {
      captureUnhandledRejection(event);
    });

    window.addEventListener("error", (event) => {
      console.error("Global Error:", event.error);
    });
  }
}
