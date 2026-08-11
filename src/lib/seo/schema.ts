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
