import { describe, expect, it } from "vitest";
import { parseTermLabel } from "./term-label";

describe("parseTermLabel", () => {
  it("reads an academic year from a folder name", () => {
    expect(parseTermLabel(["Assessments | 2025-2026"], null)).toBe("2025-2026");
  });

  it("reads a term that precedes the year", () => {
    expect(parseTermLabel(["CENG507 | Assessments-Fall-2025-2026"], null)).toBe(
      "Fall 2025-2026"
    );
  });

  it("expands the SP abbreviation", () => {
    expect(parseTermLabel([], "V3-Assessment1-SP-2025-2026.pdf")).toBe(
      "Spring 2025-2026"
    );
  });

  it("reads a parenthesised year", () => {
    expect(
      parseTermLabel(["Exams+Assignments"], "(2020-2021)Midterm.pdf")
    ).toBe("2020-2021");
  });

  it("prefers the file name over the folder it sits in", () => {
    expect(
      parseTermLabel(
        ["Assessments | 2025-2026"],
        "V5-Assessment-Fall-2024-2025.pdf"
      )
    ).toBe("Fall 2024-2025");
  });

  it("ignores a lone year, which is usually a publication date", () => {
    expect(
      parseTermLabel(
        ["Book"],
        "[Book] Embedded System Design - Springer 2021.pdf"
      )
    ).toBeNull();
  });

  it("returns null when no year appears anywhere", () => {
    expect(parseTermLabel(["Material", "Lecture 3"], "slides.pdf")).toBeNull();
  });
});
