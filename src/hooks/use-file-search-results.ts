import { useDeferredValue, useMemo } from "react";
import { FILE_SEARCH_RESULT_LIMIT } from "@/config/pdf-editor";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { findFileHits } from "@/lib/pdf-editor/file-search/file-hits";
import type {
  FileSearchGroup,
  FileText,
} from "@/lib/pdf-editor/file-search/types";
import { readDocument } from "@/lib/pdf-editor/storage";
import type { EditorPage, OpenFile } from "@/lib/pdf-editor/types";

interface FileSearchResultsOptions {
  files: OpenFile[];
  panes: EditorPaneView[];
  query: string;
  texts: ReadonlyMap<string, FileText>;
}

/** The pages as the reader has them: moved, turned, removed, or added. A
 * file on screen has them in its session; any other, as it was left. */
function findLayout(
  file: OpenFile,
  text: FileText,
  panes: EditorPaneView[]
): EditorPage[] {
  const pane = panes.find(
    (item) => item.node?.id === file.id && item.session.doc
  );
  return pane
    ? pane.session.markup.pages
    : readDocument(file.id, text.pages.length).pages;
}

/** Each file's matches in tab order, leaving out files with none. Typing
 * stays quick while a long file is searched, since the search trails it. */
export function useFileSearchResults({
  files,
  panes,
  query,
  texts,
}: FileSearchResultsOptions): FileSearchGroup[] {
  const deferredQuery = useDeferredValue(query);
  const [first, second] = panes;
  const firstPages = first?.session.markup.pages;
  const secondPages = second?.session.markup.pages;
  // biome-ignore lint/correctness/useExhaustiveDependencies: the panes array is new on every render, and only their pages matter here
  const layouts = useMemo(() => {
    const byId = new Map<string, EditorPage[]>();
    for (const file of files) {
      const text = texts.get(file.id);
      if (text) {
        byId.set(file.id, findLayout(file, text, panes));
      }
    }
    return byId;
  }, [files, firstPages, secondPages, texts]);

  return useMemo(() => {
    const groups: FileSearchGroup[] = [];
    for (const file of files) {
      const text = texts.get(file.id);
      const layout = layouts.get(file.id);
      if (!(text && layout)) {
        continue;
      }
      const { count, hits } = findFileHits(
        text.lowered,
        layout,
        deferredQuery,
        FILE_SEARCH_RESULT_LIMIT
      );
      if (count > 0) {
        groups.push({ count, file, hits });
      }
    }
    return groups;
  }, [deferredQuery, files, layouts, texts]);
}
