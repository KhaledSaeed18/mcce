import { useHydrated } from "@tanstack/react-router";

/**
 * Prerendered pages are built without a query string, so URL state applies only
 * after hydration, or the first client render would not match the static HTML.
 */
export function useHydratedSearch<T extends object>(search: T): Partial<T> {
  return useHydrated() ? search : {};
}
