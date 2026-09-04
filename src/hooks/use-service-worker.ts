import { useEffect } from "react";

/**
 * Registers the offline-caching service worker once the app has hydrated.
 *
 * Only in a built app: the worker serves built assets from its cache, which in
 * development would hand back stale modules and fight the dev server over them.
 *
 * A browser may refuse to register one at all, in a private window or under a
 * policy that forbids it. Offline caching is worth having and not worth
 * reporting the loss of, so a refusal is allowed to pass rather than surfacing
 * as an unhandled rejection in the console.
 */
export function useServiceWorker() {
  useEffect(() => {
    if (!(import.meta.env.PROD && "serviceWorker" in navigator)) {
      return;
    }
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Nothing to do: the app works the same without it.
    });
  }, []);
}
