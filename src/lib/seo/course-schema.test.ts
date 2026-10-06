import { describe, expect, it } from "vitest";
import type { CurriculumCourseContext } from "@/lib/curriculum/types";
import { buildCourseSchema, buildCurriculumSchema } from "./course-schema";

const CONTEXT: CurriculumCourseContext = {
  course: {
    code: "CENG557",
    corequisites: [],
    credits: 3,
    description: "Network architectures.",
    kind: "course",
    name: "Advanced Network Architectures",
    objectives: ["Design a network."],
    prerequisites: ["ENGG515"],
    requirementCategory: "major-requirement",
    topics: ["MPLS"],
  },
  semester: {
    courses: [],
    id: "y1-spring",
    label: "Spring Semester",
    term: "spring",
  },
  year: { id: "y1", label: "First Year", semesters: [], year: 1 },
};

describe("buildCourseSchema", () => {
  const schema = buildCourseSchema(CONTEXT);

  it("names the university and the course page", () => {
    expect(schema.provider.alternateName).toBe("LIU");
    expect(schema.alternateName).toBe("LIU CENG557");
    expect(schema.url).toBe("https://mcce.khaledsaeed.tech/course/CENG557");
  });

  it("links prerequisites to their own course pages", () => {
    expect(schema.coursePrerequisites).toEqual([
      {
        "@type": "Course",
        courseCode: "ENGG515",
        url: "https://mcce.khaledsaeed.tech/course/ENGG515",
      },
    ]);
  });

  it("leaves out empty lists instead of emitting []", () => {
    const bare = buildCourseSchema({
      ...CONTEXT,
      course: {
        ...CONTEXT.course,
        objectives: [],
        prerequisites: [],
        topics: [],
      },
    });

    expect(bare.about).toBeUndefined();
    expect(bare.coursePrerequisites).toBeUndefined();
    expect(bare.teaches).toBeUndefined();
  });
});

describe("buildCurriculumSchema", () => {
  it("wraps each course in a ListItem that points at its page", () => {
    const schema = buildCurriculumSchema([
      {
        id: "y1",
        label: "First Year",
        semesters: [{ ...CONTEXT.semester, courses: [CONTEXT.course] }],
        year: 1,
      },
    ]);

    expect(schema.numberOfItems).toBe(1);
    expect(schema.itemListElement[0]).toMatchObject({
      "@type": "ListItem",
      item: {
        "@type": "Course",
        url: "https://mcce.khaledsaeed.tech/course/CENG557",
      },
      position: 1,
    });
  });
});
