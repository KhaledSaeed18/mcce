import { compareNaturally } from "@/lib/drive/natural-sort";
import type { EditorTreeNode } from "./types";

interface QuickOpenGroups {
  /** The course being read, first, since the next file is most often there. */
  course: EditorTreeNode[];
  others: EditorTreeNode[];
}

function byCourseThenName(a: EditorTreeNode, b: EditorTreeNode): number {
  return (
    compareNaturally(a.courseCode ?? "", b.courseCode ?? "") ||
    compareNaturally(a.name, b.name)
  );
}

/** Every PDF in the index, split into the course being read and the rest. */
export function groupQuickOpenFiles(
  nodes: EditorTreeNode[],
  courseCode: string | null
): QuickOpenGroups {
  const pdfs = nodes.filter((node) => node.kind === "pdf");
  const isInCourse = (node: EditorTreeNode) =>
    courseCode !== null && node.courseCode === courseCode;
  return {
    course: pdfs.filter(isInCourse).sort(byCourseThenName),
    others: pdfs.filter((node) => !isInCourse(node)).sort(byCourseThenName),
  };
}
