import { describe, expect, it } from "vitest";
import { academicYearFor } from "../sync-drive/term-label";
import { normaliseFileName } from "./naming";

describe("academicYearFor", () => {
  it("opens the academic year in Fall and closes it in Spring", () => {
    expect(academicYearFor("Fall", 2018)).toBe("2018-2019");
    expect(academicYearFor("Spring", 2019)).toBe("2018-2019");
  });
});

describe("normaliseFileName", () => {
  it("expands a single-year term into its academic year", () => {
    expect(normaliseFileName("CENG675-Final-Spring2019.pdf")).toBe(
      "CENG675-Final-Spring-2018-2019.pdf"
    );
  });

  it("leaves an already-normalised academic year untouched", () => {
    expect(normaliseFileName("V6-Assessment-Fall-2024-2025.pdf")).toBe(
      "V6-Assessment-Fall-2024-2025.pdf"
    );
  });

  it("spells SP as Spring", () => {
    expect(normaliseFileName("V1-Assessment1-SP-2025-2026.pdf")).toBe(
      "V1-Assessment1-Spring-2025-2026.pdf"
    );
  });

  it("folds every solution spelling into one marker", () => {
    expect(normaliseFileName("[SOLVED]Assessment.pdf")).toBe(
      "[Solution]Assessment.pdf"
    );
    expect(normaliseFileName("[Solutions](2020)Final.pdf")).toBe(
      "[Solution](2020)Final.pdf"
    );
  });

  it("moves a version out of the solution marker and into a prefix", () => {
    expect(normaliseFileName("[Solved-V2]FinalSampleExam.pdf")).toBe(
      "[Solution]V2-FinalSampleExam.pdf"
    );
    expect(normaliseFileName("[Solved](V1)Practice_Final.pdf")).toBe(
      "[Solution]V1-Practice_Final.pdf"
    );
  });

  it("keeps a bare year alone, since only the course semester could place it", () => {
    expect(normaliseFileName("[Solution](Paper)Final-2016.pdf")).toBe(
      "[Solution](Paper)Final-2016.pdf"
    );
  });
});
