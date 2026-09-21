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
    note: "Lock the problem sentence, method family, dataset or testbed, baselines, and target venue before searching in depth. Bring three candidate titles and five seed papers to the first advisor meeting.",
    term: "A",
  },
  {
    defaultPick: "google-scholar",
    id: "search",
    label: "Systematic search",
    note: "Record database, exact query, date, and hit count for every search, including the ones that found nothing. Run each query in at least two databases.",
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
    note: "Work the list top down before asking anyone for a copy. Paywalled sources go through the LIU library, never a mirror.",
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
    note: "Confirm the thesis office template first; it decides LaTeX, Typst, or Word. Write methodology and setup in term one, before results exist.",
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
    note: "Mirror the plan as a Gantt with proposal, mid-review, and defense as fixed milestones. Build the deck from the same source as the thesis so numbers cannot drift.",
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

/** The week-by-week shape four of the research drafts agree on. */
export const THESIS_ROUTE_MAP: ThesisRouteMapRow[] = [
  { activity: "Topic discovery and scope", term: "A", weeks: "1 to 4" },
  {
    activity: "Literature search and structured reading",
    term: "A",
    weeks: "5 to 10",
  },
  {
    activity: "Proposal chapter and agreed method",
    term: "A",
    weeks: "11 to 16",
  },
  { activity: "Implementation and experiments", term: "B", weeks: "1 to 8" },
  {
    activity: "Analysis, figures, and results chapters",
    term: "B",
    weeks: "9 to 12",
  },
  {
    activity: "Polishing, integrity check, submission",
    term: "B",
    weeks: "13 to 16",
  },
];
