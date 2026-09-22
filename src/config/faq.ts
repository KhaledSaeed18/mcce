import { CompassIcon, GraduationCapIcon, type LucideIcon } from "lucide-react";
import type { COURSE_CARD_COLORS } from "@/config/courses";
import { EDITOR_MIN_WIDTH_PX } from "@/config/pdf-editor";

export type FaqCategory = "program" | "site";

export interface FaqItem {
  answer: string;
  category: FaqCategory;
  question: string;
}

export interface FaqCategoryGroup {
  color: (typeof COURSE_CARD_COLORS)[number];
  icon: LucideIcon;
  items: FaqItem[];
  label: string;
  value: FaqCategory;
}

export const PROGRAM_FAQ: FaqItem[] = [
  {
    answer:
      "MCCE stands for M.S. in Computer and Communication Engineering, a two-year graduate program in the Department of Computer and Communications Engineering at Lebanese International University (LIU).",
    category: "program",
    question: "What does MCCE stand for?",
  },
  {
    answer: "Two years, combining coursework with a research project.",
    category: "program",
    question: "How long is the program?",
  },
  {
    answer:
      "Modern communications networks and systems: telecommunications, data communications, network architecture, wireless systems, and optical networking.",
    category: "program",
    question: "What does the program focus on?",
  },
  {
    answer:
      "An independent, student-built site for MCCE students. At its core it indexes course files from the program's shared Drive so they can be searched and browsed by semester, course, and file type, and it adds a past exam archive, course pages, and planning tools around them. It is not an official LIU page and is not affiliated with the university.",
    category: "site",
    question: "What is this site, and is it official?",
  },
  {
    answer:
      "The plan of study with a prerequisite roadmap, a GPA calculator on the program's 4.0 scale, a tuition planner with financial aid, an admissions guide for LIU and non-LIU graduates, a PDF editor, and a directory of about 400 tools for the coursework and the thesis. The plan, GPA report, and tuition plan export as PDF.",
    category: "site",
    question: "What is on the site besides the files?",
  },
  {
    answer: `Yes. Open a PDF from its preview, or open the editor from Resources and pick a file in the sidebar. You can draw, add text, boxes, and circles, then rotate, reorder, copy, or remove pages and save a copy. Your markup stays in this browser and the file in Drive never changes. The editor needs a screen at least ${EDITOR_MIN_WIDTH_PX} pixels wide.`,
    category: "site",
    question: "Can I annotate a PDF from the index?",
  },
  {
    answer:
      "Not their files. The index covers the MCCE graduate program only. There is one reference page for the department's two bachelor programs, Computer Engineering (CENG) and Communications Engineering (TENG), with their plans of study, electives, and how the two tracks differ.",
    category: "site",
    question: "Does the site cover the CENG and TENG bachelor programs?",
  },
  {
    answer:
      "The index re-syncs from the shared Drive automatically once a week. A file added to Drive today may take a few days to show up here.",
    category: "site",
    question: "How current is the material?",
  },
  {
    answer:
      "No account for the site itself. Files open in Google Drive using your own Google account, so access follows however each file is shared there.",
    category: "site",
    question: "Do I need an account to open files?",
  },
  {
    answer:
      "Yes. All three folders open straight in Drive: LIU | MCCE 1 for the first year, LIU | MCCE 2.1 for the second year fall semester, and LIU | MCCE 2.2 for the second year spring semester. The links sit on the homepage, in the footer, on the courses page beside each year, and on the sitemap. Every folder page also carries a link to the same folder in Drive.",
    category: "site",
    question: "Can I open the Drive folders directly?",
  },
  {
    answer:
      "To maintain a clear separation of concerns across academic stages. The program is divided into three distinct phases: first year, second year fall, and second year spring. Separating them into dedicated folders prevents clutter and keeps each semester organized, making files easier to locate and index than a single combined folder.",
    category: "site",
    question: "Why are there three different Drive folders instead of one?",
  },
  {
    answer:
      "Yes. Send exams, notes, slides, or recordings through the contact page, in whatever shape they're in. Sorting them into the right semester and course happens from there.",
    category: "site",
    question: "Can I add materials I have?",
  },
  {
    answer:
      "Report it through the contact page or as a GitHub issue. Missing material usually means it hasn't reached the shared Drive yet.",
    category: "site",
    question: "What if a file is missing, broken, or filed wrong?",
  },
  {
    answer:
      "Yes, for pages you've already opened. The site caches them so they keep working without a connection. A page you haven't visited yet still needs network access the first time.",
    category: "site",
    question: "Does this site work offline?",
  },
];

export const PROGRAM_FAQ_GROUPS: FaqCategoryGroup[] = [
  {
    color: "chart-1",
    icon: GraduationCapIcon,
    items: PROGRAM_FAQ.filter((item) => item.category === "program"),
    label: "The program",
    value: "program",
  },
  {
    color: "chart-3",
    icon: CompassIcon,
    items: PROGRAM_FAQ.filter((item) => item.category === "site"),
    label: "Using this site",
    value: "site",
  },
];
