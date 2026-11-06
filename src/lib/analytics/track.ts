type AnalyticsParams = Record<string, string | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: AnalyticsParams) => void;
  }
}

export function trackEvent(name: string, params?: AnalyticsParams) {
  window.gtag?.("event", name, params);
}

/** Sent without the query string, so previews and share links stay out of page views. */
export function trackPageView(pathname: string) {
  trackEvent("page_view", {
    page_location: `${window.location.origin}${pathname}`,
    page_title: document.title,
  });
}
