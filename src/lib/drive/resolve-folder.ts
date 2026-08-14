import { DRIVE_SOURCES } from "@/config/sources";
import type { DriveIndex, DriveNode } from "./types";

export interface FolderMeta {
  node: DriveNode | null;
  source: (typeof DRIVE_SOURCES)[number];
  title: string;
}

export function resolveFolderMeta(
  driveIndex: DriveIndex,
  folderId: string
): FolderMeta | null {
  const currentNode = driveIndex.nodes.find((node) => node.id === folderId);
  const source = currentNode
    ? DRIVE_SOURCES.find((s) => s.id === currentNode.sourceId)
    : DRIVE_SOURCES.find((s) => s.rootFolderId === folderId);

  if (!source) {
    return null;
  }

  return {
    node: currentNode ?? null,
    source,
    title: currentNode?.name ?? source.label,
  };
}

export function buildFolderDescription(meta: FolderMeta): string {
  return `${meta.title}: course materials for the LIU M.S. in Computer and Communication Engineering program, under ${meta.source.label}.`;
}
