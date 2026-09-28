import { describe, expect, it } from "vitest";
import { findFileChip } from "./file-chip";
import { buildTabLabels } from "./tab-label";

function label(name: string, materialType: Parameters<typeof findFileChip>[1]) {
  return buildTabLabels([{ materialType, name }])[0];
}

describe("findFileChip", () => {
  it("reads a solution from its tag, whatever folder it sits in", () => {
    expect(findFileChip("[Solution]Lecture7.pdf", "assessment")).toBe("sol");
    expect(findFileChip("CENG566-[Solution](2021)Final.pdf", "exam")).toBe(
      "sol"
    );
    expect(findFileChip("[SOLVED-Details]Quiz.pdf", "exam")).toBe("sol");
  });

  it("reads a book from its tag, even in a project folder", () => {
    expect(findFileChip("[BOOK]DSP-Using-Matlab.pdf", "assignment")).toBe(
      "book"
    );
  });

  it("reads a formula sheet from its name", () => {
    expect(findFileChip("EENG587-Midterm-FormulaSheet.pdf", "exam")).toBe(
      "sheet"
    );
    expect(findFileChip("EENG587-Table-of-Q-function.pdf", "exam")).toBe(
      "sheet"
    );
  });

  it("falls back to the material type, and to nothing without one", () => {
    expect(findFileChip("Lecture7.pdf", "lecture")).toBe("lec");
    expect(findFileChip("Notes.pdf", "other")).toBeNull();
    expect(findFileChip("Notes.pdf", null)).toBeNull();
  });
});

describe("buildTabLabels", () => {
  it("moves the solution tag into the chip and drops the extension", () => {
    expect(
      label("[Solution]V1-Assessment-Fall-2024-2025.pdf", "assessment")
    ).toEqual({
      chip: "sol",
      text: "V1 Assessment Fall 2024-2025",
    });
  });

  it("drops the course code and splits joined words", () => {
    expect(label("EENG587-Midterm-FormulaSheet.pdf", "exam").text).toBe(
      "Midterm Formula Sheet"
    );
    expect(label("Lecture7.pdf", "lecture").text).toBe("Lecture 7");
    expect(label("CENG587-(2021)V1_P1-Midterm.pdf", "exam").text).toBe(
      "2021 V1 P1 Midterm"
    );
  });

  it("drops a term every tab shares, and keeps one that tells them apart", () => {
    const shared = buildTabLabels([
      { materialType: "assessment", name: "V1-Assessment-Fall-2024-2025.pdf" },
      {
        materialType: "assessment",
        name: "[Solution]V1-Assessment-Fall-2024-2025.pdf",
      },
    ]);
    expect(shared.map((item) => item.text)).toEqual([
      "V1 Assessment",
      "V1 Assessment",
    ]);

    const apart = buildTabLabels([
      { materialType: "exam", name: "Final-Fall-2023-2024.pdf" },
      { materialType: "exam", name: "Final-Fall-2024-2025.pdf" },
    ]);
    expect(apart.map((item) => item.text)).toEqual([
      "Final Fall 2023-2024",
      "Final Fall 2024-2025",
    ]);
  });

  it("keeps the whole name when stripping would leave nothing", () => {
    expect(label("[Solution].pdf", null).text).toBe("[Solution].pdf");
  });
});
