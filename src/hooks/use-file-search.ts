import { useMemo } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { useFileSearchResults } from "@/hooks/use-file-search-results";
import { useFileTexts } from "@/hooks/use-file-texts";
import { useTabLabels } from "@/hooks/use-tab-labels";
import { isExamRunning } from "@/lib/pdf-editor/exam-storage";
import { findExamSolutionIds } from "@/lib/pdf-editor/file-search/exam-solutions";
import type {
  EditorTreeNode,
  OpenFile,
  TabLabel,
} from "@/lib/pdf-editor/types";

interface FileSearchOptions {
  files: OpenFile[];
  isOpen: boolean;
  nodes: EditorTreeNode[];
  panes: EditorPaneView[];
  query: string;
}

const NO_FILES: OpenFile[] = [];

function isRunningNow(fileId: string): boolean {
  return isExamRunning(fileId, Date.now());
}

/** The open tabs' matches while search across files is showing. The solution
 * of an exam that is running is left out, as the exam covers it. */
export function useFileSearch({
  files,
  isOpen,
  nodes,
  panes,
  query,
}: FileSearchOptions) {
  const searchable = useMemo(() => {
    if (!isOpen) {
      return NO_FILES;
    }
    const hidden = findExamSolutionIds(files, nodes, isRunningNow);
    return files.filter((file) => !hidden.has(file.id));
  }, [files, isOpen, nodes]);
  const { progress, texts } = useFileTexts(searchable, nodes, isOpen);
  const groups = useFileSearchResults({
    files: searchable,
    panes,
    query,
    texts,
  });
  const labelList = useTabLabels(searchable, nodes);
  const labels = useMemo(
    () =>
      new Map<string, TabLabel>(
        searchable.map((file, index) => [file.id, labelList[index]])
      ),
    [labelList, searchable]
  );

  return { groups, labels, progress, texts };
}
