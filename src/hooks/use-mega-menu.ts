import { useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { findActiveNavGroupValue } from "@/lib/nav-groups";

export function useMegaMenu() {
  const [openValue, setOpenValue] = useState<string | null>(null);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const handleValueChange = useCallback(
    (value: string | null) => setOpenValue(value),
    []
  );

  // The panel's links navigate through the router rather than Base UI's own
  // link part, so the menu has to be dismissed on the resulting route change.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger for closing, not read in the body
  useEffect(() => {
    setOpenValue(null);
  }, [pathname]);

  return {
    activeGroupValue: findActiveNavGroupValue(pathname),
    handleValueChange,
    openValue,
  };
}
