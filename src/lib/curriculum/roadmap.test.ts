import { describe, expect, it } from "vitest";
import { CURRICULUM } from "@/config/curriculum";
import { buildRoadmapGraph } from "./roadmap-graph";
import {
  buildRoadmapLayout,
  ROADMAP_NODE_HEIGHT,
  ROADMAP_NODE_WIDTH,
} from "./roadmap-layout";
import { traceRoadmap } from "./roadmap-trace";
import type { CurriculumCourse, CurriculumYear } from "./types";

function makeCourse(
  code: string,
  prerequisites: string[] = []
): CurriculumCourse {
  return {
    code,
    corequisites: [],
    credits: 3,
    description: null,
    kind: "course",
    name: code,
    objectives: [],
    prerequisites,
  };
}

function makeYear(courses: CurriculumCourse[]): CurriculumYear {
  return {
    id: "y1",
    label: "First Year",
    semesters: [
      { courses, id: "y1-fall", label: "Fall Semester", term: "fall" },
    ],
    year: 1,
  };
}

describe("buildRoadmapGraph", () => {
  it("places one node per course in the current plan", () => {
    const graph = buildRoadmapGraph(CURRICULUM);
    const inPlan = graph.nodes.filter((node) => !node.isMissing);

    expect(inPlan).toHaveLength(18);
    expect(graph.nodes.filter((node) => node.isMissing)).toHaveLength(0);
  });

  it("points every requirement edge at the course that needs it", () => {
    const graph = buildRoadmapGraph(CURRICULUM);
    const codes = new Set(graph.nodes.map((node) => node.code));

    for (const edge of graph.edges) {
      expect(codes.has(edge.to)).toBe(true);
      expect(codes.has(edge.from)).toBe(true);
    }
  });

  it("adds a missing node for a requirement outside the plan", () => {
    const graph = buildRoadmapGraph([
      makeYear([makeCourse("CENG600"), makeCourse("CENG601", ["EE500"])]),
    ]);

    expect(graph.nodes).toHaveLength(3);
    const missing = graph.nodes.find((node) => node.isMissing);
    expect(missing?.code).toBe("EE500");
    expect(
      graph.edges.some(
        (edge) => edge.kind === "outside" && edge.from === "EE500"
      )
    ).toBe(true);
  });
});

describe("buildRoadmapLayout", () => {
  it("gives every node and edge a coordinate that fits inside the canvas", () => {
    const graph = buildRoadmapGraph(CURRICULUM);
    const layout = buildRoadmapLayout(graph);

    expect(layout.nodes).toHaveLength(graph.nodes.length);
    expect(layout.edges).toHaveLength(graph.edges.length);

    for (const node of layout.nodes) {
      expect(node.x).toBeGreaterThanOrEqual(0);
      expect(node.y).toBeGreaterThanOrEqual(0);
      expect(node.x + ROADMAP_NODE_WIDTH).toBeLessThanOrEqual(layout.width);
      expect(node.y + ROADMAP_NODE_HEIGHT).toBeLessThanOrEqual(layout.height);
    }

    for (const edge of layout.edges) {
      expect(edge.path).toContain("M ");
    }
  });
});

describe("traceRoadmap", () => {
  it("keeps the focused course out of both sets", () => {
    const graph = buildRoadmapGraph(CURRICULUM);
    const trace = traceRoadmap(graph, "CENG646");

    expect(trace.needs.has("CENG646")).toBe(false);
    expect(trace.unlocks.has("CENG646")).toBe(false);
  });

  it("finds transitive prerequisites", () => {
    const graph = buildRoadmapGraph(CURRICULUM);
    const trace = traceRoadmap(graph, "CENG678");

    expect(trace.needs.has("CENG566")).toBe(true);
    expect(trace.needs.has("EENG527")).toBe(true);
    expect(trace.needs.has("ENGG515")).toBe(true);
  });

  it("lists the courses a prerequisite unlocks", () => {
    const graph = buildRoadmapGraph(CURRICULUM);
    const trace = traceRoadmap(graph, "CENG566");

    expect(trace.unlocks.has("CENG646")).toBe(true);
    expect(trace.unlocks.has("CENG678")).toBe(true);
  });
});
