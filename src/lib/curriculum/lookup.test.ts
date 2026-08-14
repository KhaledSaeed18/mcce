import { describe, expect, it } from "vitest";
import { buildCourseContextLookup, flattenCourses } from "./lookup";
import type { CurriculumYear } from "./types";

const YEARS: CurriculumYear[] = [
  {
    id: "y1",
    label: "First Year",
    semesters: [
      {
        courses: [
          {
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
        ],
        id: "y1-fall",
        label: "Fall Semester",
        term: "fall",
      },
      {
        courses: [
          {
            code: "CENG557",
            corequisites: [],
            credits: 3,
            description: null,
            kind: "course",
            name: "Advanced Network Architectures",
            objectives: [],
            prerequisites: ["ENGG515"],
            requirementCategory: "major-requirement",
          },
        ],
        id: "y1-spring",
        label: "Spring Semester",
        term: "spring",
      },
    ],
    year: 1,
  },
];

describe("flattenCourses", () => {
  it("collects every course across every semester and year", () => {
    const codes = flattenCourses(YEARS).map((course) => course.code);
    expect(codes).toEqual(["ENGG515", "CENG557"]);
  });
});

describe("buildCourseContextLookup", () => {
  it("maps a course code to its course, semester, and year", () => {
    const lookup = buildCourseContextLookup(YEARS);
    const context = lookup.get("CENG557");

    expect(context?.course.name).toBe("Advanced Network Architectures");
    expect(context?.semester.id).toBe("y1-spring");
    expect(context?.year.id).toBe("y1");
  });

  it("returns undefined for an unknown course code", () => {
    expect(buildCourseContextLookup(YEARS).get("NOPE")).toBeUndefined();
  });
});
