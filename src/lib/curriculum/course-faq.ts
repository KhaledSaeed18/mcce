import { PROGRAM_UNIVERSITY_SHORT } from "@/config/site";
import {
  countMaterialFiles,
  countMaterialType,
  formatProseList,
} from "@/lib/drive/material-list";
import type { CourseMaterialGroup } from "@/lib/drive/types";
import { describeStanding } from "./course-intro";
import type { CurriculumCourseContext } from "./types";

export interface CourseFaqEntry {
  answer: string;
  question: string;
}

type CourseLookup = Map<string, CurriculumCourseContext>;

function describePrerequisites(
  { course }: CurriculumCourseContext,
  lookup: CourseLookup
) {
  if (course.prerequisites.length === 0) {
    return `${course.code} has no prerequisites.`;
  }

  const names = course.prerequisites.map((code) => {
    const name = lookup.get(code)?.course.name;
    return name ? `${code} ${name}` : code;
  });
  return `${course.code} requires ${formatProseList(names)}.`;
}

function describeMaterials(code: string, groups: CourseMaterialGroup[]) {
  const files = countMaterialFiles(groups);
  if (files === 0) {
    return `No ${code} files have been shared yet.`;
  }

  const exams = countMaterialType(groups, "exam");
  const examText = exams > 0 ? `, including ${exams} past exams,` : "";
  return `This page lists ${files} ${code} files${examText} that you can open for free without an account.`;
}

/** Questions a student actually searches, answered from the curriculum and the index. */
export function buildCourseFaq(
  context: CurriculumCourseContext,
  groups: CourseMaterialGroup[],
  lookup: CourseLookup
): CourseFaqEntry[] {
  const { code } = context.course;
  const topics = context.course.topics ?? [];

  return [
    {
      answer: describeStanding(context),
      question: `What is ${code} at ${PROGRAM_UNIVERSITY_SHORT}?`,
    },
    ...(topics.length > 0
      ? [
          {
            answer: `${code} covers ${formatProseList(topics)}.`,
            question: `What does ${code} cover?`,
          },
        ]
      : []),
    {
      answer: describePrerequisites(context, lookup),
      question: `What are the prerequisites for ${code}?`,
    },
    {
      answer: describeMaterials(code, groups),
      question: `Where can I find ${code} past exams and lectures?`,
    },
  ];
}
