import type { CurriculumCourse, CurriculumTerm, CurriculumYear } from "./types";

export type RoadmapEdgeKind = "prerequisite" | "corequisite" | "outside";

export interface RoadmapNode {
  /** Course code. For a missing node it is the code the curriculum references. */
  code: string;
  /** Index of the semester column this node belongs to. */
  column: number;
  /** Full course when the code exists in the curriculum; null when it is outside the plan. */
  course: CurriculumCourse | null;
  /** True when the code is required but not part of the curriculum. */
  isMissing: boolean;
}

export interface RoadmapEdge {
  from: string;
  kind: RoadmapEdgeKind;
  to: string;
}

export interface RoadmapColumnHeader {
  term: CurriculumTerm;
  termLabel: string;
  year: number;
  yearLabel: string;
}

export interface RoadmapGraph {
  columns: RoadmapColumnHeader[];
  edges: RoadmapEdge[];
  nodes: RoadmapNode[];
}

const MISSING_COLUMN_OFFSET = 1;

function registerRequirements(
  edges: RoadmapEdge[],
  missing: Map<string, number>,
  byCode: Map<string, CurriculumCourse>,
  kind: RoadmapEdgeKind,
  node: RoadmapNode,
  requiredCodes: string[]
): void {
  for (const code of requiredCodes) {
    const resolvedKind: RoadmapEdgeKind = byCode.has(code) ? kind : "outside";
    edges.push({ from: code, kind: resolvedKind, to: node.code });
    if (resolvedKind === "outside") {
      missing.set(code, node.column);
    }
  }
}

/** Builds a directed graph of courses where edges point from a requirement to the course that needs it. */
export function buildRoadmapGraph(years: CurriculumYear[]): RoadmapGraph {
  const byCode = new Map<string, CurriculumCourse>();
  const columns: RoadmapColumnHeader[] = [];
  const nodes: RoadmapNode[] = [];

  for (const year of years) {
    for (const semester of year.semesters) {
      const column = columns.length;
      columns.push({
        term: semester.term,
        termLabel: semester.label,
        year: year.year,
        yearLabel: year.label,
      });
      for (const course of semester.courses) {
        byCode.set(course.code, course);
        nodes.push({
          code: course.code,
          column,
          course,
          isMissing: false,
        });
      }
    }
  }

  const edges: RoadmapEdge[] = [];
  const missing = new Map<string, number>();

  for (const node of nodes) {
    const { course } = node;
    if (!course) {
      continue;
    }
    registerRequirements(
      edges,
      missing,
      byCode,
      "prerequisite",
      node,
      course.prerequisites
    );
    registerRequirements(
      edges,
      missing,
      byCode,
      "corequisite",
      node,
      course.corequisites
    );
  }

  for (const [code, column] of missing) {
    nodes.push({
      code,
      column: Math.max(0, column - MISSING_COLUMN_OFFSET),
      course: null,
      isMissing: true,
    });
  }

  return { columns, edges, nodes };
}
