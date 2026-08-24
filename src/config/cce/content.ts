export const CCE_PAGE_PATH = "/cce";

export const CCE_OFFICIAL_UNDERGRADUATE_URL =
  "https://cce.liu.edu.lb/academic-programs/undergraduate-programs";
export const CCE_OFFICIAL_DEPARTMENT_URL = "https://cce.liu.edu.lb";

export const CCE_META_TITLE =
  "LIU CCE Bachelor: Computer Engineering (CENG) and Communications Engineering (TENG)";

export const CCE_META_DESCRIPTION =
  "The LIU CCE undergraduate programs in one page: B.S. in Computer Engineering (CENG) and B.S. in Communications Engineering (TENG), 108 credits over three years, with the full plan of study, prerequisites, corequisites, course descriptions, electives, and admissions requirements.";

export const CCE_INTRO_PARAGRAPHS: string[] = [
  "CCE is the Department of Computer and Communications Engineering in the School of Engineering at the Lebanese International University (LIU). At the undergraduate level it runs two bachelor tracks: Computer Engineering (CENG) and Communications Engineering (TENG). Both are 108 credits and both are laid out over three years, summer semesters included.",
  "The two tracks share a single base: programming and object-oriented design, digital logic, circuits and electronics, signals and systems, microcontrollers, databases, web and mobile development, communication networks, analog communications, and a senior project, each with its lab. Out of the 41 courses on either track, 40 are the same course.",
  "The department also runs a graduate program, the M.S. in Computer and Communication Engineering (MCCE). That master's program is what the rest of this site indexes.",
];

export const CCE_SCOPE_NOTE_TITLE = "This site is built around the master's";

export const CCE_SCOPE_NOTE_BODY =
  "Everything else here, the course pages, the materials index, the plan of study, the GPA calculator, and the tuition planner, targets the MCCE graduate program, not the CENG or TENG bachelor. This page exists as a reference for the undergraduate programs in the same department, because the official pages spread the same information across six PDFs. It is not an official LIU page.";

export const CCE_ELECTIVE_NOTES: string[] = [
  "Major electives are published as a choice, but there are only two options on either list, so there is little to choose. Computer Engineering needs 6 credits of major electives and the list holds exactly two courses, CENG460 and CENG470, which makes both of them required in practice. Communications Engineering needs 3 credits from a list of CENG460 and CENG480, and CENG480 has not been opening in any semester, which leaves CENG460.",
  "The department publishes no course description for CENG460, CENG470, or CENG480 in either course description PDF.",
  "The general education elective is the one slot with a real choice. It is drawn from a long university-wide list that is not fixed: courses come and go between terms. Ask the registrar or check the course offering for your own semester rather than planning against an old list.",
];

export const CCE_DIFFERENCE_NOTE =
  "This compares the courses on each plan of study. Whatever else separates the two degrees, in accreditation, in the title on the diploma, or in what employers read into it, is outside what the plans of study say.";

export const CCE_ADMISSIONS_INTRO =
  "Documents to prepare when applying to LIU as a bachelor student, as published by the university. Confirm current requirements and fees with the admissions office before you apply.";

export const CCE_ADMISSIONS_REQUIREMENTS: string[] = [
  "Certified copy of the Lebanese Baccalaureate Degree (BACC II) or Technical Baccalaureate degree (BT3), or their equivalence (Foreign Baccalaureate).",
  "TOEFL (International iBT) or IELTS score, if available, otherwise you must sit for the LIU English Placement Test.",
  "One copy of the identification card.",
  "One copy of family civil status record.",
  "One recent passport-sized colored photograph.",
  "All Lebanese applicants must submit their national social security papers (daman), if available, or pay $135 and fill the appropriate papers at the social security office.",
  "$30 non-refundable application fee.",
  "$20 for each entrance exam.",
];

export interface CceFaqItem {
  answer: string;
  question: string;
}

export const CCE_FAQ: CceFaqItem[] = [
  {
    answer:
      "CCE stands for Computer and Communications Engineering, the department in the LIU School of Engineering. At the bachelor level it runs two programs: Computer Engineering (CENG) and Communications Engineering (TENG). At the graduate level it runs the M.S. in Computer and Communication Engineering (MCCE).",
    question: "What does CCE mean at LIU?",
  },
  {
    answer:
      "Both the B.S. in Computer Engineering and the B.S. in Communications Engineering are 108 credits, published as a three-year plan of study that uses the summer semester of the first year.",
    question: "How many credits and how many years is the LIU CCE bachelor?",
  },
  {
    answer:
      "One course. Both tracks share 40 of their 41 courses. Computer Engineering takes CENG470, Data Structures and Analysis of Algorithms. Communications Engineering takes EENG388, Electromagnetic Fields and Waves, instead. Everything else on the two plans of study is identical.",
    question:
      "What is the difference between Computer Engineering (CENG) and Communications Engineering (TENG) at LIU?",
  },
  {
    answer:
      "Computer Engineering needs 6 credits of major electives from a list of two courses, CENG460 Operating Systems and CENG470 Data Structures and Analysis of Algorithms, so both end up being taken. Communications Engineering needs 3 credits from CENG460 or CENG480 Introduction to GIS, and CENG480 has not been opening, so the choice is CENG460.",
    question: "Which major electives can CCE bachelor students choose?",
  },
  {
    answer:
      "It is a 3 credit slot drawn from a long university-wide list that changes between semesters. Check the offering open for your own term with the registrar rather than an older list.",
    question: "What is the general education elective?",
  },
  {
    answer:
      "MCCE is the M.S. in Computer and Communication Engineering, the department's graduate program, 52 credits over two years. CENG and TENG are the bachelor programs, 108 credits over three years. This site indexes the MCCE materials; this page is a reference for the bachelor programs.",
    question: "How is MCCE different from CENG and TENG?",
  },
];
