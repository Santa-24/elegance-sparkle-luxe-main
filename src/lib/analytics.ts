type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Capture and persist UTM parameters in sessionStorage for attribution.
 */
export function captureUtmParameters() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const captured: Record<string, string> = {};

    utmKeys.forEach((key) => {
      const val = params.get(key);
      if (val) captured[key] = val;
    });

    if (Object.keys(captured).length > 0) {
      sessionStorage.setItem("em_utm_attribution", JSON.stringify(captured));
    }
  } catch {
    // Ignore storage restrictions
  }
}

export function getStoredUtmParameters(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const data = sessionStorage.getItem("em_utm_attribution");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const utm = getStoredUtmParameters();
  const enrichedParams = { ...utm, ...params };

  window.gtag?.("event", eventName, enrichedParams);
  window.clarity?.("event", eventName);
}

export function trackPageView(pathname: string, search = "") {
  trackEvent("page_view", {
    page_path: `${pathname}${search}`,
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}

// Specialized Conversion Events
export function trackWhatsAppClick(locationLabel: string) {
  trackEvent("whatsapp_click", { location: locationLabel });
}

export function trackPhoneClick(locationLabel: string) {
  trackEvent("phone_click", { location: locationLabel });
}

export function trackMapClick(locationLabel: string) {
  trackEvent("map_click", { location: locationLabel });
}

export function trackBookingStepComplete(stepNumber: number, serviceName?: string) {
  trackEvent("booking_step_complete", { step: stepNumber, service: serviceName });
}

export function trackLocationPageView(areaName: string) {
  trackEvent("location_page_view", { area: areaName });
}

/**
 * Defers loading GA4 and Microsoft Clarity scripts until user interaction
 * or idle callback, preserving mobile LCP and Total Blocking Time (TBT).
 */
export function initDeferredAnalytics(ga4Id?: string, clarityId?: string) {
  if (typeof window === "undefined") return;
  captureUtmParameters();

  let isLoaded = false;

  function loadAnalytics() {
    if (isLoaded) return;
    isLoaded = true;

    if (ga4Id) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", ga4Id, { send_page_view: false });
    }

    if (clarityId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      win.clarity =
        win.clarity ||
        function (...args: unknown[]) {
          (win.clarity.q = win.clarity.q || []).push(args);
        };
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${clarityId}`;
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    }

    events.forEach((evt) => window.removeEventListener(evt, onInteract));
  }

  const events = ["pointerdown", "touchstart", "scroll", "keydown"];
  function onInteract() {
    loadAnalytics();
  }

  events.forEach((evt) => window.addEventListener(evt, onInteract, { passive: true, once: true }));

  // Fallback idle load after 3.5s
  const timer = setTimeout(loadAnalytics, 3500);

  return () => {
    events.forEach((evt) => window.removeEventListener(evt, onInteract));
    clearTimeout(timer);
  };
}
