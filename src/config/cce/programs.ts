import type { CceProgram } from "@/lib/cce/types";

const GENERAL_EDUCATION_ELECTIVE_LABEL = "General education elective";
const MAJOR_ELECTIVE_LABEL = "Major elective";

const CENG_PLAN: CceProgram["plan"] = [
  {
    id: "ceng-y1",
    label: "First Year",
    semesters: [
      {
        entries: [
          { code: "CULT200", kind: "course" },
          { code: "MATH225", kind: "course" },
          { code: "ENGL201", kind: "course" },
          { code: "ENGG200", kind: "course" },
          { code: "PHYS220", kind: "course" },
          { code: "MATH210", kind: "course" },
        ],
        id: "ceng-y1-fall",
        label: "Fall Semester",
        term: "fall",
      },
      {
        entries: [
          { code: "CSCI250L", kind: "course" },
          { code: "MATH270", kind: "course" },
          { code: "CSCI250", kind: "course" },
          { code: "EENG250", kind: "course" },
          { code: "CENG250", kind: "course" },
          { code: "MATH220", kind: "course" },
        ],
        id: "ceng-y1-spring",
        label: "Spring Semester",
        term: "spring",
      },
      {
        entries: [
          { code: "ARAB200", kind: "course" },
          { code: "ENGL251", kind: "course" },
        ],
        id: "ceng-y1-summer",
        label: "Summer Semester",
        term: "summer",
      },
    ],
    year: 1,
  },
  {
    id: "ceng-y2",
    label: "Second Year",
    semesters: [
      {
        entries: [
          { code: "CSCI300", kind: "course" },
          { code: "EENG300", kind: "course" },
          { code: "MATH310", kind: "course" },
          { code: "CENG335", kind: "course" },
          { code: "CENG325", kind: "course" },
          { code: "EENG301L", kind: "course" },
        ],
        id: "ceng-y2-fall",
        label: "Fall Semester",
        term: "fall",
      },
      {
        entries: [
          { code: "EENG350L", kind: "course" },
          { code: "ENGG300", kind: "course" },
          { code: "CENG352L", kind: "course" },
          { code: "EENG385", kind: "course" },
          { code: "CENG375", kind: "course" },
          { code: "CENG380", kind: "course" },
          { code: "EENG350", kind: "course" },
        ],
        id: "ceng-y2-spring",
        label: "Spring Semester",
        term: "spring",
      },
    ],
    year: 2,
  },
  {
    id: "ceng-y3",
    label: "Third Year",
    semesters: [
      {
        entries: [
          { code: "CENG430L", kind: "course" },
          { code: "EENG447", kind: "course" },
          { code: "CENG415", kind: "course" },
          { code: "CENG420", kind: "course" },
          { code: "CENG400L", kind: "course" },
          { code: "CENG400", kind: "course" },
          { code: "CENG435", kind: "course" },
        ],
        id: "ceng-y3-fall",
        label: "Fall Semester",
        term: "fall",
      },
      {
        entries: [
          { code: "CENG450L", kind: "course" },
          { credits: 3, kind: "elective", label: MAJOR_ELECTIVE_LABEL },
          { credits: 3, kind: "elective", label: MAJOR_ELECTIVE_LABEL },
          { code: "CENG455L", kind: "course" },
          {
            credits: 3,
            kind: "elective",
            label: GENERAL_EDUCATION_ELECTIVE_LABEL,
          },
          { code: "CENG495", kind: "course" },
          { code: "EENG467L", kind: "course" },
          { code: "ENGG450", kind: "course" },
        ],
        id: "ceng-y3-spring",
        label: "Spring Semester",
        term: "spring",
      },
    ],
    year: 3,
  },
];

const TENG_PLAN: CceProgram["plan"] = [
  {
    id: "teng-y1",
    label: "First Year",
    semesters: [
      {
        entries: [
          { code: "PHYS220", kind: "course" },
          { code: "CULT200", kind: "course" },
          { code: "MATH210", kind: "course" },
          { code: "ENGG200", kind: "course" },
          { code: "ENGL201", kind: "course" },
          { code: "MATH225", kind: "course" },
        ],
        id: "teng-y1-fall",
        label: "Fall Semester",
        term: "fall",
      },
      {
        entries: [
          { code: "EENG250", kind: "course" },
          { code: "CSCI250", kind: "course" },
          { code: "CENG250", kind: "course" },
          { code: "CSCI250L", kind: "course" },
          { code: "MATH220", kind: "course" },
          { code: "MATH270", kind: "course" },
        ],
        id: "teng-y1-spring",
        label: "Spring Semester",
        term: "spring",
      },
      {
        entries: [
          { code: "ENGL251", kind: "course" },
          { code: "ARAB200", kind: "course" },
        ],
        id: "teng-y1-summer",
        label: "Summer Semester",
        term: "summer",
      },
    ],
    year: 1,
  },
  {
    id: "teng-y2",
    label: "Second Year",
    semesters: [
      {
        entries: [
          { code: "CENG325", kind: "course" },
          { code: "CSCI300", kind: "course" },
          { code: "MATH310", kind: "course" },
          { code: "EENG300", kind: "course" },
          { code: "EENG301L", kind: "course" },
          { code: "CENG335", kind: "course" },
        ],
        id: "teng-y2-fall",
        label: "Fall Semester",
        term: "fall",
      },
      {
        entries: [
          { code: "CENG375", kind: "course" },
          { code: "EENG350L", kind: "course" },
          { code: "CENG380", kind: "course" },
          { code: "CENG352L", kind: "course" },
          { code: "EENG385", kind: "course" },
          { code: "ENGG300", kind: "course" },
          { code: "EENG350", kind: "course" },
        ],
        id: "teng-y2-spring",
        label: "Spring Semester",
        term: "spring",
      },
    ],
    year: 2,
  },
  {
    id: "teng-y3",
    label: "Third Year",
    semesters: [
      {
        entries: [
          { code: "CENG430L", kind: "course" },
          { code: "CENG400L", kind: "course" },
          { code: "EENG447", kind: "course" },
          { code: "CENG420", kind: "course" },
          { code: "CENG435", kind: "course" },
          { code: "CENG415", kind: "course" },
          { code: "CENG400", kind: "course" },
        ],
        id: "teng-y3-fall",
        label: "Fall Semester",
        term: "fall",
      },
      {
        entries: [
          { code: "CENG450L", kind: "course" },
          { code: "EENG467L", kind: "course" },
          { credits: 3, kind: "elective", label: MAJOR_ELECTIVE_LABEL },
          {
            credits: 3,
            kind: "elective",
            label: GENERAL_EDUCATION_ELECTIVE_LABEL,
          },
          { code: "EENG388", kind: "course" },
          { code: "CENG495", kind: "course" },
          { code: "CENG455L", kind: "course" },
          { code: "ENGG450", kind: "course" },
        ],
        id: "teng-y3-spring",
        label: "Spring Semester",
        term: "spring",
      },
    ],
    year: 3,
  },
];

const SHARED_CORE_CODES = [
  "CSCI250",
  "CSCI250L",
  "CSCI300",
  "ENGG200",
  "ENGG300",
  "MATH210",
  "MATH220",
  "MATH225",
  "MATH270",
  "MATH310",
  "PHYS220",
];

const SHARED_MAJOR_CODES = [
  "CENG250",
  "CENG325",
  "CENG335",
  "CENG352L",
  "CENG375",
  "CENG380",
  "CENG400",
  "CENG400L",
  "CENG415",
  "CENG420",
  "CENG430L",
  "CENG435",
  "CENG450L",
  "CENG455L",
  "CENG495",
  "EENG250",
  "EENG300",
  "EENG301L",
  "EENG350",
  "EENG350L",
  "EENG385",
  "EENG447",
  "EENG467L",
];

const GENERAL_EDUCATION_ELECTIVE_NOTE =
  "Picked from a long university-wide list that changes from semester to semester. Check the list open for your term with the registrar before you register.";

export const CENG_PROGRAM: CceProgram = {
  abbreviation: "CENG",
  credits: 108,
  degree: "B.S. in Computer Engineering",
  effectiveMajorElectiveCodes: ["CENG460", "CENG470"],
  id: "ceng",
  links: {
    contractSheet:
      "https://admincms.liu.edu.lb/Admin_CMS26/uploads/pdfs/pdf_6a5de22c683f32.32329589.pdf",
    courseDescriptions:
      "https://admincms.liu.edu.lb/Admin_CMS26/uploads/pdfs/pdf_6a5de22c709829.62895361.pdf",
    planOfStudy:
      "https://admincms.liu.edu.lb/Admin_CMS26/uploads/pdfs/pdf_6a5de22c611664.91099025.pdf",
  },
  majorCode: "CENG",
  plan: CENG_PLAN,
  requirements: [
    {
      category: "core",
      codes: SHARED_CORE_CODES,
      credits: 31,
      label: "Core requirements",
    },
    {
      category: "major-requirement",
      codes: SHARED_MAJOR_CODES,
      credits: 53,
      label: "Major requirements",
    },
    {
      category: "general-education",
      codes: ["ARAB200", "CULT200", "ENGG450", "ENGL201", "ENGL251"],
      credits: 15,
      label: "General education requirements",
    },
    {
      category: "major-elective",
      codes: ["CENG460", "CENG470"],
      credits: 6,
      label: "Major electives",
      note: "Two courses from a list of two, so both are effectively required.",
    },
    {
      category: "general-education-elective",
      codes: [],
      credits: 3,
      label: "General education elective",
      note: GENERAL_EDUCATION_ELECTIVE_NOTE,
    },
  ],
  shortLabel: "Computer Engineering",
  summary:
    "The computer engineering track of the CCE bachelor. It carries the same electronics, circuits, and communications base as the telecommunications track, and adds data structures and analysis of algorithms on top of operating systems.",
  years: 3,
};

export const TENG_PROGRAM: CceProgram = {
  abbreviation: "TENG",
  credits: 108,
  degree: "B.S. in Communications Engineering",
  effectiveMajorElectiveCodes: ["CENG460"],
  id: "teng",
  links: {
    contractSheet:
      "https://admincms.liu.edu.lb/Admin_CMS26/uploads/pdfs/pdf_6a5de22c618f59.41337318.pdf",
    courseDescriptions:
      "https://admincms.liu.edu.lb/Admin_CMS26/uploads/pdfs/pdf_6a5de22c5e8b70.27336333.pdf",
    planOfStudy:
      "https://admincms.liu.edu.lb/Admin_CMS26/uploads/pdfs/pdf_6a5de22c5c9586.25943493.pdf",
  },
  majorCode: "BTENG",
  plan: TENG_PLAN,
  requirements: [
    {
      category: "core",
      codes: [...SHARED_CORE_CODES, "ENGG450"],
      credits: 34,
      label: "Core requirements",
    },
    {
      category: "major-requirement",
      codes: [...SHARED_MAJOR_CODES, "EENG388"],
      credits: 56,
      label: "Major requirements",
    },
    {
      category: "general-education",
      codes: ["ARAB200", "CULT200", "ENGL201", "ENGL251"],
      credits: 12,
      label: "General education requirements",
    },
    {
      category: "major-elective",
      codes: ["CENG460", "CENG480"],
      credits: 3,
      label: "Major elective",
      note: "One course from a list of two. CENG480 has not been opening, so in practice the choice is CENG460.",
    },
    {
      category: "general-education-elective",
      codes: [],
      credits: 3,
      label: "General education elective",
      note: GENERAL_EDUCATION_ELECTIVE_NOTE,
    },
  ],
  shortLabel: "Communications Engineering",
  summary:
    "The telecommunications track of the CCE bachelor. It carries the same computing and circuits base as the computer engineering track, and takes electromagnetic fields and waves in place of data structures and analysis of algorithms.",
  years: 3,
};

export const CCE_PROGRAMS: CceProgram[] = [CENG_PROGRAM, TENG_PROGRAM];
