import {
  CCE_OFFICIAL_UNDERGRADUATE_URL,
  CCE_PAGE_PATH,
} from "@/config/cce/content";
import { PROGRAM_DEPARTMENT, SITE_URL } from "@/config/site";
import { getCceCourse, getProgramCourseCodes } from "@/lib/cce/lookup";
import type { CceProgram } from "@/lib/cce/types";
import { UNIVERSITY_PROVIDER } from "@/lib/seo/provider";

const CCE_URL = `${SITE_URL}${CCE_PAGE_PATH}`;

function buildCourseNodes(program: CceProgram) {
  return getProgramCourseCodes(program).flatMap((code) => {
    const course = getCceCourse(code);

    if (!course) {
      return [];
    }

    return [
      {
        "@type": "Course",
        courseCode: course.code,
        description: course.description ?? undefined,
        name: course.name,
        provider: UNIVERSITY_PROVIDER,
      },
    ];
  });
}

export function buildCceProgramSchema(program: CceProgram) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    alternateName: program.abbreviation,
    description: program.summary,
    educationalCredentialAwarded: program.degree,
    hasCourse: buildCourseNodes(program),
    name: program.degree,
    numberOfCredits: program.credits,
    occupationalCategory: PROGRAM_DEPARTMENT,
    programType: "Bachelor's degree",
    provider: UNIVERSITY_PROVIDER,
    sameAs: CCE_OFFICIAL_UNDERGRADUATE_URL,
    timeToComplete: `P${program.years}Y`,
    url: CCE_URL,
  };
}
