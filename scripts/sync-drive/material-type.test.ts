import { describe, expect, it } from "vitest";
import type { MaterialType } from "../../src/lib/drive/types";
import { classifyMaterialType } from "./material-type";

describe("classifyMaterialType", () => {
  const canonical: [string[], MaterialType][] = [
    [["Lectures"], "lecture"],
    [["Exams"], "exam"],
    [["Exams", "Midterm"], "exam"],
    [["Exams", "Final"], "exam"],
    [["Assessments"], "assessment"],
    [["Self Assessments"], "assessment"],
    [["Exercises"], "exercise"],
    [["Assignments"], "assignment"],
    [["Labs"], "lab"],
    [["Books"], "book"],
  ];

  for (const [segments, expected] of canonical) {
    it(`reads ${segments.join("/")} as ${expected}`, () => {
      expect(classifyMaterialType(segments, null)).toBe(expected);
    });
  }

  // Folder names the reorganisation replaced. Anything uploaded into a folder
  // named the old way should still land in the right place.
  const legacy: [string[], MaterialType][] = [
    [["Material"], "lecture"],
    [["Materials"], "lecture"],
    [["Material+Summaries"], "lecture"],
    [["[OLD]Exams"], "exam"],
    [["Assessments | 2025-2026"], "assessment"],
    [["Ungraded Self Assessments | 2025-2026"], "assessment"],
    [["CENG507 | Assessments-Fall-2025-2026"], "assessment"],
    [["Homeworks+Exercises"], "assignment"],
    [["Experiments"], "lab"],
    [["Book"], "book"],
  ];

  for (const [segments, expected] of legacy) {
    it(`still reads legacy ${segments.join("/")} as ${expected}`, () => {
      expect(classifyMaterialType(segments, null)).toBe(expected);
    });
  }

  it("resolves a segment matching two types in favour of exams", () => {
    expect(classifyMaterialType(["Exams+Assignments"], null)).toBe("exam");
  });

  it("lets a named deeper folder override its parents", () => {
    expect(
      classifyMaterialType(["Exams", "Assignments", "Assignment 03"], null)
    ).toBe("assignment");
  });

  it("inherits from a parent when the deepest folder says nothing", () => {
    expect(
      classifyMaterialType(["Lectures", "Lecture 03", "MATLAB"], null)
    ).toBe("lecture");
  });

  it("falls back to the file name only when no folder matches", () => {
    expect(classifyMaterialType(["Graph Theory"], "Midterm.pdf")).toBe("exam");
  });

  it("keeps the folder answer over a file name that disagrees", () => {
    expect(
      classifyMaterialType(["Lectures", "Lecture 05"], "Exam review.pdf")
    ).toBe("lecture");
  });

  it("returns other when nothing matches", () => {
    expect(classifyMaterialType([], "README.rtf")).toBe("other");
    expect(classifyMaterialType([], null)).toBe("other");
  });
});
