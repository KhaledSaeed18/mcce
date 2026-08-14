import type { RoadmapGraph } from "./roadmap-graph";

export interface RoadmapTrace {
  /** Courses required before the focused course, directly or transitively. */
  needs: Set<string>;
  /** Courses that depend on the focused course, directly or transitively. */
  unlocks: Set<string>;
}

/** Walks the dependency graph from a course in both directions to find its full requirement chain. */
export function traceRoadmap(
  graph: RoadmapGraph,
  focusCode: string
): RoadmapTrace {
  const needs = new Set<string>();
  const unlocks = new Set<string>();

  const backward = [focusCode];
  while (backward.length > 0) {
    const code = backward.pop();
    if (!code) {
      continue;
    }
    for (const edge of graph.edges) {
      if (edge.to === code && !needs.has(edge.from)) {
        needs.add(edge.from);
        backward.push(edge.from);
      }
    }
  }

  const forward = [focusCode];
  while (forward.length > 0) {
    const code = forward.pop();
    if (!code) {
      continue;
    }
    for (const edge of graph.edges) {
      if (edge.from === code && !unlocks.has(edge.to)) {
        unlocks.add(edge.to);
        forward.push(edge.to);
      }
    }
  }

  return { needs, unlocks };
}
