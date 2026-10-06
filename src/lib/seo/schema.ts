import {
  ADMISSIONS_PAGE_PATH,
  type AdmissionsTrack,
} from "@/config/admissions";
import { FOOTER_GITHUB_URL } from "@/config/footer";
import {
  PROGRAM_DEPARTMENT,
  PROGRAM_DURATION_ISO,
  PROGRAM_NAME,
  PROGRAM_OFFICIAL_URL,
  SITE_AUTHOR,
  SITE_AUTHOR_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/config/site";
import {
  TUITION_PAGE_PATH,
  TUITION_REGISTRATION_USD_PER_SEMESTER,
  TUITION_USD_PER_CREDIT,
} from "@/config/tuition";
import { UNIVERSITY_PROVIDER } from "@/lib/seo/provider";

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    alternateName: [
      "MCCE Index",
      "LIU MCCE",
      "MCCE: Program Materials",
      "mcce.khaledsaeed.tech",
    ],
    author: { "@type": "Person", name: SITE_AUTHOR, url: SITE_AUTHOR_URL },
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    name: SITE_NAME,
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=search_term_string",
      target: `${SITE_URL}/search?q={search_term_string}`,
    },
    sameAs: [FOOTER_GITHUB_URL],
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
    provider: UNIVERSITY_PROVIDER,
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

export function buildTuitionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    alternateName: "MCCE",
    name: PROGRAM_NAME,
    offers: [
      {
        "@type": "Offer",
        category: "Tuition",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: TUITION_USD_PER_CREDIT,
          priceCurrency: "USD",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            unitText: "credit",
            value: 1,
          },
        },
      },
      {
        "@type": "Offer",
        category: "Registration fee",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: 1,
          billingIncrement: 1,
          price: TUITION_REGISTRATION_USD_PER_SEMESTER,
          priceCurrency: "USD",
          unitText: "semester",
        },
      },
    ],
    programType: "Master's degree",
    provider: UNIVERSITY_PROVIDER,
    timeToComplete: PROGRAM_DURATION_ISO,
    url: `${SITE_URL}${TUITION_PAGE_PATH}`,
  };
}

export function buildAdmissionsSchema(tracks: AdmissionsTrack[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    description:
      "The admissions flow for the LIU MCCE graduate program, with separate tracks for LIU and non-LIU bachelor graduates.",
    name: `How to apply to the ${PROGRAM_NAME}`,
    step: tracks.map((track) => ({
      "@type": "HowToSection",
      itemListElement: track.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        text: step,
      })),
      name: track.label,
    })),
    url: `${SITE_URL}${ADMISSIONS_PAGE_PATH}`,
  };
}
