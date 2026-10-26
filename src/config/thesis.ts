import type {
  ThesisChapter,
  ThesisNamedItem,
  ThesisPart,
  ThesisSlrPhase,
  ThesisTopicDomain,
} from "@/lib/thesis/types";

export const THESIS_GUIDE_PATH = "/thesis";

export const THESIS_CHECK_NOTE =
  "Summarised from the CENG695A syllabus and the department's thesis notices. Rules can change between cohorts, so confirm anything binding with your supervisor or the thesis coordinator.";

export const THESIS_FACTS: ThesisNamedItem[] = [
  {
    detail: "CENG695A in the fall and CENG695B in the spring, 3 credits each.",
    title: "Two courses, 6 credits",
  },
  {
    detail:
      "Only groups of two students are allowed. Unpaired students are matched by the coordinator at the end of assignment.",
    title: "Groups of two",
  },
  {
    detail:
      "The department committee assigns a supervisor per group, by campus and availability. The same supervisor and usually the same two committee members follow you through both parts.",
    title: "One supervisor, one committee",
  },
  {
    detail:
      "A single project and a single report, written in the department template across both parts.",
    title: "One project, one report",
  },
  {
    detail:
      "No class sessions. The registered section is virtual, and you meet your supervisor weekly at their availability.",
    title: "Weekly supervisor meetings",
  },
  {
    detail:
      "Each part has its own grade and its own presentation. The grades can differ, since each reflects that term's progress.",
    title: "Two grades, two presentations",
  },
];

/** Checked at registration; a student who misses one is dropped from the section. */
export const THESIS_ELIGIBILITY: string[] = [
  "A GPA of 2.0 or above.",
  "At least 24 credits of the master program completed.",
  "CENG695A is taken in your second-to-last semester, so you graduate the following spring.",
];

export const THESIS_PARTS: ThesisPart[] = [
  {
    code: "CENG695A",
    deliverables: [
      "Topic agreed with your supervisor",
      "Chapters 1 to 5 complete",
      "Chapter 6 as a preliminary design",
      "References from the systematic literature review",
      "Report and presentation to the committee",
    ],
    grading: [
      { activity: "Weekly progress", percent: 30 },
      { activity: "Final report", percent: 40 },
      { activity: "Final presentation", percent: 30 },
    ],
    label: "Part A",
    season: "Fall",
    term: "A",
  },
  {
    code: "CENG695B",
    deliverables: [
      "Chapter 6 updated and detailed",
      "Chapter 7: implementation and results",
      "Chapter 8: conclusion and future work",
      "Abstract, dedication, and acknowledgements",
      "Final report and presentation",
    ],
    grading: [],
    label: "Part B",
    season: "Spring",
    term: "B",
  },
];

export const THESIS_CHAPTERS: ThesisChapter[] = [
  {
    content: "Context, problem, objective, and the thesis outline.",
    number: 1,
    term: "A",
    title: "Introduction",
  },
  {
    content: "The specific problem the thesis solves, in a short chapter.",
    number: 2,
    term: "A",
    title: "Problem statement",
  },
  {
    content: "The theory a CCE engineer outside your niche needs to follow.",
    number: 3,
    term: "A",
    title: "Background",
  },
  {
    content:
      "A critical appraisal of related work through a systematic review.",
    number: 4,
    term: "A",
    title: "Related work",
  },
  {
    content: "Economic, management, ethical, environmental, and standards.",
    number: 5,
    term: "A",
    title: "Non-technical aspects",
  },
  {
    content: "What the system must do, and the top-level design that does it.",
    number: 6,
    term: "AB",
    title: "Specifications and system design",
  },
  {
    content: "The realisation down to code level, then the evaluation.",
    number: 7,
    term: "B",
    title: "Implementation and results",
  },
  {
    content: "Aims and main results restated, then what was left undone.",
    number: 8,
    term: "B",
    title: "Conclusion and future work",
  },
];

export const THESIS_CHAPTER_TERM_LABELS: Record<ThesisChapter["term"], string> =
  {
    A: "Part A",
    AB: "Preliminary in A, developed in B",
    B: "Part B",
  };

export const THESIS_NON_TECHNICAL: ThesisNamedItem[] = [
  {
    detail:
      "Cost-benefit analysis, a bill of materials with estimated costs, and the labour effort in hours or days.",
    title: "Economic and financial",
  },
  {
    detail:
      "Scope, stakeholders, risks, schedule, and milestones, captured with proper tools and artifacts.",
    title: "Project management",
  },
  {
    detail:
      "Privacy, informed consent, fairness, and confidentiality, judged as the project's intent against its impact.",
    title: "Ethical and social",
  },
  {
    detail:
      "Energy use, waste, natural resources, and community health, safety, and welfare.",
    title: "Environment and sustainability",
  },
  {
    detail:
      "The ISO, IEC, IEEE, 3GPP, or NIST standards that constrain the design and its evaluation.",
    title: "Standards",
  },
];

export const THESIS_NON_TECHNICAL_NOTE =
  "Write each one for your project. Generic text is the first thing the committee notices.";

export const THESIS_TOPIC_STEPS: ThesisNamedItem[] = [
  {
    detail: "Start from a course you took in the program.",
    title: "Choose a domain",
  },
  {
    detail: "Brainstorm modern topics, each with machine learning in it.",
    title: "Ask an AI tool",
  },
  {
    detail: "IEEE Xplore, Scopus, and the ACM Digital Library, with keywords.",
    title: "Search databases",
  },
  {
    detail: "Keep the last five years and read the most cited first.",
    title: "Filter and rank",
  },
  {
    detail: "Shortlist, read, and agree the topic with your supervisor.",
    title: "Read and choose",
  },
];

export const THESIS_TOPIC_DOMAINS: ThesisTopicDomain[] = [
  {
    courseCode: "CENG685",
    examples: "Intrusion detection, phishing, IoT trust",
    title: "Security",
  },
  {
    courseCode: "CENG557",
    examples: "SDN, QoS and QoE, traffic analysis",
    title: "Networking",
  },
  {
    courseCode: "EENG537",
    examples: "Detection, coding, modulation",
    title: "Communications",
  },
  {
    courseCode: "EENG587",
    examples: "MIMO, OFDM, 5G and 6G",
    title: "Wireless",
  },
  {
    courseCode: "EENG527",
    examples: "Biomedical signals, audio, radio",
    title: "Signal processing",
  },
  {
    courseCode: "CENG507",
    examples: "Hardware projects, monitoring with AI",
    title: "Embedded and IoT",
  },
  {
    courseCode: "CENG625",
    examples: "Post-quantum schemes, side-channel attacks, key management",
    title: "Cryptography",
  },
  {
    courseCode: "CENG566",
    examples: "Model compression, federated learning, explainability",
    title: "Machine learning",
  },
  {
    courseCode: "CENG646",
    examples: "Anomaly detection, clustering of network logs, prediction",
    title: "Data mining",
  },
];

export const THESIS_AI_REQUIREMENT =
  "Whatever the domain, the topic must have AI at its core.";

export const THESIS_AI_PROMPT =
  "I am a master student in Computer and Communications Engineering. My domain is [IoT security]. Propose 10 modern thesis topics from the last 2 to 3 years, each combining machine learning with this domain, feasible for two students in 7 months with a public dataset or low-cost hardware. For each, give the problem, the ML method, a dataset, the expected result and 5 search keywords.";

export const THESIS_AI_WARNING =
  "Keep the topic ideas and the keywords. Never trust the references an AI tool lists: they invent papers, so verify each one in a database.";

export const THESIS_SEARCH_STRING = [
  '("intrusion detection" OR "anomaly detection")',
  'AND ("machine learning" OR "deep learning")',
  'AND ("Internet of Things" OR IoT)',
] as const;

export const THESIS_SEARCH_NOTE =
  "AND links the main concepts, OR links synonyms. ScienceDirect, Web of Science, and SpringerLink are worth a second pass.";

export const THESIS_FILTER_STEPS: string[] = [
  "Filter to the last five years.",
  "Keep journal and conference papers.",
  "Sort by citations, highest first.",
  "Shortlist about ten papers, including one recent survey.",
];

export const THESIS_READING_ORDER: string[] = [
  "Title and abstract",
  "Conclusion and future work",
  "Figures and result tables",
  "The full paper, for the ones that fit",
];

export const THESIS_READING_NOTE =
  "For each paper, note the dataset, the method, the baseline, and the open problems.";

export const THESIS_TOPIC_CHECKS: string[] = [
  "AI is at its core",
  "Data, a simulator, or hardware is available",
  "A clear baseline to compare against",
  "A gap named in recent papers",
  "Doable by two students in about seven months",
];

export const THESIS_SLR_PHASES: ThesisSlrPhase[] = [
  {
    steps: [
      "Research questions",
      "Keywords and the search query",
      "Databases to search",
      "Inclusion and exclusion criteria",
    ],
    title: "Planning",
  },
  {
    steps: [
      "Identify studies",
      "Remove duplicates",
      "Screen titles and abstracts",
      "Check full-text quality",
      "Extract data",
    ],
    title: "Execution",
  },
  {
    steps: [
      "Comparison tables",
      "Critical analysis",
      "Open issues and gaps",
      "Your research direction",
    ],
    title: "Reporting",
  },
];

export const THESIS_FIRST_MEETING: string[] = [
  "Choose your domain from the program courses.",
  "Generate machine learning topic ideas with an AI tool.",
  "For three candidate topics, list the ten most cited papers of the last five years.",
  "Write one page per candidate: problem, gap, ML method, data, and a preliminary approach.",
];

export const THESIS_TEMPLATE_RULES: ThesisNamedItem[] = [
  {
    detail:
      "The department template is a Word file. Write in it, or match its styles exactly if you draft elsewhere.",
    title: "Word, with its own styles",
  },
  {
    detail:
      "Heading 1 for chapters, Heading 2 to 4 for sections, and the Body style for text. Capitalise principal words in titles, not prepositions or articles.",
    title: "Headings",
  },
  {
    detail:
      "Centred and inline with text. Figure captions go below, table captions above, both numbered by chapter. Every figure and table is cross-referenced in the text.",
    title: "Figures and tables",
  },
  {
    detail:
      "Written last, in Part B. About 200 to 250 words covering topic, method, results, and conclusions, with up to five keywords and no references or acronyms.",
    title: "Abstract",
  },
  {
    detail:
      "Numbered in IEEE style, in the order they are cited. Symbols and abbreviations get their own list, sorted alphanumerically.",
    title: "References and abbreviations",
  },
  {
    detail:
      "Highlighted parts of the template are filled in Part B: dedication, acknowledgements, abstract, and chapters 7 and 8.",
    title: "Highlighted sections",
  },
];

export const THESIS_TEMPLATE_SOURCE =
  "The template is shared by the thesis coordinator in the program's thesis Classroom at the start of Part A.";

/** Page order. `label` is the short form for the jump row. */
export const THESIS_GUIDE_SECTIONS = {
  chapters: { id: "chapters", label: "Chapters" },
  firstMeeting: { id: "first-meeting", label: "First meeting" },
  howItWorks: { id: "how-it-works", label: "How it works" },
  literatureReview: { id: "literature-review", label: "Literature review" },
  nonTechnical: { id: "non-technical", label: "Non-technical" },
  parts: { id: "parts", label: "Parts A and B" },
  template: { id: "template", label: "Template" },
  topic: { id: "topic", label: "Topic" },
} as const;

export const THESIS_GUIDE_ORDER = [
  THESIS_GUIDE_SECTIONS.howItWorks,
  THESIS_GUIDE_SECTIONS.parts,
  THESIS_GUIDE_SECTIONS.chapters,
  THESIS_GUIDE_SECTIONS.nonTechnical,
  THESIS_GUIDE_SECTIONS.topic,
  THESIS_GUIDE_SECTIONS.literatureReview,
  THESIS_GUIDE_SECTIONS.firstMeeting,
  THESIS_GUIDE_SECTIONS.template,
] as const;
