import { STUDY_SET_DEFAULT_NAME } from "@/config/pdf-editor";
import type { EditorTreeNode, StudySet } from "./types";

/** How a set is summed up next to its name: how many files it holds. */
export function describeStudySet(set: StudySet): string {
  const count = set.files.length;
  return `${count} ${count === 1 ? "file" : "files"}`;
}

/** A new set is named after the course of the file on screen, when it has
 * one, for the reader to change. */
export function suggestStudySetName(
  nodes: EditorTreeNode[],
  activeId: string | undefined
): string {
  const course = nodes.find((node) => node.id === activeId)?.courseCode;
  return course ?? STUDY_SET_DEFAULT_NAME;
}
