import type { ThesisStageId, ThesisTerm } from "@/lib/resources/types";

export interface ThesisStage {
  /** The one tool shown in the default stack table. */
  defaultPick: string;
  id: ThesisStageId;
  label: string;
  /** Two sentences on what happens at this point of the thesis. */
  note: string;
  term: ThesisTerm;
}

/** In thesis order. CENG695A is term A, CENG695B is term B. */
export const THESIS_STAGES: ThesisStage[] = [
  {
    defaultPick: "openalex",
    id: "frame",
    label: "Frame the topic",
    note: "Lock the problem sentence, method family, dataset or testbed, and baseline before searching in depth, with AI at the core of the method. Bring three candidates to the first supervisor meeting, each with its ten most cited papers of the last five years and a one-page summary.",
    term: "A",
  },
  {
    defaultPick: "google-scholar",
    id: "search",
    label: "Systematic search",
    note: "Run each query in at least two of IEEE Xplore, Scopus, and the ACM Digital Library, filtered to the last five years. Record database, exact query, date, and hit count for every search, including the ones that found nothing.",
    term: "A",
  },
  {
    defaultPick: "research-rabbit",
    id: "map",
    label: "Citation graph widening",
    note: "Start from five to ten seed papers and map what they cite and what cites them. Stop when a new round returns only papers already in the collection.",
    term: "A",
  },
  {
    defaultPick: "unpaywall",
    id: "retrieve",
    label: "Get the PDF legally",
    note: "Work the list top down before asking anyone for a copy. Paywalled sources go through the university library, never a mirror.",
    term: "A",
  },
  {
    defaultPick: "asreview",
    id: "screen",
    label: "Screen and synthesise",
    note: "Define inclusion criteria before screening, then log every exclusion. An AI memo may summarise a paper you included; it must never be the source of a citation.",
    term: "A",
  },
  {
    defaultPick: "zotero",
    id: "cite",
    label: "Reference hygiene",
    note: "Pick one manager by week two and never keep two libraries. One references.bib at the repository root, stable keys, weekly DOI check.",
    term: "A",
  },
  {
    defaultPick: "oatd",
    id: "prior-theses",
    label: "Read prior theses",
    note: "For each prior thesis note the question, method, testbed, baselines, metrics, and chapter lengths. That table becomes the scope model for the proposal.",
    term: "A",
  },
  {
    defaultPick: "docker",
    id: "experiment",
    label: "Experiments and data",
    note: "Reproduce a published baseline before building anything new. One command must regenerate every reported figure from raw inputs, or the work is a draft.",
    term: "B",
  },
  {
    defaultPick: "matplotlib",
    id: "analyse",
    label: "Analysis and figures",
    note: "Report a mean and a dispersion for every number; a single run proves nothing. Vector figures with matched fonts and a colormap that survives greyscale.",
    term: "B",
  },
  {
    defaultPick: "quarto",
    id: "write",
    label: "Write and typeset",
    note: "The department template is a Word file, so write in it or render to it with the template as the reference document. Chapters 1 to 5 and a preliminary design are due at the end of Part A, so writing starts in term one.",
    term: "B",
  },
  {
    defaultPick: "zenodo",
    id: "integrity",
    label: "Integrity and archiving",
    note: "Every citation resolves to a paper you opened, and every figure has a generating script. Tag the commit that produced the results and mint a DOI for it.",
    term: "B",
  },
  {
    defaultPick: "projectlibre",
    id: "defend",
    label: "Plan the work and defend",
    note: "Mirror the plan as a Gantt with the Part A and Part B committee presentations as fixed milestones; it also feeds the project management section of chapter 5. Build the deck from the same source as the thesis so numbers cannot drift.",
    term: "B",
  },
];

export const THESIS_TERM_LABELS: Record<ThesisTerm, string> = {
  A: "CENG695A",
  B: "CENG695B",
};

export interface ThesisRouteMapRow {
  activity: string;
  term: ThesisTerm;
  weeks: string;
}

/**
 * Paced over the 14-week terms of the CENG695A syllabus. The deliverables are the
 * department's; the week splits are a suggestion.
 */
export const THESIS_ROUTE_MAP: ThesisRouteMapRow[] = [
  {
    activity: "Topic chosen and agreed with the supervisor",
    term: "A",
    weeks: "1 to 3",
  },
  {
    activity: "Systematic review and chapters 1 to 4",
    term: "A",
    weeks: "4 to 9",
  },
  {
    activity: "Chapter 5, preliminary design, report, and presentation",
    term: "A",
    weeks: "10 to 14",
  },
  {
    activity: "Detailed design and implementation",
    term: "B",
    weeks: "1 to 7",
  },
  {
    activity: "Experiments, results, and chapter 7",
    term: "B",
    weeks: "8 to 11",
  },
  {
    activity: "Chapter 8, abstract, final report, and defense",
    term: "B",
    weeks: "12 to 14",
  },
];
