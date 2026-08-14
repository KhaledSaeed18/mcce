import { describe, expect, it } from "vitest";
import {
  getProgramCredits,
  getSemesterCredits,
  getYearCredits,
} from "./credits";
import type { CurriculumSemester, CurriculumYear } from "./types";

function makeCourse(credits: number) {
  return {
    code: "TEST",
    corequisites: [],
    credits,
    description: null,
    kind: "course" as const,
    name: "Test Course",
    objectives: [],
    prerequisites: [],
    requirementCategory: "major-elective" as const,
  };
}

function makeSemester(credits: number[]): CurriculumSemester {
  return {
    courses: credits.map(makeCourse),
    id: "sem",
    label: "Semester",
    term: "fall",
  };
}

describe("getSemesterCredits", () => {
  it("sums the credits of every course in the semester", () => {
    expect(getSemesterCredits(makeSemester([3, 3, 3, 3]))).toBe(12);
  });

  it("returns zero for a semester with no courses", () => {
    expect(getSemesterCredits(makeSemester([]))).toBe(0);
  });
});

describe("getYearCredits", () => {
  it("sums credits across all semesters in the year", () => {
    const year: CurriculumYear = {
      id: "y1",
      label: "First Year",
      semesters: [makeSemester([3, 3, 3, 3]), makeSemester([3, 3, 3, 3, 1])],
      year: 1,
    };
    expect(getYearCredits(year)).toBe(25);
  });
});

describe("getProgramCredits", () => {
  it("sums credits across all years", () => {
    const years: CurriculumYear[] = [
      {
        id: "y1",
        label: "First Year",
        semesters: [makeSemester([12])],
        year: 1,
      },
      {
        id: "y2",
        label: "Second Year",
        semesters: [makeSemester([9])],
        year: 2,
      },
    ];
    expect(getProgramCredits(years)).toBe(21);
  });
});
