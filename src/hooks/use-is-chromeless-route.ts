import { useRouterState } from "@tanstack/react-router";
import { CHROMELESS_ROUTE_PREFIXES } from "@/config/navigation";

/** The editor fills the viewport, so the site chrome would only steal height from it. */
export function useIsChromelessRoute(): boolean {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return CHROMELESS_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
}
