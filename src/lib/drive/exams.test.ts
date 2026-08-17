import { describe, expect, it } from "vitest";
import { buildExamGroups } from "./exams";
import { makeNode } from "./test-fixtures";
import type { DriveNode } from "./types";

function makeExam(id: string, overrides: Partial<DriveNode>) {
  return makeNode({
    courseCode: "EENG537",
    courseName: "Digital Communications",
    kind: "pdf",
    materialType: "exam",
    ...overrides,
    id,
  });
}

describe("buildExamGroups", () => {
  it("keeps only exam files that belong to a course", () => {
    const nodes = [
      makeExam("paper", { name: "Final.pdf" }),
      makeExam("folder", { kind: "folder", name: "Exams" }),
      makeExam("lecture", { materialType: "lecture", name: "Slides.pdf" }),
      makeExam("orphan", { courseCode: null, name: "Final.pdf" }),
    ];

    const groups = buildExamGroups(nodes);

    expect(groups).toHaveLength(1);
    expect(groups[0].total).toBe(1);
    expect(groups[0].terms[0].items.map((item) => item.id)).toEqual(["paper"]);
  });

  it("orders terms newest first, with unlabelled papers last", () => {
    const nodes = [
      makeExam("a", { name: "a.pdf", termLabel: null }),
      makeExam("b", { name: "b.pdf", termLabel: "Fall 2024-2025" }),
      makeExam("c", { name: "c.pdf", termLabel: "Spring 2025-2026" }),
      makeExam("d", { name: "d.pdf", termLabel: "Fall 2025-2026" }),
      makeExam("e", { name: "e.pdf", termLabel: "2020-2021" }),
    ];

    expect(buildExamGroups(nodes)[0].terms.map((term) => term.label)).toEqual([
      "Spring 2025-2026",
      "Fall 2025-2026",
      "Fall 2024-2025",
      "2020-2021",
      "Term not recorded",
    ]);
  });

  it("orders midterms before finals, then numbered papers by value", () => {
    const term = "Fall 2025-2026";
    const nodes = [
      makeExam("f10", { name: "V10-Final.pdf", termLabel: term }),
      makeExam("f2", { name: "V2-Final.pdf", termLabel: term }),
      makeExam("m1", { name: "V1-Midterm.pdf", termLabel: term }),
    ];

    expect(
      buildExamGroups(nodes)[0].terms[0].items.map((item) => item.id)
    ).toEqual(["m1", "f2", "f10"]);
  });

  it("sorts courses by code and counts every paper", () => {
    const nodes = [
      makeExam("1", { courseCode: "EENG537", name: "a.pdf" }),
      makeExam("2", { courseCode: "CENG507", name: "b.pdf" }),
      makeExam("3", { courseCode: "CENG507", name: "c.pdf" }),
    ];

    const groups = buildExamGroups(nodes);

    expect(groups.map((group) => group.code)).toEqual(["CENG507", "EENG537"]);
    expect(groups.map((group) => group.total)).toEqual([2, 1]);
  });
});
