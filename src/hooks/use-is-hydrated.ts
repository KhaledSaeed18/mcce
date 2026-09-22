import { useSyncExternalStore } from "react";

function subscribe() {
  // Nothing to subscribe to: React moves from the server snapshot to the
  // client one on its own once hydration completes.
  return () => undefined;
}

/** False on the server and during hydration, true on every render after. */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
