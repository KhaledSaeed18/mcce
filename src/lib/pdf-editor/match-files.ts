import { isSolutionName } from "./file-chip";
import { stripPdfExtension } from "./file-name";
import type { EditorTreeNode } from "./types";

const SOLUTION_TAGS = /\[[^\]]*(?:solution|solved)[^\]]*\]/gi;
const COURSE_CODE = /\b[A-Z]{3,4}\d{3}[A-Z]?\b/g;
const NOT_LETTER_OR_DIGIT = /[^a-z0-9]+/g;

/** A name with what differs between a paper and its solution taken out:
 * the solution tag, the course code, case, and punctuation. */
function matchKey(name: string): string {
  return stripPdfExtension(name)
    .replace(SOLUTION_TAGS, "")
    .replace(COURSE_CODE, "")
    .toLowerCase()
    .replace(NOT_LETTER_OR_DIGIT, "");
}

/** Lower is better: the same folder first, then the shorter name, so a
 * plain [Solution] comes before a [Detailed Solution]. */
function rank(file: EditorTreeNode, candidate: EditorTreeNode): number {
  const otherFolder = candidate.parentId === file.parentId ? 0 : 1;
  return otherFolder * 1000 + candidate.name.length;
}

/**
 * The solution for a paper, or the paper for a solution. They share a name
 * once the solution tag and course code are left out, a course, and a
 * material type, which keeps lecture slides from pairing with the solution
 * to a self-assessment of the same name.
 */
export function findMatchingFile(
  nodes: EditorTreeNode[],
  file: EditorTreeNode
): EditorTreeNode | null {
  const key = matchKey(file.name);
  const wantsSolution = !isSolutionName(file.name);
  let best: EditorTreeNode | null = null;
  for (const node of nodes) {
    const isCandidate =
      node.kind === "pdf" &&
      node.id !== file.id &&
      node.courseCode === file.courseCode &&
      node.materialType === file.materialType &&
      isSolutionName(node.name) === wantsSolution &&
      matchKey(node.name) === key;
    if (isCandidate && (!best || rank(file, node) < rank(file, best))) {
      best = node;
    }
  }
  return best;
}
