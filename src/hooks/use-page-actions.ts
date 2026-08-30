import { useCallback } from "react";
import { movePage, withoutPage } from "@/lib/pdf-editor/pages";
import type { EditorSnapshot } from "@/lib/pdf-editor/types";

type Commit = (next: (current: EditorSnapshot) => EditorSnapshot) => void;

/** Changes to the pages themselves, which take their markup with them. */
export function usePageActions(commit: Commit) {
  const removePage = useCallback(
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

  const reorderPage = useCallback(
    (from: number, to: number) =>
      commit((current) => ({
        ...current,
        pages: movePage(current.pages, from, to),
      })),
    [commit]
  );

  return { removePage, reorderPage };
}
