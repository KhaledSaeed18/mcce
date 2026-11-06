import { useRouterState } from "@tanstack/react-router";
import { CHROMELESS_ROUTE_PREFIXES } from "@/config/navigation";

/** The editor fills the viewport and the links page stands alone, so site chrome would only get in the way. */
export function useIsChromelessRoute(): boolean {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return CHROMELESS_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
}
