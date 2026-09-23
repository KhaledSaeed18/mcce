import { describe, expect, it } from "vitest";
import { findMatches, groupHitsByPosition } from "./find-matches";
import { buildPageText } from "./page-text";

const PAGE_ONE = buildPageText([
  { str: "Embedded Systems" },
  { str: " " },
  { hasEOL: true, str: "final exam" },
  { str: "Real time" },
]);

const PAGE_TWO = buildPageText([{ str: "An embedded controller" }]);

describe("buildPageText", () => {
  it("runs the items together, lowercased, keeping where each one starts", () => {
    expect(PAGE_ONE.text).toBe("embedded systems final exam real time");
    expect(PAGE_ONE.itemStarts).toEqual([0, 16, 17, 28]);
  });
});

describe("findMatches", () => {
  it("finds a word on every page, ignoring case, in page order", () => {
    const matches = findMatches([PAGE_ONE, PAGE_TWO], "EMBEDDED");
    expect(matches.map((match) => match.position)).toEqual([0, 1]);
    expect(matches[0]).toMatchObject({
      end: { item: 0, offset: 8 },
      start: { item: 0, offset: 0 },
    });
  });

  it("traces a match that crosses items back to both of them", () => {
    const [match] = findMatches([PAGE_ONE], "systems final");
    expect(match.start).toEqual({ item: 0, offset: 9 });
    expect(match.end).toEqual({ item: 2, offset: 5 });
  });

  it("keeps words either side of a line break apart", () => {
    expect(findMatches([PAGE_ONE], "examreal")).toHaveLength(0);
    expect(findMatches([PAGE_ONE], "exam real")).toHaveLength(1);
  });

  it("skips pages whose text is not read yet, keeping the others' positions", () => {
    const matches = findMatches([undefined, PAGE_TWO], "embedded");
    expect(matches.map((match) => match.position)).toEqual([1]);
  });

  it("finds nothing for an empty or blank query", () => {
    expect(findMatches([PAGE_ONE], "")).toEqual([]);
    expect(findMatches([PAGE_ONE], "   ")).toEqual([]);
  });

  it("does not count overlapping repeats twice", () => {
    const page = buildPageText([{ str: "aaaa" }]);
    expect(findMatches([page], "aa")).toHaveLength(2);
  });
});

describe("groupHitsByPosition", () => {
  it("gives each page its own matches and marks the one being read", () => {
    const matches = findMatches([PAGE_ONE, PAGE_TWO], "embedded");
    const hits = groupHitsByPosition(matches, 1);
    expect(hits.get(0)?.map((hit) => hit.isCurrent)).toEqual([false]);
    expect(hits.get(1)?.map((hit) => hit.isCurrent)).toEqual([true]);
  });
});
