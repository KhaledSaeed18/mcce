import { describe, expect, it } from "vitest";
import { makeNode } from "@/lib/drive/test-fixtures";
import type { CourseMaterialGroup } from "@/lib/drive/types";
import { formatSpacedCourseCode } from "./course-code";
import { buildCourseFaq } from "./course-faq";
import type { CurriculumCourseContext } from "./types";

function makeContext(
  code: string,
  name: string,
  prerequisites: string[] = []
): CurriculumCourseContext {
  return {
    course: {
      code,
      corequisites: [],
      credits: 3,
      description: null,
      kind: "course",
      name,
      objectives: [],
      prerequisites,
      requirementCategory: "core",
      topics: ["Queues"],
    },
    semester: { courses: [], id: "s", label: "Fall Semester", term: "fall" },
    year: { id: "y", label: "First Year", semesters: [], year: 1 },
  };
}

function makeGroup(
  type: CourseMaterialGroup["type"],
  size: number
): CourseMaterialGroup {
  return {
    items: Array.from({ length: size }, (_, index) =>
      makeNode({ id: `${index}` })
    ),
    label: type,
    type,
  };
}

const CONTEXT = makeContext("ENGG515", "Advanced Mathematics", ["CENG507"]);
const LOOKUP = new Map([
  ["CENG507", makeContext("CENG507", "Embedded Systems")],
]);

describe("buildCourseFaq", () => {
  it("names prerequisites by code and title", () => {
    const entry = buildCourseFaq(CONTEXT, [], LOOKUP).find((item) =>
      item.question.includes("prerequisites")
    );

    expect(entry?.answer).toBe("ENGG515 requires CENG507 Embedded Systems.");
  });

  it("counts exams among the listed files", () => {
    const groups = [makeGroup("exam", 2), makeGroup("lecture", 3)];
    const entry = buildCourseFaq(CONTEXT, groups, LOOKUP).at(-1);

    expect(entry?.answer).toContain("5 ENGG515 files, including 2 past exams");
  });

  it("says so when a course has no files", () => {
    const entry = buildCourseFaq(CONTEXT, [], LOOKUP).at(-1);

    expect(entry?.answer).toBe("No ENGG515 files have been shared yet.");
  });
});

describe("formatSpacedCourseCode", () => {
  it("separates letters from numbers and keeps a suffix", () => {
    expect(formatSpacedCourseCode("ENGG515")).toBe("ENGG 515");
    expect(formatSpacedCourseCode("CENG566L")).toBe("CENG 566L");
  });
});
