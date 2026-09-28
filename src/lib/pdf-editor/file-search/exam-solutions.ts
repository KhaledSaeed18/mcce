import { isSolutionName } from "../file-chip";
import { findMatchingFile } from "../match-files";
import type { EditorTreeNode, OpenFile } from "../types";

/** The solutions of papers whose exam is running, which search leaves out
 * as the exam covers them. */
export function findExamSolutionIds(
  files: readonly OpenFile[],
  nodes: EditorTreeNode[],
  isExamRunning: (fileId: string) => boolean
): Set<string> {
  const ids = new Set<string>();
  for (const file of files) {
    const paper = nodes.find((node) => node.id === file.id);
    if (!(paper && isExamRunning(file.id))) {
      continue;
    }
    const solution = findMatchingFile(nodes, paper);
    if (solution && isSolutionName(solution.name)) {
      ids.add(solution.id);
    }
  }
  return ids;
}
