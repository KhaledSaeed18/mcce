import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics/track";

/**
 * Reports client-side navigations by path alone. A file preview changes only the
 * query string, so counting it as a page view would inflate every course page.
 * The first view is sent by the inline script in the root route.
 */
export function useAnalyticsPageView() {
  const pathname = useRouterState({
    select: (state) => state.resolvedLocation?.pathname,
  });
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (!pathname || pathname === previousPathname.current) {
      return;
    }
    const isFirstResolve = previousPathname.current === undefined;
    previousPathname.current = pathname;
    if (!isFirstResolve) {
      trackPageView(pathname);
    }
  }, [pathname]);
}
