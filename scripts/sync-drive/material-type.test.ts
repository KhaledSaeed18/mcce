import { describe, expect, it } from "vitest";
import type { MaterialType } from "../../src/lib/drive/types";
import { classifyMaterialType } from "./material-type";

describe("classifyMaterialType", () => {
  const cases: [string, string[], MaterialType][] = [
    ["Material", ["Material"], "lecture"],
    ["Materials", ["Materials"], "lecture"],
    ["Material+Summaries", ["Material+Summaries"], "lecture"],
    ["Exams", ["Exams"], "exam"],
    ["[OLD]Exams", ["[OLD]Exams"], "exam"],
    ["Assessments | 2025-2026", ["Assessments | 2025-2026"], "exam"],
    [
      "Ungraded Self Assessments | 2025-2026",
      ["Ungraded Self Assessments | 2025-2026"],
      "exam",
    ],
    [
      "CENG507 | Assessments-Fall-2025-2026",
      ["CENG507 | Assessments-Fall-2025-2026"],
      "exam",
    ],
    ["Exercises", ["Exercises"], "exercise"],
    ["Homeworks+Exercises", ["Homeworks+Exercises"], "assignment"],
    ["Assignments", ["Assignments"], "assignment"],
    ["Experiments", ["Experiments"], "lab"],
    ["Book", ["Book"], "book"],
  ];

  for (const [name, segments, expected] of cases) {
    it(`reads ${name} as ${expected}`, () => {
      expect(classifyMaterialType(segments, null)).toBe(expected);
    });
  }

  it("resolves a segment matching two types in favour of exams", () => {
    expect(classifyMaterialType(["Exams+Assignments"], null)).toBe("exam");
  });

  it("lets the deepest folder override its parents", () => {
    expect(
      classifyMaterialType(
        ["Exams+Assignments", "Assignments | 2025-2026", "Assignment3"],
        null
      )
    ).toBe("assignment");
  });

  it("inherits from a parent when the deepest folder says nothing", () => {
    expect(
      classifyMaterialType(["Materials", "Lecture 3", "MATLAB codes"], null)
    ).toBe("lecture");
  });

  it("falls back to the file name only when no folder matches", () => {
    expect(classifyMaterialType(["Graph Theory"], "Midterm.pdf")).toBe("exam");
  });

  it("keeps the folder answer over a file name that disagrees", () => {
    expect(
      classifyMaterialType(["Material", "Lecture 5"], "Exam review.pdf")
    ).toBe("lecture");
  });

  it("returns other when nothing matches", () => {
    expect(classifyMaterialType([], "README.rtf")).toBe("other");
    expect(classifyMaterialType([], null)).toBe("other");
  });
});
