import { describe, expect, it } from "vitest";
import { makeNode } from "@/lib/drive/test-fixtures";
import { buildCourseIntro } from "./course-intro";
import type { CurriculumCourseContext } from "./types";

const CONTEXT: CurriculumCourseContext = {
  course: {
    code: "ENGG515",
    corequisites: [],
    credits: 3,
    description: null,
    kind: "course",
    name: "Advanced Engineering Mathematics",
    objectives: [],
    prerequisites: [],
    requirementCategory: "core",
  },
  semester: {
    courses: [],
    id: "y1-fall",
    label: "Fall Semester",
    term: "fall",
  },
  year: { id: "y1", label: "First Year", semesters: [], year: 1 },
};

const STANDING =
  "ENGG515 Advanced Engineering Mathematics is a 3-credit core requirement in the M.S. in Computer and Communication Engineering (MCCE) at Lebanese International University (LIU), scheduled in the Fall Semester of the First Year.";

describe("buildCourseIntro", () => {
  it("ties the code to the program and university", () => {
    expect(buildCourseIntro(CONTEXT, [])).toBe(STANDING);
  });

  it("adds the indexed file count and kinds", () => {
    const intro = buildCourseIntro(CONTEXT, [
      {
        items: [makeNode({ id: "a" }), makeNode({ id: "b" })],
        label: "Lectures",
        type: "lecture",
      },
      { items: [makeNode({ id: "c" })], label: "Exams", type: "exam" },
    ]);

    expect(intro).toBe(
      `${STANDING} This page lists its 3 indexed files, including lectures and exams.`
    );
  });

  it("uses the singular for one file", () => {
    const intro = buildCourseIntro(CONTEXT, [
      { items: [makeNode({ id: "a" })], label: "Other", type: "other" },
    ]);

    expect(intro).toBe(`${STANDING} This page lists its 1 indexed file.`);
  });
});
