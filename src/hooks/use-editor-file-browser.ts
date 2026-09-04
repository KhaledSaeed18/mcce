import { useCallback, useMemo, useState } from "react";
import { buildChildrenMap } from "@/lib/drive/children-map";
import type { DriveNode } from "@/lib/drive/types";
import {
  buildCrumbs,
  buildRootEntries,
  toBrowserEntries,
} from "@/lib/pdf-editor/browser-entries";

/** Folder navigation inside the editor, kept out of the URL so it cannot fight the open file. */
export function useEditorFileBrowser(
  nodes: DriveNode[],
  activeNode: DriveNode | null
) {
  const [folderId, setFolderId] = useState<string | null>(
    activeNode?.parentId ?? null
  );
  const childrenMap = useMemo(() => buildChildrenMap(nodes), [nodes]);

  const entries = useMemo(
    () =>
      folderId
        ? toBrowserEntries(childrenMap.get(folderId) ?? [])
        : buildRootEntries(),
    [childrenMap, folderId]
  );

  const crumbs = useMemo(() => buildCrumbs(nodes, folderId), [folderId, nodes]);

  const openFolder = useCallback((id: string | null) => setFolderId(id), []);

  return { crumbs, entries, folderId, openFolder };
}
