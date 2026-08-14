import { describe, expect, it } from "vitest";
import { CURRICULUM } from "@/config/curriculum";
import { buildRoadmapGraph } from "./roadmap-graph";
import {
  buildRoadmapLayout,
  ROADMAP_NODE_HEIGHT,
  ROADMAP_NODE_WIDTH,
} from "./roadmap-layout";
import { traceRoadmap } from "./roadmap-trace";

describe("buildRoadmapGraph", () => {
  it("places one node per course plus a node for requirements outside the plan", () => {
    const graph = buildRoadmapGraph(CURRICULUM);

    const inPlan = graph.nodes.filter((node) => !node.isMissing).length;
    const missing = graph.nodes.filter((node) => node.isMissing);

    expect(inPlan).toBe(18);
    expect(missing).toHaveLength(1);
    expect(missing[0]?.code).toBe("EENG577");
  });

  it("points every requirement edge at the course that needs it", () => {
    const graph = buildRoadmapGraph(CURRICULUM);
    const codes = new Set(graph.nodes.map((node) => node.code));

    for (const edge of graph.edges) {
      expect(codes.has(edge.to)).toBe(true);
      expect(codes.has(edge.from)).toBe(true);
    }
  });

  it("marks outside references so they can be drawn differently", () => {
    const graph = buildRoadmapGraph(CURRICULUM);
    const outside = graph.edges.filter((edge) => edge.kind === "outside");
    expect(outside.some((edge) => edge.to === "CENG645")).toBe(true);
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
