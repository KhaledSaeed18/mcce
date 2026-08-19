/**
 * The canonical category folders every course uses, in the order the site
 * lists them. A course only carries the ones it has material for.
 */
export const COURSE_CATEGORIES = [
  "Lectures",
  "Exercises",
  "Assignments",
  "Assessments",
  "Self Assessments",
  "Labs",
  "Exams",
  "Books",
] as const;

export interface PrefixRewrite {
  from: string[];
  to: string[];
}

const FALL = "First Year | Fall Semester";
const SPRING = "First Year | Spring Semester";

const CENG507 = "CENG507 - Embedded Systems";
const EENG527 = "EENG527 - Digital Signal Processing";
const EENG537 = "EENG537 - Digital Communications";
const ENGG515 = "ENGG515 - Advanced Engineering Mathematics";
const CENG557 = "CENG557 - Advanced Network Architectures";
const CENG566 = "CENG566 - Machine Learning";
const CENG566L = "CENG566L - Machine Learning Laboratory";
const CENG675 = "CENG675 - Multimedia Networks";
const EENG587 = "EENG587 - Wireless Communication";

function rewrite(
  semester: string,
  course: string,
  from: string[],
  to: string[]
): PrefixRewrite {
  return {
    from: [semester, course, ...from],
    to: [semester, course, ...to],
  };
}

/**
 * Path-prefix rewrites, longest match wins. Every course ends up with the same
 * category vocabulary, which is what both the Drive tree and the site's
 * material-type filter read.
 */
export const COURSE_REWRITES: PrefixRewrite[] = [
  rewrite(FALL, CENG507, ["Material+Summaries"], ["Lectures"]),
  rewrite(
    FALL,
    CENG507,
    ["CENG507 | Assessments-Fall-2025-2026"],
    ["Assessments"]
  ),
  // The only papers it holds are midterms, so it becomes the Midterm folder itself.
  rewrite(FALL, CENG507, ["[OLD]Exams"], ["Exams", "Midterm"]),
  rewrite(FALL, CENG507, ["Final"], ["Exams", "Final"]),
  rewrite(FALL, CENG507, ["Book"], ["Books"]),

  rewrite(FALL, EENG527, ["Materials"], ["Lectures"]),
  rewrite(FALL, EENG527, ["Homeworks+Exercises"], ["Assignments"]),
  rewrite(
    FALL,
    EENG527,
    ["Assignments", "[Exercise]Z-Transform"],
    ["Exercises", "Z-Transform"]
  ),
  rewrite(
    FALL,
    EENG527,
    ["Exams", "Final", "Final+Solution"],
    ["Exams", "Final", "V1 with Solution"]
  ),

  rewrite(FALL, EENG537, ["Materials"], ["Lectures"]),
  rewrite(FALL, EENG537, ["Exams+Assignments"], ["Exams"]),
  rewrite(FALL, EENG537, ["Exams", "Assignments | 2025-2026"], ["Assignments"]),
  rewrite(FALL, EENG537, ["Book"], ["Books"]),

  rewrite(FALL, ENGG515, ["Material"], ["Lectures"]),
  rewrite(FALL, ENGG515, ["Exams+Assignments"], ["Exams"]),
  rewrite(FALL, ENGG515, ["Exams", "Assignments | 2025-2026"], ["Assignments"]),

  rewrite(SPRING, CENG557, ["Material"], ["Lectures"]),
  rewrite(SPRING, CENG557, ["Assessments | 2025-2026"], ["Assessments"]),

  rewrite(SPRING, CENG566, ["Material"], ["Lectures"]),
  rewrite(SPRING, CENG566, ["Assessments | 2025-2026"], ["Assessments"]),

  rewrite(SPRING, CENG566L, ["Material", "Lectures"], ["Lectures"]),
  rewrite(SPRING, CENG566L, ["Material", "Experiments"], ["Labs"]),
  rewrite(SPRING, CENG566L, ["Assessments | 2025-2026"], ["Assessments"]),

  rewrite(SPRING, CENG675, ["Material"], ["Lectures"]),
  rewrite(SPRING, CENG675, ["Assessments | 2025-2026"], ["Assessments"]),
  // Drive allows a slash in a name; the site's breadcrumb joins on " / " and cannot.
  rewrite(
    SPRING,
    CENG675,
    ["Exams", "Final", "AI Generated Exams (Practice)", "True/False"],
    ["Exams", "Final", "AI Generated Exams (Practice)", "True or False"]
  ),

  rewrite(SPRING, EENG587, ["Material"], ["Lectures"]),
  rewrite(SPRING, EENG587, ["Assessments | 2025-2026"], ["Assessments"]),
  rewrite(
    SPRING,
    EENG587,
    ["Ungraded Self Assessments | 2025-2026"],
    ["Self Assessments"]
  ),
];

/** Loose assessment papers that sat in an exam folder because the course had none. */
export const ASSESSMENT_FILE_MOVES: {
  course: [string, string];
  from: string[];
}[] = [
  { course: [FALL, EENG537], from: ["Exams"] },
  { course: [FALL, ENGG515], from: ["Exams"] },
  { course: [FALL, EENG527], from: ["Exams", "Midterm"] },
];

export const ASSESSMENT_FILE_PATTERN = /assessment/i;

/**
 * One-off file renames the mechanical rules cannot derive. Keyed by the full
 * current path so the intent stays readable next to the tree it describes.
 */
export const FILE_RENAMES: Record<string, string> = {
  // Every other set carries a single ~600KB solution PDF; this course has a
  // second, much larger one that would otherwise collide with it once the
  // [Solved] and [Solution] spellings are folded together.
  [[FALL, EENG537, "Exercises", "Set 2", "[Solved]Exercises-Set2.pdf"].join(
    "/"
  )]: "[Solution]V2-Exercises-Set2.pdf",
};
