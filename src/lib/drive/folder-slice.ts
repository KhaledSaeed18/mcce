import type { DriveNode } from "./types";

/**
 * The folder, its children, and its grandchildren: enough to render the listing
 * with a count on each subfolder, and to preview any file shown in it.
 */
export function selectFolderSlice(
  nodes: DriveNode[],
  folderId: string
): DriveNode[] {
  const childIds = new Set(
    nodes.filter((node) => node.parentId === folderId).map((node) => node.id)
  );

  return nodes.filter(
    (node) =>
      node.id === folderId ||
      node.parentId === folderId ||
      (node.parentId !== null && childIds.has(node.parentId))
  );
}
