import { TERM_RANK, UNRECORDED_TERM_LABEL } from "@/config/exams";
import { compareNaturally } from "./natural-sort";
import type { DriveNode } from "./types";

const TERM_LABEL_PATTERN = /^(?:(\w+)\s+)?(\d{4})-\d{4}$/;
const MIDTERM_PATTERN = /midterm/i;
const FINAL_PATTERN = /\bfinal\b/i;

/** Newest first, with unlabelled papers last: they cannot be placed on the timeline. */
export function compareTermLabels(a: string, b: string): number {
  if (a === UNRECORDED_TERM_LABEL || b === UNRECORDED_TERM_LABEL) {
    return a === b
      ? 0
      : Number(a === UNRECORDED_TERM_LABEL) -
          Number(b === UNRECORDED_TERM_LABEL);
  }

  const left = TERM_LABEL_PATTERN.exec(a);
  const right = TERM_LABEL_PATTERN.exec(b);
  if (!(left && right)) {
    return a.localeCompare(b);
  }

  const yearDelta = Number(right[2]) - Number(left[2]);
  if (yearDelta !== 0) {
    return yearDelta;
  }

  return (TERM_RANK[right[1]] ?? 0) - (TERM_RANK[left[1]] ?? 0);
}

function stageRank(node: DriveNode): number {
  const haystack = [...node.categoryPath, node.name].join(" ");
  if (MIDTERM_PATTERN.test(haystack)) {
    return 0;
  }
  return FINAL_PATTERN.test(haystack) ? 1 : 2;
}

/** Midterms before finals, matching the order a term is actually sat. */
export function compareExamNodes(a: DriveNode, b: DriveNode): number {
  const stageDelta = stageRank(a) - stageRank(b);
  if (stageDelta !== 0) {
    return stageDelta;
  }
  return compareNaturally(a.name, b.name);
}
