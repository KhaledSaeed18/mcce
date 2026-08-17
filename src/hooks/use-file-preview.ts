import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";
import type { DriveNode } from "@/lib/drive/types";

/**
 * Resolves the previewed file from the URL rather than component state, so a
 * preview can be linked to and the back button closes it.
 */
export function useFilePreview(nodes: DriveNode[]) {
  const requestedId = useSearch({
    select: (search: Record<string, unknown>) =>
      typeof search.file === "string" ? search.file : undefined,
    strict: false,
  });
  const navigate = useNavigate();

  const node = useMemo(
    () => nodes.find((candidate) => candidate.id === requestedId) ?? null,
    [nodes, requestedId]
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        return;
      }
      // Replace, so one browsing session does not stack a history entry per preview.
      navigate({
        replace: true,
        search: (prev: Record<string, unknown>) => ({
          ...prev,
          file: undefined,
        }),
        to: ".",
      });
    },
    [navigate]
  );

  return { handleOpenChange, node, requestedId };
}
