import { describe, expect, it } from "vitest";
import { CURRICULUM } from "@/config/curriculum";
import { buildCourseContextLookup } from "@/lib/curriculum/lookup";
import { makeNode } from "@/lib/drive/test-fixtures";
import type { CourseMaterialGroup } from "@/lib/drive/types";
import { buildCourseDescription } from "./course-head";

const MAX_DESCRIPTION_LENGTH = 160;
const MIN_DESCRIPTION_LENGTH = 50;

const LARGE_GROUPS: CourseMaterialGroup[] = [
  {
    items: Array.from({ length: 200 }, (_, index) =>
      makeNode({ id: `exam-${index}` })
    ),
    label: "Exams",
    type: "exam",
  },
];

describe("buildCourseDescription", () => {
  const contexts = [...buildCourseContextLookup(CURRICULUM).values()];

  it.each([
    ["with exams", LARGE_GROUPS],
    ["without files", []],
  ])("fits search result limits for every course %s", (_, groups) => {
    for (const context of contexts) {
      const { length } = buildCourseDescription(context, groups);

      expect(length).toBeLessThanOrEqual(MAX_DESCRIPTION_LENGTH);
      expect(length).toBeGreaterThanOrEqual(MIN_DESCRIPTION_LENGTH);
    }
  });
});
