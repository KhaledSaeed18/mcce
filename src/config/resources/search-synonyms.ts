/**
 * Words students type that no tool is literally named after, mapped to the
 * names and tags that answer them. Same shape as SEARCH_SYNONYMS for files.
 */
export const RESOURCE_SEARCH_SYNONYMS: Record<string, string[]> = {
  ai: ["assistant", "llm"],
  bib: ["bibtex", "reference"],
  bibliography: ["reference", "citation"],
  chatbot: ["assistant"],
  cite: ["reference", "citation"],
  compress: ["pdf", "image", "video"],
  convert: ["pdf", "image", "converter"],
  diagram: ["diagramming", "flowchart"],
  gpu: ["colab", "kaggle"],
  latex: ["typesetting", "overleaf", "typst"],
  logo: ["figure", "vector"],
  matlab: ["octave"],
  notebook: ["jupyter", "colab"],
  paper: ["literature", "search", "preprint"],
  papers: ["literature", "search", "preprint"],
  pdf: ["file", "document"],
  plagiarism: ["similarity", "integrity"],
  presentation: ["slides", "deck"],
  sdr: ["radio", "signal"],
  slides: ["deck", "presentation"],
  thesis: ["writing", "reference", "typesetting"],
  whiteboard: ["diagramming", "canvas"],
};

export function expandResourceToken(token: string): string[] {
  return [token, ...(RESOURCE_SEARCH_SYNONYMS[token] ?? [])];
}
