import { compareNaturally } from "@/lib/drive/natural-sort";
import type { EditorTreeNode } from "./types";

interface QuickOpenGroups {
  /** The rest of the course being read. */
  course: EditorTreeNode[];
  /** The folder of the file being read, first, since the next file is most
   * often beside it: an exam's solution, a lecture's exercises. */
  folder: EditorTreeNode[];
  others: EditorTreeNode[];
}

type Place = Pick<EditorTreeNode, "courseCode" | "parentId">;

function byCourseThenName(a: EditorTreeNode, b: EditorTreeNode): number {
  return (
    compareNaturally(a.courseCode ?? "", b.courseCode ?? "") ||
    compareNaturally(a.name, b.name)
  );
}

/** Every PDF in the index, split into the folder and the course of the file
 * being read, and the rest. */
export function groupQuickOpenFiles(
  nodes: EditorTreeNode[],
  place: Place | null
): QuickOpenGroups {
  const groups: QuickOpenGroups = { course: [], folder: [], others: [] };
  for (const node of nodes) {
    if (node.kind !== "pdf") {
      continue;
    }
    if (place && node.parentId === place.parentId) {
      groups.folder.push(node);
    } else if (place?.courseCode && node.courseCode === place.courseCode) {
      groups.course.push(node);
    } else {
      groups.others.push(node);
    }
  }
  groups.folder.sort(byCourseThenName);
  groups.course.sort(byCourseThenName);
  groups.others.sort(byCourseThenName);
  return groups;
}
