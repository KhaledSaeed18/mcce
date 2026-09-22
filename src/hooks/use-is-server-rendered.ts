import { useState } from "react";
import { useIsHydrated } from "@/hooks/use-is-hydrated";

/**
 * Whether this component was part of the server HTML. Fixed at mount, so it
 * stays true after hydration and is false for anything mounted later, such as
 * the next page after a client-side navigation.
 *
 * Entrance animations use it to skip their hidden starting state: that state
 * would otherwise be baked into the HTML and keep the page blank until the
 * scripts arrive, which on a slow connection can take several seconds.
 */
export function useIsServerRendered(): boolean {
  const isHydrated = useIsHydrated();
  const [isServerRendered] = useState(!isHydrated);
  return isServerRendered;
}
