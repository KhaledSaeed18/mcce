import { useCallback, useEffect, useRef } from "react";
import type { SearchMatch } from "@/lib/pdf-editor/types";

/** Goes to the first match of each new query once it is found, or to a
 * match asked for by its place, once the text has been read that far. */
export function useSearchJump(
  matches: SearchMatch[],
  query: string,
  goToPage: (position: number) => void
) {
  const jumpedQueryRef = useRef<string | null>(null);
  const pendingRef = useRef<{ index: number; query: string } | null>(null);

  const firstMatch = matches.at(0);
  useEffect(() => {
    if (!firstMatch || jumpedQueryRef.current === query) {
      return;
    }
    jumpedQueryRef.current = query;
    goToPage(firstMatch.position);
  }, [firstMatch, goToPage, query]);

  const pending = pendingRef.current;
  // A query typed since the match was asked for goes to its own first match.
  const target =
    pending?.query === query ? matches.at(pending.index) : undefined;
  useEffect(() => {
    if (!target) {
      return;
    }
    pendingRef.current = null;
    goToPage(target.position);
  }, [goToPage, target]);

  /** Takes the match at `index` of `nextQuery` as the one to go to, in place
   * of the first. */
  return useCallback((nextQuery: string, index: number) => {
    jumpedQueryRef.current = nextQuery;
    pendingRef.current = { index, query: nextQuery };
  }, []);
}
