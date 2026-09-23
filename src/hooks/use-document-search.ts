import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDocumentText } from "@/hooks/use-document-text";
import { useSearchHotkey } from "@/hooks/use-search-hotkey";
import {
  findMatches,
  groupHitsByPosition,
} from "@/lib/pdf-editor/find-matches";
import type { EditorPage, SearchMatch } from "@/lib/pdf-editor/types";

interface DocumentSearchOptions {
  doc: PDFDocumentProxy | null;
  goToPage: (position: number) => void;
  pages: EditorPage[];
}

/** Search across the open file: the query, what it matches, and which match
 * the reader is on. Typing jumps to the first match once one is found. */
export function useDocumentSearch({
  doc,
  goToPage,
  pages,
}: DocumentSearchOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQueryState] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  // Bumped on every open, so a field already on screen takes focus again.
  const [focusRequest, setFocusRequest] = useState(0);
  const jumpedQueryRef = useRef<string | null>(null);
  const text = useDocumentText(doc, isOpen);

  const matches = useMemo<SearchMatch[]>(
    () =>
      isOpen
        ? findMatches(
            pages.map((page) => text.pages[page.sourceIndex]),
            query
          )
        : [],
    [isOpen, pages, query, text.pages]
  );
  const current = matches.length
    ? Math.min(currentIndex, matches.length - 1)
    : -1;

  const goTo = useCallback(
    (index: number) => {
      if (!matches.length) {
        return;
      }
      const wrapped = (index + matches.length) % matches.length;
      setCurrentIndex(wrapped);
      goToPage(matches[wrapped].position);
    },
    [goToPage, matches]
  );

  const firstMatch = matches.at(0);
  useEffect(() => {
    if (!firstMatch || jumpedQueryRef.current === query) {
      return;
    }
    jumpedQueryRef.current = query;
    goToPage(firstMatch.position);
  }, [firstMatch, goToPage, query]);

  const setQuery = useCallback((nextQuery: string) => {
    setQueryState(nextQuery);
    setCurrentIndex(0);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    setFocusRequest((count) => count + 1);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1), [current, goTo]);

  useSearchHotkey(open);

  const hitsByPosition = useMemo(
    () => groupHitsByPosition(matches, current),
    [current, matches]
  );

  return {
    close,
    current,
    focusRequest,
    hitsByPosition,
    isOpen,
    isReading: isOpen && !text.isComplete,
    matchCount: matches.length,
    next,
    open,
    previous,
    query,
    setQuery,
  };
}
