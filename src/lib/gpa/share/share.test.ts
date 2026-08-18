import { describe, expect, it } from "vitest";
import type { CurriculumCourse } from "@/lib/curriculum/types";
import type { GradeEntry } from "../types";
import { decodeShareValue, toAverageMap } from "./decode";
import { encodeShareValue } from "./encode";

function course(code: string): CurriculumCourse {
  return {
    code,
    corequisites: [],
    credits: 3,
    description: null,
    kind: "course",
    name: `Course ${code}`,
    objectives: [],
    prerequisites: [],
    requirementCategory: "core",
  };
}

function entry(code: string, average: number | null): GradeEntry {
  return { average, code, credits: 3, id: code, name: `Course ${code}` };
}

const COURSES = [course("A"), course("B"), course("C")];

describe("share encoding", () => {
  it("round-trips averages positionally", () => {
    const entries = [entry("A", 87), entry("B", null), entry("C", 90)];
    const grades = decodeShareValue(encodeShareValue(entries), COURSES);

    expect(toAverageMap(grades)).toEqual({ A: 87, C: 90 });
  });

  it("keeps fractional averages intact", () => {
    const value = encodeShareValue([entry("A", 87.5)]);

    expect(decodeShareValue(value, COURSES)[0].average).toBe(87.5);
  });

  it("drops trailing ungraded slots", () => {
    expect(encodeShareValue([entry("A", 87), entry("B", null)])).toBe("87");
  });

  it("encodes an all-ungraded set as an empty value", () => {
    expect(encodeShareValue([entry("A", null), entry("B", null)])).toBe("");
  });

  it("keeps the readable slots of a damaged link", () => {
    const grades = decodeShareValue("87-nope-90", COURSES);

    expect(toAverageMap(grades)).toEqual({ A: 87, C: 90 });
  });

  it("rejects averages outside the 0 to 100 range", () => {
    expect(decodeShareValue("101-x-120", COURSES)).toEqual([]);
  });

  it("ignores slots past the end of the curriculum", () => {
    const grades = decodeShareValue("87-88-89-90", COURSES);

    expect(grades).toHaveLength(COURSES.length);
  });
});
