import type { ThesisNamedItem, ThesisTip } from "@/lib/thesis/types";

export const THESIS_DOMAIN_TIPS: ThesisTip[] = [
  {
    text: "Pick the course whose project you enjoyed most. You will live with this topic for seven months.",
  },
  {
    text: "Favour a domain where you already have data, hardware, or a simulator you have used, such as MATLAB, ns-3, or GNU Radio.",
  },
  {
    text: "If you work full time, a dataset-driven topic is safer than one that depends on lab hours.",
  },
];

export const THESIS_PRESSURE_TEST_PROMPT =
  "Here is a candidate master thesis topic: [one-sentence topic]. Act as a critical thesis committee member. (1) Is the scope too large or too small for two students over two 14-week semesters? (2) Which public datasets fit, and would we need to synthesise data? (3) How would we simulate or test it, and what baseline would we compare against? (4) What are the main risks, and what is a smaller fallback version? (5) Give search keywords and synonyms for IEEE Xplore and Scopus. Do not cite papers; describe the kinds of recent work I should look for instead.";

export const THESIS_AI_TIPS: ThesisTip[] = [
  {
    text: "Give the tool context: your courses, the hardware you can reach, your coding level, and the hours you have each week.",
  },
  {
    text: "Ask for ten ideas, then ask it to rank them by feasibility and data availability. The first answer is rarely the best one.",
  },
  {
    links: [
      { href: "https://elicit.com", label: "Elicit" },
      { href: "https://consensus.app", label: "Consensus" },
      { href: "https://www.undermind.ai", label: "Undermind" },
    ],
    text: "Research assistants that answer from real papers give citations you can check.",
  },
];

export const THESIS_SEARCH_TIPS: ThesisTip[] = [
  {
    text: "Search title, abstract, and keywords only. A full-text search returns thousands of passing mentions.",
  },
  {
    text: "Use a wildcard for word families: detect* matches detect, detection, and detector.",
  },
  {
    text: "Open the best paper you find and copy its author keywords and IEEE index terms into your query.",
  },
  {
    links: [
      { href: "https://scholar.google.com", label: "Google Scholar" },
      { href: "https://www.connectedpapers.com", label: "Connected Papers" },
    ],
    text: "From your strongest paper, open Cited by to find newer work that builds on it.",
  },
];

export const THESIS_GAP_SOURCES: string[] = [
  "The open challenges or future directions section of a recent survey.",
  "The limitations and future work paragraphs of papers from the last two years.",
  "Result tables that test only on an old dataset, such as NSL-KDD for intrusion detection, when newer ones exist.",
  "Models shown to work in the cloud but never run on an edge device under real latency or energy limits.",
];

export const THESIS_DATA_SOURCES: ThesisTip = {
  links: [
    { href: "https://ieee-dataport.org", label: "IEEE DataPort" },
    { href: "https://www.kaggle.com/datasets", label: "Kaggle" },
    { href: "https://archive.ics.uci.edu", label: "UCI repository" },
  ],
  text: "Check the dataset section of the papers you shortlist first, then the public repositories. Note each dataset's size, licence, and year.",
};

export const THESIS_CONTRIBUTION_NOTE =
  "A master thesis does not need a new algorithm. It needs a clear improvement, measured against a baseline. Most feasible topics fit one of these shapes.";

export const THESIS_CONTRIBUTION_TYPES: ThesisNamedItem[] = [
  {
    detail:
      "Take a method that works in one field and test it in yours, for example a vision model applied to radio signal classification.",
    title: "Transfer a method",
  },
  {
    detail:
      "Run several published methods on the same newer dataset with the same metrics, and explain where each one fails.",
    title: "Compare fairly",
  },
  {
    detail:
      "Compress or quantise a model so it runs on a microcontroller or edge device, then measure what accuracy it loses.",
    title: "Make it lighter",
  },
  {
    detail:
      "Fuse two data sources or two methods that earlier papers used separately, and show the gain over each alone.",
    title: "Combine",
  },
];

export const THESIS_TOPIC_FORMULA =
  "Improve [metric] of [task] on [dataset or testbed] using [method], compared with [baseline].";

export const THESIS_TOPIC_FORMULA_EXAMPLE =
  "Raise the F1 score of IoT intrusion detection on CICIoT2023 using a lightweight transformer, compared with random forest and CNN baselines.";

export const THESIS_TOPIC_FORMULA_NOTE =
  "If you cannot fill every bracket, the topic is not ready for your supervisor.";

export const THESIS_TOPIC_RED_FLAGS: string[] = [
  "No public dataset, and collecting one would take months.",
  "Hardware that costs more than the group can spend or the lab can lend.",
  "Almost no papers in five years, so no baseline, or hundreds of near-identical ones, so no gap.",
  "Apply deep learning to X, with no metric or baseline named.",
  "A new dataset and a new model, both in seven months.",
];

export const THESIS_PROGRESS_LOG_TIP =
  "Keep a shared log from week one: the date, what you did, what blocked you, and the next step. Weekly progress is 30% of the Part A grade, and the log is your evidence.";
