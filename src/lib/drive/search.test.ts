import { describe, expect, it } from "vitest";
import { searchNodes } from "./search";
import { makeNode } from "./test-fixtures";

describe("searchNodes", () => {
  const nodes = [
    makeNode({ id: "1", name: "Lecture6.pptx" }),
    makeNode({ courseCode: "EENG537", id: "2", name: "syllabus.pdf" }),
    makeNode({
      id: "3",
      name: "notes.txt",
      pathNames: ["Fall Semester", "Digital Communications", "notes.txt"],
    }),
  ];

  it("returns everything for an empty query", () => {
    expect(searchNodes(nodes, "  ")).toHaveLength(3);
  });

  it("matches by name, case-insensitively", () => {
    expect(searchNodes(nodes, "LECTURE6").map((n) => n.id)).toEqual(["1"]);
  });

  it("matches by course code", () => {
    expect(searchNodes(nodes, "eeng537").map((n) => n.id)).toEqual(["2"]);
  });

  it("matches by breadcrumb path", () => {
    expect(
      searchNodes(nodes, "digital communications").map((n) => n.id)
    ).toEqual(["3"]);
  });

  it("matches tokens in any order and across fields", () => {
    const tokenNodes = [
      makeNode({
        courseCode: "CENG507",
        id: "paper",
        name: "Final.pdf",
        pathNames: ["CENG507 - Embedded Systems", "Exams", "Final.pdf"],
      }),
    ];

    expect(searchNodes(tokenNodes, "507 final").map((n) => n.id)).toEqual([
      "paper",
    ]);
    expect(searchNodes(tokenNodes, "final 507").map((n) => n.id)).toEqual([
      "paper",
    ]);
  });

  it("requires every token to match, so more words narrow the result", () => {
    const tokenNodes = [
      makeNode({ id: "a", name: "Final.pdf" }),
      makeNode({ id: "b", name: "Final Solution.pdf" }),
    ];

    expect(searchNodes(tokenNodes, "final solution").map((n) => n.id)).toEqual([
      "b",
    ]);
  });

  it("ranks a name hit above a path hit", () => {
    const ranked = [
      makeNode({
        id: "path-hit",
        name: "readme.txt",
        pathNames: ["Midterm", "readme.txt"],
      }),
      makeNode({ id: "name-hit", name: "Midterm.pdf" }),
    ];

    expect(searchNodes(ranked, "midterm").map((n) => n.id)).toEqual([
      "name-hit",
      "path-hit",
    ]);
  });

  it("ranks a whole word above the middle of one", () => {
    const ranked = [
      makeNode({ id: "partial", name: "prelab2.pdf" }),
      makeNode({ id: "word", name: "lab2.pdf" }),
    ];

    expect(searchNodes(ranked, "lab2").map((n) => n.id)).toEqual([
      "word",
      "partial",
    ]);
  });

  it("puts a file above a folder that scores the same", () => {
    const ranked = [
      makeNode({ id: "folder", kind: "folder", name: "Midterm" }),
      makeNode({ id: "file", kind: "pdf", name: "Midterm" }),
    ];

    expect(searchNodes(ranked, "midterm").map((n) => n.id)).toEqual([
      "file",
      "folder",
    ]);
  });

  it("orders equal matches naturally", () => {
    const ranked = [
      makeNode({ id: "v10", name: "V10-Assessment.pdf" }),
      makeNode({ id: "v2", name: "V2-Assessment.pdf" }),
    ];

    expect(searchNodes(ranked, "assessment").map((n) => n.id)).toEqual([
      "v2",
      "v10",
    ]);
  });
});

describe("searchNodes synonyms", () => {
  const nodes = [
    makeNode({
      id: "lecture",
      name: "Lecture 03.pdf",
      pathNames: [
        "First Year | Fall Semester",
        "CENG507 - Embedded Systems",
        "Lectures",
        "Lecture 03.pdf",
      ],
    }),
    makeNode({
      id: "assessment",
      name: "V1-Assessment1-Spring-2025-2026.pdf",
      pathNames: [
        "First Year | Spring Semester",
        "CENG566 - Machine Learning",
        "Assessments",
        "V1-Assessment1-Spring-2025-2026.pdf",
      ],
    }),
  ];

  it("still finds lectures under the folder name they used to have", () => {
    expect(searchNodes(nodes, "material").map((n) => n.id)).toEqual([
      "lecture",
    ]);
    expect(searchNodes(nodes, "slides").map((n) => n.id)).toEqual(["lecture"]);
  });

  it("finds assessments by the word students actually use", () => {
    expect(searchNodes(nodes, "quiz").map((n) => n.id)).toEqual(["assessment"]);
  });

  it("keeps requiring every token to match", () => {
    expect(searchNodes(nodes, "material nonsense")).toEqual([]);
  });
});
