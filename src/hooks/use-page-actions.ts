import { useCallback, useMemo } from "react";
import { duplicatePage } from "@/lib/pdf-editor/duplicate-page";
import { insertSheet } from "@/lib/pdf-editor/insert-sheet";
import { movePage, turnPage, withoutPage } from "@/lib/pdf-editor/pages";
import type {
  EditorSnapshot,
  PageActions,
  PageSheet,
} from "@/lib/pdf-editor/types";

type Commit = (next: (current: EditorSnapshot) => EditorSnapshot) => void;

/** Changes to the pages themselves, which take their markup with them. */
export function usePageActions(commit: Commit): Omit<PageActions, "clip"> {
  const remove = useCallback(
    (id: string) =>
      commit((current) => {
        const pages = withoutPage(current.pages, id);
        // The last page cannot go, and neither should the markup on it.
        if (pages.length === current.pages.length) {
          return current;
        }
        return {
          annotations: current.annotations.filter(
            (annotation) => annotation.pageId !== id
          ),
          pages,
        };
      }),
    [commit]
  );

  const move = useCallback(
    (from: number, to: number) =>
      commit((current) => ({
        ...current,
        pages: movePage(current.pages, from, to),
      })),
    [commit]
  );

  const rotate = useCallback(
    (id: string) =>
      commit((current) => ({
        ...current,
        pages: turnPage(current.pages, id),
      })),
    [commit]
  );

  const copy = useCallback(
    (id: string) => commit((current) => duplicatePage(current, id)),
    [commit]
  );

  const insert = useCallback(
    (afterId: string, sheet: PageSheet) =>
      commit((current) => ({
        ...current,
        pages: insertSheet(current.pages, afterId, sheet),
      })),
    [commit]
  );

  return useMemo(
    () => ({ copy, insertSheet: insert, move, remove, rotate }),
    [copy, insert, move, remove, rotate]
  );
}
