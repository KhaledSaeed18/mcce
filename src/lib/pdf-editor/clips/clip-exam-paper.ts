import { isSolutionName } from "../file-chip";
import { findMatchingFile } from "../match-files";
import type { EditorTreeNode } from "../types";
import type { EditorClip } from "./types";

/** The paper a clip's file is the solution to, whose running exam covers
 * the clip, or null for a clip from any other file. */
export function findClipExamPaper(
  clip: EditorClip,
  nodes: EditorTreeNode[]
): string | null {
  if (!isSolutionName(clip.file.name)) {
    return null;
  }
  const solution = nodes.find((node) => node.id === clip.file.id);
  const paper = solution ? findMatchingFile(nodes, solution) : null;
  return paper?.id ?? null;
}
