type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", eventName, params);
  window.clarity?.("event", eventName);
}

export function trackPageView(pathname: string, search = "") {
  trackEvent("page_view", {
    page_path: `${pathname}${search}`,
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}
