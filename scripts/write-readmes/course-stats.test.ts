import { describe, expect, it } from "vitest";
import { UNRECORDED_TERM_LABEL } from "../../src/config/exams";
import type { DriveNode } from "../../src/lib/drive/types";
import { compareTerms, computeCourseStats } from "./course-stats";

function file(overrides: Partial<DriveNode>): DriveNode {
  return {
    kind: "pdf",
    materialType: "lecture",
    name: "file.pdf",
    sizeBytes: 100,
    termLabel: null,
    ...overrides,
  } as DriveNode;
}

describe("compareTerms", () => {
  it("puts the newest year first and Spring before Fall within it", () => {
    const sorted = [
      "Fall 2024-2025",
      UNRECORDED_TERM_LABEL,
      "Spring 2024-2025",
      "Fall 2025-2026",
    ].sort(compareTerms);
    expect(sorted).toEqual([
      "Fall 2025-2026",
      "Spring 2024-2025",
      "Fall 2024-2025",
      UNRECORDED_TERM_LABEL,
    ]);
  });
});

describe("computeCourseStats", () => {
  it("counts exams, solutions, assessments, and videos separately", () => {
    const stats = computeCourseStats([
      file({
        materialType: "exam",
        name: "Final.pdf",
        termLabel: "Fall 2025-2026",
      }),
      file({
        materialType: "exam",
        name: "[Solution] Final.pdf",
        termLabel: "Fall 2025-2026",
      }),
      file({ materialType: "assessment", name: "Quiz 1.pdf" }),
      file({ kind: "video", sizeBytes: null }),
    ]);

    expect(stats).toMatchObject({
      assessments: 1,
      bytes: 300,
      count: 4,
      exams: 2,
      solutions: 1,
      videos: 1,
    });
    expect(stats.terms).toEqual([
      ["Fall 2025-2026", 2],
      [UNRECORDED_TERM_LABEL, 1],
    ]);
  });
});
