import { DRIVE_SOURCES } from "@/config/sources";
import type { DriveNode, DriveNodeKind } from "@/lib/drive/types";

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

export function toBrowserEntries(nodes: DriveNode[]): BrowserEntry[] {
  return nodes.map((node) => ({
    id: node.id,
    isFile: node.kind !== "folder",
    kind: node.kind,
    name: node.name,
  }));
}

function findSourceCrumb(sourceId: string): BrowserCrumb | null {
  const source = DRIVE_SOURCES.find((candidate) => candidate.id === sourceId);
  return source ? { id: source.rootFolderId, name: source.label } : null;
}

export function buildCrumbs(
  nodes: DriveNode[],
  folderId: string | null
): BrowserCrumb[] {
  if (!folderId) {
    return [ROOT_CRUMB];
  }

  const current = nodes.find((node) => node.id === folderId);
  if (!current) {
    const rootSource = DRIVE_SOURCES.find(
      (source) => source.rootFolderId === folderId
    );
    return rootSource
      ? [ROOT_CRUMB, { id: folderId, name: rootSource.label }]
      : [ROOT_CRUMB];
  }

  const sourceCrumb = findSourceCrumb(current.sourceId);
  return [
    ROOT_CRUMB,
    ...(sourceCrumb ? [sourceCrumb] : []),
    ...current.pathIds.map((id, index) => ({
      id,
      name: current.pathNames[index],
    })),
  ];
}
