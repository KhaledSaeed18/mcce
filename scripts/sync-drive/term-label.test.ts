import { describe, expect, it } from "vitest";
import type { MaterialType } from "../../src/lib/drive/types";
import {
  academicYearFor,
  parseTermLabel,
  type TermContext,
} from "./term-label";

const FALL = "First Year | Fall Semester";
const SPRING = "First Year | Spring Semester";

function context(
  materialType: MaterialType,
  semester: string | null = null
): TermContext {
  return { materialType, semester };
}

describe("academicYearFor", () => {
  it("opens the year in Fall and closes it in Spring", () => {
    expect(academicYearFor("Fall", 2021)).toBe("2021-2022");
    expect(academicYearFor("Spring", 2021)).toBe("2020-2021");
  });
});

describe("parseTermLabel", () => {
  it("reads an academic year from a folder name", () => {
    expect(
      parseTermLabel(["Assessments | 2025-2026"], null, context("assessment"))
    ).toBe("2025-2026");
  });

  it("reads a term that precedes the year", () => {
    expect(
      parseTermLabel(
        ["CENG507 | Assessments-Fall-2025-2026"],
        null,
        context("assessment")
      )
    ).toBe("Fall 2025-2026");
  });

  it("expands the SP abbreviation", () => {
    expect(
      parseTermLabel(
        [],
        "V3-Assessment1-SP-2025-2026.pdf",
        context("assessment")
      )
    ).toBe("Spring 2025-2026");
  });

  it("reads a parenthesised year", () => {
    expect(
      parseTermLabel(["Exams"], "(2020-2021)Midterm.pdf", context("exam"))
    ).toBe("2020-2021");
  });

  it("prefers the file name over the folder it sits in", () => {
    expect(
      parseTermLabel(
        ["Assessments"],
        "V5-Assessment-Fall-2024-2025.pdf",
        context("assessment")
      )
    ).toBe("Fall 2024-2025");
  });

  it("places a lone year on a paper using the semester its course runs in", () => {
    expect(
      parseTermLabel(
        ["Exams", "Midterm"],
        "CENG566-(2021)Midterm.pdf",
        context("exam", SPRING)
      )
    ).toBe("Spring 2020-2021");
    expect(
      parseTermLabel(
        ["Exams"],
        "Appendix-Final 2022.pdf",
        context("exam", FALL)
      )
    ).toBe("Fall 2022-2023");
  });

  it("ignores a lone year on anything that is not a paper", () => {
    expect(
      parseTermLabel(
        ["Books"],
        "[Book] Embedded System Design - Springer 2021.pdf",
        context("book", FALL)
      )
    ).toBeNull();
    expect(
      parseTermLabel(
        ["Lectures"],
        "CENG557-L5-The_Need_for_QoS - 2022.pdf",
        context("lecture", SPRING)
      )
    ).toBeNull();
  });

  it("leaves a lone year unplaced when the semester is unknown", () => {
    expect(
      parseTermLabel(["Exams"], "(2021)Final.pdf", context("exam", null))
    ).toBeNull();
  });

  it("returns null when no year appears anywhere", () => {
    expect(
      parseTermLabel(
        ["Lectures", "Lecture 03"],
        "slides.pdf",
        context("lecture", FALL)
      )
    ).toBeNull();
  });
});
