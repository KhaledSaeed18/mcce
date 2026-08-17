import { describe, expect, it } from "vitest";
import { makeNode } from "../../src/lib/drive/test-fixtures";
import type { DriveIndex } from "../../src/lib/drive/types";
import { stampFirstSeen } from "./diff";

const FIRST_RUN = "2026-08-01T00:00:00.000Z";
const SECOND_RUN = "2026-08-08T00:00:00.000Z";

function makeIndex(
  nodes: DriveIndex["nodes"],
  meta: Partial<DriveIndex["meta"]>
): DriveIndex {
  return {
    meta: {
      baselineAt: FIRST_RUN,
      generatedAt: FIRST_RUN,
      sources: [],
      ...meta,
    },
    nodes,
  };
}

describe("stampFirstSeen", () => {
  it("stamps everything with the run itself when there is nothing to diff", () => {
    const result = stampFirstSeen(
      [makeNode({ id: "a" }), makeNode({ id: "b" })],
      null,
      FIRST_RUN
    );

    expect(result.baselineAt).toBe(FIRST_RUN);
    expect(result.nodes.map((node) => node.firstSeenAt)).toEqual([
      FIRST_RUN,
      FIRST_RUN,
    ]);
  });

  it("carries an earlier stamp forward and dates only the new ids", () => {
    const previous = makeIndex(
      [{ ...makeNode({ id: "old" }), firstSeenAt: FIRST_RUN }],
      {}
    );

    const result = stampFirstSeen(
      [makeNode({ id: "old" }), makeNode({ id: "new" })],
      previous,
      SECOND_RUN
    );

    expect(result.nodes.map((node) => node.firstSeenAt)).toEqual([
      FIRST_RUN,
      SECOND_RUN,
    ]);
  });

  it("keeps the baseline of the first run across later syncs", () => {
    const previous = makeIndex([], { generatedAt: SECOND_RUN });

    expect(
      stampFirstSeen([], previous, "2026-08-15T00:00:00.000Z").baselineAt
    ).toBe(FIRST_RUN);
  });

  it("dates a node the previous sync never saw, even if Drive says it is old", () => {
    const previous = makeIndex([], {});

    const result = stampFirstSeen(
      [makeNode({ id: "moved-in", modifiedTime: "2020-01-01T00:00:00.000Z" })],
      previous,
      SECOND_RUN
    );

    expect(result.nodes[0].firstSeenAt).toBe(SECOND_RUN);
  });
});
