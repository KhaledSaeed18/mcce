import {
  PROGRAM_DEPARTMENT,
  PROGRAM_DURATION_ISO,
  PROGRAM_NAME,
  PROGRAM_OFFICIAL_URL,
  PROGRAM_UNIVERSITY,
  PROGRAM_UNIVERSITY_SHORT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/config/site";
import { flattenCourses } from "@/lib/curriculum/lookup";
import type {
  CurriculumCourseContext,
  CurriculumYear,
} from "@/lib/curriculum/types";

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: SITE_DESCRIPTION,
    name: SITE_NAME,
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=search_term_string",
      target: `${SITE_URL}/search?q={search_term_string}`,
    },
    url: SITE_URL,
  };
}

export function buildProgramSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    alternateName: "MCCE",
    description:
      "A two-year graduate program combining coursework with a research project, focused on modern communications networks and systems.",
    educationalCredentialAwarded: PROGRAM_NAME,
    name: PROGRAM_NAME,
    occupationalCategory: PROGRAM_DEPARTMENT,
    programType: "Master's degree",
    provider: {
      "@type": "CollegeOrUniversity",
      alternateName: PROGRAM_UNIVERSITY_SHORT,
      name: PROGRAM_UNIVERSITY,
      url: "https://cce.liu.edu.lb",
    },
    sameAs: PROGRAM_OFFICIAL_URL,
    timeToComplete: PROGRAM_DURATION_ISO,
  };
}

export function buildCurriculumSchema(years: CurriculumYear[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: flattenCourses(years).map((course, index) => ({
      "@type": "Course",
      item: {
        "@type": "Course",
        courseCode: course.code,
        description: course.description ?? undefined,
        name: course.name,
        provider: {
          "@type": "CollegeOrUniversity",
          name: PROGRAM_UNIVERSITY,
        },
      },
      position: index + 1,
    })),
    name: `${PROGRAM_NAME} plan of study`,
  };
}

export function buildCourseSchema(context: CurriculumCourseContext) {
  const { course, semester, year } = context;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    courseCode: course.code,
    description: course.description ?? undefined,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      name: `${year.label}, ${semester.label}`,
    },
    isPartOf: {
      "@type": "EducationalOccupationalProgram",
      name: PROGRAM_NAME,
      url: `${SITE_URL}/plan-of-study`,
    },
    name: course.name,
    provider: {
      "@type": "CollegeOrUniversity",
      name: PROGRAM_UNIVERSITY,
    },
    url: `${SITE_URL}/course/${course.code}`,
  };
}

interface FaqEntry {
  answer: string;
  question: string;
}

export function buildFaqSchema(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
      name: entry.question,
    })),
  };
}

interface BreadcrumbEntry {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      item: entry.url,
      name: entry.name,
      position: index + 1,
    })),
  };
}
