import type { OpenFile } from "../types";

/** A file's text as kept in this browser, for the copy of the file it was
 * read from. */
export interface StoredFileText {
  /** Each page's text run together, by the page's place in the file. */
  pages: string[];
  version: string;
}

/** A file's text ready to search: as printed, for result lines, and
 * lowercased with every offset unchanged, for matching. */
export interface FileText {
  lowered: string[];
  pages: string[];
}

/** One match, where the reader will find it. */
export interface FileSearchHit {
  /** Its place among the file's matches, which is how the pane's own search
   * counts them. */
  matchIndex: number;
  offset: number;
  /** The page's place in the file as it is arranged now. */
  position: number;
  sourceIndex: number;
}

/** A file's matches, as its group in the results lists them. */
export interface FileSearchGroup {
  count: number;
  file: OpenFile;
  hits: FileSearchHit[];
}

/** A match with the words either side of it. */
export interface FileSearchSnippet {
  after: string;
  before: string;
  match: string;
}

/** A match picked in the dialog, for its pane's search bar to take over. */
export interface FileSearchPick {
  fileId: string;
  matchIndex: number;
  query: string;
}

/** How far through reading the files not read before. */
export interface FileReadProgress {
  done: number;
  total: number;
}
