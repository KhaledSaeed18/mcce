import { useEffect } from "react";

/** Registers the offline-caching service worker once the app has hydrated. */
export function useServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }
    navigator.serviceWorker.register("/sw.js");
  }, []);
}
