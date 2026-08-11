export interface FaqItem {
  answer: string;
  question: string;
}

export const PROGRAM_FAQ: FaqItem[] = [
  {
    answer:
      "MCCE stands for M.S. in Computer and Communication Engineering, a two-year graduate program in the Department of Computer and Communications Engineering at Lebanese International University (LIU).",
    question: "What does MCCE stand for?",
  },
  {
    answer:
      "An independent materials browser for MCCE students. It indexes course files from the program's shared drive so they can be searched and browsed by semester, course, and file type. It is not an official LIU page.",
    question: "What is this site?",
  },
  {
    answer: "Two years, combining coursework with a research project.",
    question: "How long is the MCCE program?",
  },
  {
    answer:
      "Modern communications networks and systems: telecommunications, data communications, network architecture, wireless systems, and optical networking.",
    question: "What does the MCCE program focus on?",
  },
];
