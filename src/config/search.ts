/**
 * Words students type that no longer appear anywhere in the tree, mapped to the
 * vocabulary that replaced them. "Material" was the folder name for lectures in
 * every course before the folders were normalised, so it has to keep working.
 */
export const SEARCH_SYNONYMS: Record<string, string[]> = {
  hw: ["homework", "assignment"],
  material: ["lecture"],
  materials: ["lecture"],
  midterms: ["midterm"],
  notes: ["lecture", "summary"],
  paper: ["exam"],
  papers: ["exam"],
  practice: ["exercise"],
  quiz: ["assessment"],
  quizzes: ["assessment"],
  slides: ["lecture"],
  solved: ["solution"],
};

export function expandToken(token: string): string[] {
  return [token, ...(SEARCH_SYNONYMS[token] ?? [])];
}
