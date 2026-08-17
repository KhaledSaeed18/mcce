import { describe, expect, it } from "vitest";
import { buildRecentBatches } from "./recent";
import { makeNode } from "./test-fixtures";
import type { DriveIndex, DriveNode } from "./types";

const BASELINE = "2026-08-01T00:00:00.000Z";
const RUN_TWO = "2026-08-08T00:00:00.000Z";
const RUN_THREE = "2026-08-15T00:00:00.000Z";

function makeIndex(nodes: DriveNode[]): DriveIndex {
  return {
    meta: { baselineAt: BASELINE, generatedAt: RUN_THREE, sources: [] },
    nodes,
  };
}

describe("buildRecentBatches", () => {
  it("excludes everything stamped by the baseline run", () => {
    const index = makeIndex([
      makeNode({ firstSeenAt: BASELINE, id: "a", kind: "pdf" }),
      makeNode({ firstSeenAt: BASELINE, id: "b", kind: "pdf" }),
    ]);

    expect(buildRecentBatches(index)).toEqual([]);
  });

  it("groups by sync run, newest first", () => {
    const index = makeIndex([
      makeNode({ firstSeenAt: RUN_TWO, id: "older", kind: "pdf" }),
      makeNode({ firstSeenAt: RUN_THREE, id: "newer", kind: "pdf" }),
      makeNode({ firstSeenAt: BASELINE, id: "original", kind: "pdf" }),
    ]);

    const batches = buildRecentBatches(index);

    expect(batches.map((batch) => batch.addedAt)).toEqual([RUN_THREE, RUN_TWO]);
    expect(batches.map((batch) => batch.total)).toEqual([1, 1]);
  });

  it("leaves folders out, since a new folder is not new material", () => {
    const index = makeIndex([
      makeNode({ firstSeenAt: RUN_TWO, id: "folder", kind: "folder" }),
      makeNode({ firstSeenAt: RUN_TWO, id: "file", kind: "pdf" }),
    ]);

    expect(buildRecentBatches(index)[0].courses[0].items).toHaveLength(1);
  });

  it("groups a run by course and labels files that belong to none", () => {
    const index = makeIndex([
      makeNode({
        courseCode: "EENG537",
        courseName: "Digital Communications",
        firstSeenAt: RUN_TWO,
        id: "1",
        kind: "pdf",
        name: "b.pdf",
      }),
      makeNode({
        courseCode: "CENG507",
        courseName: "Embedded Systems",
        firstSeenAt: RUN_TWO,
        id: "2",
        kind: "pdf",
        name: "a.pdf",
      }),
      makeNode({ firstSeenAt: RUN_TWO, id: "3", kind: "pdf", name: "c.pdf" }),
    ]);

    expect(buildRecentBatches(index)[0].courses.map((c) => c.code)).toEqual([
      "CENG507",
      "EENG537",
      "Program files",
    ]);
  });
});
