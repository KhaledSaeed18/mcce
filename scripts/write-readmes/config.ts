import type { ResourceCategoryId } from "../../src/lib/resources/types";

export const ROOT_README_NAME = "README (start here)";

/** A blank doc made in the Drive UI is named "Untitled document"; anything else here is already ours. */
export const README_NAME_PATTERN = /^(README|Untitled)/;

export const MATERIAL_FOLDER_DESCRIPTIONS: Record<string, string> = {
  Lectures: "Slides, notes, chapters, and recordings, grouped per lecture",
  Exercises: "Practice problems and tutorials, often with worked solutions",
  Assignments: "Graded homework",
  Assessments: "In-semester graded quizzes",
  "Self Assessments": "Ungraded practice sets to check yourself against",
  Labs: "Lab experiments and their handouts",
  Exams: "Past papers, split into Midterm and Final",
  Books: "Reference textbooks for the course",
  Project: "Course project briefs and material",
};

export const MATERIAL_FOLDER_ORDER = Object.keys(MATERIAL_FOLDER_DESCRIPTIONS);

export const COURSE_RESOURCE_CATEGORY: Record<string, ResourceCategoryId> = {
  CENG507: "embedded",
  CENG557: "networking",
  CENG566: "ml",
  CENG566L: "ml",
  CENG625: "security",
  CENG645: "wireless",
  CENG646: "data-mining",
  CENG675: "multimedia",
  CENG678: "vision",
  CENG679: "satellite",
  CENG685: "security",
  EENG527: "dsp",
  EENG537: "wireless",
  EENG587: "wireless",
  ENGG515: "math",
  ENGG550: "productivity",
};

export const SITE_PAGES: [path: string, label: string, purpose: string][] = [
  [
    "/search",
    "Search",
    "Every file in both years, filtered by semester, course, material type, or file type",
  ],
  [
    "/course",
    "Courses",
    "Every course with its description, prerequisites, and material grouped by type",
  ],
  [
    "/exams",
    "Past exams",
    "Every midterm, final, and assessment, grouped by course and by term",
  ],
  [
    "/plan-of-study",
    "Plan of study",
    "The curriculum year by year, with credits, prerequisites, and corequisites",
  ],
  [
    "/gpa-calculator",
    "GPA calculator",
    "Semester and cumulative GPA on the program scale, with a target projection",
  ],
  [
    "/tuition-fees",
    "Tuition and fees",
    "Cost per credit and per semester, with a planner you can export",
  ],
  [
    "/admissions",
    "Admissions",
    "Requirements, documents, and steps to join the program",
  ],
  [
    "/resources",
    "Tools and resources",
    "Software and references picked per subject: DSP, networking, ML, security, and more",
  ],
  [
    "/resources/thesis",
    "Thesis guide",
    "Stages of the master thesis, with tools for each one",
  ],
  [
    "/resources/student",
    "Student perks",
    "Free software and services available with a student email",
  ],
  [
    "/editor",
    "PDF editor",
    "Annotate, sign, and fill PDFs in the browser, nothing uploaded",
  ],
  [
    "/recent",
    "Recently added",
    "What the latest sync picked up, with an RSS feed",
  ],
  ["/saved", "Saved", "Your own shortlist of files, kept in your browser"],
  ["/faq", "FAQ", "How the program, the syncing, and file access work"],
];

export const NAMING_RULES = [
  "<b>[Solution]</b> at the start marks a worked solution. The file without it is the question paper.",
  "<b>V1, V2, V3</b> mark different versions of the same paper, usually different exam rooms or sittings.",
  "<b>Fall-2025-2026</b> or <b>Spring-2025-2026</b> give the term a paper was sat. A file with no term is one where the original never recorded it.",
  "Numbers are padded, so <i>Lecture 02</i> sorts before <i>Lecture 10</i> instead of after it.",
];

/** Notes that only make sense for one Drive, keyed by DRIVE_SOURCES id. */
export const SOURCE_NOTES: Record<string, string> = {
  "year2-spring":
    "<b>This semester is still thin.</b> Courses marked empty below have no material yet. Anything you can share for them makes the biggest difference here.",
};
