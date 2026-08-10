import type { DriveNode, DriveNodeKind } from "./types";

export interface FacetOptions {
  courses: Array<{ code: string; name: string | null }>;
  kinds: DriveNodeKind[];
  semesters: string[];
}

/** Distinct filter values seen across a node set, for populating filter controls. */
export function buildFacetOptions(nodes: DriveNode[]): FacetOptions {
  const semesters = new Set<string>();
  const courses = new Map<string, string | null>();
  const kinds = new Set<DriveNodeKind>();

  for (const node of nodes) {
    if (node.semester) {
      semesters.add(node.semester);
    }
    if (node.courseCode) {
      courses.set(node.courseCode, node.courseName);
    }
    kinds.add(node.kind);
  }

  return {
    courses: [...courses.entries()]
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.code.localeCompare(b.code)),
    kinds: [...kinds].sort(),
    semesters: [...semesters].sort(),
  };
}
