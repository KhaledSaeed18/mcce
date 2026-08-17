import type { DriveNode } from "./types";

/** The folders a node sits under, without the node itself. */
export function formatNodePath(node: DriveNode): string {
  return node.pathNames.slice(0, -1).join(" / ");
}

/**
 * Course and immediate folder, rather than the path from the root. On a card
 * the full path truncates from the left, which cuts the only part that tells
 * five folders named "MATLAB codes" apart.
 */
export function formatNodeContext(node: DriveNode): string {
  const parent = node.pathNames.at(-2) ?? "";

  if (!node.courseCode) {
    return parent;
  }
  if (parent.includes(node.courseCode)) {
    return node.courseCode;
  }
  return `${node.courseCode} · ${parent}`;
}
