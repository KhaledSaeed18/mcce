import { describe, expect, it } from "vitest";
import type { MaterialType } from "@/lib/drive/types";
import { findMatchingFile } from "./match-files";
import type { EditorTreeNode } from "./types";

function pdf(
  id: string,
  name: string,
  parentId: string,
  materialType: MaterialType = "assessment"
): EditorTreeNode {
  return {
    courseCode: "EENG587",
    id,
    kind: "pdf",
    materialType,
    modifiedTime: "2026-01-01T00:00:00.000Z",
    name,
    parentId,
  };
}

const PAPER = pdf("paper", "Lecture7.pdf", "self-assessments");
const SOLUTION = pdf("solution", "[Solution]Lecture7.pdf", "self-assessments");
const SLIDES = pdf("slides", "Lecture7.pdf", "lectures", "lecture");

describe("findMatchingFile", () => {
  it("pairs a paper and its solution both ways", () => {
    const nodes = [PAPER, SOLUTION, SLIDES];

    expect(findMatchingFile(nodes, PAPER)?.id).toBe("solution");
    expect(findMatchingFile(nodes, SOLUTION)?.id).toBe("paper");
  });

  it("leaves slides of the same name unpaired", () => {
    expect(findMatchingFile([PAPER, SOLUTION, SLIDES], SLIDES)).toBeNull();
  });

  it("reads a tag in the middle of the name, past the course code", () => {
    const paper = pdf("paper", "CENG566-(2021)Final.pdf", "final", "exam");
    const solution = pdf(
      "sol",
      "CENG566-[Solution](2021)Final.pdf",
      "final",
      "exam"
    );

    expect(findMatchingFile([paper, solution], paper)?.id).toBe("sol");
  });

  it("prefers the same folder, then the plain solution over a detailed one", () => {
    const paper = pdf("paper", "Exercises-Graph Theory.pdf", "ex", "exercise");
    const detailed = pdf(
      "detailed",
      "[Detailed Solution]Exercises-Graph Theory.pdf",
      "ex",
      "exercise"
    );
    const plain = pdf(
      "plain",
      "[Solution]Exercises-Graph Theory.pdf",
      "ex",
      "exercise"
    );
    const elsewhere = pdf(
      "elsewhere",
      "[Solution]Exercises-Graph Theory.pdf",
      "old",
      "exercise"
    );

    expect(
      findMatchingFile([paper, elsewhere, detailed, plain], paper)?.id
    ).toBe("plain");
  });

  it("pairs nothing across courses", () => {
    const other = { ...SOLUTION, courseCode: "CENG566", id: "other" };

    expect(findMatchingFile([PAPER, other], PAPER)).toBeNull();
  });
});
