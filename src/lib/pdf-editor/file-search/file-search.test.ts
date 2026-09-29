import { describe, expect, it } from "vitest";
import { findLayoutMatches } from "../find-matches";
import { buildPageText, lowercaseInPlace } from "../page-text";
import type { EditorPage, EditorTreeNode, OpenFile } from "../types";
import { findExamSolutionIds } from "./exam-solutions";
import { findFileHits } from "./file-hits";
import { buildSnippet } from "./file-snippet";
import { findTextVersion } from "./text-version";

const PAGES = [
  "Sampling a signal. The signal is band limited.",
  "No match here.",
  "Signal to noise ratio",
];
const LOWERED = PAGES.map(lowercaseInPlace);

function page(sourceIndex: number, extra: Partial<EditorPage> = {}) {
  return { id: `p${sourceIndex}`, rotation: 0, sourceIndex, ...extra };
}

const IN_ORDER = [page(0), page(1), page(2)];

describe("findFileHits", () => {
  it("counts every match, ignoring case, page by page", () => {
    const { count, hits } = findFileHits(LOWERED, IN_ORDER, " SIGNAL ", 10);

    expect(count).toBe(3);
    expect(hits.map((hit) => [hit.position, hit.offset])).toEqual([
      [0, 11],
      [0, 23],
      [2, 0],
    ]);
    expect(hits.map((hit) => hit.matchIndex)).toEqual([0, 1, 2]);
  });

  it("follows pages moved, removed, or added, and lists only up to the limit", () => {
    const layout = [page(2), page(1, { sheet: "blank" }), page(0)];

    const { count, hits } = findFileHits(LOWERED, layout, "signal", 2);

    expect(count).toBe(3);
    expect(hits).toEqual([
      { matchIndex: 0, offset: 0, position: 0, sourceIndex: 2 },
      { matchIndex: 1, offset: 11, position: 2, sourceIndex: 0 },
    ]);
  });

  it("numbers matches as the pane's own search does", () => {
    const layout = [page(2), page(0)];
    const texts = PAGES.map((text) => buildPageText([{ str: text }]));

    const own = findLayoutMatches(layout, texts, "signal");
    const { hits } = findFileHits(LOWERED, layout, "signal", 10);

    expect(hits.map((hit) => hit.position)).toEqual(
      own.map((match) => match.position)
    );
  });

  it("finds nothing for an empty query", () => {
    expect(findFileHits(LOWERED, IN_ORDER, "  ", 10)).toEqual({
      count: 0,
      hits: [],
    });
  });
});

describe("buildSnippet", () => {
  it("keeps the whole line when it is short", () => {
    expect(buildSnippet("Signal to  noise ratio", 0, 6)).toEqual({
      after: " to noise ratio",
      before: "",
      match: "Signal",
    });
  });

  it("cuts a long line at a space either side of the match", () => {
    const words = Array.from({ length: 40 }, (_, i) => `word${i}`).join(" ");
    const text = `${words} target ${words}`;
    const { after, before, match } = buildSnippet(
      text,
      text.indexOf("target"),
      6
    );

    expect(match).toBe("target");
    expect(before.startsWith("…word")).toBe(true);
    expect(after.endsWith("…")).toBe(true);
    expect(after.slice(0, -1).endsWith(" ")).toBe(false);
  });
});

function node(id: string, name: string): EditorTreeNode {
  return {
    courseCode: "EENG527",
    id,
    kind: "pdf",
    materialType: "exam",
    modifiedTime: "2026-01-01T00:00:00.000Z",
    name,
    parentId: "exams",
  };
}

function open(id: string, name: string): OpenFile {
  return { id, name, source: "drive" };
}

describe("findExamSolutionIds", () => {
  const nodes = [
    node("paper", "Final.pdf"),
    node("solution", "[Solution]Final.pdf"),
  ];
  const files = [
    open("paper", "Final.pdf"),
    open("solution", "[Solution]Final.pdf"),
  ];

  it("leaves out the solution of a paper whose exam is running", () => {
    const ids = findExamSolutionIds(files, nodes, (id) => id === "paper");
    expect([...ids]).toEqual(["solution"]);
  });

  it("leaves out nothing when no exam runs", () => {
    expect(findExamSolutionIds(files, nodes, () => false).size).toBe(0);
  });
});

describe("findTextVersion", () => {
  it("reads the index's modified time, or a fixed one for a local file", () => {
    const paper = node("paper", "Final.pdf");
    expect(findTextVersion(open("paper", "Final.pdf"), paper)).toBe(
      paper.modifiedTime
    );
    expect(
      findTextVersion(
        { id: "local-1", name: "Notes.pdf", source: "local" },
        undefined
      )
    ).toBe("local");
  });
});
