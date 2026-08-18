import { useRouterState } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { findActiveNavGroupValue } from "@/lib/nav-groups";

/** One group open at a time, starting on whichever group holds the current page. */
export function useNavAccordion() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [expandedValue, setExpandedValue] = useState<string | null>(() =>
    findActiveNavGroupValue(pathname)
  );

  const toggleGroup = useCallback((value: string) => {
    setExpandedValue((previous) => (previous === value ? null : value));
  }, []);

  return {
    activeGroupValue: findActiveNavGroupValue(pathname),
    expandedValue,
    toggleGroup,
  };
}
