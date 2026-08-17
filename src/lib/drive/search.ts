import { compareNaturally } from "./natural-sort";
import { scoreNode } from "./search-score";
import type { DriveNode } from "./types";

const WHITESPACE = /\s+/;

interface ScoredNode {
  node: DriveNode;
  score: number;
}

function compareScored(a: ScoredNode, b: ScoredNode): number {
  if (a.score !== b.score) {
    return b.score - a.score;
  }
  // A folder is a detour on the way to a file, so it loses the tie.
  const folderDelta =
    Number(a.node.kind === "folder") - Number(b.node.kind === "folder");
  if (folderDelta !== 0) {
    return folderDelta;
  }
  return compareNaturally(a.node.name, b.node.name);
}

/**
 * Matches every whitespace-separated token against a node's name, path, and
 * course code, ranked by where each token hit. Tokens rather than one substring,
 * so "507 final" finds what no folder or file is literally named.
 */
export function searchNodes(nodes: DriveNode[], query: string): DriveNode[] {
  const tokens = query.trim().toLowerCase().split(WHITESPACE).filter(Boolean);
  if (tokens.length === 0) {
    return nodes;
  }

  const scored: ScoredNode[] = [];
  for (const node of nodes) {
    const score = scoreNode(node, tokens);
    if (score > 0) {
      scored.push({ node, score });
    }
  }

  return scored.sort(compareScored).map((entry) => entry.node);
}
