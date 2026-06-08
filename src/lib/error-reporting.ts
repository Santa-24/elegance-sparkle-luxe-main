type ErrorReportingOptions = {
  extra?: Record<string, unknown>;
};

type ErrorReportingEvents = {
  captureException?: (error: unknown, options?: ErrorReportingOptions) => void;
};

declare global {
  interface Window {
    __appErrorEvents?: ErrorReportingEvents;
  }
}

export function reportAppError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.__appErrorEvents?.captureException?.(error, {
    extra: context,
  });
}
