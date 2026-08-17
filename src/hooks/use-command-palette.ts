import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecentNodes } from "@/components/providers/recent-nodes-provider";
import { COMMAND_RESULT_LIMIT } from "@/config/navigation";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { resolveNodeIds } from "@/lib/drive/by-id";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { searchNodes } from "@/lib/drive/search";
import type { DriveNode } from "@/lib/drive/types";

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: driveIndex } = useQuery(driveIndexQueryOptions);
  const [playClick] = useSound(clickSoftSound, { volume: 0.4 });
  const { ids: recentIds } = useRecentNodes();

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        playClick();
      }
      setOpen(nextOpen);
    },
    [playClick]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        handleOpenChange(!open);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleOpenChange]);

  const results = useMemo(() => {
    if (!(driveIndex && query.trim())) {
      return [];
    }
    return searchNodes(driveIndex.nodes, query).slice(0, COMMAND_RESULT_LIMIT);
  }, [driveIndex, query]);

  // The palette's empty state was blank until a key was pressed; recents give
  // the most common next action something to be.
  const recent = useMemo(
    () =>
      driveIndex && !query.trim()
        ? resolveNodeIds(driveIndex.nodes, recentIds)
        : [],
    [driveIndex, query, recentIds]
  );

  const goToNode = useCallback(
    (node: DriveNode) => {
      setOpen(false);
      setQuery("");
      if (node.kind === "folder") {
        navigate({ params: { folderId: node.id }, to: "/browse/$folderId" });
      } else if (node.parentId) {
        // Land in the folder the file lives in, with its preview open, rather
        // than leaving the site for Drive.
        navigate({
          params: { folderId: node.parentId },
          search: { file: node.id },
          to: "/browse/$folderId",
        });
      } else {
        window.open(node.webViewLink, "_blank", "noopener");
      }
    },
    [navigate]
  );

  const goToFullSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    navigate({ search: { q: query }, to: "/search" });
  }, [query, navigate]);

  return {
    goToFullSearch,
    goToNode,
    handleOpenChange,
    open,
    query,
    recent,
    results,
    setQuery,
  };
}
