import { DRIVE_SOURCES } from "@/config/sources";
import type { DriveNodeKind } from "@/lib/drive/types";
import type { EditorTreeNode } from "./types";

export interface BrowserEntry {
  id: string;
  isFile: boolean;
  kind: DriveNodeKind;
  name: string;
}

export interface BrowserCrumb {
  id: string | null;
  name: string;
}

export const ROOT_CRUMB: BrowserCrumb = { id: null, name: "All years" };

/** The source roots are not nodes in the index, so the top level is built from config. */
export function buildRootEntries(): BrowserEntry[] {
  return DRIVE_SOURCES.map((source) => ({
    id: source.rootFolderId,
    isFile: false,
    kind: "folder",
    name: source.label,
  }));
}

export function toBrowserEntries(nodes: EditorTreeNode[]): BrowserEntry[] {
  return nodes.map((node) => ({
    id: node.id,
    isFile: node.kind !== "folder",
    kind: node.kind,
    name: node.name,
  }));
}

/** Walks up from the folder through its parents to the source root, which is not itself a node. */
export function buildCrumbs(
  nodes: EditorTreeNode[],
  folderId: string | null
): BrowserCrumb[] {
  if (!folderId) {
    return [ROOT_CRUMB];
  }

  const byId = new Map(nodes.map((node) => [node.id, node]));
  const trail: BrowserCrumb[] = [];
  let currentId: string | null = folderId;
  let current = byId.get(currentId);

  while (current) {
    trail.unshift({ id: current.id, name: current.name });
    currentId = current.parentId;
    current = currentId ? byId.get(currentId) : undefined;
  }

  const source = DRIVE_SOURCES.find(
    (candidate) => candidate.rootFolderId === currentId
  );
  const sourceCrumbs = source
    ? [{ id: source.rootFolderId, name: source.label }]
    : [];

  return [ROOT_CRUMB, ...sourceCrumbs, ...trail];
}
